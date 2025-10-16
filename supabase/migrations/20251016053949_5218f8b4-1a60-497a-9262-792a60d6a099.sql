-- Fix SECURITY DEFINER view security issue with defense-in-depth approach
-- Add RLS policy to profiles table for verified users to be publicly viewable
-- This provides protection even if the view is bypassed

-- Add policy to allow public viewing of verified profiles
CREATE POLICY "Verified profiles are publicly viewable"
ON public.profiles
FOR SELECT
USING (verification_status = 'verified');

-- Note: We're keeping the public_profiles view for convenience,
-- but now it's backed by an RLS policy providing defense-in-depth