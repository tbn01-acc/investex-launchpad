import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Shuffle, Lock, Target, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';

const SecondaryMarket = () => {
  const { profile } = useAuth();
  const { t } = useLanguage();

  const isProfessional = profile?.verification_level === 'professional' || 
                        profile?.verification_level === 'qualified';

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
    },
    {
      id: 4,
      company: 'HealthTech Innovations',
      sector: 'HealthTech',
      originalInvestor: 'Strategic Partner',
      shareSize: '4.1%',
      askingPrice: 22000000,
      originalValuation: 450000000,
      currentValuation: 550000000,
      roi: '+22%',
      lockupPeriod: '3 месяца',
      reason: 'Диверсификация портфеля',
      trending: 'up',
      liquidity: 'Высокая',
      minInvestment: 1500000
    },
    {
      id: 5,
      company: 'Quantum Computing Corp',
      sector: 'Deep Tech',
      originalInvestor: 'Venture Fund',
      shareSize: '2.0%',
      askingPrice: 35000000,
      originalValuation: 1200000000,
      currentValuation: 1750000000,
      roi: '+46%',
      lockupPeriod: 'Нет',
      reason: 'Фиксация прибыли',
      trending: 'up',
      liquidity: 'Средняя',
      minInvestment: 2000000
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
              <Shuffle className="w-10 h-10 mr-3 text-primary" />
              {t('investments.secondaryMarket')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-6">
              {t('investments.secondaryMarket')} - покупайте доли в уже работающих компаниях от ранних инвесторов
            </p>

            {!isProfessional && (
              <div className="bg-destructive/10 border border-destructive/30 p-6 rounded-lg mb-8">
                <div className="flex items-start gap-4">
                  <Lock className="w-6 h-6 text-destructive mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{t('investments.accessRestricted')}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t('investments.accessRestricted')}
                    </p>
                    <Button size="sm" variant="destructive">
                      <Shield className="w-4 h-4 mr-2" />
                      {t('investments.becomeInvestor')}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </section>

          <div className="grid gap-6">
            {secondaryMarketDeals.map((deal) => (
              <Card key={deal.id} className={`hover:shadow-lg transition-shadow ${!isProfessional ? 'opacity-75' : ''}`}>
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
                    {isProfessional ? (
                      <>
                        <Button className="flex-1">
                          <Target className="w-4 h-4 mr-2" />
                          {t('investments.buyShare')}
                        </Button>
                        <Button variant="outline">{t('investments.moreDetails')}</Button>
                      </>
                    ) : (
                      <Button className="flex-1" variant="outline" disabled>
                        <Lock className="w-4 h-4 mr-2" />
                        {t('investments.accessRestricted')}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SecondaryMarket;
