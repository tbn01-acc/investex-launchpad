import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export type SubscriptionTier = 'free' | 'basic' | 'professional' | 'enterprise';

interface SubscriptionData {
  tier: SubscriptionTier;
  isActive: boolean;
  expiresAt?: string;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription] = useState<SubscriptionData>({
    tier: 'free',
    isActive: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading subscription data
    // TODO: Replace with actual Supabase query when subscriptions table is created
    const loadSubscription = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      // For now, return free tier for all users
      // This will be replaced with real subscription checks
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    loadSubscription();
  }, [user]);

  const hasPremiumAccess = () => {
    // TODO: Implement actual subscription check
    // For now, return false (all users are free tier)
    return subscription.isActive && subscription.tier !== 'free';
  };

  return {
    ...subscription,
    hasPremiumAccess: hasPremiumAccess(),
    loading
  };
};
