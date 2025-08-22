-- Создание системы ролей и суперадминистратора
-- Добавляем роль суперадминистратора в enum
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'superadmin';

-- Создаем таблицу администраторов с захардкоженными данными
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

-- Функция для модерации контента
CREATE OR REPLACE FUNCTION public.moderate_project(
  p_project_id UUID,
  p_action TEXT,
  p_reason TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Проверяем права доступа
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('superadmin', 'admin')
  ) THEN
    RAISE EXCEPTION 'Недостаточно прав для модерации';
  END IF;
  
  -- Выполняем действие
  CASE p_action
    WHEN 'approve' THEN
      UPDATE public.projects 
      SET status = 'active' 
      WHERE id = p_project_id;
    WHEN 'reject' THEN
      UPDATE public.projects 
      SET status = 'rejected' 
      WHERE id = p_project_id;
    WHEN 'suspend' THEN
      UPDATE public.projects 
      SET status = 'suspended' 
      WHERE id = p_project_id;
    ELSE
      RAISE EXCEPTION 'Неизвестное действие: %', p_action;
  END CASE;
  
  -- Логируем действие модерации
  INSERT INTO public.notifications (user_id, title, message, type)
  SELECT 
    p.owner_id,
    'Статус проекта изменен',
    format('Ваш проект "%s" был %s. %s', 
           p.title, 
           p_action,
           COALESCE('Причина: ' || p_reason, '')),
    'moderation'
  FROM public.projects p
  WHERE p.id = p_project_id;
  
  RETURN TRUE;
END;
$$;

-- Функция для управления пользователями
CREATE OR REPLACE FUNCTION public.manage_user(
  p_user_id UUID,
  p_action TEXT,
  p_reason TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Проверяем права доступа
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('superadmin', 'admin')
  ) THEN
    RAISE EXCEPTION 'Недостаточно прав для управления пользователями';
  END IF;
  
  -- Выполняем действие
  CASE p_action
    WHEN 'verify' THEN
      UPDATE public.profiles 
      SET verification_status = 'verified' 
      WHERE user_id = p_user_id;
    WHEN 'suspend' THEN
      UPDATE public.profiles 
      SET verification_status = 'suspended' 
      WHERE user_id = p_user_id;
    WHEN 'ban' THEN
      UPDATE public.profiles 
      SET verification_status = 'banned' 
      WHERE user_id = p_user_id;
    ELSE
      RAISE EXCEPTION 'Неизвестное действие: %', p_action;
  END CASE;
  
  -- Уведомляем пользователя
  INSERT INTO public.notifications (user_id, title, message, type)
  VALUES (
    p_user_id,
    'Статус аккаунта изменен',
    format('Ваш аккаунт был %s. %s', 
           p_action,
           COALESCE('Причина: ' || p_reason, '')),
    'account'
  );
  
  RETURN TRUE;
END;
$$;