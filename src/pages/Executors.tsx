import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Code, Palette, Brain, Building, 
  Wrench, Star, Clock, DollarSign
} from 'lucide-react';

const Executors = () => {
  const executorRoles = [
    {
      title: 'Фрилансер',
      description: 'Работайте над интересными проектами в удобное время',
      icon: Code,
      color: 'bg-blue-500',
      features: ['Гибкий график', 'Разнообразные проекты', 'Прямые контакты с клиентами'],
      averageRate: '2500₽/час',
      projects: '150+ проектов',
      href: '/dashboard?role=freelancer'
    },
    {
      title: 'Эксперт',
      description: 'Предоставляйте консультации и экспертизу в своей области',
      icon: Brain,
      color: 'bg-purple-500',
      features: ['Экспертные консультации', 'Высокие ставки', 'Престижные проекты'],
      averageRate: '5000₽/час',
      projects: '80+ консультаций',
      href: '/dashboard?role=expert'
    },
    {
      title: 'Консультант',
      description: 'Помогайте бизнесу решать стратегические задачи',
      icon: Star,
      color: 'bg-green-500',
      features: ['Стратегическое планирование', 'Бизнес-анализ', 'Долгосрочные проекты'],
      averageRate: '4000₽/час',
      projects: '60+ проектов',
      href: '/dashboard?role=consultant'
    },
    {
      title: 'Аутсорсер',
      description: 'Управляйте командой и реализуйте крупные проекты',
      icon: Building,
      color: 'bg-orange-500',
      features: ['Управление командой', 'Крупные проекты', 'Полный цикл разработки'],
      averageRate: '850К₽/проект',
      projects: '25+ проектов',
      href: '/dashboard?role=outsourcer'
    },
    {
      title: 'Подрядчик',
      description: 'Выполняйте специализированные работы и услуги',
      icon: Wrench,
      color: 'bg-red-500',
      features: ['Специализированные работы', 'Техническая экспертиза', 'Фиксированная стоимость'],
      averageRate: '3000₽/час',
      projects: '100+ работ',
      href: '/dashboard?role=contractor'
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
              Исполнители проектов
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Специалисты, которые воплощают идеи в реальность. От фрилансеров до 
              аутсорсинговых компаний — каждый найдет подходящие возможности.
            </p>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <Code className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">1500+</p>
                <p className="text-sm text-muted-foreground">Активных исполнителей</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">95%</p>
                <p className="text-sm text-muted-foreground">Проекты в срок</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-muted-foreground">Средний рейтинг</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">890М₽</p>
                <p className="text-sm text-muted-foreground">Выплачено исполнителям</p>
              </CardContent>
            </Card>
          </section>

          {/* Roles Grid */}
          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {executorRoles.map((role, index) => (
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
                        <p className="text-muted-foreground">Средняя ставка</p>
                        <p className="font-medium">{role.averageRate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Активность</p>
                        <p className="font-medium">{role.projects}</p>
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
                        Перейти в кабинет
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Skills Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Популярные навыки
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                'React', 'Python', 'UI/UX Design', 'Node.js', 'Mobile Development',
                'Data Science', 'DevOps', 'Blockchain', 'AI/ML', 'Project Management',
                'Digital Marketing', 'Business Analysis'
              ].map((skill, index) => (
                <Card key={index} className="text-center p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <p className="font-medium">{skill}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              Готовы начать работать?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам успешных исполнителей и найдите 
              проекты, которые соответствуют вашим навыкам и интересам.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth?mode=signup">
                  Начать работу
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/projects">
                  Посмотреть проекты
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

export default Executors;