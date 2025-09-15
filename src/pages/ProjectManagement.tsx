import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, CalendarIcon, Kanban, List, BarChart3, Users, Clock, DollarSign, ChevronRight } from 'lucide-react';

const ProjectManagement = () => {
  const [activeView, setActiveView] = useState('kanban');

  const projects = [
    {
      id: 1,
      name: 'FinTech Mobile App',
      status: 'В работе',
      progress: 65,
      budget: 1200000,
      spent: 780000,
      team: 5,
      deadline: '2024-12-15',
      tasks: {
        todo: 12,
        inProgress: 8,
        review: 4,
        done: 23
      }
    },
    {
      id: 2,
      name: 'E-commerce Redesign',
      status: 'В работе',
      progress: 40,
      budget: 500000,
      spent: 200000,
      team: 3,
      deadline: '2024-11-30',
      tasks: {
        todo: 18,
        inProgress: 6,
        review: 2,
        done: 15
      }
    }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Настройка авторизации',
      status: 'todo',
      priority: 'high',
      assignee: 'Анна Смирнова',
      deadline: '2024-10-20',
      project: 'FinTech Mobile App'
    },
    {
      id: 2,
      title: 'Дизайн главной страницы',
      status: 'inProgress',
      priority: 'medium',
      assignee: 'Петр Иванов',
      deadline: '2024-10-18',
      project: 'E-commerce Redesign'
    },
    {
      id: 3,
      title: 'Интеграция API платежей',
      status: 'review',
      priority: 'high',
      assignee: 'Мария Петрова',
      deadline: '2024-10-22',
      project: 'FinTech Mobile App'
    },
    {
      id: 4,
      title: 'Тестирование мобильной версии',
      status: 'done',
      priority: 'low',
      assignee: 'Игорь Сидоров',
      deadline: '2024-10-15',
      project: 'E-commerce Redesign'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'todo': 'bg-gray-100 text-gray-800',
      'inProgress': 'bg-blue-100 text-blue-800',
      'review': 'bg-yellow-100 text-yellow-800',
      'done': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      'todo': 'К выполнению',
      'inProgress': 'В работе',
      'review': 'На проверке',
      'done': 'Выполнено'
    };
    return labels[status] || status;
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const KanbanBoard = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {['todo', 'inProgress', 'review', 'done'].map((status) => (
        <Card key={status} className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              {getStatusLabel(status)}
              <Badge variant="secondary" className="ml-2">
                {tasks.filter(task => task.status === status).length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.filter(task => task.status === status).map((task) => (
              <Card key={task.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">{task.title}</h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{task.assignee}</span>
                    <Badge className={getPriorityColor(task.priority)} variant="secondary">
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {task.deadline}
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const TaskList = () => (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-medium">{task.title}</h4>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{task.project}</span>
                <span>{task.assignee}</span>
                <span>{task.deadline}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getPriorityColor(task.priority)} variant="secondary">
                {task.priority}
              </Badge>
              <Badge className={getStatusColor(task.status)} variant="secondary">
                {getStatusLabel(task.status)}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const ProjectAnalytics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {project.name}
              <Badge variant="secondary">{project.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Прогресс</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{(project.spent / 1000).toFixed(0)}K / {(project.budget / 1000).toFixed(0)}K ₽</div>
                  <div className="text-muted-foreground">Бюджет</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{project.team} человек</div>
                  <div className="text-muted-foreground">Команда</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{project.deadline}</div>
                  <div className="text-muted-foreground">Дедлайн</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <List className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{Object.values(project.tasks).reduce((a, b) => a + b, 0)}</div>
                  <div className="text-muted-foreground">Всего задач</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Управление проектами</h1>
            <p className="text-xl text-muted-foreground">
              Управляйте командой, задачами и прогрессом проектов
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-muted-foreground">Активных проектов</p>
                </div>
                <Kanban className="h-8 w-8 text-primary" />
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">47</p>
                  <p className="text-muted-foreground">Задач в работе</p>
                </div>
                <List className="h-8 w-8 text-primary" />
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-muted-foreground">Участников</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">₽2.8M</p>
                  <p className="text-muted-foreground">Общий бюджет</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList>
              <TabsTrigger value="projects">Проекты</TabsTrigger>
              <TabsTrigger value="tasks">Задачи</TabsTrigger>
              <TabsTrigger value="calendar">Календарь</TabsTrigger>
              <TabsTrigger value="analytics">Аналитика</TabsTrigger>
              <TabsTrigger value="reports">Отчеты</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Проекты</h2>
                <Button>
                  Создать проект
                </Button>
              </div>
              <ProjectAnalytics />
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Управление задачами</h2>
                <div className="flex gap-2">
                  <Select value={activeView} onValueChange={setActiveView}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kanban">Канбан</SelectItem>
                      <SelectItem value="list">Список</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>Создать задачу</Button>
                </div>
              </div>
              
              {activeView === 'kanban' ? <KanbanBoard /> : <TaskList />}
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <Card className="p-8 text-center">
                <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Календарь проектов</h3>
                <p className="text-muted-foreground mb-4">
                  Просматривайте дедлайны, встречи и важные события
                </p>
                <Button>Открыть календарь</Button>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-2xl font-semibold">Аналитика проектов</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle>Производительность команды</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-16 w-16 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle>Использование бюджета</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                      <DollarSign className="h-16 w-16 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Отчеты для инвесторов</h2>
                <Button>Создать отчет</Button>
              </div>
              
              <div className="grid gap-4">
                {[
                  { name: 'Ежемесячный отчет - Октябрь 2024', date: '01.11.2024', status: 'Готов' },
                  { name: 'Финансовый отчет Q3 2024', date: '15.10.2024', status: 'Отправлен' },
                  { name: 'Отчет по прогрессу проектов', date: '30.09.2024', status: 'Архив' }
                ].map((report, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <p className="text-sm text-muted-foreground">{report.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{report.status}</Badge>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectManagement;