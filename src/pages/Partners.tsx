import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Handshake, Megaphone, Camera, Share2, 
  Target, Zap, Users, TrendingUp
} from 'lucide-react';

const Partners = () => {
  const partnerRoles = [
    {
      title: 'Партнер',
      description: 'Развивайте стратегические партнерства и сотрудничество',
      icon: Handshake,
      color: 'bg-blue-500',
      features: ['Стратегическое партнерство', 'Взаимные выгоды', 'Долгосрочные отношения'],
      reward: 'До 15% с оборота',
      opportunities: '50+ партнерств',
      href: '/dashboard?role=partner'
    },
    {
      title: 'Амбассадор',
      description: 'Представляйте платформу и привлекайте новых участников',
      icon: Target,
      color: 'bg-green-500',
      features: ['Представительство бренда', 'Сетевое взаимодействие', 'Эксклюзивные возможности'],
      reward: 'До 10% с привлечений',
      opportunities: '25+ амбассадоров',
      href: '/dashboard?role=ambassador'
    },
    {
      title: 'Блогер',
      description: 'Создавайте контент и рассказывайте о проектах',
      icon: Camera,
      color: 'bg-purple-500',
      features: ['Создание контента', 'Продвижение проектов', 'Медиа-партнерство'],
      reward: '5000₽ за пост',
      opportunities: '100+ блогеров',
      href: '/dashboard?role=blogger'
    }
  ];

  const benefits = [
    {
      icon: Share2,
      title: 'Реферальная программа',
      description: 'Получайте бонусы за каждого приведенного участника'
    },
    {
      icon: Zap,
      title: 'Эксклюзивный доступ',
      description: 'Первыми узнавайте о новых возможностях'
    },
    {
      icon: Users,
      title: 'Сообщество',
      description: 'Общайтесь с другими партнерами и делитесь опытом'
    },
    {
      icon: TrendingUp,
      title: 'Рост доходов',
      description: 'Развивайте партнерскую сеть и увеличивайте прибыль'
    }
  ];

  const successStories = [
    {
      name: 'Александр К.',
      role: 'Партнер',
      achievement: 'Привлек 150+ проектов',
      income: '+2М₽ за год'
    },
    {
      name: 'Мария Р.',
      role: 'Амбассадор',
      achievement: '50К подписчиков',
      income: '+500К₽ за год'
    },
    {
      name: 'Дмитрий С.',
      role: 'Блогер',
      achievement: '100+ публикаций',
      income: '+300К₽ за год'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <section className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">
              Партнеры платформы
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Развивайте партнерские отношения, продвигайте платформу и получайте 
              вознаграждение за свой вклад в развитие экосистемы.
            </p>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <Handshake className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">180+</p>
                <p className="text-sm text-muted-foreground">Активных партнеров</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">25</p>
                <p className="text-sm text-muted-foreground">Амбассадоров</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Camera className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">100+</p>
                <p className="text-sm text-muted-foreground">Контент-мейкеров</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Megaphone className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">5М₽</p>
                <p className="text-sm text-muted-foreground">Выплачено партнерам</p>
              </CardContent>
            </Card>
          </section>

          {/* Roles Grid */}
          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {partnerRoles.map((role, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${role.color} rounded-lg flex items-center justify-center`}>
                      <role.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{role.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Вознаграждение</p>
                        <p className="font-medium">{role.reward}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Возможности</p>
                        <p className="font-medium">{role.opportunities}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {role.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button asChild className="w-full">
                      <Link to={role.href}>
                        Стать партнером
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Преимущества партнерства
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center p-6">
                  <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Success Stories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Истории успеха
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <Card key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {story.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-semibold mb-2">{story.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{story.role}</p>
                  <p className="text-sm font-medium mb-1">{story.achievement}</p>
                  <p className="text-lg font-bold text-green-600">{story.income}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Partner Tools */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Инструменты для партнеров
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Реферальные ссылки', description: 'Отслеживайте переходы и конверсию' },
                { title: 'Маркетинговые материалы', description: 'Готовые баннеры и презентации' },
                { title: 'Аналитика', description: 'Подробная статистика по доходам' },
                { title: 'Обучающие материалы', description: 'Курсы по развитию партнерства' },
                { title: 'Персональный менеджер', description: 'Индивидуальная поддержка' },
                { title: 'Эксклюзивные мероприятия', description: 'Конференции и нетворкинг' }
              ].map((tool, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-semibold mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              Готовы стать партнером?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к нашей партнерской программе и начните получать 
              доход от продвижения инновационной платформы.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth?mode=signup">
                  Стать партнером
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  Связаться с нами
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Partners;