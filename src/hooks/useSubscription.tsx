import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export type SubscriptionTier = 'free' | 'basic' | 'professional' | 'enterprise';

interface SubscriptionData {
  tier: SubscriptionTier;
  isActive: boolean;
  expiresAt?: string;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData>({
    tier: 'free',
    isActive: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubscription = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error loading subscription:', error);
          setLoading(false);
          return;
        }

        if (data) {
          setSubscription({
            tier: data.tier as SubscriptionTier,
            isActive: data.is_active,
            expiresAt: data.expires_at || undefined
          });
        }
      } catch (error) {
        console.error('Error loading subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSubscription();
  }, [user]);

  const hasPremiumAccess = () => {
    return subscription.isActive && subscription.tier !== 'free';
  };

  return {
    ...subscription,
    hasPremiumAccess: hasPremiumAccess(),
    loading
  };
};
