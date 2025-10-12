-- Add counterparty_contacts to profiles for contact sharing
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS counterparty_contacts jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Create index for faster access by user_id if not exists
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND tablename = 'profiles' AND indexname = 'idx_profiles_user_id'
  ) THEN
    CREATE INDEX idx_profiles_user_id ON public.profiles (user_id);
  END IF;
END $$;
