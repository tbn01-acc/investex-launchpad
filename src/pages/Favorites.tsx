import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Heart, Trash2, ExternalLink, Plus, Edit } from 'lucide-react';

interface Favorite {
  id: string;
  item_type: string;
  item_id: string;
  created_at: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const Favorites = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    if (user) {
      fetchFavorites();
      fetchNotes();
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить избранное',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setFavorites(favorites.filter(f => f.id !== id));
      toast({
        title: 'Удалено',
        description: 'Элемент удалён из избранного',
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить элемент',
        variant: 'destructive',
      });
    }
  };

  const saveNote = async () => {
    if (!user || !noteTitle.trim()) return;

    try {
      if (currentNote) {
        // Update existing note
        const { error } = await supabase
          .from('notes')
          .update({ 
            title: noteTitle, 
            content: noteContent,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentNote.id);

        if (error) throw error;
        
        toast({
          title: 'Сохранено',
          description: 'Заметка успешно обновлена',
        });
      } else {
        // Create new note
        const { error } = await supabase
          .from('notes')
          .insert({ 
            user_id: user.id,
            title: noteTitle, 
            content: noteContent 
          });

        if (error) throw error;
        
        toast({
          title: 'Создано',
          description: 'Заметка успешно создана',
        });
      }

      fetchNotes();
      setNoteDialogOpen(false);
      setNoteTitle('');
      setNoteContent('');
      setCurrentNote(null);
    } catch (error) {
      console.error('Error saving note:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить заметку',
        variant: 'destructive',
      });
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNotes(notes.filter(n => n.id !== id));
      toast({
        title: 'Удалено',
        description: 'Заметка удалена',
      });
    } catch (error) {
      console.error('Error deleting note:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить заметку',
        variant: 'destructive',
      });
    }
  };

  const openEditNote = (note: Note) => {
    setCurrentNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content || '');
    setNoteDialogOpen(true);
  };

  const filterFavorites = (type: string) => {
    return favorites.filter(f => f.item_type === type);
  };

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Избранное</h1>
            <p className="text-muted-foreground mb-8">Войдите, чтобы просмотреть избранное</p>
            <Button onClick={() => window.location.href = '/auth'}>Войти</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Избранное</h1>
              <p className="text-muted-foreground">Сохранённые элементы и заметки</p>
            </div>

            <Tabs defaultValue="ideas" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="ideas">Идеи</TabsTrigger>
                <TabsTrigger value="projects">Проекты/Стартапы</TabsTrigger>
                <TabsTrigger value="contacts">Контакты</TabsTrigger>
                <TabsTrigger value="notes">Заметки</TabsTrigger>
              </TabsList>

              <TabsContent value="ideas" className="space-y-4">
                {loading ? (
                  <p className="text-center text-muted-foreground">Загрузка...</p>
                ) : filterFavorites('idea').length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Нет сохранённых идей</p>
                    </CardContent>
                  </Card>
                ) : (
                  filterFavorites('idea').map(fav => (
                    <Card key={fav.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle>Идея #{fav.item_id}</CardTitle>
                            <CardDescription>
                              Добавлено {new Date(fav.created_at).toLocaleDateString('ru-RU')}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => window.location.href = `/investments/ideas?id=${fav.item_id}`}>
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => removeFavorite(fav.id)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                {loading ? (
                  <p className="text-center text-muted-foreground">Загрузка...</p>
                ) : filterFavorites('project').length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Нет сохранённых проектов</p>
                    </CardContent>
                  </Card>
                ) : (
                  filterFavorites('project').map(fav => (
                    <Card key={fav.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle>Проект #{fav.item_id}</CardTitle>
                            <CardDescription>
                              Добавлено {new Date(fav.created_at).toLocaleDateString('ru-RU')}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => window.location.href = `/projects/${fav.item_id}`}>
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => removeFavorite(fav.id)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="contacts" className="space-y-4">
                {loading ? (
                  <p className="text-center text-muted-foreground">Загрузка...</p>
                ) : filterFavorites('contact').length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Нет сохранённых контактов</p>
                    </CardContent>
                  </Card>
                ) : (
                  filterFavorites('contact').map(fav => (
                    <Card key={fav.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle>Контакт #{fav.item_id}</CardTitle>
                            <CardDescription>
                              Добавлено {new Date(fav.created_at).toLocaleDateString('ru-RU')}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => removeFavorite(fav.id)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="notes" className="space-y-4">
                <div className="flex justify-end mb-4">
                  <Dialog open={noteDialogOpen} onOpenChange={(open) => {
                    setNoteDialogOpen(open);
                    if (!open) {
                      setNoteTitle('');
                      setNoteContent('');
                      setCurrentNote(null);
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Новая заметка
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{currentNote ? 'Редактировать заметку' : 'Новая заметка'}</DialogTitle>
                        <DialogDescription>
                          {currentNote ? 'Обновите содержимое заметки' : 'Создайте новую заметку для себя'}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="note-title">Заголовок</Label>
                          <Input 
                            id="note-title" 
                            value={noteTitle} 
                            onChange={(e) => setNoteTitle(e.target.value)}
                            placeholder="Введите заголовок..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="note-content">Содержание</Label>
                          <Textarea 
                            id="note-content" 
                            value={noteContent} 
                            onChange={(e) => setNoteContent(e.target.value)}
                            placeholder="Введите текст заметки..."
                            rows={6}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setNoteDialogOpen(false)}>Отмена</Button>
                        <Button onClick={saveNote}>Сохранить</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {notes.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">Нет заметок</p>
                      <Button onClick={() => setNoteDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Создать первую заметку
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  notes.map(note => (
                    <Card key={note.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle>{note.title}</CardTitle>
                            <CardDescription>
                              Обновлено {new Date(note.updated_at).toLocaleDateString('ru-RU')}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openEditNote(note)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteNote(note.id)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      {note.content && (
                        <CardContent>
                          <p className="text-muted-foreground whitespace-pre-wrap">{note.content}</p>
                        </CardContent>
                      )}
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
