import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  HardHat, Wrench, DollarSign, CheckCircle, 
  Plus, Eye, Calendar, MapPin, Clock
} from 'lucide-react';

export default function ContractorDashboard() {
  const { user, profile } = useAuth();
  const { t, formatCurrency } = useLanguage();
  
  const [stats] = useState({
    activeContracts: 5,
    completedContracts: 28,
    totalEarnings: 1750000,
    averageRating: 4.9,
    onTimeDelivery: 96,
    equipmentUtilization: 78
  });

  const [activeContracts] = useState([
    {
      id: 1,
      title: 'Строительство торгового центра',
      client: 'СтройКомплекс',
      location: 'Москва, ул. Примерная 15',
      budget: 2500000,
      startDate: '2024-01-10',
      deadline: '2024-06-15',
      progress: 45,
      status: 'in-progress',
      type: 'construction',
      equipment: ['Экскаватор', 'Бетономешалка', 'Кран']
    },
    {
      id: 2,
      title: 'Ремонт дорожного покрытия',
      client: 'ГорДорСервис',
      location: 'Московская область',
      budget: 850000,
      startDate: '2024-02-01',
      deadline: '2024-04-30',
      progress: 70,
      status: 'in-progress',
      type: 'road-work',
      equipment: ['Асфальтоукладчик', 'Каток']
    },
    {
      id: 3,
      title: 'Монтаж инженерных систем',
      client: 'ТехМонтаж',
      location: 'Москва, БЦ Технопарк',
      budget: 650000,
      startDate: '2024-01-25',
      deadline: '2024-03-20',
      progress: 85,
      status: 'near-completion',
      type: 'engineering',
      equipment: ['Сварочный аппарат', 'Перфоратор']
    }
  ]);

  const [availableContracts] = useState([
    {
      id: 1,
      title: 'Строительство жилого комплекса',
      description: 'Возведение многоэтажного жилого дома с подземной парковкой',
      client: 'Жилстрой',
      location: 'Подмосковье',
      budget: 5500000,
      startDate: '2024-04-01',
      duration: '8 месяцев',
      skills: ['Бетонные работы', 'Кирпичная кладка', 'Монтаж конструкций'],
      equipmentRequired: ['Башенный кран', 'Бетононасос', 'Экскаватор']
    },
    {
      id: 2,
      title: 'Реконструкция промышленного здания',
      description: 'Капитальный ремонт и модернизация производственного цеха',
      client: 'ПромРемонт',
      location: 'Московская область',
      budget: 3200000,
      startDate: '2024-03-15',
      duration: '5 месяцев',
      skills: ['Демонтаж', 'Металлоконструкции', 'Кровельные работы'],
      equipmentRequired: ['Автокран', 'Погрузчик', 'Компрессор']
    }
  ]);

  const [equipment] = useState([
    {
      id: 1,
      name: 'Экскаватор CAT 320D',
      type: 'excavator',
      status: 'in-use',
      project: 'Торговый центр',
      dailyRate: 25000,
      lastMaintenance: '2024-01-15'
    },
    {
      id: 2,
      name: 'Башенный кран Liebherr',
      type: 'crane',
      status: 'available',
      project: null,
      dailyRate: 45000,
      lastMaintenance: '2024-01-20'
    },
    {
      id: 3,
      name: 'Бетономешалка Schwing',
      type: 'mixer',
      status: 'maintenance',
      project: null,
      dailyRate: 18000,
      lastMaintenance: '2024-02-01'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-500';
      case 'near-completion': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress': return 'В работе';
      case 'near-completion': return 'Близко к завершению';
      case 'completed': return 'Завершен';
      case 'delayed': return 'Просрочен';
      default: return 'Неизвестно';
    }
  };

  const getEquipmentStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'in-use': return 'bg-blue-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'repair': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getEquipmentStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Доступно';
      case 'in-use': return 'Используется';
      case 'maintenance': return 'ТО';
      case 'repair': return 'Ремонт';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Панель подрядчика</h1>
            <p className="text-muted-foreground">
              {t('common.welcome')}, {profile?.first_name || 'Подрядчик'}
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Новый договор
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Активных договоров</p>
                  <p className="text-3xl font-bold">{stats.activeContracts}</p>
                </div>
                <HardHat className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Завершено договоров</p>
                  <p className="text-3xl font-bold">{stats.completedContracts}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

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
                  <p className="text-sm font-medium text-muted-foreground">Рейтинг качества</p>
                  <p className="text-3xl font-bold">{stats.averageRating}</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.onTimeDelivery}% в срок
                  </p>
                </div>
                <Wrench className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="contracts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contracts">
              <HardHat className="h-4 w-4 mr-2" />
              Договоры
            </TabsTrigger>
            <TabsTrigger value="opportunities">
              <Eye className="h-4 w-4 mr-2" />
              Возможности
            </TabsTrigger>
            <TabsTrigger value="equipment">
              <Wrench className="h-4 w-4 mr-2" />
              Оборудование
            </TabsTrigger>
            <TabsTrigger value="schedule">
              <Calendar className="h-4 w-4 mr-2" />
              Расписание
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contracts">
            <div className="space-y-4">
              {activeContracts.map((contract) => (
                <Card key={contract.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{contract.title}</CardTitle>
                        <CardDescription>
                          <div className="flex items-center gap-2 mt-1">
                            <span>Клиент: {contract.client}</span>
                            <span>•</span>
                            <MapPin className="h-4 w-4" />
                            <span>{contract.location}</span>
                          </div>
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(contract.status)}>
                        {getStatusText(contract.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Бюджет</p>
                          <p className="font-medium">{formatCurrency(contract.budget)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Начало</p>
                          <p className="font-medium">{new Date(contract.startDate).toLocaleDateString('ru-RU')}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Дедлайн</p>
                          <p className="font-medium">{new Date(contract.deadline).toLocaleDateString('ru-RU')}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Тип работ</p>
                          <p className="font-medium">{contract.type}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Прогресс выполнения</span>
                          <span>{contract.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${contract.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Используемое оборудование:</p>
                        <div className="flex flex-wrap gap-2">
                          {contract.equipment.map((item, index) => (
                            <Badge key={index} variant="secondary">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Подробнее
                        </Button>
                        <Button size="sm">
                          Управление
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          График
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="opportunities">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Доступные тендеры</CardTitle>
                  <CardDescription>Новые возможности для участия в проектах</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {availableContracts.map((opportunity) => (
                      <Card key={opportunity.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                              <CardDescription>{opportunity.description}</CardDescription>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">{formatCurrency(opportunity.budget)}</p>
                              <p className="text-sm text-muted-foreground">{opportunity.duration}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Клиент</p>
                                <p className="font-medium">{opportunity.client}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Локация</p>
                                <p className="font-medium">{opportunity.location}</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm text-muted-foreground mb-2">Требуемые навыки:</p>
                              <div className="flex flex-wrap gap-2">
                                {opportunity.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="text-sm text-muted-foreground mb-2">Необходимое оборудование:</p>
                              <div className="flex flex-wrap gap-2">
                                {opportunity.equipmentRequired.map((equipment, index) => (
                                  <Badge key={index} variant="outline">
                                    {equipment}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Подробнее
                              </Button>
                              <Button size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Подать заявку
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="equipment">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Парк оборудования</CardTitle>
                  <CardDescription>Управление техникой и оборудованием</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {equipment.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Wrench className="h-8 w-8 text-primary" />
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.project ? `Проект: ${item.project}` : 'Не назначено'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Ставка/день</p>
                          <p className="font-medium">{formatCurrency(item.dailyRate)}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Последнее ТО</p>
                          <p className="font-medium text-sm">
                            {new Date(item.lastMaintenance).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={getEquipmentStatusColor(item.status)}>
                            {getEquipmentStatusText(item.status)}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Календарь проектов</CardTitle>
                <CardDescription>Планирование и учет рабочего времени</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Календарь и система планирования будут реализованы в следующих версиях.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}