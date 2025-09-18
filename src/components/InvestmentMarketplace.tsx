import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, TrendingUp, BarChart3 } from 'lucide-react';

const InvestmentMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [amountFilter, setAmountFilter] = useState('all');

  const marketStats = {
    totalProjects: 156,
    totalFunding: '2.8 млрд ₽',
    avgDealSize: '18 млн ₽',
    successRate: '73%'
  };

  const projects = [
    {
      id: 1,
      title: 'FinTech платформа P2P кредитования',
      industry: 'FinTech',
      stage: 'seed',
      fundingAmount: '15 млн ₽',
      valuation: '60 млн ₽',
      teamSize: 8,
      revenue: '2.1 млн ₽',
      growth: '+180%',
      location: 'Москва',
      description: 'Революционная платформа для прямого кредитования между частными лицами с AI-скорингом',
      tags: ['Blockchain', 'AI', 'FinTech']
    },
    {
      id: 2,
      title: 'EdTech персонализированное обучение',
      industry: 'EdTech',
      stage: 'pre-seed',
      fundingAmount: '8 млн ₽',
      valuation: '25 млн ₽',
      teamSize: 5,
      revenue: '0.5 млн ₽',
      growth: '+300%',
      location: 'СПб',
      description: 'AI-платформа для создания персонализированных образовательных траекторий',
      tags: ['AI', 'Machine Learning', 'Education']
    }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'pre-seed': return 'bg-blue-500';
      case 'seed': return 'bg-green-500';
      case 'series-a': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredProjects = projects.filter(project => {
    return (searchTerm === '' || project.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (industryFilter === 'all' || project.industry === industryFilter) &&
           (stageFilter === 'all' || project.stage === stageFilter);
  });

  return (
    <div className="space-y-6">
      {/* Market Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(marketStats).map(([key, value]) => (
          <Card key={key}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-sm text-muted-foreground">
                {key === 'totalProjects' && 'Активных проектов'}
                {key === 'totalFunding' && 'Общий объем'}
                {key === 'avgDealSize' && 'Средняя сделка'}
                {key === 'successRate' && 'Успешность'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Поиск инвестиционных проектов</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск проектов..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Отрасль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все отрасли</SelectItem>
                <SelectItem value="FinTech">FinTech</SelectItem>
                <SelectItem value="EdTech">EdTech</SelectItem>
                <SelectItem value="HealthTech">HealthTech</SelectItem>
                <SelectItem value="GreenTech">GreenTech</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Стадия" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все стадии</SelectItem>
                <SelectItem value="pre-seed">Pre-seed</SelectItem>
                <SelectItem value="seed">Seed</SelectItem>
                <SelectItem value="series-a">Series A</SelectItem>
              </SelectContent>
            </Select>
            <Select value={amountFilter} onValueChange={setAmountFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Сумма" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любая сумма</SelectItem>
                <SelectItem value="small">До 10 млн</SelectItem>
                <SelectItem value="medium">10-50 млн</SelectItem>
                <SelectItem value="large">50+ млн</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getStageColor(project.stage)} text-white mb-2`}>
                    {project.stage}
                  </Badge>
                  <div className="text-sm text-muted-foreground">{project.location}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Требуется</div>
                  <div className="font-semibold">{project.fundingAmount}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Оценка</div>
                  <div className="font-semibold">{project.valuation}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Выручка</div>
                  <div className="font-semibold text-green-600">{project.revenue}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Рост</div>
                  <div className="font-semibold text-green-600">{project.growth}</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Команда: {project.teamSize} человек
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Аналитика
                  </Button>
                  <Button size="sm">
                    Подробнее
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InvestmentMarketplace;