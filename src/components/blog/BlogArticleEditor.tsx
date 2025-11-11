import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface BlogArticleEditorProps {
  onSuccess?: () => void;
  editingArticle?: any;
}

export const BlogArticleEditor = ({ onSuccess, editingArticle }: BlogArticleEditorProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: editingArticle?.title || '',
    excerpt: editingArticle?.excerpt || '',
    content: editingArticle?.content || '',
    full_content: editingArticle?.full_content || '',
    category: editingArticle?.category || '',
    role_type: editingArticle?.role_type || 'founders',
    content_type: editingArticle?.content_type || 'guides',
    tags: editingArticle?.tags?.join(', ') || '',
    is_premium: editingArticle?.is_premium || false,
    read_time: editingArticle?.read_time || 5,
    image_url: editingArticle?.image_url || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Необходимо авторизоваться');
      return;
    }

    setLoading(true);

    try {
      const articleData = {
        author_id: user.id,
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        full_content: formData.full_content || formData.content,
        category: formData.category,
        role_type: formData.role_type,
        content_type: formData.content_type,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        is_premium: formData.is_premium,
        read_time: formData.read_time,
        image_url: formData.image_url,
        moderation_status: 'pending'
      };

      if (editingArticle) {
        const { error } = await supabase
          .from('blog_articles')
          .update(articleData)
          .eq('id', editingArticle.id);

        if (error) throw error;
        toast.success('Статья обновлена и отправлена на модерацию');
      } else {
        const { error } = await supabase
          .from('blog_articles')
          .insert(articleData);

        if (error) throw error;
        toast.success('Статья отправлена на модерацию');
      }

      onSuccess?.();
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error('Ошибка при сохранении статьи');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Заголовок статьи</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Введите заголовок..."
          required
        />
      </div>

      <div>
        <Label htmlFor="excerpt">Краткое описание</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          placeholder="Краткое описание статьи для превью..."
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="content">Превью контент (бесплатная часть)</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Первые 15-20% статьи, доступные всем..."
          rows={8}
          required
        />
      </div>

      <div>
        <Label htmlFor="full_content">Полный текст статьи</Label>
        <Textarea
          id="full_content"
          value={formData.full_content}
          onChange={(e) => setFormData({ ...formData, full_content: e.target.value })}
          placeholder="Полный текст статьи (для платных подписчиков)..."
          rows={15}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Категория</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seed-funding">Seed финансирование</SelectItem>
              <SelectItem value="series-a">Series A</SelectItem>
              <SelectItem value="due-diligence">Due Diligence</SelectItem>
              <SelectItem value="scaling">Масштабирование</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="role_type">Тип роли</Label>
          <Select value={formData.role_type} onValueChange={(value) => setFormData({ ...formData, role_type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите роль" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="angel-investors">Бизнес-ангелы</SelectItem>
              <SelectItem value="founders">Основатели</SelectItem>
              <SelectItem value="vc-funds">VC Фонды</SelectItem>
              <SelectItem value="consultants">Консультанты</SelectItem>
              <SelectItem value="developers">Разработчики</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="content_type">Тип контента</Label>
          <Select value={formData.content_type} onValueChange={(value) => setFormData({ ...formData, content_type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="guides">Гайды</SelectItem>
              <SelectItem value="cases">Кейсы</SelectItem>
              <SelectItem value="analytics">Аналитика</SelectItem>
              <SelectItem value="trends">Тренды</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="read_time">Время чтения (мин)</Label>
          <Input
            id="read_time"
            type="number"
            value={formData.read_time}
            onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
            min={1}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="tags">Теги (через запятую)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="инвестиции, стартапы, венчур"
        />
      </div>

      <div>
        <Label htmlFor="image_url">URL изображения</Label>
        <Input
          id="image_url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_premium"
          checked={formData.is_premium}
          onCheckedChange={(checked) => setFormData({ ...formData, is_premium: checked })}
        />
        <Label htmlFor="is_premium">Премиум статья (требует подписку)</Label>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {editingArticle ? 'Обновить статью' : 'Отправить на модерацию'}
      </Button>
    </form>
  );
};