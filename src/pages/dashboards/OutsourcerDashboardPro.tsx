import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, Users, DollarSign, TrendingUp, 
  Search, Plus, Settings, Target, BarChart3,
  FileText, MessageSquare, Calendar, Award,
  Briefcase, Globe, CheckCircle, Clock
} from 'lucide-react';

const OutsourcerDashboardPro = () => {
  const [activeTab, setActiveTab] = useState('services');

  const stats = {
    activeClients: 12,
    totalRevenue: 3450000,
    projectsCompleted: 87,
    teamMembers: 24,
    avgProjectValue: 580000,
    clientSatisfaction: 4.9
  };

  const services = [
    {
      id: 1,
      title: 'Full-Stack Development',
      description: 'Комплексная разработка веб-приложений от фронтенда до бэкенда',
      price: '150,000 - 500,000 ₽',
      duration: '2-6 месяцев',
      teamSize: '3-8 человек',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      orders: 23,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'Нативные и кроссплатформенные мобильные приложения',
      price: '200,000 - 800,000 ₽',
      duration: '3-8 месяцев',
      teamSize: '4-10 человек',
      technologies: ['React Native', 'Flutter', 'iOS', 'Android'],
      orders: 15,
      rating: 4.9
    },
    {
      id: 3,
      title: 'DevOps & Infrastructure',
      description: 'Настройка CI/CD, облачной инфраструктуры и мониторинга',
      price: '80,000 - 300,000 ₽',
      duration: '1-3 месяца',
      teamSize: '2-5 человек',
      technologies: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'],
      orders: 31,
      rating: 4.7
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-commerce платформа для ритейла',
      client: 'RetailCorp',
      status: 'in-progress',
      progress: 75,
      team: 6,
      deadline: '2024-03-15',
      budget: 850000,
      service: 'Full-Stack Development'
    },
    {
      id: 2,
      title: 'Мобильное приложение для логистики',
      client: 'LogiTech Solutions',
      status: 'planning',
      progress: 15,
      team: 4,
      deadline: '2024-05-01',
      budget: 650000,
      service: 'Mobile App Development'
    },
    {
      id: 3,
      title: 'Миграция в облако AWS',
      client: 'TechStart Inc',
      status: 'review',
      progress: 95,
      team: 3,
      deadline: '2024-02-20',
      budget: 180000,
      service: 'DevOps & Infrastructure'
    }
  ];

  const team = [
    {
      id: 1,
      name: 'Анна Волкова',
      role: 'Senior Full-Stack Developer',
      experience: '6 лет',
      currentProjects: 2,
      utilization: 85,
      skills: ['React', 'Node.js', 'TypeScript']
    },
    {
      id: 2,
      name: 'Михаил Сидоров',
      role: 'DevOps Engineer',
      experience: '4 года',
      currentProjects: 3,
      utilization: 90,
      skills: ['AWS', 'Docker', 'Kubernetes']
    },
    {
      id: 3,
      name: 'Елена Петрова',
      role: 'Mobile Developer',
      experience: '5 лет',
      currentProjects: 1,
      utilization: 70,
      skills: ['React Native', 'Flutter', 'iOS']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'default';
      case 'planning': return 'secondary';
      case 'review': return 'outline';
      case 'completed': return 'default';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress': return 'В работе';
      case 'planning': return 'Планирование';
      case 'review': return 'На ревью';
      case 'completed': return 'Завершен';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8 text-blue-500" />
            Кабинет аутсорсера
          </h1>
          <p className="text-muted-foreground">Управление услугами, проектами и командой</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Новая услуга
          </Button>
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Найти таланты
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Клиенты</p>
              <p className="text-2xl font-bold text-blue-600">{stats.activeClients}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Доход</p>
              <p className="text-xl font-bold text-green-600">{(stats.totalRevenue / 1000000).toFixed(1)}М ₽</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Проекты</p>
              <p className="text-2xl font-bold text-purple-600">{stats.projectsCompleted}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Команда</p>
              <p className="text-2xl font-bold text-orange-600">{stats.teamMembers}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Ср. проект</p>
              <p className="text-xl font-bold">{(stats.avgProjectValue / 1000).toFixed(0)}k ₽</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Рейтинг</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.clientSatisfaction}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services">
            <Briefcase className="h-4 w-4 mr-2" />
            Витрина услуг
          </TabsTrigger>
          <TabsTrigger value="projects">
            <Target className="h-4 w-4 mr-2" />
            Проекты
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="h-4 w-4 mr-2" />
            Команда
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Аналитика
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Каталог услуг</CardTitle>
              <CardDescription>Управление предложениями для клиентов</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {services.map((service) => (
                  <Card key={service.id}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold">{service.title}</h3>
                            <p className="text-muted-foreground mt-1">{service.description}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">{service.rating} ★</Badge>
                            <p className="text-sm text-muted-foreground mt-1">{service.orders} заказов</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Стоимость</p>
                            <p className="font-bold">{service.price}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Длительность</p>
                            <p className="font-bold">{service.duration}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Команда</p>
                            <p className="font-bold">{service.teamSize}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Технологии:</p>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline">{tech}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-2" />
                            Редактировать
                          </Button>
                          <Button size="sm" variant="outline">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Статистика
                          </Button>
                          <Button size="sm">
                            <Globe className="h-4 w-4 mr-2" />
                            Опубликовать
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

        <TabsContent value="projects" className="space-y-6">
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <p className="text-muted-foreground">Клиент: {project.client}</p>
                        <p className="text-sm text-muted-foreground">Услуга: {project.service}</p>
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

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Прогресс выполнения</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="w-full" />
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Бюджет</p>
                        <p className="font-bold">{(project.budget / 1000).toFixed(0)}k ₽</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Команда</p>
                        <p className="font-bold">{project.team} человек</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Дедлайн</p>
                        <p className="font-bold">{project.deadline}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Статус</p>
                        <p className="font-bold">{getStatusText(project.status)}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Связаться с клиентом
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Планирование
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Документы
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Управление ресурсами</CardTitle>
              <CardDescription>Распределение команды по проектам</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {team.map((member) => (
                  <div key={member.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <p className="text-xs text-muted-foreground">Опыт: {member.experience}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Загрузка: {member.utilization}%</p>
                        <p className="text-sm text-muted-foreground">{member.currentProjects} проектов</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Утилизация ресурса</span>
                        <span>{member.utilization}%</span>
                      </div>
                      <Progress value={member.utilization} className="w-full" />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Ключевые навыки:</p>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Планировать
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Связаться
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Производительность
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Метрики производительности</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Время выполнения</p>
                      <p className="text-2xl font-bold text-green-600">95%</p>
                      <p className="text-xs text-muted-foreground">в срок</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Качество кода</p>
                      <p className="text-2xl font-bold text-blue-600">98%</p>
                      <p className="text-xs text-muted-foreground">без критических багов</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Удовлетворенность клиентов</p>
                    <div className="flex items-center gap-2">
                      <Progress value={98} className="flex-1" />
                      <span className="text-sm font-medium">4.9/5</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Загрузка команды</p>
                    <div className="flex items-center gap-2">
                      <Progress value={82} className="flex-1" />
                      <span className="text-sm font-medium">82%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Финансовые показатели</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Месячный доход</p>
                    <p className="text-2xl font-bold text-green-600">{(stats.totalRevenue / 12 / 1000).toFixed(0)}k ₽</p>
                    <p className="text-xs text-green-600">+15% к прошлому месяцу</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Средний чек</p>
                    <p className="text-2xl font-bold">{(stats.avgProjectValue / 1000).toFixed(0)}k ₽</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Прибыльность</p>
                    <p className="text-2xl font-bold text-purple-600">28%</p>
                    <p className="text-xs text-muted-foreground">margin</p>
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

export default OutsourcerDashboardPro;