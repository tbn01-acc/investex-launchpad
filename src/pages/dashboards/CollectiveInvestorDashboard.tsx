import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Users, DollarSign, PieChart, Target, 
  Plus, Eye, BarChart3, TrendingUp, UserPlus
} from 'lucide-react';

export default function CollectiveInvestorDashboard() {
  const { user, profile } = useAuth();
  const { t, formatCurrency } = useLanguage();
  
  const [stats] = useState({
    groupInvestments: 8,
    totalInvested: 850000,
    totalReturn: 195000,
    returnPercentage: 22.9,
    activeGroups: 3,
    membersInvited: 12
  });

  const [investmentGroups] = useState([
    {
      id: 1,
      name: 'AI & Machine Learning Fund',
      members: 15,
      totalPool: 2500000,
      myContribution: 250000,
      projects: 5,
      averageReturn: 28.5,
      status: 'active',
      nextMeeting: '2024-02-15'
    },
    {
      id: 2,
      name: 'GreenTech Investment Club',
      members: 8,
      totalPool: 1200000,
      myContribution: 150000,
      projects: 3,
      averageReturn: 15.2,
      status: 'active',
      nextMeeting: '2024-02-20'
    },
    {
      id: 3,
      name: 'Fintech Opportunities',
      members: 12,
      totalPool: 1800000,
      myContribution: 200000,
      projects: 4,
      averageReturn: 31.8,
      status: 'voting',
      nextMeeting: '2024-02-12'
    }
  ]);

  const [availableGroups] = useState([
    {
      id: 1,
      name: 'HealthTech Ventures',
      description: 'Инвестиции в медицинские технологии и биотех',
      members: 6,
      targetPool: 3000000,
      currentPool: 1800000,
      minContribution: 100000,
      expectedReturn: '20-35%',
      riskLevel: 'medium'
    },
    {
      id: 2,
      name: 'EdTech Revolution',
      description: 'Образовательные технологии и онлайн-платформы',
      members: 10,
      targetPool: 2000000,
      currentPool: 1400000,
      minContribution: 75000,
      expectedReturn: '15-25%',
      riskLevel: 'low'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'voting': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активна';
      case 'voting': return 'Голосование';
      case 'completed': return 'Завершена';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Коллективные инвестиции</h1>
            <p className="text-muted-foreground">
              {t('common.welcome')}, {profile?.first_name || 'Инвестор'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <UserPlus className="h-4 w-4 mr-2" />
              Создать группу
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Найти группу
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Групповых инвестиций</p>
                  <p className="text-3xl font-bold">{stats.groupInvestments}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Всего инвестировано</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.totalInvested)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Доходность</p>
                  <p className="text-2xl font-bold text-green-600">
                    +{formatCurrency(stats.totalReturn)}
                  </p>
                  <p className="text-sm text-green-600">+{stats.returnPercentage}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Активных групп</p>
                  <p className="text-3xl font-bold">{stats.activeGroups}</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.membersInvited} приглашенных
                  </p>
                </div>
                <PieChart className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="groups" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="groups">
              <Users className="h-4 w-4 mr-2" />
              Мои группы
            </TabsTrigger>
            <TabsTrigger value="discover">
              <Target className="h-4 w-4 mr-2" />
              Найти группы
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="network">
              <UserPlus className="h-4 w-4 mr-2" />
              Сеть
            </TabsTrigger>
          </TabsList>

          <TabsContent value="groups">
            <div className="space-y-4">
              {investmentGroups.map((group) => (
                <Card key={group.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <CardDescription>
                          {group.members} участников • {group.projects} проектов
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(group.status)}>
                        {getStatusText(group.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Общий пул</p>
                          <p className="font-medium">{formatCurrency(group.totalPool)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Мой вклад</p>
                          <p className="font-medium">{formatCurrency(group.myContribution)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Доходность</p>
                          <p className="font-medium text-green-600">+{group.averageReturn}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Следующая встреча</p>
                          <p className="font-medium">{new Date(group.nextMeeting).toLocaleDateString('ru-RU')}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Доля в группе</span>
                          <span>{Math.round((group.myContribution / group.totalPool) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(group.myContribution / group.totalPool) * 100}%` }}
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
                        {group.status === 'voting' && (
                          <Button variant="outline" size="sm">
                            <Target className="h-4 w-4 mr-2" />
                            Голосовать
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discover">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Доступные инвестиционные группы</CardTitle>
                  <CardDescription>Присоединяйтесь к существующим группам или создайте новую</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {availableGroups.map((group) => (
                      <Card key={group.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{group.name}</CardTitle>
                              <CardDescription>{group.description}</CardDescription>
                            </div>
                            <Badge variant={group.riskLevel === 'high' ? 'destructive' : 'secondary'}>
                              {group.riskLevel === 'high' ? 'Высокий риск' : 'Средний риск'}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                              <span>Цель: {formatCurrency(group.targetPool)}</span>
                              <span>Собрано: {formatCurrency(group.currentPool)}</span>
                            </div>
                            
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${(group.currentPool / group.targetPool) * 100}%` }}
                              ></div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Участники</p>
                                <p className="font-medium">{group.members}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Мин. взнос</p>
                                <p className="font-medium">{formatCurrency(group.minContribution)}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Ожидаемая доходность</p>
                                <p className="font-medium">{group.expectedReturn}</p>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Подробнее
                              </Button>
                              <Button size="sm">
                                <UserPlus className="h-4 w-4 mr-2" />
                                Присоединиться
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

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Аналитика коллективных инвестиций</CardTitle>
                <CardDescription>Детальная статистика по групповым инвестициям</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Подробная аналитика будет добавлена в следующих версиях.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network">
            <Card>
              <CardHeader>
                <CardTitle>Инвестиционная сеть</CardTitle>
                <CardDescription>Ваши контакты и приглашения</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Система управления сетью будет добавлена в следующих версиях.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}