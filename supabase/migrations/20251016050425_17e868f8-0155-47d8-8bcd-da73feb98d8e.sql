-- Create secured function for fetching platform statistics
CREATE OR REPLACE FUNCTION public.get_platform_stats_secured()
RETURNS TABLE(
  total_users integer,
  total_projects integer,
  total_investments integer,
  total_funding_raised numeric,
  active_freelancers integer,
  active_investors integer,
  successful_projects integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify user has superadmin role
  IF NOT public.has_role(auth.uid(), 'superadmin'::new_user_role) THEN
    RAISE EXCEPTION 'Access denied: Superadmin role required';
  END IF;
  
  -- Return platform statistics
  RETURN QUERY
  SELECT 
    ps.total_users,
    ps.total_projects,
    ps.total_investments,
    ps.total_funding_raised,
    ps.active_freelancers,
    ps.active_investors,
    ps.successful_projects
  FROM public.platform_statistics ps
  LIMIT 1;
END;
$$;