import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Star, Lightbulb, Rocket, Users, StickyNote, Plus, Trash2, Edit, ExternalLink } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

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
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteForm, setNoteForm] = useState({ title: '', content: '' });

  useEffect(() => {
    if (user) {
      fetchFavorites();
      fetchNotes();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user?.id)
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
      
      toast({
        title: "Удалено из избранного",
      });
      fetchFavorites();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить из избранного",
        variant: "destructive"
      });
    }
  };

  const saveNote = async () => {
    if (!noteForm.title || !noteForm.content) {
      toast({
        title: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingNote) {
        const { error } = await supabase
          .from('notes')
          .update({ title: noteForm.title, content: noteForm.content })
          .eq('id', editingNote.id);

        if (error) throw error;
        toast({ title: "Заметка обновлена" });
      } else {
        const { error } = await supabase
          .from('notes')
          .insert({
            user_id: user?.id,
            title: noteForm.title,
            content: noteForm.content
          });

        if (error) throw error;
        toast({ title: "Заметка создана" });
      }

      setNoteDialogOpen(false);
      setEditingNote(null);
      setNoteForm({ title: '', content: '' });
      fetchNotes();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить заметку",
        variant: "destructive"
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
      
      toast({ title: "Заметка удалена" });
      fetchNotes();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить заметку",
        variant: "destructive"
      });
    }
  };

  const openEditNote = (note: Note) => {
    setEditingNote(note);
    setNoteForm({ title: note.title, content: note.content });
    setNoteDialogOpen(true);
  };

  const filterFavorites = (type: string) => {
    return favorites.filter(f => f.item_type === type);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
              <Star className="h-8 w-8 text-primary fill-primary" />
              Избранное
            </h1>
            <p className="text-muted-foreground">
              Сохраненные идеи, проекты, контакты и заметки
            </p>
          </div>

          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-8">
              <TabsTrigger value="ideas" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Идеи</span>
                <Badge variant="secondary" className="ml-1">{filterFavorites('idea').length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Rocket className="h-4 w-4" />
                <span className="hidden sm:inline">Проекты</span>
                <Badge variant="secondary" className="ml-1">{filterFavorites('project').length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="contacts" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Контакты</span>
                <Badge variant="secondary" className="ml-1">{filterFavorites('contact').length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <StickyNote className="h-4 w-4" />
                <span className="hidden sm:inline">Заметки</span>
                <Badge variant="secondary" className="ml-1">{notes.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ideas">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterFavorites('idea').length === 0 ? (
                  <Card className="col-span-full">
                    <CardContent className="text-center py-12">
                      <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">У вас пока нет избранных идей</p>
                    </CardContent>
                  </Card>
                ) : (
                  filterFavorites('idea').map((fav) => (
                    <Card key={fav.id}>
                      <CardHeader>
                        <CardTitle>Идея #{fav.item_id}</CardTitle>
                        <CardDescription>Добавлено {new Date(fav.created_at).toLocaleDateString()}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Открыть
                        </Button>
                        <Button variant="destructive" size="sm" className="w-full" onClick={() => removeFavorite(fav.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Удалить
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="projects">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterFavorites('project').length === 0 ? (
                  <Card className="col-span-full">
                    <CardContent className="text-center py-12">
                      <Rocket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">У вас пока нет избранных проектов</p>
                    </CardContent>
                  </Card>
                ) : (
                  filterFavorites('project').map((fav) => (
                    <Card key={fav.id}>
                      <CardHeader>
                        <CardTitle>Проект #{fav.item_id}</CardTitle>
                        <CardDescription>Добавлено {new Date(fav.created_at).toLocaleDateString()}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Открыть
                        </Button>
                        <Button variant="destructive" size="sm" className="w-full" onClick={() => removeFavorite(fav.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Удалить
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="contacts">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterFavorites('contact').length === 0 ? (
                  <Card className="col-span-full">
                    <CardContent className="text-center py-12">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">У вас пока нет избранных контактов</p>
                    </CardContent>
                  </Card>
                ) : (
                  filterFavorites('contact').map((fav) => (
                    <Card key={fav.id}>
                      <CardHeader>
                        <CardTitle>Контакт #{fav.item_id}</CardTitle>
                        <CardDescription>Добавлено {new Date(fav.created_at).toLocaleDateString()}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Открыть
                        </Button>
                        <Button variant="destructive" size="sm" className="w-full" onClick={() => removeFavorite(fav.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Удалить
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="notes">
              <div className="mb-6">
                <Dialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => { setEditingNote(null); setNoteForm({ title: '', content: '' }); }}>
                      <Plus className="h-4 w-4 mr-2" />
                      Создать заметку
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingNote ? 'Редактировать заметку' : 'Новая заметка'}</DialogTitle>
                      <DialogDescription>
                        Создайте заметку для сохранения важной информации
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Название</Label>
                        <Input
                          id="title"
                          value={noteForm.title}
                          onChange={(e) => setNoteForm({...noteForm, title: e.target.value})}
                          placeholder="Название заметки"
                        />
                      </div>
                      <div>
                        <Label htmlFor="content">Содержание</Label>
                        <Textarea
                          id="content"
                          value={noteForm.content}
                          onChange={(e) => setNoteForm({...noteForm, content: e.target.value})}
                          placeholder="Текст заметки"
                          rows={6}
                        />
                      </div>
                      <Button onClick={saveNote} className="w-full">
                        {editingNote ? 'Обновить' : 'Создать'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.length === 0 ? (
                  <Card className="col-span-full">
                    <CardContent className="text-center py-12">
                      <StickyNote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">У вас пока нет заметок</p>
                      <Button onClick={() => setNoteDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Создать первую заметку
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  notes.map((note) => (
                    <Card key={note.id}>
                      <CardHeader>
                        <CardTitle>{note.title}</CardTitle>
                        <CardDescription>
                          Обновлено {new Date(note.updated_at).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {note.content}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditNote(note)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Редактировать
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => deleteNote(note.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
