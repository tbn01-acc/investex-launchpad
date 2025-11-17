import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { Edit, EyeOff, Eye, ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-react';
import { BlogArticleEditor } from './BlogArticleEditor';

export const MyArticles = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    loadMyArticles();
  }, []);

  const loadMyArticles = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('author_id', user.id)
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

  const handleToggleVisibility = async (articleId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_articles')
        .update({ is_public: !currentStatus })
        .eq('id', articleId);

      if (error) throw error;

      toast.success(currentStatus ? 'Статья скрыта' : 'Статья видна');
      loadMyArticles();
    } catch (error) {
      console.error('Error updating visibility:', error);
      toast.error('Ошибка при изменении видимости');
    }
  };

  const handleTogglePremium = async (articleId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_articles')
        .update({ is_premium: !currentStatus })
        .eq('id', articleId);

      if (error) throw error;

      toast.success(currentStatus ? 'Статья стала бесплатной' : 'Статья стала премиум');
      loadMyArticles();
    } catch (error) {
      console.error('Error updating premium status:', error);
      toast.error('Ошибка при изменении статуса премиум');
    }
  };

  const handleEdit = (article: any) => {
    setEditingArticle(article);
    setShowEditor(true);
  };

  const handleEditorSuccess = () => {
    setShowEditor(false);
    setEditingArticle(null);
    loadMyArticles();
  };

  const getModerationStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">На модерации</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Опубликована</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Отклонена</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Загрузка...</div>;
  }

  if (showEditor) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{editingArticle ? 'Редактировать статью' : 'Новая статья'}</h2>
          <Button variant="outline" onClick={() => {
            setShowEditor(false);
            setEditingArticle(null);
          }}>
            Отмена
          </Button>
        </div>
        <BlogArticleEditor 
          onSuccess={handleEditorSuccess}
          editingArticle={editingArticle}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Мои статьи</h2>
        <Button onClick={() => setShowEditor(true)}>
          Создать статью
        </Button>
      </div>

      {articles.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">У вас пока нет статей</p>
            <Button onClick={() => setShowEditor(true)}>
              Создать первую статью
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <Collapsible>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CollapsibleTrigger className="flex-1 text-left group">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {article.title}
                        </CardTitle>
                        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {getModerationStatusBadge(article.moderation_status)}
                        {article.is_premium && (
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            Премиум
                          </Badge>
                        )}
                        {article.is_public && article.moderation_status === 'approved' && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Публичная
                          </Badge>
                        )}
                      </div>
                    </CollapsibleTrigger>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(article)}
                        disabled={article.moderation_status === 'approved'}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleVisibility(article.id, article.is_public)}
                        disabled={article.moderation_status !== 'approved'}
                        title={article.is_public ? 'Скрыть статью' : 'Показать статью'}
                      >
                        {article.is_public ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTogglePremium(article.id, article.is_premium)}
                        disabled={article.moderation_status !== 'approved'}
                        title={article.is_premium ? 'Сделать бесплатной' : 'Сделать премиум'}
                        className={article.is_premium ? 'text-purple-600' : ''}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CollapsibleContent>
                  <CardContent className="space-y-4 pt-0">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-muted-foreground">Категория:</span>
                        <p className="mt-1">{article.category}</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Тип роли:</span>
                        <p className="mt-1">{article.role_type}</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Дата создания:</span>
                        <p className="mt-1">{new Date(article.created_at).toLocaleDateString('ru-RU')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Последнее изменение:</span>
                        <p className="mt-1">{new Date(article.updated_at).toLocaleDateString('ru-RU')}</p>
                      </div>
                      {article.published_at && (
                        <div>
                          <span className="font-medium text-muted-foreground">Дата публикации:</span>
                          <p className="mt-1">{new Date(article.published_at).toLocaleDateString('ru-RU')}</p>
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-muted-foreground">Время чтения:</span>
                        <p className="mt-1">{article.read_time} мин</p>
                      </div>
                    </div>

                    {article.tags && article.tags.length > 0 && (
                      <div>
                        <span className="font-medium text-sm text-muted-foreground">Теги:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {article.tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Просмотры: {article.views_count || 0}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{article.likes_count || 0}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ThumbsDown className="h-4 w-4 text-red-600" />
                          <span className="text-sm">{article.dislikes_count || 0}</span>
                        </div>
                      </div>
                    </div>

                    {article.moderation_comment && (
                      <div className="p-4 bg-muted rounded-lg">
                        <span className="font-medium text-sm">Комментарий модератора:</span>
                        <p className="text-sm mt-1">{article.moderation_comment}</p>
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
