import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Target, Zap } from 'lucide-react';

const InvestmentTier = ({ 
  title,
  deadline, 
  offers,
  isBestOffer = false
}: { 
  title: string;
  deadline: string; 
  offers: { amount: string; btc: string; equity: string }[];
  isBestOffer?: boolean;
}) => (
  <Card className="relative">
    {isBestOffer && (
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-lg z-10 rotate-12">
        <div className="text-white text-center">
          <div className="text-xs font-bold leading-tight">BEST</div>
          <div className="text-xs font-bold leading-tight">OFFER</div>
        </div>
      </div>
    )}
    <CardHeader>
      <h3 className="text-xl font-bold text-left mb-2">{title}</h3>
      <Badge variant="secondary" className="w-fit">{deadline}</Badge>
    </CardHeader>
    <CardContent className="space-y-3">
      {offers.map((offer, idx) => (
        <div key={idx} className="p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-lg">{offer.amount}</span>
            <div className="text-sm text-muted-foreground">или</div>
            <span className="font-semibold">{offer.btc}</span>
          </div>
          <div className="text-center">
            <span className="text-sm text-muted-foreground">за </span>
            <span className="text-xl font-bold text-primary">{offer.equity}</span>
            <span className="text-sm text-muted-foreground"> доли</span>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

const InvestInPlatformSection = () => {
  const investmentPeriods = [
    {
      title: 'Early Bird',
      deadline: 'Доступно до 15.11.2025',
      offers: [
        { amount: '€500k', btc: '5 BTC', equity: '3%' },
        { amount: '€1.2M', btc: '12 BTC', equity: '10%' },
        { amount: '€1.8M', btc: '18 BTC', equity: '18%' }
      ],
      isBestOffer: true
    },
    {
      title: 'Christmas Gift',
      deadline: 'Доступно до 25.12.2025',
      offers: [
        { amount: '€700k', btc: '7 BTC', equity: '3%' },
        { amount: '€1.8M', btc: '18 BTC', equity: '10%' },
        { amount: '€2.5M', btc: '25 BTC', equity: '18%' }
      ]
    },
    {
      title: 'Last Chance',
      deadline: 'Доступно до 01.03.2026',
      offers: [
        { amount: '€1M', btc: '10 BTC', equity: '3%' },
        { amount: '€2.5M', btc: '25 BTC', equity: '10%' },
        { amount: '€3.5M', btc: '35 BTC', equity: '18%' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            Инвестируйте в будущее венчурного рынка
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Станьте частью революции в венчурных инвестициях. Invest-Ex — это не просто платформа, 
            это новая эра в мире стартапов и инвестиций.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <div className="text-sm font-medium">Огромный рынок</div>
                </div>
                <div className="text-2xl font-bold">$17.5B</div>
                <div className="text-xs text-muted-foreground">TAM венчурного рынка</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-primary" />
                  <div className="text-sm font-medium">Точность AI</div>
                </div>
                <div className="text-2xl font-bold">92.3%</div>
                <div className="text-xs text-muted-foreground">Точность прогнозов</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <div className="text-sm font-medium">Быстрая окупаемость</div>
                </div>
                <div className="text-2xl font-bold">24 мес</div>
                <div className="text-xs text-muted-foreground">Путь к прибыльности</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Преимущества из вкладки */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Налогово-оптимизированная холдинговая структура</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Максимальная эффективность для международных инвестиций</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Материнский холдинг в Эстонии: 0% налог на реинвестируемую прибыль</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Региональные хабы для локализации (Кипр, ОАЭ, Сингапур, США)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Экономия 50-70% налогов vs стандартных структур</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Полная готовность к международному IPO</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">340+ интегрированных инструментов в едином интерфейсе</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Все необходимое для венчурных инвестиций в одном решении</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>CRM для управления отношениями с инвесторами и стартапами</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>PMS для управления проектами - полная прозрачность для инвесторов</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Интеграция с банками, платежными системами и криптоплатежами</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Аналитика, KPI-мониторинг и Риск-менеджмент в реальном времени</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Enterprise-уровень безопасности и Data Room</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Проверенная бизнес-модель с быстрой окупаемостью</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Доказанная unit-экономика и путь к прибыльности</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>LTV/CAC = 854 (отличный показатель для B2B SaaS)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Прогнозируемый мультипликатор при выходе: 15-20х</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Gross Margin = 85% (высокая маржинальность)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Путь к прибыльности: 24 месяца с текущими темпами роста</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Инвестиционное предложение */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-2">Инвестиционное предложение</h3>
          <p className="text-muted-foreground">Общее предложение: до 18% доли</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {investmentPeriods.map((period, idx) => (
            <InvestmentTier key={idx} {...period} />
          ))}
        </div>

        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Прогнозируемая оценка при выходе
              </p>
              <p className="text-3xl font-bold text-primary">15-20x</p>
              <p className="text-sm text-muted-foreground">
                ROI через 3-5 лет
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button size="lg" className="flex-1">
            Стать инвестором
          </Button>
          <Button size="lg" variant="outline" className="flex-1" asChild>
            <a href="/Invest-Ex.pdf" download="Invest-Ex-Presentation.pdf">
              Скачать презентацию
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvestInPlatformSection;
