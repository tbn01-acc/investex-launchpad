import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Award, Zap, Shield } from 'lucide-react';

const ValueCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <Card className="relative overflow-hidden group hover:shadow-lg transition-all">
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-primary opacity-5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
    <CardContent className="pt-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const AboutProjectSection = () => {
  return (
    <div className="space-y-10">
      {/* Девиз */}
      <Card className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground border-0 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
        <CardContent className="pt-8 pb-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <Badge className="bg-white/20 hover:bg-white/30 border-white/30 mb-2">
              Наш девиз
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Мы не просто создаем платформу — мы революционизируем весь венчурный рынок!
            </h2>
          </div>
        </CardContent>
      </Card>

      {/* Наша миссия */}
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Наша миссия</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Демократизация венчурного капитала
          </h3>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg text-center text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              Сделать венчурные инвестиции доступными, прозрачными и эффективными для всех участников рынка — 
              от начинающих инвесторов до крупных фондов, от стартапов на стадии идеи до масштабируемых бизнесов. 
              Мы создаем экосистему, где каждый может найти свое место и реализовать свой потенциал.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Наши ценности */}
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">Наши ценности</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Принципы, которыми мы руководствуемся
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ValueCard
            icon={Shield}
            title="Прозрачность"
            description="Полная открытость данных и процессов для всех участников платформы. Каждая сделка, каждая метрика доступна для проверки."
          />
          <ValueCard
            icon={Zap}
            title="Инновации"
            description="Использование передовых технологий AI и blockchain для создания лучшего пользовательского опыта и максимальной эффективности."
          />
          <ValueCard
            icon={Target}
            title="Качество"
            description="Тщательная проверка проектов и участников для обеспечения высокого качества всей экосистемы."
          />
          <ValueCard
            icon={Award}
            title="Доверие"
            description="Построение долгосрочных отношений на основе честности, надежности и взаимной выгоды."
          />
        </div>
      </div>

      {/* Уникальное конкурентное преимущество */}
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Уникальное конкурентное преимущество</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Invest-Ex — единственная платформа, которая:
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Использует AI для мгновенной оценки проектов',
            'Объединяет всю венчурную и инвестиционную экосистему',
            'Предлагает налогово-оптимизированную структуру',
            'Обеспечивает все инструменты в одном решении',
            'Гарантирует быструю окупаемость инвестиций'
          ].map((advantage, idx) => (
            <Card key={idx} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">{idx + 1}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{advantage}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Итоговая статистика */}
      <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold">Invest-Ex в цифрах</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">340+</div>
                <div className="text-sm text-muted-foreground">Инструментов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">$17.5B</div>
                <div className="text-sm text-muted-foreground">Размер рынка</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">92.3%</div>
                <div className="text-sm text-muted-foreground">AI точность</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Стран к 2029</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutProjectSection;
