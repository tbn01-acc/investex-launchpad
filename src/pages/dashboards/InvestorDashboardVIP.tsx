import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, Filter, TrendingUp, DollarSign, PieChart, Users, 
  MessageSquare, VideoIcon, FileText, Star, Calendar,
  Eye, Bookmark, BarChart3, Target, Crown, Phone
} from 'lucide-react';

const InvestorDashboardVIP = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [investmentRange, setInvestmentRange] = useState('all');

  const portfolioStats = {
    totalValue: 45800000,
    totalInvested: 38500000,
    totalReturn: 7300000,
    roi: 18.9,
    activeDeals: 24,
    exitedDeals: 12,
    portfolioCompanies: 36
  };

  const aiRecommendations = [
    {
      id: 1,
      name: 'Neural Networks Inc.',
      description: 'AI-платформа для анализа медицинских данных',
      stage: 'Series A',
      industry: 'HealthTech',
      funding: 8500000,
      traction: 'Revenue growth 340% YoY',
      score: 94,
      riskLevel: 'medium'
    },
    {
      id: 2,
      name: 'GreenEnergy Solutions',
      description: 'Возобновляемые источники энергии для промышленности',
      stage: 'Series B',
      industry: 'CleanTech',
      funding: 25000000,
      traction: '150+ enterprise clients',
      score: 89,
      riskLevel: 'low'
    }
  ];

  const portfolioBreakdown = [
    { sector: 'FinTech', percentage: 28, value: 12800000 },
    { sector: 'HealthTech', percentage: 22, value: 10100000 },
    { sector: 'AI/ML', percentage: 18, value: 8200000 },
    { sector: 'CleanTech', percentage: 16, value: 7300000 },
    { sector: 'E-commerce', percentage: 16, value: 7400000 }
  ];

  const vipServices = [
    {
      title: 'Персональный менеджер',
      description: 'Ваш персональный консультант по инвестициям',
      status: 'available',
      lastContact: '2024-01-15'
    },
    {
      title: 'Эксклюзивные сделки',
      description: 'Доступ к pre-IPO и приватным раундам',
      status: 'active',
      newDeals: 3
    },
    {
      title: 'Кастомные исследования',
      description: 'Индивидуальные аналитические отчеты',
      status: 'pending',
      requestsLeft: 2
    }
  ];

  return (
    <div className="space-y-8">
      {/* VIP Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Crown className="h-8 w-8 text-yellow-500" />
            VIP Инвестор
          </h1>
          <p className="text-muted-foreground">Премиум доступ к инвестиционной экосистеме</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Phone className="h-4 w-4 mr-2" />
            Связаться с менеджером
          </Button>
          <Button variant="outline">
            <Star className="h-4 w-4 mr-2" />
            VIP Поддержка
          </Button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Стоимость портфеля</p>
                <p className="text-2xl font-bold">{(portfolioStats.totalValue / 1000000).toFixed(1)} млн ₽</p>
                <p className="text-xs text-green-600">+{portfolioStats.roi}% ROI</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Активные сделки</p>
                <p className="text-2xl font-bold">{portfolioStats.activeDeals}</p>
                <p className="text-xs text-muted-foreground">{portfolioStats.exitedDeals} завершенных</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Прибыль</p>
                <p className="text-2xl font-bold text-green-600">+{(portfolioStats.totalReturn / 1000000).toFixed(1)} млн ₽</p>
                <p className="text-xs text-green-600">+{portfolioStats.roi}%</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Компании в портфеле</p>
                <p className="text-2xl font-bold">{portfolioStats.portfolioCompanies}</p>
                <p className="text-xs text-muted-foreground">5 отраслей</p>
              </div>
              <PieChart className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            <Eye className="h-4 w-4 mr-2" />
            Обзор проектов
          </TabsTrigger>
          <TabsTrigger value="portfolio">
            <PieChart className="h-4 w-4 mr-2" />
            Портфолио
          </TabsTrigger>
          <TabsTrigger value="due-diligence">
            <BarChart3 className="h-4 w-4 mr-2" />
            Due Diligence
          </TabsTrigger>
          <TabsTrigger value="communications">
            <MessageSquare className="h-4 w-4 mr-2" />
            Коммуникации
          </TabsTrigger>
          <TabsTrigger value="vip-services">
            <Crown className="h-4 w-4 mr-2" />
            VIP Сервисы
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>🤖 AI-рекомендации</CardTitle>
              <CardDescription>Персонализированные инвестиционные возможности на основе ML-анализа</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiRecommendations.map((project) => (
                  <div key={project.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">AI Score: {project.score}/100</Badge>
                        <Button size="sm" variant="outline">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Стадия</p>
                        <Badge>{project.stage}</Badge>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Отрасль</p>
                        <p className="font-medium">{project.industry}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Фандрайзинг</p>
                        <p className="font-medium">{(project.funding / 1000000).toFixed(1)} млн ₽</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Трекшн</p>
                        <p className="font-medium">{project.traction}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Badge variant={project.riskLevel === 'low' ? 'default' : project.riskLevel === 'medium' ? 'secondary' : 'destructive'}>
                        {project.riskLevel === 'low' ? 'Низкий риск' : project.riskLevel === 'medium' ? 'Средний риск' : 'Высокий риск'}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Подробнее
                        </Button>
                        <Button size="sm">
                          Инвестировать
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Advanced Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Расширенные фильтры</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium">Отрасль</label>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все отрасли</SelectItem>
                      <SelectItem value="fintech">FinTech</SelectItem>
                      <SelectItem value="healthtech">HealthTech</SelectItem>
                      <SelectItem value="ai">AI/ML</SelectItem>
                      <SelectItem value="cleantech">CleanTech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Стадия</label>
                  <Select value={stageFilter} onValueChange={setStageFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все стадии</SelectItem>
                      <SelectItem value="pre-seed">Pre-seed</SelectItem>
                      <SelectItem value="seed">Seed</SelectItem>
                      <SelectItem value="series-a">Series A</SelectItem>
                      <SelectItem value="series-b">Series B</SelectItem>
                      <SelectItem value="series-c">Series C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Инвестиции</label>
                  <Select value={investmentRange} onValueChange={setInvestmentRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Любой размер</SelectItem>
                      <SelectItem value="small">до 5 млн ₽</SelectItem>
                      <SelectItem value="medium">5-25 млн ₽</SelectItem>
                      <SelectItem value="large">25+ млн ₽</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">География</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Регион" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все регионы</SelectItem>
                      <SelectItem value="moscow">Москва</SelectItem>
                      <SelectItem value="spb">Санкт-Петербург</SelectItem>
                      <SelectItem value="regions">Регионы</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          {/* Portfolio Diversification */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Диверсификация по отраслям</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolioBreakdown.map((sector, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{sector.sector}</span>
                        <span className="text-sm text-muted-foreground">{sector.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2" 
                          style={{ width: `${sector.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {(sector.value / 1000000).toFixed(1)} млн ₽
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Калькулятор</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Период инвестирования</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите период" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1y">1 год</SelectItem>
                        <SelectItem value="3y">3 года</SelectItem>
                        <SelectItem value="5y">5 лет</SelectItem>
                        <SelectItem value="10y">10 лет</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Прогнозируемый ROI</p>
                      <p className="text-3xl font-bold text-green-600">24.5%</p>
                      <p className="text-sm text-muted-foreground">годовых</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="due-diligence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Структурированная Due Diligence</CardTitle>
              <CardDescription>Автоматизированная система оценки инвестиционных возможностей</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 justify-start">
                    <div className="text-left">
                      <p className="font-medium">Финансовый анализ</p>
                      <p className="text-sm text-muted-foreground">Модели оценки и прогнозы</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-20 justify-start">
                    <div className="text-left">
                      <p className="font-medium">Анализ команды</p>
                      <p className="text-sm text-muted-foreground">LinkedIn интеграция</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-20 justify-start">
                    <div className="text-left">
                      <p className="font-medium">Рынок и конкуренты</p>
                      <p className="text-sm text-muted-foreground">Размер рынка и позиции</p>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Сообщения с фаундерами</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {i}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Фаундер #{i}</p>
                        <p className="text-sm text-muted-foreground">Последнее сообщение...</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Планировщик встреч</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <VideoIcon className="h-4 w-4 mr-2" />
                    Запланировать видеозвонок
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Календарь встреч
                  </Button>
                  <Button className="w-full" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Обмен документами
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vip-services" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vipServices.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant={service.status === 'available' ? 'default' : service.status === 'active' ? 'secondary' : 'outline'}>
                      {service.status === 'available' ? 'Доступно' : service.status === 'active' ? 'Активно' : 'Ожидание'}
                    </Badge>
                    
                    {service.lastContact && (
                      <p className="text-sm text-muted-foreground">
                        Последний контакт: {service.lastContact}
                      </p>
                    )}
                    
                    {service.newDeals && (
                      <p className="text-sm text-green-600">
                        {service.newDeals} новых сделок
                      </p>
                    )}
                    
                    {service.requestsLeft && (
                      <p className="text-sm text-muted-foreground">
                        Осталось запросов: {service.requestsLeft}
                      </p>
                    )}
                    
                    <Button className="w-full" size="sm">
                      Использовать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestorDashboardVIP;