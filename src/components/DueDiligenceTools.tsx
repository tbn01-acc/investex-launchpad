import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, CheckCircle, AlertTriangle, Users, 
  DollarSign, TrendingUp, Award, Calendar 
} from 'lucide-react';

interface DueDiligenceToolsProps {
  projectId: number;
  projectTitle: string;
}

export default function DueDiligenceTools({ projectId, projectTitle }: DueDiligenceToolsProps) {
  const [activeChecklist, setActiveChecklist] = useState<Record<string, boolean>>({});

  const dueDiligenceData = {
    financials: {
      score: 85,
      items: [
        { name: 'Финансовые отчёты за 3 года', status: 'completed', risk: 'low' },
        { name: 'Аудированная отчётность', status: 'completed', risk: 'low' },
        { name: 'Прогнозы доходов', status: 'completed', risk: 'medium' },
        { name: 'Анализ денежных потоков', status: 'pending', risk: 'medium' },
      ]
    },
    legal: {
      score: 92,
      items: [
        { name: 'Устав компании', status: 'completed', risk: 'low' },
        { name: 'Лицензии и разрешения', status: 'completed', risk: 'low' },
        { name: 'Патенты и IP', status: 'completed', risk: 'medium' },
        { name: 'Судебные разбирательства', status: 'completed', risk: 'low' },
      ]
    },
    team: {
      score: 78,
      items: [
        { name: 'Резюме ключевых сотрудников', status: 'completed', risk: 'low' },
        { name: 'Опыт команды в отрасли', status: 'completed', risk: 'medium' },
        { name: 'Предыдущие проекты', status: 'pending', risk: 'medium' },
        { name: 'Рекомендации', status: 'pending', risk: 'high' },
      ]
    },
    market: {
      score: 88,
      items: [
        { name: 'Анализ рынка', status: 'completed', risk: 'low' },
        { name: 'Конкурентный анализ', status: 'completed', risk: 'medium' },
        { name: 'Позиционирование продукта', status: 'completed', risk: 'low' },
        { name: 'Стратегия выхода на рынок', status: 'pending', risk: 'medium' },
      ]
    }
  };

  const riskAssessment = {
    overall: 86,
    factors: [
      { name: 'Финансовые риски', level: 'low', score: 85 },
      { name: 'Рыночные риски', level: 'medium', score: 72 },
      { name: 'Технологические риски', level: 'medium', score: 78 },
      { name: 'Операционные риски', level: 'low', score: 88 },
      { name: 'Регулятивные риски', level: 'low', score: 92 },
    ]
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low': return <Badge variant="secondary" className="bg-green-100 text-green-800">Низкий</Badge>;
      case 'medium': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Средний</Badge>;
      case 'high': return <Badge variant="destructive">Высокий</Badge>;
      default: return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Due Diligence: {projectTitle}
          </CardTitle>
          <CardDescription>
            Комплексная проверка инвестиционной привлекательности проекта
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="checklist">Чек-лист</TabsTrigger>
          <TabsTrigger value="risks">Риски</TabsTrigger>
          <TabsTrigger value="documents">Документы</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(dueDiligenceData).map(([category, data]) => (
              <Card key={category}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium capitalize">
                      {category === 'financials' ? 'Финансы' :
                       category === 'legal' ? 'Юридическое' :
                       category === 'team' ? 'Команда' : 'Рынок'}
                    </h3>
                    <span className="text-2xl font-bold">{data.score}%</span>
                  </div>
                  <Progress value={data.score} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {data.items.filter(item => item.status === 'completed').length} из {data.items.length} завершено
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ключевые показатели</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">86%</div>
                  <p className="text-sm text-muted-foreground">Общий рейтинг DD</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">4.2/5</div>
                  <p className="text-sm text-muted-foreground">Оценка команды</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
                  <p className="text-sm text-muted-foreground">Дней на проверку</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6">
          {Object.entries(dueDiligenceData).map(([category, data]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="capitalize">
                  {category === 'financials' ? 'Финансовая проверка' :
                   category === 'legal' ? 'Юридическая проверка' :
                   category === 'team' ? 'Проверка команды' : 'Рыночный анализ'}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Progress value={data.score} className="flex-1" />
                  <span className="text-sm font-medium">{data.score}%</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {item.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 border-2 border-muted-foreground rounded-full" />
                        )}
                        <span className={item.status === 'completed' ? 'line-through text-muted-foreground' : ''}>
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getRiskBadge(item.risk)}
                        {item.status === 'pending' && (
                          <Button variant="outline" size="sm">
                            Запросить
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Оценка рисков
              </CardTitle>
              <CardDescription>
                Анализ потенциальных рисков инвестиции
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-4xl font-bold mb-2">{riskAssessment.overall}%</div>
                  <p className="text-muted-foreground">Общий уровень надёжности</p>
                </div>
                
                {riskAssessment.factors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{factor.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={factor.score} className="flex-1 h-2" />
                        <span className="text-sm">{factor.score}%</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {getRiskBadge(factor.level)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Документооборот</CardTitle>
              <CardDescription>
                Статус получения и проверки документов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Презентация проекта', status: 'received', date: '2024-01-15' },
                  { name: 'Финансовая модель', status: 'received', date: '2024-01-16' },
                  { name: 'Юридическое заключение', status: 'pending', date: null },
                  { name: 'Техническая экспертиза', status: 'in_review', date: '2024-01-18' },
                  { name: 'Бизнес-план', status: 'received', date: '2024-01-14' },
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        {doc.date && (
                          <p className="text-xs text-muted-foreground">
                            Получено: {new Date(doc.date).toLocaleDateString('ru-RU')}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          doc.status === 'received' ? 'default' :
                          doc.status === 'in_review' ? 'secondary' : 'outline'
                        }
                      >
                        {doc.status === 'received' ? 'Получено' :
                         doc.status === 'in_review' ? 'На проверке' : 'Ожидается'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Открыть
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}