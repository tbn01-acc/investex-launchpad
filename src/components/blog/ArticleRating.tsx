import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';

interface ArticleRatingProps {
  articleId: string;
  likesCount: number;
  dislikesCount: number;
  onRatingChange?: () => void;
}

export const ArticleRating = ({ articleId, likesCount, dislikesCount, onRatingChange }: ArticleRatingProps) => {
  const { user } = useAuth();
  const [userRating, setUserRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserRating();
    }
  }, [user, articleId]);

  const loadUserRating = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('blog_article_ratings')
        .select('rating')
        .eq('article_id', articleId)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading rating:', error);
        return;
      }

      if (data) {
        setUserRating(data.rating);
      }
    } catch (error) {
      console.error('Error loading rating:', error);
    }
  };

  const handleRating = async (rating: number) => {
    if (!user) {
      toast.error('Необходимо авторизоваться для оценки статьи');
      return;
    }

    setLoading(true);

    try {
      if (userRating === rating) {
        // Remove rating
        const { error } = await supabase
          .from('blog_article_ratings')
          .delete()
          .eq('article_id', articleId)
          .eq('user_id', user.id);

        if (error) throw error;
        setUserRating(null);
        toast.success('Оценка удалена');
      } else {
        // Add or update rating
        const { error } = await supabase
          .from('blog_article_ratings')
          .upsert({
            article_id: articleId,
            user_id: user.id,
            rating
          });

        if (error) throw error;
        setUserRating(rating);
        toast.success(rating === 1 ? 'Статья оценена положительно' : 'Статья оценена отрицательно');
      }

      onRatingChange?.();
    } catch (error) {
      console.error('Error updating rating:', error);
      toast.error('Ошибка при обновлении оценки');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant={userRating === 1 ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleRating(1)}
        disabled={loading}
        className="flex items-center gap-2"
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{likesCount}</span>
      </Button>

      <Button
        variant={userRating === -1 ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleRating(-1)}
        disabled={loading}
        className="flex items-center gap-2"
      >
        <ThumbsDown className="h-4 w-4" />
        <span>{dislikesCount}</span>
      </Button>
    </div>
  );
};