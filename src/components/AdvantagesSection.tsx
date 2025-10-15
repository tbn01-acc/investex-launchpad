import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Network, Building2, Layers, TrendingUp } from 'lucide-react';

const AdvantageCard = ({ icon: Icon, title, points }: { icon: any; title: string; points: string[] }) => (
  <Card className="h-full">
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span className="text-muted-foreground">{point}</span>
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
        'PMS для управления проектами (стартапами) - обеспечивает полную прозрачность для инвесторов',
        'Интеграция с банками, платежными системами и, в дальнейшем, криптоплатежами (BTC, ETH, стейблкоины)',
        'Аналитика, KPI-мониторинг и Риск-менеджмент в режиме реального времени',
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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">5 ключевых преимуществ Invest-Ex</h2>
        <p className="text-muted-foreground">
          Почему мы — лучший выбор для венчурных инвестиций
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {advantages.map((advantage, idx) => (
          <AdvantageCard key={idx} {...advantage} />
        ))}
      </div>
    </div>
  );
};

export default AdvantagesSection;
