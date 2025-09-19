-- Add all missing values to the user_role enum
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'co_founder';
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'co_owner';