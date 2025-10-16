import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Heart, Zap, Sparkles } from 'lucide-react';

const AboutProjectSection = () => {
  return (
    <div className="space-y-6">
      {/* Девиз */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Sparkles className="w-32 h-32 text-primary" />
        </div>
        <CardContent className="pt-8 pb-8 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-primary rounded-full" />
            <Sparkles className="w-6 h-6 text-primary" />
            <div className="h-1 w-12 bg-gradient-to-l from-transparent to-primary rounded-full" />
          </div>
          <p className="text-xl md:text-3xl font-bold text-center bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent leading-relaxed">
            Мы не просто создаем платформу — мы революционизируем весь венчурный рынок!
          </p>
        </CardContent>
      </Card>

      {/* Наша миссия */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Наша миссия</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p className="text-base text-muted-foreground leading-relaxed">
            Сделать венчурное инвестирование <span className="font-semibold text-foreground">доступным, прозрачным и эффективным</span> для всех участников экосистемы. 
            Мы создаем технологическую платформу, которая объединяет <span className="font-semibold text-foreground">инвесторов, стартапы, фонды, консультантов</span> и других участников рынка, 
            предоставляя им инструменты для <span className="font-semibold text-foreground">быстрого, безопасного и выгодного</span> взаимодействия.
          </p>
        </CardContent>
      </Card>

      {/* Наши ценности */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Наши ценности</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-lg mb-1">Прозрачность</div>
                  <div className="text-sm text-muted-foreground">Открытость данных и процессов для всех участников</div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-lg mb-1">Инновации</div>
                  <div className="text-sm text-muted-foreground">Использование передовых AI-технологий для оптимизации инвестиционных процессов</div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-lg mb-1">Доступность</div>
                  <div className="text-sm text-muted-foreground">Снижение барьеров входа для инвесторов и стартапов</div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-lg mb-1">Безопасность</div>
                  <div className="text-sm text-muted-foreground">Надежная защита данных и финансовых транзакций</div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 md:col-span-2">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-lg mb-1">Сотрудничество</div>
                  <div className="text-sm text-muted-foreground">Создание синергии между всеми участниками экосистемы</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Уникальное конкурентное преимущество */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="bg-primary/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-xl">Уникальное конкурентное преимущество</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6 p-4 bg-primary/10 rounded-lg border-l-4 border-l-primary">
            <p className="font-bold text-lg">Invest-Ex — единственная платформа, которая:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-primary/10">
              <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">Использует <span className="font-semibold">AI для мгновенной оценки</span> проектов</div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-primary/10">
              <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">Объединяет <span className="font-semibold">всю венчурную и инвестиционную экосистему</span></div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-primary/10">
              <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">Предлагает <span className="font-semibold">налогово-оптимизированную структуру</span></div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-primary/10">
              <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">Обеспечивает <span className="font-semibold">все инструменты в одном решении</span></div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-primary/10 md:col-span-2">
              <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">Гарантирует <span className="font-semibold">быструю окупаемость инвестиций</span></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutProjectSection;
