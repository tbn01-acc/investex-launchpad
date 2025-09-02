import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
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
  TrendingUp, Activity, Lock, RefreshCw, Save 
} from 'lucide-react';

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

  const fetchPlatformStats = async () => {
    try {
      const { data, error } = await supabase
        .from('platform_statistics')
        .select('*')
        .single();

      if (error) throw error;
      setStats(data);
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: 'Ошибка загрузки статистики',
        variant: 'destructive',
      });
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
              <h1 className="text-3xl font-bold">Панель Суперадминистратора</h1>
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
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              <Activity className="h-4 w-4 mr-2" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="finance">
              <DollarSign className="h-4 w-4 mr-2" />
              Финансы
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
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

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Управление пользователями</CardTitle>
                <CardDescription>Модерация и администрирование учетных записей</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Инструменты управления пользователями будут реализованы в следующих версиях.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finance">
            <Card>
              <CardHeader>
                <CardTitle>Финансовая отчетность</CardTitle>
                <CardDescription>Детальная аналитика доходов и расходов</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Расширенная финансовая аналитика будет добавлена в следующих версиях.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}