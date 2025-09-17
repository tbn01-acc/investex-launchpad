-- Create new comprehensive user role enum
CREATE TYPE public.new_user_role AS ENUM (
  'investor',           -- Инвесторы (от 10 млн ₽)
  'subsidiary_investor', -- Субсидиарные инвесторы (до 10 млн ₽)
  'founder',            -- Фаундеры
  'co_founder',         -- Ко-фаундеры
  'co_owner',           -- Соучредители
  'job_seeker',         -- Соискатели
  'freelancer',         -- Фрилансеры
  'outsourcer',         -- Аутсорсеры
  'contractor'          -- Подрядчики
);

-- Create subscription plan enum
CREATE TYPE public.subscription_plan AS ENUM ('start', 'profi', 'premium');

-- Update profiles table to use new role system
ALTER TABLE public.profiles 
ADD COLUMN new_role public.new_user_role DEFAULT 'job_seeker',
ADD COLUMN subscription_tier public.subscription_plan DEFAULT 'start',
ADD COLUMN subscription_period integer DEFAULT 1, -- months
ADD COLUMN verification_level text DEFAULT 'unverified',
ADD COLUMN investment_capacity numeric DEFAULT 0,
ADD COLUMN company_size integer DEFAULT 1,
ADD COLUMN specialization text[],
ADD COLUMN available_for_projects boolean DEFAULT true;

-- Update existing users to new role system
UPDATE public.profiles SET 
  new_role = CASE 
    WHEN role = 'investor' THEN 'subsidiary_investor'::public.new_user_role
    WHEN role = 'founder' THEN 'founder'::public.new_user_role
    WHEN role = 'freelancer' THEN 'freelancer'::public.new_user_role
    WHEN role = 'outsourcer' THEN 'outsourcer'::public.new_user_role
    ELSE 'job_seeker'::public.new_user_role
  END;

-- Drop old role column and rename new one
ALTER TABLE public.profiles DROP COLUMN role;
ALTER TABLE public.profiles RENAME COLUMN new_role TO role;

-- Update user_roles table
ALTER TABLE public.user_roles 
ADD COLUMN new_role public.new_user_role;

UPDATE public.user_roles SET 
  new_role = CASE 
    WHEN role = 'investor' THEN 'subsidiary_investor'::public.new_user_role
    WHEN role = 'founder' THEN 'founder'::public.new_user_role
    WHEN role = 'freelancer' THEN 'freelancer'::public.new_user_role
    WHEN role = 'outsourcer' THEN 'outsourcer'::public.new_user_role
    ELSE 'job_seeker'::public.new_user_role
  END;

ALTER TABLE public.user_roles DROP COLUMN role;
ALTER TABLE public.user_roles RENAME COLUMN new_role TO role;

-- Create pricing configuration table
CREATE TABLE public.pricing_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role public.new_user_role NOT NULL,
  tier public.subscription_plan NOT NULL,
  price_monthly numeric NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  limits jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(role, tier)
);

-- Insert pricing data
INSERT INTO public.pricing_config (role, tier, price_monthly, features, limits) VALUES
-- Соискатели
('job_seeker', 'start', 0, '["Поиск вакансий", "Базовое портфолио", "Авто-рекомендации"]', '{"applications_per_month": 0, "portfolio_items": 3}'),
('job_seeker', 'profi', 990, '["Неограниченные отклики", "Календарь собеседований", "Аналитика рынка труда"]', '{"applications_per_month": -1, "portfolio_items": 10}'),
('job_seeker', 'premium', 1990, '["AI-карьерный трекер", "Видео-рекомендации", "Приоритетная видимость"]', '{"applications_per_month": -1, "portfolio_items": -1}'),

-- Фрилансеры
('freelancer', 'start', 0, '["3 кейса в портфолио", "5 откликов в месяц"]', '{"portfolio_items": 3, "applications_per_month": 5}'),
('freelancer', 'profi', 2990, '["Безлимитные отклики", "Escrow-счета", "Time-tracker"]', '{"portfolio_items": 10, "applications_per_month": -1}'),
('freelancer', 'premium', 5990, '["Приоритетная выдача", "API-интеграция", "Персональный менеджер"]', '{"portfolio_items": -1, "applications_per_month": -1}'),

-- Соучредители
('co_owner', 'start', 1990, '["Просмотр проектов", "3 отклика в месяц"]', '{"projects_view": true, "applications_per_month": 3}'),
('co_owner', 'profi', 5990, '["AI-рейтинг совместимости", "Виртуальный data-room"]', '{"applications_per_month": 10, "ai_matching": true}'),
('co_owner', 'premium', 9990, '["Долевое соглашение", "Юридический пакет", "Закрытый пул инвесторов"]', '{"applications_per_month": -1, "legal_tools": true}'),

-- Аутсорсеры  
('outsourcer', 'start', 4990, '["Витрина из 5 услуг", "1 активный проект"]', '{"services_showcase": 5, "active_projects": 1}'),
('outsourcer', 'profi', 9990, '["CRM-модуль", "Команда до 20 чел", "Отчёты рентабельности"]', '{"team_size": 20, "crm_access": true}'),
('outsourcer', 'premium', 14990, '["ERP-интеграция", "Multi-project dashboard", "SLA-монитор"]', '{"team_size": -1, "erp_integration": true}'),

-- Подрядчики
('contractor', 'start', 6990, '["Каталог услуг", "Тендеры до ₽1 млн"]', '{"tender_limit": 1000000, "catalog_items": 10}'),
('contractor', 'profi', 14990, '["Планирование ресурсов", "ISO-совместимый модуль"]', '{"tender_limit": 10000000, "iso_tools": true}'),
('contractor', 'premium', 19990, '["Управление оборудованием", "Прогноз загрузки", "API для площадок"]', '{"tender_limit": -1, "equipment_management": true}'),

-- Субсидиарные инвесторы
('subsidiary_investor', 'start', 9990, '["Доступ к сделкам до ₽10 млн", "Базовый риск-профиль"]', '{"investment_limit": 10000000, "deals_per_month": 5}'),
('subsidiary_investor', 'profi', 24990, '["Расширенная due-diligence", "Портфельная аналитика"]', '{"investment_limit": 10000000, "deals_per_month": 15}'),
('subsidiary_investor', 'premium', 39990, '["Co-investment club", "Персональный брокер", "Приоритет в раундах"]', '{"investment_limit": 10000000, "deals_per_month": -1}'),

-- Ко-фаундеры
('co_founder', 'start', 14990, '["Участие в 1 проекте", "Чат-коллаборация"]', '{"active_projects": 1, "team_features": true}'),
('co_founder', 'profi', 34990, '["До 5 проектов", "Трекер задач", "KPI-панель"]', '{"active_projects": 5, "analytics": true}'),
('co_founder', 'premium', 49990, '["Неограниченные проекты", "Equity-сплит", "Ментор-линк"]', '{"active_projects": -1, "equity_tools": true}'),

-- Фаундеры
('founder', 'start', 19990, '["Создание 1 проекта", "Базовый бизнес-канвас"]', '{"projects_create": 1, "basic_tools": true}'),
('founder', 'profi', 49990, '["Финансовая модель", "Video-pitch студия", "AI-советник"]', '{"projects_create": 3, "advanced_tools": true}'),
('founder', 'premium', 74990, '["Investor data-room", "OKR-модуль", "Live-аналитика MRR/ARR"]', '{"projects_create": -1, "premium_tools": true}'),

-- Инвесторы
('investor', 'start', 29990, '["Фильтры проектов", "Лента рынков", "Базовое портфолио"]', '{"deal_access": "basic", "portfolio_analytics": "basic"}'),
('investor', 'profi', 69990, '["Расширенные метрики", "Сравнение проектов", "Ценовые алерты"]', '{"deal_access": "advanced", "portfolio_analytics": "advanced"}'),
('investor', 'premium', 99990, '["Индивидуальный анализ", "VIP-менеджер", "Early-access", "API экспорт"]', '{"deal_access": "vip", "portfolio_analytics": "premium"}');

-- Enable RLS on pricing_config
ALTER TABLE public.pricing_config ENABLE ROW LEVEL SECURITY;

-- Create policy for pricing config (publicly readable)
CREATE POLICY "Pricing config is publicly readable" 
ON public.pricing_config 
FOR SELECT 
USING (true);

-- Update the get_current_user_role function
DROP FUNCTION IF EXISTS public.get_current_user_role();
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS public.new_user_role
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$;