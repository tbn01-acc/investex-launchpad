import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Target, Award, Handshake, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForOutsourcers = () => {
  const features = [
    {
      icon: Building2,
      title: 'Масштабные проекты',
      description: 'Получайте заказы на разработку полноценных продуктов и систем'
    },
    {
      icon: Users,
      title: 'Команда экспертов',
      description: 'Подбирайте лучших специалистов для ваших проектов'
    },
    {
      icon: Target,
      title: 'Точные ТЗ',
      description: 'Работайте с детализированными техническими заданиями'
    },
    {
      icon: Award,
      title: 'Репутация агентства',
      description: 'Стройте долгосрочные отношения с клиентами'
    },
    {
      icon: Handshake,
      title: 'Партнерства',
      description: 'Находите партнеров для реализации крупных проектов'
    },
    {
      icon: Clock,
      title: 'Гибкие сроки',
      description: 'Планируйте загрузку команды на месяцы вперед'
    }
  ];

  const services = [
    {
      title: 'Ищу исполнителей в проект',
      description: 'Найдите профессиональную команду для реализации вашего проекта',
      badge: 'Популярно'
    },
    {
      title: 'Предлагаю аутсорс услуги',
      description: 'Размещайте свои компетенции и получайте заказы от стартапов',
      badge: null
    },
    {
      title: 'Партнерство с агентствами',
      description: 'Объединяйтесь с другими агентствами для реализации крупных проектов',
      badge: 'Новое'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary/10 via-accent/10 to-background py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Для <span className="text-secondary">Аутсорсеров</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Предлагайте профессиональные услуги разработки, находите клиентов 
              и развивайте свое агентство на платформе InvestEx
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth?mode=signup">Зарегистрировать агентство</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/projects">Найти проекты</Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Features Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Преимущества для аутсорс-агентств</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-secondary" />
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

          {/* Services Section */}
          <section className="py-16 bg-muted/50 rounded-2xl">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Ваши возможности</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <Card key={index} className="relative">
                    <CardHeader>
                      {service.badge && (
                        <Badge className="absolute -top-2 -right-2">{service.badge}</Badge>
                      )}
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {service.description}
                      </CardDescription>
                      <Button variant="outline" className="w-full">
                        Подробнее
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Цифры говорят за нас</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-secondary mb-2">150+</div>
                  <div className="text-muted-foreground">Активных агентств</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-accent mb-2">500+</div>
                  <div className="text-muted-foreground">Реализованных проектов</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">25M₽</div>
                  <div className="text-muted-foreground">Суммарный объем заказов</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-secondary mb-2">98%</div>
                  <div className="text-muted-foreground">Успешных проектов</div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Case Studies */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Кейсы наших партнеров</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      DA
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Digital Agency Pro</h3>
                      <p className="text-muted-foreground">Веб-разработка и дизайн</p>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">Разработка MVP для FinTech стартапа</h4>
                  <p className="text-muted-foreground mb-4">
                    "Реализовали MVP мобильного приложения для финтех-стартапа за 3 месяца. 
                    Проект получил инвестиции в размере 15 млн рублей."
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">MVP</Badge>
                    <Badge variant="secondary">React Native</Badge>
                    <Badge variant="secondary">FinTech</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      TS
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">TechSolutions Ltd</h3>
                      <p className="text-muted-foreground">Корпоративные решения</p>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">Платформа для управления инвестициями</h4>
                  <p className="text-muted-foreground mb-4">
                    "Создали комплексную платформу для управления инвестиционным портфелем. 
                    Сейчас обслуживает более 1000 активных пользователей."
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Enterprise</Badge>
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">Blockchain</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">Начните получать заказы уже сегодня</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Зарегистрируйте свое агентство и получите доступ к базе перспективных проектов
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/auth?mode=signup">Зарегистрировать агентство</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/pricing">Посмотреть тарифы</Link>
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

export default ForOutsourcers;