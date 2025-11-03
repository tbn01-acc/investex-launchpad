import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building, TrendingUp, Users, Globe, 
  FileText, HeadphonesIcon, BarChart, Target
} from 'lucide-react';

const Franchisers = () => {
  const benefits = [
    {
      title: 'Масштабирование бизнеса',
      description: 'Расширяйте географию без значительных капитальных вложений',
      icon: Globe,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Пассивный доход',
      description: 'Получайте роялти и паушальные взносы от франчайзи',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Усиление бренда',
      description: 'Укрепляйте узнаваемость через сеть франчайзи',
      icon: Target,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Минимизация рисков',
      description: 'Франчайзи берут на себя операционные риски',
      icon: BarChart,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const services = [
    {
      title: 'Разработка франшизного пакета',
      description: 'Создание полного пакета документов и регламентов для франчайзи',
      icon: FileText
    },
    {
      title: 'Поиск франчайзи',
      description: 'Доступ к базе потенциальных франчайзи на платформе',
      icon: Users
    },
    {
      title: 'Юридическое сопровождение',
      description: 'Подготовка договоров и юридическая поддержка',
      icon: Building
    },
    {
      title: 'CRM для франчайзеров',
      description: 'Система управления сетью франчайзи и контроль показателей',
      icon: HeadphonesIcon
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
              Для франчайзеров
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Масштабируйте свой успешный бизнес через франчайзинг. Создавайте сеть, 
              находите партнеров и получайте пассивный доход.
            </p>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold">50+</p>
                <p className="text-sm text-muted-foreground">Франчайзеров</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold">1,200+</p>
                <p className="text-sm text-muted-foreground">Франчайзи</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-muted-foreground">Городов</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold">30%+</p>
                <p className="text-sm text-muted-foreground">Средний рост сети</p>
              </CardContent>
            </Card>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Преимущества франчайзинга</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Services */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Что мы предлагаем</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                          <CardDescription>{service.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* How it works */}
          <section className="mb-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-8 text-center">Как это работает</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-bold mb-2">Регистрация</h3>
                <p className="text-sm text-muted-foreground">Зарегистрируйтесь на платформе и создайте профиль франчайзера</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-bold mb-2">Создание франшизы</h3>
                <p className="text-sm text-muted-foreground">Разработайте франшизный пакет с помощью наших инструментов</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-bold mb-2">Масштабирование</h3>
                <p className="text-sm text-muted-foreground">Находите франчайзи, развивайте сеть и получайте доход</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Готовы масштабировать бизнес?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к успешным франчайзерам и начните развивать 
              свою сеть уже сегодня.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-primary">
                <Link to="/auth?mode=signup">
                  Стать франчайзером
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/pricing">
                  Смотреть тарифы
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

export default Franchisers;
