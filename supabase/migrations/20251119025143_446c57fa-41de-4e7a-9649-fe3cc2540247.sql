-- Добавляем политики удаления статей для авторов и администраторов

-- Авторы могут удалять свои собственные статьи
CREATE POLICY "Authors can delete their own articles"
ON public.blog_articles
FOR DELETE
TO authenticated
USING (auth.uid() = author_id);

-- Администраторы могут удалять любые статьи
CREATE POLICY "Admins can delete articles"
ON public.blog_articles
FOR DELETE
TO authenticated
USING (
  has_role(auth.uid(), 'superadmin'::new_user_role) OR 
  has_role(auth.uid(), 'administrator'::new_user_role)
);

-- Обновляем политику для авторов, чтобы они могли обновлять свои статьи (не только pending)
DROP POLICY IF EXISTS "Authors can update their own pending articles" ON public.blog_articles;

CREATE POLICY "Authors can update their own articles"
ON public.blog_articles
FOR UPDATE
TO authenticated
USING (auth.uid() = author_id)
WITH CHECK (auth.uid() = author_id);