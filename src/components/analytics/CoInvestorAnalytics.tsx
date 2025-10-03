import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const CoInvestorAnalytics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>ROI по портфелю</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Средний ROI</span>
              <span className="text-sm text-muted-foreground">+41.2%</span>
            </div>
            <Progress value={41} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Активность синдиката</span>
              <span className="text-sm text-muted-foreground">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Успешность сделок</span>
              <span className="text-sm text-muted-foreground">78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Показатели совместных инвестиций</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Вовлеченность соинвесторов</span>
              <span className="text-sm text-muted-foreground">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Скорость закрытия сделок</span>
              <span className="text-sm text-muted-foreground">68%</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Качество проектов</span>
              <span className="text-sm text-muted-foreground">88%</span>
            </div>
            <Progress value={88} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoInvestorAnalytics;