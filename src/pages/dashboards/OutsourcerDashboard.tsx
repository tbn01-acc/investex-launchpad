import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Building, Users, DollarSign, Briefcase, 
  Plus, Eye, Search, UserPlus, TrendingUp
} from 'lucide-react';

export default function OutsourcerDashboard() {
  const { user, profile } = useAuth();
  const { t, formatCurrency } = useLanguage();
  
  const [stats] = useState({
    activeProjects: 8,
    teamMembers: 24,
    totalRevenue: 2850000,
    completedProjects: 45,
    clientSatisfaction: 4.7,
    utilizationRate: 87
  });

  const [activeProjects] = useState([
    {
      id: 1,
      name: 'Разработка CRM системы',
      client: 'ТехноКорп',
      budget: 850000,
      allocated: 6,
      deadline: '2024-04-15',
      progress: 65,
      status: 'in-progress',
      type: 'development'
    },
    {
      id: 2,
      name: 'Мобильное приложение доставки',
      client: 'ДоставкаПлюс',
      budget: 650000,
      allocated: 4,
      deadline: '2024-03-30',
      progress: 80,
      status: 'testing',
      type: 'mobile'
    },
    {
      id: 3,
      name: 'Редизайн корпоративного сайта',
      client: 'Инновации ООО',
      budget: 280000,
      allocated: 3,
      deadline: '2024-03-10',
      progress: 95,
      status: 'review',
      type: 'design'
    }
  ]);

  const [teamMembers] = useState([
    {
      id: 1,
      name: 'Алексей Петров',
      role: 'Senior Developer',
      skills: ['React', 'Node.js', 'Python'],
      currentProject: 'CRM система',
      utilization: 100,
      hourlyRate: 3500,
      status: 'busy'
    },
    {
      id: 2,
      name: 'Мария Сидорова',
      role: 'UI/UX Designer',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      currentProject: 'Корпоративный сайт',
      utilization: 90,
      hourlyRate: 2800,
      status: 'busy'
    },
    {
      id: 3,
      name: 'Дмитрий Иванов',
      role: 'Mobile Developer',
      skills: ['React Native', 'Swift', 'Kotlin'],
      currentProject: null,
      utilization: 0,
      hourlyRate: 3200,
      status: 'available'
    }
  ]);

  const [availableOpportunities] = useState([
    {
      id: 1,
      title: 'E-commerce платформа',
      client: 'РитейлТех',
      budget: 1200000,
      duration: '4 месяца',
      skills: ['Vue.js', 'Laravel', 'MySQL'],
      teamSize: 5,
      deadline: '2024-08-01'
    },
    {
      id: 2,
      title: 'Система аналитики данных',
      client: 'ДатаПро',
      budget: 950000,
      duration: '3 месяца',
      skills: ['Python', 'Django', 'PostgreSQL'],
      teamSize: 4,
      deadline: '2024-07-15'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-500';
      case 'testing': return 'bg-yellow-500';
      case 'review': return 'bg-purple-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress': return 'В работе';
      case 'testing': return 'Тестирование';
      case 'review': return 'На проверке';
      case 'completed': return 'Завершен';
      default: return 'Неизвестно';
    }
  };

  const getMemberStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'vacation': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getMemberStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Доступен';
      case 'busy': return 'Занят';
      case 'vacation': return 'Отпуск';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Панель аутсорсера</h1>
            <p className="text-muted-foreground">
              {t('common.welcome')}, {profile?.first_name || 'Аутсорсер'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <UserPlus className="h-4 w-4 mr-2" />
              Нанять специалиста
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Новый проект
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Активных проектов</p>
                  <p className="text-3xl font-bold">{stats.activeProjects}</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Участников команды</p>
                  <p className="text-3xl font-bold">{stats.teamMembers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Общий доход</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Загрузка команды</p>
                  <p className="text-3xl font-bold">{stats.utilizationRate}%</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.completedProjects} завершенных
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects">
              <Briefcase className="h-4 w-4 mr-2" />
              Проекты
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="h-4 w-4 mr-2" />
              Команда
            </TabsTrigger>
            <TabsTrigger value="opportunities">
              <Search className="h-4 w-4 mr-2" />
              Возможности
            </TabsTrigger>
            <TabsTrigger value="finance">
              <DollarSign className="h-4 w-4 mr-2" />
              Финансы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription>Клиент: {project.client}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusText(project.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Бюджет</p>
                          <p className="font-medium">{formatCurrency(project.budget)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Команда</p>
                          <p className="font-medium">{project.allocated} человек</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Дедлайн</p>
                          <p className="font-medium">{new Date(project.deadline).toLocaleDateString('ru-RU')}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Тип</p>
                          <p className="font-medium">{project.type}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Прогресс выполнения</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Подробнее
                        </Button>
                        <Button size="sm">
                          Управление
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          Команда
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Управление командой</CardTitle>
                  <CardDescription>Статус и загрузка участников</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                            <div className="flex gap-1 mt-1">
                              {member.skills.slice(0, 3).map((skill, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Проект</p>
                          <p className="font-medium text-sm">
                            {member.currentProject || 'Не назначен'}
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Загрузка</p>
                          <p className="font-medium">{member.utilization}%</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Ставка</p>
                          <p className="font-medium">{formatCurrency(member.hourlyRate)}/час</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={getMemberStatusColor(member.status)}>
                            {getMemberStatusText(member.status)}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="opportunities">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Доступные проекты</CardTitle>
                  <CardDescription>Новые возможности для вашей команды</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {availableOpportunities.map((opportunity) => (
                      <Card key={opportunity.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                              <CardDescription>Клиент: {opportunity.client}</CardDescription>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">{formatCurrency(opportunity.budget)}</p>
                              <p className="text-sm text-muted-foreground">{opportunity.duration}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                              {opportunity.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Размер команды</p>
                                <p className="font-medium">{opportunity.teamSize} человек</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Дедлайн</p>
                                <p className="font-medium">{new Date(opportunity.deadline).toLocaleDateString('ru-RU')}</p>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Подробнее
                              </Button>
                              <Button size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Подать заявку
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="finance">
            <Card>
              <CardHeader>
                <CardTitle>Финансовая отчетность</CardTitle>
                <CardDescription>Доходы, расходы и прибыльность</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Доходы за месяц</p>
                    <p className="text-2xl font-bold">{formatCurrency(450000)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Расходы на команду</p>
                    <p className="text-2xl font-bold">{formatCurrency(320000)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Прибыль</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(130000)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}