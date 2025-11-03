import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, Target, Crown, Building
} from 'lucide-react';

const Startup = () => {
  const startupRoles = [
    {
      title: 'Фаундер',
      description: 'Создавайте стартапы и привлекайте инвестиции',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      features: ['Создание проектов', 'Поиск инвесторов', 'Развитие команды'],
      href: '/dashboard?role=founder'
    },
    {
      title: 'Ко-фаундер',
      description: 'Присоединяйтесь к команде основателей проектов',
      icon: Target,
      color: 'bg-gradient-to-br from-pink-500 to-pink-600',
      features: ['Партнерство', 'Совместное развитие', 'Разделение ответственности'],
      href: '/dashboard?role=co_founder'
    },
    {
      title: 'Соучредитель',
      description: 'Станьте частью учредительской команды',
      icon: Crown,
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      features: ['Учредительство', 'Долевое участие', 'Стратегические решения'],
      href: '/dashboard?role=co_owner'
    },
    {
      title: 'Франчайзер',
      description: 'Развивайте франчайзинговую сеть и масштабируйте бизнес',
      icon: Building,
      color: 'bg-gradient-to-br from-teal-500 to-teal-600',
      features: ['Управление сетью', 'Поиск франчайзи', 'Масштабирование'],
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
              Стартап и Франшиза
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Создавайте инновационные стартапы, присоединяйтесь к командам основателей 
              или масштабируйте свой бизнес через франчайзинг.
            </p>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold">150+</p>
                <p className="text-sm text-muted-foreground">Активных стартапов</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold">300+</p>
                <p className="text-sm text-muted-foreground">Фаундеров</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold">50+</p>
                <p className="text-sm text-muted-foreground">Франшиз</p>
              </CardContent>
            </Card>
          </section>

          {/* Roles Grid */}
          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-16">
            {startupRoles.map((role, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${role.color} rounded-lg flex items-center justify-center shadow-lg`}>
                      <role.icon className="w-7 h-7 text-white" />
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
                    
                    <Button asChild className="w-full bg-gradient-primary">
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
              Готовы запустить свой проект?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к экосистеме успешных предпринимателей и начните 
              строить будущее уже сегодня.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-primary">
                <Link to="/auth?mode=signup">
                  Начать сейчас
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/for-founders">
                  Для основателей
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

export default Startup;
