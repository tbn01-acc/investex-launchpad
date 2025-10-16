import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Target, Zap, DollarSign, BarChart3 } from 'lucide-react';

const StatCard = ({ 
  label, 
  value, 
  icon: Icon,
  trend 
}: { 
  label: string; 
  value: string;
  icon?: any;
  trend?: string;
}) => (
  <Card className="relative overflow-hidden group hover:shadow-md transition-shadow">
    <CardContent className="pt-6">
      <div className="flex items-start justify-between mb-2">
        <div className="text-sm text-muted-foreground">{label}</div>
        {Icon && (
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        )}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      {trend && (
        <Badge variant="secondary" className="text-xs">
          {trend}
        </Badge>
      )}
    </CardContent>
  </Card>
);

const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  </div>
);

const PlatformAnalyticsSection = () => {
  return (
    <div className="space-y-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Аналитика платформы</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Реальные метрики и показатели эффективности нашей платформы
        </p>
      </div>

      {/* Ключевые показатели */}
      <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
        <CardHeader>
          <SectionHeader 
            icon={Target}
            title="Ключевые показатели" 
            subtitle="Главные метрики платформы"
          />
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="LTV/CAC" value="854" icon={TrendingUp} trend="Отличный для B2B SaaS" />
          <StatCard label="Gross Margin" value="85%" icon={DollarSign} trend="Высокая маржинальность" />
          <StatCard label="AI Accuracy" value="92.3%" icon={Zap} trend=">90% индустрия" />
          <StatCard label="TAM" value="$17.5B" icon={BarChart3} trend="Огромный рынок" />
        </CardContent>
      </Card>

      {/* Финансовые метрики */}
      <div>
        <SectionHeader 
          icon={DollarSign}
          title="Финансовые метрики (Unit Economics)" 
          subtitle="Эффективность бизнес-модели"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="Payback Period" value="3 месяца" />
          <StatCard label="EBITDA Margin (к 3-му году)" value="45%" />
          <StatCard label="Monthly Churn" value="2%" />
          <StatCard label="MRR Growth" value="25%/мес" />
          <StatCard label="ARR (к концу 2026)" value="€2.5M" />
          <StatCard label="Net Revenue Retention" value="140%" />
          <StatCard label="CAGR Revenue (7 лет)" value="78%" />
          <StatCard label="Capital Efficiency Ratio" value="3.2" />
          <StatCard label="Runway" value="24 месяца" />
        </div>
      </div>

      {/* Пользовательские метрики */}
      <div>
        <SectionHeader 
          icon={Users}
          title="Пользовательские метрики" 
          subtitle="Вовлеченность и рост аудитории"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="CAC" value="€450" />
          <StatCard label="Viral K-factor" value="1.4" trend="Органический рост" />
          <StatCard label="MAU Growth" value="35%" />
          <StatCard label="DAU" value="85%" trend="от зарегистрированных" />
          <StatCard label="NPS" value="73" trend="Excellent" />
          <StatCard label="CSAT" value="4.7/5" />
          <StatCard label="PMF Score" value="64.5%" trend=">40% = PMF" />
          <StatCard label="Feature Adoption" value="78%" />
        </div>
      </div>

      {/* Технические KPI */}
      <div>
        <SectionHeader 
          icon={Zap}
          title="Технические KPI (AI Due Diligence)" 
          subtitle="Производительность AI-системы"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="Сокращение времени DD" value="90%" />
          <StatCard label="False Positive Rate" value="6.2%" />
          <StatCard label="Скорость обработки" value="1000+ параметров/сек" />
          <StatCard label="Обработано заявок" value="10,000+" />
          <StatCard label="Проанализировано данных" value="50M+" />
          <StatCard label="Датасет обучения" value="100,000 стартапов" />
        </div>
      </div>

      {/* Рыночные показатели */}
      <div>
        <SectionHeader 
          icon={BarChart3}
          title="Рыночные показатели" 
          subtitle="Позиционирование и охват"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="Доля рынка (Россия, к 3-му году)" value="25%" />
          <StatCard label="SAM" value="$2.5B" />
          <StatCard label="Competitive Advantage Score" value="9.2/10" />
          <StatCard label="Страны запуска (к 3-му году)" value="7" />
          <StatCard label="Доля международной выручки" value="35%" />
          <StatCard label="Cross-border Transactions" value="€500M" />
          <StatCard label="Partner Network" value="150+" />
        </div>
      </div>

      {/* Инвестиционные метрики */}
      <div>
        <SectionHeader 
          icon={TrendingUp}
          title="Инвестиционные метрики" 
          subtitle="Привлекательность для инвесторов"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="ROI (прогноз)" value="320%" />
          <StatCard label="Series A Readiness" value="85%" />
          <StatCard label="IPO Timeline" value="3-5 лет" />
          <StatCard label="Exit Multiple (прогноз)" value="15-20x" />
          <StatCard label="Valuation Growth (3 года)" value="10-12x" />
        </div>
      </div>

      {/* Итоговая карточка */}
      <Card className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground border-0">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Почему инвестировать в Invest-Ex?</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div>
                <div className="text-3xl font-bold mb-1">854</div>
                <div className="text-sm opacity-90">LTV/CAC</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">24 мес</div>
                <div className="text-sm opacity-90">До прибыльности</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">92.3%</div>
                <div className="text-sm opacity-90">Точность AI</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">$17.5B</div>
                <div className="text-sm opacity-90">TAM рынка</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformAnalyticsSection;
