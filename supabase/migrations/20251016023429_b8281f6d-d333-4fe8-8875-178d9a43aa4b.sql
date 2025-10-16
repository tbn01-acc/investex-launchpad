-- Add 'co_partner' value to enum new_user_role if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_enum e ON t.oid = e.enumtypid
    WHERE t.typname = 'new_user_role' AND e.enumlabel = 'co_partner'
  ) THEN
    ALTER TYPE new_user_role ADD VALUE 'co_partner';
  END IF;
END $$;