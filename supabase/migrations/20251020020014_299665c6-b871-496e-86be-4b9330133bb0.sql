-- Update switch_user_role to NOT sync back to profiles table
-- Roles should only be stored in user_roles table for security
CREATE OR REPLACE FUNCTION public.switch_user_role(p_role new_user_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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

  -- REMOVED: Do not sync to profiles.role anymore
  -- Roles are managed only in user_roles table
END;
$function$;