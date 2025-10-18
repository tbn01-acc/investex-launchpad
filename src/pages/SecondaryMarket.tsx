import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Shuffle, Lock, Target, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import aiCode from '@/assets/projects/ai-code-assistant.jpg';
import fintech from '@/assets/projects/fintech-mobile-app.jpg';
import greentech from '@/assets/projects/greentech-energy.jpg';
import iot from '@/assets/projects/iot-smart-home.jpg';
import music from '@/assets/projects/music-streaming.jpg';

const SecondaryMarket = () => {
  const { profile } = useAuth();
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [displayedItems, setDisplayedItems] = useState(15);

  const localImages = [aiCode, fintech, greentech, iot, music];

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
              Вторичный рынок инвестиций
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-6">
              Покупайте доли в уже работающих компаниях от ранних инвесторов. Меньше рисков, больше ликвидности, прозрачная оценка.
            </p>

            {!isProfessional && (
              <div className="bg-destructive/10 border border-destructive/30 p-6 rounded-lg mb-8">
                <div className="flex items-start gap-4">
                  <Lock className="w-6 h-6 text-destructive mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Требуется повышенная верификация</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Участие во вторичном рынке инвестиций доступно только профессиональным и квалифицированным инвесторам.
                      Для доступа к сделкам необходимо пройти расширенную верификацию.
                    </p>
                    <Button size="sm" variant="destructive">
                      <Shield className="w-4 h-4 mr-2" />
                      Стать профессиональным инвестором
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </section>

          <div className="mb-4 flex justify-between items-center">
            <p className="text-muted-foreground">
              Показано <span className="font-semibold">{Math.min(displayedItems, secondaryMarketDeals.length)}</span> из <span className="font-semibold">{secondaryMarketDeals.length}</span> предложений
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
            {secondaryMarketDeals.slice(0, displayedItems).map((deal, idx) => (
              <Card key={deal.id} className={`hover:shadow-lg transition-shadow flex flex-col ${!isProfessional ? 'opacity-75' : ''}`}>
                <div className="relative h-48">
                  <img 
                    src={localImages[idx % localImages.length]} 
                    alt={deal.company}
                    className="w-full h-full object-cover rounded-t-lg"
                    loading="lazy"
                  />
                  <Badge variant="outline" className="absolute top-4 left-4 bg-background/80">
                    {deal.sector}
                  </Badge>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={deal.trending === 'up' ? 'bg-secondary' : 'bg-destructive'}>
                        {deal.trending === 'up' ? (
                          <><TrendingUp className="w-3 h-3 mr-1" /> Растет</>
                        ) : (
                          <><TrendingDown className="w-3 h-3 mr-1" /> Снижение</>
                        )}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">Ликв.: {deal.liquidity}</Badge>
                    </div>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg line-clamp-2 flex-1">{deal.company}</CardTitle>
                      <div className="text-right ml-2">
                        <div className="text-xs text-muted-foreground">ROI</div>
                        <div className={`text-lg font-bold ${deal.roi.includes('+') ? 'text-secondary' : 'text-destructive'}`}>
                          {deal.roi}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-xs mt-2 line-clamp-2">
                      Продавец: {deal.originalInvestor}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-0 mt-auto">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Доля</div>
                        <div className="text-sm font-bold">{deal.shareSize}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Цена</div>
                        <div className="text-sm font-bold text-primary">{formatAmount(deal.askingPrice)}</div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-3 rounded-lg mb-3">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="text-muted-foreground mb-0.5">Мин. инв.</div>
                          <div className="font-semibold">{formatAmount(deal.minInvestment)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-0.5">Блокировка</div>
                          <div className="font-semibold">{deal.lockupPeriod}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {isProfessional ? (
                        <Button size="sm" className="flex-1">
                          <Target className="w-3 h-3 mr-1" />
                          Купить долю
                        </Button>
                      ) : (
                        <Button size="sm" className="flex-1" variant="outline" disabled>
                          <Lock className="w-3 h-3 mr-1" />
                          Требуется статус
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {displayedItems < secondaryMarketDeals.length && (
            <div className="mt-8 text-center">
              <Button onClick={() => setDisplayedItems(prev => Math.min(prev + itemsPerPage, secondaryMarketDeals.length))} size="lg">
                Показать еще
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SecondaryMarket;
