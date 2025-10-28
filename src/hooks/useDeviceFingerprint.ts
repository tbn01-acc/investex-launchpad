import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

// Функция для создания отпечатка устройства
const generateFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Canvas fingerprint
  let canvasData = '';
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Invest-Ex Device', 2, 2);
    canvasData = canvas.toDataURL();
  }
  
  // Собираем данные устройства
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
    canvas: canvasData.slice(0, 100), // Первые 100 символов
    plugins: Array.from(navigator.plugins || []).map(p => p.name).join(','),
  };
  
  // Создаем хеш из данных
  const fingerprintString = JSON.stringify(fingerprint);
  return btoa(fingerprintString).slice(0, 64); // Base64 и обрезаем до 64 символов
};

// Функция для определения типа устройства
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

// Функция для получения информации о браузере
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

// Функция для получения IP адреса (приблизительная)
const getIPAddress = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    return 'unknown';
  }
};

export const useDeviceFingerprint = () => {
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(false);
  const [requiresAuthorization, setRequiresAuthorization] = useState(false);
  const [fingerprintId, setFingerprintId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      checkDevice();
    }
  }, [user]);

  const checkDevice = async () => {
    if (!user || isChecking) return;
    
    setIsChecking(true);
    
    try {
      const fingerprint = generateFingerprint();
      const ipAddress = await getIPAddress();
      const deviceInfo = {
        type: getDeviceType(),
        platform: navigator.platform,
        screenResolution: `${screen.width}x${screen.height}`
      };
      const browserInfo = getBrowserInfo();
      
      // Проверяем и регистрируем устройство
      const { data, error } = await supabase.rpc('check_and_register_device', {
        p_fingerprint_hash: fingerprint,
        p_device_info: deviceInfo,
        p_browser_info: browserInfo,
        p_ip_address: ipAddress
      });
      
      if (error) throw error;
      
      const result = data as any;
      if (result) {
        setFingerprintId(result.fingerprint_id);
        
        if (result.requires_authorization) {
          setRequiresAuthorization(true);
          toast.error(
            result.error === 'Device limit reached' 
              ? `Достигнут лимит устройств (${result.max_devices}). Пожалуйста, авторизуйте это устройство в настройках профиля.`
              : 'Это устройство требует авторизации'
          );
        } else if (result.success) {
          setRequiresAuthorization(false);
        }
      }
    } catch (error: any) {
      console.error('Error checking device:', error);
      toast.error('Ошибка при проверке устройства');
    } finally {
      setIsChecking(false);
    }
  };

  return {
    isChecking,
    requiresAuthorization,
    fingerprintId,
    checkDevice
  };
};
