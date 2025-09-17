import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Target, 
  TrendingUp, 
  Users,
  Plus,
  FileText,
  Clock,
  BarChart3
} from 'lucide-react';

const CoOwnerDashboard = () => {
  const stats = [
    { title: 'Активные поиски', value: '4', change: '+2', icon: Search },
    { title: 'Отклики отправлено', value: '12', change: '+5', icon: FileText },
    { title: 'Встречи назначены', value: '6', change: '+3', icon: Clock },
    { title: 'Успешных партнёрств', value: '3', change: '+1', icon: TrendingUp }
  ];

  const searchCriteria = [
    { name: 'FinTech проекты', budget: '1-5 млн ₽', stage: 'Seed-Series A', matches: 8 },
    { name: 'EdTech стартапы', budget: '2-8 млн ₽', stage: 'MVP-Growth', matches: 12 },
    { name: 'SaaS B2B', budget: '3-10 млн ₽', stage: 'Series A', matches: 6 }
  ];

  const potentialProjects = [
    {
      name: 'AI-платформа для документооборота',
      founder: 'Игорь Волков', 
      stage: 'Series A',
      funding: '7 млн ₽',
      equity: '8-15%',
      match: 92
    },
    {
      name: 'Платформа электронной коммерции',
      founder: 'Елена Морозова',
      stage: 'Seed',
      funding: '3 млн ₽', 
      equity: '12-20%',
      match: 89
    },
    {
      name: 'Система управления складом',
      founder: 'Андрей Лебедев',
      stage: 'MVP',
      funding: '5 млн ₽',
      equity: '10-18%',
      match: 85
    }
  ];

  const meetings = [
    { project: 'AI-платформа для документооборота', date: '15.12.2024', time: '14:00', status: 'upcoming' },
    { project: 'Платформа электронной коммерции', date: '18.12.2024', time: '16:30', status: 'scheduled' },
    { project: 'Система управления складом', date: '20.12.2024', time: '11:00', status: 'tentative' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">🔗 Соучредитель</h1>
          <p className="text-muted-foreground">Поиск проектов для долгосрочного участия</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Новый поиск
          </Button>
          <Button variant="outline">
            <Target className="h-4 w-4 mr-2" />
            Настроить критерии
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change}</p>
                  </div>
                  <IconComponent className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Criteria */}
        <Card>
          <CardHeader>
            <CardTitle>Критерии поиска</CardTitle>
            <CardDescription>Ваши активные поисковые запросы</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {searchCriteria.map((criteria, index) => (
              <div key={index} className="p-3 border rounded-lg space-y-2">
                <h4 className="font-medium text-sm">{criteria.name}</h4>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>💰 Бюджет: {criteria.budget}</p>
                  <p>📈 Стадия: {criteria.stage}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-green-600">
                    {criteria.matches} совпадений
                  </span>
                  <Button size="sm" variant="outline">
                    Просмотр
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Potential Projects */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Потенциальные проекты</CardTitle>
            <CardDescription>Рекомендованные проекты для участия</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {potentialProjects.map((project, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-medium">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">Основатель: {project.founder}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{project.match}% совпадение</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Стадия: </span>
                    <span className="font-medium">{project.stage}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Инвестиции: </span>
                    <span className="font-medium">{project.funding}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Доля соучредителя: </span>
                    <span className="font-medium">{project.equity}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Подробнее</Button>
                  <Button size="sm">Отправить предложение</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader>
          <CardTitle>Запланированные встречи</CardTitle>
          <CardDescription>Ваши предстоящие переговоры</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meetings.map((meeting, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{meeting.project}</h4>
                  <p className="text-sm text-muted-foreground">
                    📅 {meeting.date} в {meeting.time}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    meeting.status === 'upcoming' ? 'default' :
                    meeting.status === 'scheduled' ? 'secondary' : 'outline'
                  }>
                    {meeting.status === 'upcoming' ? 'Скоро' :
                     meeting.status === 'scheduled' ? 'Запланировано' : 'Предварительно'}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Clock className="h-3 w-3 mr-2" />
                    Детали
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoOwnerDashboard;