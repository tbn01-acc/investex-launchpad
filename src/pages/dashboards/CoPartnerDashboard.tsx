import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  DollarSign,
  Target,
  FileText,
  BarChart3,
  Clock
} from "lucide-react";

export default function CoPartnerDashboard() {
  const { profile } = useAuth();
  const { t } = useLanguage();

  const stats = [
    { title: "Активных проектов", value: "4", icon: Briefcase, color: "text-blue-500" },
    { title: "Моя доля", value: "25%", icon: TrendingUp, color: "text-green-500" },
    { title: "Общий капитал", value: "$450K", icon: DollarSign, color: "text-purple-500" },
    { title: "Партнеры", value: "3", icon: Users, color: "text-orange-500" },
  ];

  const projects = [
    {
      id: 1,
      name: "AI Marketing Platform",
      status: "В разработке",
      myShare: "25%",
      investment: "$112,500",
      progress: 65,
      partners: ["Иван И.", "Мария П.", "Алексей С."],
      lastUpdate: "2 дня назад"
    },
    {
      id: 2,
      name: "FinTech App",
      status: "Привлечение инвестиций",
      myShare: "30%",
      investment: "$90,000",
      progress: 40,
      partners: ["Елена К.", "Дмитрий Л."],
      lastUpdate: "1 неделя назад"
    },
    {
      id: 3,
      name: "EdTech Platform",
      status: "Запущен",
      myShare: "20%",
      investment: "$150,000",
      progress: 90,
      partners: ["Ольга Н.", "Сергей М.", "Анна Т."],
      lastUpdate: "5 часов назад"
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      "В разработке": "bg-blue-100 text-blue-800",
      "Привлечение инвестиций": "bg-yellow-100 text-yellow-800",
      "Запущен": "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Добро пожаловать, {profile?.first_name || 'Соучредитель'}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Управляйте своими долями в проектах и отслеживайте прогресс
          </p>
        </div>
        <Button>
          <Target className="mr-2 h-4 w-4" />
          Новый проект
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
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">{t('common.dashboard')}</TabsTrigger>
          <TabsTrigger value="projects">Проекты</TabsTrigger>
          <TabsTrigger value="finances">Финансы</TabsTrigger>
          <TabsTrigger value="documents">Документы</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Панель управления соучредителя</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Обзор вашей активности</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{project.name}</CardTitle>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    Подробнее
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Моя доля</p>
                    <p className="text-lg font-semibold">{project.myShare}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Инвестиции</p>
                    <p className="text-lg font-semibold">{project.investment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Прогресс</p>
                    <p className="text-lg font-semibold">{project.progress}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Соучредители</p>
                    <p className="text-lg font-semibold">{project.partners.length}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Прогресс проекта</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Обновлено: {project.lastUpdate}</span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.partners.slice(0, 3).map((partner, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-xs font-medium"
                      >
                        {partner.charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="finances" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Финансовый обзор</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground">Общие инвестиции</div>
                      <div className="text-2xl font-bold mt-2">$450,000</div>
                      <div className="text-xs text-green-500 mt-1">+12% за квартал</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground">Ожидаемый ROI</div>
                      <div className="text-2xl font-bold mt-2">280%</div>
                      <div className="text-xs text-muted-foreground mt-1">Средний по портфелю</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground">Дивиденды</div>
                      <div className="text-2xl font-bold mt-2">$15,500</div>
                      <div className="text-xs text-green-500 mt-1">За последний месяц</div>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Детальная финансовая отчетность находится в разработке
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Документы и соглашения</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Учредительный договор", "Соглашение о долях", "NDA", "Протокол собрания"].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span>{doc}</span>
                    </div>
                    <Button variant="outline" size="sm">Открыть</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Аналитика портфеля</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Детальная аналитика находится в разработке
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
