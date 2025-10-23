import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Award, Target, BarChart3, Zap, CheckCircle2 } from 'lucide-react';

const IVIIndex = () => {
  const criteria = [
    { name: 'Команда', weight: '30%', icon: <Award className="h-5 w-5" />, color: 'text-blue-500' },
    { name: 'Продукт', weight: '25%', icon: <Zap className="h-5 w-5" />, color: 'text-purple-500' },
    { name: 'Рынок', weight: '20%', icon: <Target className="h-5 w-5" />, color: 'text-green-500' },
    { name: 'Финансы', weight: '15%', icon: <BarChart3 className="h-5 w-5" />, color: 'text-orange-500' },
    { name: 'Тяга (Traction)', weight: '10%', icon: <TrendingUp className="h-5 w-5" />, color: 'text-red-500' }
  ];

  const benefits = [
    'Объективная оценка потенциала стартапа',
    'Повышение доверия инвесторов',
    'Бенчмаркинг с конкурентами',
    'Выявление слабых мест для улучшения',
    'Повышение видимости на платформе',
    'Доступ к закрытым инвестиционным пулам'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-base px-4 py-2">
              <TrendingUp className="h-4 w-4 mr-2 inline" />
              IVI INDEX
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              InvestEx Value Index
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Универсальный показатель инвестиционной привлекательности стартапа, разработанный командой Invest-Ex
            </p>
          </div>

          <Tabs defaultValue="methodology" className="w-full">
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full mb-8 gap-2 h-auto p-2">
              <TabsTrigger value="methodology">Методология</TabsTrigger>
              <TabsTrigger value="criteria">Критерии оценки</TabsTrigger>
              <TabsTrigger value="benefits">Преимущества</TabsTrigger>
              <TabsTrigger value="calculate">Получить оценку</TabsTrigger>
            </TabsList>

            {/* Методология */}
            <TabsContent value="methodology" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">Что такое IVI индекс?</CardTitle>
                  <CardDescription className="text-lg">
                    IVI (InvestEx Value Index) - это комплексный показатель от 0 до 100, который оценивает инвестиционную привлекательность стартапа на основе 5 ключевых параметров
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-green-50 border-green-200">
                      <CardHeader>
                        <CardTitle className="text-green-700 text-lg">80-100</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Отличный показатель, высокий интерес инвесторов</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-yellow-50 border-yellow-200">
                      <CardHeader>
                        <CardTitle className="text-yellow-700 text-lg">60-79</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Хороший показатель, можно улучшить</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-red-50 border-red-200">
                      <CardHeader>
                        <CardTitle className="text-red-700 text-lg">0-59</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Требуется улучшение показателей</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="prose max-w-none">
                    <h3 className="text-2xl font-semibold mb-4">Формула расчета</h3>
                    <div className="bg-muted p-6 rounded-lg font-mono text-center">
                      IVI = (Команда × 0.3) + (Продукт × 0.25) + (Рынок × 0.2) + (Финансы × 0.15) + (Traction × 0.1)
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Критерии оценки */}
            <TabsContent value="criteria" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {criteria.map((criterion, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className={criterion.color}>{criterion.icon}</div>
                        <Badge variant="secondary">{criterion.weight}</Badge>
                      </div>
                      <CardTitle className="text-xl">{criterion.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {index === 0 && 'Опыт, экспертиза, комплементарность навыков команды, предыдущие успехи'}
                        {index === 1 && 'Уникальность решения, технологичность, защищенность IP, готовность продукта'}
                        {index === 2 && 'Размер рынка (TAM/SAM/SOM), темпы роста, конкурентная среда, барьеры входа'}
                        {index === 3 && 'Unit-экономика, рентабельность, runway, прозрачность финансовой модели'}
                        {index === 4 && 'Рост пользователей, выручки, метрики вовлеченности, retention, partnerships'}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Преимущества */}
            <TabsContent value="benefits" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">Преимущества IVI оценки для стартапов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-base">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Для инвесторов</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">
                    IVI индекс позволяет быстро оценить и сравнить стартапы, отфильтровать наиболее перспективные проекты и принимать обоснованные инвестиционные решения.
                  </p>
                  <Button>Смотреть рейтинги стартапов</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Получить оценку */}
            <TabsContent value="calculate" className="space-y-6">
              <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl mb-2">Получите IVI оценку вашего стартапа</CardTitle>
                  <CardDescription className="text-base">
                    Заполните заявку, и наши эксперты проведут комплексный анализ
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 text-center">
                    <Card className="bg-muted">
                      <CardHeader>
                        <CardTitle className="text-2xl">Базовая</CardTitle>
                        <p className="text-3xl font-bold text-primary">$499</p><br>Включено в тариф Фаундер-Рост и выше</p>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p>✓ Расчет IVI индекса</p>
                        <p>✓ Краткий отчет (5 страниц)</p>
                        <p>✓ Срок: 5 рабочих дней</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-primary text-primary-foreground">
                      <CardHeader>
                        <CardTitle className="text-2xl">Премиум</CardTitle>
                        <p className="text-3xl font-bold">$1,499</p>br>Drk.xtyj в тариф Фаундер-Масштаб</p>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p>✓ Расчет IVI индекса</p>
                        <p>✓ Подробный отчет (20+ страниц)</p>
                        <p>✓ Консультация эксперта (1 час)</p>
                        <p>✓ Рекомендации по улучшению</p>
                        <p>✓ Срок: 3 рабочих дня</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Button size="lg" className="w-full">
                    Подать заявку на IVI оценку
                  </Button>
                  
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IVIIndex;
