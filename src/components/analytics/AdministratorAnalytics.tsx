import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const AdministratorAnalytics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Производительность платформы</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Активность пользователей</span>
              <span className="text-sm text-muted-foreground">87%</span>
            </div>
            <Progress value={87} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Скорость модерации</span>
              <span className="text-sm text-muted-foreground">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Удовлетворенность пользователей</span>
              <span className="text-sm text-muted-foreground">94%</span>
            </div>
            <Progress value={94} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Системные метрики</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Здоровье системы</span>
              <span className="text-sm text-muted-foreground">98%</span>
            </div>
            <Progress value={98} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Время отклика</span>
              <span className="text-sm text-muted-foreground">95%</span>
            </div>
            <Progress value={95} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Безопасность</span>
              <span className="text-sm text-muted-foreground">99%</span>
            </div>
            <Progress value={99} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdministratorAnalytics;