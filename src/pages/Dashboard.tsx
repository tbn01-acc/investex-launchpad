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
import ExpertDashboard from '@/pages/dashboards/ExpertDashboard';
import CollectiveInvestorDashboard from '@/pages/dashboards/CollectiveInvestorDashboard';
import PartnerDashboard from '@/pages/dashboards/PartnerDashboard';
import CoFounderDashboard from '@/pages/dashboards/CoFounderDashboard';
import CoPartnerDashboard from '@/pages/dashboards/CoPartnerDashboard';
import BloggerDashboard from '@/pages/dashboards/BloggerDashboard';
import ConsultantDashboard from '@/pages/dashboards/ConsultantDashboard';
import JobSeekerDashboard from '@/pages/dashboards/JobSeekerDashboard';
import AmbassadorDashboard from '@/pages/dashboards/AmbassadorDashboard';
import ProjectAdminDashboard from '@/pages/dashboards/ProjectAdminDashboard';
import EmployeeDashboard from '@/pages/dashboards/EmployeeDashboard';
import CoInvestorDashboard from '@/pages/dashboards/CoInvestorDashboard';
import AdministratorDashboard from '@/pages/dashboards/AdministratorDashboard';
import { FreelancerAnalytics } from '@/components/analytics/FreelancerAnalytics';
import { InvestorAnalytics } from '@/components/analytics/InvestorAnalytics';
import { FounderAnalytics } from '@/components/analytics/FounderAnalytics';
import { ExpertAnalytics } from '@/components/analytics/ExpertAnalytics';
import { JobSeekerAnalytics } from '@/components/analytics/JobSeekerAnalytics';
import { PartnerAnalytics } from '@/components/analytics/PartnerAnalytics';
import { BloggerAnalytics } from '@/components/analytics/BloggerAnalytics';
import CoInvestorAnalytics from '@/components/analytics/CoInvestorAnalytics';
import AdministratorAnalytics from '@/components/analytics/AdministratorAnalytics';
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

  useEffect(() => {
    const fetchCurrentRole = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('user_roles')
        .select('role, is_current')
        .eq('user_id', user.id);
      if (!error && data) {
        const current = (data as any[]).find(r => r.is_current);
        if (current?.role) {
          setSelectedRole(current.role);
        }
      }
    };
    fetchCurrentRole();
  }, [user]);

  const handleRoleChange = async (newRole: string) => {
    if (!user) return;
    
    try {
      const { error: clearErr } = await supabase
        .from('user_roles')
        .update({ is_current: false })
        .eq('user_id', user.id);
      if (clearErr) throw clearErr;

      const { error: setErr } = await supabase
        .from('user_roles')
        .update({ is_current: true })
        .eq('user_id', user.id)
        .eq('role', newRole as any);
      if (setErr) throw setErr;

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
      // Участники
      investor: 'Инвестор',
      co_investor: 'Соинвестор',
      'collective-investor': 'Соинвестор',
      'collective_investor': 'Соинвестор',
      founder: 'Фаундер',
      co_founder: 'Ко-фаундер',
      'co-founder': 'Ко-фаундер',
      'co-owner': 'Соучредитель',
      'co_partner': 'Соучредитель',
      // Исполнители
      freelancer: 'Фрилансер',
      expert: 'Эксперт',
      consultant: 'Консультант',
      outsourcer: 'Аутсорсер',
      contractor: 'Подрядчик',
      // Сотрудники
      administrator: 'Администратор',
      'project-admin': 'Администратор',
      'project_admin': 'Администратор',
      employee: 'Сотрудник',
      'project-employee': 'Сотрудник',
      job_seeker: 'Соискатель',
      'job-seeker': 'Соискатель',
      // Партнеры
      ambassador: 'Амбассадор',
      partner: 'Партнер',
      blogger: 'Блогер',
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

  const renderRoleAnalytics = () => {
    switch (role) {
      case 'investor':
        return <InvestorAnalytics />;
      case 'co_investor':
      case 'collective-investor':
      case 'collective_investor':
        return <CoInvestorAnalytics />;
      case 'founder':
        return <FounderAnalytics />;
      case 'co_founder':
      case 'co-founder':
      case 'co-owner':
      case 'co_partner':
        return <FounderAnalytics />;
      case 'freelancer':
        return <FreelancerAnalytics />;
      case 'expert':
        return <ExpertAnalytics />;
      case 'consultant':
        return <ExpertAnalytics />;
      case 'outsourcer':
      case 'contractor':
        return <FreelancerAnalytics />;
      case 'administrator':
      case 'project-admin':
      case 'project_admin':
        return <AdministratorAnalytics />;
      case 'employee':
      case 'project-employee':
        return <FreelancerAnalytics />;
      case 'job_seeker':
      case 'job-seeker':
        return <JobSeekerAnalytics />;
      case 'ambassador':
        return <PartnerAnalytics />;
      case 'partner':
        return <PartnerAnalytics />;
      case 'blogger':
        return <BloggerAnalytics />;
      case 'superadmin':
        return (
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Персональная аналитика - {getRoleDisplayName(role)}
                </CardTitle>
                <CardDescription>
                  Детальная аналитика будет доступна в следующей версии
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Основные показатели</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Активность</span>
                        <span className="font-medium">Высокая</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Рейтинг</span>
                        <span className="font-medium">4.7/5.0</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Прогресс</h4>
                    <div className="w-full bg-secondary rounded-full h-2 mb-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <FreelancerAnalytics />;
    }
  };

  const renderRoleSpecificDashboard = () => {
    switch (role) {
      case 'superadmin':
        return <SuperadminDashboard />;
      case 'investor':
        return <InvestorDashboard />;
      case 'co_investor':
      case 'collective-investor':
      case 'collective_investor':
        return <CoInvestorDashboard />;
      case 'founder':
        return <FounderDashboard />;
      case 'co_founder':
      case 'co-founder':
        return <CoFounderDashboard />;
      case 'co-owner':
      case 'co_partner':
        return <CoPartnerDashboard />;
      case 'freelancer':
        return <FreelancerDashboard />;
      case 'expert':
        return <ExpertDashboard />;
      case 'consultant':
        return <ConsultantDashboard />;
      case 'outsourcer':
        return <OutsourcerDashboard />;
      case 'contractor':
        return <ContractorDashboard />;
      case 'administrator':
      case 'project-admin':
      case 'project_admin':
        return <AdministratorDashboard />;
      case 'employee':
      case 'project-employee':
        return <EmployeeDashboard />;
      case 'job_seeker':
      case 'job-seeker':
        return <JobSeekerDashboard />;
      case 'ambassador':
        return <AmbassadorDashboard />;
      case 'partner':
        return <PartnerDashboard />;
      case 'blogger':
        return <BloggerDashboard />;
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
                    <SelectContent className="max-h-[300px]">
                      <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">Участники</div>
                      <SelectItem value="investor">Инвестор</SelectItem>
                      <SelectItem value="co_investor">Соинвестор</SelectItem>
                      <SelectItem value="founder">Фаундер</SelectItem>
                      <SelectItem value="co_founder">Ко-фаундер</SelectItem>
                      <SelectItem value="co-owner">Соучредитель</SelectItem>
                      
                      <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground mt-2">Исполнители</div>
                      <SelectItem value="freelancer">Фрилансер</SelectItem>
                      <SelectItem value="expert">Эксперт</SelectItem>
                      <SelectItem value="consultant">Консультант</SelectItem>
                      <SelectItem value="outsourcer">Аутсорсер</SelectItem>
                      <SelectItem value="contractor">Подрядчик</SelectItem>
                      
                      <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground mt-2">Сотрудники</div>
                      <SelectItem value="administrator">Администратор</SelectItem>
                      <SelectItem value="employee">Сотрудник</SelectItem>
                      <SelectItem value="job_seeker">Соискатель</SelectItem>
                      
                      <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground mt-2">Партнеры</div>
                      <SelectItem value="ambassador">Амбассадор</SelectItem>
                      <SelectItem value="partner">Партнер</SelectItem>
                      <SelectItem value="blogger">Блогер</SelectItem>
                      
                      {profile?.role === 'superadmin' && (
                        <>
                          <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground mt-2">Администрация</div>
                          <SelectItem value="superadmin">Суперадмин</SelectItem>
                        </>
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
              {renderRoleAnalytics()}
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