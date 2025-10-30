import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PricingSectionNew = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('Инвесторы');
  const [selectedRole, setSelectedRole] = useState('Инвестор');
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const navigate = useNavigate();

  // Handle URL parameters for pre-selected role and period
  useEffect(() => {
    const roleParam = searchParams.get('role');
    const periodParam = searchParams.get('period');
    
    if (roleParam) {
      setSelectedRole(roleParam);
      // Determine category based on role
      for (const [category, roles] of Object.entries(rolesByCategory)) {
        if (roles.includes(roleParam)) {
          setSelectedCategory(category);
          break;
        }
      }
    }
    
    if (periodParam) {
      const period = parseInt(periodParam);
      if ([1, 3, 6, 12].includes(period)) {
        setSelectedPeriod(period);
      }
    }
  }, [searchParams]);

  const categories = ['Инвесторы', 'Стартап/Франшиза', 'Исполнители', 'Сотрудники', 'Партнеры'];
  
  const rolesByCategory = {
    'Инвесторы': ['Инвестор', 'Соинвестор', 'Франчайзи'],
    'Стартап/Франшиза': ['Фаундер', 'Ко-фаундер', 'Соучредитель', 'Франчайзер'],
    'Исполнители': ['Фрилансер', 'Эксперт', 'Консультант', 'Аутсорсер', 'Подрядчик'],
    'Сотрудники': ['Администратор стартапа', 'Сотрудник стартапа', 'Соискатель'],
    'Партнеры': ['Партнёр (Affiliate)', 'Амбассадор проекта', 'Лидер мнений/Блогер']
  };

  const periods = [
    { months: 1, discount: 0, label: 'Месяц' },
    { months: 3, discount: 10, label: 'Квартал' },
    { months: 6, discount: 15, label: 'Полгода' },
    { months: 12, discount: 20, label: 'Год' }
  ];

  const calculatePrice = (basePrice: number) => {
    const period = periods.find(p => p.months === selectedPeriod);
    const discount = period?.discount || 0;
    const discountedPrice = basePrice * (1 - discount / 100);
    return Math.round(discountedPrice * 100); // конвертация из $ в ₽ (1$=100₽)
  };

  // Данные тарифов (в долларах, будут конвертированы в рубли)
  const tariffs = {
    'Инвестор': {
      plans: [
        { name: 'Старт', price: 0, trial: false },
        { name: 'Профи', price: 99, trial: true },
        { name: 'Премиум', price: 499, trial: false }
      ],
      features: [
        ['Просмотр проектов', 'до 20/мес', 'неограниченно', 'неограниченно'],
        ['Аналитика', 'базовая', 'AI-аналитика', 'AI + персональный менеджер'],
        ['Инвестиции/мес', 'до 2 от $100', 'до 10', 'неограниченно'],
        ['Поддержка', 'email 9-18', '24/7', '24/7 + персональный менеджер'],
        ['Вторичный рынок', false, true, true],
        ['Закрытые раунды', false, true, true],
        ['Эксклюзивные сделки', false, false, true],
        ['VIP-мероприятия', false, false, true]
      ]
    },
    'Соинвестор': {
      plans: [
        { name: 'Старт', price: 0, trial: false },
        { name: 'Профи', price: 49, trial: true },
        { name: 'Премиум', price: 249, trial: false }
      ],
      features: [
        ['Синдикаты/мес', '1', 'неограниченно', 'неограниченно + создание'],
        ['Порог входа', 'стандартный', 'снижен в 5 раз', 'минимальный'],
        ['Due Diligence', 'базовый', 'коллективный', 'профессиональный'],
        ['Закрытые синдикаты', false, true, true],
        ['Управление группой', false, false, 'до 50 чел'],
        ['Комиссия с инвестиций', false, false, '2%'],
        ['Юр. сопровождение', false, false, true]
      ]
    },
    'Фаундер': {
      plans: [
        { name: 'Старт', price: 0, trial: false },
        { name: 'Профи', price: 99, trial: true },
        { name: 'Премиум', price: 499, trial: false }
      ],
      features: [
        ['Активные проекты', 'до 2', 'до 10', 'неограниченно'],
        ['Управление командой', 'до 3 чел', 'до 25 чел', 'неограниченно'],
        ['AI-конструктор команды', false, true, true],
        ['Финансовые модели', 'базовые', 'расширенные', 'полные'],
        ['Data Room', false, true, true],
        ['Персональный консультант', false, false, true],
        ['Приоритетное размещение', false, false, true],
        ['Связи с топ-инвесторами', false, false, true]
      ]
    },
    'Ко-фаундер': {
      plans: [
        { name: 'Старт', price: 0, trial: false },
        { name: 'Профи', price: 49, trial: true },
        { name: 'Премиум', price: 249, trial: false }
      ],
      features: [
        ['Отклики на проекты/мес', '3', 'неограниченно', 'неограниченно'],
        ['AI-подбор проектов', false, true, true],
        ['Аналитика стартапов', 'базовая', 'углубленная', 'полная'],
        ['Закрытые проекты', false, true, true],
        ['Юридические шаблоны', false, false, true],
        ['Оценка доли', false, false, true],
        ['Юр. сопровождение', false, false, true]
      ]
    },
    'Соучредитель': {
      plans: [
        { name: 'Старт', price: 0, trial: false },
        { name: 'Профи', price: 79, trial: true },
        { name: 'Премиум', price: 349, trial: false }
      ],
      features: [
        ['Запросов на анализ/мес', '2', '10', 'неограниченно'],
        ['M&A анализ', 'базовый', 'расширенный', 'профессиональный'],
        ['Закрытые сделки', false, true, true],
        ['Due Diligence', false, true, true],
        ['Токенизация долей', false, false, true],
        ['Советы директоров', false, false, true],
        ['Комплексное сопровождение', false, false, true]
      ]
    },
    'Франчайзер': {
      plans: [
        { name: 'Старт', price: 0, trial: false },
        { name: 'Профи', price: 99, trial: true },
        { name: 'Премиум', price: 299, trial: false }
      ],
      features: [
        ['Франчайзинговые программы', '1', 'до 3', 'неограниченно'],
        ['Сеть франчайзи', 'базовая', 'до 50', 'неограниченно'],
        ['AI-подбор партнеров', false, true, true],
        ['CRM система', false, true, true],
        ['SEO-размещение', false, true, true],
        ['Персональный менеджер', false, false, true],
        ['Юр. сопровождение', false, false, true],
        ['Приоритетное размещение', false, false, true]
      ]
    },
    'Франчайзи': {
      plans: [
        { name: 'Старт', price: 0, trial: false },
        { name: 'Профи', price: 49, trial: true },
        { name: 'Премиум', price: 149, trial: false }
      ],
      features: [
        ['Просмотр франшиз/мес', 'до 10', 'неограниченно', 'неограниченно'],
        ['Аналитика окупаемости', 'базовая', 'AI-аналитика', 'AI + персональный советник'],
        ['Запросы франчайзерам/мес', '3', '10', 'неограниченно'],
        ['Финансовая оценка', false, true, true],
        ['Локации под франшизу', false, true, true],
        ['Due Diligence франшиз', false, false, true],
        ['Юр. сопровождение сделки', false, false, true],
        ['Персональный менеджер', false, false, true]
      ]
    },
    'Фрилансер': {
      plans: [
        { name: 'Старт', price: 0, trial: false },
        { name: 'Профи', price: 9, trial: true },
        { name: 'Премиум', price: 29, trial: false }
      ],
      features: [
        ['Отклики/мес', '5', 'неограниченно', 'неограниченно'],
        ['Активные проекты', '2', 'до 10', 'неограниченно'],
        ['Комиссия платформы', '10%', '7%', '5%'],
        ['Приоритет в поиске', false, true, true],
        ['Time tracking', false, true, true],
        ['Equity участие', false, false, true],
        ['Высокобюджетные проекты', false, false, true],
        ['Персональный менеджер', false, false, true]
      ]
    },
    'Эксперт': {
      plans: [
        { name: 'Старт', price: 0, trial: false },
        { name: 'Профи', price: 49, trial: true },
        { name: 'Премиум', price: 99, trial: false }
      ],
      features: [
        ['Консультации/мес', '2', 'неограниченно', 'неограниченно'],
        ['Почасовая ставка', 'от $25/час', 'от $50/час', 'от $100/час'],
        ['Технические аудиты', false, true, true],
        ['Due Diligence', false, true, true],
        ['Менторство', false, false, true],
        ['Инвестиционные комитеты', false, false, true],
        ['Персональный менеджер', false, false, true]
      ]
    },
    'Консультант': {
      plans: [
        { name: 'Старт', price: 0, trial: false },
        { name: 'Профи', price: 79, trial: true },
        { name: 'Премиум', price: 149, trial: false }
      ],
      features: [
        ['Сессии/мес', '2', 'неограниченно', 'неограниченно'],
        ['Ставка', 'от $30/час', 'от $75/час', 'от $150/час'],
        ['Стратегические планы', false, true, true],
        ['Процессная оптимизация', false, true, true],
        ['C-level консультирование', false, false, true],
        ['Стратегические сессии', false, false, true],
        ['Проекты трансформации', false, false, true]
      ]
    },
    'Аутсорсер': {
      plans: [
        { name: 'Старт', price: 0, trial: false },
        { name: 'Профи', price: 99, trial: true },
        { name: 'Премиум', price: 249, trial: false }
      ],
      features: [
        ['Команда', 'до 5 чел', 'до 20 чел', 'неограниченно'],
        ['Комиссия', '12%', '8%', '5%'],
        ['CRM интеграция', false, true, true],
        ['Белый лейбл', false, true, true],
        ['Приоритет в тендерах', false, true, true],
        ['Персональный менеджер', false, false, true],
        ['Enterprise контракты', false, false, true],
        ['Индивидуальные SLA', false, false, true]
      ]
    },
    'Подрядчик': {
      plans: [
        { name: 'Старт', price: 0, trial: false },
        { name: 'Профи', price: 99, trial: true },
        { name: 'Премиум', price: 299, trial: false }
      ],
      features: [
        ['Контракты одновременно', '1', '3', 'неограниченно'],
        ['B2B контракты', false, true, true],
        ['Сеть субподрядчиков', false, true, true],
        ['Контроль качества', false, true, true],
        ['Приоритет в тендерах', false, true, true],
        ['Эксклюзивные контракты', false, false, true],
        ['Персональный менеджер', false, false, true],
        ['Индивидуальное страхование', false, false, true]
      ]
    },
    'Администратор стартапа': {
      plans: [
        { name: 'Администратор', price: 0, trial: false }
      ],
      features: [
        ['Управление проектами', 'неограниченно'],
        ['Команда', 'любой размер'],
        ['Система KPI', 'полная аналитика'],
        ['AI-советник', true],
        ['Автоматизация отчетности', true],
        ['C-level дашборды', true],
        ['Системные интеграции', true],
        ['Карьерный трек', true],
        ['Токенизированные опционы', true]
      ]
    },
    'Сотрудник стартапа': {
      plans: [
        { name: 'Сотрудник', price: 0, trial: false }
      ],
      features: [
        ['Карьерный трек', 'Junior до Lead'],
        ['Токенизированные доли', true],
        ['Система обучения', true],
        ['База знаний', true],
        ['Персональное менторство', true],
        ['Прозрачная система KPI', true],
        ['Участие в решениях', true],
        ['Внутренние переводы', true],
        ['Социальные программы', true]
      ]
    },
    'Соискатель': {
      plans: [
        { name: 'Старт', price: 0, trial: false },
        { name: 'Профи', price: 9, trial: true },
        { name: 'Премиум', price: 29, trial: false }
      ],
      features: [
        ['Отклики/мес', '10', 'неограниченно', 'неограниченно'],
        ['AI-оптимизация резюме', false, true, true],
        ['Персональные рекомендации', false, true, true],
        ['Подготовка к собеседованиям', false, true, true],
        ['Закрытые вакансии', false, false, true],
        ['Networking с лидерами', false, false, true],
        ['Персональный консультант', false, false, true],
        ['Закрытые мероприятия', false, false, true]
      ]
    },
    'Партнёр (Affiliate)': {
      plans: [
        { name: 'Партнер', price: 0, trial: false }
      ],
      features: [
        ['Комиссия', 'до 25%'],
        ['Аналитика', 'в реальном времени'],
        ['Персональный менеджер', true],
        ['Готовые материалы', true],
        ['Многоуровневые вознаграждения', true],
        ['Эксклюзивные кампании', true],
        ['Закрытые предложения', true],
        ['Ежемесячные бонусы', true],
        ['Бонус при оплате', '25%']
      ]
    },
    'Амбассадор проекта': {
      plans: [
        { name: 'Амбассадор', price: 0, trial: false }
      ],
      features: [
        ['Представление проектов', true],
        ['Токены проектов', true],
        ['Эксклюзивный контент', true],
        ['Прямая связь с командами', true],
        ['Участие в стратегических решениях', true],
        ['Закрытые мероприятия', true],
        ['Персональный менеджер', true],
        ['Влияние на развитие', true],
        ['Коллекционные активы', true]
      ]
    },
    'Лидер мнений/Блогер': {
      plans: [
        { name: 'Блогер', price: 0, trial: false }
      ],
      features: [
        ['Эксклюзивные данные', true],
        ['Приоритетное сотрудничество', true],
        ['Монетизация экспертизы', true],
        ['Партнерские доходы', true],
        ['Инсайдерская информация', true],
        ['Интервью с фаундерами', true],
        ['Поддержка контент-менеджера', true],
        ['Экспертные панели', true],
        ['Брендированные материалы', true]
      ]
    }
  };

  const currentTariff = tariffs[selectedRole as keyof typeof tariffs] || tariffs['Инвестор'];

  const handleSelectPlan = (planName: string, price: number) => {
    navigate(`/payment?plan=${encodeURIComponent(planName)}&price=${calculatePrice(price)}&role=${encodeURIComponent(selectedRole)}&period=${selectedPeriod}`);
  };

  const renderFeatureValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />;
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Тарифные планы</h2>
          <p className="text-xl text-muted-foreground">Выберите категорию, роль и период оплаты</p>
        </div>

        {/* Категории */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {categories.map(cat => (
            <Button 
              key={cat} 
              variant={selectedCategory === cat ? 'default' : 'outline'} 
              onClick={() => { 
                setSelectedCategory(cat); 
                setSelectedRole(rolesByCategory[cat as keyof typeof rolesByCategory][0]); 
              }}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Роли */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {rolesByCategory[selectedCategory as keyof typeof rolesByCategory].map(role => (
            <Badge 
              key={role} 
              variant={selectedRole === role ? 'default' : 'outline'} 
              className="cursor-pointer px-4 py-2 text-sm" 
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </Badge>
          ))}
        </div>

        {/* Периоды */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {periods.map(p => (
            <Button 
              key={p.months} 
              variant={selectedPeriod === p.months ? 'default' : 'outline'} 
              onClick={() => setSelectedPeriod(p.months)}
            >
              {p.label} {p.discount > 0 && <span className="ml-2 text-green-400">-{p.discount}%</span>}
            </Button>
          ))}
        </div>

        {/* Тарифы */}
        <div className={`grid gap-8 mb-12 ${currentTariff.plans.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-1 max-w-md mx-auto'}`}>
          {currentTariff.plans.map((plan, idx) => (
            <Card key={idx} className={idx === 1 && currentTariff.plans.length === 3 ? 'border-primary shadow-lg scale-105' : ''}>
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{calculatePrice(plan.price).toLocaleString('ru-RU')} ₽</span>
                  <span className="text-muted-foreground">/мес</span>
                  {plan.trial && <Badge className="ml-2" variant="secondary">7 дней пробно</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full mb-6" 
                  onClick={() => handleSelectPlan(plan.name, plan.price)}
                >
                  Выбрать
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Таблица сравнения */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Сравнение тарифов</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Возможности</TableHead>
                  {currentTariff.plans.map((plan, idx) => (
                    <TableHead key={idx} className="text-center min-w-[150px]">
                      <div className="font-bold">{plan.name}</div>
                      <div className="text-sm font-normal text-muted-foreground">
                        {calculatePrice(plan.price).toLocaleString('ru-RU')} ₽/мес
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTariff.features.map((feature, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{feature[0]}</TableCell>
                    {feature.slice(1).map((value, valIdx) => (
                      <TableCell key={valIdx} className="text-center">
                        {renderFeatureValue(value)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => {
              const allPlans = currentTariff.plans.map((plan, idx) => ({
                name: plan.name,
                price: calculatePrice(plan.price),
                features: currentTariff.features.map(f => ({ name: f[0], value: f[idx + 1] }))
              }));
              console.log('All plans:', allPlans);
            }}
          >
            Подробнее о возможностях
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingSectionNew;
