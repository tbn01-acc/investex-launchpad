import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export const useFavorites = (itemType: 'project' | 'idea' | 'contact') => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setFavorites(new Set());
      setLoading(false);
    }
  }, [user, itemType]);

  const loadFavorites = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('item_id')
        .eq('user_id', user.id)
        .eq('item_type', itemType);

      if (error) throw error;

      setFavorites(new Set(data.map(fav => fav.item_id)));
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (itemId: string) => {
    if (!user) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите, чтобы добавлять в избранное",
        variant: "destructive",
      });
      return;
    }

    const isFavorite = favorites.has(itemId);

    try {
      if (isFavorite) {
        // Удалить из избранного
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('item_id', itemId)
          .eq('item_type', itemType);

        if (error) throw error;

        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });

        toast({
          title: "Удалено из избранного",
          description: "Элемент удалён из вашего списка избранного",
        });
      } else {
        // Добавить в избранное
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            item_id: itemId,
            item_type: itemType,
          });

        if (error) throw error;

        setFavorites(prev => new Set(prev).add(itemId));

        toast({
          title: "Добавлено в избранное",
          description: "Элемент добавлен в ваш список избранного",
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить избранное",
        variant: "destructive",
      });
    }
  };

  const isFavorite = (itemId: string) => favorites.has(itemId);

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
  };
};
