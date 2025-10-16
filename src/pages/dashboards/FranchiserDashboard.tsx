import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FranchiseModal from '@/components/FranchiseModal';
import { RoleSelector } from '@/components/RoleSelector';
import { CheckCircle, Users, Store, LineChart, Settings } from 'lucide-react';

const MetricCard = ({ title, value, hint }: { title: string; value: string; hint?: string }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
      {hint && <div className="text-xs text-muted-foreground mt-2">{hint}</div>}
    </CardContent>
  </Card>
);

const FranchiserDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 space-y-8">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Личный кабинет Франчайзера</h1>
              <p className="text-muted-foreground">Управляйте франшизами, сетью и заявками в одном месте</p>
            </div>
            <Button className="md:w-auto w-full" onClick={() => setIsModalOpen(true)}>
              Создать франшизу
            </Button>
          </header>

          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard title="Активные франшизы" value="4" hint="в каталоге" />
              <MetricCard title="Заявки франчайзи" value="23" hint="за 30 дней" />
              <MetricCard title="Подключенные точки" value="18" hint="в 7 городах" />
              <MetricCard title="Средний чек" value="420 000₽" hint="по сети" />
            </div>
          </section>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full">
              <TabsTrigger value="overview"><LineChart className="h-4 w-4 mr-2" />Обзор</TabsTrigger>
              <TabsTrigger value="network"><Users className="h-4 w-4 mr-2" />Сеть</TabsTrigger>
              <TabsTrigger value="leads"><Store className="h-4 w-4 mr-2" />Лиды</TabsTrigger>
              <TabsTrigger value="finance"><CheckCircle className="h-4 w-4 mr-2" />Финансы</TabsTrigger>
              <TabsTrigger value="tools"><Settings className="h-4 w-4 mr-2" />Инструменты</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Динамика сети</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-sm font-medium text-muted-foreground mb-2">Рост заявок</div>
                        <div className="text-3xl font-bold text-green-600">+38%</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-sm font-medium text-muted-foreground mb-2">Конверсия в сделку</div>
                        <div className="text-3xl font-bold">12%</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-sm font-medium text-muted-foreground mb-2">Срок окупаемости</div>
                        <div className="text-3xl font-bold">14 мес</div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Последние заявки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[{city:'Москва', budget:'6.5 млн₽'}, {city:'Казань', budget:'3.2 млн₽'}, {city:'Екатеринбург', budget:'4.1 млн₽'}].map((lead, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Заявка на франшизу • {lead.city}</div>
                        <div className="text-sm text-muted-foreground">Бюджет: {lead.budget}</div>
                      </div>
                      <Badge variant="secondary">Новый</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="network">
              <Card>
                <CardHeader>
                  <CardTitle>Управление сетью</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="p-4 border rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">Точка #{i}</div>
                        <Badge>Активна</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Город: Санкт-Петербург</div>
                      <div className="text-sm text-muted-foreground">Оборот (мес): 2.1 млн₽</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leads">
              <Card>
                <CardHeader>
                  <CardTitle>Лиды франчайзи</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-3">Интеграция с CRM для автоматической обработки заявок</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-sm font-medium text-muted-foreground mb-2">Новые за 7 дней</div>
                        <div className="text-3xl font-bold">12</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-sm font-medium text-muted-foreground mb-2">В работе</div>
                        <div className="text-3xl font-bold">31</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-sm font-medium text-muted-foreground mb-2">Закрыто</div>
                        <div className="text-3xl font-bold text-green-600">7</div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="finance">
              <Card>
                <CardHeader>
                  <CardTitle>Финансы сети</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-sm font-medium text-muted-foreground mb-2">Роялти (мес)</div>
                      <div className="text-2xl font-bold">3.8 млн₽</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-sm font-medium text-muted-foreground mb-2">Маркетинг (мес)</div>
                      <div className="text-2xl font-bold">1.1 млн₽</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-sm font-medium text-muted-foreground mb-2">Чистая прибыль (мес)</div>
                      <div className="text-2xl font-bold text-green-600">2.2 млн₽</div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tools">
              <div className="space-y-6">
                <RoleSelector />
                <Card>
                  <CardHeader>
                    <CardTitle>Инструменты франчайзера</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-xl hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="font-semibold mb-1">Конструктор франшиз</div>
                      <div className="text-sm text-muted-foreground mb-3">Шаблоны договоров, чек-листы, требования, P&L</div>
                      <Button variant="outline" size="sm">Открыть</Button>
                    </div>
                    <div className="p-4 border rounded-xl hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="font-semibold mb-1">AI-подбор франчайзи</div>
                      <div className="text-sm text-muted-foreground mb-3">Оценка лидов и автоматический скоринг кандидатов</div>
                      <Button variant="outline" size="sm">Запустить</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      <FranchiseModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default FranchiserDashboard;
