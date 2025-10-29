-- Initialize platform statistics if not exists
INSERT INTO public.platform_statistics (
  total_users,
  total_projects,
  total_investments,
  total_funding_raised,
  active_freelancers,
  active_investors,
  successful_projects,
  updated_at
)
SELECT 
  COALESCE((SELECT COUNT(*) FROM public.profiles), 0),
  COALESCE((SELECT COUNT(*) FROM public.projects), 0),
  COALESCE((SELECT COUNT(*) FROM public.investments), 0),
  COALESCE((SELECT SUM(amount) FROM public.investments), 0),
  COALESCE((SELECT COUNT(*) FROM public.profiles WHERE role = 'freelancer'), 0),
  COALESCE((SELECT COUNT(*) FROM public.profiles WHERE role = 'investor'), 0),
  COALESCE((SELECT COUNT(*) FROM public.projects WHERE status = 'completed'), 0),
  now()
WHERE NOT EXISTS (SELECT 1 FROM public.platform_statistics LIMIT 1);

-- Create function to update platform statistics
CREATE OR REPLACE FUNCTION public.update_platform_statistics()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update or insert statistics
  INSERT INTO public.platform_statistics (
    id,
    total_users,
    total_projects,
    total_investments,
    total_funding_raised,
    active_freelancers,
    active_investors,
    successful_projects,
    updated_at
  )
  VALUES (
    COALESCE((SELECT id FROM public.platform_statistics LIMIT 1), gen_random_uuid()),
    COALESCE((SELECT COUNT(*) FROM public.profiles), 0),
    COALESCE((SELECT COUNT(*) FROM public.projects), 0),
    COALESCE((SELECT COUNT(*) FROM public.investments), 0),
    COALESCE((SELECT SUM(amount) FROM public.investments), 0),
    COALESCE((SELECT COUNT(*) FROM public.profiles WHERE role = 'freelancer'), 0),
    COALESCE((SELECT COUNT(*) FROM public.profiles WHERE role = 'investor'), 0),
    COALESCE((SELECT COUNT(*) FROM public.projects WHERE status = 'completed'), 0),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    total_users = EXCLUDED.total_users,
    total_projects = EXCLUDED.total_projects,
    total_investments = EXCLUDED.total_investments,
    total_funding_raised = EXCLUDED.total_funding_raised,
    active_freelancers = EXCLUDED.active_freelancers,
    active_investors = EXCLUDED.active_investors,
    successful_projects = EXCLUDED.successful_projects,
    updated_at = now();
END;
$$;