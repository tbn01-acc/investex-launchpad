import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Target, 
  Briefcase, 
  Clock,
  DollarSign,
  BarChart3,
  Plus
} from 'lucide-react';

const SubsidiaryInvestorDashboard = () => {
  const stats = [
    { title: 'Активные инвестиции', value: '5', change: '+2', icon: DollarSign },
    { title: 'Общий портфель', value: '8.5 млн ₽', change: '+12%', icon: TrendingUp },
    { title: 'ROI за год', value: '18.5%', change: '+3.2%', icon: BarChart3 },
    { title: 'Доступные проекты', value: '24', change: '+8', icon: Target }
  ];

  const recentInvestments = [
    { name: 'FinTech стартап "PayEasy"', amount: '2.1 млн ₽', status: 'active', roi: '+15%' },
    { name: 'EdTech платформа "LearnPro"', amount: '1.8 млн ₽', status: 'completed', roi: '+22%' },
    { name: 'HealthTech решение "MedApp"', amount: '3.2 млн ₽', status: 'active', roi: '+8%' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">💰 Субсидиарный инвестор</h1>
          <p className="text-muted-foreground">Управление портфелем до 10 млн ₽</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Новая инвестиция
          </Button>
          <Button variant="outline">
            <Target className="h-4 w-4 mr-2" />
            Найти проекты
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change}</p>
                  </div>
                  <IconComponent className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Investment Portfolio */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Активные инвестиции</CardTitle>
            <CardDescription>Ваш текущий портфель проектов</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInvestments.map((investment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{investment.name}</h4>
                  <p className="text-sm text-muted-foreground">{investment.amount}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={investment.status === 'active' ? 'default' : 'secondary'}>
                    {investment.status === 'active' ? 'Активна' : 'Завершена'}
                  </Badge>
                  <span className="text-sm font-medium text-green-600">{investment.roi}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Investment Limits */}
        <Card>
          <CardHeader>
            <CardTitle>Лимиты инвестиций</CardTitle>
            <CardDescription>Ваши текущие ограничения</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Использовано</span>
                <span className="text-sm font-medium">8.5 млн ₽</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>10 млн ₽</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-sm">Сделки в месяц</span>
                <span className="text-sm font-medium">5 / 15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Активные проекты</span>
                <span className="text-sm font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Due diligence</span>
                <Badge variant="outline">Базовая</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Доступные проекты</CardTitle>
          <CardDescription>Проекты в вашем инвестиционном диапазоне</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'RetailTech решение', funding: '3.5 млн ₽', stage: 'Seed', sector: 'E-commerce' },
              { name: 'AgriTech стартап', funding: '5.2 млн ₽', stage: 'Series A', sector: 'Сельское хозяйство' },
              { name: 'CleanTech проект', funding: '7.8 млн ₽', stage: 'Series A', sector: 'Экология' }
            ].map((project, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <h4 className="font-medium">{project.name}</h4>
                <p className="text-sm text-muted-foreground">{project.funding}</p>
                <div className="flex gap-2">
                  <Badge variant="outline">{project.stage}</Badge>
                  <Badge variant="secondary">{project.sector}</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Подробнее
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubsidiaryInvestorDashboard;