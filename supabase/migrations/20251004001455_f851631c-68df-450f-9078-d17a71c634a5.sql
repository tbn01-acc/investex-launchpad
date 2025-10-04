-- Create tasks table for PM module
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  assignee_id UUID,
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'done')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  deadline TIMESTAMP WITH TIME ZONE,
  estimated_hours NUMERIC,
  actual_hours NUMERIC,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.task_dependencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
  depends_on_task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.task_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.task_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  uploaded_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create HR tables
CREATE TABLE IF NOT EXISTS public.project_vacancies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  requirements TEXT[],
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'on_hold')),
  salary_range_min NUMERIC,
  salary_range_max NUMERIC,
  currency TEXT DEFAULT 'RUB',
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.onboarding_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL,
  tasks JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.team_performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  metrics JSONB DEFAULT '{}'::jsonb,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create CRM tables
CREATE TABLE IF NOT EXISTS public.crm_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  type TEXT CHECK (type IN ('client', 'partner', 'investor', 'lead')),
  tags TEXT[],
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.crm_pipelines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  stages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.crm_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES public.crm_contacts(id) ON DELETE CASCADE,
  pipeline_id UUID REFERENCES public.crm_pipelines(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  amount NUMERIC,
  currency TEXT DEFAULT 'RUB',
  stage TEXT NOT NULL,
  probability INTEGER DEFAULT 50 CHECK (probability >= 0 AND probability <= 100),
  expected_close_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'won', 'lost')),
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.crm_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES public.crm_deals(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES public.crm_contacts(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('email', 'call', 'meeting', 'note')),
  description TEXT NOT NULL,
  interaction_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create KB tables
CREATE TABLE IF NOT EXISTS public.kb_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  parent_id UUID REFERENCES public.kb_categories(id) ON DELETE CASCADE,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.kb_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.kb_categories(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID NOT NULL,
  version INTEGER DEFAULT 1,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.kb_article_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES public.kb_articles(id) ON DELETE CASCADE NOT NULL,
  content TEXT,
  version INTEGER NOT NULL,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.kb_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  folder_id UUID,
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  file_type TEXT,
  uploaded_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create BI tables
CREATE TABLE IF NOT EXISTS public.bi_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  type TEXT CHECK (type IN ('investor', 'cofounder', 'team', 'stakeholder')),
  name TEXT NOT NULL,
  config JSONB DEFAULT '{}'::jsonb,
  schedule TEXT,
  recipients TEXT[],
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.bi_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  metric_name TEXT NOT NULL,
  value NUMERIC NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.bi_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  snapshot_data JSONB DEFAULT '{}'::jsonb,
  snapshot_date TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create project permissions table
CREATE TABLE IF NOT EXISTS public.project_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  can_manage_pm BOOLEAN DEFAULT false,
  can_manage_hr BOOLEAN DEFAULT false,
  can_manage_crm BOOLEAN DEFAULT false,
  can_manage_kb BOOLEAN DEFAULT false,
  can_view_bi BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Enable RLS
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_pipelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kb_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kb_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kb_article_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kb_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bi_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bi_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bi_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_permissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Tasks
CREATE POLICY "Users can view tasks for their projects"
ON public.tasks FOR SELECT
USING (
  project_id IN (
    SELECT project_id FROM public.project_team_members WHERE user_id = auth.uid()
    UNION
    SELECT id FROM public.projects WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "Users can create tasks for their projects"
ON public.tasks FOR INSERT
WITH CHECK (
  project_id IN (
    SELECT project_id FROM public.project_team_members WHERE user_id = auth.uid()
    UNION
    SELECT id FROM public.projects WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "Users can update tasks for their projects"
ON public.tasks FOR UPDATE
USING (
  project_id IN (
    SELECT project_id FROM public.project_team_members WHERE user_id = auth.uid()
    UNION
    SELECT id FROM public.projects WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "Users can delete tasks for their projects"
ON public.tasks FOR DELETE
USING (
  project_id IN (
    SELECT project_id FROM public.project_team_members WHERE user_id = auth.uid()
    UNION
    SELECT id FROM public.projects WHERE owner_id = auth.uid()
  )
);

-- RLS Policies for CRM Contacts
CREATE POLICY "Users can manage CRM contacts for their projects"
ON public.crm_contacts FOR ALL
USING (
  project_id IN (
    SELECT id FROM public.projects WHERE owner_id = auth.uid()
    UNION
    SELECT project_id FROM public.project_permissions 
    WHERE user_id = auth.uid() AND can_manage_crm = true
  )
);

-- RLS Policies for KB Articles
CREATE POLICY "Users can view KB articles for their projects"
ON public.kb_articles FOR SELECT
USING (
  project_id IN (
    SELECT project_id FROM public.project_team_members WHERE user_id = auth.uid()
    UNION
    SELECT id FROM public.projects WHERE owner_id = auth.uid()
  ) OR status = 'published'
);

CREATE POLICY "Users can manage KB articles for their projects"
ON public.kb_articles FOR ALL
USING (
  project_id IN (
    SELECT id FROM public.projects WHERE owner_id = auth.uid()
    UNION
    SELECT project_id FROM public.project_permissions 
    WHERE user_id = auth.uid() AND can_manage_kb = true
  )
);

-- RLS Policies for BI Reports
CREATE POLICY "Users can view BI reports for their projects"
ON public.bi_reports FOR SELECT
USING (
  project_id IN (
    SELECT project_id FROM public.project_team_members WHERE user_id = auth.uid()
    UNION
    SELECT id FROM public.projects WHERE owner_id = auth.uid()
    UNION
    SELECT project_id FROM public.project_permissions 
    WHERE user_id = auth.uid() AND can_view_bi = true
  )
);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_vacancies_updated_at BEFORE UPDATE ON public.project_vacancies
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_contacts_updated_at BEFORE UPDATE ON public.crm_contacts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_deals_updated_at BEFORE UPDATE ON public.crm_deals
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kb_articles_updated_at BEFORE UPDATE ON public.kb_articles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bi_reports_updated_at BEFORE UPDATE ON public.bi_reports
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();