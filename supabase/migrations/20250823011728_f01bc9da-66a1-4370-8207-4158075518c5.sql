-- Create enhanced user profiles table with proper authentication support
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS two_factor_enabled boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS two_factor_secret text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS provider text DEFAULT 'email';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS provider_id text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_language text DEFAULT 'ru';

-- Update the handle_new_user function to support OAuth providers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (
        user_id, 
        first_name, 
        last_name, 
        role,
        email,
        provider,
        provider_id,
        email_verified
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'first_name', NEW.raw_user_meta_data ->> 'full_name'),
        NEW.raw_user_meta_data ->> 'last_name',
        COALESCE((NEW.raw_user_meta_data ->> 'role')::public.user_role, 'freelancer'::public.user_role),
        COALESCE(NEW.email, NEW.raw_user_meta_data ->> 'email'),
        COALESCE(NEW.raw_user_meta_data ->> 'provider', 'email'),
        NEW.raw_user_meta_data ->> 'provider_id',
        COALESCE(NEW.email_confirmed_at IS NOT NULL, false)
    );
    RETURN NEW;
END;
$$;

-- Create API keys table for model selection
CREATE TABLE IF NOT EXISTS public.user_api_keys (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    key_name text NOT NULL,
    api_key text NOT NULL,
    provider text NOT NULL, -- 'openai', 'anthropic', 'openrouter', etc.
    model_preference text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    last_used timestamp with time zone
);

-- Enable RLS on API keys
ALTER TABLE public.user_api_keys ENABLE ROW LEVEL SECURITY;

-- Create policies for API keys
CREATE POLICY "Users can manage their own API keys" ON public.user_api_keys
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.user_id = auth.uid() 
        AND profiles.user_id = user_api_keys.user_id
    ));

-- Create function to get user's preferred API configuration
CREATE OR REPLACE FUNCTION public.get_user_api_config(p_user_id uuid)
RETURNS TABLE(
    provider text,
    model text,
    api_key text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        uak.provider,
        uak.model_preference,
        uak.api_key
    FROM public.user_api_keys uak
    WHERE uak.user_id = p_user_id 
    AND uak.is_active = true
    ORDER BY uak.created_at DESC
    LIMIT 1;
END;
$$;