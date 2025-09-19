-- Add role verification fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS verification_documents jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS financial_verification jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS onboarding_completed_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS role_specific_data jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS investment_range_verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS documents_status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS kyc_status text DEFAULT 'not_started';

-- Create role verification requirements table
CREATE TABLE IF NOT EXISTS public.role_verification_requirements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role user_role NOT NULL,
  verification_type text NOT NULL,
  required_documents text[] DEFAULT '{}',
  verification_criteria jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on role verification requirements
ALTER TABLE public.role_verification_requirements ENABLE ROW LEVEL SECURITY;

-- Create policy for public reading of verification requirements
CREATE POLICY "Verification requirements are publicly readable" 
ON public.role_verification_requirements 
FOR SELECT 
USING (true);

-- Insert verification requirements for each role
INSERT INTO public.role_verification_requirements (role, verification_type, required_documents, verification_criteria) VALUES
('investor', 'financial', ARRAY['bank_statement', 'investment_portfolio', 'income_proof'], '{"min_investment_capacity": 10000000, "min_net_worth": 50000000}'),
('investor', 'identity', ARRAY['passport', 'proof_of_address', 'professional_references'], '{"kyc_level": "enhanced"}'),
('subsidiary_investor', 'financial', ARRAY['bank_statement', 'income_proof'], '{"min_investment_capacity": 100000, "max_investment_capacity": 10000000}'),
('subsidiary_investor', 'identity', ARRAY['passport', 'proof_of_address'], '{"kyc_level": "standard"}'),
('founder', 'business', ARRAY['business_plan', 'company_registration', 'tax_documents'], '{"company_experience": "required"}'),
('founder', 'identity', ARRAY['passport', 'proof_of_address', 'professional_cv'], '{"leadership_experience": "verified"}'),
('co_founder', 'business', ARRAY['partnership_agreement', 'contribution_proof'], '{"startup_experience": "preferred"}'),
('co_founder', 'identity', ARRAY['passport', 'proof_of_address', 'professional_cv'], '{"collaboration_skills": "assessed"}'),
('co_owner', 'business', ARRAY['investment_intent', 'due_diligence_report'], '{"project_evaluation_skills": "required"}'),
('co_owner', 'identity', ARRAY['passport', 'proof_of_address'], '{"business_acumen": "verified"}'),
('job_seeker', 'identity', ARRAY['passport', 'cv'], '{"basic_verification": true}'),
('freelancer', 'professional', ARRAY['portfolio', 'skill_certificates', 'work_samples'], '{"skill_verification": "required"}'),
('freelancer', 'identity', ARRAY['passport', 'proof_of_address'], '{"freelance_readiness": "assessed"}'),
('outsourcer', 'business', ARRAY['company_registration', 'team_profiles', 'service_portfolio'], '{"team_management": "verified"}'),
('outsourcer', 'identity', ARRAY['passport', 'proof_of_address', 'business_license'], '{"service_delivery": "proven"}'),
('contractor', 'business', ARRAY['company_registration', 'insurance_docs', 'compliance_certificates'], '{"enterprise_readiness": "required"}'),
('contractor', 'identity', ARRAY['passport', 'proof_of_address', 'business_license'], '{"corporate_compliance": "verified"}');

-- Create trigger for updating updated_at
CREATE TRIGGER update_role_verification_requirements_updated_at
BEFORE UPDATE ON public.role_verification_requirements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();