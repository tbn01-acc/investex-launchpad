import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Handshake,
  Plus,
  Search,
  Star,
  BarChart3
} from 'lucide-react';

const CoFounderDashboard = () => {
  const stats = [
    { title: 'Активные проекты', value: '3', change: '+1', icon: Target },
    { title: 'Команды', value: '12', change: '+4', icon: Users },
    { title: 'Успешные запуски', value: '8', change: '+2', icon: TrendingUp },
    { title: 'Совместный ROI', value: '24%', change: '+6%', icon: BarChart3 }
  ];

  const activeProjects = [
    { 
      name: 'AI-платформа для HR', 
      role: 'CTO', 
      equity: '15%', 
      status: 'development',
      team: '8 человек',
      stage: 'MVP'
    },
    { 
      name: 'Blockchain решение', 
      role: 'Product Lead', 
      equity: '12%', 
      status: 'launch',
      team: '12 человек',
      stage: 'Beta'
    },
    { 
      name: 'IoT стартап', 
      role: 'Technical Co-founder', 
      equity: '20%', 
      status: 'planning',
      team: '5 человек',
      stage: 'Ideation'
    }
  ];

  const opportunities = [
    { name: 'FinTech стартап', founder: 'Алексей Петров', equity: '10-15%', skills: ['React', 'Node.js'] },
    { name: 'EdTech платформа', founder: 'Мария Козлова', equity: '8-12%', skills: ['Python', 'AI/ML'] },
    { name: 'HealthTech решение', founder: 'Дмитрий Сидоров', equity: '12-18%', skills: ['Mobile', 'IoT'] }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">🤝 Ко-фаундер</h1>
          <p className="text-muted-foreground">Управление проектами и партнёрствами</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Найти проекты
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Создать команду
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
        {/* Active Projects */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Активные проекты</CardTitle>
            <CardDescription>Ваши текущие роли в проектах</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeProjects.map((project, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{project.name}</h4>
                  <Badge variant={
                    project.status === 'development' ? 'default' :
                    project.status === 'launch' ? 'secondary' : 'outline'
                  }>
                    {project.status === 'development' ? 'Разработка' :
                     project.status === 'launch' ? 'Запуск' : 'Планирование'}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Роль: </span>
                    <span className="font-medium">{project.role}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Доля: </span>
                    <span className="font-medium">{project.equity}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Команда: </span>
                    <span className="font-medium">{project.team}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Стадия: </span>
                    <span className="font-medium">{project.stage}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Команда</Button>
                  <Button size="sm" variant="outline">Аналитика</Button>
                  <Button size="sm">Управление</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills & Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Ваш профиль</CardTitle>
            <CardDescription>Экспертиза и достижения</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Ключевые навыки</h4>
              <div className="flex flex-wrap gap-2">
                {['Product Management', 'Technical Leadership', 'Team Building', 'Strategy'].map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Отрасли</h4>
              <div className="flex flex-wrap gap-2">
                {['FinTech', 'AI/ML', 'B2B SaaS'].map((industry) => (
                  <Badge key={industry} variant="outline">{industry}</Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Рейтинг ко-фаундера</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Завершённых проектов</span>
                <span className="text-sm font-medium">8</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Новые возможности</CardTitle>
          <CardDescription>Проекты ищут ко-фаундера</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium">{opportunity.name}</h4>
                  <p className="text-sm text-muted-foreground">Основатель: {opportunity.founder}</p>
                  <p className="text-sm">💎 Доля: {opportunity.equity}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Требуемые навыки:</p>
                  <div className="flex flex-wrap gap-1">
                    {opportunity.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Handshake className="h-3 w-3 mr-2" />
                  Откликнуться
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoFounderDashboard;