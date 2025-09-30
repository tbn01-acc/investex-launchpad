import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Send, Eye, Heart, FileText, TrendingUp } from 'lucide-react';

const JobSeekerDashboard = () => {
  const { user, profile } = useAuth();
  const { formatCurrency } = useLanguage();

  const [stats] = useState({
    applications: 15,
    interviews: 5,
    offers: 2,
    profileViews: 234,
    savedJobs: 8,
    responseRate: 33
  });

  const [applications] = useState([
    {
      id: 1,
      company: 'TechCorp',
      position: 'Senior Frontend Developer',
      salary: '200K - 300K ₽',
      appliedDate: '2024-02-15',
      status: 'interview'
    },
    {
      id: 2,
      company: 'StartupX',
      position: 'Full Stack Engineer',
      salary: '180K - 250K ₽',
      appliedDate: '2024-02-18',
      status: 'pending'
    },
    {
      id: 3,
      company: 'InnovateLab',
      position: 'React Developer',
      salary: '150K - 220K ₽',
      appliedDate: '2024-02-20',
      status: 'offer'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'offer': return 'bg-green-500';
      case 'interview': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'offer': return 'Оффер';
      case 'interview': return 'Собеседование';
      case 'pending': return 'Рассмотрение';
      case 'rejected': return 'Отказ';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Дашборд соискателя</h1>
        <p className="text-muted-foreground">
          Отслеживайте свои отклики и ищите новые возможности
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Откликов</span>
              <span className="text-2xl font-bold">{stats.applications}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Собеседований</span>
              <span className="text-2xl font-bold">{stats.interviews}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Офферов</span>
              <span className="text-2xl font-bold">{stats.offers}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Просмотры</span>
              <span className="text-2xl font-bold">{stats.profileViews}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Избранное</span>
              <span className="text-2xl font-bold">{stats.savedJobs}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Отклик</span>
              <span className="text-2xl font-bold">{stats.responseRate}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="applications">Отклики</TabsTrigger>
          <TabsTrigger value="jobs">Вакансии</TabsTrigger>
          <TabsTrigger value="resume">Резюме</TabsTrigger>
          <TabsTrigger value="saved">Избранное</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Мои отклики</h3>
            <Button>
              <Briefcase className="w-4 h-4 mr-2" />
              Найти вакансии
            </Button>
          </div>

          {applications.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{application.position}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{application.company}</p>
                  </div>
                  <Badge className={getStatusColor(application.status)}>
                    {getStatusText(application.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Зарплата</p>
                    <p className="text-lg font-semibold">{application.salary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Дата отклика</p>
                    <p className="text-lg font-semibold">{application.appliedDate}</p>
                  </div>
                  <div className="flex items-end justify-end">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Подробнее
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                Список вакансий будет доступен в следующей версии
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resume">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                Редактор резюме будет доступен в следующей версии
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                Избранные вакансии будут доступны в следующей версии
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Аналитика соискателя</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Конверсия откликов</span>
                    <span className="text-sm text-muted-foreground">{stats.responseRate}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${stats.responseRate}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    На 8% выше среднего по рынку
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Активность поиска</span>
                    <span className="text-sm text-muted-foreground">Высокая</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Просмотры профиля</span>
                    <span className="text-sm text-muted-foreground">{stats.profileViews} за месяц</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '72%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobSeekerDashboard;
