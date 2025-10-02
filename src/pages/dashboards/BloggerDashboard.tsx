import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  Video,
  Image as ImageIcon,
  BarChart3
} from "lucide-react";

export default function BloggerDashboard() {
  const { profile } = useAuth();
  const { t } = useLanguage();

  const stats = [
    { title: "Общий охват", value: "125K", icon: Eye, color: "text-blue-500", change: "+15%" },
    { title: "Подписчики", value: "45.2K", icon: Users, color: "text-purple-500", change: "+8%" },
    { title: "Вовлеченность", value: "12.5%", icon: Heart, color: "text-pink-500", change: "+3%" },
    { title: "Партнерства", value: "12", icon: TrendingUp, color: "text-green-500", change: "+2" },
  ];

  const recentPosts = [
    {
      id: 1,
      title: "Обзор AI-маркетинговой платформы",
      type: "Видео",
      platform: "YouTube",
      views: "25K",
      likes: "2.1K",
      comments: "340",
      date: "2 дня назад",
      status: "Опубликовано"
    },
    {
      id: 2,
      title: "10 трендов в FinTech 2024",
      type: "Статья",
      platform: "Medium",
      views: "15K",
      likes: "890",
      comments: "125",
      date: "5 дней назад",
      status: "Опубликовано"
    },
    {
      id: 3,
      title: "Интервью с основателем стартапа",
      type: "Подкаст",
      platform: "Spotify",
      views: "8K",
      likes: "450",
      comments: "89",
      date: "1 неделя назад",
      status: "Опубликовано"
    },
  ];

  const partnerships = [
    {
      id: 1,
      company: "TechVision AI",
      type: "Спонсорство",
      status: "Активно",
      revenue: "$3,500",
      duration: "3 месяца"
    },
    {
      id: 2,
      company: "FinFlow Inc",
      type: "Партнерская программа",
      status: "Активно",
      revenue: "$2,200",
      duration: "Ongoing"
    },
  ];

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: any } = {
      "Видео": Video,
      "Статья": FileText,
      "Подкаст": MessageCircle,
    };
    const Icon = icons[type] || FileText;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Добро пожаловать, {profile?.first_name || 'Блогер'}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Управляйте контентом и отслеживайте аналитику
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Создать пост
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
              <p className="text-xs text-green-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Основной контент */}
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Контент</TabsTrigger>
          <TabsTrigger value="partnerships">Партнерства</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          <TabsTrigger value="calendar">Календарь</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          {recentPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(post.type)}
                    <div>
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{post.type}</Badge>
                        <Badge variant="secondary">{post.platform}</Badge>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {post.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Просмотры</p>
                      <p className="font-semibold">{post.views}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Лайки</p>
                      <p className="font-semibold">{post.likes}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Комментарии</p>
                      <p className="font-semibold">{post.comments}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Дата</p>
                      <p className="font-semibold text-sm">{post.date}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Редактировать
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Поделиться
                  </Button>
                  <Button variant="outline" size="sm">
                    Статистика
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="partnerships" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Активные партнерства</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partnerships.map((partnership) => (
                  <div key={partnership.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{partnership.company}</h4>
                        <p className="text-sm text-muted-foreground">{partnership.type}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {partnership.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Доход</p>
                        <p className="font-semibold">{partnership.revenue}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Длительность</p>
                        <p className="font-semibold">{partnership.duration}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">Детали</Button>
                      <Button variant="outline" size="sm">Отчет</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Доступные предложения</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center py-8">
                Новые партнерские предложения появятся здесь
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Рост аудитории</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto text-green-500 mb-2" />
                    <p className="text-2xl font-bold">+8.3%</p>
                    <p className="text-sm text-muted-foreground">За последний месяц</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Вовлеченность</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <Heart className="h-12 w-12 mx-auto text-pink-500 mb-2" />
                    <p className="text-2xl font-bold">12.5%</p>
                    <p className="text-sm text-muted-foreground">Средний показатель</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Детальная аналитика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Расширенная аналитика находится в разработке
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Контент-календарь</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-2">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Календарь публикаций находится в разработке
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
