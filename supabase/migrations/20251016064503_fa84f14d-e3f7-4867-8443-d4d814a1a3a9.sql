
-- Fix audit log function to handle NULL user_id during migrations
CREATE OR REPLACE FUNCTION public.log_critical_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only log if there's an authenticated user (skip during migrations)
  IF auth.uid() IS NOT NULL THEN
    INSERT INTO public.security_audit_log (
      user_id,
      action,
      target_table,
      target_id,
      old_value,
      new_value
    ) VALUES (
      auth.uid(),
      TG_OP,
      TG_TABLE_NAME,
      COALESCE(NEW.id, OLD.id),
      to_jsonb(OLD),
      to_jsonb(NEW)
    );
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Add unique constraint on user_roles table if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'user_roles_user_id_role_key'
  ) THEN
    ALTER TABLE public.user_roles 
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);
  END IF;
END $$;

-- Migrate existing roles from profiles to user_roles table
INSERT INTO public.user_roles (user_id, role, is_current)
SELECT 
  p.user_id,
  p.role,
  true
FROM public.profiles p
WHERE p.role IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = p.user_id AND ur.role = p.role
  )
ON CONFLICT (user_id, role) DO NOTHING;

-- Update is_current flag based on profiles.role
UPDATE public.user_roles
SET is_current = (role = (SELECT role FROM public.profiles WHERE user_id = user_roles.user_id))
WHERE user_id IN (SELECT user_id FROM public.profiles);
