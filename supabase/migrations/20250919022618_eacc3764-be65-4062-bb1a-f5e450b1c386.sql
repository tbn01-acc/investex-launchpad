-- Update the existing user_role enum to include all 9 roles
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'subsidiary_investor';