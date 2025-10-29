import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessagesTab } from '@/components/MessagesTab';
import { RoleSelector } from '@/components/RoleSelector';
import { FranchiseeAnalytics } from '@/components/analytics/FranchiseeAnalytics';
import { 
  Store, TrendingUp, Calendar, MessageSquare, 
  FileText, Settings, BookOpen, HelpCircle
} from 'lucide-react';

export default function FranchiseeDashboard() {
  const { user, profile } = useAuth();
  const { t, formatCurrency } = useLanguage();

  const [locations] = useState([
    {
      id: 1,
      name: 'Точка #1 - Москва',
      address: 'ул. Тверская, 12',
      status: 'active',
      monthlyRevenue: 3800000,
      openedDate: '2023-01-15',
      paybackMonths: 14,
      paybackComplete: true
    },
    {
      id: 2,
      name: 'Точка #2 - Санкт-Петербург',
      address: 'Невский пр., 45',
      status: 'active',
      monthlyRevenue: 2900000,
      openedDate: '2023-06-01',
      paybackMonths: 16,
      paybackComplete: false
    },
    {
      id: 3,
      name: 'Точка #3 - Казань',
      address: 'ул. Баумана, 28',
      status: 'growing',
      monthlyRevenue: 1500000,
      openedDate: '2024-08-20',
      paybackMonths: 18,
      paybackComplete: false
    }
  ]);

  const [support] = useState([
    {
      id: 1,
      category: 'Обучение персонала',
      lastUpdate: '2024-02-01',
      status: 'completed',
      description: 'Онбординг 3 новых сотрудников'
    },
    {
      id: 2,
      category: 'Маркетинговая поддержка',
      lastUpdate: '2024-02-10',
      status: 'in-progress',
      description: 'Запуск рекламной кампании в Казани'
    },
    {
      id: 3,
      category: 'Операционная помощь',
      lastUpdate: '2024-02-08',
      status: 'pending',
      description: 'Оптимизация цепочки поставок'
    }
  ]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Store className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Кабинет Франчайзи</h1>
              <p className="text-muted-foreground">
                {t('common.welcome')}, {profile?.first_name || 'Франчайзи'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">
              <Store className="h-4 w-4 mr-2" />
              {t('role.franchisee')}
            </Badge>
            <Button>
              Открыть новую точку
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="dashboard">
              <TrendingUp className="h-4 w-4 mr-2" />
              {t('common.dashboard')}
            </TabsTrigger>
            <TabsTrigger value="locations">
              <Store className="h-4 w-4 mr-2" />
              Локации
            </TabsTrigger>
            <TabsTrigger value="support">
              <HelpCircle className="h-4 w-4 mr-2" />
              Поддержка
            </TabsTrigger>
            <TabsTrigger value="knowledge">
              <BookOpen className="h-4 w-4 mr-2" />
              База знаний
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              {t('common.messages')}
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              {t('common.settings')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <FranchiseeAnalytics />
          </TabsContent>

          <TabsContent value="locations">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Мои точки</CardTitle>
                  <CardDescription>Управление вашими локациями</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {locations.map((location) => (
                    <Card key={location.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{location.name}</h3>
                            <p className="text-sm text-muted-foreground">{location.address}</p>
                          </div>
                          <Badge variant={location.status === 'active' ? 'default' : 'secondary'}>
                            {location.status === 'active' ? 'Активна' : 'Растёт'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Месячная выручка</p>
                            <p className="font-semibold">{formatCurrency(location.monthlyRevenue)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Дата открытия</p>
                            <p className="font-semibold">{new Date(location.openedDate).toLocaleDateString('ru-RU')}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Окупаемость</p>
                            <p className="font-semibold">
                              {location.paybackComplete ? (
                                <span className="text-green-600">Окупилась ({location.paybackMonths} мес)</span>
                              ) : (
                                `${location.paybackMonths} месяцев`
                              )}
                            </p>
                          </div>
                          <div>
                            <Button variant="outline" size="sm" className="w-full">
                              Подробнее
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle>Поддержка франчайзера</CardTitle>
                <CardDescription>Текущие запросы и помощь</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {support.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{item.category}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Badge 
                          variant={
                            item.status === 'completed' ? 'default' : 
                            item.status === 'in-progress' ? 'secondary' : 
                            'outline'
                          }
                        >
                          {item.status === 'completed' ? 'Завершено' : 
                           item.status === 'in-progress' ? 'В процессе' : 
                           'Ожидает'}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-xs text-muted-foreground">
                          Обновлено: {new Date(item.lastUpdate).toLocaleDateString('ru-RU')}
                        </p>
                        <Button variant="ghost" size="sm">
                          Детали
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Запросить поддержку
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge">
            <Card>
              <CardHeader>
                <CardTitle>База знаний франшизы</CardTitle>
                <CardDescription>Документы, обучающие материалы и инструкции</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Операционные стандарты', icon: FileText, docs: 12 },
                    { title: 'Маркетинговые материалы', icon: FileText, docs: 8 },
                    { title: 'Обучение персонала', icon: BookOpen, docs: 15 },
                    { title: 'Финансовая отчетность', icon: FileText, docs: 6 }
                  ].map((category, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <category.icon className="h-8 w-8 text-primary" />
                          <div>
                            <h3 className="font-semibold">{category.title}</h3>
                            <p className="text-sm text-muted-foreground">{category.docs} документов</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <MessagesTab />
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <RoleSelector />
              <Card>
                <CardHeader>
                  <CardTitle>Настройки профиля</CardTitle>
                  <CardDescription>Управление данными и уведомлениями</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Настройки профиля доступны в разделе <a href="/profile" className="text-primary hover:underline">Профиль</a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
