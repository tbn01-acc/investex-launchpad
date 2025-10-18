import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building2, TrendingUp, Users, DollarSign, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ManagementFranchises = () => {
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [displayedItems, setDisplayedItems] = useState(15);
  
  const franchises = [
    {
      id: 1,
      name: 'Premium Coffee Chain',
      category: 'Общепит',
      monthlyIncome: 450000,
      roi: '18% годовых',
      investmentSize: 25000000,
      locations: 12,
      yearEstablished: 2019,
      occupancy: 95,
      managed: true,
      benefits: [
        'Полное управление бизнесом',
        'Готовая инфраструктура',
        'Обученный персонал',
        'Постоянный поток клиентов'
      ],
      risks: 'Низкий',
      paybackPeriod: '4-5 лет'
    },
    {
      id: 2,
      name: 'Family Health Clinic',
      category: 'Медицина',
      monthlyIncome: 850000,
      roi: '22% годовых',
      investmentSize: 45000000,
      locations: 5,
      yearEstablished: 2017,
      occupancy: 88,
      managed: true,
      benefits: [
        'Стабильный спрос на услуги',
        'Квалифицированный мед. персонал',
        'Современное оборудование',
        'Договоры с ДМС компаниями'
      ],
      risks: 'Средний',
      paybackPeriod: '5-6 лет'
    },
    {
      id: 3,
      name: 'Kids Education Center',
      category: 'Образование',
      monthlyIncome: 620000,
      roi: '20% годовых',
      investmentSize: 32000000,
      locations: 8,
      yearEstablished: 2018,
      occupancy: 92,
      managed: true,
      benefits: [
        'Высокий спрос на услуги',
        'Сезонная стабильность',
        'Лояльная клиентская база',
        'Профессиональные педагоги'
      ],
      risks: 'Низкий',
      paybackPeriod: '4-5 лет'
    },
    {
      id: 4,
      name: 'Fitness & Wellness Club',
      category: 'Фитнес',
      monthlyIncome: 1200000,
      roi: '25% годовых',
      investmentSize: 55000000,
      locations: 3,
      yearEstablished: 2020,
      occupancy: 85,
      managed: true,
      benefits: [
        'Премиум сегмент',
        'Долгосрочные абонементы',
        'Персональные тренеры',
        'Spa и массажные кабинеты'
      ],
      risks: 'Средний',
      paybackPeriod: '5-6 лет'
    },
    {
      id: 5,
      name: 'Smart Laundry Service',
      category: 'Бытовые услуги',
      monthlyIncome: 380000,
      roi: '16% годовых',
      investmentSize: 18000000,
      locations: 15,
      yearEstablished: 2021,
      occupancy: 78,
      managed: true,
      benefits: [
        'Автоматизированный процесс',
        'Минимум персонала',
        'Круглосуточная работа',
        'Мобильное приложение'
      ],
      risks: 'Низкий',
      paybackPeriod: '3-4 года'
    }
  ];

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'M₽';
    }
    return amount.toLocaleString() + '₽';
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <section className="mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center">
              <Building2 className="w-10 h-10 mr-3 text-primary" />
              Управленческие франшизы
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              Готовый бизнес с пассивным доходом. Полное управление, обученный персонал, проверенная бизнес-модель.
            </p>

            <div className="grid md:grid-cols-4 gap-4 mb-12">
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-1">Средняя доходность</div>
                  <div className="text-2xl font-bold text-secondary">20% годовых</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-1">Доступных франшиз</div>
                  <div className="text-2xl font-bold">{franchises.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-1">Окупаемость</div>
                  <div className="text-2xl font-bold">4-6 лет</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-1">Всего локаций</div>
                  <div className="text-2xl font-bold">
                    {franchises.reduce((sum, f) => sum + f.locations, 0)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="mb-4 flex justify-between items-center">
            <p className="text-muted-foreground">
              Показано <span className="font-semibold">{Math.min(displayedItems, franchises.length)}</span> из <span className="font-semibold">{franchises.length}</span> франшиз
            </p>
            <Select value={itemsPerPage.toString()} onValueChange={(value) => {
              setItemsPerPage(parseInt(value));
              setDisplayedItems(parseInt(value));
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Показывать по" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9">Показывать по 9</SelectItem>
                <SelectItem value="15">Показывать по 15</SelectItem>
                <SelectItem value="30">Показывать по 30</SelectItem>
                <SelectItem value="60">Показывать по 60</SelectItem>
                <SelectItem value="90">Показывать по 90</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {franchises.slice(0, displayedItems).map((franchise) => (
              <Card key={franchise.id} className="hover:shadow-lg transition-shadow flex flex-col">
                <div className="relative h-48">
                  <img 
                    src="/placeholder.svg" 
                    alt={franchise.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <Badge variant="outline" className="absolute top-4 left-4 bg-background/80">
                    {franchise.category}
                  </Badge>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-secondary text-secondary-foreground text-xs">
                        <Award className="w-3 h-3 mr-1" />
                        Управляемая
                      </Badge>
                      <Badge variant={franchise.risks === 'Низкий' ? 'secondary' : 'default'} className="text-xs">
                        Риск: {franchise.risks}
                      </Badge>
                    </div>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg line-clamp-2 flex-1">{franchise.name}</CardTitle>
                      <div className="text-right ml-2">
                        <div className="text-xs text-muted-foreground">ROI</div>
                        <div className="text-lg font-bold text-secondary">{franchise.roi}</div>
                      </div>
                    </div>
                    <CardDescription className="mt-2">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {franchise.locations}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          С {franchise.yearEstablished}
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-0 mt-auto">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Инвестиция</div>
                        <div className="text-sm font-bold text-primary">{formatAmount(franchise.investmentSize)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Мес. доход</div>
                        <div className="text-sm font-bold">{formatAmount(franchise.monthlyIncome)}</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Загрузка</span>
                        <span className="text-xs font-semibold">{franchise.occupancy}%</span>
                      </div>
                      <Progress value={franchise.occupancy} className="h-1.5" />
                    </div>

                    <div className="bg-muted/50 p-3 rounded-lg mb-3">
                      <h4 className="text-xs font-semibold mb-2 flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1 text-secondary" />
                        Преимущества
                      </h4>
                      <ul className="space-y-1">
                        {franchise.benefits.slice(0, 2).map((benefit, idx) => (
                          <li key={idx} className="text-xs flex items-start gap-1">
                            <CheckCircle2 className="w-3 h-3 text-secondary mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <DollarSign className="w-3 h-3 mr-1" />
                        Инвестировать
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {displayedItems < franchises.length && (
            <div className="mt-8 text-center">
              <Button onClick={() => setDisplayedItems(prev => Math.min(prev + itemsPerPage, franchises.length))} size="lg">
                Показать еще
              </Button>
            </div>
          )}

          <section className="mt-16">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center">
                  <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Почему управленческая франшиза?</h3>
                  <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-8">
                    <div>
                      <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Пассивный доход</h4>
                      <p className="text-sm text-muted-foreground">
                        Получайте стабильную прибыль без активного участия в управлении
                      </p>
                    </div>
                    <div>
                      <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Проверенная модель</h4>
                      <p className="text-sm text-muted-foreground">
                        Инвестируйте в работающие бизнесы с доказанной эффективностью
                      </p>
                    </div>
                    <div>
                      <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Профессиональная команда</h4>
                      <p className="text-sm text-muted-foreground">
                        Опытные менеджеры и обученный персонал управляют бизнесом за вас
                      </p>
                    </div>
                  </div>
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

export default ManagementFranchises;
