import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Share2, TrendingUp, Award, DollarSign, Target } from 'lucide-react';

const AmbassadorDashboard = () => {
  const { user, profile } = useAuth();
  const { formatCurrency } = useLanguage();

  const [stats] = useState({
    referrals: 45,
    activeReferrals: 32,
    totalEarnings: 560000,
    monthlyCommission: 85000,
    conversionRate: 71,
    tier: 'Gold'
  });

  const [campaigns] = useState([
    {
      id: 1,
      name: 'Q1 2024 Campaign',
      referrals: 28,
      conversions: 20,
      earnings: 340000,
      status: 'active'
    },
    {
      id: 2,
      name: 'Special Promo',
      referrals: 17,
      conversions: 12,
      earnings: 220000,
      status: 'active'
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Дашборд амбассадора</h1>
        <p className="text-muted-foreground">
          Управляйте рефералами и отслеживайте комиссии
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Рефералы</span>
              <span className="text-2xl font-bold">{stats.referrals}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Активных</span>
              <span className="text-2xl font-bold">{stats.activeReferrals}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Всего заработано</span>
              <span className="text-2xl font-bold">{formatCurrency(stats.totalEarnings)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Месячная комиссия</span>
              <span className="text-2xl font-bold">{formatCurrency(stats.monthlyCommission)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Конверсия</span>
              <span className="text-2xl font-bold">{stats.conversionRate}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Уровень</span>
              <Badge className="mt-1">{stats.tier}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">Кампании</TabsTrigger>
          <TabsTrigger value="referrals">Рефералы</TabsTrigger>
          <TabsTrigger value="materials">Материалы</TabsTrigger>
          <TabsTrigger value="earnings">Доходы</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Активные кампании</h3>
            <Button>
              <Share2 className="w-4 h-4 mr-2" />
              Новая кампания
            </Button>
          </div>

          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{campaign.name}</CardTitle>
                  </div>
                  <Badge variant="outline">{campaign.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Рефералы</p>
                    <p className="text-lg font-semibold">{campaign.referrals}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Конверсии</p>
                    <p className="text-lg font-semibold">{campaign.conversions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Заработано</p>
                    <p className="text-lg font-semibold">{formatCurrency(campaign.earnings)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Конверсия</p>
                    <p className="text-lg font-semibold">
                      {Math.round((campaign.conversions / campaign.referrals) * 100)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="referrals">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                Детальная информация о рефералах будет доступна в следующей версии
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                Маркетинговые материалы будут доступны в следующей версии
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                История доходов будет доступна в следующей версии
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AmbassadorDashboard;
