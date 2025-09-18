import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target, 
  Calendar,
  Download,
  Eye,
  Clock
} from 'lucide-react';

const AdvancedAnalytics = () => {
  const [activeTab, setActiveTab] = useState('platform');

  const platformMetrics = {
    totalUsers: 15847,
    activeUsers: 8924,
    newUsers: 1247,
    retention: 73,
    engagement: 84,
    conversionRate: 12.4
  };

  const investmentMetrics = {
    totalDeals: 156,
    totalVolume: '2.8 млрд ₽',
    avgDealSize: '18 млн ₽',
    successRate: 73,
    avgTimeToClose: 45,
    quarterGrowth: 23
  };

  const usersByRole = [
    { role: 'Инвесторы', count: 2847, percentage: 18, growth: '+12%' },
    { role: 'Фаундеры', count: 3924, percentage: 25, growth: '+18%' },
    { role: 'Фрилансеры', count: 6234, percentage: 39, growth: '+8%' },
    { role: 'Аутсорсеры', count: 1842, percentage: 12, growth: '+25%' },
    { role: 'Прочие', count: 1000, percentage: 6, growth: '+5%' }
  ];

  const topProjects = [
    { name: 'FinTech P2P', funding: '25 млн ₽', investors: 12, status: 'funded', roi: '+180%' },
    { name: 'AI EdTech', funding: '15 млн ₽', investors: 8, status: 'active', roi: '+120%' },
    { name: 'GreenTech Solution', funding: '30 млн ₽', investors: 15, status: 'funded', roi: '+200%' }
  ];

  const predictions = [
    {
      type: 'market',
      title: 'FinTech сектор',
      prediction: 'Рост на 35% в следующем квартале',
      confidence: 89,
      timeframe: '3 месяца'
    },
    {
      type: 'investment',
      title: 'Средний чек',
      prediction: 'Увеличение до 22 млн ₽',
      confidence: 76,
      timeframe: '6 месяцев'
    },
    {
      type: 'user',
      title: 'Активность платформы',
      prediction: 'Рост пользователей на 40%',
      confidence: 82,
      timeframe: '1 год'
    }
  ];

  const reports = [
    {
      title: 'Ежемесячный отчет',
      description: 'Комплексная аналитика за месяц',
      type: 'monthly',
      lastGenerated: '2 дня назад',
      size: '2.4 MB'
    },
    {
      title: 'Квартальный анализ',
      description: 'Детальный анализ трендов',
      type: 'quarterly',
      lastGenerated: '1 неделя назад',
      size: '8.7 MB'
    },
    {
      title: 'Бенчмарк-отчет',
      description: 'Сравнение с рынком',
      type: 'benchmark',
      lastGenerated: '3 дня назад',
      size: '1.8 MB'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'funded': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Расширенная аналитика
          </CardTitle>
          <CardDescription>
            Комплексный анализ платформы, инвестиций и прогнозирование
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="platform">Платформа</TabsTrigger>
          <TabsTrigger value="investment">Инвестиции</TabsTrigger>
          <TabsTrigger value="predictive">Прогнозы</TabsTrigger>
          <TabsTrigger value="reports">Отчеты</TabsTrigger>
        </TabsList>

        <TabsContent value="platform" className="space-y-4">
          {/* Platform Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Всего пользователей</p>
                    <p className="text-2xl font-bold">{platformMetrics.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+12% за месяц</p>
                  </div>
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Активные пользователи</p>
                    <p className="text-2xl font-bold">{platformMetrics.activeUsers.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+8% за неделю</p>
                  </div>
                  <Eye className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Конверсия</p>
                    <p className="text-2xl font-bold">{platformMetrics.conversionRate}%</p>
                    <p className="text-xs text-green-600">+2.1% за месяц</p>
                  </div>
                  <Target className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users by Role */}
          <Card>
            <CardHeader>
              <CardTitle>Распределение пользователей по ролям</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {usersByRole.map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="font-medium">{user.role}</div>
                    <Progress value={user.percentage} className="flex-1 max-w-40" />
                    <div className="text-sm text-muted-foreground">{user.percentage}%</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium">{user.count.toLocaleString()}</div>
                    <Badge variant="outline" className="text-green-600">{user.growth}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investment" className="space-y-4">
          {/* Investment Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Всего сделок</p>
                    <p className="text-2xl font-bold">{investmentMetrics.totalDeals}</p>
                    <p className="text-xs text-green-600">+{investmentMetrics.quarterGrowth}% за квартал</p>
                  </div>
                  <Target className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Общий объем</p>
                    <p className="text-2xl font-bold">{investmentMetrics.totalVolume}</p>
                    <p className="text-xs text-green-600">+45% за год</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Время закрытия</p>
                    <p className="text-2xl font-bold">{investmentMetrics.avgTimeToClose} дней</p>
                    <p className="text-xs text-red-600">+5 дней</p>
                  </div>
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Топ проекты по результатам</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProjects.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="font-medium">{project.name}</div>
                    <Badge className={`${getStatusColor(project.status)} text-white`}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Привлечено: </span>
                      <span className="font-medium">{project.funding}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Инвесторы: </span>
                      <span className="font-medium">{project.investors}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ROI: </span>
                      <span className="font-medium text-green-600">{project.roi}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Прогностическое моделирование
              </CardTitle>
              <CardDescription>AI-прогнозы на основе исторических данных</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {predictions.map((pred, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{pred.title}</h4>
                      <p className="text-muted-foreground text-sm">{pred.prediction}</p>
                    </div>
                    <Badge variant="outline">{pred.timeframe}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Уверенность</span>
                        <span className={getConfidenceColor(pred.confidence)}>{pred.confidence}%</span>
                      </div>
                      <Progress value={pred.confidence} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Автоматизированная отчетность
              </CardTitle>
              <CardDescription>Генерация и экспорт аналитических отчетов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                        <span>Обновлен: {report.lastGenerated}</span>
                        <span>Размер: {report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Просмотр
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Скачать
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;