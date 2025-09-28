import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star, Zap, Crown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import pricingImage from "@/assets/pricing-realistic.jpg";

const PricingSection = () => {
  const { formatCurrency } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedRole, setSelectedRole] = useState("freelancer");
  
  const getPrice = (basePrice: number, period: string) => {
    if (basePrice === 0) return "Бесплатно";
    
    let multiplier = 1;
    if (period === "quarterly") multiplier = 2.85; // 5% discount
    else if (period === "biannual") multiplier = 5.4; // 10% discount  
    else if (period === "annual") multiplier = 9.6; // 20% discount
    
    return formatCurrency(basePrice * multiplier, "USD");
  };

  const rolePlans = {
    freelancer: [
      {
        name: "Стартер",
        basePrice: 0,
        description: "Для начинающих фрилансеров",
        features: [
          "Создание базового профиля",
          "Поиск проектов с ограничениями",
          "До 3 активных проектов",
          "Базовая поддержка"
        ],
        cta: "Начать бесплатно",
        popular: false,
        icon: Zap,
        gradient: "from-gray-50 to-gray-100",
        buttonVariant: "outline" as const
      },
      {
        name: "Профи",
        basePrice: 29,
        description: "Для профессиональных фрилансеров",
        features: [
          "Все возможности Стартер",
          "Неограниченный поиск проектов",
          "До 15 активных проектов",
          "Расширенная аналитика",
          "Приоритетная поддержка"
        ],
        cta: "Выбрать Профи",
        popular: true,
        icon: Star,
        gradient: "from-primary/10 to-primary/5",
        buttonVariant: "default" as const
      },
      {
        name: "Эксперт",
        basePrice: 59,
        description: "Для экспертного уровня",
        features: [
          "Все возможности Профи",
          "Неограниченные проекты",
          "Персональный менеджер",
          "Белая маркировка профиля"
        ],
        cta: "Выбрать Эксперт",
        popular: false,
        icon: Crown,
        gradient: "from-investment-green/10 to-investment-green/5",
        buttonVariant: "investment" as const
      }
    ],
    investor: [
      {
        name: "Базовый",
        basePrice: 0,
        description: "Для начинающих инвесторов",
        features: [
          "Просмотр проектов",
          "Базовая аналитика",
          "До 3 инвестиций в месяц",
          "Стандартная поддержка"
        ],
        cta: "Начать бесплатно",
        popular: false,
        icon: Zap,
        gradient: "from-gray-50 to-gray-100",
        buttonVariant: "outline" as const
      },
      {
        name: "Золотой",
        basePrice: 99,
        description: "Для активных инвесторов",
        features: [
          "Все возможности Базового",
          "Неограниченные инвестиции",
          "Расширенная due diligence",
          "Персональная аналитика",
          "Приоритетный доступ"
        ],
        cta: "Выбрать Золотой",
        popular: true,
        icon: Star,
        gradient: "from-primary/10 to-primary/5",
        buttonVariant: "default" as const
      },
      {
        name: "Платиновый",
        basePrice: 299,
        description: "Для профессиональных инвесторов",
        features: [
          "Все возможности Золотого",
          "Персональный менеджер",
          "Эксклюзивные проекты",
          "Индивидуальные условия"
        ],
        cta: "Выбрать Платиновый",
        popular: false,
        icon: Crown,
        gradient: "from-investment-green/10 to-investment-green/5",
        buttonVariant: "investment" as const
      }
    ],
    founder: [
      {
        name: "Стартап",
        basePrice: 0,
        description: "Для начинающих фаундеров",
        features: [
          "Создание проекта",
          "Поиск инвесторов",
          "Базовые инструменты",
          "Стандартная поддержка"
        ],
        cta: "Начать бесплатно",
        popular: false,
        icon: Zap,
        gradient: "from-gray-50 to-gray-100",
        buttonVariant: "outline" as const
      },
      {
        name: "Рост",
        basePrice: 149,
        description: "Для растущих проектов",
        features: [
          "Все возможности Стартап",
          "Расширенные инструменты",
          "Питч-материалы",
          "Менторская поддержка"
        ],
        cta: "Выбрать Рост",
        popular: true,
        icon: Star,
        gradient: "from-primary/10 to-primary/5",
        buttonVariant: "default" as const
      },
      {
        name: "Масштаб",
        basePrice: 399,
        description: "Для масштабирования бизнеса",
        features: [
          "Все возможности Роста",
          "Персональный консультант",
          "Приоритетное размещение",
          "Юридическая поддержка"
        ],
        cta: "Выбрать Масштаб",
        popular: false,
        icon: Crown,
        gradient: "from-investment-green/10 to-investment-green/5",
        buttonVariant: "investment" as const
      }
    ],
    outsourcer: [
      {
        name: "Команда",
        basePrice: 0,
        description: "Для небольших команд",
        features: [
          "До 5 участников команды",
          "Базовое управление проектами",
          "Стандартная поддержка"
        ],
        cta: "Начать бесплатно",
        popular: false,
        icon: Zap,
        gradient: "from-gray-50 to-gray-100",
        buttonVariant: "outline" as const
      },
      {
        name: "Агентство",
        basePrice: 199,
        description: "Для профессиональных агентств",
        features: [
          "До 25 участников команды",
          "Расширенное управление",
          "Клиентский портал",
          "Отчетность и аналитика"
        ],
        cta: "Выбрать Агентство",
        popular: true,
        icon: Star,
        gradient: "from-primary/10 to-primary/5",
        buttonVariant: "default" as const
      },
      {
        name: "Корпоратив",
        basePrice: 499,
        description: "Для крупных компаний",
        features: [
          "Неограниченная команда",
          "Белая маркировка",
          "Интеграции с CRM",
          "Персональный менеджер"
        ],
        cta: "Выбрать Корпоратив",
        popular: false,
        icon: Crown,
        gradient: "from-investment-green/10 to-investment-green/5",
        buttonVariant: "investment" as const
      }
    ]
  };

  const plans = rolePlans[selectedRole as keyof typeof rolePlans] || rolePlans.freelancer;

  const periods = [
    { id: "monthly", name: "1 месяц", discount: null, popular: false },
    { id: "quarterly", name: "3 месяца", discount: "5%", popular: false },
    { id: "biannual", name: "6 месяцев", discount: "10%", popular: true },
    { id: "annual", name: "12 месяцев", discount: "20%", popular: false }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="mb-8">
            <img
              src={pricingImage}
              alt="Тарифные планы и ценообразование InvestEx"
              className="mx-auto rounded-2xl shadow-card max-w-2xl w-full h-64 object-cover"
            />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Гибкие тарифы
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Выберите подходящий план для вашего бизнеса. 
            Комиссия 5% с транзакций + дополнительные премиум-услуги
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={selectedRole === "freelancer" ? "default" : "outline"}
            onClick={() => setSelectedRole("freelancer")}
            className="px-4 py-2"
          >
            Фрилансер
          </Button>
          <Button
            variant={selectedRole === "investor" ? "default" : "outline"}
            onClick={() => setSelectedRole("investor")}
            className="px-4 py-2"
          >
            Инвестор
          </Button>
          <Button
            variant={selectedRole === "founder" ? "default" : "outline"}
            onClick={() => setSelectedRole("founder")}
            className="px-4 py-2"
          >
            Фаундер
          </Button>
          <Button
            variant={selectedRole === "outsourcer" ? "default" : "outline"}
            onClick={() => setSelectedRole("outsourcer")}
            className="px-4 py-2"
          >
            Аутсорсер
          </Button>
        </div>

        {/* Payment Period Selector */}
        <div className="flex justify-center gap-2 mb-12">
          {periods.map((period) => (
            <Button
              key={period.id}
              variant={selectedPeriod === period.id ? "default" : "outline"}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-6 py-3 ${
                period.popular 
                  ? 'ring-2 ring-primary ring-offset-2' 
                  : ''
              }`}
            >
              {period.name}
              {period.discount && (
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  -{period.discount}
                </span>
              )}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={index}
                className={`relative overflow-hidden border-2 ${
                  plan.popular 
                    ? 'border-primary shadow-glow scale-105' 
                    : 'border-border shadow-card'
                } hover:shadow-elegant transition-smooth bg-gradient-to-br ${plan.gradient}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-primary text-white text-center py-2 text-sm font-semibold">
                    🔥 Самый популярный
                  </div>
                )}
                
                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-8'}`}>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                  <div className="flex items-end justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-foreground">{getPrice(plan.basePrice, selectedPeriod)}</span>
                    <span className="text-lg text-muted-foreground pb-1">
                      {selectedPeriod === "monthly" ? "/месяц" : selectedPeriod === "quarterly" ? "/3 месяца" : selectedPeriod === "biannual" ? "/6 месяцев" : "/год"}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-investment-green flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.buttonVariant}
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      // Navigate to payment form with pre-filled data
                      const params = new URLSearchParams({
                        plan: plan.name,
                        price: getPrice(plan.basePrice, selectedPeriod),
                        period: selectedPeriod,
                        role: selectedRole
                      });
                      window.location.href = `/payment?${params.toString()}`;
                    }}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional pricing info */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-2xl p-8 shadow-card max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">Дополнительные услуги</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Транзакционные сборы</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Комиссия с проектов: 5%</li>
                  <li>• Escrow-сервис: 3%</li>
                  <li>• Ускоренные платежи: 1%</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Продвижение</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Топ поиска: от $25/неделя</li>
                  <li>• Избранные проекты: от $50/неделя</li>
                  <li>• Отраслевой топ: от $35/неделя</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;