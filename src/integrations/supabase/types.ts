export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_accounts: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          last_login: string | null
          password_hash: string
          role: Database["public"]["Enums"]["user_role"]
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password_hash: string
          role?: Database["public"]["Enums"]["user_role"]
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password_hash?: string
          role?: Database["public"]["Enums"]["user_role"]
          username?: string
        }
        Relationships: []
      }
      currency_rates: {
        Row: {
          from_currency: string
          id: string
          rate: number
          to_currency: string
          updated_at: string
        }
        Insert: {
          from_currency: string
          id?: string
          rate: number
          to_currency: string
          updated_at?: string
        }
        Update: {
          from_currency?: string
          id?: string
          rate?: number
          to_currency?: string
          updated_at?: string
        }
        Relationships: []
      }
      due_diligence_items: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          document_url: string | null
          id: string
          item_name: string
          project_id: string | null
          risk_level: string | null
          updated_at: string | null
          verification_date: string | null
          verification_status: string | null
          verified_by: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          document_url?: string | null
          id?: string
          item_name: string
          project_id?: string | null
          risk_level?: string | null
          updated_at?: string | null
          verification_date?: string | null
          verification_status?: string | null
          verified_by?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          document_url?: string | null
          id?: string
          item_name?: string
          project_id?: string | null
          risk_level?: string | null
          updated_at?: string | null
          verification_date?: string | null
          verification_status?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "due_diligence_items_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      investment_expressions: {
        Row: {
          conditions: string[] | null
          created_at: string | null
          due_diligence_status: string | null
          id: string
          investment_amount: number
          investment_terms: Json | null
          investor_id: string
          legal_documents: Json | null
          notes: string | null
          project_id: string | null
          reviewed_at: string | null
          status: string | null
          submitted_at: string | null
          updated_at: string | null
        }
        Insert: {
          conditions?: string[] | null
          created_at?: string | null
          due_diligence_status?: string | null
          id?: string
          investment_amount: number
          investment_terms?: Json | null
          investor_id: string
          legal_documents?: Json | null
          notes?: string | null
          project_id?: string | null
          reviewed_at?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
        }
        Update: {
          conditions?: string[] | null
          created_at?: string | null
          due_diligence_status?: string | null
          id?: string
          investment_amount?: number
          investment_terms?: Json | null
          investor_id?: string
          legal_documents?: Json | null
          notes?: string | null
          project_id?: string | null
          reviewed_at?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investment_expressions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      investments: {
        Row: {
          amount: number
          contract_signed: boolean | null
          created_at: string | null
          due_diligence_completed: boolean | null
          equity_percentage: number | null
          id: string
          investor_id: string | null
          notes: string | null
          project_id: string | null
          status: Database["public"]["Enums"]["investment_status"] | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          contract_signed?: boolean | null
          created_at?: string | null
          due_diligence_completed?: boolean | null
          equity_percentage?: number | null
          id?: string
          investor_id?: string | null
          notes?: string | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["investment_status"] | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          contract_signed?: boolean | null
          created_at?: string | null
          due_diligence_completed?: boolean | null
          equity_percentage?: number | null
          id?: string
          investor_id?: string | null
          notes?: string | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["investment_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      investor_preferences: {
        Row: {
          board_participation_desired: boolean | null
          created_at: string | null
          esg_requirements: boolean | null
          follow_on_capacity: boolean | null
          funding_stages: Database["public"]["Enums"]["funding_stage"][] | null
          geographic_preferences: string[] | null
          id: string
          industry_preferences:
            | Database["public"]["Enums"]["industry_category"][]
            | null
          investment_thesis: string | null
          investor_id: string
          lead_investor_capable: boolean | null
          max_investment_amount: number | null
          min_investment_amount: number | null
          min_team_experience: number | null
          min_traction_metrics: Json | null
          risk_tolerance: string | null
          sector_expertise: string[] | null
          updated_at: string | null
        }
        Insert: {
          board_participation_desired?: boolean | null
          created_at?: string | null
          esg_requirements?: boolean | null
          follow_on_capacity?: boolean | null
          funding_stages?: Database["public"]["Enums"]["funding_stage"][] | null
          geographic_preferences?: string[] | null
          id?: string
          industry_preferences?:
            | Database["public"]["Enums"]["industry_category"][]
            | null
          investment_thesis?: string | null
          investor_id: string
          lead_investor_capable?: boolean | null
          max_investment_amount?: number | null
          min_investment_amount?: number | null
          min_team_experience?: number | null
          min_traction_metrics?: Json | null
          risk_tolerance?: string | null
          sector_expertise?: string[] | null
          updated_at?: string | null
        }
        Update: {
          board_participation_desired?: boolean | null
          created_at?: string | null
          esg_requirements?: boolean | null
          follow_on_capacity?: boolean | null
          funding_stages?: Database["public"]["Enums"]["funding_stage"][] | null
          geographic_preferences?: string[] | null
          id?: string
          industry_preferences?:
            | Database["public"]["Enums"]["industry_category"][]
            | null
          investment_thesis?: string | null
          investor_id?: string
          lead_investor_capable?: boolean | null
          max_investment_amount?: number | null
          min_investment_amount?: number | null
          min_team_experience?: number | null
          min_traction_metrics?: Json | null
          risk_tolerance?: string | null
          sector_expertise?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      market_analytics: {
        Row: {
          average_deal_size: number | null
          average_time_to_close_days: number | null
          created_at: string | null
          date: string
          funding_stage: Database["public"]["Enums"]["funding_stage"] | null
          geographic_region: string | null
          id: string
          industry: Database["public"]["Enums"]["industry_category"] | null
          median_valuation: number | null
          success_rate_percentage: number | null
          total_deals: number | null
          total_funding_amount: number | null
        }
        Insert: {
          average_deal_size?: number | null
          average_time_to_close_days?: number | null
          created_at?: string | null
          date?: string
          funding_stage?: Database["public"]["Enums"]["funding_stage"] | null
          geographic_region?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_category"] | null
          median_valuation?: number | null
          success_rate_percentage?: number | null
          total_deals?: number | null
          total_funding_amount?: number | null
        }
        Update: {
          average_deal_size?: number | null
          average_time_to_close_days?: number | null
          created_at?: string | null
          date?: string
          funding_stage?: Database["public"]["Enums"]["funding_stage"] | null
          geographic_region?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_category"] | null
          median_valuation?: number | null
          success_rate_percentage?: number | null
          total_deals?: number | null
          total_funding_amount?: number | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          project_id: string | null
          read_at: string | null
          recipient_id: string | null
          sender_id: string | null
          subject: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          project_id?: string | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          subject?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          project_id?: string | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          message: string
          read_at: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message: string
          read_at?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message?: string
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      password_reset_requests: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string
          id: string
          ip_address: unknown | null
          token: string
          used_at: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          ip_address?: unknown | null
          token: string
          used_at?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          token?: string
          used_at?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "password_reset_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          currency: string | null
          id: string
          payer_id: string | null
          payment_type: string
          project_id: string | null
          recipient_id: string | null
          status: string | null
          stripe_payment_id: string | null
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          payer_id?: string | null
          payment_type: string
          project_id?: string | null
          recipient_id?: string | null
          status?: string | null
          stripe_payment_id?: string | null
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          payer_id?: string | null
          payment_type?: string
          project_id?: string | null
          recipient_id?: string | null
          status?: string | null
          stripe_payment_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      platform_statistics: {
        Row: {
          active_freelancers: number | null
          active_investors: number | null
          id: string
          successful_projects: number | null
          total_funding_raised: number | null
          total_investments: number | null
          total_projects: number | null
          total_users: number | null
          updated_at: string
        }
        Insert: {
          active_freelancers?: number | null
          active_investors?: number | null
          id?: string
          successful_projects?: number | null
          total_funding_raised?: number | null
          total_investments?: number | null
          total_projects?: number | null
          total_users?: number | null
          updated_at?: string
        }
        Update: {
          active_freelancers?: number | null
          active_investors?: number | null
          id?: string
          successful_projects?: number | null
          total_funding_raised?: number | null
          total_investments?: number | null
          total_projects?: number | null
          total_users?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      pricing_config: {
        Row: {
          created_at: string | null
          features: Json | null
          id: string
          limits: Json | null
          price_monthly: number
          role: Database["public"]["Enums"]["new_user_role"]
          tier: Database["public"]["Enums"]["subscription_plan"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          features?: Json | null
          id?: string
          limits?: Json | null
          price_monthly: number
          role: Database["public"]["Enums"]["new_user_role"]
          tier: Database["public"]["Enums"]["subscription_plan"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          features?: Json | null
          id?: string
          limits?: Json | null
          price_monthly?: number
          role?: Database["public"]["Enums"]["new_user_role"]
          tier?: Database["public"]["Enums"]["subscription_plan"]
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          added_by: string | null
          allowed_projects: string[] | null
          available_for_projects: boolean | null
          avatar_url: string | null
          bio: string | null
          company: string | null
          company_size: number | null
          created_at: string
          currency: string | null
          email: string | null
          email_verified: boolean | null
          experience_level: string | null
          first_name: string | null
          id: string
          investment_capacity: number | null
          language: string | null
          last_login: string | null
          last_name: string | null
          onboarding_completed: boolean | null
          organization_type:
            | Database["public"]["Enums"]["organization_type"]
            | null
          phone: string | null
          preferred_language: string | null
          project_restricted: boolean | null
          provider: string | null
          provider_id: string | null
          rating: number | null
          registration_method:
            | Database["public"]["Enums"]["registration_method"]
            | null
          reviews_count: number | null
          role: Database["public"]["Enums"]["new_user_role"] | null
          skills: string[] | null
          specialization: string[] | null
          subscription_expires_at: string | null
          subscription_period: number | null
          subscription_plan: string | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          total_earnings: number | null
          total_projects: number | null
          two_factor_enabled: boolean | null
          two_factor_secret: string | null
          updated_at: string
          user_id: string
          verification_level: string | null
          verification_status: string | null
          website: string | null
        }
        Insert: {
          added_by?: string | null
          allowed_projects?: string[] | null
          available_for_projects?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          company_size?: number | null
          created_at?: string
          currency?: string | null
          email?: string | null
          email_verified?: boolean | null
          experience_level?: string | null
          first_name?: string | null
          id?: string
          investment_capacity?: number | null
          language?: string | null
          last_login?: string | null
          last_name?: string | null
          onboarding_completed?: boolean | null
          organization_type?:
            | Database["public"]["Enums"]["organization_type"]
            | null
          phone?: string | null
          preferred_language?: string | null
          project_restricted?: boolean | null
          provider?: string | null
          provider_id?: string | null
          rating?: number | null
          registration_method?:
            | Database["public"]["Enums"]["registration_method"]
            | null
          reviews_count?: number | null
          role?: Database["public"]["Enums"]["new_user_role"] | null
          skills?: string[] | null
          specialization?: string[] | null
          subscription_expires_at?: string | null
          subscription_period?: number | null
          subscription_plan?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          total_earnings?: number | null
          total_projects?: number | null
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
          updated_at?: string
          user_id: string
          verification_level?: string | null
          verification_status?: string | null
          website?: string | null
        }
        Update: {
          added_by?: string | null
          allowed_projects?: string[] | null
          available_for_projects?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          company_size?: number | null
          created_at?: string
          currency?: string | null
          email?: string | null
          email_verified?: boolean | null
          experience_level?: string | null
          first_name?: string | null
          id?: string
          investment_capacity?: number | null
          language?: string | null
          last_login?: string | null
          last_name?: string | null
          onboarding_completed?: boolean | null
          organization_type?:
            | Database["public"]["Enums"]["organization_type"]
            | null
          phone?: string | null
          preferred_language?: string | null
          project_restricted?: boolean | null
          provider?: string | null
          provider_id?: string | null
          rating?: number | null
          registration_method?:
            | Database["public"]["Enums"]["registration_method"]
            | null
          reviews_count?: number | null
          role?: Database["public"]["Enums"]["new_user_role"] | null
          skills?: string[] | null
          specialization?: string[] | null
          subscription_expires_at?: string | null
          subscription_period?: number | null
          subscription_plan?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          total_earnings?: number | null
          total_projects?: number | null
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
          updated_at?: string
          user_id?: string
          verification_level?: string | null
          verification_status?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      project_applications: {
        Row: {
          created_at: string | null
          estimated_duration: number | null
          id: string
          message: string
          project_id: string | null
          proposed_budget: number | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          estimated_duration?: number | null
          id?: string
          message: string
          project_id?: string | null
          proposed_budget?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          estimated_duration?: number | null
          id?: string
          message?: string
          project_id?: string | null
          proposed_budget?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_applications_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_team_members: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          education: string[] | null
          equity_percentage: number | null
          experience_years: number | null
          id: string
          is_advisor: boolean | null
          is_founder: boolean | null
          linkedin_url: string | null
          name: string
          previous_companies: string[] | null
          project_id: string | null
          role: string
          skills: string[] | null
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          education?: string[] | null
          equity_percentage?: number | null
          experience_years?: number | null
          id?: string
          is_advisor?: boolean | null
          is_founder?: boolean | null
          linkedin_url?: string | null
          name: string
          previous_companies?: string[] | null
          project_id?: string | null
          role: string
          skills?: string[] | null
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          education?: string[] | null
          equity_percentage?: number | null
          experience_years?: number | null
          id?: string
          is_advisor?: boolean | null
          is_founder?: boolean | null
          linkedin_url?: string | null
          name?: string
          previous_companies?: string[] | null
          project_id?: string | null
          role?: string
          skills?: string[] | null
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "project_team_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          attachments: Json | null
          budget_max: number | null
          budget_min: number | null
          burn_rate: number | null
          business_model: string | null
          carbon_footprint_score: number | null
          category_id: string | null
          competitive_advantage: string | null
          created_at: string
          currency: string | null
          current_valuation: number | null
          customer_count: number | null
          deadline: string | null
          demo_url: string | null
          description: string
          equity_offered: number | null
          esg_score: number | null
          executive_summary: string | null
          favorites_count: number | null
          financial_highlights: Json | null
          funding_amount_seeking: number | null
          funding_goal: number | null
          funding_raised: number | null
          funding_stage: Database["public"]["Enums"]["funding_stage"] | null
          geographic_location: string | null
          id: string
          industry: Database["public"]["Enums"]["industry_category"] | null
          intellectual_property: string[] | null
          investment_terms: Json | null
          is_featured: boolean | null
          key_metrics: Json | null
          location: string | null
          market_size: number | null
          max_investment: number | null
          milestones: Json | null
          min_investment: number | null
          monthly_revenue: number | null
          owner_id: string
          partnerships: string[] | null
          pitch_deck_url: string | null
          previous_funding: number | null
          product_screenshots: string[] | null
          project_stage: Database["public"]["Enums"]["project_stage"] | null
          project_type: string
          projected_exit_timeline: number | null
          regulatory_status: string | null
          revenue_model: string | null
          risk_factors: string[] | null
          roi_projected: number | null
          runway_months: number | null
          skills_required: string[] | null
          social_impact_score: number | null
          status: string | null
          tags: string[] | null
          target_market: string | null
          target_roi_percentage: number | null
          team_highlight: string | null
          team_size: number | null
          title: string
          traction_metrics: Json | null
          updated_at: string
          use_of_funds: Json | null
          value_proposition: string | null
          video_pitch_url: string | null
          views_count: number | null
        }
        Insert: {
          attachments?: Json | null
          budget_max?: number | null
          budget_min?: number | null
          burn_rate?: number | null
          business_model?: string | null
          carbon_footprint_score?: number | null
          category_id?: string | null
          competitive_advantage?: string | null
          created_at?: string
          currency?: string | null
          current_valuation?: number | null
          customer_count?: number | null
          deadline?: string | null
          demo_url?: string | null
          description: string
          equity_offered?: number | null
          esg_score?: number | null
          executive_summary?: string | null
          favorites_count?: number | null
          financial_highlights?: Json | null
          funding_amount_seeking?: number | null
          funding_goal?: number | null
          funding_raised?: number | null
          funding_stage?: Database["public"]["Enums"]["funding_stage"] | null
          geographic_location?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_category"] | null
          intellectual_property?: string[] | null
          investment_terms?: Json | null
          is_featured?: boolean | null
          key_metrics?: Json | null
          location?: string | null
          market_size?: number | null
          max_investment?: number | null
          milestones?: Json | null
          min_investment?: number | null
          monthly_revenue?: number | null
          owner_id: string
          partnerships?: string[] | null
          pitch_deck_url?: string | null
          previous_funding?: number | null
          product_screenshots?: string[] | null
          project_stage?: Database["public"]["Enums"]["project_stage"] | null
          project_type: string
          projected_exit_timeline?: number | null
          regulatory_status?: string | null
          revenue_model?: string | null
          risk_factors?: string[] | null
          roi_projected?: number | null
          runway_months?: number | null
          skills_required?: string[] | null
          social_impact_score?: number | null
          status?: string | null
          tags?: string[] | null
          target_market?: string | null
          target_roi_percentage?: number | null
          team_highlight?: string | null
          team_size?: number | null
          title: string
          traction_metrics?: Json | null
          updated_at?: string
          use_of_funds?: Json | null
          value_proposition?: string | null
          video_pitch_url?: string | null
          views_count?: number | null
        }
        Update: {
          attachments?: Json | null
          budget_max?: number | null
          budget_min?: number | null
          burn_rate?: number | null
          business_model?: string | null
          carbon_footprint_score?: number | null
          category_id?: string | null
          competitive_advantage?: string | null
          created_at?: string
          currency?: string | null
          current_valuation?: number | null
          customer_count?: number | null
          deadline?: string | null
          demo_url?: string | null
          description?: string
          equity_offered?: number | null
          esg_score?: number | null
          executive_summary?: string | null
          favorites_count?: number | null
          financial_highlights?: Json | null
          funding_amount_seeking?: number | null
          funding_goal?: number | null
          funding_raised?: number | null
          funding_stage?: Database["public"]["Enums"]["funding_stage"] | null
          geographic_location?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_category"] | null
          intellectual_property?: string[] | null
          investment_terms?: Json | null
          is_featured?: boolean | null
          key_metrics?: Json | null
          location?: string | null
          market_size?: number | null
          max_investment?: number | null
          milestones?: Json | null
          min_investment?: number | null
          monthly_revenue?: number | null
          owner_id?: string
          partnerships?: string[] | null
          pitch_deck_url?: string | null
          previous_funding?: number | null
          product_screenshots?: string[] | null
          project_stage?: Database["public"]["Enums"]["project_stage"] | null
          project_type?: string
          projected_exit_timeline?: number | null
          regulatory_status?: string | null
          revenue_model?: string | null
          risk_factors?: string[] | null
          roi_projected?: number | null
          runway_months?: number | null
          skills_required?: string[] | null
          social_impact_score?: number | null
          status?: string | null
          tags?: string[] | null
          target_market?: string | null
          target_roi_percentage?: number | null
          team_highlight?: string | null
          team_size?: number | null
          title?: string
          traction_metrics?: Json | null
          updated_at?: string
          use_of_funds?: Json | null
          value_proposition?: string | null
          video_pitch_url?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "skill_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          project_id: string | null
          rating: number | null
          reviewed_id: string | null
          reviewer_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          project_id?: string | null
          rating?: number | null
          reviewed_id?: string | null
          reviewer_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          project_id?: string | null
          rating?: number | null
          reviewed_id?: string | null
          reviewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "skills_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "skill_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_api_keys: {
        Row: {
          api_key: string
          created_at: string | null
          id: string
          is_active: boolean | null
          key_name: string
          last_used: string | null
          model_preference: string | null
          provider: string
          user_id: string | null
        }
        Insert: {
          api_key: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          key_name: string
          last_used?: string | null
          model_preference?: string | null
          provider: string
          user_id?: string | null
        }
        Update: {
          api_key?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          key_name?: string
          last_used?: string | null
          model_preference?: string | null
          provider?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          is_current: boolean | null
          role: Database["public"]["Enums"]["new_user_role"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_current?: boolean | null
          role?: Database["public"]["Enums"]["new_user_role"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_current?: boolean | null
          role?: Database["public"]["Enums"]["new_user_role"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authenticate_admin: {
        Args: { p_password: string; p_username: string }
        Returns: {
          last_login: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
          username: string
        }[]
      }
      calculate_investment_match_score: {
        Args: { p_investor_id: string; p_project_id: string }
        Returns: number
      }
      clean_expired_password_reset_tokens: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["new_user_role"]
      }
      get_platform_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_user_api_config: {
        Args: { p_user_id: string }
        Returns: {
          api_key: string
          model: string
          provider: string
        }[]
      }
    }
    Enums: {
      funding_stage:
        | "pre_seed"
        | "seed"
        | "series_a"
        | "series_b"
        | "series_c"
        | "series_d"
        | "ipo"
      industry_category:
        | "fintech"
        | "healthtech"
        | "edtech"
        | "greentech"
        | "e_commerce"
        | "saas"
        | "marketplace"
        | "ai_ml"
        | "blockchain"
        | "iot"
        | "gaming"
        | "media"
        | "real_estate"
        | "agriculture"
        | "logistics"
        | "cybersecurity"
        | "biotech"
        | "aerospace"
        | "automotive"
        | "retail"
      investment_status: "pending" | "approved" | "rejected" | "funded"
      new_user_role:
        | "investor"
        | "subsidiary_investor"
        | "founder"
        | "co_founder"
        | "co_owner"
        | "job_seeker"
        | "freelancer"
        | "outsourcer"
        | "contractor"
      organization_type: "individual" | "company" | "fund" | "organization"
      project_stage: "idea" | "mvp" | "traction" | "scale" | "exit"
      project_status:
        | "draft"
        | "active"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "funded"
      registration_method:
        | "standard_form"
        | "invitation_link"
        | "direct_addition"
      subscription_plan: "start" | "profi" | "premium"
      user_role:
        | "freelancer"
        | "outsourcer"
        | "founder"
        | "investor"
        | "superadmin"
        | "contractor"
        | "project_admin"
        | "project_employee"
        | "system_admin"
        | "subsidiary_investor"
        | "co_founder"
        | "co_owner"
        | "job_seeker"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      funding_stage: [
        "pre_seed",
        "seed",
        "series_a",
        "series_b",
        "series_c",
        "series_d",
        "ipo",
      ],
      industry_category: [
        "fintech",
        "healthtech",
        "edtech",
        "greentech",
        "e_commerce",
        "saas",
        "marketplace",
        "ai_ml",
        "blockchain",
        "iot",
        "gaming",
        "media",
        "real_estate",
        "agriculture",
        "logistics",
        "cybersecurity",
        "biotech",
        "aerospace",
        "automotive",
        "retail",
      ],
      investment_status: ["pending", "approved", "rejected", "funded"],
      new_user_role: [
        "investor",
        "subsidiary_investor",
        "founder",
        "co_founder",
        "co_owner",
        "job_seeker",
        "freelancer",
        "outsourcer",
        "contractor",
      ],
      organization_type: ["individual", "company", "fund", "organization"],
      project_stage: ["idea", "mvp", "traction", "scale", "exit"],
      project_status: [
        "draft",
        "active",
        "in_progress",
        "completed",
        "cancelled",
        "funded",
      ],
      registration_method: [
        "standard_form",
        "invitation_link",
        "direct_addition",
      ],
      subscription_plan: ["start", "profi", "premium"],
      user_role: [
        "freelancer",
        "outsourcer",
        "founder",
        "investor",
        "superadmin",
        "contractor",
        "project_admin",
        "project_employee",
        "system_admin",
        "subsidiary_investor",
        "co_founder",
        "co_owner",
        "job_seeker",
      ],
    },
  },
} as const
