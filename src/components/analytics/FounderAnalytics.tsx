import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Users, DollarSign, Target, Zap, Award } from 'lucide-react';

export const FounderAnalytics = () => {
  const { formatCurrency } = useLanguage();

  const metrics = {
    mrr: 450000,
    growth: 28,
    burnRate: 320000,
    runway: 18,
    userGrowth: 45,
    activeUsers: 2840,
    churnRate: 3.2,
    ltv: 85000,
    cac: 12000,
    teamSize: 15,
    lastMonthMRR: 351000,
    fundingRaised: 15000000
  };

  const milestones = [
    { title: 'MVP Launch', status: 'completed', date: 'Q4 2023' },
    { title: 'First 1000 Users', status: 'completed', date: 'Q1 2024' },
    { title: 'Series A', status: 'in-progress', date: 'Q2 2024' },
    { title: 'Break Even', status: 'planned', date: 'Q3 2024' }
  ];

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const mrrGrowth = calculateGrowth(metrics.mrr, metrics.lastMonthMRR);
  const ltvToCac = (metrics.ltv / metrics.cac).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Аналитика фаундера</h2>
        <p className="text-muted-foreground">
          Ключевые метрики роста и здоровья стартапа
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">MRR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{formatCurrency(metrics.mrr)}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+{mrrGrowth}%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Активных пользователей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{metrics.activeUsers.toLocaleString()}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+{metrics.userGrowth}%</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Runway</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{metrics.runway} мес</div>
                <div className="mt-1">
                  <Badge variant="outline">Burn: {formatCurrency(metrics.burnRate)}/мес</Badge>
                </div>
              </div>
              <Zap className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unit Economics */}
      <Card>
        <CardHeader>
          <CardTitle>Юнит-экономика</CardTitle>
          <CardDescription>Показатели эффективности бизнес-модели</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">LTV</span>
                    <span className="text-lg font-bold">{formatCurrency(metrics.ltv)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Пожизненная ценность клиента
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">CAC</span>
                    <span className="text-lg font-bold">{formatCurrency(metrics.cac)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Стоимость привлечения клиента
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">LTV/CAC Ratio</span>
                    <Badge className="bg-green-500">{ltvToCac}x</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Отличный показатель (рекомендуется &gt; 3.0)
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Churn Rate</span>
                    <span className="text-lg font-bold">{metrics.churnRate}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${100 - metrics.churnRate * 10}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Низкий отток - хороший знак удержания
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Рост команды</span>
                    <span className="text-lg font-bold">{metrics.teamSize} чел</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: '75%' }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Команда растет вместе с продуктом
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle>Ключевые вехи</CardTitle>
          <CardDescription>Прогресс по стратегическим целям</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  milestone.status === 'completed' ? 'bg-green-500' :
                  milestone.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                  {milestone.status === 'completed' && <Award className="w-5 h-5 text-white" />}
                  {milestone.status === 'in-progress' && <Target className="w-5 h-5 text-white" />}
                  {milestone.status === 'planned' && <span className="text-white text-xs">•</span>}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{milestone.title}</span>
                    <span className="text-sm text-muted-foreground">{milestone.date}</span>
                  </div>
                  <Badge variant="outline" className="mt-1">
                    {milestone.status === 'completed' ? 'Завершено' :
                     milestone.status === 'in-progress' ? 'В процессе' : 'Запланировано'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Рекомендации</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
            <p className="text-sm">Отличная динамика MRR - продолжайте фокус на привлечении</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
            <p className="text-sm">LTV/CAC ratio {ltvToCac}x - здоровая бизнес-модель</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
            <p className="text-sm">Runway {metrics.runway} месяцев - начните готовиться к следующему раунду</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
