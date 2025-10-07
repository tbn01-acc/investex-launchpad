import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Brain, DollarSign, Star, Clock, 
  Plus, Eye, Search, Target, Award, MessageSquare
} from 'lucide-react';
import { MessagesTab } from '@/components/MessagesTab';

export default function ExpertDashboard() {
  const { user, profile } = useAuth();
  const { t, formatCurrency } = useLanguage();
  
  const [stats] = useState({
    consultations: 45,
    totalEarnings: 1250000,
    averageRating: 4.9,
    activeClients: 8,
    hoursConsulted: 340,
    expertiseAreas: 5
  });

  const [activeConsultations] = useState([
    {
      id: 1,
      title: 'Стратегия цифровой трансформации',
      client: 'ТехноИнновации',
      rate: 8000,
      hoursBooked: 20,
      deadline: '2024-03-15',
      status: 'in-progress',
      expertiseArea: 'Digital Strategy'
    },
    {
      id: 2,
      title: 'Аудит ИТ-архитектуры',
      client: 'МегаКорп',
      rate: 6500,
      hoursBooked: 15,
      deadline: '2024-02-28',
      status: 'review',
      expertiseArea: 'IT Architecture'
    }
  ]);

  const [expertiseAreas] = useState([
    'Digital Transformation',
    'IT Strategy', 
    'Business Process Optimization',
    'Technology Assessment',
    'Digital Innovation'
  ]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Кабинет эксперта</h1>
            <p className="text-muted-foreground">
              {t('common.welcome')}, {profile?.first_name || 'Эксперт'}
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Новая консультация
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Консультаций</p>
                  <p className="text-3xl font-bold">{stats.consultations}</p>
                </div>
                <Brain className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Заработано</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Рейтинг</p>
                  <p className="text-3xl font-bold">{stats.averageRating}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(stats.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Часов консультаций</p>
                  <p className="text-3xl font-bold">{stats.hoursConsulted}</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.activeClients} активных клиентов
                  </p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="consultations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="consultations">
              <Brain className="h-4 w-4 mr-2" />
              Консультации
            </TabsTrigger>
            <TabsTrigger value="expertise">
              <Award className="h-4 w-4 mr-2" />
              Экспертиза
            </TabsTrigger>
            <TabsTrigger value="opportunities">
              <Search className="h-4 w-4 mr-2" />
              Возможности
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              {t('common.messages')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consultations">
            <div className="space-y-4">
              {activeConsultations.map((consultation) => (
                <Card key={consultation.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{consultation.title}</CardTitle>
                        <CardDescription>Клиент: {consultation.client}</CardDescription>
                      </div>
                      <Badge variant={consultation.status === 'in-progress' ? 'default' : 'secondary'}>
                        {consultation.status === 'in-progress' ? 'В работе' : 'На проверке'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Ставка</p>
                          <p className="font-medium">{formatCurrency(consultation.rate)}/час</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Часов забронировано</p>
                          <p className="font-medium">{consultation.hoursBooked} ч</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Дедлайн</p>
                          <p className="font-medium">{new Date(consultation.deadline).toLocaleDateString('ru-RU')}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Область</p>
                          <p className="font-medium">{consultation.expertiseArea}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Подробнее
                        </Button>
                        <Button size="sm">
                          Продолжить консультацию
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="expertise">
            <Card>
              <CardHeader>
                <CardTitle>Области экспертизы</CardTitle>
                <CardDescription>Ваши профессиональные компетенции</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {expertiseAreas.map((area, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {area}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Статистика по областям</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Digital Transformation</span>
                          <span className="font-medium">15 проектов</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">IT Strategy</span>
                          <span className="font-medium">12 проектов</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Business Process</span>
                          <span className="font-medium">8 проектов</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Рейтинги по областям</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Digital Transformation</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm font-medium">4.9</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">IT Strategy</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm font-medium">4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities">
            <Card>
              <CardHeader>
                <CardTitle>Новые возможности</CardTitle>
                <CardDescription>Запросы на экспертные консультации</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Система поиска экспертных возможностей будет добавлена в следующих версиях.
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