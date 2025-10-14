import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PricingSectionNew = () => {
  const [selectedCategory, setSelectedCategory] = useState('Участники');
  const [selectedRole, setSelectedRole] = useState('Инвестор');
  const [selectedPeriod, setSelectedPeriod] = useState(1);

  const categories = ['Участники', 'Исполнители', 'Сотрудники', 'Партнеры'];
  
  const rolesByCategory = {
    'Участники': ['Инвестор', 'Соинвестор', 'Фаундер', 'Ко-фаундер', 'Соучредитель', 'Франчайзер'],
    'Исполнители': ['Фрилансер', 'Эксперт', 'Консультант', 'Аутсорсер', 'Подрядчик'],
    'Сотрудники': ['Администратор проекта', 'Сотрудник проекта', 'Соискатель'],
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
    return Math.round(basePrice * (1 - discount / 100) * 100);
  };

  const tariffs = {
    'Инвестор': [
      { name: 'Начинающий', price: 0, features: ['Просмотр проектов: до 20/мес', 'Базовая аналитика', 'До 2 инвестиций/мес от $100', 'Email-поддержка'] },
      { name: 'Профессионал', price: 9900, trial: true, features: ['Неограниченный просмотр', 'AI-аналитика и Due Diligence', 'До 10 инвестиций/мес', '24/7 поддержка', 'Вторичный рынок'] },
      { name: 'Элитный', price: 49900, features: ['Все функции Профессионал', 'Неограниченные инвестиции', 'Персональный менеджер', 'Эксклюзивные сделки', 'VIP-мероприятия'] }
    ],
    'Франчайзер': [
      { name: 'Базовый', price: 0, features: ['1 франчайзинговая программа', 'Базовые шаблоны', 'Размещение в базе', 'Базовые инструменты'] },
      { name: 'Рост', price: 9900, trial: true, features: ['До 3 программ', 'Сеть до 50 франчайзи', 'AI-подбор партнеров', 'CRM система', 'SEO-размещение'] },
      { name: 'Масштаб', price: 29900, features: ['Неограниченные программы', 'Персональный менеджер', 'Юр. сопровождение', 'Приоритетное размещение'] }
    ]
  };

  const currentTariffs = tariffs[selectedRole as keyof typeof tariffs] || tariffs['Инвестор'];

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
            <Button key={cat} variant={selectedCategory === cat ? 'default' : 'outline'} onClick={() => { setSelectedCategory(cat); setSelectedRole(rolesByCategory[cat][0]); }}>
              {cat}
            </Button>
          ))}
        </div>

        {/* Роли */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {rolesByCategory[selectedCategory].map(role => (
            <Badge key={role} variant={selectedRole === role ? 'default' : 'outline'} className="cursor-pointer px-4 py-2" onClick={() => setSelectedRole(role)}>
              {role}
            </Badge>
          ))}
        </div>

        {/* Периоды */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {periods.map(p => (
            <Button key={p.months} variant={selectedPeriod === p.months ? 'default' : 'outline'} onClick={() => setSelectedPeriod(p.months)}>
              {p.label} {p.discount > 0 && <span className="ml-2 text-green-400">-{p.discount}%</span>}
            </Button>
          ))}
        </div>

        {/* Тарифы */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {currentTariffs.map((tariff, idx) => (
            <Card key={idx} className={idx === 1 ? 'border-primary shadow-lg' : ''}>
              <CardHeader>
                <CardTitle className="text-2xl">{tariff.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{calculatePrice(tariff.price)} ₽</span>
                  <span className="text-muted-foreground">/мес</span>
                  {tariff.trial && <Badge className="ml-2">7 дней пробно</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {tariff.features.map((f, i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Выбрать</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSectionNew;
