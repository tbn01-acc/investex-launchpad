DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_tables WHERE schemaname='public' AND tablename='projects'
  ) THEN
    -- Enable RLS (safe if already enabled)
    EXECUTE 'ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY';

    -- Create policy if missing
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' 
        AND tablename = 'projects' 
        AND policyname = 'Public can view approved projects'
    ) THEN
      EXECUTE 'CREATE POLICY "Public can view approved projects" ON public.projects FOR SELECT USING (moderation_status = ''approved'')';
    END IF;
  END IF;
END$$;