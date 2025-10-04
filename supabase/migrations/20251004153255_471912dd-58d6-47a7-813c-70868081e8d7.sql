-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role new_user_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Assign superadmin role to serge101.pro@gmail.com
DO $$
DECLARE
  target_user_id uuid;
  role_exists boolean;
BEGIN
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = 'serge101.pro@gmail.com';
  
  IF target_user_id IS NOT NULL THEN
    -- Check if role already exists
    SELECT EXISTS(
      SELECT 1 FROM public.user_roles 
      WHERE user_id = target_user_id AND role = 'superadmin'::new_user_role
    ) INTO role_exists;
    
    -- Insert only if doesn't exist
    IF NOT role_exists THEN
      INSERT INTO public.user_roles (user_id, role, is_current)
      VALUES (target_user_id, 'superadmin'::new_user_role, true);
    END IF;
    
    -- Update profile role
    UPDATE public.profiles
    SET role = 'superadmin'::new_user_role
    WHERE user_id = target_user_id;
  END IF;
END $$;

-- Create project moderation table
CREATE TABLE IF NOT EXISTS public.project_moderation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  moderator_id uuid REFERENCES auth.users(id) NOT NULL,
  action text NOT NULL,
  comment text,
  previous_status text,
  new_status text,
  level_changed_to text,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.project_moderation ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Superadmins can manage project moderation"
ON public.project_moderation
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'superadmin'::new_user_role));

-- Create platform staff table
CREATE TABLE IF NOT EXISTS public.platform_staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  staff_role text NOT NULL,
  permissions jsonb DEFAULT '{}' NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  assigned_by uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.platform_staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Superadmins can manage platform staff"
ON public.platform_staff
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'superadmin'::new_user_role));

-- Create audit log
CREATE TABLE IF NOT EXISTS public.superadmin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES auth.users(id) NOT NULL,
  action text NOT NULL,
  target_type text NOT NULL,
  target_id uuid,
  details jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.superadmin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Superadmins can view audit log"
ON public.superadmin_audit_log
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'superadmin'::new_user_role));

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_platform_staff_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_platform_staff_updated_at
BEFORE UPDATE ON public.platform_staff
FOR EACH ROW
EXECUTE FUNCTION public.update_platform_staff_updated_at();