import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Store, TrendingUp, Users, DollarSign } from 'lucide-react';

export function FranchiseeAnalytics() {
  return (
    <div className="space-y-6">
      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные точки</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">в 2 городах</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Месячный оборот</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₽ 8.2 млн</div>
            <p className="text-xs text-green-600">+18% к прошлому месяцу</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Чистая прибыль</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₽ 1.6 млн</div>
            <p className="text-xs text-muted-foreground">Маржа 19.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Команда</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">сотрудников</p>
          </CardContent>
        </Card>
      </div>

      {/* Детальная статистика по точкам */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Производительность по точкам</CardTitle>
            <CardDescription>Ежемесячные показатели</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Точка #1 - Москва</span>
                <span className="text-sm text-muted-foreground">₽ 3.8 млн</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Точка #2 - Санкт-Петербург</span>
                <span className="text-sm text-muted-foreground">₽ 2.9 млн</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Точка #3 - Казань</span>
                <span className="text-sm text-muted-foreground">₽ 1.5 млн</span>
              </div>
              <Progress value={38} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Финансовые показатели</CardTitle>
            <CardDescription>Анализ эффективности бизнеса</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Выручка (месяц)</span>
              <span className="text-sm font-semibold">₽ 8,200,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Операционные расходы</span>
              <span className="text-sm font-semibold">₽ 4,920,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Роялти франчайзеру (5%)</span>
              <span className="text-sm font-semibold">₽ 410,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Маркетинговый взнос (2%)</span>
              <span className="text-sm font-semibold">₽ 164,000</span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Чистая прибыль</span>
              <span className="text-sm font-bold text-green-600">₽ 1,706,000</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Окупаемость инвестиций */}
      <Card>
        <CardHeader>
          <CardTitle>Окупаемость инвестиций</CardTitle>
          <CardDescription>Прогресс по каждой точке</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Точка #1 - Москва</span>
              <span className="text-sm text-green-600">Окупилась (14 мес)</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Точка #2 - Санкт-Петербург</span>
              <span className="text-sm text-muted-foreground">11/16 месяцев</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Точка #3 - Казань</span>
              <span className="text-sm text-muted-foreground">4/18 месяцев</span>
            </div>
            <Progress value={22} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
