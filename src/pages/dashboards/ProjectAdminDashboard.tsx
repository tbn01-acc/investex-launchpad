import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, 
  Users, 
  Settings, 
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  Calendar,
  FileText,
  DollarSign
} from "lucide-react";

export default function ProjectAdminDashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { title: "Проектов", value: "8", icon: Briefcase, color: "text-blue-500", change: "+2" },
    { title: "Команда", value: "45", icon: Users, color: "text-purple-500", change: "+5" },
    { title: "Задач", value: "127", icon: CheckCircle2, color: "text-green-500", change: "+15" },
    { title: "Бюджет", value: "$850K", icon: DollarSign, color: "text-orange-500", change: "+12%" },
  ];

  const projects = [
    {
      id: 1,
      name: "AI Marketing Platform",
      status: "В работе",
      team: 12,
      tasks: { total: 45, completed: 30 },
      budget: { used: 180000, total: 250000 },
      deadline: "Q2 2024",
      priority: "Высокий"
    },
    {
      id: 2,
      name: "FinTech App",
      status: "Планирование",
      team: 8,
      tasks: { total: 28, completed: 5 },
      budget: { used: 50000, total: 180000 },
      deadline: "Q3 2024",
      priority: "Средний"
    },
    {
      id: 3,
      name: "EdTech Platform",
      status: "Тестирование",
      team: 10,
      tasks: { total: 54, completed: 48 },
      budget: { used: 220000, total: 280000 },
      deadline: "Q2 2024",
      priority: "Высокий"
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      "В работе": "bg-blue-100 text-blue-800",
      "Планирование": "bg-yellow-100 text-yellow-800",
      "Тестирование": "bg-purple-100 text-purple-800",
      "Завершен": "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      "Высокий": "bg-red-100 text-red-800",
      "Средний": "bg-yellow-100 text-yellow-800",
      "Низкий": "bg-green-100 text-green-800",
    };
    return colors[priority] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Добро пожаловать, {profile?.first_name || 'Администратор'}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Управление всеми проектами и командами
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/project-management-hub')}>
            <Settings className="mr-2 h-4 w-4" />
            Управление
          </Button>
          <Button>
            <Briefcase className="mr-2 h-4 w-4" />
            Новый проект
          </Button>
        </div>
      </header>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Основной контент */}
      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Проекты</TabsTrigger>
          <TabsTrigger value="team">Команда</TabsTrigger>
          <TabsTrigger value="tasks">Задачи</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle>{project.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <Badge className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/project-management-hub')}>
                    Управлять
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Команда</p>
                    <p className="text-lg font-semibold">{project.team} чел</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Задачи</p>
                    <p className="text-lg font-semibold">
                      {project.tasks.completed}/{project.tasks.total}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Бюджет</p>
                    <p className="text-lg font-semibold">
                      ${(project.budget.used / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Срок</p>
                    <p className="text-lg font-semibold">{project.deadline}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Прогресс задач</span>
                    <span>
                      {Math.round((project.tasks.completed / project.tasks.total) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{
                        width: `${(project.tasks.completed / project.tasks.total) * 100}%`
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Использование бюджета</span>
                    <span>
                      {Math.round((project.budget.used / project.budget.total) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-orange-500 rounded-full h-2 transition-all"
                      style={{
                        width: `${(project.budget.used / project.budget.total) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Управление командой</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">45</p>
                        <p className="text-sm text-muted-foreground">Всего сотрудников</p>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">Управление сотрудниками</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">87%</p>
                        <p className="text-sm text-muted-foreground">Средняя загрузка</p>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">Распределение задач</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Обзор задач</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Clock className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                    <p className="text-2xl font-bold">82</p>
                    <p className="text-sm text-muted-foreground">В работе</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <CheckCircle2 className="h-8 w-8 mx-auto text-green-500 mb-2" />
                    <p className="text-2xl font-bold">83</p>
                    <p className="text-sm text-muted-foreground">Завершено</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <AlertCircle className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Просрочено</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Аналитика проектов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Детальная аналитика находится в разработке
                  </p>
                  <Button variant="outline" onClick={() => navigate('/project-management-hub')}>
                    Перейти к управлению проектами
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
