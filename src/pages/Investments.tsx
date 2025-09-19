import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Search, TrendingUp, Clock, Users, Target, Star } from 'lucide-react';

const Investments = () => {
  const investmentOpportunities = [
    {
      id: 1,
      company: 'EcoTech Solutions',
      sector: 'GreenTech',
      stage: 'Series A',
      description: 'Платформа для мониторинга и снижения углеродного следа предприятий с использованием IoT и AI.',
      targetAmount: 50000000,
      raisedAmount: 32000000,
      investorsCount: 24,
      minInvestment: 500000,
      valuation: 200000000,
      highlights: ['AI & IoT', 'ESG фокус', 'B2B SaaS'],
      metrics: {
        revenue: '15M₽',
        growth: '+180%',
        customers: '150+'
      },
      timeLeft: '45 дней',
      featured: true
    },
    {
      id: 2,
      company: 'HealthAI Diagnostic',
      sector: 'HealthTech',
      stage: 'Seed',
      description: 'ИИ-платформа для ранней диагностики онкологических заболеваний по медицинским изображениям.',
      targetAmount: 30000000,
      raisedAmount: 18000000,
      investorsCount: 18,
      minInvestment: 250000,
      valuation: 120000000,
      highlights: ['FDA в процессе', 'Медицинский AI', 'B2B'],
      metrics: {
        revenue: '8M₽',
        growth: '+220%',
        customers: '45+'
      },
      timeLeft: '32 дня',
      featured: false
    },
    {
      id: 3,
      company: 'FinFlow Pro',
      sector: 'FinTech',
      stage: 'Pre-Series A',
      description: 'Автоматизированная платформа управления денежными потоками для малого и среднего бизнеса.',
      targetAmount: 25000000,
      raisedAmount: 21000000,
      investorsCount: 31,
      minInvestment: 100000,
      valuation: 100000000,
      highlights: ['Cashflow AI', 'SMB фокус', 'SaaS'],
      metrics: {
        revenue: '12M₽',
        growth: '+156%',
        customers: '300+'
      },
      timeLeft: '18 дней',
      featured: false
    }
  ];

  const formatAmount = (amount: number) => {
    return (amount / 1000000).toFixed(0) + 'M₽';
  };

  const getProgress = (raised: number, target: number) => {
    return Math.round((raised / target) * 100);
  };

  const getSectorColor = (sector: string) => {
    const colors: { [key: string]: string } = {
      'GreenTech': 'bg-secondary text-secondary-foreground',
      'HealthTech': 'bg-primary text-primary-foreground',
      'FinTech': 'bg-accent text-accent-foreground',
      'EdTech': 'bg-muted text-muted-foreground'
    };
    return colors[sector] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Инвестиционные возможности</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Инвестируйте в перспективные стартапы и растущие компании с проверенными командами
              </p>
            </div>

            {/* Search and Filters */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Поиск компаний..." className="pl-10" />
                  </div>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Сектор" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fintech">FinTech</SelectItem>
                      <SelectItem value="healthtech">HealthTech</SelectItem>
                      <SelectItem value="greentech">GreenTech</SelectItem>
                      <SelectItem value="edtech">EdTech</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Стадия" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seed">Seed</SelectItem>
                      <SelectItem value="series-a">Series A</SelectItem>
                      <SelectItem value="series-b">Series B</SelectItem>
                      <SelectItem value="pre-ipo">Pre-IPO</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Мин. инвестиция" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-500">До 500K ₽</SelectItem>
                      <SelectItem value="500-1000">500K - 1M ₽</SelectItem>
                      <SelectItem value="1000+">Свыше 1M ₽</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Investment Opportunities */}
          <section>
            <div className="grid gap-6">
              {investmentOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className={`hover:shadow-lg transition-shadow ${opportunity.featured ? 'ring-2 ring-primary/20' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {opportunity.featured && (
                            <Badge className="bg-accent text-accent-foreground">
                              <Star className="w-3 h-3 mr-1" />
                              Рекомендуем
                            </Badge>
                          )}
                          <Badge className={getSectorColor(opportunity.sector)}>
                            {opportunity.sector}
                          </Badge>
                          <Badge variant="outline">{opportunity.stage}</Badge>
                        </div>
                        <CardTitle className="text-2xl mb-2">{opportunity.company}</CardTitle>
                        <CardDescription className="text-base mb-4">
                          {opportunity.description}
                        </CardDescription>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {opportunity.highlights.map((highlight, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-right ml-6">
                        <div className="text-sm text-muted-foreground mb-1">Оценка</div>
                        <div className="text-xl font-bold">
                          {formatAmount(opportunity.valuation)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Прогресс сбора</span>
                        <span className="text-sm text-muted-foreground">
                          {formatAmount(opportunity.raisedAmount)} из {formatAmount(opportunity.targetAmount)}
                        </span>
                      </div>
                      <Progress 
                        value={getProgress(opportunity.raisedAmount, opportunity.targetAmount)} 
                        className="h-2"
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-muted-foreground">
                          {getProgress(opportunity.raisedAmount, opportunity.targetAmount)}% собрано
                        </span>
                        <span className="text-sm text-muted-foreground">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {opportunity.timeLeft}
                        </span>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Выручка</div>
                        <div className="font-semibold">{opportunity.metrics.revenue}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Рост</div>
                        <div className="font-semibold text-secondary">{opportunity.metrics.growth}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Клиенты</div>
                        <div className="font-semibold">{opportunity.metrics.customers}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Инвесторы</div>
                        <div className="font-semibold">{opportunity.investorsCount}</div>
                      </div>
                    </div>

                    {/* Investment Info */}
                    <div className="flex justify-between items-center mb-4 p-4 bg-muted/50 rounded-lg">
                      <div>
                        <div className="text-sm text-muted-foreground">Минимальная инвестиция</div>
                        <div className="font-bold text-primary">
                          {formatAmount(opportunity.minInvestment)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Участники</div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span className="font-semibold">{opportunity.investorsCount}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <Target className="w-4 h-4 mr-2" />
                        Инвестировать
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
                Показать еще возможности
              </Button>
            </div>
          </section>

          {/* Statistics */}
          <section className="py-16 mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">Статистика платформы</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">250M₽</div>
                  <div className="text-muted-foreground">Инвестировано</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-secondary mb-2">180+</div>
                  <div className="text-muted-foreground">Успешных раундов</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-accent mb-2">1,200+</div>
                  <div className="text-muted-foreground">Активных инвесторов</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-muted-foreground">Рейтинг успеха</div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Готовы начать инвестировать?</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Присоединяйтесь к сообществу успешных инвесторов и получите доступ к эксклюзивным предложениям
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg">
                    Стать инвестором
                  </Button>
                  <Button size="lg" variant="outline">
                    Узнать больше
                  </Button>
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

export default Investments;