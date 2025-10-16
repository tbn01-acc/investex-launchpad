-- Fix Critical Security Issues: Profiles, Password Reset, and Messages RLS

-- =====================================================
-- 1. FIX PROFILES TABLE - RESTRICT PUBLIC ACCESS
-- =====================================================

-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create restrictive policy: users can only view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create a limited public view for non-sensitive profile data
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  user_id,
  first_name,
  last_name,
  avatar_url,
  bio,
  company,
  skills,
  experience_level,
  created_at
FROM public.profiles
WHERE verification_status = 'verified';

-- Grant access to the public view
GRANT SELECT ON public.public_profiles TO authenticated, anon;

-- =====================================================
-- 2. FIX PASSWORD_RESET_REQUESTS TABLE - REMOVE PUBLIC ACCESS
-- =====================================================

-- Drop the dangerous public access policy
DROP POLICY IF EXISTS "System can manage password reset requests" ON public.password_reset_requests;

-- This table should ONLY be accessed via Edge Functions with service_role
-- No RLS policies needed - service_role bypasses RLS
-- Client-side code should never directly query this table

-- =====================================================
-- 3. FIX MESSAGES TABLE - TIGHTEN ACCESS CONTROLS
-- =====================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can send messages" ON public.messages;
DROP POLICY IF EXISTS "Users can view their own messages" ON public.messages;
DROP POLICY IF EXISTS "Recipients can update read status" ON public.messages;

-- INSERT: Force sender to be current user
CREATE POLICY "Users can send messages" 
ON public.messages 
FOR INSERT 
WITH CHECK (auth.uid() = sender_id);

-- SELECT: Only sender and recipient can view
CREATE POLICY "Users can view own messages" 
ON public.messages 
FOR SELECT 
USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- UPDATE: Only recipient can update, and only the read_at field
CREATE POLICY "Recipients can mark messages as read" 
ON public.messages 
FOR UPDATE 
USING (auth.uid() = recipient_id)
WITH CHECK (
  auth.uid() = recipient_id 
  AND sender_id = (SELECT sender_id FROM public.messages WHERE id = messages.id)
  AND recipient_id = (SELECT recipient_id FROM public.messages WHERE id = messages.id)
  AND subject = (SELECT subject FROM public.messages WHERE id = messages.id)
  AND content = (SELECT content FROM public.messages WHERE id = messages.id)
);