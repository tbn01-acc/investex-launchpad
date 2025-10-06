import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, 
  Star, Lock, Trophy, Shuffle, Clock, Users, 
  DollarSign, Target, BarChart3, Shield
} from 'lucide-react';

const Investments = () => {
  const [selectedTab, setSelectedTab] = useState('secondary');

  // Secondary Market Opportunities
  const secondaryMarketDeals = [
    {
      id: 1,
      company: 'TechFlow AI',
      sector: 'AI/ML',
      originalInvestor: 'Venture Capital Fund',
      shareSize: '2.5%',
      askingPrice: 15000000,
      originalValuation: 500000000,
      currentValuation: 600000000,
      roi: '+20%',
      lockupPeriod: 'Нет',
      reason: 'Ребалансировка портфеля',
      trending: 'up',
      liquidity: 'Высокая',
      minInvestment: 1000000
    },
    {
      id: 2,
      company: 'GreenEnergy Solutions',
      sector: 'CleanTech',
      originalInvestor: 'Angel Investor',
      shareSize: '1.8%',
      askingPrice: 8000000,
      originalValuation: 300000000,
      currentValuation: 450000000,
      roi: '+50%',
      lockupPeriod: '6 месяцев',
      reason: 'Выход из позиции',
      trending: 'up',
      liquidity: 'Средняя',
      minInvestment: 500000
    },
    {
      id: 3,
      company: 'FinTech Hub',
      sector: 'FinTech',
      originalInvestor: 'Private Equity',
      shareSize: '3.2%',
      askingPrice: 12000000,
      originalValuation: 400000000,
      currentValuation: 380000000,
      roi: '-5%',
      lockupPeriod: 'Нет',
      reason: 'Срочная продажа',
      trending: 'down',
      liquidity: 'Высокая',
      minInvestment: 800000
    }
  ];

  // Sandbox Projects
  const sandboxProjects = [
    {
      id: 1,
      company: 'AI Healthcare Diagnostic',
      description: 'Платформа ранней диагностики заболеваний с использованием AI',
      stage: 'Beta Testing',
      seeking: 25000000,
      minInvestment: 250000,
      earlyBirdBonus: '15% bonus shares',
      restrictedAccess: true,
      investorsCount: 8,
      spotsLeft: 12,
      verificationRequired: 'Квалифицированный инвестор',
      potentialROI: '10x-50x'
    },
    {
      id: 2,
      company: 'BlockChain Logistics',
      description: 'Децентрализованная платформа для управления цепочками поставок',
      stage: 'MVP Ready',
      seeking: 18000000,
      minInvestment: 500000,
      earlyBirdBonus: '20% discount',
      restrictedAccess: true,
      investorsCount: 5,
      spotsLeft: 10,
      verificationRequired: 'Аккредитованный инвестор',
      potentialROI: '15x-100x'
    }
  ];

  // Gold Fund Projects
  const goldFundProjects = [
    {
      id: 1,
      company: 'SuperApp Platform',
      description: 'Экосистема суперприложений для B2B и B2C',
      provenROI: '+380%',
      yearlyGrowth: '+145%',
      fundingRounds: 4,
      totalRaised: 250000000,
      currentValuation: 1200000000,
      nextRound: 'Series C',
      seeking: 100000000,
      minInvestment: 5000000,
      leadInvestors: ['Top Venture Fund', 'Strategic Partner'],
      achievements: ['Top 10 StartUp 2024', 'Profitable', '500K+ Users']
    },
    {
      id: 2,
      company: 'BioTech Innovation',
      description: 'Разработка персонализированной медицины на основе генетики',
      provenROI: '+520%',
      yearlyGrowth: '+200%',
      fundingRounds: 3,
      totalRaised: 180000000,
      currentValuation: 950000000,
      nextRound: 'Pre-IPO',
      seeking: 150000000,
      minInvestment: 10000000,
      leadInvestors: ['Healthcare Fund', 'Pharma Corp'],
      achievements: ['FDA Approval', 'Patent Portfolio', 'Clinical Trials']
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
          {/* Header */}
          <section className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Инвестиционные возможности</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Эксклюзивный доступ к вторичному рынку, песочнице ранних стартапов и золотому фонду проверенных проектов
            </p>
          </section>

          {/* Statistics Dashboard */}
          <section className="grid md:grid-cols-4 gap-4 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Вторичный рынок</div>
                  <Shuffle className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold">3.2B₽</div>
                <div className="text-xs text-secondary flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +18% за месяц
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Песочница</div>
                  <Lock className="w-4 h-4 text-accent" />
                </div>
                <div className="text-2xl font-bold">45 проектов</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Только для квалифицированных
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Золотой фонд</div>
                  <Trophy className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold">Средний ROI</div>
                <div className="text-xs text-secondary flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +385%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Активных сделок</div>
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold">128</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Доступно сейчас
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Main Content Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="secondary">
                <Shuffle className="w-4 h-4 mr-2" />
                Вторичный рынок
              </TabsTrigger>
              <TabsTrigger value="sandbox">
                <Lock className="w-4 h-4 mr-2" />
                Песочница
              </TabsTrigger>
              <TabsTrigger value="gold">
                <Trophy className="w-4 h-4 mr-2" />
                Золотой фонд
              </TabsTrigger>
            </TabsList>

            {/* Secondary Market Tab */}
            <TabsContent value="secondary" className="space-y-6">
              <div className="bg-muted/50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Shuffle className="w-5 h-5 mr-2 text-primary" />
                  Вторичный рынок инвестиций
                </h3>
                <p className="text-muted-foreground">
                  Покупайте доли в уже работающих компаниях от ранних инвесторов. Меньше рисков, больше ликвидности, прозрачная оценка.
                </p>
              </div>

              {secondaryMarketDeals.map((deal) => (
                <Card key={deal.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{deal.sector}</Badge>
                          <Badge className={deal.trending === 'up' ? 'bg-secondary' : 'bg-destructive'}>
                            {deal.trending === 'up' ? (
                              <><TrendingUp className="w-3 h-3 mr-1" /> Растет</>
                            ) : (
                              <><TrendingDown className="w-3 h-3 mr-1" /> Снижение</>
                            )}
                          </Badge>
                          <Badge variant="secondary">Ликвидность: {deal.liquidity}</Badge>
                        </div>
                        <CardTitle className="text-2xl">{deal.company}</CardTitle>
                        <CardDescription className="mt-2">
                          Продавец: {deal.originalInvestor} • Причина: {deal.reason}
                        </CardDescription>
                      </div>
                      <div className="text-right ml-6">
                        <div className="text-sm text-muted-foreground">ROI</div>
                        <div className={`text-2xl font-bold ${deal.roi.includes('+') ? 'text-secondary' : 'text-destructive'}`}>
                          {deal.roi}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Размер доли</div>
                        <div className="text-xl font-bold">{deal.shareSize}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Запрашиваемая цена</div>
                        <div className="text-xl font-bold text-primary">{formatAmount(deal.askingPrice)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Текущая оценка</div>
                        <div className="text-xl font-bold">{formatAmount(deal.currentValuation)}</div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg mb-4 grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Мин. инвестиция</div>
                        <div className="font-semibold">{formatAmount(deal.minInvestment)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Период блокировки</div>
                        <div className="font-semibold">{deal.lockupPeriod}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <Target className="w-4 h-4 mr-2" />
                        Купить долю
                      </Button>
                      <Button variant="outline">
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Sandbox Tab */}
            <TabsContent value="sandbox" className="space-y-6">
              <div className="bg-accent/10 border border-accent p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-accent" />
                  Песочница ранних стартапов
                </h3>
                <p className="text-muted-foreground mb-3">
                  Эксклюзивный доступ к перспективным стартапам до их публичного размещения. Только для квалифицированных и аккредитованных инвесторов.
                </p>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-sm">Требуется верификация статуса инвестора</span>
                </div>
              </div>

              {sandboxProjects.map((project) => (
                <Card key={project.id} className="border-accent/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-accent text-accent-foreground">
                            <Lock className="w-3 h-3 mr-1" />
                            Ограниченный доступ
                          </Badge>
                          <Badge variant="secondary">{project.stage}</Badge>
                        </div>
                        <CardTitle className="text-2xl">{project.company}</CardTitle>
                        <CardDescription className="mt-2">
                          {project.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Цель привлечения</div>
                        <div className="text-xl font-bold text-primary">{formatAmount(project.seeking)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Мин. инвестиция</div>
                        <div className="text-xl font-bold">{formatAmount(project.minInvestment)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Потенциальный ROI</div>
                        <div className="text-xl font-bold text-secondary">{project.potentialROI}</div>
                      </div>
                    </div>

                    <div className="bg-secondary/10 p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">🎁 {project.earlyBirdBonus}</span>
                        <Badge variant="outline">
                          <Users className="w-3 h-3 mr-1" />
                          {project.investorsCount} инвесторов
                        </Badge>
                      </div>
                      <Progress value={(project.investorsCount / (project.investorsCount + project.spotsLeft)) * 100} className="h-2 mb-2" />
                      <div className="text-sm text-muted-foreground">
                        Осталось мест: {project.spotsLeft}
                      </div>
                    </div>

                    <div className="bg-accent/10 p-3 rounded-lg mb-4 text-sm">
                      <Shield className="w-4 h-4 inline mr-2 text-accent" />
                      Требование: {project.verificationRequired}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <Lock className="w-4 h-4 mr-2" />
                        Запросить доступ
                      </Button>
                      <Button variant="outline">
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Gold Fund Tab */}
            <TabsContent value="gold" className="space-y-6">
              <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  Золотой фонд лучших проектов
                </h3>
                <p className="text-muted-foreground">
                  Проекты с подтвержденным ROI и впечатляющими показателями роста. Минимальный риск, максимальная надежность, проверенные команды.
                </p>
              </div>

              {goldFundProjects.map((project) => (
                <Card key={project.id} className="border-yellow-500/30 shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-yellow-500 text-yellow-950">
                            <Trophy className="w-3 h-3 mr-1" />
                            Золотой фонд
                          </Badge>
                          <Badge variant="secondary">{project.nextRound}</Badge>
                          {project.achievements.map((achievement, idx) => (
                            <Badge key={idx} variant="outline">
                              <Star className="w-3 h-3 mr-1" />
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className="text-2xl">{project.company}</CardTitle>
                        <CardDescription className="mt-2">
                          {project.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-6 mb-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Подтвержденный ROI</div>
                        <div className="text-xl font-bold text-secondary flex items-center">
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                          {project.provenROI}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Годовой рост</div>
                        <div className="text-xl font-bold text-secondary">{project.yearlyGrowth}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Текущая оценка</div>
                        <div className="text-xl font-bold">{formatAmount(project.currentValuation)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Всего привлечено</div>
                        <div className="text-xl font-bold">{formatAmount(project.totalRaised)}</div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-2">Лид-инвесторы</div>
                          <div className="flex flex-wrap gap-2">
                            {project.leadInvestors.map((investor, idx) => (
                              <Badge key={idx} variant="secondary">{investor}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Раундов финансирования</div>
                          <div className="font-semibold">{project.fundingRounds} успешных раундов</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/10 p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Текущий раунд</div>
                          <div className="text-xl font-bold text-primary">{formatAmount(project.seeking)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground mb-1">Мин. инвестиция</div>
                          <div className="text-xl font-bold">{formatAmount(project.minInvestment)}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Инвестировать
                      </Button>
                      <Button variant="outline">
                        Полный отчет
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* Additional Tools Section */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Инструменты для инвесторов</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <BarChart3 className="w-10 h-10 text-primary mb-3" />
                  <CardTitle>Аналитика портфеля</CardTitle>
                  <CardDescription>
                    Отслеживайте производительность ваших инвестиций в реальном времени с детальной аналитикой
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Перейти к аналитике</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Target className="w-10 h-10 text-secondary mb-3" />
                  <CardTitle>Due Diligence</CardTitle>
                  <CardDescription>
                    Комплексная проверка проектов: финансовая отчетность, команда, рынок, риски
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Запросить проверку</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="w-10 h-10 text-accent mb-3" />
                  <CardTitle>Синдикаты инвесторов</CardTitle>
                  <CardDescription>
                    Объединяйтесь с другими инвесторами для совместных сделок и снижения рисков
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Найти синдикат</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Станьте частью элитного инвестиционного сообщества</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Получите доступ к эксклюзивным сделкам, вторичному рынку и золотому фонду проверенных проектов
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg">
                    Начать инвестировать
                  </Button>
                  <Button size="lg" variant="outline">
                    Узнать о верификации
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
