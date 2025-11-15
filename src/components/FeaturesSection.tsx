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
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Workflow,
      title: t('features.methodology'),
      description: t('features.methodologyDesc'),
      color: "text-primary"
    },
    {
      icon: Award,
      title: t('features.certification'),
      description: t('features.certificationDesc'),
      color: "text-investment-green"
    },
    {
      icon: BarChart3,
      title: t('features.investmentExchange'),
      description: t('features.investmentExchangeDesc'),
      color: "text-fintech-blue"
    },
    {
      icon: Shield,
      title: t('features.dataSecurity'),
      description: t('features.dataSecurityDesc'),
      color: "text-destructive"
    },
    {
      icon: Globe,
      title: t('features.international'),
      description: t('features.internationalDesc'),
      color: "text-startup-orange"
    },
    {
      icon: Brain,
      title: t('features.aiRecommendations'),
      description: t('features.aiRecommendationsDesc'),
      color: "text-purple-600"
    },
    {
      icon: CreditCard,
      title: t('features.escrowPayments'),
      description: t('features.escrowPaymentsDesc'),
      color: "text-green-600"
    },
    {
      icon: FileText,
      title: t('features.knowledgeBase'),
      description: t('features.knowledgeBaseDesc'),
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: t('features.ecosystem'),
      description: t('features.ecosystemDesc'),
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
            {t('features.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('features.subtitle')}
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