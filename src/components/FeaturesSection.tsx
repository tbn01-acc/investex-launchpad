import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  Shield, 
  Globe, 
  BarChart3, 
  Users, 
  Workflow,
  Award,
  CreditCard,
  FileText,
  Brain
} from "lucide-react";
import featuresImage from "@/assets/features-realistic.jpg";

const FeaturesSection = () => {
  const features = [
    {
      icon: Workflow,
      title: "Адаптивная методология",
      description: "Progressive Elaboration, Agile, Scrumban и гибридные подходы для различных типов проектов",
      color: "text-primary"
    },
    {
      icon: Award,
      title: "Система аттестации",
      description: "Многоуровневое тестирование навыков и верификация компетенций с получением сертификатов",
      color: "text-investment-green"
    },
    {
      icon: BarChart3,
      title: "Инвестиционная биржа",
      description: "Площадка для размещения проектов, поиска инвесторов и проведения раундов финансирования",
      color: "text-fintech-blue"
    },
    {
      icon: Shield,
      title: "Безопасность данных",
      description: "Многоуровневая защита, соответствие GDPR и CCPA, шифрование на всех этапах",
      color: "text-destructive"
    },
    {
      icon: Globe,
      title: "Международная поддержка",
      description: "Мультиязычность, различные валюты и интеграция с локальными платежными системами",
      color: "text-startup-orange"
    },
    {
      icon: Brain,
      title: "ИИ рекомендации",
      description: "Персонализированные предложения проектов и специалистов на основе машинного обучения",
      color: "text-purple-600"
    },
    {
      icon: CreditCard,
      title: "Escrow платежи",
      description: "Безопасное хранение средств с гарантией выплат при выполнении условий проекта",
      color: "text-green-600"
    },
    {
      icon: FileText,
      title: "База знаний",
      description: "Юридические шаблоны, регламенты и документы для различных юрисдикций",
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: "Единая экосистема",
      description: "Все участники проектного цикла в одной платформе с персонализированными интерфейсами",
      color: "text-indigo-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-accent">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="mb-8">
            <img
              src={featuresImage}
              alt="Ключевые функции и возможности платформы InvestEx"
              className="mx-auto rounded-2xl shadow-card max-w-2xl w-full h-64 object-cover"
            />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Мощные возможности
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Все инструменты для эффективной работы с проектами и инвестициями в одной платформе
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-card hover:shadow-elegant transition-smooth hover:scale-105 group"
              >
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}>
                    <IconComponent className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;