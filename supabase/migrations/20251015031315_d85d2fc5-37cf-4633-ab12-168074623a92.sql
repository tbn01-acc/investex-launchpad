-- Add new role to enum if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_enum e ON t.oid = e.enumtypid
    WHERE t.typname = 'new_user_role' AND e.enumlabel = 'franchiser'
  ) THEN
    ALTER TYPE public.new_user_role ADD VALUE 'franchiser';
  END IF;
END$$;