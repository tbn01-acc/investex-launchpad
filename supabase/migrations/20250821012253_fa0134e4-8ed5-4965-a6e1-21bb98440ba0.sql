-- Создание дополнительных таблиц для полноценного бэкенда

-- Статусы проектов
DO $$ BEGIN
  CREATE TYPE public.project_status AS ENUM ('draft', 'active', 'in_progress', 'completed', 'cancelled', 'funded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Статусы инвестиций
DO $$ BEGIN
  CREATE TYPE public.investment_status AS ENUM ('pending', 'approved', 'rejected', 'funded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

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

-- Вставка начальных данных
INSERT INTO public.platform_settings (setting_key, setting_value, description) VALUES
('super_admin_credentials', '{"login": "admin", "password": "!moscoser08", "email": "admin@investex.ru"}', 'Credentials for super admin access'),
('platform_statistics', '{"active_projects": 15847, "total_investments": 89500000, "total_users": 32156, "completed_projects": 8924}', 'Current platform statistics'),
('ai_models_config', '{"providers": ["openai", "anthropic", "openrouter"], "default_provider": "openai", "default_model": "gpt-4o-mini"}', 'AI models configuration')
ON CONFLICT (setting_key) DO NOTHING;

-- Добавление начальных категорий навыков
INSERT INTO public.skill_categories (name, description, icon) VALUES
('Разработка', 'Программирование и разработка ПО', 'Code'),
('Дизайн', 'UI/UX дизайн и графика', 'Palette'),
('Маркетинг', 'Цифровой и традиционный маркетинг', 'TrendingUp'),
('Бизнес', 'Бизнес-анализ и консалтинг', 'Briefcase'),
('Финансы', 'Финансовый анализ и инвестиции', 'DollarSign')
ON CONFLICT DO NOTHING;

-- Добавление навыков
INSERT INTO public.skills (category_id, name, description) VALUES
((SELECT id FROM public.skill_categories WHERE name = 'Разработка' LIMIT 1), 'React', 'Frontend разработка на React'),
((SELECT id FROM public.skill_categories WHERE name = 'Разработка' LIMIT 1), 'Node.js', 'Backend разработка на Node.js'),
((SELECT id FROM public.skill_categories WHERE name = 'Разработка' LIMIT 1), 'Python', 'Разработка на Python'),
((SELECT id FROM public.skill_categories WHERE name = 'Дизайн' LIMIT 1), 'UI/UX Design', 'Дизайн пользовательских интерфейсов'),
((SELECT id FROM public.skill_categories WHERE name = 'Маркетинг' LIMIT 1), 'SMM', 'Продвижение в социальных сетях'),
((SELECT id FROM public.skill_categories WHERE name = 'Бизнес' LIMIT 1), 'Business Analysis', 'Бизнес-анализ'),
((SELECT id FROM public.skill_categories WHERE name = 'Финансы' LIMIT 1), 'Financial Modeling', 'Финансовое моделирование')
ON CONFLICT DO NOTHING;