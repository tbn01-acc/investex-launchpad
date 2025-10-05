-- Add project categorization columns to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS moderation_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS project_category TEXT DEFAULT 'active',
ADD COLUMN IF NOT EXISTS sandbox_approved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS sandbox_approved_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS gold_fund_added_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS gold_fund_added_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS archived_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS is_pitch BOOLEAN DEFAULT false;

-- Add check constraint for project categories
ALTER TABLE public.projects
ADD CONSTRAINT valid_project_category 
CHECK (project_category IN ('pending', 'sandbox', 'active', 'gold_fund', 'archived', 'pitch'));

-- Add check constraint for moderation status
ALTER TABLE public.projects
ADD CONSTRAINT valid_moderation_status 
CHECK (moderation_status IN ('pending', 'approved', 'rejected', 'needs_revision'));

-- Create function to move project to sandbox
CREATE OR REPLACE FUNCTION public.approve_project_to_sandbox(
  p_project_id UUID,
  p_admin_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if user is superadmin
  IF NOT public.has_role(p_admin_id, 'superadmin'::new_user_role) THEN
    RAISE EXCEPTION 'Only superadmins can approve projects to sandbox';
  END IF;
  
  UPDATE public.projects
  SET 
    project_category = 'sandbox',
    moderation_status = 'approved',
    sandbox_approved_at = NOW(),
    sandbox_approved_by = p_admin_id
  WHERE id = p_project_id;
END;
$$;

-- Create function to move project to gold fund
CREATE OR REPLACE FUNCTION public.add_project_to_gold_fund(
  p_project_id UUID,
  p_admin_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if user is superadmin
  IF NOT public.has_role(p_admin_id, 'superadmin'::new_user_role) THEN
    RAISE EXCEPTION 'Only superadmins can add projects to gold fund';
  END IF;
  
  UPDATE public.projects
  SET 
    project_category = 'gold_fund',
    gold_fund_added_at = NOW(),
    gold_fund_added_by = p_admin_id
  WHERE id = p_project_id;
END;
$$;

-- Create function to archive project
CREATE OR REPLACE FUNCTION public.archive_project(
  p_project_id UUID,
  p_admin_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if user is superadmin
  IF NOT public.has_role(p_admin_id, 'superadmin'::new_user_role) THEN
    RAISE EXCEPTION 'Only superadmins can archive projects';
  END IF;
  
  UPDATE public.projects
  SET 
    project_category = 'archived',
    archived_at = NOW()
  WHERE id = p_project_id;
END;
$$;