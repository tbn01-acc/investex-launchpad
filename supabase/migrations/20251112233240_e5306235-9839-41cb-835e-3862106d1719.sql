-- Add RLS policies for blog article moderation by admins

-- Allow superadmins and administrators to view all articles for moderation
CREATE POLICY "Admins can view all articles for moderation"
ON public.blog_articles
FOR SELECT
USING (
  has_role(auth.uid(), 'superadmin'::new_user_role) OR
  has_role(auth.uid(), 'administrator'::new_user_role)
);

-- Allow superadmins and administrators to update articles for moderation
CREATE POLICY "Admins can moderate articles"
ON public.blog_articles
FOR UPDATE
USING (
  has_role(auth.uid(), 'superadmin'::new_user_role) OR
  has_role(auth.uid(), 'administrator'::new_user_role)
);