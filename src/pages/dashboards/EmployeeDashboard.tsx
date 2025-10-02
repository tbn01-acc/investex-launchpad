import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  Users,
  FileText,
  BarChart3,
  ListTodo
} from "lucide-react";

export default function EmployeeDashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { title: "Мои задачи", value: "12", icon: ListTodo, color: "text-blue-500" },
    { title: "Завершено", value: "48", icon: CheckCircle2, color: "text-green-500" },
    { title: "В работе", value: "5", icon: Clock, color: "text-orange-500" },
    { title: "Проектов", value: "3", icon: Briefcase, color: "text-purple-500" },
  ];

  const tasks = [
    {
      id: 1,
      title: "Разработка API модуля аутентификации",
      project: "AI Marketing Platform",
      priority: "Высокий",
      status: "В работе",
      deadline: "2024-03-20",
      progress: 65
    },
    {
      id: 2,
      title: "Тестирование платежной системы",
      project: "FinTech App",
      priority: "Средний",
      status: "В работе",
      deadline: "2024-03-22",
      progress: 40
    },
    {
      id: 3,
      title: "Оптимизация базы данных",
      project: "EdTech Platform",
      priority: "Низкий",
      status: "Запланировано",
      deadline: "2024-03-25",
      progress: 0
    },
  ];

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      "Высокий": "bg-red-100 text-red-800",
      "Средний": "bg-yellow-100 text-yellow-800",
      "Низкий": "bg-green-100 text-green-800",
    };
    return colors[priority] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      "В работе": "bg-blue-100 text-blue-800",
      "Запланировано": "bg-gray-100 text-gray-800",
      "Завершено": "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Добро пожаловать, {profile?.first_name || 'Сотрудник'}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Управляйте своими задачами и отслеживайте прогресс
          </p>
        </div>
        <Button onClick={() => navigate('/project-management')}>
          <Briefcase className="mr-2 h-4 w-4" />
          Управление проектами
        </Button>
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Основной контент */}
      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks">Мои задачи</TabsTrigger>
          <TabsTrigger value="projects">Проекты</TabsTrigger>
          <TabsTrigger value="team">Команда</TabsTrigger>
          <TabsTrigger value="reports">Отчеты</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{task.project}</Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Подробнее
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Срок: {task.deadline}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Прогресс</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Активные проекты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["AI Marketing Platform", "FinTech App", "EdTech Platform"].map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">{project}</p>
                        <p className="text-sm text-muted-foreground">Активен</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate('/project-management')}>
                      Открыть
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Моя команда</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Иван Иванов (Тимлид)", "Мария Петрова (Разработчик)", "Алексей Сидоров (Дизайнер)"].map((member, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{member}</p>
                      <p className="text-sm text-muted-foreground">Онлайн</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Отчеты и аналитика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Детальные отчеты находятся в разработке
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
