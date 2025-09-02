-- Add missing RLS policies for tables without policies

-- Messages table policies
CREATE POLICY "Users can view their own messages" 
ON public.messages 
FOR SELECT 
USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages" 
ON public.messages 
FOR INSERT 
WITH CHECK (auth.uid() = sender_id);

-- Notifications table policies  
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Investments table policies
CREATE POLICY "Users can view their own investments" 
ON public.investments 
FOR SELECT 
USING (auth.uid() = investor_id OR auth.uid() IN (
    SELECT owner_id FROM public.projects WHERE id = project_id
));

CREATE POLICY "Investors can create investments" 
ON public.investments 
FOR INSERT 
WITH CHECK (auth.uid() = investor_id);

CREATE POLICY "Investors can update their own investments" 
ON public.investments 
FOR UPDATE 
USING (auth.uid() = investor_id);

-- Payments table policies
CREATE POLICY "Users can view their own payments" 
ON public.payments 
FOR SELECT 
USING (auth.uid() = payer_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can create payments" 
ON public.payments 
FOR INSERT 
WITH CHECK (auth.uid() = payer_id);

-- Platform settings policies (superadmin only)
CREATE POLICY "Only superadmins can manage platform settings" 
ON public.platform_settings 
FOR ALL 
USING (EXISTS (
    SELECT 1 FROM public.admin_accounts 
    WHERE id = auth.uid() AND role = 'superadmin'
));

-- Reviews table policies
CREATE POLICY "Users can view all reviews" 
ON public.reviews 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create reviews for completed projects" 
ON public.reviews 
FOR INSERT 
WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can update their own reviews" 
ON public.reviews 
FOR UPDATE 
USING (auth.uid() = reviewer_id);

-- Skill categories and skills policies (read-only for users)
CREATE POLICY "Skill categories are publicly readable" 
ON public.skill_categories 
FOR SELECT 
USING (true);

CREATE POLICY "Only superadmins can manage skill categories" 
ON public.skill_categories 
FOR ALL 
USING (EXISTS (
    SELECT 1 FROM public.admin_accounts 
    WHERE id = auth.uid() AND role = 'superadmin'
));

CREATE POLICY "Skills are publicly readable" 
ON public.skills 
FOR SELECT 
USING (true);

CREATE POLICY "Only superadmins can manage skills" 
ON public.skills 
FOR ALL 
USING (EXISTS (
    SELECT 1 FROM public.admin_accounts 
    WHERE id = auth.uid() AND role = 'superadmin'
));

-- Project applications policies
CREATE POLICY "Users can view applications for their projects" 
ON public.project_applications 
FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT owner_id FROM public.projects WHERE id = project_id
));

CREATE POLICY "Users can create project applications" 
ON public.project_applications 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications" 
ON public.project_applications 
FOR UPDATE 
USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT owner_id FROM public.projects WHERE id = project_id
));

-- Fix function search paths
CREATE OR REPLACE FUNCTION public.get_platform_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_users', (SELECT COUNT(*) FROM public.profiles),
    'total_projects', (SELECT COUNT(*) FROM public.projects),
    'total_investments', (SELECT COUNT(*) FROM public.investments),
    'total_payments', (SELECT COUNT(*) FROM public.payments),
    'active_projects', (SELECT COUNT(*) FROM public.projects WHERE status = 'active'),
    'pending_investments', (SELECT COUNT(*) FROM public.investments WHERE status = 'pending'),
    'users_by_role', (
      SELECT json_object_agg(role, count)
      FROM (
        SELECT role, COUNT(*) as count
        FROM public.profiles
        GROUP BY role
      ) as role_counts
    )
  ) INTO result;
  
  RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION public.authenticate_admin(p_username text, p_password text)
RETURNS TABLE(user_id uuid, username text, role user_role, last_login timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.username,
    a.role,
    a.last_login
  FROM public.admin_accounts a
  WHERE a.username = p_username 
    AND a.password_hash = crypt(p_password, a.password_hash)
    AND a.is_active = true;
    
  -- Обновляем время последнего входа
  UPDATE public.admin_accounts 
  SET last_login = now() 
  WHERE username = p_username;
END;
$$;