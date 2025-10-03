-- Обновляем enum новых ролей пользователей
ALTER TYPE new_user_role ADD VALUE IF NOT EXISTS 'expert';
ALTER TYPE new_user_role ADD VALUE IF NOT EXISTS 'consultant';
ALTER TYPE new_user_role ADD VALUE IF NOT EXISTS 'administrator';
ALTER TYPE new_user_role ADD VALUE IF NOT EXISTS 'employee';
ALTER TYPE new_user_role ADD VALUE IF NOT EXISTS 'ambassador';
ALTER TYPE new_user_role ADD VALUE IF NOT EXISTS 'partner';
ALTER TYPE new_user_role ADD VALUE IF NOT EXISTS 'blogger';

-- Обновляем enum user_role для совместимости
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'blogger';

-- Добавляем статус песочницы для проектов
ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_sandbox boolean DEFAULT true;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES profiles(user_id);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS approved_at timestamp with time zone;

-- Создаем индексы для улучшения производительности
CREATE INDEX IF NOT EXISTS idx_projects_is_sandbox ON projects(is_sandbox);
CREATE INDEX IF NOT EXISTS idx_projects_approved_at ON projects(approved_at);

-- Политика RLS для песочницы: только владелец и суперадмин могут видеть проекты в песочнице
DROP POLICY IF EXISTS "Projects are viewable by everyone" ON projects;

CREATE POLICY "Approved projects are viewable by everyone"
ON projects FOR SELECT
USING (
  is_sandbox = false OR 
  auth.uid() = owner_id OR
  EXISTS (
    SELECT 1 FROM admin_accounts 
    WHERE id = auth.uid() AND role = 'superadmin'
  )
);