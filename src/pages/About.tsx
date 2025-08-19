import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Zap, Shield, Globe } from 'lucide-react';

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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;