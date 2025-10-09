-- Cleanly replace recursive policies

-- admin_accounts
DROP POLICY IF EXISTS "Service role can manage admin_accounts" ON public.admin_accounts;
DROP POLICY IF EXISTS "Superadmins can manage admin accounts" ON public.admin_accounts;
ALTER TABLE public.admin_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can manage admin_accounts"
ON public.admin_accounts
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- platform_settings
DROP POLICY IF EXISTS "Only superadmins can manage platform settings" ON public.platform_settings;
CREATE POLICY "Only superadmins can manage platform settings"
ON public.platform_settings
FOR ALL
USING (public.has_role(auth.uid(), 'superadmin'::public.new_user_role))
WITH CHECK (public.has_role(auth.uid(), 'superadmin'::public.new_user_role));

-- currency_rates
DROP POLICY IF EXISTS "Only superadmins can update currency rates" ON public.currency_rates;
CREATE POLICY "Only superadmins can update currency rates"
ON public.currency_rates
FOR ALL
USING (public.has_role(auth.uid(), 'superadmin'::public.new_user_role))
WITH CHECK (public.has_role(auth.uid(), 'superadmin'::public.new_user_role));

-- platform_statistics
DROP POLICY IF EXISTS "Only superadmins can update platform statistics" ON public.platform_statistics;
CREATE POLICY "Only superadmins can update platform statistics"
ON public.platform_statistics
FOR ALL
USING (public.has_role(auth.uid(), 'superadmin'::public.new_user_role))
WITH CHECK (public.has_role(auth.uid(), 'superadmin'::public.new_user_role));

-- skill_categories
DROP POLICY IF EXISTS "Only superadmins can manage skill categories" ON public.skill_categories;
CREATE POLICY "Only superadmins can manage skill categories"
ON public.skill_categories
FOR ALL
USING (public.has_role(auth.uid(), 'superadmin'::public.new_user_role))
WITH CHECK (public.has_role(auth.uid(), 'superadmin'::public.new_user_role));

-- projects
DROP POLICY IF EXISTS "Approved projects are viewable by everyone" ON public.projects;
CREATE POLICY "Approved projects are viewable by everyone"
ON public.projects
FOR SELECT
USING (((is_sandbox = false) OR (auth.uid() = owner_id) OR public.has_role(auth.uid(), 'superadmin'::public.new_user_role)));

DROP POLICY IF EXISTS "Superadmins can view all projects" ON public.projects;
CREATE POLICY "Superadmins can view all projects"
ON public.projects
FOR SELECT
USING (public.has_role(auth.uid(), 'superadmin'::public.new_user_role));

DROP POLICY IF EXISTS "Superadmins can manage all projects" ON public.projects;
CREATE POLICY "Superadmins can manage all projects"
ON public.projects
FOR ALL
USING (public.has_role(auth.uid(), 'superadmin'::public.new_user_role))
WITH CHECK (public.has_role(auth.uid(), 'superadmin'::public.new_user_role));