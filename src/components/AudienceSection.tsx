import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Building, 
  Lightbulb, 
  TrendingUp, 
  Code, 
  Briefcase,
  Rocket,
  DollarSign,
  CheckCircle,
  Target
} from "lucide-react";
import audienceImage from "@/assets/audience-realistic.jpg";

const AudienceSection = () => {
  const audiences = [
    {
      title: "Фрилансеры",
      subtitle: "Найдите проекты мечты",
      icon: Code,
      color: "bg-investment-green",
      features: [
        "Аттестация и верификация навыков",
        "Персонализированные рекомендации",
        "Прозрачная рейтинговая система", 
        "Инструменты управления проектами",
        "Безопасная система платежей"
      ],
      cta: "Начать работать",
      gradient: "from-investment-green/20 to-investment-green/5"
    },
    {
      title: "Аутсорсеры",
      subtitle: "Управляйте командами и проектами",
      icon: Building,
      color: "bg-fintech-blue", 
      features: [
        "Управление внутренними командами",
        "Централизованные клиентские проекты",
        "Инструменты бюджетирования",
        "Портфолио компании",
        "CRM интеграции"
      ],
      cta: "Для бизнеса",
      gradient: "from-fintech-blue/20 to-fintech-blue/5"
    },
    {
      title: "Фаундеры",
      subtitle: "Воплотите идеи в реальность",
      icon: Lightbulb,
      color: "bg-startup-orange",
      features: [
        "Шаблоны бизнес-планов",
        "Поиск команды и специалистов",
        "Управление развитием проекта",
        "Подготовка к инвестициям",
        "Инструменты для MVP"
      ],
      cta: "Создать стартап",
      gradient: "from-startup-orange/20 to-startup-orange/5"
    },
    {
      title: "Инвесторы",
      subtitle: "Инвестируйте в перспективные проекты",
      icon: TrendingUp,
      color: "bg-primary",
      features: [
        "Умный поиск инвестиционных возможностей",
        "Детальная аналитика проектов",
        "Управление портфелем",
        "Due diligence инструменты",
        "Юридическое сопровождение"
      ],
      cta: "Инвестировать",
      gradient: "from-primary/20 to-primary/5"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="mb-8">
            <img
              src={audienceImage}
              alt="Четыре целевые аудитории InvestEx: фрилансеры, аутсорсеры, фаундеры и инвесторы"
              className="mx-auto rounded-2xl shadow-card max-w-2xl w-full h-64 object-cover"
            />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Решения для каждого
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Персонализированные интерфейсы и функции для фрилансеров, аутсорсеров, 
            фаундеров и инвесторов в единой экосистеме
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {audiences.map((audience, index) => {
            const IconComponent = audience.icon;
            return (
              <Card 
                key={index} 
                className={`relative overflow-hidden border-0 shadow-card hover:shadow-elegant transition-smooth hover:scale-105 bg-gradient-to-br ${audience.gradient}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${audience.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-foreground">{audience.title}</CardTitle>
                      <p className="text-muted-foreground">{audience.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {audience.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-investment-green flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className={`w-full ${audience.color} hover:opacity-90 text-white shadow-card`}>
                    {audience.cta}
                    <Target className="w-4 h-4" />
                  </Button>
                </CardContent>
                
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;