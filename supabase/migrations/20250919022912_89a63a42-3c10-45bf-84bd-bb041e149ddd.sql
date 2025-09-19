-- Add role verification fields to profiles table (only if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='verification_documents') THEN
        ALTER TABLE public.profiles ADD COLUMN verification_documents jsonb DEFAULT '{}';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='financial_verification') THEN
        ALTER TABLE public.profiles ADD COLUMN financial_verification jsonb DEFAULT '{}';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='onboarding_completed_at') THEN
        ALTER TABLE public.profiles ADD COLUMN onboarding_completed_at timestamp with time zone;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='role_specific_data') THEN
        ALTER TABLE public.profiles ADD COLUMN role_specific_data jsonb DEFAULT '{}';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='investment_range_verified') THEN
        ALTER TABLE public.profiles ADD COLUMN investment_range_verified boolean DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='documents_status') THEN
        ALTER TABLE public.profiles ADD COLUMN documents_status text DEFAULT 'pending';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='kyc_status') THEN
        ALTER TABLE public.profiles ADD COLUMN kyc_status text DEFAULT 'not_started';
    END IF;
END $$;

-- Create role verification requirements table (only if not exists)
CREATE TABLE IF NOT EXISTS public.role_verification_requirements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role user_role NOT NULL,
  verification_type text NOT NULL,
  required_documents text[] DEFAULT '{}',
  verification_criteria jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on role verification requirements
ALTER TABLE public.role_verification_requirements ENABLE ROW LEVEL SECURITY;

-- Create policy for public reading of verification requirements (only if not exists)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'role_verification_requirements' 
        AND policyname = 'Verification requirements are publicly readable'
    ) THEN
        CREATE POLICY "Verification requirements are publicly readable" 
        ON public.role_verification_requirements 
        FOR SELECT 
        USING (true);
    END IF;
END $$;