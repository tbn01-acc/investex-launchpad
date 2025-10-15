import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Heart, Zap } from 'lucide-react';

const AboutProjectSection = () => {
  return (
    <div className="space-y-6">
      {/* Девиз */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="pt-6">
          <p className="text-xl md:text-2xl font-bold text-center">
            Мы не просто создаем платформу — мы революционизируем весь венчурный рынок!
          </p>
        </CardContent>
      </Card>

      {/* Наша миссия */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-primary" />
            <CardTitle>Наша миссия</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Сделать венчурное инвестирование доступным, прозрачным и эффективным для всех участников экосистемы. 
            Мы создаем технологическую платформу, которая объединяет инвесторов, стартапы, фонды, консультантов и других участников рынка, 
            предоставляя им инструменты для быстрого, безопасного и выгодного взаимодействия.
          </p>
        </CardContent>
      </Card>

      {/* Наши ценности */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-primary" />
            <CardTitle>Наши ценности</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <span className="font-semibold">Прозрачность:</span> Открытость данных и процессов для всех участников
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <span className="font-semibold">Инновации:</span> Использование передовых AI-технологий для оптимизации инвестиционных процессов
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <span className="font-semibold">Доступность:</span> Снижение барьеров входа для инвесторов и стартапов
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <span className="font-semibold">Безопасность:</span> Надежная защита данных и финансовых транзакций
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <span className="font-semibold">Сотрудничество:</span> Создание синергии между всеми участниками экосистемы
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Уникальное конкурентное преимущество */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-primary" />
            <CardTitle>Уникальное конкурентное преимущество</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 font-semibold">Invest-Ex — единственная платформа, которая:</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>Использует AI для мгновенной оценки проектов</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>Объединяет всю венчурную и инвестиционную экосистему</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>Предлагает налогово-оптимизированную структуру</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>Обеспечивает все инструменты в одном решении</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>Гарантирует быструю окупаемость инвестиций</div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutProjectSection;
