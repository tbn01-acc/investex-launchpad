import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessagesTab } from '@/components/MessagesTab';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, TrendingUp, Clock, DollarSign, Target, MessageSquare } from 'lucide-react';

const CoFounderDashboard = () => {
  const { user, profile } = useAuth();
  const { formatCurrency } = useLanguage();
  const navigate = useNavigate();

  const [stats] = useState({
    activeProjects: 3,
    equity: 25,
    monthlyRevenue: 850000,
    teamSize: 12,
    milestones: 8,
    completedMilestones: 5
  });

  const [projects] = useState([
    {
      id: 1,
      name: 'FinTech Startup',
      role: 'CTO',
      equity: 30,
      valuation: 15000000,
      stage: 'Seed',
      status: 'active'
    },
    {
      id: 2,
      name: 'AI Platform',
      role: 'Co-founder',
      equity: 20,
      valuation: 8000000,
      stage: 'Pre-Seed',
      status: 'active'
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Дашборд ко-фаундера</h1>
        <p className="text-muted-foreground">
          Управляйте своими проектами и отслеживайте развитие стартапов
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Активных проектов</span>
              <span className="text-2xl font-bold">{stats.activeProjects}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Доля капитала</span>
              <span className="text-2xl font-bold">{stats.equity}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Месячный доход</span>
              <span className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Команда</span>
              <span className="text-2xl font-bold">{stats.teamSize}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Вехи</span>
              <span className="text-2xl font-bold">{stats.completedMilestones}/{stats.milestones}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Успешность</span>
              <span className="text-2xl font-bold">
                {Math.round((stats.completedMilestones / stats.milestones) * 100)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="projects">Проекты</TabsTrigger>
          <TabsTrigger value="team">Команда</TabsTrigger>
          <TabsTrigger value="equity">Капитал</TabsTrigger>
          <TabsTrigger value="roadmap">Дорожная карта</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          <TabsTrigger value="messages">
            <MessageSquare className="h-4 w-4 mr-2" />
            Сообщения
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Мои проекты</h3>
            <Button>
              <Briefcase className="w-4 h-4 mr-2" />
              Новый проект
            </Button>
          </div>

          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Роль: {project.role}</p>
                  </div>
                  <Badge>{project.stage}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Доля</p>
                    <p className="text-lg font-semibold">{project.equity}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Оценка</p>
                    <p className="text-lg font-semibold">{formatCurrency(project.valuation)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Статус</p>
                    <Badge variant="outline">{project.status}</Badge>
                  </div>
                </div>
                <Button size="sm" onClick={() => navigate('/project-management-hub')}>
                  Управление
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                Информация о команде будет доступна в следующей версии
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equity">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                Детализация капитала будет доступна в следующей версии
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                Дорожная карта проектов будет доступна в следующей версии
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Аналитика ко-фаундера</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Рост капитала</span>
                    <span className="text-sm text-muted-foreground">+18% за квартал</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Достижение вех</span>
                    <span className="text-sm text-muted-foreground">{stats.completedMilestones}/{stats.milestones}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(stats.completedMilestones / stats.milestones) * 100}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Эффективность команды</span>
                    <span className="text-sm text-muted-foreground">88%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <MessagesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoFounderDashboard;
