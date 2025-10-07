-- Add RLS policy for superadmins to view all projects
CREATE POLICY "Superadmins can view all projects"
ON public.projects
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'superadmin'::new_user_role
  )
);

-- Add RLS policy for superadmins to manage all projects
CREATE POLICY "Superadmins can manage all projects"
ON public.projects
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'superadmin'::new_user_role
  )
);