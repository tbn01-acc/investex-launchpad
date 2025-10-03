-- Add missing roles to new_user_role enum
ALTER TYPE new_user_role ADD VALUE IF NOT EXISTS 'co_investor';
ALTER TYPE new_user_role ADD VALUE IF NOT EXISTS 'co_founder';
ALTER TYPE new_user_role ADD VALUE IF NOT EXISTS 'administrator';
ALTER TYPE new_user_role ADD VALUE IF NOT EXISTS 'partner';

-- Add missing roles to user_role enum as well
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'co_investor';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'co_founder';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'administrator';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'partner';