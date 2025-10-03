import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Users, DollarSign, Target, PieChart, FileText } from 'lucide-react';

const CoInvestorDashboard = () => {
  const { user } = useAuth();
  const { formatCurrency } = useLanguage();

  const [stats] = useState({
    totalInvestments: 850000,
    activeDeals: 5,
    portfolioValue: 1200000,
    roi: 41.2,
    coInvestors: 12,
    pendingDeals: 3
  });

  const [investments] = useState([
    {
      id: 1,
      project: 'HealthTech AI Platform',
      amount: 200000,
      coInvestors: 4,
      leadInvestor: 'Venture Capital Fund A',
      status: 'Active',
      roi: 45,
      stage: 'Series A'
    },
    {
      id: 2,
      project: 'Green Energy Startup',
      amount: 150000,
      coInvestors: 3,
      leadInvestor: 'GreenTech Ventures',
      status: 'Active',
      roi: 38,
      stage: 'Seed'
    },
    {
      id: 3,
      project: 'FinTech Solution',
      amount: 300000,
      coInvestors: 6,
      leadInvestor: 'FinTech Capital',
      status: 'Pending',
      roi: 0,
      stage: 'Series B'
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Соинвестор</h2>
        <p className="text-muted-foreground">Совместные инвестиции и синдикация</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего инвестировано</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalInvestments)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные сделки</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDeals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{stats.roi}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Стоимость портфеля</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.portfolioValue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Соинвесторы</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.coInvestors}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">На рассмотрении</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingDeals}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="investments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="investments">Инвестиции</TabsTrigger>
          <TabsTrigger value="syndicate">Синдикат</TabsTrigger>
          <TabsTrigger value="opportunities">Возможности</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="investments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Совместные инвестиции</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.map((investment) => (
                  <div key={investment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{investment.project}</p>
                        <Badge variant={investment.status === 'Active' ? 'default' : 'secondary'}>
                          {investment.status === 'Active' ? 'Активна' : 'На рассмотрении'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Лид-инвестор: {investment.leadInvestor}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Соинвесторов: {investment.coInvestors} • Стадия: {investment.stage}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(investment.amount)}</p>
                      {investment.roi > 0 && (
                        <p className="text-sm text-green-600">ROI: +{investment.roi}%</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="syndicate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Мой синдикат</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Управление синдикатом соинвесторов</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Инвестиционные возможности</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Новые проекты для совместного инвестирования</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Аналитика портфеля</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Рост капитала</span>
                  <span className="text-sm text-muted-foreground">+{stats.roi}%</span>
                </div>
                <Progress value={stats.roi} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoInvestorDashboard;