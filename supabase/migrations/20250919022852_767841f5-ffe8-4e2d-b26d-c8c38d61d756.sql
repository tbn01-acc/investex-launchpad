-- Insert verification requirements for each role (with proper casting)
INSERT INTO public.role_verification_requirements (role, verification_type, required_documents, verification_criteria) 
VALUES
  ('investor'::user_role, 'financial', ARRAY['bank_statement', 'investment_portfolio', 'income_proof'], '{"min_investment_capacity": 10000000, "min_net_worth": 50000000}'::jsonb),
  ('investor'::user_role, 'identity', ARRAY['passport', 'proof_of_address', 'professional_references'], '{"kyc_level": "enhanced"}'::jsonb),
  ('subsidiary_investor'::user_role, 'financial', ARRAY['bank_statement', 'income_proof'], '{"min_investment_capacity": 100000, "max_investment_capacity": 10000000}'::jsonb),
  ('subsidiary_investor'::user_role, 'identity', ARRAY['passport', 'proof_of_address'], '{"kyc_level": "standard"}'::jsonb),
  ('founder'::user_role, 'business', ARRAY['business_plan', 'company_registration', 'tax_documents'], '{"company_experience": "required"}'::jsonb),
  ('founder'::user_role, 'identity', ARRAY['passport', 'proof_of_address', 'professional_cv'], '{"leadership_experience": "verified"}'::jsonb),
  ('co_founder'::user_role, 'business', ARRAY['partnership_agreement', 'contribution_proof'], '{"startup_experience": "preferred"}'::jsonb),
  ('co_founder'::user_role, 'identity', ARRAY['passport', 'proof_of_address', 'professional_cv'], '{"collaboration_skills": "assessed"}'::jsonb),
  ('co_owner'::user_role, 'business', ARRAY['investment_intent', 'due_diligence_report'], '{"project_evaluation_skills": "required"}'::jsonb),
  ('co_owner'::user_role, 'identity', ARRAY['passport', 'proof_of_address'], '{"business_acumen": "verified"}'::jsonb),
  ('job_seeker'::user_role, 'identity', ARRAY['passport', 'cv'], '{"basic_verification": true}'::jsonb),
  ('freelancer'::user_role, 'professional', ARRAY['portfolio', 'skill_certificates', 'work_samples'], '{"skill_verification": "required"}'::jsonb),
  ('freelancer'::user_role, 'identity', ARRAY['passport', 'proof_of_address'], '{"freelance_readiness": "assessed"}'::jsonb),
  ('outsourcer'::user_role, 'business', ARRAY['company_registration', 'team_profiles', 'service_portfolio'], '{"team_management": "verified"}'::jsonb),
  ('outsourcer'::user_role, 'identity', ARRAY['passport', 'proof_of_address', 'business_license'], '{"service_delivery": "proven"}'::jsonb),
  ('contractor'::user_role, 'business', ARRAY['company_registration', 'insurance_docs', 'compliance_certificates'], '{"enterprise_readiness": "required"}'::jsonb),
  ('contractor'::user_role, 'identity', ARRAY['passport', 'proof_of_address', 'business_license'], '{"corporate_compliance": "verified"}'::jsonb)
ON CONFLICT (role, verification_type) DO NOTHING;

-- Create trigger for updating updated_at (only if not exists)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.triggers 
        WHERE trigger_name = 'update_role_verification_requirements_updated_at'
    ) THEN
        CREATE TRIGGER update_role_verification_requirements_updated_at
        BEFORE UPDATE ON public.role_verification_requirements
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END $$;