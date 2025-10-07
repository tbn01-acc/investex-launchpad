import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Briefcase, DollarSign, Star, Clock, 
  Plus, Eye, Search, Filter, MessageSquare
} from 'lucide-react';
import { MessagesTab } from '@/components/MessagesTab';

export default function FreelancerDashboard() {
  const { user, profile } = useAuth();
  const { t, formatCurrency } = useLanguage();
  
  const [stats] = useState({
    completedProjects: 24,
    totalEarnings: 890000,
    averageRating: 4.8,
    activeProjects: 3,
    hoursWorked: 1240,
    responseRate: 95
  });

  const [activeProjects] = useState([
    {
      id: 1,
      title: 'Разработка мобильного приложения',
      client: 'ТехСтарт ООО',
      budget: 250000,
      deadline: '2024-03-15',
      progress: 75,
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'Дизайн корпоративного сайта',
      client: 'Инновации Плюс',
      budget: 120000,
      deadline: '2024-02-28',
      progress: 90,
      status: 'review'
    },
    {
      id: 3,
      title: 'SEO-оптимизация интернет-магазина',
      client: 'Онлайн Ритейл',
      budget: 80000,
      deadline: '2024-03-01',
      progress: 45,
      status: 'in-progress'
    }
  ]);

  const [availableProjects] = useState([
    {
      id: 1,
      title: 'Создание API для финтех-стартапа',
      description: 'Требуется разработать REST API для мобильного банковского приложения',
      budget: 350000,
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      client: 'ФинТехСофт',
      deadline: '2024-04-15',
      proposals: 12,
      posted: '2 дня назад'
    },
    {
      id: 2,
      title: 'UI/UX дизайн для marketplace',
      description: 'Разработка пользовательского интерфейса для онлайн-маркетплейса',
      budget: 180000,
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      client: 'МаркетПлейс Про',
      deadline: '2024-03-30',
      proposals: 8,
      posted: '1 день назад'
    },
    {
      id: 3,
      title: 'Разработка чат-бота для поддержки',
      description: 'Создание интеллектуального чат-бота для службы поддержки клиентов',
      budget: 150000,
      skills: ['Node.js', 'AI/ML', 'Telegram Bot API', 'Natural Language Processing'],
      client: 'СапортТех',
      deadline: '2024-04-01',
      proposals: 15,
      posted: '3 дня назад'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-500';
      case 'review': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress': return 'В работе';
      case 'review': return 'На проверке';
      case 'completed': return 'Завершен';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Личный кабинет фрилансера</h1>
            <p className="text-muted-foreground">
              {t('common.welcome')}, {profile?.first_name || 'Фрилансер'}
            </p>
          </div>
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Найти проекты
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Выполнено проектов</p>
                  <p className="text-3xl font-bold">{stats.completedProjects}</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Всего заработано</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.totalEarnings)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Средний рейтинг</p>
                  <p className="text-3xl font-bold">{stats.averageRating}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(stats.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Часов отработано</p>
                  <p className="text-3xl font-bold">{stats.hoursWorked}</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.responseRate}% ответов
                  </p>
                </div>
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">
              <Briefcase className="h-4 w-4 mr-2" />
              Активные проекты
            </TabsTrigger>
            <TabsTrigger value="available">
              <Search className="h-4 w-4 mr-2" />
              Доступные проекты
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              {t('common.messages')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>Клиент: {project.client}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusText(project.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Бюджет: {formatCurrency(project.budget)}</span>
                        <span>Дедлайн: {new Date(project.deadline).toLocaleDateString('ru-RU')}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Прогресс</span>
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
                          Продолжить работу
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="available">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Подходящие проекты</h3>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Фильтры
                </Button>
              </div>
              
              {availableProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{formatCurrency(project.budget)}</p>
                        <p className="text-sm text-muted-foreground">{project.posted}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Клиент</p>
                          <p className="font-medium">{project.client}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Дедлайн</p>
                          <p className="font-medium">{new Date(project.deadline).toLocaleDateString('ru-RU')}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Предложений</p>
                          <p className="font-medium">{project.proposals}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Подробнее
                        </Button>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Откликнуться
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <MessagesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}