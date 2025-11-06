import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Store, DollarSign, TrendingUp, Users, 
  Clock, Award, MapPin, BarChart, Heart
} from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';

const Franchises = () => {
  const { toggleFavorite, isFavorite } = useFavorites('project');

  const handleFavoriteClick = (e: React.MouseEvent, franchiseId: string) => {
    e.stopPropagation();
    toggleFavorite(franchiseId);
  };

  const franchiseCategories = [
    {
      title: 'Еда и напитки',
      count: 45,
      icon: Store,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Ретейл',
      count: 32,
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Услуги',
      count: 28,
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Образование',
      count: 15,
      icon: Award,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const featuredFranchises = [
    {
      id: 'franchise-1',
      name: 'FastFood Express',
      category: 'Еда и напитки',
      investment: '50,000 - 100,000',
      roi: '18-24 месяца',
      locations: 150,
      description: 'Популярная сеть быстрого питания с проверенной бизнес-моделью',
      rating: 4.8
    },
    {
      id: 'franchise-2',
      name: 'FitLife Gym',
      category: 'Фитнес и здоровье',
      investment: '80,000 - 150,000',
      roi: '24-36 месяцев',
      locations: 85,
      description: 'Современные фитнес-центры с комплексным подходом к здоровью',
      rating: 4.6
    },
    {
      id: 'franchise-3',
      name: 'SmartKids Education',
      category: 'Образование',
      investment: '30,000 - 60,000',
      roi: '12-18 месяцев',
      locations: 120,
      description: 'Детские образовательные центры с инновационной программой',
      rating: 4.9
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
              Каталог франшиз
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Найдите готовый бизнес для инвестиций. Более 100 проверенных франшиз 
              в различных отраслях с гарантированной поддержкой.
            </p>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <Store className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold">120+</p>
                <p className="text-sm text-muted-foreground">Франшиз</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold">от $25K</p>
                <p className="text-sm text-muted-foreground">Минимальные инвестиции</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold">12-24</p>
                <p className="text-sm text-muted-foreground">Месяцев окупаемость</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <BarChart className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold">25%+</p>
                <p className="text-sm text-muted-foreground">Средняя рентабельность</p>
              </CardContent>
            </Card>
          </section>

          {/* Categories */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Категории франшиз</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {franchiseCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{category.title}</h3>
                      <Badge variant="secondary">{category.count} франшиз</Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Featured Franchises */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Популярные франшизы</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredFranchises.map((franchise, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow relative">
                  <Button
                    size="icon"
                    variant="secondary"
                    className={cn(
                      "absolute top-4 right-4 rounded-full shadow-lg transition-all z-10",
                      isFavorite(franchise.id) 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : "bg-background/80 hover:bg-background"
                    )}
                    onClick={(e) => handleFavoriteClick(e, franchise.id)}
                  >
                    <Heart 
                      className={cn(
                        "w-5 h-5 transition-all",
                        isFavorite(franchise.id) && "fill-current"
                      )} 
                    />
                  </Button>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{franchise.name}</CardTitle>
                        <Badge variant="outline">{franchise.category}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold">{franchise.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="mt-3">
                      {franchise.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Инвестиции:</span>
                        <span className="font-semibold">${franchise.investment}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Окупаемость:</span>
                        <span className="font-semibold">{franchise.roi}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Точек:</span>
                        <span className="font-semibold">{franchise.locations}</span>
                      </div>
                      <Button asChild className="w-full mt-4 bg-gradient-primary">
                        <Link to="/management-franchises">
                          Подробнее
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              Готовы стать франчайзи?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Начните свой путь в бизнесе с готовой франшизой. Полная поддержка, 
              проверенная модель и гарантированный результат.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-primary">
                <Link to="/auth?mode=signup">
                  Стать франчайзи
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/management-franchises">
                  Смотреть все франшизы
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

export default Franchises;
