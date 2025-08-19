import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Rocket, Users, TrendingUp, DollarSign, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForFounders = () => {
  const features = [
    {
      icon: Lightbulb,
      title: 'От идеи до MVP',
      description: 'Полный цикл разработки от концепции до готового продукта'
    },
    {
      icon: Users,
      title: 'Команда мечты',
      description: 'Найдите и соберите команду лучших специалистов для вашего стартапа'
    },
    {
      icon: DollarSign,
      title: 'Поиск инвестиций',
      description: 'Презентуйте проект инвесторам и привлекайте финансирование'
    },
    {
      icon: Rocket,
      title: 'Быстрый запуск',
      description: 'Ускорьте time-to-market благодаря готовой экосистеме'
    },
    {
      icon: TrendingUp,
      title: 'Масштабирование',
      description: 'Инструменты для роста и развития вашего бизнеса'
    },
    {
      icon: Globe,
      title: 'Глобальный рынок',
      description: 'Выход на международные рынки с поддержкой экспертов'
    }
  ];

  const opportunities = [
    {
      title: 'Ищу инвестиции в проект',
      description: 'Презентуйте свой проект инвесторам и получите необходимое финансирование',
      badge: 'Топ'
    },
    {
      title: 'Ищу сотрудников в команду',
      description: 'Находите талантливых специалистов для своей команды',
      badge: 'Популярно'
    },
    {
      title: 'Аукцион идей',
      description: 'Участвуйте в аукционе бизнес-идей и получайте экспертную оценку',
      badge: 'Новое'
    },
    {
      title: 'Приглашаю в команду',
      description: 'Расширьте свою команду, привлекая соучредителей и ключевых сотрудников',
      badge: null
    }
  ];

  const successStories = [
    {
      name: 'EcoTech Solutions',
      founder: 'Алексей Иванов',
      description: 'Платформа для мониторинга экологии',
      investment: '50M₽',
      stage: 'Series A',
      team: '25 человек'
    },
    {
      name: 'HealthAI',
      founder: 'Мария Петрова', 
      description: 'ИИ-диагностика в медицине',
      investment: '30M₽',
      stage: 'Seed',
      team: '15 человек'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-accent/10 via-primary/10 to-background py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Для <span className="text-accent">Фаундеров</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Превратите свою идею в успешный стартап. Соберите команду, найдите инвестиции 
              и масштабируйте бизнес на платформе InvestEx
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth?mode=signup">Запустить стартап</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/investors">Найти инвесторов</Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Features Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Экосистема для стартапов</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-accent" />
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

          {/* Opportunities Section */}
          <section className="py-16 bg-muted/50 rounded-2xl">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Ключевые возможности</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {opportunities.map((opportunity, index) => (
                  <Card key={index} className="relative">
                    <CardHeader>
                      {opportunity.badge && (
                        <Badge className="absolute -top-2 -right-2">{opportunity.badge}</Badge>
                      )}
                      <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4 text-sm">
                        {opportunity.description}
                      </CardDescription>
                      <Button variant="outline" size="sm" className="w-full">
                        Начать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Истории успеха наших фаундеров</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-accent/20 to-primary/20 p-6">
                      <h3 className="text-2xl font-bold mb-2">{story.name}</h3>
                      <p className="text-muted-foreground mb-4">{story.description}</p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-accent">
                          {story.founder.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold">{story.founder}</p>
                          <p className="text-sm text-muted-foreground">Основатель и CEO</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-accent">{story.investment}</div>
                          <div className="text-sm text-muted-foreground">Инвестиции</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">{story.stage}</div>
                          <div className="text-sm text-muted-foreground">Раунд</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-secondary">{story.team}</div>
                          <div className="text-sm text-muted-foreground">Команда</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Process Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Как это работает</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-accent">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Идея</h3>
                  <p className="text-muted-foreground">
                    Зарегистрируйтесь и опубликуйте свою бизнес-идею
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Команда</h3>
                  <p className="text-muted-foreground">
                    Найдите соучредителей и ключевых специалистов
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-secondary">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Разработка</h3>
                  <p className="text-muted-foreground">
                    Создайте MVP с помощью лучших исполнителей
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-accent">
                    4
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Инвестиции</h3>
                  <p className="text-muted-foreground">
                    Презентуйте проект и привлеките финансирование
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">Готовы изменить мир?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Присоединяйтесь к экосистеме инноваций и превратите свою идею в успешный бизнес
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/auth?mode=signup">Запустить проект</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/about">Узнать больше</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForFounders;