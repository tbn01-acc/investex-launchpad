import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  FileText, 
  Calendar, 
  Target,
  Plus,
  User,
  Building,
  TrendingUp
} from 'lucide-react';

const JobSeekerDashboard = () => {
  const stats = [
    { title: 'Активные заявки', value: '8', change: '+3', icon: FileText },
    { title: 'Просмотры профиля', value: '24', change: '+12', icon: User },
    { title: 'Назначенные собеседования', value: '3', change: '+2', icon: Calendar },
    { title: 'Подходящие вакансии', value: '15', change: '+5', icon: Target }
  ];

  const applications = [
    { 
      company: 'TechStart AI', 
      position: 'Frontend Developer', 
      salary: '120-150k ₽', 
      status: 'interview',
      applied: '3 дня назад'
    },
    { 
      company: 'FinFlow Solutions', 
      position: 'React Developer', 
      salary: '100-130k ₽', 
      status: 'review',
      applied: '1 неделя назад'
    },
    { 
      company: 'Digital Wave', 
      position: 'Full Stack Developer', 
      salary: '140-180k ₽', 
      status: 'pending',
      applied: '2 дня назад'
    }
  ];

  const recommendations = [
    {
      company: 'InnovateLab',
      position: 'Senior Frontend Developer',
      salary: '150-200k ₽',
      type: 'remote',
      match: 95,
      description: 'Разработка современных веб-приложений на React'
    },
    {
      company: 'StartupHub',
      position: 'JavaScript Developer', 
      salary: '120-160k ₽',
      type: 'hybrid',
      match: 88,
      description: 'Работа над платформой для стартапов'
    },
    {
      company: 'CloudTech',
      position: 'React Native Developer',
      salary: '130-170k ₽', 
      type: 'office',
      match: 82,
      description: 'Мобильная разработка для корпоративных клиентов'
    }
  ];

  const interviews = [
    { company: 'TechStart AI', position: 'Frontend Developer', date: '15.12.2024', time: '14:00', stage: 'Техническое интервью' },
    { company: 'NewGen Systems', position: 'React Developer', date: '17.12.2024', time: '10:30', stage: 'HR интервью' },
    { company: 'Innovation Corp', position: 'Full Stack Developer', date: '19.12.2024', time: '16:00', stage: 'Финальное интервью' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">👤 Соискатель</h1>
          <p className="text-muted-foreground">Поиск работы и карьерные возможности</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Найти вакансии
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Обновить резюме
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
        {/* Applications Status */}
        <Card>
          <CardHeader>
            <CardTitle>Мои заявки</CardTitle>
            <CardDescription>Статус поданных заявок</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {applications.map((app, index) => (
              <div key={index} className="p-3 border rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm">{app.position}</h4>
                    <p className="text-xs text-muted-foreground">{app.company}</p>
                  </div>
                  <Badge variant={
                    app.status === 'interview' ? 'default' :
                    app.status === 'review' ? 'secondary' : 'outline'
                  }>
                    {app.status === 'interview' ? 'Интервью' :
                     app.status === 'review' ? 'Рассмотрение' : 'Ожидание'}
                  </Badge>
                </div>
                <div className="text-xs space-y-1">
                  <p className="font-medium">💰 {app.salary}</p>
                  <p className="text-muted-foreground">📅 {app.applied}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recommended Jobs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Рекомендованные вакансии</CardTitle>
            <CardDescription>Подобранные специально для вас</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((job, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-medium">{job.position}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Building className="h-3 w-3" />
                      {job.company}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant="secondary">{job.match}% совпадение</Badge>
                    <Badge variant="outline" className="block">
                      {job.type === 'remote' ? '🏠 Удаленно' :
                       job.type === 'hybrid' ? '🏢 Гибрид' : '🏢 Офис'}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm">{job.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium text-green-600">{job.salary}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Подробнее</Button>
                    <Button size="sm">Откликнуться</Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Interviews */}
      <Card>
        <CardHeader>
          <CardTitle>Предстоящие собеседования</CardTitle>
          <CardDescription>Ваш календарь интервью</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interviews.map((interview, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{interview.position}</h4>
                  <p className="text-sm text-muted-foreground">{interview.company}</p>
                  <p className="text-xs text-muted-foreground">
                    📅 {interview.date} в {interview.time}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{interview.stage}</Badge>
                  <Button size="sm" variant="outline">
                    <Calendar className="h-3 w-3 mr-2" />
                    Подготовиться
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Strength */}
      <Card>
        <CardHeader>
          <CardTitle>Сила профиля</CardTitle>
          <CardDescription>Рекомендации по улучшению</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Заполненность профиля</span>
              <span className="font-medium">85%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary rounded-full h-2" style={{ width: '85%' }}></div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                ✅ Основная информация
              </p>
              <p className="flex items-center gap-2">
                ✅ Опыт работы и образование
              </p>
              <p className="flex items-center gap-2">
                ⚠️ Добавьте портфолио проектов
              </p>
              <p className="flex items-center gap-2">
                ⚠️ Укажите дополнительные навыки
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobSeekerDashboard;