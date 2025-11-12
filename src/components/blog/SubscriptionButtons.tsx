import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Bell, BellOff } from 'lucide-react';
import { toast } from 'sonner';

interface SubscriptionButtonsProps {
  category?: string;
  authorId?: string;
  className?: string;
}

export const SubscriptionButtons = ({ category, authorId, className }: SubscriptionButtonsProps) => {
  const { user } = useAuth();
  const { hasPremiumAccess } = useSubscription();
  const [subscribedToCategory, setSubscribedToCategory] = useState(false);
  const [subscribedToAuthor, setSubscribedToAuthor] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && hasPremiumAccess) {
      loadSubscriptions();
    }
  }, [user, hasPremiumAccess, category, authorId]);

  const loadSubscriptions = async () => {
    if (!user) return;

    try {
      if (category) {
        const { data } = await supabase
          .from('blog_category_subscriptions')
          .select('id')
          .eq('user_id', user.id)
          .eq('category', category)
          .single();
        setSubscribedToCategory(!!data);
      }

      if (authorId) {
        const { data } = await supabase
          .from('blog_author_subscriptions')
          .select('id')
          .eq('subscriber_id', user.id)
          .eq('author_id', authorId)
          .single();
        setSubscribedToAuthor(!!data);
      }
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    }
  };

  const handleCategorySubscription = async () => {
    if (!user) {
      toast.error('Необходимо авторизоваться');
      return;
    }

    if (!hasPremiumAccess) {
      toast.error('Подписка на категории доступна только на платных тарифах');
      return;
    }

    setLoading(true);

    try {
      if (subscribedToCategory) {
        const { error } = await supabase
          .from('blog_category_subscriptions')
          .delete()
          .eq('user_id', user.id)
          .eq('category', category);

        if (error) throw error;
        setSubscribedToCategory(false);
        toast.success('Вы отписались от категории');
      } else {
        const { error } = await supabase
          .from('blog_category_subscriptions')
          .insert({
            user_id: user.id,
            category: category!
          });

        if (error) throw error;
        setSubscribedToCategory(true);
        toast.success('Вы подписались на категорию');
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast.error('Ошибка при обновлении подписки');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorSubscription = async () => {
    if (!user) {
      toast.error('Необходимо авторизоваться');
      return;
    }

    if (!hasPremiumAccess) {
      toast.error('Подписка на авторов доступна только на платных тарифах');
      return;
    }

    setLoading(true);

    try {
      if (subscribedToAuthor) {
        const { error } = await supabase
          .from('blog_author_subscriptions')
          .delete()
          .eq('subscriber_id', user.id)
          .eq('author_id', authorId);

        if (error) throw error;
        setSubscribedToAuthor(false);
        toast.success('Вы отписались от автора');
      } else {
        const { error } = await supabase
          .from('blog_author_subscriptions')
          .insert({
            subscriber_id: user.id,
            author_id: authorId!
          });

        if (error) throw error;
        setSubscribedToAuthor(true);
        toast.success('Вы подписались на автора');
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast.error('Ошибка при обновлении подписки');
    } finally {
      setLoading(false);
    }
  };

  if (!hasPremiumAccess) {
    return null;
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      {category && (
        <Button
          variant={subscribedToCategory ? 'default' : 'outline'}
          size="sm"
          onClick={handleCategorySubscription}
          disabled={loading}
        >
          {subscribedToCategory ? <BellOff className="mr-2 h-4 w-4" /> : <Bell className="mr-2 h-4 w-4" />}
          {subscribedToCategory ? 'Отписаться' : 'Подписаться на категорию'}
        </Button>
      )}

      {authorId && (
        <Button
          variant={subscribedToAuthor ? 'default' : 'outline'}
          size="sm"
          onClick={handleAuthorSubscription}
          disabled={loading}
        >
          {subscribedToAuthor ? <BellOff className="mr-2 h-4 w-4" /> : <Bell className="mr-2 h-4 w-4" />}
          {subscribedToAuthor ? 'Отписаться' : 'Подписаться на автора'}
        </Button>
      )}
    </div>
  );
};