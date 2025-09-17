import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Briefcase, Users, DollarSign, Star, Clock,
  Plus, Filter, Calendar, Eye, MessageSquare,
  FileText, TrendingUp, CheckCircle, Play,
  Pause, Settings, BarChart3
} from 'lucide-react';

const FreelancerDashboardPro = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const stats = {
    activeProjects: 7,
    completedProjects: 42,
    monthlyIncome: 285000,
    avgRating: 4.8,
    totalClients: 28,
    hoursWorked: 156
  };

  const projects = [
    {
      id: 1,
      title: 'Веб-приложение для e-commerce',
      client: 'TechStart LLC',
      status: 'in-progress',
      progress: 65,
      deadline: '2024-02-28',
      budget: 450000,
      hoursLogged: 58,
      estimatedHours: 80,
      hourlyRate: 4500
    },
    {
      id: 2,
      title: 'Мобильное приложение для доставки',
      client: 'DeliveryPro',
      status: 'in-progress',
      progress: 35,
      deadline: '2024-03-15',
      budget: 720000,
      hoursLogged: 32,
      estimatedHours: 120,
      hourlyRate: 5000
    },
    {
      id: 3,
      title: 'Редизайн корпоративного сайта',
      client: 'Business Corp',
      status: 'review',
      progress: 95,
      deadline: '2024-02-15',
      budget: 180000,
      hoursLogged: 35,
      estimatedHours: 36,
      hourlyRate: 4000
    }
  ];

  const portfolio = [
    {
      id: 1,
      title: 'FinTech Dashboard',
      category: 'Web Development',
      client: 'FinanceFlow',
      image: '/api/placeholder/300/200',
      rating: 5,
      testimonial: 'Отличная работа, выполнено в срок и с высоким качеством'
    },
    {
      id: 2,
      title: 'E-learning Platform',
      category: 'Full-Stack Development',
      client: 'EduTech Solutions',
      image: '/api/placeholder/300/200',
      rating: 4.8,
      testimonial: 'Профессиональный подход и внимание к деталям'
    }
  ];

  const clients = [
    {
      id: 1,
      name: 'TechStart LLC',
      projectsCount: 5,
      totalPaid: 1250000,
      lastProject: '2024-01-20',
      rating: 4.9,
      status: 'active'
    },
    {
      id: 2,
      name: 'DeliveryPro',
      projectsCount: 3,
      totalPaid: 850000,
      lastProject: '2024-01-15',
      rating: 4.7,
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'default';
      case 'review': return 'secondary';
      case 'completed': return 'outline';
      case 'paused': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress': return 'В работе';
      case 'review': return 'На ревью';
      case 'completed': return 'Завершен';
      case 'paused': return 'Приостановлен';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-purple-500" />
            Кабинет фрилансера
          </h1>
          <p className="text-muted-foreground">Управление проектами и клиентскими отношениями</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Новый проект
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Тайм-трекер
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Активные</p>
              <p className="text-2xl font-bold text-blue-600">{stats.activeProjects}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Завершено</p>
              <p className="text-2xl font-bold text-green-600">{stats.completedProjects}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Доход</p>
              <p className="text-xl font-bold">{(stats.monthlyIncome / 1000).toFixed(0)}k ₽</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Рейтинг</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.avgRating}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Клиенты</p>
              <p className="text-2xl font-bold">{stats.totalClients}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Часы</p>
              <p className="text-2xl font-bold">{stats.hoursWorked}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">
            <Briefcase className="h-4 w-4 mr-2" />
            Проекты
          </TabsTrigger>
          <TabsTrigger value="portfolio">
            <Star className="h-4 w-4 mr-2" />
            Портфолио
          </TabsTrigger>
          <TabsTrigger value="finances">
            <DollarSign className="h-4 w-4 mr-2" />
            Финансы
          </TabsTrigger>
          <TabsTrigger value="clients">
            <Users className="h-4 w-4 mr-2" />
            Клиенты
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription>Клиент: {project.client}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getStatusColor(project.status)}>
                        {getStatusText(project.status)}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Project Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Прогресс выполнения</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="w-full" />
                    </div>

                    {/* Project Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Бюджет</p>
                        <p className="font-bold">{(project.budget / 1000).toFixed(0)}k ₽</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Часы</p>
                        <p className="font-bold">{project.hoursLogged}/{project.estimatedHours}ч</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Ставка</p>
                        <p className="font-bold">{project.hourlyRate} ₽/ч</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Дедлайн</p>
                        <p className="font-bold">{project.deadline}</p>
                      </div>
                    </div>

                    {/* Time Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Время работы</span>
                        <span>{Math.round((project.hoursLogged / project.estimatedHours) * 100)}%</span>
                      </div>
                      <Progress value={(project.hoursLogged / project.estimatedHours) * 100} className="w-full" />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Начать работу
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Связаться
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Детали
                      </Button>
                      {project.status === 'in-progress' && (
                        <Button size="sm" variant="outline">
                          <Pause className="h-4 w-4 mr-2" />
                          Пауза
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Витрина работ</CardTitle>
                  <CardDescription>Лучшие проекты для привлечения новых клиентов</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить работу
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolio.map((work) => (
                  <Card key={work.id}>
                    <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Превью проекта</span>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">{work.title}</h4>
                        <p className="text-sm text-muted-foreground">{work.category}</p>
                        <p className="text-sm">Клиент: {work.client}</p>
                        
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{work.rating}</span>
                        </div>
                        
                        <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary pl-3">
                          "{work.testimonial}"
                        </blockquote>
                        
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Просмотр
                          </Button>
                          <Button size="sm" variant="outline">
                            Редактировать
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finances" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Инвойсы и платежи</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Инвойс #INV-001</p>
                      <p className="text-sm text-muted-foreground">TechStart LLC</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">450,000 ₽</p>
                      <Badge variant="secondary">Отправлен</Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Инвойс #INV-002</p>
                      <p className="text-sm text-muted-foreground">DeliveryPro</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">320,000 ₽</p>
                      <Badge variant="default">Оплачен</Badge>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Создать инвойс
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Финансовая статистика</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Доход за месяц</p>
                      <p className="text-2xl font-bold text-green-600">{(stats.monthlyIncome / 1000).toFixed(0)}k ₽</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Средняя ставка</p>
                      <p className="text-2xl font-bold">4,500 ₽/ч</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Рост дохода</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-green-600 font-medium">+22% к прошлому месяцу</span>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Подробная аналитика
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CRM - Управление клиентами</CardTitle>
              <CardDescription>Все ваши клиенты и история взаимодействий</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clients.map((client) => (
                  <div key={client.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{client.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {client.projectsCount} проектов • Последний: {client.lastProject}
                        </p>
                      </div>
                      <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                        {client.status === 'active' ? 'Активный' : 'Неактивный'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Общая сумма</p>
                        <p className="font-bold">{(client.totalPaid / 1000).toFixed(0)}k ₽</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Рейтинг</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-bold">{client.rating}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Проекты</p>
                        <p className="font-bold">{client.projectsCount}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Написать
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Встреча
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        История
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FreelancerDashboardPro;