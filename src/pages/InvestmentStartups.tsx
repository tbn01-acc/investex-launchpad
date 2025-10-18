import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, Trophy, Clock, Users, DollarSign, Target, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';

const InvestmentStartups = () => {
  const { toast } = useToast();
  const { profile } = useAuth();
  const { t } = useLanguage();
  const [dbSandboxProjects, setDbSandboxProjects] = useState<any[]>([]);
  const [dbGoldProjects, setDbGoldProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestmentProjects();
  }, []);

  const fetchInvestmentProjects = async () => {
    try {
      const { data: sandbox, error: sandboxError } = await supabase
        .from('projects')
        .select('*')
        .eq('project_category', 'sandbox');

      const { data: gold, error: goldError } = await supabase
        .from('projects')
        .select('*')
        .eq('project_category', 'gold_fund');

      if (sandboxError) throw sandboxError;
      if (goldError) throw goldError;

      setDbSandboxProjects(sandbox || []);
      setDbGoldProjects(gold || []);
    } catch (error: any) {
      console.error('Error fetching investment projects:', error);
      toast({
        title: 'Ошибка загрузки проектов',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const sandboxProjects = [
    ...dbSandboxProjects.map(p => ({
      id: p.id,
      company: p.title,
      description: p.description || 'Нет описания',
      stage: p.project_stage || 'Неизвестно',
      seeking: p.funding_goal || 0,
      minInvestment: p.min_investment || 0,
      earlyBirdBonus: '15% bonus shares',
      restrictedAccess: true,
      investorsCount: 8,
      spotsLeft: 12,
      verificationRequired: 'Квалифицированный инвестор',
      potentialROI: '10x-50x'
    })),
    {
      id: 'demo1',
      company: 'AI Healthcare Diagnostic',
      description: 'Платформа ранней диагностики заболеваний с использованием AI',
      stage: 'Beta Testing',
      seeking: 25000000,
      minInvestment: 250000,
      earlyBirdBonus: '15% bonus shares',
      restrictedAccess: true,
      investorsCount: 8,
      spotsLeft: 12,
      verificationRequired: 'Квалифицированный инвестор',
      potentialROI: '10x-50x'
    },
    {
      id: 'demo2',
      company: 'BlockChain Logistics',
      description: 'Децентрализованная платформа для управления цепочками поставок',
      stage: 'MVP Ready',
      seeking: 18000000,
      minInvestment: 500000,
      earlyBirdBonus: '20% discount',
      restrictedAccess: true,
      investorsCount: 5,
      spotsLeft: 10,
      verificationRequired: 'Аккредитованный инвестор',
      potentialROI: '15x-100x'
    }
  ];

  const goldFundProjects = [
    ...dbGoldProjects.map(p => ({
      id: p.id,
      company: p.title,
      description: p.description || 'Нет описания',
      provenROI: '+380%',
      yearlyGrowth: '+145%',
      fundingRounds: 4,
      totalRaised: p.funding_goal || 0,
      currentValuation: (p.funding_goal || 0) * 5,
      nextRound: 'Series C',
      seeking: p.funding_goal || 0,
      minInvestment: p.min_investment || 0,
      leadInvestors: ['Top Venture Fund', 'Strategic Partner'],
      achievements: ['Top 10 StartUp 2024', 'Profitable', '500K+ Users']
    })),
    {
      id: 'demo_gold1',
      company: 'SuperApp Platform',
      description: 'Экосистема суперприложений для B2B и B2C',
      provenROI: '+380%',
      yearlyGrowth: '+145%',
      fundingRounds: 4,
      totalRaised: 250000000,
      currentValuation: 1200000000,
      nextRound: 'Series C',
      seeking: 100000000,
      minInvestment: 5000000,
      leadInvestors: ['Top Venture Fund', 'Strategic Partner'],
      achievements: ['Top 10 StartUp 2024', 'Profitable', '500K+ Users']
    },
    {
      id: 'demo_gold2',
      company: 'BioTech Innovation',
      description: 'Разработка персонализированной медицины на основе генетики',
      provenROI: '+520%',
      yearlyGrowth: '+200%',
      fundingRounds: 3,
      totalRaised: 180000000,
      currentValuation: 950000000,
      nextRound: 'Pre-IPO',
      seeking: 150000000,
      minInvestment: 10000000,
      leadInvestors: ['Healthcare Fund', 'Pharma Corp'],
      achievements: ['FDA Approval', 'Patent Portfolio', 'Clinical Trials']
    }
  ];

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'M₽';
    }
    return amount.toLocaleString() + '₽';
  };

  const isAccredited = profile?.verification_level === 'accredited' || 
                       profile?.verification_level === 'professional' || 
                       profile?.verification_level === 'qualified';

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <section className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{t('investments.startups')}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {t('investments.startups')} - эксклюзивный доступ к песочнице ранних стартапов и золотому фонду проверенных проектов
            </p>
          </section>

          {/* Sandbox Projects */}
          <section className="mb-16">
            <div className="bg-accent/10 border border-accent p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-2 flex items-center">
                <Lock className="w-6 h-6 mr-2 text-accent" />
                Песочница ранних стартапов
              </h2>
              <p className="text-muted-foreground mb-3">
                Эксклюзивный доступ к перспективным стартапам до их публичного размещения. Только для квалифицированных и аккредитованных инвесторов.
              </p>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-sm">Требуется верификация статуса инвестора</span>
              </div>
            </div>

            <div className="grid gap-6">
              {sandboxProjects.map((project) => (
                <Card key={project.id} className="border-accent/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-accent text-accent-foreground">
                            <Lock className="w-3 h-3 mr-1" />
                            Ограниченный доступ
                          </Badge>
                          <Badge variant="secondary">{project.stage}</Badge>
                        </div>
                        <CardTitle className="text-2xl">{project.company}</CardTitle>
                        <CardDescription className="mt-2">
                          {project.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Цель привлечения</div>
                        <div className="text-xl font-bold text-primary">{formatAmount(project.seeking)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Мин. инвестиция</div>
                        <div className="text-xl font-bold">{formatAmount(project.minInvestment)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Потенциальная доходность</div>
                        <div className="text-xl font-bold text-secondary">{project.potentialROI}</div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{project.investorsCount} инвесторов</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{project.spotsLeft} мест</span>
                          </div>
                        </div>
                        <Badge variant="outline">{project.earlyBirdBonus}</Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      {isAccredited ? (
                        <Button className="flex-1">
                          <Target className="w-4 h-4 mr-2" />
                          Инвестировать
                        </Button>
                      ) : (
                        <Button className="flex-1" variant="outline" disabled>
                          <Lock className="w-4 h-4 mr-2" />
                          Требуется аккредитация
                        </Button>
                      )}
                      <Button variant="outline">Подробнее</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Gold Fund Projects */}
          <section>
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-2 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                Золотой фонд проверенных проектов
              </h2>
              <p className="text-muted-foreground">
                Проекты с доказанной историей успеха, стабильным ростом и высоким ROI. Для серьезных инвесторов.
              </p>
            </div>

            <div className="grid gap-6">
              {goldFundProjects.map((project) => (
                <Card key={project.id} className="border-yellow-500/30">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-yellow-500 text-yellow-950">
                            <Trophy className="w-3 h-3 mr-1" />
                            Золотой фонд
                          </Badge>
                          <Badge variant="secondary">{project.nextRound}</Badge>
                          {project.achievements.slice(0, 1).map((achievement, idx) => (
                            <Badge key={idx} variant="outline">{achievement}</Badge>
                          ))}
                        </div>
                        <CardTitle className="text-2xl">{project.company}</CardTitle>
                        <CardDescription className="mt-2">
                          {project.description}
                        </CardDescription>
                      </div>
                      <div className="text-right ml-6">
                        <div className="text-sm text-muted-foreground">Доказанный ROI</div>
                        <div className="text-2xl font-bold text-secondary">{project.provenROI}</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Текущая оценка</div>
                        <div className="text-lg font-bold">{formatAmount(project.currentValuation)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Привлечено</div>
                        <div className="text-lg font-bold">{formatAmount(project.totalRaised)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Рост в год</div>
                        <div className="text-lg font-bold text-secondary">{project.yearlyGrowth}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Раундов</div>
                        <div className="text-lg font-bold">{project.fundingRounds}</div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Текущий раунд</div>
                          <div className="font-semibold">{formatAmount(project.seeking)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Мин. инвестиция</div>
                          <div className="font-semibold">{formatAmount(project.minInvestment)}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Инвестировать
                      </Button>
                      <Button variant="outline">Подробнее</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InvestmentStartups;
