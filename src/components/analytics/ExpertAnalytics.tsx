import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Clock, Award, Users, DollarSign, Target } from 'lucide-react';

export const ExpertAnalytics = () => {
  const { formatCurrency } = useLanguage();

  const metrics = {
    totalConsultations: 156,
    avgSessionDuration: 90,
    clientSatisfaction: 4.9,
    repeatClientRate: 72,
    monthlyRevenue: 540000,
    hourlyRate: 18000,
    expertiseAreas: 5,
    responseTime: 1.2,
    consultationCompletionRate: 96,
    knowledgeBaseContributions: 23
  };

  const expertiseBreakdown = [
    { area: 'Стратегия', consultations: 45, rating: 4.9 },
    { area: 'Финансы', consultations: 38, rating: 4.8 },
    { area: 'Маркетинг', consultations: 32, rating: 5.0 },
    { area: 'Технологии', consultations: 25, rating: 4.7 },
    { area: 'Управление', consultations: 16, rating: 4.9 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Аналитика эксперта</h2>
        <p className="text-muted-foreground">
          Показатели экспертной деятельности и удовлетворенности клиентов
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Консультаций проведено</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{metrics.totalConsultations}</div>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="outline">Завершенность {metrics.consultationCompletionRate}%</Badge>
                </div>
              </div>
              <Target className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Удовлетворенность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{metrics.clientSatisfaction}/5.0</div>
                <div className="flex items-center gap-1 mt-1">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">Топ 5% экспертов</span>
                </div>
              </div>
              <Award className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Месячный доход</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{formatCurrency(metrics.monthlyRevenue)}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+15.3%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expertise Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Распределение по областям экспертизы</CardTitle>
          <CardDescription>Консультации и рейтинги по направлениям</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expertiseBreakdown.map((item) => (
              <div key={item.area} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.area}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {item.consultations} консультаций
                      </span>
                      <Badge variant="outline">★ {item.rating}</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(item.consultations / metrics.totalConsultations) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Операционные показатели</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Повторные клиенты</span>
                <span className="text-sm text-muted-foreground">{metrics.repeatClientRate}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${metrics.repeatClientRate}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Высокая лояльность клиентов
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Время отклика</span>
                <span className="text-sm text-muted-foreground">{metrics.responseTime}ч</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: '92%' }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Отличная скорость реагирования
              </p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm text-muted-foreground">Ср. длительность сессии</span>
              <span className="font-semibold">{metrics.avgSessionDuration} мин</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Часовая ставка</span>
              <span className="font-semibold">{formatCurrency(metrics.hourlyRate)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Вклад в сообщество</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{metrics.knowledgeBaseContributions}</div>
                  <div className="text-xs text-muted-foreground">Статей в базе знаний</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Рекомендации</p>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                <p className="text-sm">Высокий уровень повторных обращений - признак качества</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <p className="text-sm">Рассмотрите увеличение ставки при таких высоких рейтингах</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
                <p className="text-sm">Больше статей в базе знаний повысит видимость профиля</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
