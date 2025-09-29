import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Settings, Users, Search, Calendar, 
  CheckCircle, TrendingUp, Clock, Award
} from 'lucide-react';

const Employees = () => {
  const employeeRoles = [
    {
      title: 'Администратор проекта',
      description: 'Управляйте проектами и координируйте работу команды',
      icon: Settings,
      color: 'bg-blue-500',
      features: ['Управление проектами', 'Координация команды', 'Контроль качества'],
      averageRate: '120К₽/месяц',
      demand: 'Высокий спрос',
      href: '/dashboard?role=project-admin'
    },
    {
      title: 'Сотрудник проекта',
      description: 'Участвуйте в реализации проектов в качестве штатного сотрудника',
      icon: Users,
      color: 'bg-green-500',
      features: ['Стабильная занятость', 'Корпоративные льготы', 'Карьерный рост'],
      averageRate: '80К₽/месяц',
      demand: 'Стабильный спрос',
      href: '/dashboard?role=project-employee'
    },
    {
      title: 'Соискатель',
      description: 'Ищите работу в инновационных проектах и стартапах',
      icon: Search,
      color: 'bg-purple-500',
      features: ['Поиск вакансий', 'Карьерные возможности', 'Развитие навыков'],
      averageRate: 'От 50К₽/месяц',
      demand: 'Много предложений',
      href: '/dashboard?role=job-seeker'
    }
  ];

  const benefits = [
    {
      icon: Calendar,
      title: 'Гибкий график',
      description: 'Возможность удаленной работы и гибкого графика'
    },
    {
      icon: TrendingUp,
      title: 'Карьерный рост',
      description: 'Перспективы развития в инновационных проектах'
    },
    {
      icon: Award,
      title: 'Обучение',
      description: 'Непрерывное развитие и повышение квалификации'
    },
    {
      icon: CheckCircle,
      title: 'Стабильность',
      description: 'Надежная занятость в перспективных проектах'
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
              Сотрудники проектов
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Стабильная работа в инновационных проектах. От администраторов до 
              соискателей — найдите свое место в команде успешных стартапов.
            </p>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">800+</p>
                <p className="text-sm text-muted-foreground">Активных сотрудников</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Settings className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">150+</p>
                <p className="text-sm text-muted-foreground">Проектов в управлении</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Search className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">200+</p>
                <p className="text-sm text-muted-foreground">Открытых вакансий</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">92%</p>
                <p className="text-sm text-muted-foreground">Удовлетворенность работой</p>
              </CardContent>
            </Card>
          </section>

          {/* Roles Grid */}
          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {employeeRoles.map((role, index) => (
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
                        <p className="text-muted-foreground">Зарплата</p>
                        <p className="font-medium">{role.averageRate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Спрос</p>
                        <p className="font-medium">{role.demand}</p>
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

          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Преимущества работы в проектах
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

          {/* Popular Positions */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Популярные позиции
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Project Manager', salary: '120-150К₽', vacancies: 15 },
                { title: 'Product Manager', salary: '140-180К₽', vacancies: 8 },
                { title: 'Business Analyst', salary: '90-120К₽', vacancies: 12 },
                { title: 'Scrum Master', salary: '110-140К₽', vacancies: 6 },
                { title: 'QA Engineer', salary: '80-110К₽', vacancies: 20 },
                { title: 'Technical Writer', salary: '70-100К₽', vacancies: 10 }
              ].map((position, index) => (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">{position.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    Зарплата: {position.salary}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Вакансий: {position.vacancies}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              Готовы присоединиться к команде?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Найдите стабильную работу в инновационных проектах и развивайте 
              свою карьеру вместе с успешными стартапами.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth?mode=signup">
                  Найти работу
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/projects">
                  Посмотреть вакансии
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

export default Employees;