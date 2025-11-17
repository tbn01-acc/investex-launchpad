import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

export const BlogModerationPanel = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [moderationComment, setModerationComment] = useState('');

  useEffect(() => {
    loadPendingArticles();
  }, []);

  const loadPendingArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select(`
          *,
          profiles!blog_articles_author_id_fkey (
            first_name,
            last_name,
            email
          )
        `)
        .eq('moderation_status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error loading articles:', error);
      toast.error('Ошибка загрузки статей');
    } finally {
      setLoading(false);
    }
  };

  const handleModerate = async (articleId: string, status: 'approved' | 'rejected') => {
    if (!user) return;

    try {
      const updateData: any = {
        moderation_status: status,
        moderated_by: user.id,
        moderated_at: new Date().toISOString(),
        moderation_comment: moderationComment
      };

      if (status === 'approved') {
        updateData.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('blog_articles')
        .update(updateData)
        .eq('id', articleId);

      if (error) throw error;

      toast.success(status === 'approved' ? 'Статья одобрена' : 'Статья отклонена');
      setSelectedArticle(null);
      setModerationComment('');
      loadPendingArticles();
    } catch (error) {
      console.error('Error moderating article:', error);
      toast.error('Ошибка при модерации');
    }
  };

  const togglePremiumStatus = async (articleId: string, isPremium: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_articles')
        .update({ is_premium: isPremium })
        .eq('id', articleId);

      if (error) throw error;

      toast.success(isPremium ? 'Статья помечена как премиум' : 'Статья доступна всем');
      loadPendingArticles();
    } catch (error) {
      console.error('Error updating premium status:', error);
      toast.error('Ошибка обновления статуса');
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Модерация статей блога</h2>

      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Автор: {article.profiles?.first_name} {article.profiles?.last_name} ({article.profiles?.email})
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={
                      article.moderation_status === 'approved' ? 'default' :
                      article.moderation_status === 'rejected' ? 'destructive' : 'secondary'
                    }>
                      {article.moderation_status === 'pending' ? 'На модерации' :
                       article.moderation_status === 'approved' ? 'Одобрена' : 'Отклонена'}
                    </Badge>
                    {article.is_premium && <Badge>Премиум</Badge>}
                    {article.is_public && <Badge variant="outline">Публичный доступ</Badge>}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedArticle(selectedArticle?.id === article.id ? null : article)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {selectedArticle?.id === article.id && (
              <CardContent className="space-y-4">
                <div className="prose max-w-none">
                  <h4 className="font-semibold">Превью:</h4>
                  <p className="text-sm">{article.excerpt}</p>
                  <h4 className="font-semibold mt-4">Контент (бесплатная часть):</h4>
                  <p className="text-sm whitespace-pre-wrap">{article.content}</p>
                  {article.full_content && (
                    <>
                      <h4 className="font-semibold mt-4">Полный текст:</h4>
                      <p className="text-sm whitespace-pre-wrap">{article.full_content}</p>
                    </>
                  )}
                </div>

                {article.moderation_status === 'approved' && (
                  <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                    <Switch
                      id={`premium-${article.id}`}
                      checked={article.is_premium}
                      onCheckedChange={(checked) => togglePremiumStatus(article.id, checked)}
                    />
                    <Label htmlFor={`premium-${article.id}`}>
                      Премиум статья (доступна только платным пользователям)
                    </Label>
                  </div>
                )}

                {article.moderation_status === 'pending' && (
                  <>
                    <Textarea
                      placeholder="Комментарий модератора (необязательно)..."
                      value={moderationComment}
                      onChange={(e) => setModerationComment(e.target.value)}
                      rows={3}
                    />

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleModerate(article.id, 'approved')}
                        className="flex-1"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Одобрить
                      </Button>
                      <Button
                        onClick={() => handleModerate(article.id, 'rejected')}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Отклонить
                      </Button>
                    </div>
                  </>
                )}

                {article.moderation_comment && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-semibold">Комментарий модератора:</p>
                    <p className="text-sm mt-1">{article.moderation_comment}</p>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))}

        {articles.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Нет статей для модерации
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};