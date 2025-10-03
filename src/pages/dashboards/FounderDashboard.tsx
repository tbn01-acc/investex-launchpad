import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { CreateProjectModal } from '@/components/CreateProjectModal';
import { PitchModal } from '@/components/PitchModal';
import { MessagesTab } from '@/components/MessagesTab';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, Users, DollarSign, TrendingUp, 
  Plus, Eye, Target, Lightbulb, Calendar, MessageSquare
} from 'lucide-react';

export default function FounderDashboard() {
  const { user, profile } = useAuth();
  const { t, formatCurrency } = useLanguage();
  const navigate = useNavigate();
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [pitchModalOpen, setPitchModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{ id: number; name: string } | null>(null);
  
  const [stats] = useState({
    activeProjects: 3,
    totalFunding: 1250000,
    averageValuation: 5200000,
    teamMembers: 12,
    pitchViews: 847,
    investorMeetings: 23
  });

  const [projects] = useState([
    {
      id: 1,
      name: 'EcoTech Solutions',
      description: 'Платформа для управления экологическими проектами',
      stage: 'seed',
      funding: 500000,
      fundingGoal: 1000000,
      valuation: 4000000,
      investors: 8,
      teamSize: 5,
      status: 'fundraising'
    },
    {
      id: 2,
      name: 'HealthTrack AI',
      description: 'ИИ-система для мониторинга здоровья пациентов',
      stage: 'series-a',
      funding: 750000,
      fundingGoal: 2000000,
      valuation: 8000000,
      investors: 12,
      teamSize: 8,
      status: 'development'
    },
    {
      id: 3,
      name: 'EduConnect',
      description: 'Образовательная платформа для дистанционного обучения',
      stage: 'mvp',
      funding: 0,
      fundingGoal: 500000,
      valuation: 2000000,
      investors: 0,
      teamSize: 3,
      status: 'ideation'
    }
  ]);

  const [upcomingEvents] = useState([
    {
      id: 1,
      title: 'Питч-сессия с инвесторами',
      date: '2024-02-15',
      time: '14:00',
      type: 'pitch',
      participants: 8
    },
    {
      id: 2,
      title: 'Встреча с командой',
      date: '2024-02-12',
      time: '10:00',
      type: 'team',
      participants: 5
    },
    {
      id: 3,
      title: 'Demo Day участие',
      date: '2024-02-20',
      time: '16:00',
      type: 'demo',
      participants: 50
    }
  ]);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'ideation': return 'bg-gray-500';
      case 'mvp': return 'bg-blue-500';
      case 'seed': return 'bg-green-500';
      case 'series-a': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStageText = (stage: string) => {
    switch (stage) {
      case 'ideation': return 'Идея';
      case 'mvp': return 'MVP';
      case 'seed': return 'Seed';
      case 'series-a': return 'Series A';
      default: return 'Неизвестно';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ideation': return 'bg-yellow-500';
      case 'development': return 'bg-blue-500';
      case 'fundraising': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ideation': return 'Планирование';
      case 'development': return 'Разработка';
      case 'fundraising': return 'Фандрайзинг';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Кабинет фаундера</h1>
            <p className="text-muted-foreground">
              {t('common.welcome')}, {profile?.first_name || 'Фаундер'}
            </p>
          </div>
          <Button onClick={() => setCreateProjectOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Создать проект
          </Button>
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
                <Rocket className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Привлечено средств</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.totalFunding)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Средняя оценка</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.averageValuation)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Участников команды</p>
                  <p className="text-3xl font-bold">{stats.teamMembers}</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.investorMeetings} встреч с инвесторами
                  </p>
                </div>
                <Users className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="projects">
              <Rocket className="h-4 w-4 mr-2" />
              Проекты
            </TabsTrigger>
            <TabsTrigger value="fundraising">
              <Target className="h-4 w-4 mr-2" />
              Фандрайзинг
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="h-4 w-4 mr-2" />
              Команда
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              События
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              Сообщения
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="space-y-4">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStageColor(project.stage)}>
                          {getStageText(project.stage)}
                        </Badge>
                        <Badge className={getStatusColor(project.status)}>
                          {getStatusText(project.status)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Привлечено</p>
                          <p className="font-medium">{formatCurrency(project.funding)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Цель</p>
                          <p className="font-medium">{formatCurrency(project.fundingGoal)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Оценка</p>
                          <p className="font-medium">{formatCurrency(project.valuation)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Команда</p>
                          <p className="font-medium">{project.teamSize} человек</p>
                        </div>
                      </div>
                      
                      {project.fundingGoal > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Прогресс фандрайзинга</span>
                            <span>{Math.round((project.funding / project.fundingGoal) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(project.funding / project.fundingGoal) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Подробнее
                        </Button>
                        <Button size="sm" onClick={() => navigate('/project-management')}>
                          Управление
                        </Button>
                        {project.status === 'fundraising' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedProject({ id: project.id, name: project.name });
                              setPitchModalOpen(true);
                            }}
                          >
                            <Target className="h-4 w-4 mr-2" />
                            Питч
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fundraising">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Статистика фандрайзинга</CardTitle>
                  <CardDescription>Показатели привлечения инвестиций</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Просмотры питчей</p>
                      <p className="text-2xl font-bold">{stats.pitchViews}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Встречи с инвесторами</p>
                      <p className="text-2xl font-bold">{stats.investorMeetings}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Конверсия в инвестиции</p>
                      <p className="text-2xl font-bold">34.8%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Инструменты фандрайзинга</CardTitle>
                  <CardDescription>Материалы для привлечения инвестиций</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-16 justify-start">
                      <Lightbulb className="h-6 w-6 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">Питч-дек</p>
                        <p className="text-sm text-muted-foreground">Создать презентацию</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-16 justify-start">
                      <Target className="h-6 w-6 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">Бизнес-план</p>
                        <p className="text-sm text-muted-foreground">Детальный план развития</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-16 justify-start">
                      <DollarSign className="h-6 w-6 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">Финансовая модель</p>
                        <p className="text-sm text-muted-foreground">Прогнозы и метрики</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-16 justify-start">
                      <Users className="h-6 w-6 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">База инвесторов</p>
                        <p className="text-sm text-muted-foreground">Поиск и контакты</p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Управление командой</CardTitle>
                <CardDescription>Участники и роли в проектах</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Система управления командой будет реализована в следующих версиях.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ближайшие события</CardTitle>
                  <CardDescription>Запланированные встречи и мероприятия</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Calendar className="h-8 w-8 text-primary" />
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(event.date).toLocaleDateString('ru-RU')} в {event.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            {event.participants} участников
                          </p>
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

          <TabsContent value="messages">
            <MessagesTab />
          </TabsContent>
        </Tabs>

        <CreateProjectModal 
          open={createProjectOpen} 
          onOpenChange={setCreateProjectOpen}
        />
        
        <PitchModal
          open={pitchModalOpen}
          onOpenChange={setPitchModalOpen}
          projectId={selectedProject?.id}
          projectName={selectedProject?.name}
        />
      </div>
    </div>
  );
}