-- Ensure RLS is enabled on projects and superadmin_audit_log and add superadmin policies if missing

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Superadmins can view all projects
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'projects' AND policyname = 'Superadmins can view all projects'
  ) THEN
    CREATE POLICY "Superadmins can view all projects"
    ON public.projects
    FOR SELECT
    USING (public.has_role(auth.uid(), 'superadmin'::new_user_role));
  END IF;
END $$;

-- Superadmins can update all projects
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'projects' AND policyname = 'Superadmins can update all projects'
  ) THEN
    CREATE POLICY "Superadmins can update all projects"
    ON public.projects
    FOR UPDATE
    USING (public.has_role(auth.uid(), 'superadmin'::new_user_role));
  END IF;
END $$;

-- Optionally allow delete if needed later (keeping minimal now)
-- DO $$
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1 FROM pg_policies 
--     WHERE schemaname = 'public' AND tablename = 'projects' AND policyname = 'Superadmins can delete all projects'
--   ) THEN
--     CREATE POLICY "Superadmins can delete all projects"
--     ON public.projects
--     FOR DELETE
--     USING (public.has_role(auth.uid(), 'superadmin'::new_user_role));
--   END IF;
-- END $$;

-- Ensure RLS on superadmin_audit_log and allow inserts by superadmins (required by UI)
ALTER TABLE public.superadmin_audit_log ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'superadmin_audit_log' AND policyname = 'Superadmins can insert audit log'
  ) THEN
    CREATE POLICY "Superadmins can insert audit log"
    ON public.superadmin_audit_log
    FOR INSERT
    WITH CHECK (public.has_role(auth.uid(), 'superadmin'::new_user_role));
  END IF;
END $$;
