import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Handshake, DollarSign, Users, TrendingUp, 
  Plus, Eye, Link, Share2, BarChart3, MessageSquare
} from 'lucide-react';
import { MessagesTab } from '@/components/MessagesTab';

export default function PartnerDashboard() {
  const { user, profile } = useAuth();
  const { t, formatCurrency } = useLanguage();
  
  const [stats] = useState({
    totalEarnings: 485000,
    referrals: 24,
    conversionRate: 18.5,
    activePartners: 6,
    monthlyCommission: 85000,
    tierLevel: 'Gold'
  });

  const [referralStats] = useState([
    {
      period: 'Этот месяц',
      referrals: 8,
      conversions: 3,
      earnings: 45000,
      conversionRate: 37.5
    },
    {
      period: 'Прошлый месяц', 
      referrals: 12,
      conversions: 4,
      earnings: 52000,
      conversionRate: 33.3
    },
    {
      period: 'За квартал',
      referrals: 35,
      conversions: 12,
      earnings: 155000,
      conversionRate: 34.3
    }
  ]);

  const [partnerTools] = useState([
    {
      title: 'Реферальная ссылка',
      description: 'Персональная ссылка для привлечения участников',
      link: 'https://investex.com/ref/partner123',
      clicks: 145,
      conversions: 8
    },
    {
      title: 'Промо-материалы',
      description: 'Баннеры, презентации и маркетинговые материалы',
      assets: 12,
      downloads: 34
    },
    {
      title: 'API интеграция',
      description: 'Интеграция партнерских функций в ваш сайт',
      status: 'active',
      requests: 2450
    }
  ]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Партнерский кабинет</h1>
            <p className="text-muted-foreground">
              {t('common.welcome')}, {profile?.first_name || 'Партнер'} • Уровень: {stats.tierLevel}
            </p>
          </div>
          <Button>
            <Share2 className="h-4 w-4 mr-2" />
            Поделиться ссылкой
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Общий доход</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.totalEarnings)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Рефералов</p>
                  <p className="text-3xl font-bold">{stats.referrals}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Конверсия</p>
                  <p className="text-3xl font-bold">{stats.conversionRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">За месяц</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.monthlyCommission)}</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.activePartners} активных партнеров
                  </p>
                </div>
                <Handshake className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">
              <BarChart3 className="h-4 w-4 mr-2" />
              {t('common.dashboard')}
            </TabsTrigger>
            <TabsTrigger value="tools">
              <Link className="h-4 w-4 mr-2" />
              Инструменты
            </TabsTrigger>
            <TabsTrigger value="referrals">
              <Users className="h-4 w-4 mr-2" />
              Рефералы
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              {t('common.messages')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Статистика по периодам</CardTitle>
                  <CardDescription>Динамика партнерских доходов</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {referralStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{stat.period}</h3>
                          <p className="text-sm text-muted-foreground">
                            {stat.referrals} рефералов • {stat.conversions} конверсий
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(stat.earnings)}</p>
                          <p className="text-sm text-muted-foreground">
                            {stat.conversionRate}% конверсия
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Партнерский уровень</CardTitle>
                  <CardDescription>Ваши достижения и бонусы</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Текущий уровень</span>
                      <Badge className="bg-yellow-500">Gold Partner</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Прогресс до Platinum</span>
                        <span>75/100 рефералов</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      До следующего уровня: 25 рефералов
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools">
            <div className="space-y-4">
              {partnerTools.map((tool, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tool.link && (
                        <div className="p-3 bg-gray-50 rounded-md">
                          <p className="text-sm font-mono">{tool.link}</p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline">
                              Копировать
                            </Button>
                            <Button size="sm" variant="outline">
                              <Share2 className="h-4 w-4 mr-1" />
                              Поделиться
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        {tool.clicks && (
                          <div>
                            <p className="text-muted-foreground">Переходы</p>
                            <p className="font-medium">{tool.clicks}</p>
                          </div>
                        )}
                        {tool.conversions && (
                          <div>
                            <p className="text-muted-foreground">Конверсии</p>
                            <p className="font-medium">{tool.conversions}</p>
                          </div>
                        )}
                        {tool.assets && (
                          <div>
                            <p className="text-muted-foreground">Материалов</p>
                            <p className="font-medium">{tool.assets}</p>
                          </div>
                        )}
                        {tool.downloads && (
                          <div>
                            <p className="text-muted-foreground">Скачиваний</p>
                            <p className="font-medium">{tool.downloads}</p>
                          </div>
                        )}
                        {tool.requests && (
                          <div>
                            <p className="text-muted-foreground">API запросов</p>
                            <p className="font-medium">{tool.requests}</p>
                          </div>
                        )}
                        {tool.status && (
                          <div>
                            <p className="text-muted-foreground">Статус</p>
                            <Badge variant={tool.status === 'active' ? 'default' : 'secondary'}>
                              {tool.status === 'active' ? 'Активно' : 'Неактивно'}
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Подробнее
                        </Button>
                        <Button size="sm">
                          Настроить
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="referrals">
            <Card>
              <CardHeader>
                <CardTitle>Реферальная сеть</CardTitle>
                <CardDescription>Ваши приглашенные участники и их активность</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Детальная информация о рефералах будет добавлена в следующих версиях.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <MessagesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}