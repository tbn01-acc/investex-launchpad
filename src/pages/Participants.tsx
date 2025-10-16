import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, Users, TrendingUp, Target, 
  Briefcase, Building, UserCheck, Crown
} from 'lucide-react';

const Participants = () => {
  const participantRoles = [
    {
      title: 'Инвестор',
      description: 'Инвестируйте в перспективные проекты и получайте доходность',
      icon: DollarSign,
      color: 'bg-green-500',
      features: ['Анализ проектов', 'Портфельное управление', 'Due Diligence'],
      href: '/dashboard?role=investor'
    },
    {
      title: 'Соинвестор', 
      description: 'Участвуйте в совместных инвестициях с другими инвесторами',
      icon: Users,
      color: 'bg-blue-500',
      features: ['Групповые инвестиции', 'Снижение рисков', 'Коллективные решения'],
      href: '/dashboard?role=co_investor'
    },
    {
      title: 'Фаундер',
      description: 'Создавайте стартапы и привлекайте инвестиции',
      icon: TrendingUp,
      color: 'bg-purple-500',
      features: ['Создание проектов', 'Поиск инвесторов', 'Развитие команды'],
      href: '/dashboard?role=founder'
    },
    {
      title: 'Ко-фаундер',
      description: 'Присоединяйтесь к команде основателей проектов',
      icon: Target,
      color: 'bg-orange-500',
          features: ['Партнерство', 'Совместное развитие', 'Разделение ответственности'],
          href: '/dashboard?role=co_founder'
    },
    {
      title: 'Соучредитель',
      description: 'Станьте частью учредительской команды',
      icon: Crown,
      color: 'bg-yellow-500',
          features: ['Учредительство', 'Долевое участие', 'Стратегические решения'],
          href: '/dashboard?role=co_owner'
    },
    {
      title: 'Франчайзер',
      description: 'Развивайте франчайзинговую сеть и масштабируйте бизнес',
      icon: Building,
      color: 'bg-teal-500',
      features: ['Управление сетью', 'Поиск франчайзи', 'Пассивный доход'],
      href: '/dashboard?role=franchiser'
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
              Участники проектов
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Инвесторы, фаундеры и соучредители — движущая сила инновационных проектов. 
              Выберите свою роль и начните путь к успеху.
            </p>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">2.8М+</p>
                <p className="text-sm text-muted-foreground">Инвестировано</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">150+</p>
                <p className="text-sm text-muted-foreground">Стартапов</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">Инвесторов</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">25%</p>
                <p className="text-sm text-muted-foreground">Средняя доходность</p>
              </CardContent>
            </Card>
          </section>

          {/* Roles Grid */}
          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {participantRoles.map((role, index) => (
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
                        Перейти в кабинет
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              Готовы стать частью экосистемы?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к сообществу успешных участников проектов и начните 
              строить будущее уже сегодня.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth?mode=signup">
                  Начать сейчас
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">
                  Узнать больше
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

export default Participants;