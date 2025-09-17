import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Wrench, Users, DollarSign, TrendingUp, 
  Search, Plus, Settings, Target, BarChart3,
  FileText, MessageSquare, Calendar, Award,
  Clock, CheckCircle, AlertCircle
} from 'lucide-react';

const ContractorDashboardPro = () => {
  const [activeTab, setActiveTab] = useState('contracts');

  const stats = {
    activeContracts: 8,
    totalRevenue: 1850000,
    contractsCompleted: 34,
    avgContractValue: 340000,
    clientRetention: 85,
    onTimeDelivery: 94
  };

  const contracts = [
    {
      id: 1,
      title: 'Интеграция CRM системы',
      client: 'BusinessCorp',
      type: 'Временный контракт',
      status: 'active',
      progress: 60,
      duration: '3 месяца',
      budget: 450000,
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      hourlyRate: 3500
    },
    {
      id: 2,
      title: 'Автоматизация бизнес-процессов',
      client: 'TechSolutions',
      type: 'Долгосрочный контракт',
      status: 'planning',
      progress: 10,
      duration: '6 месяцев',
      budget: 780000,
      startDate: '2024-02-01',
      endDate: '2024-08-01',
      hourlyRate: 4000
    },
    {
      id: 3,
      title: 'Консалтинг по архитектуре',
      client: 'StartupInc',
      type: 'Почасовой контракт',
      status: 'review',
      progress: 90,
      duration: '1 месяц',
      budget: 180000,
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      hourlyRate: 5000
    }
  ];

  const opportunities = [
    {
      id: 1,
      title: 'Senior Backend Developer',
      company: 'FinTech Pro',
      type: 'Контракт на проект',
      duration: '4-6 месяцев',
      rate: '4,500 ₽/час',
      skills: ['Python', 'Django', 'PostgreSQL'],
      remote: true,
      posted: '2 дня назад'
    },
    {
      id: 2,
      title: 'DevOps Consultant',
      company: 'CloudSystems',
      type: 'Долгосрочный контракт',
      duration: '12 месяцев',
      rate: '5,000 ₽/час',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      remote: false,
      posted: '1 день назад'
    }
  ];

  const skills = [
    { name: 'Python', level: 90, inDemand: true },
    { name: 'JavaScript', level: 85, inDemand: true },
    { name: 'AWS', level: 75, inDemand: true },
    { name: 'Docker', level: 80, inDemand: false },
    { name: 'React', level: 70, inDemand: true }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'planning': return 'secondary';
      case 'review': return 'outline';
      case 'completed': return 'default';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активный';
      case 'planning': return 'Планирование';
      case 'review': return 'На ревью';
      case 'completed': return 'Завершен';
      default: return 'Неизвестно';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'planning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'review': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Wrench className="h-8 w-8 text-orange-500" />
            Кабинет подрядчика
          </h1>
          <p className="text-muted-foreground">Управление контрактами и поиск проектов</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Найти контракты
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Предложить услуги
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Активные</p>
              <p className="text-2xl font-bold text-blue-600">{stats.activeContracts}</p>
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
              <p className="text-sm text-muted-foreground">Завершено</p>
              <p className="text-2xl font-bold text-purple-600">{stats.contractsCompleted}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Ср. контракт</p>
              <p className="text-xl font-bold">{(stats.avgContractValue / 1000).toFixed(0)}k ₽</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Удержание</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.clientRetention}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">В срок</p>
              <p className="text-2xl font-bold text-green-600">{stats.onTimeDelivery}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contracts">
            <FileText className="h-4 w-4 mr-2" />
            Контракты
          </TabsTrigger>
          <TabsTrigger value="opportunities">
            <Search className="h-4 w-4 mr-2" />
            Возможности
          </TabsTrigger>
          <TabsTrigger value="skills">
            <Award className="h-4 w-4 mr-2" />
            Навыки
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Аналитика
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-6">
          <div className="space-y-4">
            {contracts.map((contract) => (
              <Card key={contract.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{contract.title}</h3>
                        <p className="text-muted-foreground">Клиент: {contract.client}</p>
                        <p className="text-sm text-muted-foreground">{contract.type}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        {getStatusIcon(contract.status)}
                        <Badge variant={getStatusColor(contract.status)}>
                          {getStatusText(contract.status)}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Прогресс выполнения</span>
                        <span>{contract.progress}%</span>
                      </div>
                      <Progress value={contract.progress} className="w-full" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Бюджет</p>
                        <p className="font-bold">{(contract.budget / 1000).toFixed(0)}k ₽</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Ставка</p>
                        <p className="font-bold">{contract.hourlyRate} ₽/ч</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Длительность</p>
                        <p className="font-bold">{contract.duration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Окончание</p>
                        <p className="font-bold">{contract.endDate}</p>
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
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Настройки
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Доступные контракты</CardTitle>
              <CardDescription>Новые возможности для вашего профиля</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opportunity) => (
                  <div key={opportunity.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{opportunity.title}</h4>
                        <p className="text-sm text-muted-foreground">{opportunity.company}</p>
                        <p className="text-xs text-muted-foreground">
                          {opportunity.type} • {opportunity.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{opportunity.rate}</p>
                        <p className="text-xs text-muted-foreground">{opportunity.posted}</p>
                        {opportunity.remote && (
                          <Badge variant="outline" className="mt-1">Удаленно</Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Требуемые навыки:</p>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm">
                        Подать заявку
                      </Button>
                      <Button size="sm" variant="outline">
                        Подробнее
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Связаться
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Профиль навыков</CardTitle>
                <CardDescription>Ваша экспертиза и востребованность на рынке</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{skill.name}</span>
                          {skill.inDemand && (
                            <Badge variant="secondary" className="text-xs">В тренде</Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Рекомендации по развитию</CardTitle>
                <CardDescription>AI-советы для роста карьеры</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium">🚀 Изучите Kubernetes</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Спрос на DevOps с Kubernetes вырос на 80%, ставки выше на 25%
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium">💰 Повысьте ставку</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ваши навыки позволяют брать 5,500 ₽/час вместо текущих 4,000 ₽/час
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium">🎯 Сертификация AWS</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Сертификат AWS Solutions Architect увеличит ваши шансы на 60%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Эффективность работы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Выполнение в срок</p>
                    <div className="flex items-center gap-2">
                      <Progress value={stats.onTimeDelivery} className="flex-1" />
                      <span className="text-sm font-medium">{stats.onTimeDelivery}%</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Удержание клиентов</p>
                    <div className="flex items-center gap-2">
                      <Progress value={stats.clientRetention} className="flex-1" />
                      <span className="text-sm font-medium">{stats.clientRetention}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Рейтинг</p>
                      <p className="text-2xl font-bold text-yellow-600">4.8</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Повторные заказы</p>
                      <p className="text-2xl font-bold text-green-600">67%</p>
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
                    <p className="text-xs text-green-600">+18% к прошлому месяцу</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Средняя ставка</p>
                    <p className="text-2xl font-bold">4,100 ₽/ч</p>
                    <p className="text-xs text-muted-foreground">по всем контрактам</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Рост дохода</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-green-600 font-medium">+28% за год</span>
                    </div>
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

export default ContractorDashboardPro;