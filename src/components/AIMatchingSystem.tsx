import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Target, TrendingUp, Users, Lightbulb, Star } from 'lucide-react';

const AIMatchingSystem = () => {
  const [activeTab, setActiveTab] = useState('investor-project');

  const investorMatches = [
    {
      projectTitle: 'FinTech P2P платформа',
      matchScore: 94,
      reasons: ['FinTech фокус', 'Размер инвестиции', 'Стадия развития', 'Команда'],
      fundingAmount: '15 млн ₽',
      industry: 'FinTech',
      stage: 'Seed',
      riskLevel: 'medium'
    },
    {
      projectTitle: 'AI EdTech решение',
      matchScore: 87,
      reasons: ['AI технологии', 'Образовательный сектор', 'Рост выручки'],
      fundingAmount: '8 млн ₽',
      industry: 'EdTech',
      stage: 'Pre-seed',
      riskLevel: 'low'
    }
  ];

  const teamMatches = [
    {
      name: 'Алексей Петров',
      role: 'Frontend Developer',
      matchScore: 92,
      skills: ['React', 'TypeScript', 'Next.js'],
      experience: '5 лет',
      availability: 'full-time',
      rate: '150к ₽/мес'
    },
    {
      name: 'Мария Сидорова',
      role: 'UI/UX Designer',
      matchScore: 88,
      skills: ['Figma', 'User Research', 'Design Systems'],
      experience: '4 года',
      availability: 'part-time',
      rate: '80к ₽/мес'
    }
  ];

  const marketInsights = [
    {
      title: 'FinTech сектор растет',
      description: 'Инвестиции в FinTech выросли на 45% за последний квартал',
      trend: 'up',
      impact: 'high'
    },
    {
      title: 'AI стартапы в тренде',
      description: 'Спрос на AI решения увеличился в 3 раза',
      trend: 'up',
      impact: 'high'
    },
    {
      title: 'Средний чек растет',
      description: 'Размер инвестиций увеличился на 20%',
      trend: 'up',
      impact: 'medium'
    }
  ];

  const recommendations = [
    {
      type: 'investment',
      title: 'Диверсифицируйте портфель',
      description: 'Рассмотрите добавление GreenTech проектов для снижения рисков',
      priority: 'high',
      action: 'Смотреть проекты'
    },
    {
      type: 'networking',
      title: 'Новые контакты',
      description: 'Найдено 5 потенциальных ко-инвесторов с похожими интересами',
      priority: 'medium',
      action: 'Посмотреть'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Система подбора
          </CardTitle>
          <CardDescription>
            Интеллектуальный анализ совместимости инвесторов, проектов и команд
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="investor-project">Инвестор-Проект</TabsTrigger>
          <TabsTrigger value="team-building">Построение команд</TabsTrigger>
          <TabsTrigger value="market-insights">Анализ рынка</TabsTrigger>
          <TabsTrigger value="recommendations">Рекомендации</TabsTrigger>
        </TabsList>

        <TabsContent value="investor-project" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Рекомендованные проекты</CardTitle>
              <CardDescription>На основе вашего инвестиционного профиля</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {investorMatches.map((match, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{match.projectTitle}</h4>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{match.industry}</Badge>
                        <Badge variant="outline">{match.stage}</Badge>
                        <Badge className={`${getRiskColor(match.riskLevel)} text-white`}>
                          {match.riskLevel} риск
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(match.matchScore)}`}>
                        {match.matchScore}%
                      </div>
                      <div className="text-sm text-muted-foreground">совпадение</div>
                    </div>
                  </div>
                  
                  <Progress value={match.matchScore} className="h-2" />
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Причины совпадения:</div>
                    <div className="flex gap-2 flex-wrap">
                      {match.reasons.map((reason, i) => (
                        <Badge key={i} variant="secondary">{reason}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Требуется: {match.fundingAmount}
                    </div>
                    <Button size="sm">Изучить проект</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team-building" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Рекомендованные специалисты</CardTitle>
              <CardDescription>Идеальные кандидаты для вашего проекта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMatches.map((match, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{match.name}</h4>
                      <p className="text-muted-foreground">{match.role}</p>
                      <div className="flex gap-2 mt-2">
                        {match.skills.map((skill, i) => (
                          <Badge key={i} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(match.matchScore)}`}>
                        {match.matchScore}%
                      </div>
                      <div className="text-sm text-muted-foreground">совпадение</div>
                    </div>
                  </div>
                  
                  <Progress value={match.matchScore} className="h-2" />
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Опыт: </span>
                      <span className="font-medium">{match.experience}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Занятость: </span>
                      <span className="font-medium">{match.availability}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Ставка: </span>
                      <span className="font-medium">{match.rate}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button size="sm">Связаться</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market-insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Инсайты рынка
              </CardTitle>
              <CardDescription>AI-анализ трендов и возможностей</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketInsights.map((insight, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${insight.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                      <TrendingUp className={`h-4 w-4 ${insight.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p className="text-muted-foreground text-sm mt-1">{insight.description}</p>
                      <Badge variant="outline" className="mt-2">
                        {insight.impact} влияние
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Персональные рекомендации
              </CardTitle>
              <CardDescription>AI предложения для улучшения результатов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{rec.title}</h4>
                        <Badge variant={rec.priority === 'high' ? 'destructive' : 'secondary'}>
                          {rec.priority} приоритет
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">{rec.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {rec.action}
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

export default AIMatchingSystem;