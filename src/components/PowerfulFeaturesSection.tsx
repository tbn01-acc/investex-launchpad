import { 
  Brain, 
  LayoutGrid, 
  ArrowLeftRight, 
  FileText, 
  Network, 
  Shield, 
  UsersRound, 
  UserCheck, 
  BookOpen 
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Аналитика и прогнозы",
    description: "Используйте \"Симулятор Успеха\" для оценки рисков и \"Конструктор Команд\" для подбора идеальных специалистов на основе данных."
  },
  {
    icon: LayoutGrid,
    title: "Комплексное управление проектом",
    description: "Ведите задачи, отслеживайте KPI в реальном времени и управляйте контактами (CRM) в едином рабочем пространстве."
  },
  {
    icon: ArrowLeftRight,
    title: "Вторичный рынок долей",
    description: "Получайте ликвидность до экзита. Покупайте и продавайте токенизированные доли в стартапах на безопасном внутреннем рынке."
  },
  {
    icon: FileText,
    title: "Мастер инвест-пакетов",
    description: "Создавайте профессиональные бизнес-планы, финмодели и готовьте комнату данных с помощью пошаговых шаблонов и AI-подсказок."
  },
  {
    icon: Network,
    title: "Карьерные треки и развитие",
    description: "Развивайте свои навыки по персональному плану, повышайте свой уровень и открывайте доступ к более сложным и выгодным проектам."
  },
  {
    icon: Shield,
    title: "Безопасные сделки",
    description: "Все транзакции, от инвестиций до оплаты задач, защищены через эскроу-счета и смарт-контракты."
  },
  {
    icon: UsersRound,
    title: "Единая экосистема",
    description: "Все участники — от инвестора до фрилансера — работают в связанной среде, ускоряя коммуникацию и достижение целей."
  },
  {
    icon: UserCheck,
    title: "Верификация и надежность",
    description: "Система рейтингов, отзывов и документооборота гарантирует высокое качество взаимодействия между участниками."
  },
  {
    icon: BookOpen,
    title: "База знаний и менторство",
    description: "Доступ к курсам, webinar'ам и персональным консультациям от экспертов в инвестициях и управлении проектами."
  }
];

const PowerfulFeaturesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Мощные инструменты для каждого
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Платформа объединяет все необходимые инструменты в одном месте, 
            от AI-аналитики до управления проектами
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-elegant transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PowerfulFeaturesSection;