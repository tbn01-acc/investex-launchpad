import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building2, TrendingUp, Users, DollarSign, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';

const ManagementFranchises = () => {
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

          <div className="grid gap-6">
            {franchises.map((franchise) => (
              <Card key={franchise.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{franchise.category}</Badge>
                        <Badge className="bg-secondary text-secondary-foreground">
                          <Award className="w-3 h-3 mr-1" />
                          Управляемая франшиза
                        </Badge>
                        <Badge variant={franchise.risks === 'Низкий' ? 'secondary' : 'default'}>
                          Риск: {franchise.risks}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl mb-2">{franchise.name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {franchise.locations} локаций
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            На рынке с {franchise.yearEstablished}
                          </span>
                        </div>
                      </CardDescription>
                    </div>
                    <div className="text-right ml-6">
                      <div className="text-sm text-muted-foreground">Доходность</div>
                      <div className="text-2xl font-bold text-secondary">{franchise.roi}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Размер инвестиции</div>
                      <div className="text-xl font-bold text-primary">{formatAmount(franchise.investmentSize)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Месячный доход</div>
                      <div className="text-xl font-bold">{formatAmount(franchise.monthlyIncome)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Окупаемость</div>
                      <div className="text-xl font-bold">{franchise.paybackPeriod}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Загрузка мощностей</span>
                      <span className="text-sm font-semibold">{franchise.occupancy}%</span>
                    </div>
                    <Progress value={franchise.occupancy} className="h-2" />
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-secondary" />
                      Преимущества
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {franchise.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Инвестировать
                    </Button>
                    <Button variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
