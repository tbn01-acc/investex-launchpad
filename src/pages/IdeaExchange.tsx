import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Lock, Users, ThumbsUp, MessageSquare, TrendingUp, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const IdeaExchange = () => {
  const { profile } = useAuth();

  const isAccredited = profile?.verification_level === 'accredited' || 
                       profile?.verification_level === 'professional' || 
                       profile?.verification_level === 'qualified';

  const ideas = [
    {
      id: 1,
      title: 'AI-платформа для персонализированного образования',
      author: 'Александр К.',
      stage: 'Концепция',
      category: 'EdTech',
      description: 'Адаптивная система обучения, которая подстраивается под индивидуальный стиль и темп каждого ученика',
      seekingInvestment: 15000000,
      seekingCoFounders: true,
      votes: 127,
      comments: 34,
      potentialMarket: '2.5B₽',
      requiredVerification: 'accredited'
    },
    {
      id: 2,
      title: 'Экосистема для устойчивого сельского хозяйства',
      author: 'Мария С.',
      stage: 'Прототип',
      category: 'AgriTech',
      description: 'IoT-решение для мониторинга почвы, климата и оптимизации использования ресурсов в реальном времени',
      seekingInvestment: 25000000,
      seekingCoFounders: true,
      votes: 213,
      comments: 56,
      potentialMarket: '5.8B₽',
      requiredVerification: 'accredited'
    },
    {
      id: 3,
      title: 'Маркетплейс для локальных ремесленников',
      author: 'Дмитрий П.',
      stage: 'MVP',
      category: 'E-commerce',
      description: 'Платформа для прямых продаж изделий ручной работы с интегрированной логистикой и маркетингом',
      seekingInvestment: 8000000,
      seekingCoFounders: false,
      votes: 89,
      comments: 23,
      potentialMarket: '1.2B₽',
      requiredVerification: 'accredited'
    },
    {
      id: 4,
      title: 'Blockchain-решение для медицинских данных',
      author: 'Елена В.',
      stage: 'Концепция',
      category: 'HealthTech',
      description: 'Децентрализованное хранилище медицинских карт с контролируемым доступом для пациентов и врачей',
      seekingInvestment: 30000000,
      seekingCoFounders: true,
      votes: 156,
      comments: 45,
      potentialMarket: '8.3B₽',
      requiredVerification: 'accredited'
    },
    {
      id: 5,
      title: 'VR-тренажеры для профессионального обучения',
      author: 'Игорь Н.',
      stage: 'Альфа',
      category: 'VR/AR',
      description: 'Симуляторы опасных производственных процессов для безопасного обучения персонала',
      seekingInvestment: 20000000,
      seekingCoFounders: true,
      votes: 178,
      comments: 41,
      potentialMarket: '3.7B₽',
      requiredVerification: 'accredited'
    }
  ];

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'M₽';
    }
    return amount.toLocaleString() + '₽';
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <section className="mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center">
              <Lightbulb className="w-10 h-10 mr-3 text-primary" />
              Биржа идей стартапов
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-6">
              Площадка для обмена идеями между предпринимателями и инвесторами. Находите партнеров, привлекайте финансирование и развивайте концепции.
            </p>

            {!isAccredited && (
              <div className="bg-accent/10 border border-accent p-6 rounded-lg mb-8">
                <div className="flex items-start gap-4">
                  <Lock className="w-6 h-6 text-accent mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Ограниченный доступ</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Участие в обсуждениях и инвестировании доступно только аккредитованным инвесторам.
                      Вы можете просматривать идеи, но для активного участия необходима верификация.
                    </p>
                    <Button size="sm">
                      <Shield className="w-4 h-4 mr-2" />
                      Пройти аккредитацию
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </section>

          <div className="grid gap-6">
            {ideas.map((idea) => (
              <Card key={idea.id} className={!isAccredited ? 'opacity-75' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{idea.category}</Badge>
                        <Badge variant="secondary">{idea.stage}</Badge>
                        {idea.seekingCoFounders && (
                          <Badge className="bg-primary text-primary-foreground">
                            <Users className="w-3 h-3 mr-1" />
                            Ищет ко-фаундеров
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-2xl mb-2">{idea.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground mb-2">
                        Автор: {idea.author}
                      </CardDescription>
                      <p className="text-muted-foreground mt-2">
                        {idea.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Требуется инвестиций</div>
                      <div className="text-xl font-bold text-primary">{formatAmount(idea.seekingInvestment)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Потенциал рынка</div>
                      <div className="text-xl font-bold">{idea.potentialMarket}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">{idea.votes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">{idea.comments}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {isAccredited ? (
                      <>
                        <Button className="flex-1">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Поддержать идею
                        </Button>
                        <Button variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Обсудить
                        </Button>
                      </>
                    ) : (
                      <Button className="flex-1" variant="outline" disabled>
                        <Lock className="w-4 h-4 mr-2" />
                        Требуется аккредитация
                      </Button>
                    )}
                    <Button variant="outline">Подробнее</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {isAccredited && (
            <div className="mt-12 text-center">
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-8">
                  <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Есть своя идея?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Поделитесь своей концепцией с сообществом инвесторов и предпринимателей. 
                    Получите обратную связь, найдите партнеров и привлеките финансирование.
                  </p>
                  <Button size="lg">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Разместить идею
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IdeaExchange;
