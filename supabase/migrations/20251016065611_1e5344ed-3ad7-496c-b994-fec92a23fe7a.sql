-- Fix user_roles UPDATE policy causing scalar subquery error and enforce column safety via trigger
-- 1) Drop faulty update policy
DROP POLICY IF EXISTS "user_roles_switch_active_only" ON public.user_roles;

-- 2) Create safe update policy: users can update only their own rows
CREATE POLICY "user_roles_update_own" ON public.user_roles
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 3) Prevent changing role/user_id by non-superadmins via trigger
CREATE OR REPLACE FUNCTION public.prevent_role_column_change()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW.role IS DISTINCT FROM OLD.role THEN
      IF NOT public.has_role(auth.uid(), 'superadmin'::new_user_role) THEN
        RAISE EXCEPTION 'Changing user_roles.role is not allowed';
      END IF;
    END IF;
    IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
      IF NOT public.has_role(auth.uid(), 'superadmin'::new_user_role) THEN
        RAISE EXCEPTION 'Changing user_roles.user_id is not allowed';
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_role_change ON public.user_roles;
CREATE TRIGGER trg_prevent_role_change
BEFORE UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.prevent_role_column_change();