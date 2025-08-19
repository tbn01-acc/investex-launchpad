import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Shield, BarChart3, Users, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForInvestors = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Аналитика проектов',
      description: 'Детальная информация о метриках, команде и потенциале стартапов'
    },
    {
      icon: Shield,
      title: 'Проверенные проекты',
      description: 'Все проекты проходят тщательный отбор и верификацию'
    },
    {
      icon: TrendingUp,
      title: 'Высокий потенциал',
      description: 'Инвестируйте в перспективные стартапы на ранних стадиях'
    },
    {
      icon: Users,
      title: 'Прямое общение',
      description: 'Непосредственный контакт с основателями проектов'
    },
    {
      icon: Star,
      title: 'Диверсификация',
      description: 'Широкий выбор проектов в различных отраслях'
    },
    {
      icon: Zap,
      title: 'Быстрые сделки',
      description: 'Оптимизированный процесс инвестирования'
    }
  ];

  const investmentOptions = [
    {
      title: 'Ищу проект для инвестиций',
      description: 'Просматривайте актуальные проекты и выбирайте подходящие для инвестиций',
      badge: 'Популярно'
    },
    {
      title: 'Тариф Инвестор',
      description: 'Премиум доступ к эксклюзивным проектам и расширенной аналитике',
      badge: 'Premium'
    },
    {
      title: 'Портфельные инвестиции',
      description: 'Создавайте диверсифицированный портфель из нескольких стартапов',
      badge: null
    }
  ];

  const portfolioStats = [
    {
      sector: 'FinTech',
      projects: 45,
      totalInvestment: '180M₽',
      avgReturn: '+156%'
    },
    {
      sector: 'HealthTech',
      projects: 32,
      totalInvestment: '95M₽',
      avgReturn: '+89%'
    },
    {
      sector: 'EdTech',
      projects: 28,
      totalInvestment: '70M₽',
      avgReturn: '+67%'
    },
    {
      sector: 'GreenTech',
      projects: 21,
      totalInvestment: '125M₽',
      avgReturn: '+134%'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-accent/10 to-background py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Для <span className="text-primary">Инвесторов</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Инвестируйте в будущее. Находите перспективные стартапы, 
              анализируйте возможности и формируйте прибыльный портфель на InvestEx
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth?mode=signup">Начать инвестировать</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/projects">Посмотреть проекты</Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Features Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Преимущества для инвесторов</h2>
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

          {/* Investment Options Section */}
          <section className="py-16 bg-muted/50 rounded-2xl">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Инвестиционные возможности</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {investmentOptions.map((option, index) => (
                  <Card key={index} className="relative">
                    <CardHeader>
                      {option.badge && (
                        <Badge className="absolute -top-2 -right-2">{option.badge}</Badge>
                      )}
                      <CardTitle className="text-lg">{option.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {option.description}
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

          {/* Portfolio Statistics */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Статистика по секторам</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolioStats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">{stat.sector}</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-primary">{stat.projects}</div>
                        <div className="text-sm text-muted-foreground">Проектов</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{stat.totalInvestment}</div>
                        <div className="text-sm text-muted-foreground">Инвестировано</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-secondary">{stat.avgReturn}</div>
                        <div className="text-sm text-muted-foreground">Средний ROI</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Success Cases */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Истории успешных инвестиций</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">SmartLogistics Pro</h3>
                      <p className="text-muted-foreground">Автоматизация логистических процессов</p>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground">Продано</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">5M₽</div>
                      <div className="text-sm text-muted-foreground">Инвестиция</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-secondary">18M₽</div>
                      <div className="text-sm text-muted-foreground">Выход</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent">260%</div>
                      <div className="text-sm text-muted-foreground">ROI</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Инвестировал на seed-стадии, компания была продана за 18 месяцев 
                    крупному логистическому холдингу."
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">EcoEnergy Solutions</h3>
                      <p className="text-muted-foreground">Платформа для торговли углеродными кредитами</p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">Активно</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">8M₽</div>
                      <div className="text-sm text-muted-foreground">Инвестиция</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">25M₽</div>
                      <div className="text-sm text-muted-foreground">Оценка</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-secondary">+212%</div>
                      <div className="text-sm text-muted-foreground">Рост</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Участвовал в Series A, за 2 года компания выросла в 3 раза 
                    и готовится к следующему раунду."
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Investment Process */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Процесс инвестирования</h2>
            <div className="grid md:grid-cols-5 gap-4">
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold text-primary">
                    1
                  </div>
                  <h3 className="font-semibold mb-1">Регистрация</h3>
                  <p className="text-sm text-muted-foreground">Создайте профиль инвестора</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold text-secondary">
                    2
                  </div>
                  <h3 className="font-semibold mb-1">Поиск</h3>
                  <p className="text-sm text-muted-foreground">Изучайте проекты</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold text-accent">
                    3
                  </div>
                  <h3 className="font-semibold mb-1">Анализ</h3>
                  <p className="text-sm text-muted-foreground">Проводите due diligence</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold text-primary">
                    4
                  </div>
                  <h3 className="font-semibold mb-1">Переговоры</h3>
                  <p className="text-sm text-muted-foreground">Обсуждайте условия</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold text-secondary">
                    5
                  </div>
                  <h3 className="font-semibold mb-1">Инвестиция</h3>
                  <p className="text-sm text-muted-foreground">Завершите сделку</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">Начните инвестировать в инновации</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Присоединяйтесь к сообществу успешных инвесторов и получите доступ 
                  к эксклюзивным инвестиционным возможностям
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/auth?mode=signup">Стать инвестором</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/pricing">Тарифы для инвесторов</Link>
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

export default ForInvestors;