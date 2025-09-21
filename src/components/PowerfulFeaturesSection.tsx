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
    title: "Проверенные эксперты",
    description: "Находите аттестованных специалистов с подтвержденным опытом и рейтингом, основанным на реальных результатах."
  },
  {
    icon: BookOpen,
    title: "База знаний и шаблонов",
    description: "Получите доступ к юридически выверенным шаблонам (NDA, Term Sheet) и экспертным статьям для всех этапов развития бизнеса."
  }
];

const PowerfulFeaturesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-4">Мощные возможности</h2>
        <p className="text-xl text-muted-foreground text-center max-w-4xl mx-auto mb-12">
          Все инструменты для эффективной работы с проектами и инвестициями в одной платформе
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg flex gap-6 items-start">
                <div className="text-3xl text-primary mt-1">
                  <IconComponent size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
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