import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Star, Sparkles } from 'lucide-react';
import { UserRole, SubscriptionTier, ROLE_CONFIGS } from '@/types/roles';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface PricingData {
  role: UserRole;
  tier: SubscriptionTier;
  price_monthly: number;
  features: string[];
  limits: Record<string, any>;
}

interface DatabasePricingData {
  id: string;
  role: UserRole;
  tier: SubscriptionTier;
  price_monthly: number;
  features: any; // JSON type from database
  limits: any; // JSON type from database
  created_at: string;
  updated_at: string;
}

interface PricingCalculatorProps {
  selectedRole: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ 
  selectedRole,
  onRoleChange 
}) => {
  const [pricing, setPricing] = useState<PricingData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const periods = [
    { months: 1, label: '1 месяц', discount: 0 },
    { months: 3, label: '3 месяца', discount: 5 },
    { months: 6, label: '6 месяцев', discount: 10 },
    { months: 12, label: '12 месяцев', discount: 25 }
  ];

  useEffect(() => {
    fetchPricing();
  }, [selectedRole]);

  const fetchPricing = async () => {
    try {

      const { data, error } = await supabase
        .from('pricing_config')
        .select('*')
        .eq('role', selectedRole)
        .order('price_monthly');

      if (error) throw error;
      
      // Transform database data to component format
      const transformedData: PricingData[] = (data || []).map((item: DatabasePricingData) => ({
        role: item.role,
        tier: item.tier,
        price_monthly: item.price_monthly,
        features: Array.isArray(item.features) ? item.features : [],
        limits: typeof item.limits === 'object' ? item.limits : {}
      }));
      
      setPricing(transformedData);
    } catch (error) {
      console.error('Error fetching pricing:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = (basePrice: number, months: number) => {
    const discount = periods.find(p => p.months === months)?.discount || 0;
    const totalPrice = basePrice * months;
    const discountedPrice = totalPrice * (1 - discount / 100);
    return {
      total: discountedPrice,
      monthly: discountedPrice / months,
      savings: totalPrice - discountedPrice
    };
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const handleSelectPlan = (tier: SubscriptionTier, price: number) => {
    const selectedPeriodData = periods.find(p => p.months === selectedPeriod);
    const finalPrice = calculatePrice(price, selectedPeriod);
    
    navigate('/payment', {
      state: {
        role: selectedRole,
        tier,
        period: selectedPeriod,
        periodLabel: selectedPeriodData?.label,
        basePrice: price,
        finalPrice: finalPrice.total,
        monthlyPrice: finalPrice.monthly,
        discount: selectedPeriodData?.discount || 0,
        savings: finalPrice.savings
      }
    });
  };

  const getTierIcon = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'start': return '⚡';
      case 'profi': return '⭐';
      case 'premium': return '💎';
      default: return '📦';
    }
  };

  const getTierVariant = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'start': return 'outline';
      case 'profi': return 'default';
      case 'premium': return 'secondary';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Role Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <span className="text-4xl">{ROLE_CONFIGS[selectedRole].icon}</span>
          <div>
            <h2 className="text-3xl font-bold">{ROLE_CONFIGS[selectedRole].name}</h2>
            <p className="text-muted-foreground">{ROLE_CONFIGS[selectedRole].description}</p>
          </div>
        </div>
        
        {onRoleChange && (
          <Button variant="outline" onClick={() => window.history.back()}>
            ← Выбрать другую роль
          </Button>
        )}
      </div>

      {/* Period Selector */}
      <div className="flex flex-wrap justify-center gap-2">
        {periods.map((period) => (
          <Button
            key={period.months}
            variant={selectedPeriod === period.months ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod(period.months)}
            className="relative"
          >
            {period.label}
            {period.discount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs">
                -{period.discount}%
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {pricing.map((plan) => {
          const prices = calculatePrice(plan.price_monthly, selectedPeriod);
          const isPopular = plan.tier === 'profi';
          
          return (
            <Card 
              key={plan.tier}
              className={`relative ${isPopular ? 'ring-2 ring-primary shadow-lg scale-105' : ''}`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    🔥 Популярный
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="text-3xl mb-2">{getTierIcon(plan.tier)}</div>
                <CardTitle className="text-xl capitalize">{plan.tier}</CardTitle>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">
                    {plan.price_monthly === 0 ? (
                      'Бесплатно'
                    ) : (
                      <>₽{formatPrice(Math.round(prices.monthly))}</>
                    )}
                  </div>
                  {plan.price_monthly > 0 && (
                    <>
                      <div className="text-sm text-muted-foreground">в месяц</div>
                      {selectedPeriod > 1 && (
                        <div className="space-y-1">
                          <div className="text-lg font-semibold text-primary">
                            ₽{formatPrice(prices.total)} за {selectedPeriod} мес.
                          </div>
                          {prices.savings > 0 && (
                            <div className="text-sm text-green-600">
                              Экономия: ₽{formatPrice(prices.savings)}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={getTierVariant(plan.tier)}
                  className="w-full"
                  onClick={() => handleSelectPlan(plan.tier, plan.price_monthly)}
                >
                  {plan.price_monthly === 0 ? 'Начать бесплатно' : 'Выбрать план'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Services */}
      <div className="bg-muted/50 rounded-lg p-6 text-center space-y-4">
        <h3 className="text-xl font-semibold">Дополнительные услуги</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-medium">Escrow-сервис</div>
            <div className="text-muted-foreground">Комиссия 3%</div>
          </div>
          <div>
            <div className="font-medium">Ускоренные платежи</div>
            <div className="text-muted-foreground">Комиссия 1%</div>
          </div>
          <div>
            <div className="font-medium">Промо-пакеты</div>
            <div className="text-muted-foreground">От ₽5,000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;