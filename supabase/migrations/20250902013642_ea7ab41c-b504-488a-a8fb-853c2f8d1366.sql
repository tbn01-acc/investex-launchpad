-- Add contractor role to user_role enum
ALTER TYPE user_role ADD VALUE 'contractor';
ALTER TYPE user_role ADD VALUE 'superadmin';

-- Insert default superadmin account
INSERT INTO public.admin_accounts (username, password_hash, role) 
VALUES ('admin', crypt('!moscoser08', gen_salt('bf')), 'superadmin')
ON CONFLICT (username) DO UPDATE SET 
    password_hash = crypt('!moscoser08', gen_salt('bf')),
    role = 'superadmin';

-- Create currency conversion table for real-time rates
CREATE TABLE IF NOT EXISTS public.currency_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_currency TEXT NOT NULL,
    to_currency TEXT NOT NULL,
    rate NUMERIC(10, 6) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(from_currency, to_currency)
);

-- Enable RLS on currency_rates
ALTER TABLE public.currency_rates ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read currency rates
CREATE POLICY "Currency rates are publicly readable" 
ON public.currency_rates 
FOR SELECT 
USING (true);

-- Only superadmins can update currency rates
CREATE POLICY "Only superadmins can update currency rates" 
ON public.currency_rates 
FOR ALL 
USING (EXISTS (
    SELECT 1 FROM public.admin_accounts 
    WHERE id = auth.uid() AND role = 'superadmin'
));

-- Add language and currency preferences to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'ru',
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'RUB';

-- Insert default currency rates (approximate rates)
INSERT INTO public.currency_rates (from_currency, to_currency, rate) VALUES
('USD', 'RUB', 95.50),
('EUR', 'RUB', 104.30),
('RUB', 'USD', 0.0105),
('RUB', 'EUR', 0.0096),
('USD', 'EUR', 0.92),
('EUR', 'USD', 1.09)
ON CONFLICT (from_currency, to_currency) DO UPDATE SET 
    rate = EXCLUDED.rate,
    updated_at = now();

-- Create platform statistics table for consistent data
CREATE TABLE IF NOT EXISTS public.platform_statistics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    total_users INTEGER DEFAULT 0,
    total_projects INTEGER DEFAULT 0,
    total_investments NUMERIC DEFAULT 0,
    total_funding_raised NUMERIC DEFAULT 0,
    active_freelancers INTEGER DEFAULT 0,
    active_investors INTEGER DEFAULT 0,
    successful_projects INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on platform statistics
ALTER TABLE public.platform_statistics ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read platform statistics
CREATE POLICY "Platform statistics are publicly readable" 
ON public.platform_statistics 
FOR SELECT 
USING (true);

-- Only superadmins can update platform statistics
CREATE POLICY "Only superadmins can update platform statistics" 
ON public.platform_statistics 
FOR ALL 
USING (EXISTS (
    SELECT 1 FROM public.admin_accounts 
    WHERE id = auth.uid() AND role = 'superadmin'
));

-- Insert initial platform statistics
INSERT INTO public.platform_statistics (
    total_users, 
    total_projects, 
    total_investments, 
    total_funding_raised,
    active_freelancers,
    active_investors,
    successful_projects
) VALUES (15847, 3246, 892, 15600000, 8734, 2156, 2891)
ON CONFLICT DO NOTHING;

-- Create function to update platform statistics
CREATE OR REPLACE FUNCTION public.update_platform_statistics()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
    UPDATE public.platform_statistics SET
        total_users = (SELECT COUNT(*) FROM public.profiles),
        total_projects = (SELECT COUNT(*) FROM public.projects),
        total_investments = (SELECT COUNT(*) FROM public.investments),
        total_funding_raised = (SELECT COALESCE(SUM(funding_raised), 0) FROM public.projects),
        active_freelancers = (SELECT COUNT(*) FROM public.profiles WHERE role IN ('freelancer', 'contractor')),
        active_investors = (SELECT COUNT(*) FROM public.profiles WHERE role = 'investor'),
        successful_projects = (SELECT COUNT(*) FROM public.projects WHERE status = 'completed'),
        updated_at = now()
    WHERE id = (SELECT id FROM public.platform_statistics LIMIT 1);
END;
$$;