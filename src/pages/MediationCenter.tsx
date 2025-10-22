import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Scale, FileText, Users, CheckCircle2, AlertCircle, Clock, DollarSign } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const MediationCenter = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    disputeType: '',
    description: ''
  });

  const disputeTypes = [
    {
      title: 'Споры между инвестором и стартапом',
      description: 'Разногласия по условиям сделки, отчетности, выходам',
      icon: <DollarSign className="h-6 w-6" />,
      examples: ['Несоблюдение условий инвестиционного договора', 'Споры о валюации', 'Конфликты при выходе']
    },
    {
      title: 'Споры между ко-фаундерами',
      description: 'Конфликты по распределению долей, ролей, принятию решений',
      icon: <Users className="h-6 w-6" />,
      examples: ['Распределение equity', 'Разделение обязанностей', 'Выход из проекта']
    },
    {
      title: 'Договорные споры',
      description: 'Разногласия по коммерческим контрактам, NDA, IP',
      icon: <FileText className="h-6 w-6" />,
      examples: ['Нарушение NDA', 'IP права', 'Условия контрактов']
    }
  ];

  const mediationProcess = [
    { step: 1, title: 'Подача заявки', description: 'Одна из сторон подает запрос на медиацию', icon: <FileText /> },
    { step: 2, title: 'Выбор медиатора', description: 'Стороны согласовывают кандидатуру медиатора', icon: <Users /> },
    { step: 3, title: 'Предварительная встреча', description: 'Медиатор встречается с каждой стороной отдельно', icon: <Clock /> },
    { step: 4, title: 'Совместная сессия', description: 'Переговоры с участием всех сторон', icon: <Scale /> },
    { step: 5, title: 'Соглашение', description: 'Достижение и оформление договоренностей', icon: <CheckCircle2 /> }
  ];

  const mediators = [
    { name: 'Андрей Волков', specialization: 'Инвестиционные споры', cases: 50, rating: 4.9 },
    { name: 'Мария Соколова', specialization: 'Корпоративные конфликты', cases: 45, rating: 4.8 },
    { name: 'Дмитрий Орлов', specialization: 'Договорное право', cases: 60, rating: 4.9 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена",
      description: "Мы свяжемся с вами в течение 24 часов",
    });
    setFormData({ name: '', email: '', disputeType: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-base px-4 py-2">
              <Scale className="h-4 w-4 mr-2 inline" />
              РАЗРЕШЕНИЕ СПОРОВ
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Центр медиации
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Профессиональное разрешение споров между участниками экосистемы. Быстро, конфиденциально, эффективно.
            </p>
          </div>

          {/* Почему медиация */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl">Почему медиация?</CardTitle>
              <CardDescription className="text-base">
                Альтернатива долгим и дорогим судебным разбирательствам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Быстро</h3>
                  <p className="text-sm text-muted-foreground">Средний срок разрешения спора - 2-4 недели</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Экономично</h3>
                  <p className="text-sm text-muted-foreground">В 5-10 раз дешевле судебных процессов</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Конфиденциально</h3>
                  <p className="text-sm text-muted-foreground">Полная конфиденциальность процесса</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Эффективно</h3>
                  <p className="text-sm text-muted-foreground">85% споров разрешаются успешно</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Типы споров */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Типы споров</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {disputeTypes.map((type, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                      {type.icon}
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold mb-2">Примеры:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {type.examples.map((example, i) => (
                        <li key={i}>• {example}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Процесс медиации */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl">Процесс медиации</CardTitle>
              <CardDescription>5 этапов разрешения спора</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mediationProcess.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Медиаторы */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Наши медиаторы</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {mediators.map((mediator, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{mediator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{mediator.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{mediator.specialization}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Кейсов:</span>
                      <span className="font-semibold">{mediator.cases}+</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-muted-foreground">Рейтинг:</span>
                      <span className="font-semibold">{mediator.rating} / 5.0</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Стоимость */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl">Стоимость услуг</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Базовая</CardTitle>
                    <p className="text-3xl font-bold text-primary">$1,500</p>
                    <CardDescription>Споры до $50K</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>✓ До 3 сессий</p>
                    <p>✓ Онлайн формат</p>
                    <p>✓ Базовая документация</p>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <Badge className="mb-2">Популярно</Badge>
                    <CardTitle>Стандартная</CardTitle>
                    <p className="text-3xl font-bold text-primary">$3,500</p>
                    <CardDescription>Споры $50K-$500K</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>✓ До 5 сессий</p>
                    <p>✓ Онлайн + офлайн</p>
                    <p>✓ Полная документация</p>
                    <p>✓ Юридическая экспертиза</p>
                  </CardContent>
                </Card>
                
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Премиум</CardTitle>
                    <p className="text-3xl font-bold text-primary">От $7,000</p>
                    <CardDescription>Споры от $500K</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>✓ Неограниченные сессии</p>
                    <p>✓ Любой формат</p>
                    <p>✓ Полное сопровождение</p>
                    <p>✓ Команда экспертов</p>
                    <p>✓ Постмедиационная поддержка</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Форма запроса */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Запросить медиацию</CardTitle>
              <CardDescription className="text-center">
                Заполните форму, и мы свяжемся с вами в течение 24 часов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Ваше имя *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="disputeType">Тип спора *</Label>
                  <Input
                    id="disputeType"
                    value={formData.disputeType}
                    onChange={(e) => setFormData({...formData, disputeType: e.target.value})}
                    placeholder="Например: спор между инвестором и стартапом"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Описание ситуации *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Кратко опишите суть спора"
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full">
                  Отправить запрос
                </Button>
                
                <p className="text-sm text-center text-muted-foreground">
                  Все запросы обрабатываются конфиденциально
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MediationCenter;
