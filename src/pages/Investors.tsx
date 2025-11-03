import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, Users, TrendingUp, Store
} from 'lucide-react';

const Investors = () => {
  const investorRoles = [
    {
      title: 'Инвестор',
      description: 'Инвестируйте в перспективные проекты и получайте доходность',
      icon: DollarSign,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      features: ['Анализ проектов', 'Портфельное управление', 'Due Diligence'],
      href: '/dashboard?role=investor'
    },
    {
      title: 'Соинвестор', 
      description: 'Участвуйте в совместных инвестициях с другими инвесторами',
      icon: Users,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      features: ['Групповые инвестиции', 'Снижение рисков', 'Коллективные решения'],
      href: '/dashboard?role=co_investor'
    },
    {
      title: 'Франчайзи',
      description: 'Инвестируйте в готовый бизнес и получайте пассивный доход',
      icon: Store,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      features: ['Готовая бизнес-модель', 'Поддержка франчайзера', 'Быстрый запуск'],
      href: '/dashboard?role=franchisee'
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
              Инвесторы
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Инвестируйте в перспективные стартапы, участвуйте в совместных инвестициях 
              или приобретайте готовый бизнес через франшизу.
            </p>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold">2.8М+</p>
                <p className="text-sm text-muted-foreground">Инвестировано</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold">150+</p>
                <p className="text-sm text-muted-foreground">Стартапов</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">Инвесторов</p>
              </CardContent>
            </Card>
          </section>

          {/* Roles Grid */}
          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {investorRoles.map((role, index) => (
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
              Готовы начать инвестировать?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к сообществу успешных инвесторов и начните 
              строить свой инвестиционный портфель уже сегодня.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-primary">
                <Link to="/auth?mode=signup">
                  Начать сейчас
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/investments">
                  Смотреть проекты
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

export default Investors;
