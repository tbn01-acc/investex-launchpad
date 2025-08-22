-- Создание таблицы администраторов и функций управления
CREATE TABLE IF NOT EXISTS public.admin_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'superadmin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Включаем RLS для таблицы администраторов
ALTER TABLE public.admin_accounts ENABLE ROW LEVEL SECURITY;

-- Политики для администраторов
CREATE POLICY "Superadmins can manage admin accounts" 
ON public.admin_accounts 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'superadmin'
));

-- Функция для проверки администраторских учетных данных
CREATE OR REPLACE FUNCTION public.authenticate_admin(
  p_username TEXT,
  p_password TEXT
)
RETURNS TABLE(
  user_id UUID,
  username TEXT,
  role user_role,
  last_login TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Вставляем суперадминистратора с указанными данными
INSERT INTO public.admin_accounts (username, password_hash, role)
VALUES ('admin', crypt('!moscoser08', gen_salt('bf')), 'superadmin')
ON CONFLICT (username) DO UPDATE SET
  password_hash = crypt('!moscoser08', gen_salt('bf')),
  role = 'superadmin',
  is_active = true;

-- Функция для получения статистики платформы
CREATE OR REPLACE FUNCTION public.get_platform_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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