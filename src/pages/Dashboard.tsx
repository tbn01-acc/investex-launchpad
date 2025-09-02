import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SuperadminDashboard from '@/pages/dashboards/SuperadminDashboard';
import InvestorDashboard from '@/pages/dashboards/InvestorDashboard';
import FreelancerDashboard from '@/pages/dashboards/FreelancerDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Briefcase, DollarSign, Users, Plus, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard = () => {
  const { user, loading, profile } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setProfileLoading(false);
    }
  }, [profile]);

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Загрузка...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  // Route to specialized dashboards based on role
  if (profile.role === 'superadmin') {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24">
          <SuperadminDashboard />
        </main>
        <Footer />
      </div>
    );
  }

  if (profile.role === 'investor') {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24">
          <InvestorDashboard />
        </main>
        <Footer />
      </div>
    );
  }

  if (profile.role === 'freelancer' || profile.role === 'contractor') {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24">
          <FreelancerDashboard />
        </main>
        <Footer />
      </div>
    );
  }

  const getRoleDisplayName = (role: string) => {
    const roleMap: { [key: string]: string } = {
      freelancer: 'Фрилансер',
      outsourcer: 'Аутсорсер', 
      founder: 'Фаундер',
      investor: 'Инвестор'
    };
    return roleMap[role] || role;
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

  const actions = quickActions[profile?.role as keyof typeof quickActions] || [];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <section className="mb-12">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4">
                  Добро пожаловать, {profile?.first_name || 'Пользователь'}!
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Ваша роль на платформе: 
                  <Badge className={`ml-2 ${getRoleColor(profile?.role)}`}>
                    {getRoleDisplayName(profile?.role)}
                  </Badge>
                </p>
              </div>
              
              <Card className="w-full lg:w-auto">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 ${getRoleColor(profile?.role)} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                      {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold">{profile?.first_name} {profile?.last_name}</h3>
                      <p className="text-muted-foreground">{user.email}</p>
                      <Badge variant="outline" className="mt-1">
                        {getRoleDisplayName(profile?.role)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Быстрые действия</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {actions.map((action, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                      <action.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4">
                      {action.description}
                    </CardDescription>
                    <Button variant="outline" className="w-full">
                      Перейти
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Activity Feed */}
          <section className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Недавняя активность</CardTitle>
                  <CardDescription>
                    Ваши последние действия на платформе
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Профиль создан</p>
                        <p className="text-sm text-muted-foreground">
                          Добро пожаловать на платформу InvestEx!
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">Сегодня</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Статистика</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Проектов</span>
                      <span className="font-semibold">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Рейтинг</span>
                      <span className="font-semibold">Новичок</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Статус</span>
                      <Badge variant="outline">Активен</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;