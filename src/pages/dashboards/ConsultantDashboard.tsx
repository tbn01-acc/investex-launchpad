import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Clock, DollarSign, Target, Award } from 'lucide-react';

const ConsultantDashboard = () => {
  const { user, profile } = useAuth();
  const { formatCurrency } = useLanguage();

  const [stats] = useState({
    activeClients: 8,
    totalEarnings: 2400000,
    averageRate: 15000,
    hoursConsulted: 156,
    rating: 4.9,
    completedProjects: 32
  });

  const [consultations] = useState([
    {
      id: 1,
      client: 'TechCorp Inc',
      type: 'Стратегическое консультирование',
      rate: 18000,
      hours: 20,
      deadline: '2024-03-15',
      status: 'in-progress'
    },
    {
      id: 2,
      client: 'StartupX',
      type: 'Бизнес-модель',
      rate: 15000,
      hours: 12,
      deadline: '2024-03-20',
      status: 'in-progress'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress': return 'В процессе';
      case 'completed': return 'Завершено';
      case 'pending': return 'Ожидание';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Дашборд консультанта</h1>
        <p className="text-muted-foreground">
          Управляйте консультациями и отслеживайте показатели
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Активных клиентов</span>
              <span className="text-2xl font-bold">{stats.activeClients}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Общий доход</span>
              <span className="text-2xl font-bold">{formatCurrency(stats.totalEarnings)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Ставка/час</span>
              <span className="text-2xl font-bold">{formatCurrency(stats.averageRate)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Часов</span>
              <span className="text-2xl font-bold">{stats.hoursConsulted}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Рейтинг</span>
              <span className="text-2xl font-bold">{stats.rating}/5.0</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Завершено</span>
              <span className="text-2xl font-bold">{stats.completedProjects}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="consultations" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="consultations">Консультации</TabsTrigger>
          <TabsTrigger value="expertise">Экспертиза</TabsTrigger>
          <TabsTrigger value="clients">Клиенты</TabsTrigger>
          <TabsTrigger value="knowledge">База знаний</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="consultations" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Активные консультации</h3>
            <Button>
              <Target className="w-4 h-4 mr-2" />
              Новая консультация
            </Button>
          </div>

          {consultations.map((consultation) => (
            <Card key={consultation.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{consultation.client}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{consultation.type}</p>
                  </div>
                  <Badge className={getStatusColor(consultation.status)}>
                    {getStatusText(consultation.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ставка</p>
                    <p className="text-lg font-semibold">{formatCurrency(consultation.rate)}/ч</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Часов</p>
                    <p className="text-lg font-semibold">{consultation.hours}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Дедлайн</p>
                    <p className="text-lg font-semibold">{consultation.deadline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Сумма</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(consultation.rate * consultation.hours)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="expertise">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                Профиль экспертизы будет доступен в следующей версии
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                Список клиентов будет доступен в следующей версии
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                База знаний будет доступна в следующей версии
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Аналитика консультанта</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Рост дохода</span>
                    <span className="text-sm text-muted-foreground">+24% за месяц</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '76%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Удержание клиентов</span>
                    <span className="text-sm text-muted-foreground">82%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Средняя оценка</span>
                    <span className="text-sm text-muted-foreground">{stats.rating}/5.0</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '98%' }} />
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

export default ConsultantDashboard;
