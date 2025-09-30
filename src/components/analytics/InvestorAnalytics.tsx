import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Target, Award } from 'lucide-react';

export const InvestorAnalytics = () => {
  const { formatCurrency } = useLanguage();

  const metrics = {
    totalInvested: 5200000,
    portfolioValue: 6850000,
    roi: 31.7,
    activeInvestments: 8,
    exitCount: 3,
    averageHoldingPeriod: 24,
    successRate: 62.5,
    lastYearROI: 28.3,
    diversificationScore: 85,
    riskScore: 'Средний'
  };

  const portfolioBreakdown = [
    { category: 'FinTech', percentage: 30, value: 2055000 },
    { category: 'AI/ML', percentage: 25, value: 1712500 },
    { category: 'HealthTech', percentage: 20, value: 1370000 },
    { category: 'GreenTech', percentage: 15, value: 1027500 },
    { category: 'EdTech', percentage: 10, value: 685000 }
  ];

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const roiGrowth = calculateGrowth(metrics.roi, metrics.lastYearROI);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Аналитика инвестора</h2>
        <p className="text-muted-foreground">
          Показатели портфеля и эффективности инвестиций
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Стоимость портфеля</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{formatCurrency(metrics.portfolioValue)}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">
                    +{formatCurrency(metrics.portfolioValue - metrics.totalInvested)}
                  </span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{metrics.roi}%</div>
                <div className="flex items-center gap-1 mt-1">
                  {parseFloat(roiGrowth) > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${parseFloat(roiGrowth) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {roiGrowth}%
                  </span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Активных инвестиций</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{metrics.activeInvestments}</div>
                <div className="mt-1">
                  <Badge variant="outline">Успешность: {metrics.successRate}%</Badge>
                </div>
              </div>
              <Target className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Диверсификация портфеля</CardTitle>
          <CardDescription>Распределение инвестиций по секторам</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioBreakdown.map((item) => (
              <div key={item.category}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(item.value)} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Оценка диверсификации</span>
              <Badge className="bg-green-500">{metrics.diversificationScore}/100</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Отличная диверсификация снижает риски портфеля
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Показатели эффективности</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Всего инвестировано</span>
              <span className="font-semibold">{formatCurrency(metrics.totalInvested)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Количество выходов</span>
              <span className="font-semibold">{metrics.exitCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Ср. период удержания</span>
              <span className="font-semibold">{metrics.averageHoldingPeriod} мес</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Уровень риска</span>
              <Badge variant="outline">{metrics.riskScore}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Рекомендации</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
              <p className="text-sm">Ваш ROI выше среднего по рынку на {(metrics.roi - 20).toFixed(1)}%</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
              <p className="text-sm">Отличная диверсификация минимизирует риски</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
              <p className="text-sm">Рассмотрите увеличение доли в HealthTech - растущий сектор</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
