import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft, Lock } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useSubscription } from "@/hooks/useSubscription";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ArticleDetail = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasPremiumAccess, loading: subscriptionLoading } = useSubscription();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadArticle = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_articles')
          .select(`
            *,
            author:profiles!blog_articles_author_id_fkey(
              user_id,
              first_name,
              last_name,
              avatar_url,
              bio,
              role
            )
          `)
          .eq('id', articleId)
          .single();

        if (error) throw error;
        setArticle(data);
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      loadArticle();
    }
  }, [articleId]);

  const canViewFullContent = !article?.is_premium || hasPremiumAccess || article?.author_id === user?.id;

  useSEO(`/blog/article/${articleId}`, article ? {
    title: `${article.title} | Invest-Ex`,
    description: article.excerpt,
    ogImage: article.image_url
  } : undefined);

  if (loading || subscriptionLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          Загрузка...
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return <div>Статья не найдена</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <Link to="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к блогу
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex gap-2 mb-4">
              <Badge variant="secondary">{article.category}</Badge>
              <Badge variant="outline">{article.content_type}</Badge>
              {article.is_premium && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Премиум
                </Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {article.title}
            </h1>
            
            {/* Author Info */}
            <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={article.author?.avatar_url} alt={`${article.author?.first_name} ${article.author?.last_name}`} />
                  <AvatarFallback>{article.author?.first_name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{article.author?.first_name} {article.author?.last_name}</p>
                  <p className="text-sm text-muted-foreground">{article.author?.role || 'Автор'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{article.read_time} мин чтения</span>
                </div>
                <span className="text-sm">{new Date(article.published_at).toLocaleDateString('ru-RU')}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {article.image_url && (
            <div className="aspect-video overflow-hidden rounded-lg mb-8">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="lead text-xl text-muted-foreground mb-8">
              {article.excerpt}
            </p>
            
            {/* Preview content (always visible) */}
            <div className="whitespace-pre-line">
              {article.content}
            </div>

            {/* Premium content gate */}
            {article.is_premium && !canViewFullContent && (
              <div className="mt-8 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none h-32 -mt-32" />
                <Alert className="border-primary/50 bg-primary/5">
                  <Lock className="h-5 w-5 text-primary" />
                  <AlertDescription className="ml-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-lg mb-1">Полная версия статьи доступна по подписке</p>
                        <p className="text-muted-foreground">
                          Получите доступ к полному контенту с экспертными инсайтами
                        </p>
                      </div>
                      <Button 
                        onClick={() => navigate('/pricing')} 
                        className="ml-4"
                      >
                        Оформить подписку
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Full content (for premium users or non-premium articles) */}
            {canViewFullContent && article.full_content && (
              <div className="mt-8 pt-8 border-t whitespace-pre-line">
                {article.full_content}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap pt-8 border-t">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
