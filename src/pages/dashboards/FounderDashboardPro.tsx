import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Rocket, Users, Target, FileText, TrendingUp, 
  Search, Plus, Settings, Calendar, MessageSquare,
  Eye, BarChart3, DollarSign, Lightbulb, Share2,
  CheckCircle, Clock, AlertCircle
} from 'lucide-react';

const FounderDashboardPro = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const projectStats = {
    activeProjects: 4,
    totalFunding: 12500000,
    averageValuation: 45000000,
    teamMembers: 28,
    investorMeetings: 47,
    pitchViews: 1240
  };

  const projects = [
    {
      id: 1,
      name: 'AI-Healthcare Platform',
      description: 'Платформа для диагностики заболеваний с использованием ИИ',
      stage: 'Series A',
      funding: 8500000,
      fundingGoal: 15000000,
      valuation: 60000000,
      team: 12,
      progress: 57,
      milestones: [
        { title: 'MVP Launch', status: 'completed', date: '2024-01-15' },
        { title: 'Series A Round', status: 'in-progress', date: '2024-03-01' },
        { title: 'Product Market Fit', status: 'planned', date: '2024-06-01' }
      ]
    },
    {
      id: 2,
      name: 'FinTech Revolution',
      description: 'Криптовалютная платформа для корпоративных клиентов',
      stage: 'Seed',
      funding: 2500000,
      fundingGoal: 5000000,
      valuation: 20000000,
      team: 8,
      progress: 50,
      milestones: [
        { title: 'Beta Testing', status: 'completed', date: '2024-02-01' },
        { title: 'Seed Funding', status: 'in-progress', date: '2024-04-01' },
        { title: 'Market Launch', status: 'planned', date: '2024-07-01' }
      ]
    }
  ];

  const investorDatabase = [
    {
      id: 1,
      name: 'Venture Capital Alpha',
      focus: 'HealthTech, AI',
      ticketSize: '5-25 млн ₽',
      stage: 'Series A, B',
      matchScore: 94,
      lastContact: '2024-01-20',
      status: 'interested'
    },
    {
      id: 2,
      name: 'Innovation Partners',
      focus: 'FinTech, Blockchain',
      ticketSize: '2-10 млн ₽',
      stage: 'Seed, Series A',
      matchScore: 87,
      lastContact: '2024-01-18',
      status: 'meeting-scheduled'
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Алексей Петров',
      role: 'CTO',
      project: 'AI-Healthcare Platform',
      performance: 92,
      equity: 15
    },
    {
      id: 2,
      name: 'Мария Сидорова',
      role: 'CPO',
      project: 'FinTech Revolution',
      performance: 88,
      equity: 12
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'planned': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Rocket className="h-8 w-8 text-blue-500" />
            Кабинет фаундера
          </h1>
          <p className="text-muted-foreground">Управление проектами и привлечение инвестиций</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Новый проект
          </Button>
          <Button variant="outline">
            <Target className="h-4 w-4 mr-2" />
            Найти инвесторов
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Проекты</p>
              <p className="text-2xl font-bold">{projectStats.activeProjects}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Привлечено</p>
              <p className="text-xl font-bold">{(projectStats.totalFunding / 1000000).toFixed(1)}М ₽</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Оценка</p>
              <p className="text-xl font-bold">{(projectStats.averageValuation / 1000000).toFixed(0)}М ₽</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Команда</p>
              <p className="text-2xl font-bold">{projectStats.teamMembers}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Встречи</p>
              <p className="text-2xl font-bold">{projectStats.investorMeetings}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Просмотры</p>
              <p className="text-2xl font-bold">{projectStats.pitchViews}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="projects">
            <Rocket className="h-4 w-4 mr-2" />
            Управление проектами
          </TabsTrigger>
          <TabsTrigger value="investors">
            <Search className="h-4 w-4 mr-2" />
            Поиск инвесторов
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="h-4 w-4 mr-2" />
            Команда
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            Документооборот
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Аналитика
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <div className="space-y-6">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge>{project.stage}</Badge>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Project Stats */}
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Привлечено</p>
                        <p className="font-bold">{(project.funding / 1000000).toFixed(1)} млн ₽</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Цель</p>
                        <p className="font-bold">{(project.fundingGoal / 1000000).toFixed(1)} млн ₽</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Оценка</p>
                        <p className="font-bold">{(project.valuation / 1000000).toFixed(0)} млн ₽</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Команда</p>
                        <p className="font-bold">{project.team} человек</p>
                      </div>
                    </div>

                    {/* Funding Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Прогресс фандрайзинга</span>
                        <span className="text-sm text-muted-foreground">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="w-full" />
                    </div>

                    {/* Milestones */}
                    <div>
                      <h4 className="font-semibold mb-3">Ключевые этапы</h4>
                      <div className="space-y-2">
                        {project.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(milestone.status)}
                              <span className="font-medium">{milestone.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{milestone.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Подробнее
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Питч-дек
                      </Button>
                      <Button size="sm" variant="outline">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Метрики
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="investors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-поиск инвесторов</CardTitle>
              <CardDescription>Персонализированный подбор инвесторов на основе вашего профиля проекта</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investorDatabase.map((investor) => (
                  <div key={investor.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{investor.name}</h4>
                        <p className="text-sm text-muted-foreground">Фокус: {investor.focus}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">Match: {investor.matchScore}%</Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          Контакт: {investor.lastContact}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Размер чека</p>
                        <p className="font-medium">{investor.ticketSize}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Стадии</p>
                        <p className="font-medium">{investor.stage}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Badge variant={investor.status === 'interested' ? 'default' : investor.status === 'meeting-scheduled' ? 'secondary' : 'outline'}>
                        {investor.status === 'interested' ? 'Заинтересован' : investor.status === 'meeting-scheduled' ? 'Встреча назначена' : 'Контакт'}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Сообщение
                        </Button>
                        <Button size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Встреча
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Управление командой</CardTitle>
              <CardDescription>Участники проектов и их роли</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role} • {member.project}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm">Эффективность: {member.performance}%</p>
                      <p className="text-sm text-muted-foreground">Доля: {member.equity}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Шаблоны документов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    NDA (Соглашение о неразглашении)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Term Sheet
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Инвестиционное соглашение
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Акционерное соглашение
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Электронная подпись</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Интеграция с системой электронных подписей для быстрого подписания документов
                  </p>
                  <Button className="w-full">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Настроить подпись
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Здоровье проектов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{project.name}</span>
                        <span className="text-sm text-green-600">Здоровый</span>
                      </div>
                      <Progress value={85} className="w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Финансовые показатели</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Burn Rate</p>
                      <p className="text-xl font-bold">450k ₽/мес</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Runway</p>
                      <p className="text-xl font-bold">18 мес</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Месячный рост</p>
                    <p className="text-xl font-bold text-green-600">+12%</p>
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

export default FounderDashboardPro;