import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Zap, Shield, Globe } from 'lucide-react';
import RoadmapSection from '@/components/RoadmapSection';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">О проекте InvestEx</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Мы создаем экосистему, которая объединяет фрилансеров, аутсорсеров, 
              фаундеров и инвесторов для реализации инновационных проектов и 
              создания успешных бизнесов.
            </p>
          </section>

          {/* Mission Section */}
          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Наша миссия</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  InvestEx стремится стать ведущей платформой для создания и развития 
                  стартапов, где каждый участник может найти свое место и реализовать 
                  свой потенциал.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">01</Badge>
                    <div>
                      <h3 className="font-semibold">Объединение талантов</h3>
                      <p className="text-muted-foreground">
                        Создание сообщества профессионалов разных направлений
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">02</Badge>
                    <div>
                      <h3 className="font-semibold">Финансирование идей</h3>
                      <p className="text-muted-foreground">
                        Привлечение инвестиций для перспективных проектов
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">03</Badge>
                    <div>
                      <h3 className="font-semibold">Развитие экосистемы</h3>
                      <p className="text-muted-foreground">
                        Построение устойчивой бизнес-среды для всех участников
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-8 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">500+</div>
                      <div className="text-muted-foreground">Активных проектов</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-secondary mb-2">10M₽</div>
                      <div className="text-muted-foreground">Инвестировано</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-accent mb-2">1000+</div>
                      <div className="text-muted-foreground">Участников</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">95%</div>
                      <div className="text-muted-foreground">Довольных клиентов</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Наши ценности</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Сообщество</h3>
                  <p className="text-muted-foreground">
                    Мы верим в силу коллективного разума и взаимопомощи
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Инновации</h3>
                  <p className="text-muted-foreground">
                    Поддерживаем передовые технологии и креативные решения
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Надежность</h3>
                  <p className="text-muted-foreground">
                    Обеспечиваем безопасность и защиту интересов всех сторон
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Глобальность</h3>
                  <p className="text-muted-foreground">
                    Объединяем участников со всего мира для создания экосистемы
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Team Section */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-12">Команда</h2>
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-semibold mb-4">Мы растем!</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    InvestEx - это молодая и амбициозная команда профессионалов, 
                    которая стремится изменить мир стартапов и инвестиций.
                  </p>
                  <p className="text-muted-foreground">
                    Присоединяйтесь к нам и станьте частью нашей истории успеха!
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Roadmap Section */}
          <RoadmapSection />

          {/* Platform Analytics Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Аналитика платформы</h2>
            <div className="grid gap-6">
              {/* Growth Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Рост платформы</CardTitle>
                  <p className="text-sm text-muted-foreground">Динамика развития за последний год</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">+285%</div>
                      <p className="text-sm text-muted-foreground mb-3">Рост пользователей</p>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-secondary mb-2">+342%</div>
                      <p className="text-sm text-muted-foreground mb-3">Рост инвестиций</p>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full" style={{ width: '92%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-accent mb-2">+198%</div>
                      <p className="text-sm text-muted-foreground mb-3">Рост проектов</p>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: '78%' }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Distribution */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Распределение пользователей</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Фрилансеры</span>
                        <span className="text-sm text-muted-foreground">42%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Фаундеры</span>
                        <span className="text-sm text-muted-foreground">28%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full" style={{ width: '28%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Инвесторы</span>
                        <span className="text-sm text-muted-foreground">18%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: '18%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Другие роли</span>
                        <span className="text-sm text-muted-foreground">12%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-muted h-2 rounded-full" style={{ width: '12%' }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ключевые достижения</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Badge className="mt-1">Q1 2024</Badge>
                      <div>
                        <h4 className="font-semibold">Запуск платформы 2.0</h4>
                        <p className="text-sm text-muted-foreground">Обновленный интерфейс и новые функции</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge className="mt-1">Q2 2024</Badge>
                      <div>
                        <h4 className="font-semibold">1000+ успешных проектов</h4>
                        <p className="text-sm text-muted-foreground">Рекордное количество завершенных проектов</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge className="mt-1">Q3 2024</Badge>
                      <div>
                        <h4 className="font-semibold">10M₽ инвестиций</h4>
                        <p className="text-sm text-muted-foreground">Преодолен рубеж в 10 миллионов рублей</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Market Position */}
              <Card>
                <CardHeader>
                  <CardTitle>Позиция на рынке</CardTitle>
                  <p className="text-sm text-muted-foreground">Сравнение с конкурентами</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold mb-1">#1</div>
                      <p className="text-sm text-muted-foreground">По удовлетворенности</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold mb-1">#2</div>
                      <p className="text-sm text-muted-foreground">По росту пользователей</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold mb-1">92%</div>
                      <p className="text-sm text-muted-foreground">Retention rate</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold mb-1">4.8/5</div>
                      <p className="text-sm text-muted-foreground">Средний рейтинг</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;