-- Создание enum для типов организаций
CREATE TYPE organization_type AS ENUM (
  'individual',
  'company',
  'fund',
  'organization'
);

-- Создание enum для методов регистрации
CREATE TYPE registration_method AS ENUM (
  'standard_form',
  'invitation_link',
  'direct_addition'
);

-- Обновление enum user_role с 8 основными ролями
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'project_admin';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'project_employee';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'outsourcer';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'contractor';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'system_admin';

-- Создание таблицы для множественных ролей пользователей
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  role user_role NOT NULL,
  is_current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Включение RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Политики RLS для таблицы user_roles
CREATE POLICY "Users can view their own roles" 
ON user_roles 
FOR SELECT 
USING (auth.uid() IN (SELECT user_id FROM profiles WHERE profiles.user_id = user_roles.user_id));

CREATE POLICY "Users can insert their own roles" 
ON user_roles 
FOR INSERT 
WITH CHECK (auth.uid() IN (SELECT user_id FROM profiles WHERE profiles.user_id = user_roles.user_id));

CREATE POLICY "Users can update their own roles" 
ON user_roles 
FOR UPDATE 
USING (auth.uid() IN (SELECT user_id FROM profiles WHERE profiles.user_id = user_roles.user_id));

-- Обновление таблицы profiles для новой системы ролей
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS organization_type organization_type,
ADD COLUMN IF NOT EXISTS registration_method registration_method DEFAULT 'standard_form',
ADD COLUMN IF NOT EXISTS added_by UUID REFERENCES profiles(user_id),
ADD COLUMN IF NOT EXISTS project_restricted BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS allowed_projects UUID[];

-- Создание таблицы для восстановления паролей
CREATE TABLE IF NOT EXISTS password_reset_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  email VARCHAR NOT NULL,
  token VARCHAR(64) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение RLS для password_reset_requests
ALTER TABLE password_reset_requests ENABLE ROW LEVEL SECURITY;

-- Политики для password_reset_requests (только система может управлять)
CREATE POLICY "System can manage password reset requests" 
ON password_reset_requests 
FOR ALL 
USING (true);

-- Индексы для оптимизации
CREATE INDEX IF NOT EXISTS idx_password_reset_token ON password_reset_requests(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_email_created ON password_reset_requests(email, created_at);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_current ON user_roles(user_id, is_current) WHERE is_current = true;

-- Триггер для обновления updated_at в user_roles
CREATE OR REPLACE FUNCTION update_user_roles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_user_roles_updated_at
    BEFORE UPDATE ON user_roles
    FOR EACH ROW
    EXECUTE FUNCTION update_user_roles_updated_at();