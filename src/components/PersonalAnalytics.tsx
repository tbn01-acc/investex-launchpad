import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types/roles';
import { 
  TrendingUp, 
  Users, 
  BarChart3, 
  Target,
  Award,
  Star,
  DollarSign,
  Calendar
} from 'lucide-react';

interface PersonalAnalyticsProps {
  userRole: UserRole;
}

const PersonalAnalytics: React.FC<PersonalAnalyticsProps> = ({ userRole }) => {
  // Personalized analytics based on user role
  const getAnalyticsForRole = (role: UserRole) => {
    const baseMetrics = {
      job_seeker: {
        title: 'Карьерная аналитика',
        description: 'Ваш прогресс в поиске работы',
        metrics: [
          { name: 'Отклики отправлено', value: '23', change: '+12%', icon: Target },
          { name: 'Просмотры профиля', value: '156', change: '+34%', icon: Users },
          { name: 'Приглашения на интервью', value: '8', change: '+60%', icon: Calendar },
          { name: 'Рейтинг профиля', value: '4.2/5', change: '+0.3', icon: Star }
        ],
        comparisons: [
          { metric: 'Скорость отклика', your: '2.3 дня', market: '3.1 дня', status: 'better' },
          { metric: 'Успешность интервью', your: '35%', market: '28%', status: 'better' },
          { metric: 'Средняя зарплата', your: '140k ₽', market: '125k ₽', status: 'better' }
        ]
      },
      freelancer: {
        title: 'Фриланс-аналитика',
        description: 'Эффективность вашей работы',
        metrics: [
          { name: 'Завершённые проекты', value: '47', change: '+8', icon: Award },
          { name: 'Средний рейтинг', value: '4.8', change: '+0.2', icon: Star },
          { name: 'Месячный доход', value: '185k ₽', change: '+22%', icon: DollarSign },
          { name: 'Постоянные клиенты', value: '12', change: '+3', icon: Users }
        ],
        comparisons: [
          { metric: 'Качество работы', your: '4.8/5', market: '4.2/5', status: 'better' },
          { metric: 'Скорость выполнения', your: '1.2x', market: '1.0x', status: 'better' },
          { metric: 'Стоимость услуг', your: '3500 ₽/час', market: '2800 ₽/час', status: 'better' }
        ]
      },
      co_owner: {
        title: 'Аналитика соучредителя',
        description: 'Результативность партнёрств',
        metrics: [
          { name: 'Активные поиски', value: '4', change: '+1', icon: Target },
          { name: 'Успешные партнёрства', value: '3', change: '+1', icon: Award },
          { name: 'Инвестированная сумма', value: '12M ₽', change: '+2.5M', icon: DollarSign },
          { name: 'ROI портфеля', value: '28%', change: '+6%', icon: TrendingUp }
        ],
        comparisons: [
          { metric: 'Due diligence качество', your: '92%', market: '78%', status: 'better' },
          { metric: 'Время на партнёрство', your: '45 дней', market: '62 дня', status: 'better' },
          { metric: 'Доходность проектов', your: '28%', market: '19%', status: 'better' }
        ]
      },
      co_founder: {
        title: 'Аналитика ко-фаундера',
        description: 'Управление проектами и командами',
        metrics: [
          { name: 'Активные проекты', value: '3', change: '+1', icon: Target },
          { name: 'Размер команд', value: '24', change: '+8', icon: Users },
          { name: 'Средняя доля', value: '15%', change: '+2%', icon: BarChart3 },
          { name: 'Успешные запуски', value: '8', change: '+2', icon: Award }
        ],
        comparisons: [
          { metric: 'Скорость MVP', your: '3.2 мес', market: '4.8 мес', status: 'better' },
          { metric: 'Retention команды', your: '89%', market: '73%', status: 'better' },
          { metric: 'Product-market fit', your: '78%', market: '52%', status: 'better' }
        ]
      }
    };

    return baseMetrics[role] || baseMetrics.freelancer;
  };

  const analytics = getAnalyticsForRole(userRole);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">{analytics.title}</h2>
        <p className="text-muted-foreground">{analytics.description}</p>
      </div>

      {/* Personal Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics.metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.name}</p>
                    <p className="text-xl font-bold">{metric.value}</p>
                    <p className="text-xs text-green-600">{metric.change}</p>
                  </div>
                  <IconComponent className="h-6 w-6 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Market Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Сравнение с рынком</CardTitle>
          <CardDescription>Ваши показатели относительно среднерыночных</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.comparisons.map((comparison, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{comparison.metric}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm">
                      Вы: <span className="font-medium">{comparison.your}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Рынок: {comparison.market}
                    </span>
                  </div>
                </div>
                <Badge variant={comparison.status === 'better' ? 'default' : 'secondary'}>
                  {comparison.status === 'better' ? '📈 Выше рынка' : '📊 В среднем'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>🤖 AI-рекомендации</CardTitle>
          <CardDescription>Персональные советы для улучшения показателей</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userRole === 'job_seeker' && (
              <>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium">💡 Совет по профилю</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Добавьте 2-3 проекта в портфолио - это увеличит отклики на 40%
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium">📈 Рост карьеры</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Изучите TypeScript - спрос на эти навыки вырос на 65%
                  </p>
                </div>
              </>
            )}
            
            {userRole === 'freelancer' && (
              <>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium">💰 Увеличение дохода</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Поднимите ставку до 4000 ₽/час - ваш рейтинг это позволяет
                  </p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm font-medium">🎯 Специализация</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Сфокусируйтесь на FinTech проектах - там ваша конверсия 85%
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalAnalytics;