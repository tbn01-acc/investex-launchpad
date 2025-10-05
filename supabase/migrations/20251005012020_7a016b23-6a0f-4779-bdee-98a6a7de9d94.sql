-- Create enum for project categories if not exists
DO $$ BEGIN
  CREATE TYPE public.project_category_type AS ENUM ('active', 'sandbox', 'gold_fund', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add new column with enum type
ALTER TABLE public.projects 
  ADD COLUMN IF NOT EXISTS project_category_new project_category_type DEFAULT 'active'::project_category_type;

-- Copy data from old column to new, converting text to enum
UPDATE public.projects 
SET project_category_new = CASE 
  WHEN project_category = 'active' THEN 'active'::project_category_type
  WHEN project_category = 'sandbox' THEN 'sandbox'::project_category_type
  WHEN project_category = 'gold_fund' THEN 'gold_fund'::project_category_type
  WHEN project_category = 'archived' THEN 'archived'::project_category_type
  ELSE 'active'::project_category_type
END;

-- Drop old column
ALTER TABLE public.projects DROP COLUMN IF EXISTS project_category;

-- Rename new column to original name
ALTER TABLE public.projects RENAME COLUMN project_category_new TO project_category;

-- Make it NOT NULL
ALTER TABLE public.projects ALTER COLUMN project_category SET NOT NULL;