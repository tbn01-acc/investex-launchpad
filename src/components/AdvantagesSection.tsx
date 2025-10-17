import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Network, Building2, Layers, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react';

const AdvantageCard = ({ 
  icon: Icon, 
  title, 
  points, 
  index 
}: { 
  icon: any; 
  title: string; 
  points: string[];
  index: number;
}) => (
  <Card className={`h-full relative overflow-hidden ${index === 0 ? 'lg:col-span-2' : ''}`}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-5 rounded-full -mr-16 -mt-16" />
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <div className="flex-1">
          <Badge variant="secondary" className="mb-2">Преимущество {index + 1}</Badge>
          <CardTitle className="text-xl leading-tight">{title}</CardTitle>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-3">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: Brain,
      title: 'AI Due Diligence - Революция в оценке проектов',
      points: [
        'Мгновенная интеллектуальная экспертиза вместо недель ручной работы',
        'Анализ 1000+ параметров за секунды',
        'Точность прогнозов >92% на основе исторических данных',
        'Снижение затрат на Due Diligence на 90%',
        'Устранение человеческих ошибок и предвзятости'
      ]
    },
    {
      icon: Network,
      title: 'Единая экосистема всех участников венчурного рынка',
      points: [
        'Первая в мире платформа, объединяющая все роли в одном месте',
        'Инвесторы, стартапы, фонды, консультанты и др. на одной платформе',
        'Network Effect: каждый новый участник увеличивает ценность для всех',
        'Viral рост через встроенные партнерские программы',
        'One-stop-shop для всех потребностей венчурного инвестирования'
      ]
    },
    {
      icon: Building2,
      title: 'Налогово-оптимизированная холдинговая структура',
      points: [
        'Максимальная эффективность для международных инвестиций',
        'Материнский холдинг в Эстонии: 0% налог на реинвестируемую прибыль',
        'Региональные хабы для локализации (Кипр, ОАЭ, Сингапур, США)',
        'Экономия 50-70% налогов vs стандартных структур',
        'Полная готовность к международному IPO'
      ]
    },
    {
      icon: Layers,
      title: '340+ интегрированных инструментов в едином интерфейсе',
      points: [
        'Все необходимое для венчурных инвестиций в одном решении',
        'CRM для управления отношениями с инвесторами и стартапами',
        'PMS для управления проектами - полная прозрачность для инвесторов',
        'Интеграция с банками, платежными системами и криптоплатежами',
        'Аналитика, KPI-мониторинг и Риск-менеджмент в реальном времени',
        'Enterprise-уровень безопасности и Data Room'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Проверенная бизнес-модель с быстрой окупаемостью',
      points: [
        'Доказанная unit-экономика и путь к прибыльности',
        'LTV/CAC = 854 (отличный показатель для B2B SaaS)',
        'Прогнозируемый мультипликатор при выходе: 15-20х',
        'Gross Margin = 85% (высокая маржинальность)',
        'Путь к прибыльности: 24 месяца с текущими темпами роста'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Почему Invest-Ex?</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Ключевые преимущества Invest-Ex
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Почему мы — лучший выбор для венчурных инвестиций и управления портфелем стартапов
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {advantages.map((advantage, idx) => (
          <AdvantageCard key={idx} {...advantage} index={idx} />
        ))}
      </div>

      {/* Сводная статистика */}
      <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">92.3%</div>
              <div className="text-sm text-muted-foreground">Точность AI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">90%</div>
              <div className="text-sm text-muted-foreground">Экономия времени</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">340+</div>
              <div className="text-sm text-muted-foreground">Инструментов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">15-20x</div>
              <div className="text-sm text-muted-foreground">Exit Multiple</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvantagesSection;
