import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Import all dashboards
import InvestorDashboard from '@/pages/dashboards/InvestorDashboard';
import InvestorDashboardVIP from '@/pages/dashboards/InvestorDashboardVIP';
import SubsidiaryInvestorDashboard from '@/pages/dashboards/SubsidiaryInvestorDashboard';
import FounderDashboard from '@/pages/dashboards/FounderDashboard';
import FounderDashboardPro from '@/pages/dashboards/FounderDashboardPro';
import CoFounderDashboard from '@/pages/dashboards/CoFounderDashboard';
import CoOwnerDashboard from '@/pages/dashboards/CoOwnerDashboard';
import FreelancerDashboard from '@/pages/dashboards/FreelancerDashboard';
import FreelancerDashboardPro from '@/pages/dashboards/FreelancerDashboardPro';
import ContractorDashboard from '@/pages/dashboards/ContractorDashboard';
import ContractorDashboardPro from '@/pages/dashboards/ContractorDashboardPro';
import OutsourcerDashboard from '@/pages/dashboards/OutsourcerDashboard';
import OutsourcerDashboardPro from '@/pages/dashboards/OutsourcerDashboardPro';
import JobSeekerDashboard from '@/pages/dashboards/JobSeekerDashboard';
import JobSeekerDashboardPro from '@/pages/dashboards/JobSeekerDashboardPro';
import PersonalAnalytics from '@/components/PersonalAnalytics';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Briefcase, DollarSign, Users, Plus, Settings, BarChart3, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { UserRole, ROLE_CONFIGS } from '@/types/roles';

const Dashboard = () => {
  const { user, loading, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { t, formatCurrency } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRole, setSelectedRole] = useState<UserRole>('job_seeker');
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

  const getDashboardComponent = () => {
    if (!profile?.role) return <div>Загрузка...</div>;
    
    // Check subscription tier for premium dashboards
    const isPremiumUser = profile.subscription_tier === 'premium' || profile.subscription_tier === 'profi';
    
    switch (profile.role) {
      case 'investor':
        return isPremiumUser ? <InvestorDashboardVIP /> : <InvestorDashboard />;
      case 'subsidiary_investor':
        return <SubsidiaryInvestorDashboard />;
      case 'founder':
        return isPremiumUser ? <FounderDashboardPro /> : <FounderDashboard />;
      case 'co_founder':
        return <CoFounderDashboard />;
      case 'co_owner':
        return <CoOwnerDashboard />;
      case 'freelancer':
        return isPremiumUser ? <FreelancerDashboardPro /> : <FreelancerDashboard />;
      case 'contractor':
        return isPremiumUser ? <ContractorDashboardPro /> : <ContractorDashboard />;
      case 'outsourcer':
        return isPremiumUser ? <OutsourcerDashboardPro /> : <OutsourcerDashboard />;
      case 'job_seeker':
        return isPremiumUser ? <JobSeekerDashboardPro /> : <JobSeekerDashboard />;
      default:
        return <div>Неизвестная роль пользователя</div>;
    }
  };

  const updateRole = async (newRole: UserRole) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('user_id', user?.id);

      if (error) throw error;

      await refreshProfile();
      toast({
        title: "Роль обновлена",
        description: `Ваша роль изменена на "${ROLE_CONFIGS[newRole].name}"`,
      });
    } catch (error) {
      console.error('Ошибка при обновлении роли:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить роль",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Загрузка...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // If user has a role, show their dashboard
  if (profile?.role) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          {getDashboardComponent()}
        </main>
        <Footer />
      </div>
    );
  }

  // If no role is set, show role selection interface
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Добро пожаловать в Invest-Ex!</h1>
            <p className="text-muted-foreground">
              Пожалуйста, выберите вашу роль для настройки персонализированного опыта
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="role-selection">Выбор роли</TabsTrigger>
              <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Всего пользователей</p>
                        <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Активные проекты</p>
                        <p className="text-2xl font-bold">{stats.totalProjects.toLocaleString()}</p>
                      </div>
                      <Briefcase className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Инвестиции</p>
                        <p className="text-2xl font-bold">{stats.totalInvestments.toLocaleString()}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Привлечено средств</p>
                        <p className="text-2xl font-bold">{formatCurrency(stats.totalFunding)}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Обзор платформы</CardTitle>
                    <CardDescription>
                      Invest-Ex — это комплексная экосистема для всех участников инвестиционного процесса
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 border rounded-lg">
                        <h3 className="font-semibold">Для инвесторов</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          Доступ к проверенным проектам, due diligence, управление портфелем
                        </p>
                      </div>
                      <div className="text-center p-6 border rounded-lg">
                        <h3 className="font-semibold">Для фаундеров</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          Поиск инвесторов, управление проектами, привлечение команды
                        </p>
                      </div>
                      <div className="text-center p-6 border rounded-lg">
                        <h3 className="font-semibold">Для исполнителей</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          Поиск проектов, управление контрактами, развитие карьеры
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="role-selection">
              <Card>
                <CardHeader>
                  <CardTitle>Выбор роли</CardTitle>
                  <CardDescription>
                    Выберите роль, которая лучше всего описывает ваши цели на платформе
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите роль" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ROLE_CONFIGS).map((role) => (
                          <SelectItem key={role.key} value={role.key}>
                            {role.icon} {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedRole && (
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold flex items-center gap-2">
                        {ROLE_CONFIGS[selectedRole].icon}
                        {ROLE_CONFIGS[selectedRole].name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {ROLE_CONFIGS[selectedRole].description}
                      </p>
                      {ROLE_CONFIGS[selectedRole].minInvestment && (
                        <Badge variant="secondary" className="mt-2">
                          Мин. инвестиции: {(ROLE_CONFIGS[selectedRole].minInvestment! / 1000000).toFixed(0)} млн ₽
                        </Badge>
                      )}
                    </div>
                  )}

                  <Button onClick={() => updateRole(selectedRole)} className="w-full">
                    Подтвердить выбор роли
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <PersonalAnalytics userRole={selectedRole} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;