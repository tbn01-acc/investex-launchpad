import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SuperadminDashboard from '@/pages/dashboards/SuperadminDashboard';
import InvestorDashboard from '@/pages/dashboards/InvestorDashboard';
import FreelancerDashboard from '@/pages/dashboards/FreelancerDashboard';
import FounderDashboard from '@/pages/dashboards/FounderDashboard';
import OutsourcerDashboard from '@/pages/dashboards/OutsourcerDashboard';
import ContractorDashboard from '@/pages/dashboards/ContractorDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Briefcase, DollarSign, Users, Plus, Settings, BarChart3, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, loading, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { t, formatCurrency } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [stats, setStats] = useState({
    totalUsers: 15847,
    totalProjects: 3421,
    totalInvestments: 892,
    totalFunding: 12500000,
    activeFreelancers: 15847,
    activeInvestors: 1204,
    successfulProjects: 2847
  });
  

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile?.role) {
      setSelectedRole(profile.role);
    }
  }, [profile]);

  const handleRoleChange = async (newRole: 'freelancer' | 'investor' | 'founder' | 'outsourcer' | 'contractor' | 'superadmin') => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('user_id', user.id);

      if (error) throw error;

      setSelectedRole(newRole);
      await refreshProfile();
      
      toast({
        title: "Роль обновлена",
        description: `Ваша роль изменена на ${getRoleDisplayName(newRole)}`,
      });
    } catch (error: any) {
      console.error('Error updating role:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить роль",
        variant: "destructive",
      });
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const role = selectedRole || profile?.role || 'freelancer';

  const getRoleDisplayName = (role: string) => {
    const roleMap: { [key: string]: string } = {
      freelancer: 'Фрилансер',
      outsourcer: 'Аутсорсер', 
      founder: 'Фаундер',
      investor: 'Инвестор',
      contractor: 'Подрядчик',
      superadmin: 'Суперадмин'
    };
    return roleMap[role] || 'Пользователь';
  };

  const getRoleColor = (role: string) => {
    const colorMap: { [key: string]: string } = {
      freelancer: 'bg-primary',
      outsourcer: 'bg-secondary',
      founder: 'bg-accent',
      investor: 'bg-gradient-to-r from-primary to-secondary'
    };
    return colorMap[role] || 'bg-primary';
  };

  const quickActions = {
    freelancer: [
      { title: 'Найти проекты', description: 'Поиск новых заказов', icon: Briefcase },
      { title: 'Присоединиться к команде', description: 'Стать частью команды', icon: Users },
      { title: 'Мой профиль', description: 'Редактировать информацию', icon: User }
    ],
    outsourcer: [
      { title: 'Предложить услуги', description: 'Создать предложение', icon: Plus },
      { title: 'Найти исполнителей', description: 'Подобрать команду', icon: Users },
      { title: 'Мои проекты', description: 'Управление проектами', icon: Briefcase }
    ],
    founder: [
      { title: 'Создать проект', description: 'Запустить новый проект', icon: Plus },
      { title: 'Найти инвесторов', description: 'Привлечь финансирование', icon: DollarSign },
      { title: 'Собрать команду', description: 'Найти соучредителей', icon: Users }
    ],
    investor: [
      { title: 'Найти проекты', description: 'Инвестиционные возможности', icon: Briefcase },
      { title: 'Мой портфель', description: 'Текущие инвестиции', icon: DollarSign },
      { title: 'Аналитика', description: 'Отчеты и метрики', icon: Settings }
    ]
  };

  const actions = quickActions[role as keyof typeof quickActions] || [];

  const renderRoleSpecificDashboard = () => {
    switch (role) {
      case 'superadmin':
        return <SuperadminDashboard />;
      case 'investor':
        return <InvestorDashboard />;
      case 'freelancer':
        return <FreelancerDashboard />;
      case 'founder':
        return <FounderDashboard />;
      case 'outsourcer':
        return <OutsourcerDashboard />;
      case 'contractor':
        return <ContractorDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <section className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Добро пожаловать, {profile?.first_name || 'Пользователь'}!
                </h1>
                <p className="text-muted-foreground">
                  Управляйте своими проектами и отслеживайте прогресс
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Роль:</span>
                  <Select value={role} onValueChange={handleRoleChange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freelancer">Фрилансер</SelectItem>
                      <SelectItem value="investor">Инвестор</SelectItem>
                      <SelectItem value="founder">Фаундер</SelectItem>
                      <SelectItem value="outsourcer">Аутсорсер</SelectItem>
                      <SelectItem value="contractor">Подрядчик</SelectItem>
                      {profile?.role === 'superadmin' && (
                        <SelectItem value="superadmin">Суперадмин</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className={`w-12 h-12 ${getRoleColor(role)} rounded-full flex items-center justify-center text-white font-bold`}>
                  {profile?.first_name?.[0] || 'U'}{profile?.last_name?.[0] || ''}
                </div>
              </div>
            </div>
          </section>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="dashboard">Дашборд</TabsTrigger>
              <TabsTrigger value="analytics">Аналитика</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Platform Stats */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Пользователи</p>
                        <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                      </div>
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Проекты</p>
                        <p className="text-2xl font-bold">{stats.totalProjects.toLocaleString()}</p>
                      </div>
                      <Briefcase className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Инвестиции</p>
                        <p className="text-2xl font-bold">{stats.totalInvestments.toLocaleString()}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Успешные</p>
                        <p className="text-2xl font-bold">{stats.successfulProjects.toLocaleString()}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Quick Actions */}
              <section>
                <h2 className="text-xl font-bold mb-4">Быстрые действия</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {actions.map((action, index) => (
                    <Card 
                      key={index} 
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => {
                        // Navigate based on action type
                        if (action.title.includes('профиль') || action.title.includes('Мой профиль')) {
                          navigate('/profile');
                        } else if (action.title.includes('проект')) {
                          navigate('/projects');
                        } else if (action.title.includes('инвестор') || action.title.includes('портфель') || action.title.includes('Аналитика')) {
                          navigate('/investments');
                        } else if (action.title.includes('команд') || action.title.includes('исполнитель')) {
                          navigate('/projects');
                        } else {
                          // Default fallback
                          navigate('/projects');
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <action.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{action.title}</h3>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </TabsContent>

            <TabsContent value="dashboard">
              <div className="bg-card rounded-lg border p-6">
                {renderRoleSpecificDashboard()}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Персональная аналитика - {getRoleDisplayName(role)}
                    </CardTitle>
                    <CardDescription>
                      Ваши показатели и сравнение с рынком
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Ваши показатели</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Завершенных проектов</span>
                            <span className="font-medium">24</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Средний рейтинг</span>
                            <span className="font-medium">4.8/5.0</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Доход за месяц</span>
                            <span className="font-medium">{formatCurrency(285000)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Сравнение с рынком</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Продуктивность</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                              </div>
                              <span className="text-sm font-medium">85%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Качество работ</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                              </div>
                              <span className="text-sm font-medium">92%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Соблюдение сроков</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: '96%' }}></div>
                              </div>
                              <span className="text-sm font-medium">96%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки профиля</CardTitle>
                  <CardDescription>Управление личными данными и предпочтениями</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                       <div>
                         <h3 className="font-medium">Имя</h3>
                         <p className="text-sm text-muted-foreground">{profile?.first_name} {profile?.last_name}</p>
                       </div>
                       <Button 
                         variant="outline" 
                         size="sm"
                         onClick={() => navigate('/profile')}
                       >
                         Изменить
                       </Button>
                     </div>
                     <div className="flex justify-between items-center">
                       <div>
                         <h3 className="font-medium">Email</h3>
                         <p className="text-sm text-muted-foreground">{user?.email}</p>
                       </div>
                       <Button 
                         variant="outline" 
                         size="sm"
                         onClick={() => navigate('/profile')}
                       >
                         Изменить
                       </Button>
                     </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Роль</h3>
                        <p className="text-sm text-muted-foreground">{getRoleDisplayName(role)}</p>
                      </div>
                      <Badge variant="outline">{getRoleDisplayName(role)}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;