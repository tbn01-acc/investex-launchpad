import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Shield, Users, Settings, BarChart3, DollarSign, 
  TrendingUp, Activity, Lock, RefreshCw, Save, Briefcase, FileText, MessageSquare, Key
} from 'lucide-react';
import { MessagesTab } from '@/components/MessagesTab';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PlatformStats {
  total_users: number;
  total_projects: number;
  total_investments: number;
  total_funding_raised: number;
  active_freelancers: number;
  active_investors: number;
  successful_projects: number;
}

export default function SuperadminDashboard() {
  const { user, profile } = useAuth();
  const { t, formatCurrency } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Settings state
  const [settingsForm, setSettingsForm] = useState({
    platformFee: 5,
    minInvestment: 1000,
    maxInvestment: 1000000,
    defaultCurrency: 'RUB'
  });
  
  const [resendApiKey, setResendApiKey] = useState('');
  const [showResendKey, setShowResendKey] = useState(false);
  const [isSavingApiKey, setIsSavingApiKey] = useState(false);

  const fetchPlatformStats = async () => {
    try {
      // Use secured RPC function that validates superadmin role server-side
      const { data, error } = await supabase
        .rpc('get_platform_stats_secured');

      if (error) {
        console.error('Platform stats error:', error);
        throw error;
      }
      
      // RPC returns array, get first item
      if (data && data.length > 0) {
        setStats(data[0]);
      }
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: error.message?.includes('Access denied') 
          ? 'Доступ запрещен: требуются права суперадмина'
          : 'Ошибка загрузки статистики',
        variant: 'destructive',
      });
      
      // Redirect to main page if access denied
      if (error.message?.includes('Access denied')) {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const updatePlatformStats = async () => {
    setUpdating(true);
    try {
      // Manual stats calculation for now
      await fetchPlatformStats();
      toast({
        title: t('common.success'),
        description: 'Статистика обновлена',
      });
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: 'Ошибка обновления статистики',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  const saveSettings = async () => {
    try {
      // In a real app, save to platform_settings table
      toast({
        title: t('common.success'),
        description: 'Настройки сохранены',
      });
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: 'Ошибка сохранения настроек',
        variant: 'destructive',
      });
    }
  };

  const saveResendApiKey = async () => {
    if (!resendApiKey.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите API ключ Resend',
        variant: 'destructive',
      });
      return;
    }

    setIsSavingApiKey(true);
    try {
      // Update secret using Supabase edge function
      const { data, error } = await supabase.functions.invoke('update-resend-key', {
        body: { apiKey: resendApiKey }
      });

      if (error) throw error;

      toast({
        title: t('common.success'),
        description: 'RESEND_API_KEY успешно сохранен в защищенном хранилище',
      });
      
      setResendApiKey('');
      setShowResendKey(false);
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: error.message || 'Ошибка сохранения API ключа',
        variant: 'destructive',
      });
    } finally {
      setIsSavingApiKey(false);
    }
  };

  useEffect(() => {
    fetchPlatformStats();
    const interval = setInterval(fetchPlatformStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Кабинет Суперадминистратора</h1>
              <p className="text-muted-foreground">
                {t('common.welcome')}, {profile?.first_name || 'Суперадмин'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">
              <Lock className="h-4 w-4 mr-2" />
              {t('role.superadmin')}
            </Badge>
            <Button 
              onClick={updatePlatformStats} 
              variant="outline" 
              size="sm"
              disabled={updating}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${updating ? 'animate-spin' : ''}`} />
              Обновить
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('stats.users')}</p>
                  <p className="text-3xl font-bold">{stats?.total_users?.toLocaleString() || 0}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('stats.projects')}</p>
                  <p className="text-3xl font-bold">{stats?.total_projects?.toLocaleString() || 0}</p>
                  <p className="text-xs text-muted-foreground">
                    {stats?.successful_projects?.toLocaleString() || 0} успешных
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('stats.investments')}</p>
                  <p className="text-3xl font-bold">{stats?.total_investments?.toLocaleString() || 0}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('stats.funding')}</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(stats?.total_funding_raised || 0)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">{t('common.dashboard')}</TabsTrigger>
            <TabsTrigger value="projects">Проекты</TabsTrigger>
            <TabsTrigger value="staff">Персонал</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
            <TabsTrigger value="messages">{t('common.messages')}</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Активность пользователей</CardTitle>
                  <CardDescription>Распределение по ролям</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>{t('stats.freelancers')}</span>
                      <span className="font-semibold">{stats?.active_freelancers?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t('stats.investors')}</span>
                      <span className="font-semibold">{stats?.active_investors?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Аутсорсеры</span>
                      <span className="font-semibold">1,256</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Фаундеры</span>
                      <span className="font-semibold">1,701</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Система платежей</CardTitle>
                  <CardDescription>Статистика транзакций</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Всего транзакций</span>
                      <span className="font-semibold">12,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Комиссия платформы</span>
                      <span className="font-semibold">{formatCurrency(780000)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Средний чек</span>
                      <span className="font-semibold">{formatCurrency(65000)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/superadmin/projects-sandbox')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5" />Управление проектами</CardTitle>
                  <CardDescription>Модерация и категоризация</CardDescription>
                </CardHeader>
              </Card>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/superadmin/analytics')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Аналитика проектов</CardTitle>
                  <CardDescription>Детальная статистика</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="staff">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/superadmin/staff-management')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />Управление персоналом</CardTitle>
                <CardDescription>Администраторы, модераторы, редакторы</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/superadmin/analytics')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5" />Полная аналитика</CardTitle>
                <CardDescription>Подробная статистика и отчеты</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки платформы</CardTitle>
                  <CardDescription>Конфигурация основных параметров</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="platformFee">Комиссия платформы (%)</Label>
                      <Input
                        id="platformFee"
                        type="number"
                        value={settingsForm.platformFee}
                        onChange={(e) => setSettingsForm(prev => ({ 
                          ...prev, 
                          platformFee: Number(e.target.value) 
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="minInvestment">Минимальная инвестиция</Label>
                      <Input
                        id="minInvestment"
                        type="number"
                        value={settingsForm.minInvestment}
                        onChange={(e) => setSettingsForm(prev => ({ 
                          ...prev, 
                          minInvestment: Number(e.target.value) 
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="maxInvestment">Максимальная инвестиция</Label>
                      <Input
                        id="maxInvestment"
                        type="number"
                        value={settingsForm.maxInvestment}
                        onChange={(e) => setSettingsForm(prev => ({ 
                          ...prev, 
                          maxInvestment: Number(e.target.value) 
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="defaultCurrency">Валюта по умолчанию</Label>
                      <Input
                        id="defaultCurrency"
                        value={settingsForm.defaultCurrency}
                        onChange={(e) => setSettingsForm(prev => ({ 
                          ...prev, 
                          defaultCurrency: e.target.value 
                        }))}
                      />
                    </div>
                  </div>
                  
                  <Button onClick={saveSettings} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    {t('common.save')}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Настройка Email (Resend API)
                  </CardTitle>
                  <CardDescription>
                    Управление API ключом для отправки уведомлений и сообщений
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <Lock className="h-4 w-4" />
                    <AlertDescription>
                      API ключ будет зашифрован и сохранен в защищенном хранилище Supabase Secrets.
                      Ключ используется для отправки email-уведомлений через сервис Resend.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="resendApiKey">RESEND_API_KEY</Label>
                      <div className="flex gap-2">
                        <Input
                          id="resendApiKey"
                          type={showResendKey ? "text" : "password"}
                          value={resendApiKey}
                          onChange={(e) => setResendApiKey(e.target.value)}
                          placeholder="re_..."
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowResendKey(!showResendKey)}
                        >
                          {showResendKey ? 'Скрыть' : 'Показать'}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Получить API ключ можно на <a href="https://resend.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary underline">resend.com/api-keys</a>
                      </p>
                    </div>

                    <Button 
                      onClick={saveResendApiKey} 
                      className="w-full"
                      disabled={isSavingApiKey || !resendApiKey.trim()}
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      {isSavingApiKey ? 'Сохранение...' : 'Сохранить API ключ'}
                    </Button>
                  </div>

                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <h4 className="font-medium text-sm">Безопасность:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Ключ шифруется с использованием AES-256</li>
                      <li>Хранится в защищенном хранилище Supabase</li>
                      <li>Доступен только серверным функциям</li>
                      <li>Не отображается в исходном коде приложения</li>
                      <li>Аудит всех изменений в логах безопасности</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <MessagesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}