import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Функция для создания отпечатка устройства
const generateFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  let canvasData = '';
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Invest-Ex Device', 2, 2);
    canvasData = canvas.toDataURL();
  }
  
  const fingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    colorDepth: screen.colorDepth,
    deviceMemory: (navigator as any).deviceMemory || 'unknown',
    hardwareConcurrency: navigator.hardwareConcurrency,
    screenResolution: `${screen.width}x${screen.height}`,
    availableScreenResolution: `${screen.availWidth}x${screen.availHeight}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    platform: navigator.platform,
    canvas: canvasData.slice(0, 100),
    plugins: Array.from(navigator.plugins || []).map(p => p.name).join(','),
  };
  
  const fingerprintString = JSON.stringify(fingerprint);
  return btoa(fingerprintString).slice(0, 64);
};

const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

const getBrowserInfo = (): string => {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  
  if (ua.indexOf('Firefox') > -1) {
    browser = 'Firefox';
  } else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) {
    browser = 'Opera';
  } else if (ua.indexOf('Trident') > -1) {
    browser = 'Internet Explorer';
  } else if (ua.indexOf('Edge') > -1 || ua.indexOf('Edg') > -1) {
    browser = 'Microsoft Edge';
  } else if (ua.indexOf('Chrome') > -1) {
    browser = 'Chrome';
  } else if (ua.indexOf('Safari') > -1) {
    browser = 'Safari';
  }
  
  return `${browser} (${getDeviceType()})`;
};

const getIPAddress = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    return 'unknown';
  }
};

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  profile: any;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithGithub: () => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updatePassword: (password: string) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const { toast } = useToast();

  const checkDeviceFingerprint = async (userId: string) => {
    try {
      // Проверяем что пользователь авторизован
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.log('Device check skipped: user not authenticated');
        return true;
      }

      const fingerprint = generateFingerprint();
      const ipAddress = await getIPAddress();
      const deviceInfo = {
        type: getDeviceType(),
        platform: navigator.platform,
        screenResolution: `${screen.width}x${screen.height}`
      };
      const browserInfo = getBrowserInfo();
      
      const { data, error } = await supabase.rpc('check_and_register_device', {
        p_fingerprint_hash: fingerprint,
        p_device_info: deviceInfo,
        p_browser_info: browserInfo,
        p_ip_address: ipAddress
      });
      
      if (error) {
        console.error('RPC error:', error);
        throw error;
      }
      
      const result = data as any;
      if (result?.requires_authorization) {
        toast({
          title: "Требуется авторизация устройства",
          description: result.error === 'Device limit reached' 
            ? `Достигнут лимит устройств (${result.max_devices}). Авторизуйте устройство в настройках профиля.`
            : 'Авторизуйте это устройство в настройках профиля для продолжения работы.',
          variant: "destructive",
          duration: 10000,
        });
        return false;
      }
      return true;
    } catch (error: any) {
      console.error('Error checking device:', error);
      // Показываем только если это не проблема с авторизацией
      if (error?.message && !error.message.includes('User not authenticated')) {
        toast({
          title: "Ошибка проверки устройства",
          description: "Проверка устройства временно недоступна",
          variant: "destructive",
        });
      }
      return true; // Не блокируем в случае ошибки
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Defer profile and device check with setTimeout to prevent deadlock
        if (session?.user) {
          setTimeout(async () => {
            await refreshProfile();
            // Проверяем устройство только после успешного входа и с задержкой
            if (event === 'SIGNED_IN') {
              setTimeout(() => {
                checkDeviceFingerprint(session.user.id);
              }, 1000);
            }
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        setTimeout(async () => {
          await refreshProfile();
          // Добавляем задержку для проверки устройства при начальной загрузке
          setTimeout(() => {
            checkDeviceFingerprint(session.user.id);
          }, 1000);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, metadata?: any) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: metadata
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    return { error };
  };

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    return { error };
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({
      password
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    setProfile(null);
    if (!error) {
      toast({
        title: "Выход выполнен",
        description: "Вы успешно вышли из системы",
      });
    }
    return { error };
  };

  const value = {
    session,
    user,
    loading,
    profile,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithGithub,
    signOut,
    resetPassword,
    updatePassword,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};