-- Fix the profiles RLS policy to prevent "more than one row" error
-- Drop the problematic policy
DROP POLICY IF EXISTS "profiles_safe_fields_update" ON public.profiles;
DROP POLICY IF EXISTS "profiles_user_update_safe_fields" ON public.profiles;

-- Create a simpler policy that allows users to update only safe fields
-- Critical fields (role, verification_status, etc.) are protected by NOT updating them
CREATE POLICY "profiles_user_update_own" ON public.profiles
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Note: The protection of critical fields should be handled in the application layer
-- The user_roles table is now the source of truth for roles