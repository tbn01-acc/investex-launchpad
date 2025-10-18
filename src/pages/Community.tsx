import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Calendar, TrendingUp, Award, Heart } from "lucide-react";

const Community = () => {
  const communityStats = [
    { icon: Users, label: "Активных участников", value: "15,000+" },
    { icon: MessageSquare, label: "Обсуждений", value: "2,500+" },
    { icon: Calendar, label: "Мероприятий в месяц", value: "20+" },
    { icon: Award, label: "Экспертов", value: "500+" },
  ];

  const discussions = [
    {
      title: "Как правильно оценить стартап на ранней стадии?",
      author: "Михаил Петров",
      avatar: "/src/assets/projects/fintech-mobile-app.jpg",
      replies: 24,
      category: "Инвестиции",
      isActive: true,
    },
    {
      title: "Лучшие практики поиска ко-фаундера",
      author: "Анна Иванова",
      avatar: "/src/assets/projects/healthtech-platform.jpg",
      replies: 18,
      category: "Фаундерам",
      isActive: true,
    },
    {
      title: "Как выбрать нишу для EdTech стартапа в 2025?",
      author: "Дмитрий Волков",
      avatar: "/src/assets/projects/edtech-platform.jpg",
      replies: 31,
      category: "Стартапы",
      isActive: false,
    },
  ];

  const events = [
    {
      title: "Вебинар: Тренды венчурных инвестиций 2025",
      date: "15 ноября, 18:00",
      speaker: "Елена Смирнова",
      type: "Онлайн",
    },
    {
      title: "Нетворкинг для фаундеров и инвесторов",
      date: "22 ноября, 19:00",
      speaker: "Команда Invest-Ex",
      type: "Офлайн, Москва",
    },
    {
      title: "Мастер-класс: Питчинг для инвесторов",
      date: "28 ноября, 17:00",
      speaker: "Игорь Козлов",
      type: "Онлайн",
    },
  ];

  const topMembers = [
    {
      name: "Александр Новиков",
      role: "Инвестор",
      avatar: "/src/assets/projects/blockchain-logistics.jpg",
      contributions: 156,
    },
    {
      name: "Мария Светлова",
      role: "Эксперт",
      avatar: "/src/assets/projects/ai-marketing-ecommerce.jpg",
      contributions: 142,
    },
    {
      name: "Сергей Белов",
      role: "Фаундер",
      avatar: "/src/assets/projects/greentech-energy.jpg",
      contributions: 128,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Сообщество Invest-Ex</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Присоединяйтесь к живому сообществу фаундеров, инвесторов, экспертов и энтузиастов инноваций. 
              Обменивайтесь опытом, находите партнёров и развивайте свои идеи вместе с нами.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg">
                <Heart className="mr-2 h-5 w-5" />
                Присоединиться
              </Button>
              <Button size="lg" variant="outline">
                <Calendar className="mr-2 h-5 w-5" />
                Календарь событий
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold">{stat.value}</CardTitle>
                  <CardDescription>{stat.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Discussions & Events */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Discussions */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Обсуждения</h2>
                <Button variant="outline">Все обсуждения</Button>
              </div>
              <div className="space-y-4">
                {discussions.map((discussion, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={discussion.avatar} />
                          <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={discussion.isActive ? "default" : "secondary"}>
                              {discussion.category}
                            </Badge>
                            {discussion.isActive && (
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                Активно
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg mb-2">{discussion.title}</CardTitle>
                          <CardDescription className="flex items-center gap-4">
                            <span>{discussion.author}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {discussion.replies} ответов
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Events */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Предстоящие события</h2>
              <div className="space-y-4">
                {events.map((event, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <Badge className="w-fit mb-2">{event.type}</Badge>
                      <CardTitle className="text-base">{event.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="mt-1">Спикер: {event.speaker}</div>
                      </CardDescription>
                      <Button className="w-full mt-3" variant="outline">Записаться</Button>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Members */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Топ участников месяца</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {topMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{member.contributions} вкладов</span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;
