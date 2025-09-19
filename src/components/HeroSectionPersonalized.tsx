import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { UserRole, ROLE_CONFIGS } from '@/types/roles';
import { ArrowRight, TrendingUp, Users, Building, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionPersonalizedProps {
  userRole?: UserRole;
  onRoleSelect?: () => void;
}

interface RoleHeroConfig {
  title: string;
  subtitle: string;
  description: string;
  stats: Array<{
    icon: React.ReactNode;
    label: string;
    value: string;
  }>;
  cta: {
    primary: string;
    secondary: string;
  };
  gradient: string;
}

const ROLE_HERO_CONFIGS: Record<UserRole, RoleHeroConfig> = {
  investor: {
    title: 'VIP Инвестиционная платформа',
    subtitle: 'Эксклюзивные проекты от 10 млн ₽',
    description: 'Доступ к премиальным инвестиционным возможностям, Dutch auction, персональный менеджер и расширенная аналитика.',
    stats: [
      { icon: <TrendingUp className="h-5 w-5" />, label: 'Средний ROI', value: '127%' },
      { icon: <Target className="h-5 w-5" />, label: 'Успешных сделок', value: '89%' },
      { icon: <Building className="h-5 w-5" />, label: 'VIP проектов', value: '42' },
      { icon: <Users className="h-5 w-5" />, label: 'Активных инвесторов', value: '156' }
    ],
    cta: { primary: 'Начать инвестировать', secondary: 'Посмотреть проекты' },
    gradient: 'bg-gradient-to-r from-purple-600 to-blue-600'
  },
  subsidiary_investor: {
    title: 'Инвестиции до 10 млн ₽',
    subtitle: 'Доступные возможности для роста капитала',
    description: 'Инвестируйте в перспективные проекты с минимальным входным порогом и получите доступ к профессиональным инструментам.',
    stats: [
      { icon: <TrendingUp className="h-5 w-5" />, label: 'Средний ROI', value: '84%' },
      { icon: <Target className="h-5 w-5" />, label: 'Доступных проектов', value: '234' },
      { icon: <Building className="h-5 w-5" />, label: 'Мин. инвестиция', value: '50К ₽' },
      { icon: <Users className="h-5 w-5" />, label: 'Инвесторов в сети', value: '1,247' }
    ],
    cta: { primary: 'Начать инвестировать', secondary: 'Изучить возможности' },
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500'
  },
  founder: {
    title: 'Платформа для фаундеров',
    subtitle: 'Привлекайте инвестиции и развивайте проекты',
    description: 'Полный набор инструментов для создания, управления и масштабирования вашего стартапа с доступом к инвесторам.',
    stats: [
      { icon: <TrendingUp className="h-5 w-5" />, label: 'Привлечено средств', value: '2.1 млрд ₽' },
      { icon: <Target className="h-5 w-5" />, label: 'Успешных проектов', value: '78%' },
      { icon: <Building className="h-5 w-5" />, label: 'Активных проектов', value: '189' },
      { icon: <Users className="h-5 w-5" />, label: 'Фаундеров на платформе', value: '567' }
    ],
    cta: { primary: 'Создать проект', secondary: 'Найти инвесторов' },
    gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
  },
  co_founder: {
    title: 'Платформа для ко-фаундеров',
    subtitle: 'Совместное создание успешных проектов',
    description: 'Найдите партнеров, участвуйте в проектах и развивайте бизнес вместе с единомышленниками.',
    stats: [
      { icon: <Users className="h-5 w-5" />, label: 'Успешных партнерств', value: '89%' },
      { icon: <Building className="h-5 w-5" />, label: 'Совместных проектов', value: '134' },
      { icon: <Target className="h-5 w-5" />, label: 'Средний успех', value: '73%' },
      { icon: <TrendingUp className="h-5 w-5" />, label: 'Рост команд', value: '+156%' }
    ],
    cta: { primary: 'Найти партнеров', secondary: 'Присоединиться к проекту' },
    gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
  },
  co_owner: {
    title: 'Поиск проектов для участия',
    subtitle: 'Долгосрочные инвестиции в развитие',
    description: 'Становитесь совладельцем перспективных проектов и участвуйте в их стратегическом развитии.',
    stats: [
      { icon: <Building className="h-5 w-5" />, label: 'Проектов для участия', value: '45' },
      { icon: <TrendingUp className="h-5 w-5" />, label: 'Средняя доходность', value: '92%' },
      { icon: <Users className="h-5 w-5" />, label: 'Активных участников', value: '289' },
      { icon: <Target className="h-5 w-5" />, label: 'Успешных вложений', value: '87%' }
    ],
    cta: { primary: 'Найти проекты', secondary: 'Начать анализ' },
    gradient: 'bg-gradient-to-r from-indigo-500 to-purple-500'
  },
  job_seeker: {
    title: 'Карьерные возможности',
    subtitle: 'Найдите работу в инновационных проектах',
    description: 'Бесплатный доступ к вакансиям в стартапах, создание портфолио и развитие карьеры в сфере инноваций.',
    stats: [
      { icon: <Target className="h-5 w-5" />, label: 'Открытых вакансий', value: '1,234' },
      { icon: <Building className="h-5 w-5" />, label: 'Компаний-партнеров', value: '89' },
      { icon: <Users className="h-5 w-5" />, label: 'Успешных трудоустройств', value: '456' },
      { icon: <TrendingUp className="h-5 w-5" />, label: 'Рост зарплат', value: '+67%' }
    ],
    cta: { primary: 'Найти работу', secondary: 'Создать резюме' },
    gradient: 'bg-gradient-to-r from-cyan-500 to-blue-500'
  },
  freelancer: {
    title: 'Фриланс экосистема',
    subtitle: 'Проектные задачи и портфолио',
    description: 'Найдите проекты, создайте портфолио, отслеживайте время и получайте оплату через escrow.',
    stats: [
      { icon: <Target className="h-5 w-5" />, label: 'Активных проектов', value: '789' },
      { icon: <TrendingUp className="h-5 w-5" />, label: 'Средний доход', value: '120К ₽' },
      { icon: <Users className="h-5 w-5" />, label: 'Фрилансеров', value: '2,341' },
      { icon: <Building className="h-5 w-5" />, label: 'Завершенных задач', value: '5,678' }
    ],
    cta: { primary: 'Найти проекты', secondary: 'Создать портфолио' },
    gradient: 'bg-gradient-to-r from-teal-500 to-green-500'
  },
  outsourcer: {
    title: 'Витрина командных услуг',
    subtitle: 'Управление множественными проектами',
    description: 'Предлагайте услуги команды, управляйте проектами и масштабируйте бизнес через платформу.',
    stats: [
      { icon: <Building className="h-5 w-5" />, label: 'Активных команд', value: '156' },
      { icon: <Target className="h-5 w-5" />, label: 'Проектов в работе', value: '234' },
      { icon: <TrendingUp className="h-5 w-5" />, label: 'Средний оборот', value: '2.4М ₽' },
      { icon: <Users className="h-5 w-5" />, label: 'Довольных клиентов', value: '89%' }
    ],
    cta: { primary: 'Разместить услуги', secondary: 'Найти проекты' },
    gradient: 'bg-gradient-to-r from-amber-500 to-orange-500'
  },
  contractor: {
    title: 'Корпоративные решения',
    subtitle: 'Enterprise услуги и ресурсы',
    description: 'Предоставляйте специализированные корпоративные услуги и участвуйте в крупных проектах.',
    stats: [
      { icon: <Building className="h-5 w-5" />, label: 'Enterprise проектов', value: '67' },
      { icon: <TrendingUp className="h-5 w-5" />, label: 'Средний контракт', value: '15М ₽' },
      { icon: <Users className="h-5 w-5" />, label: 'Корпоративных клиентов', value: '234' },
      { icon: <Target className="h-5 w-5" />, label: 'Завершенных проектов', value: '91%' }
    ],
    cta: { primary: 'Найти контракты', secondary: 'Показать возможности' },
    gradient: 'bg-gradient-to-r from-slate-600 to-slate-800'
  }
};

const HeroSectionPersonalized: React.FC<HeroSectionPersonalizedProps> = ({
  userRole,
  onRoleSelect
}) => {
  if (!userRole) {
    return (
      <section className="relative py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Invest-Ex
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Многослойная инвестиционно-проектная экосистема для всех участников рынка
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-bold">2.1 млрд ₽</div>
                <div className="text-sm text-muted-foreground">Привлечено</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Building className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-bold">567</div>
                <div className="text-sm text-muted-foreground">Проектов</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-bold">4,123</div>
                <div className="text-sm text-muted-foreground">Участников</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-bold">89%</div>
                <div className="text-sm text-muted-foreground">Успешность</div>
              </CardContent>
            </Card>
          </div>
          <Button onClick={onRoleSelect} size="lg" className="mr-4">
            Выбрать роль
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/about">Узнать больше</Link>
          </Button>
        </div>
      </section>
    );
  }

  const heroConfig = ROLE_HERO_CONFIGS[userRole];
  const roleConfig = ROLE_CONFIGS[userRole];

  return (
    <section className={`relative py-20 ${heroConfig.gradient} text-white`}>
      <div className="absolute inset-0 bg-black/20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            {roleConfig.icon} {roleConfig.name}
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {heroConfig.title}
          </h1>
          
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            {heroConfig.subtitle}
          </p>
          
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
            {heroConfig.description}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {heroConfig.stats.map((stat, index) => (
              <Card key={index} className="bg-white/10 border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="text-white/80 mb-2">{stat.icon}</div>
                  <div className="font-bold text-xl">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              {heroConfig.cta.primary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              {heroConfig.cta.secondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionPersonalized;