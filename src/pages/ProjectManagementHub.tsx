import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  CheckSquare, 
  Users, 
  Target, 
  BookOpen, 
  BarChart3,
  ArrowLeft,
  Briefcase,
  UserPlus,
  FileText,
  PieChart
} from "lucide-react";

export default function ProjectManagementHub() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<string>("overview");

  const modules = [
    {
      id: "pm",
      name: "PM - Управление проектами",
      description: "Задачи, проекты, делегирование",
      icon: CheckSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      route: "/project-management/pm"
    },
    {
      id: "hr",
      name: "HR - Управление командой",
      description: "Рекрутинг, онбординг, команда",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
      route: "/project-management/hr"
    },
    {
      id: "crm",
      name: "CRM - Клиенты",
      description: "Контакты, воронки, сделки",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      route: "/project-management/crm"
    },
    {
      id: "kb",
      name: "KB - База знаний",
      description: "Документация, Wiki, файлы",
      icon: BookOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      route: "/project-management/kb"
    },
    {
      id: "bi",
      name: "BI - Аналитика",
      description: "Отчеты, дашборды, KPI",
      icon: BarChart3,
      color: "text-red-600",
      bgColor: "bg-red-100",
      route: "/project-management/bi"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к дашборду
          </Button>
          
          <h1 className="text-4xl font-bold mb-2">Управление проектом</h1>
          <p className="text-muted-foreground">
            Комплексная система управления: PM + HR + CRM + KB + BI
          </p>
        </div>

        <Tabs value={activeModule} onValueChange={setActiveModule} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="pm">PM</TabsTrigger>
            <TabsTrigger value="hr">HR</TabsTrigger>
            <TabsTrigger value="crm">CRM</TabsTrigger>
            <TabsTrigger value="kb">KB</TabsTrigger>
            <TabsTrigger value="bi">BI</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <Card 
                  key={module.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(module.route)}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${module.bgColor} flex items-center justify-center mb-4`}>
                      <module.icon className={`h-6 w-6 ${module.color}`} />
                    </div>
                    <CardTitle>{module.name}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Открыть модуль
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Быстрые действия</CardTitle>
                <CardDescription>Часто используемые функции</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => navigate("/project-management/pm/tasks/new")}
                >
                  <CheckSquare className="h-5 w-5" />
                  <span>Новая задача</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => navigate("/project-management/hr/vacancies/new")}
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Вакансия</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => navigate("/project-management/crm/contacts/new")}
                >
                  <Briefcase className="h-5 w-5" />
                  <span>Контакт</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => navigate("/project-management/kb/articles/new")}
                >
                  <FileText className="h-5 w-5" />
                  <span>Статья</span>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pm">
            <Card>
              <CardHeader>
                <CardTitle>PM - Управление проектами</CardTitle>
                <CardDescription>Задачи, проекты, делегирование, контроль</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => navigate("/project-management/pm/tasks")}
                  >
                    <CheckSquare className="h-6 w-6" />
                    <span className="font-semibold">Задачи</span>
                    <span className="text-xs text-muted-foreground">Канбан, список, календарь</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => navigate("/project-management/pm/projects")}
                  >
                    <Briefcase className="h-6 w-6" />
                    <span className="font-semibold">Проекты</span>
                    <span className="text-xs text-muted-foreground">Управление проектами</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => navigate("/project-management/pm/timeline")}
                  >
                    <BarChart3 className="h-6 w-6" />
                    <span className="font-semibold">Таймлайн</span>
                    <span className="text-xs text-muted-foreground">Ганта-диаграмма</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hr">
            <Card>
              <CardHeader>
                <CardTitle>HR - Управление командой</CardTitle>
                <CardDescription>Рекрутинг, онбординг, производительность</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => navigate("/project-management/hr/recruitment")}
                  >
                    <UserPlus className="h-6 w-6" />
                    <span className="font-semibold">Рекрутинг</span>
                    <span className="text-xs text-muted-foreground">Вакансии и кандидаты</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => navigate("/project-management/hr/team")}
                  >
                    <Users className="h-6 w-6" />
                    <span className="font-semibold">Команда</span>
                    <span className="text-xs text-muted-foreground">Участники проекта</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => navigate("/project-management/hr/onboarding")}
                  >
                    <FileText className="h-6 w-6" />
                    <span className="font-semibold">Онбординг</span>
                    <span className="text-xs text-muted-foreground">Чек-листы адаптации</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crm">
            <Card>
              <CardHeader>
                <CardTitle>CRM - Управление клиентами</CardTitle>
                <CardDescription>Контакты, воронки продаж, сделки</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => navigate("/project-management/crm/contacts")}
                  >
                    <Users className="h-6 w-6" />
                    <span className="font-semibold">Контакты</span>
                    <span className="text-xs text-muted-foreground">Клиенты и партнеры</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => navigate("/project-management/crm/pipelines")}
                  >
                    <Target className="h-6 w-6" />
                    <span className="font-semibold">Воронки</span>
                    <span className="text-xs text-muted-foreground">Процессы продаж</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => navigate("/project-management/crm/deals")}
                  >
                    <Briefcase className="h-6 w-6" />
                    <span className="font-semibold">Сделки</span>
                    <span className="text-xs text-muted-foreground">Активные сделки</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kb">
            <Card>
              <CardHeader>
                <CardTitle>KB - База знаний</CardTitle>
                <CardDescription>Документация, Wiki, файловое хранилище</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => navigate("/project-management/kb/docs")}
                  >
                    <BookOpen className="h-6 w-6" />
                    <span className="font-semibold">Документация</span>
                    <span className="text-xs text-muted-foreground">Статьи и гайды</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => navigate("/project-management/kb/wiki")}
                  >
                    <FileText className="h-6 w-6" />
                    <span className="font-semibold">Wiki</span>
                    <span className="text-xs text-muted-foreground">Технические спецификации</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => navigate("/project-management/kb/files")}
                  >
                    <FileText className="h-6 w-6" />
                    <span className="font-semibold">Файлы</span>
                    <span className="text-xs text-muted-foreground">Хранилище файлов</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bi">
            <Card>
              <CardHeader>
                <CardTitle>BI - Аналитика и отчетность</CardTitle>
                <CardDescription>Дашборды, отчеты, KPI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => navigate("/project-management/bi/dashboard")}
                  >
                    <PieChart className="h-6 w-6" />
                    <span className="font-semibold">Дашборд</span>
                    <span className="text-xs text-muted-foreground">KPI и метрики</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => navigate("/project-management/bi/reports")}
                  >
                    <FileText className="h-6 w-6" />
                    <span className="font-semibold">Отчеты</span>
                    <span className="text-xs text-muted-foreground">Управленческая отчетность</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => navigate("/project-management/bi/analytics")}
                  >
                    <BarChart3 className="h-6 w-6" />
                    <span className="font-semibold">Аналитика</span>
                    <span className="text-xs text-muted-foreground">Детальные графики</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}