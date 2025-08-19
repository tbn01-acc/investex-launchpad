import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, DollarSign, Users, Star, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForFreelancers = () => {
  const features = [
    {
      icon: Briefcase,
      title: 'Разнообразные проекты',
      description: 'От небольших задач до крупных проектов в различных сферах'
    },
    {
      icon: DollarSign,
      title: 'Достойная оплата',
      description: 'Конкурентные ставки и прозрачная система расчетов'
    },
    {
      icon: Users,
      title: 'Командная работа',
      description: 'Возможность работать в составе профессиональных команд'
    },
    {
      icon: Star,
      title: 'Рейтинговая система',
      description: 'Повышайте свой рейтинг и получайте больше заказов'
    },
    {
      icon: TrendingUp,
      title: 'Карьерный рост',
      description: 'Развивайтесь профессионально на интересных проектах'
    },
    {
      icon: Shield,
      title: 'Гарантии оплаты',
      description: 'Защита от недобросовестных заказчиков'
    }
  ];

  const activities = [
    {
      title: 'Ищу команду для работы в ней',
      description: 'Найдите единомышленников и присоединитесь к перспективной команде',
      badge: 'Популярно'
    },
    {
      title: 'Ищу проект для работы в нем',
      description: 'Выберите интересный проект и станьте его частью',
      badge: 'Новое'
    },
    {
      title: 'Предлагаю свои услуги',
      description: 'Создайте профиль и получайте предложения от заказчиков',
      badge: null
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Для <span className="text-primary">Фрилансеров</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Найдите интересные проекты, работайте с лучшими командами и 
              развивайте свою карьеру на платформе InvestEx
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth?mode=signup">Начать зарабатывать</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/projects">Смотреть проекты</Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Features Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Преимущества работы на InvestEx</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Activities Section */}
          <section className="py-16 bg-muted/50 rounded-2xl">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Ключевые возможности</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {activities.map((activity, index) => (
                  <Card key={index} className="relative">
                    <CardHeader>
                      {activity.badge && (
                        <Badge className="absolute -top-2 -right-2">{activity.badge}</Badge>
                      )}
                      <CardTitle className="text-lg">{activity.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {activity.description}
                      </CardDescription>
                      <Button variant="outline" className="w-full">
                        Узнать больше
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Истории успеха</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      А
                    </div>
                    <div>
                      <h3 className="font-semibold">Анна Веб-дизайнер</h3>
                      <p className="text-muted-foreground">Frontend разработчик</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "За год работы на InvestEx я участвовала в 15 проектах, 
                    повысила свой доход на 40% и нашла постоянную команду для долгосрочного сотрудничества."
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                      М
                    </div>
                    <div>
                      <h3 className="font-semibold">Михаил Программист</h3>
                      <p className="text-muted-foreground">Full-stack разработчик</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Платформа помогла мне найти интересные стартап-проекты, 
                    где я могу не только заработать, но и получить долю в успешных компаниях."
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Присоединяйтесь к тысячам фрилансеров, которые уже зарабатывают на InvestEx
                </p>
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link to="/auth?mode=signup">Создать профиль фрилансера</Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForFreelancers;