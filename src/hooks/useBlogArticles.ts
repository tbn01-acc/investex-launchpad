import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BlogArticleFromDB {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  full_content: string;
  category: string;
  tags: string[];
  published_at: string;
  created_at: string;
  read_time: number;
  image_url: string | null;
  role_type: string;
  content_type: string;
  is_premium: boolean;
  views_count: number;
  likes_count: number;
  dislikes_count: number;
  author: {
    user_id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
    bio: string;
    role: string;
  };
}

interface UseBlogArticlesOptions {
  roleType?: string;
  category?: string;
  contentType?: string;
  limit?: number;
}

export const useBlogArticles = (options: UseBlogArticlesOptions = {}) => {
  const [articles, setArticles] = useState<BlogArticleFromDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('blog_articles')
          .select(`
            id,
            title,
            excerpt,
            content,
            full_content,
            category,
            tags,
            published_at,
            created_at,
            read_time,
            image_url,
            role_type,
            content_type,
            is_premium,
            views_count,
            likes_count,
            dislikes_count,
            author:profiles!blog_articles_author_id_fkey(
              user_id,
              first_name,
              last_name,
              avatar_url,
              bio,
              role
            )
          `)
          .eq('moderation_status', 'approved')
          .eq('is_public', true)
          .order('published_at', { ascending: false });

        if (options.roleType) {
          query = query.eq('role_type', options.roleType);
        }

        if (options.category) {
          query = query.eq('category', options.category);
        }

        if (options.contentType && options.contentType !== 'all') {
          query = query.eq('content_type', options.contentType);
        }

        if (options.limit) {
          query = query.limit(options.limit);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          console.error('Error fetching articles:', fetchError);
          setError(fetchError.message);
          return;
        }

        setArticles(data || []);
      } catch (err) {
        console.error('Error in useBlogArticles:', err);
        setError('Произошла ошибка при загрузке статей');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [options.roleType, options.category, options.contentType, options.limit]);

  return { articles, loading, error };
};
