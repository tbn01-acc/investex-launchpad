import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 border rounded-xl">
    <div className="text-sm text-muted-foreground mb-1">{label}</div>
    <div className="text-xl font-semibold">{value}</div>
  </div>
);

const PlatformAnalyticsSection = () => {
  return (
    <div className="space-y-6">
      {/* Финансовые метрики */}
      <Card>
        <CardHeader>
          <CardTitle>Финансовые метрики (Unit Economics)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatItem label="LTV/CAC" value="854" />
          <StatItem label="Payback Period" value="3 месяца" />
          <StatItem label="Gross Margin" value="85%" />
          <StatItem label="EBITDA Margin (к 3-му году)" value="45%" />
          <StatItem label="Monthly Churn" value="2%" />
          <StatItem label="MRR Growth" value="25%/мес" />
          <StatItem label="ARR (к концу 2026)" value="€2.5M" />
          <StatItem label="Net Revenue Retention" value="140%" />
          <StatItem label="CAGR Revenue (7 лет)" value="78%" />
        </CardContent>
      </Card>

      {/* Пользовательские метрики */}
      <Card>
        <CardHeader>
          <CardTitle>Пользовательские метрики</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatItem label="CAC" value="€450" />
          <StatItem label="Viral K-factor" value="1.4" />
          <StatItem label="MAU Growth" value="35%" />
          <StatItem label="DAU" value="85% от зарегистрированных" />
          <StatItem label="NPS" value="73" />
          <StatItem label="CSAT" value="4.7/5" />
          <StatItem label="PMF Score" value="64.5%" />
          <StatItem label="Feature Adoption" value="78%" />
        </CardContent>
      </Card>

      {/* Технические KPI (AI Due Diligence) */}
      <Card>
        <CardHeader>
          <CardTitle>Технические KPI (AI Due Diligence)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatItem label="AI Prediction Accuracy" value="92.3%" />
          <StatItem label="Сокращение времени DD" value="90%" />
          <StatItem label="False Positive Rate" value="6.2%" />
          <StatItem label="Скорость обработки" value="1000+ параметров/сек" />
          <StatItem label="Обработано заявок" value="10,000+" />
          <StatItem label="Проанализировано данных" value="50M+" />
          <StatItem label="Датасет обучения" value="100,000 стартапов" />
        </CardContent>
      </Card>

      {/* Рыночные показатели */}
      <Card>
        <CardHeader>
          <CardTitle>Рыночные показатели</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatItem label="Доля рынка (Россия, к 3-му году)" value="25%" />
          <StatItem label="TAM" value="$17.5B" />
          <StatItem label="SAM" value="$2.5B" />
          <StatItem label="Competitive Advantage Score" value="9.2/10" />
          <StatItem label="Страны запуска (к 3-му году)" value="7" />
          <StatItem label="Доля международной выручки" value="35%" />
          <StatItem label="Cross-border Transactions" value="€500M" />
          <StatItem label="Partner Network" value="150+" />
        </CardContent>
      </Card>

      {/* Инвестиционные метрики */}
      <Card>
        <CardHeader>
          <CardTitle>Инвестиционные метрики</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatItem label="Capital Efficiency Ratio" value="3.2" />
          <StatItem label="Runway" value="24 месяца" />
          <StatItem label="ROI (прогноз)" value="320%" />
          <StatItem label="Series A Readiness" value="85%" />
          <StatItem label="IPO Timeline" value="3-5 лет" />
          <StatItem label="Exit Multiple (прогноз)" value="15-20x" />
          <StatItem label="Valuation Growth (3 года)" value="10-12x" />
        </CardContent>
      </Card>

      {/* Выводы для инвесторов */}
      <Card>
        <CardHeader>
          <CardTitle>Ключевые выводы для инвесторов</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatItem label="Доказанная монетизация" value="LTV/CAC = 854" />
          <StatItem label="Путь к прибыльности" value="24 месяца" />
          <StatItem label="Точность AI" value="92.3%" />
          <StatItem label="Огромный рынок" value="$17.5B TAM" />
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformAnalyticsSection;
