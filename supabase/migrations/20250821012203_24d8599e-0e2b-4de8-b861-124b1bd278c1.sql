-- Создание дополнительных таблиц для полноценного бэкенда

-- Статусы проектов
CREATE TYPE public.project_status AS ENUM ('draft', 'active', 'in_progress', 'completed', 'cancelled', 'funded');

-- Статусы инвестиций
CREATE TYPE public.investment_status AS ENUM ('pending', 'approved', 'rejected', 'funded');

-- Обновление таблицы профилей
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS subscription_plan TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS total_projects INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_earnings DECIMAL(15,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS reviews_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'unverified',
ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;

-- Таблица настроек платформы
CREATE TABLE IF NOT EXISTS public.platform_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Таблица категорий навыков
CREATE TABLE IF NOT EXISTS public.skill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Таблица навыков
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.skill_categories(id),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Обновление таблицы проектов
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.skill_categories(id),
ADD COLUMN IF NOT EXISTS funding_goal DECIMAL(15,2),
ADD COLUMN IF NOT EXISTS funding_raised DECIMAL(15,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS equity_offered DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS roi_projected DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS team_size INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS attachments JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS milestones JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS favorites_count INTEGER DEFAULT 0;

-- Таблица заявок на проекты
CREATE TABLE IF NOT EXISTS public.project_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  proposed_budget DECIMAL(15,2),
  estimated_duration INTEGER, -- в днях
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Таблица инвестиций
CREATE TABLE IF NOT EXISTS public.investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  investor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(15,2) NOT NULL,
  equity_percentage DECIMAL(5,2),
  status public.investment_status DEFAULT 'pending',
  due_diligence_completed BOOLEAN DEFAULT false,
  contract_signed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Таблица сообщений
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  subject TEXT,
  content TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Таблица уведомлений
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL, -- 'info', 'success', 'warning', 'error'
  read_at TIMESTAMP WITH TIME ZONE,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Таблица платежей
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  payer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(15,2) NOT NULL,
  currency TEXT DEFAULT 'RUB',
  payment_type TEXT NOT NULL, -- 'milestone', 'full', 'investment'
  status TEXT DEFAULT 'pending',
  stripe_payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Таблица отзывов и рейтингов
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reviewed_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Таблица API ключей для пользователей
CREATE TABLE IF NOT EXISTS public.user_api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  key_name TEXT NOT NULL,
  api_key TEXT NOT NULL,
  provider TEXT NOT NULL, -- 'openai', 'anthropic', 'openrouter'
  model_preference TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_used TIMESTAMP WITH TIME ZONE
);

-- Включение Row Level Security для всех таблиц
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_api_keys ENABLE ROW LEVEL SECURITY;

-- Создание безопасной функции для проверки роли пользователя
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Создание RLS политик

-- Политики для platform_settings (только админы)
CREATE POLICY "Только админы могут управлять настройками платформы"
ON public.platform_settings
FOR ALL
USING (public.get_current_user_role() = 'admin');

-- Политики для skill_categories (все могут читать, админы управляют)
CREATE POLICY "Все могут просматривать категории навыков"
ON public.skill_categories
FOR SELECT
USING (true);

CREATE POLICY "Только админы могут управлять категориями навыков"
ON public.skill_categories
FOR INSERT, UPDATE, DELETE
USING (public.get_current_user_role() = 'admin');

-- Аналогично для skills
CREATE POLICY "Все могут просматривать навыки"
ON public.skills
FOR SELECT
USING (true);

CREATE POLICY "Только админы могут управлять навыками"
ON public.skills
FOR INSERT, UPDATE, DELETE
USING (public.get_current_user_role() = 'admin');

-- Политики для project_applications
CREATE POLICY "Пользователи могут создавать заявки"
ON public.project_applications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Пользователи могут просматривать свои заявки"
ON public.project_applications
FOR SELECT
USING (
  auth.uid() = user_id OR 
  auth.uid() IN (SELECT owner_id FROM public.projects WHERE id = project_id)
);

CREATE POLICY "Владельцы проектов могут обновлять статус заявок"
ON public.project_applications
FOR UPDATE
USING (
  auth.uid() IN (SELECT owner_id FROM public.projects WHERE id = project_id)
);

-- Политики для investments
CREATE POLICY "Инвесторы могут создавать инвестиции"
ON public.investments
FOR INSERT
WITH CHECK (auth.uid() = investor_id);

CREATE POLICY "Участники инвестиций могут их просматривать"
ON public.investments
FOR SELECT
USING (
  auth.uid() = investor_id OR 
  auth.uid() IN (SELECT owner_id FROM public.projects WHERE id = project_id)
);

-- Политики для messages
CREATE POLICY "Пользователи могут отправлять сообщения"
ON public.messages
FOR INSERT
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Пользователи могут читать свои сообщения"
ON public.messages
FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Получатели могут обновлять статус прочтения"
ON public.messages
FOR UPDATE
USING (auth.uid() = recipient_id);

-- Политики для notifications
CREATE POLICY "Пользователи могут читать свои уведомления"
ON public.notifications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Пользователи могут обновлять свои уведомления"
ON public.notifications
FOR UPDATE
USING (auth.uid() = user_id);

-- Политики для payments
CREATE POLICY "Участники платежей могут их просматривать"
ON public.payments
FOR SELECT
USING (auth.uid() = payer_id OR auth.uid() = recipient_id);

-- Политики для reviews
CREATE POLICY "Пользователи могут создавать отзывы"
ON public.reviews
FOR INSERT
WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Все могут читать отзывы"
ON public.reviews
FOR SELECT
USING (true);

-- Политики для user_api_keys
CREATE POLICY "Пользователи могут управлять своими API ключами"
ON public.user_api_keys
FOR ALL
USING (auth.uid() = user_id);

-- Создание функции для обновления updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Добавление триггеров для updated_at
CREATE TRIGGER update_platform_settings_updated_at
    BEFORE UPDATE ON public.platform_settings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_project_applications_updated_at
    BEFORE UPDATE ON public.project_applications
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_investments_updated_at
    BEFORE UPDATE ON public.investments
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();