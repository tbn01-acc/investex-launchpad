import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  TrendingUp, DollarSign, PieChart, Target, 
  Plus, Eye, BarChart3, Briefcase, Search, Filter 
} from 'lucide-react';
import DueDiligenceTools from '@/components/DueDiligenceTools';
import PortfolioAnalytics from '@/components/PortfolioAnalytics';

export default function InvestorDashboard() {
  const { user, profile } = useAuth();
  const { t, formatCurrency } = useLanguage();
  const [portfolioData, setPortfolioData] = useState({
    totalInvested: 2850000,
    currentValue: 3420000,
    totalReturn: 570000,
    returnPercentage: 20.0,
    activeInvestments: 12,
    completedInvestments: 8
  });

  const [recentInvestments] = useState([
    {
      id: 1,
      projectName: 'AI-платформа для e-commerce',
      amount: 500000,
      dateInvested: '2024-01-15',
      currentValue: 625000,
      returnPercentage: 25.0,
      status: 'active'
    },
    {
      id: 2,
      projectName: 'Мобильное приложение для доставки',
      amount: 300000,
      dateInvested: '2024-02-01',
      currentValue: 285000,
      returnPercentage: -5.0,
      status: 'active'
    },
    {
      id: 3,
      projectName: 'Система управления складом',
      amount: 200000,
      dateInvested: '2023-12-10',
      currentValue: 280000,
      returnPercentage: 40.0,
      status: 'completed'
    }
  ]);

  const [availableProjects] = useState([
    {
      id: 1,
      title: 'Блокчейн-платформа для NFT',
      description: 'Инновационная платформа для создания и торговли NFT',
      fundingGoal: 1000000,
      fundingRaised: 650000,
      investorsCount: 45,
      minInvestment: 50000,
      expectedReturn: '15-25%',
      risk: 'medium',
      category: 'blockchain',
      stage: 'growth'
    },
    {
      id: 2,
      title: 'IoT-решения для умного дома',
      description: 'Комплексная система автоматизации жилых помещений',
      fundingGoal: 750000,
      fundingRaised: 320000,
      investorsCount: 28,
      minInvestment: 25000,
      expectedReturn: '20-30%',
      risk: 'high',
      category: 'iot',
      stage: 'seed'
    },
    {
      id: 3,
      title: 'AI-платформа для образования',
      description: 'Персонализированное обучение с использованием ИИ',
      fundingGoal: 500000,
      fundingRaised: 180000,
      investorsCount: 15,
      minInvestment: 10000,
      expectedReturn: '25-35%',
      risk: 'medium',
      category: 'ai',
      stage: 'startup'
    }
  ]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');

  // Filtered projects
  const filteredProjects = availableProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || project.risk === riskFilter;
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
    const matchesStage = stageFilter === 'all' || project.stage === stageFilter;
    
    return matchesSearch && matchesRisk && matchesCategory && matchesStage;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Инвестиционный портфель</h1>
            <p className="text-muted-foreground">
              {t('common.welcome')}, {profile?.first_name || 'Инвестор'}
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Новая инвестиция
          </Button>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Всего инвестировано</p>
                  <p className="text-2xl font-bold">{formatCurrency(portfolioData.totalInvested)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Текущая стоимость</p>
                  <p className="text-2xl font-bold">{formatCurrency(portfolioData.currentValue)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Прибыль</p>
                  <p className="text-2xl font-bold text-green-600">
                    +{formatCurrency(portfolioData.totalReturn)}
                  </p>
                  <p className="text-sm text-green-600">+{portfolioData.returnPercentage}%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Активные инвестиции</p>
                  <p className="text-2xl font-bold">{portfolioData.activeInvestments}</p>
                  <p className="text-xs text-muted-foreground">
                    {portfolioData.completedInvestments} завершенных
                  </p>
                </div>
                <PieChart className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">
              <PieChart className="h-4 w-4 mr-2" />
              Портфель
            </TabsTrigger>
            <TabsTrigger value="opportunities">
              <Target className="h-4 w-4 mr-2" />
              Возможности
            </TabsTrigger>
            <TabsTrigger value="due-diligence">
              <Eye className="h-4 w-4 mr-2" />
              Due Diligence
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Аналитика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle>Мои инвестиции</CardTitle>
                <CardDescription>Обзор всех ваших текущих и завершенных инвестиций</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInvestments.map((investment) => (
                    <div key={investment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{investment.projectName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Инвестировано: {formatCurrency(investment.amount)} • 
                          Дата: {new Date(investment.dateInvested).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(investment.currentValue)}</p>
                        <p className={`text-sm ${
                          investment.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {investment.returnPercentage >= 0 ? '+' : ''}{investment.returnPercentage}%
                        </p>
                      </div>
                      <div className="ml-4">
                        <Badge variant={investment.status === 'active' ? 'default' : 'secondary'}>
                          {investment.status === 'active' ? 'Активно' : 'Завершено'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities">
            <div className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardHeader>
                  <CardTitle>Поиск инвестиционных возможностей</CardTitle>
                  <CardDescription>Найдите проекты, соответствующие вашим критериям</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Поиск по названию или описанию проекта..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Уровень риска</label>
                        <Select value={riskFilter} onValueChange={setRiskFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите риск" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все</SelectItem>
                            <SelectItem value="low">Низкий</SelectItem>
                            <SelectItem value="medium">Средний</SelectItem>
                            <SelectItem value="high">Высокий</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Категория</label>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все</SelectItem>
                            <SelectItem value="blockchain">Блокчейн</SelectItem>
                            <SelectItem value="ai">ИИ</SelectItem>
                            <SelectItem value="iot">IoT</SelectItem>
                            <SelectItem value="fintech">Финтех</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Стадия</label>
                        <Select value={stageFilter} onValueChange={setStageFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите стадию" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все</SelectItem>
                            <SelectItem value="startup">Стартап</SelectItem>
                            <SelectItem value="seed">Seed</SelectItem>
                            <SelectItem value="growth">Рост</SelectItem>
                            <SelectItem value="expansion">Расширение</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Найдено проектов: {filteredProjects.length}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSearchTerm('');
                          setRiskFilter('all');
                          setCategoryFilter('all');
                          setStageFilter('all');
                        }}
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        Сбросить фильтры
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Projects List */}
              <div className="grid gap-6">
                {filteredProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <Badge variant={project.risk === 'high' ? 'destructive' : 'secondary'}>
                        {project.risk === 'high' ? 'Высокий риск' : 'Средний риск'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Цель сбора: {formatCurrency(project.fundingGoal)}</span>
                        <span>Собрано: {formatCurrency(project.fundingRaised)}</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(project.fundingRaised / project.fundingGoal) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Инвесторы</p>
                          <p className="font-medium">{project.investorsCount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Мин. инвестиция</p>
                          <p className="font-medium">{formatCurrency(project.minInvestment)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Ожидаемая доходность</p>
                          <p className="font-medium">{project.expectedReturn}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Подробнее
                        </Button>
                        <Button size="sm">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Инвестировать
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="due-diligence">
            <DueDiligenceTools 
              projectId={1} 
              projectTitle="Блокчейн-платформа для NFT" 
            />
          </TabsContent>

          <TabsContent value="analytics">
            <PortfolioAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}