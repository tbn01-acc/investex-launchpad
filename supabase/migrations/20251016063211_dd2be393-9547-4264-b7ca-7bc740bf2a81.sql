-- Drop existing permissive policies on user_roles if they exist
DROP POLICY IF EXISTS "Users can insert their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can update their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create restrictive RLS policies for user_roles
CREATE POLICY "user_roles_own_view"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "user_roles_switch_active_only"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (
  user_id = auth.uid() 
  AND role = (SELECT role FROM public.user_roles WHERE id = user_roles.id)
);

CREATE POLICY "prevent_self_role_assignment"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'superadmin'::new_user_role));

CREATE POLICY "superadmin_delete_roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'superadmin'::new_user_role));

-- Drop permissive update policy on profiles
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create restrictive update policy for profiles
CREATE POLICY "profiles_safe_fields_update"
ON public.profiles
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (
  user_id = auth.uid()
  AND role = (SELECT role FROM public.profiles WHERE user_id = auth.uid())
  AND verification_status = (SELECT verification_status FROM public.profiles WHERE user_id = auth.uid())
  AND kyc_status = (SELECT kyc_status FROM public.profiles WHERE user_id = auth.uid())
  AND email_verified = (SELECT email_verified FROM public.profiles WHERE user_id = auth.uid())
  AND subscription_tier = (SELECT subscription_tier FROM public.profiles WHERE user_id = auth.uid())
  AND created_at = (SELECT created_at FROM public.profiles WHERE user_id = auth.uid())
  AND added_by IS NOT DISTINCT FROM (SELECT added_by FROM public.profiles WHERE user_id = auth.uid())
);

-- Create secure role switching function
CREATE OR REPLACE FUNCTION public.switch_user_role(p_role new_user_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify user has this role assigned
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = p_role
  ) THEN
    RAISE EXCEPTION 'Access denied: Role % not assigned to user', p_role;
  END IF;

  -- Clear all is_current flags for this user
  UPDATE public.user_roles
  SET is_current = false
  WHERE user_id = auth.uid();

  -- Set new current role
  UPDATE public.user_roles
  SET is_current = true
  WHERE user_id = auth.uid()
  AND role = p_role;

  -- Sync profiles.role for compatibility (temporary)
  UPDATE public.profiles
  SET role = p_role
  WHERE user_id = auth.uid();
END;
$$;

-- Create security audit log table
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action text NOT NULL,
  target_table text NOT NULL,
  target_id uuid,
  old_value jsonb,
  new_value jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "superadmin_view_audit_log"
ON public.security_audit_log
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'superadmin'::new_user_role));

CREATE POLICY "system_insert_audit_log"
ON public.security_audit_log
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create audit trigger function
CREATE OR REPLACE FUNCTION public.log_critical_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
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
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Add audit trigger to user_roles
DROP TRIGGER IF EXISTS audit_user_roles_changes ON public.user_roles;
CREATE TRIGGER audit_user_roles_changes
AFTER INSERT OR UPDATE OF role OR DELETE
ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.log_critical_change();