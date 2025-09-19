-- Add job_seeker to the user_role enum
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'job_seeker';