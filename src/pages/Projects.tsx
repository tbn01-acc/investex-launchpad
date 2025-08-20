import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Calendar, DollarSign, Users, Clock } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Разработка мобильного приложения для FinTech стартапа',
      description: 'Необходимо создать MVP мобильного приложения для управления личными финансами с интеграцией банковских API.',
      budget: { min: 800000, max: 1200000, currency: 'RUB' },
      deadline: '3 месяца',
      skills: ['React Native', 'Node.js', 'PostgreSQL', 'Banking API'],
      category: 'Разработка',
      type: 'MVP',
      applicants: 12,
      posted: '2 дня назад'
    },
    {
      id: 2,
      title: 'UI/UX дизайн для платформы электронной коммерции',
      description: 'Требуется полный редизайн интерфейса существующей платформы электронной коммерции с фокусом на UX.',
      budget: { min: 300000, max: 500000, currency: 'RUB' },
      deadline: '6 недель',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      category: 'Дизайн',
      type: 'Редизайн',
      applicants: 8,
      posted: '4 дня назад'
    },
    {
      id: 3,
      title: 'Блокчейн разработчик для DeFi проекта',
      description: 'Ищем опытного разработчика для создания смарт-контрактов и DeFi протоколов на Ethereum.',
      budget: { min: 1500000, max: 2500000, currency: 'RUB' },
      deadline: '4 месяца',
      skills: ['Solidity', 'Web3.js', 'Ethereum', 'DeFi'],
      category: 'Blockchain',
      type: 'Полная разработка',
      applicants: 5,
      posted: '1 неделя назад'
    },
    {
      id: 4,
      title: 'Маркетинговая стратегия для EdTech стартапа',
      description: 'Разработка комплексной маркетинговой стратегии для запуска образовательной платформы.',
      budget: { min: 400000, max: 700000, currency: 'RUB' },
      deadline: '2 месяца',
      skills: ['Digital Marketing', 'Content Strategy', 'SEO', 'Analytics'],
      category: 'Маркетинг',
      type: 'Стратегия',
      applicants: 15,
      posted: '3 дня назад'
    }
  ];

  const formatBudget = (budget: any) => {
    const min = (budget.min / 1000).toFixed(0);
    const max = (budget.max / 1000).toFixed(0);
    return `${min}K - ${max}K ₽`;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Разработка': 'bg-primary text-primary-foreground',
      'Дизайн': 'bg-secondary text-secondary-foreground',
      'Blockchain': 'bg-accent text-accent-foreground',
      'Маркетинг': 'bg-muted text-muted-foreground'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Биржа проектов</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Найдите идеальный проект для вашей команды или предложите свои услуги
              </p>
            </div>

            {/* Search and Filters */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Поиск проектов..." className="pl-10" />
                  </div>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Разработка</SelectItem>
                      <SelectItem value="design">Дизайн</SelectItem>
                      <SelectItem value="marketing">Маркетинг</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Бюджет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-500">До 500K ₽</SelectItem>
                      <SelectItem value="500-1000">500K - 1M ₽</SelectItem>
                      <SelectItem value="1000+">Свыше 1M ₽</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button className="w-full">
                    <Filter className="w-4 h-4 mr-2" />
                    Применить фильтры
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Project List */}
          <section>
            <div className="grid gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(project.category)}>
                            {project.category}
                          </Badge>
                          <Badge variant="outline">{project.type}</Badge>
                        </div>
                        <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                        <CardDescription className="text-base">
                          {project.description}
                        </CardDescription>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {formatBudget(project.budget)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {project.posted}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{project.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{project.applicants} откликов</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="w-4 h-4" />
                        <span>Фиксированная цена</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1">
                        Откликнуться на проект
                      </Button>
                      <Button variant="outline">
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Загрузить еще проекты
              </Button>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 mt-16">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Есть проект? Разместите его!</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Опубликуйте свой проект и найдите лучших исполнителей из нашего сообщества профессионалов
                </p>
                <Button size="lg">
                  Разместить проект
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;