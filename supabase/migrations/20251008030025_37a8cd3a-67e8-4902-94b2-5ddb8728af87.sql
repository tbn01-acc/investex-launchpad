-- Enable RLS for projects and allow superadmins full management access
DO $$ BEGIN
  PERFORM 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'projects';
  -- If table doesn't exist, do nothing
  IF NOT FOUND THEN
    RAISE NOTICE 'Table public.projects does not exist, skipping policies';
  ELSE
    -- Enable RLS (safe to run multiple times)
    EXECUTE 'ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY';

    -- Superadmins can manage all projects (ALL: SELECT, INSERT, UPDATE, DELETE)
    BEGIN
      CREATE POLICY "Superadmins can manage all projects"
      ON public.projects
      FOR ALL
      USING (public.has_role(auth.uid(), 'superadmin'::new_user_role))
      WITH CHECK (public.has_role(auth.uid(), 'superadmin'::new_user_role));
    EXCEPTION WHEN duplicate_object THEN
      -- Policy already exists, ignore
      NULL;
    END;
  END IF;
END $$;