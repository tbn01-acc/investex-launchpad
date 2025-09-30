import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, TrendingDown, Clock, DollarSign, Award, Target } from 'lucide-react';

export const FreelancerAnalytics = () => {
  const { formatCurrency } = useLanguage();

  const metrics = {
    completedProjects: 24,
    averageRating: 4.8,
    monthlyIncome: 285000,
    avgProjectDuration: 18,
    responseTime: 2.5,
    clientRetention: 68,
    lastMonthIncome: 245000,
    lastMonthProjects: 18,
    hourlyRate: 3500,
    utilizationRate: 82
  };

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const incomeGrowth = calculateGrowth(metrics.monthlyIncome, metrics.lastMonthIncome);
  const projectGrowth = calculateGrowth(metrics.completedProjects, metrics.lastMonthProjects);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Аналитика фрилансера</h2>
        <p className="text-muted-foreground">
          Ваши показатели эффективности и сравнение с рынком
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Доход за месяц</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{formatCurrency(metrics.monthlyIncome)}</div>
                <div className="flex items-center gap-1 mt-1">
                  {parseFloat(incomeGrowth) > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${parseFloat(incomeGrowth) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {incomeGrowth}%
                  </span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Завершено проектов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{metrics.completedProjects}</div>
                <div className="flex items-center gap-1 mt-1">
                  {parseFloat(projectGrowth) > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${parseFloat(projectGrowth) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {projectGrowth}%
                  </span>
                </div>
              </div>
              <Target className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Средний рейтинг</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{metrics.averageRating}/5.0</div>
                <div className="mt-1">
                  <Badge variant="outline">Отлично</Badge>
                </div>
              </div>
              <Award className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Показатели эффективности</CardTitle>
          <CardDescription>Сравнение с рынком фрилансеров</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Загрузка</span>
                <span className="text-sm text-muted-foreground">{metrics.utilizationRate}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${metrics.utilizationRate}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                На {metrics.utilizationRate - 65}% выше среднего по рынку
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Время отклика</span>
                <span className="text-sm text-muted-foreground">{metrics.responseTime}ч</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: '85%' }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Отличный показатель - быстрее 85% фрилансеров
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Удержание клиентов</span>
                <span className="text-sm text-muted-foreground">{metrics.clientRetention}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${metrics.clientRetention}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.clientRetention}% клиентов возвращаются для новых проектов
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Финансовые показатели</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Часовая ставка</span>
              <span className="font-semibold">{formatCurrency(metrics.hourlyRate)}/ч</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Ср. длительность проекта</span>
              <span className="font-semibold">{metrics.avgProjectDuration} дней</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Доход за прошлый месяц</span>
              <span className="font-semibold">{formatCurrency(metrics.lastMonthIncome)}</span>
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
              <p className="text-sm">Ваша загрузка высокая - подумайте о повышении ставки</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
              <p className="text-sm">Отличное время отклика помогает получать больше проектов</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
              <p className="text-sm">Работайте над удержанием клиентов для стабильного дохода</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
