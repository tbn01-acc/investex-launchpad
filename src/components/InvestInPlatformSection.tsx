import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Globe, Shield, Zap, Target } from 'lucide-react';

const InvestInPlatformSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 px-6 py-2 text-base">Инвестиционное предложение</Badge>
          <h2 className="text-4xl font-bold mb-4">Инвестируй в платформу Invest-Ex</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Присоединяйтесь к революции в сфере инвестиций и стартапов. Станьте частью экосистемы будущего.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h3 className="text-3xl font-bold mb-6">Почему Invest-Ex?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">AI-Driven Due Diligence</h4>
                  <p className="text-muted-foreground">
                    Анализ 1000+ параметров за секунды. Точность прогнозов 85%+ на основе исторических данных. 
                    Снижение затрат на Due Diligence на 90%.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Мультиролевая экосистема</h4>
                  <p className="text-muted-foreground">
                    Инвесторы, стартапы, фрилансеры, консультанты на одной платформе. 
                    Network Effect: каждый новый участник увеличивает ценность для всех.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Глобальный масштаб</h4>
                  <p className="text-muted-foreground">
                    Выход на международные рынки: Россия, СНГ, EMEA, NA, LATAM, APAC. 
                    Региональные хабы для локализации и готовность к международному IPO.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Блокчейн и смартконтракты</h4>
                  <p className="text-muted-foreground">
                    Прозрачность сделок через распределенный реестр. 
                    Автоматизация процессов и снижение транзакционных издержек.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>Финансовые показатели</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-primary">12%</div>
                    <div className="text-sm text-muted-foreground">TAM рост рынка</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">85%+</div>
                    <div className="text-sm text-muted-foreground">Точность AI-прогнозов</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">90%</div>
                    <div className="text-sm text-muted-foreground">Снижение затрат DD</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">50-70%</div>
                    <div className="text-sm text-muted-foreground">Экономия каждого</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Инвестиционное предложение
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg p-3 border">
                  <div className="text-sm text-muted-foreground mb-1">Общее предложение</div>
                  <div className="font-semibold">18% доли</div>
                </div>

                <div className="grid gap-4">
                  <div className="p-4 border rounded-xl">
                    <div className="text-sm text-muted-foreground">До 15.11.2025</div>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>€500k (5 BTC) за 3%</li>
                      <li>€1M (10 BTC) за 10%</li>
                      <li>€1.5M (15 BTC) за 18%</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-xl">
                    <div className="text-sm text-muted-foreground">До 25.12.2025</div>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>€650k (6.5 BTC) за 3%</li>
                      <li>€1.2M (12 BTC) за 10%</li>
                      <li>€1.8M (18 BTC) за 18%</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-xl">
                    <div className="text-sm text-muted-foreground">До 01.03.2026</div>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>€1M (10 BTC) за 3%</li>
                      <li>€1.8M (18 BTC) за 10%</li>
                      <li>€2.5M (25 BTC) за 18%</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <Button className="w-full" size="lg">Получить инвестиционный пакет</Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">Бизнес-план, финмодель, презентация и Data Room</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Zap className="w-12 h-12 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Комплексный инструментарий</h4>
                <p className="text-sm text-muted-foreground">
                  Все необходимое в едином интерфейсе: от подачи заявки до exit
                </p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-3 text-secondary" />
                <h4 className="font-semibold mb-2">Real-time аналитика</h4>
                <p className="text-sm text-muted-foreground">
                  Панели KPI, автоматизированные отчеты и актуальные данные 24/7
                </p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 mx-auto mb-3 text-accent" />
                <h4 className="font-semibold mb-2">Безопасная Data Room</h4>
                <p className="text-sm text-muted-foreground">
                  Защищенное хранилище документов с гибким управлением доступом
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InvestInPlatformSection;
