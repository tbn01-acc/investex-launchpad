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
    PostgrestVersion: "13.0.5"
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
      bi_metrics: {
        Row: {
          created_at: string | null
          date: string | null
          id: string
          metric_name: string
          project_id: string
          value: number
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          id?: string
          metric_name: string
          project_id: string
          value: number
        }
        Update: {
          created_at?: string | null
          date?: string | null
          id?: string
          metric_name?: string
          project_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "bi_metrics_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      bi_reports: {
        Row: {
          config: Json | null
          created_at: string | null
          created_by: string
          id: string
          name: string
          project_id: string
          recipients: string[] | null
          schedule: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          created_by: string
          id?: string
          name: string
          project_id: string
          recipients?: string[] | null
          schedule?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          created_by?: string
          id?: string
          name?: string
          project_id?: string
          recipients?: string[] | null
          schedule?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bi_reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      bi_snapshots: {
        Row: {
          id: string
          project_id: string
          snapshot_data: Json | null
          snapshot_date: string | null
        }
        Insert: {
          id?: string
          project_id: string
          snapshot_data?: Json | null
          snapshot_date?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          snapshot_data?: Json | null
          snapshot_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bi_snapshots_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_contacts: {
        Row: {
          company: string | null
          created_at: string | null
          created_by: string
          email: string | null
          id: string
          name: string
          phone: string | null
          project_id: string
          tags: string[] | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          created_by: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          project_id: string
          tags?: string[] | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          created_by?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          project_id?: string
          tags?: string[] | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_contacts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_deals: {
        Row: {
          amount: number | null
          contact_id: string | null
          created_at: string | null
          created_by: string
          currency: string | null
          expected_close_date: string | null
          id: string
          pipeline_id: string | null
          probability: number | null
          project_id: string
          stage: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          contact_id?: string | null
          created_at?: string | null
          created_by: string
          currency?: string | null
          expected_close_date?: string | null
          id?: string
          pipeline_id?: string | null
          probability?: number | null
          project_id: string
          stage: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string
          currency?: string | null
          expected_close_date?: string | null
          id?: string
          pipeline_id?: string | null
          probability?: number | null
          project_id?: string
          stage?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "crm_pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_interactions: {
        Row: {
          contact_id: string | null
          created_at: string | null
          created_by: string
          deal_id: string | null
          description: string
          id: string
          interaction_date: string | null
          type: string | null
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          created_by: string
          deal_id?: string | null
          description: string
          id?: string
          interaction_date?: string | null
          type?: string | null
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          created_by?: string
          deal_id?: string | null
          description?: string
          id?: string
          interaction_date?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_interactions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_interactions_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_pipelines: {
        Row: {
          created_at: string | null
          id: string
          name: string
          project_id: string
          stages: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          project_id: string
          stages?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          project_id?: string
          stages?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_pipelines_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
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
      device_fingerprints: {
        Row: {
          authorized_at: string | null
          browser_info: string | null
          created_at: string
          device_info: Json | null
          fingerprint_hash: string
          id: string
          ip_address: string | null
          is_authorized: boolean
          last_seen_at: string
          user_id: string
        }
        Insert: {
          authorized_at?: string | null
          browser_info?: string | null
          created_at?: string
          device_info?: Json | null
          fingerprint_hash: string
          id?: string
          ip_address?: string | null
          is_authorized?: boolean
          last_seen_at?: string
          user_id: string
        }
        Update: {
          authorized_at?: string | null
          browser_info?: string | null
          created_at?: string
          device_info?: Json | null
          fingerprint_hash?: string
          id?: string
          ip_address?: string | null
          is_authorized?: boolean
          last_seen_at?: string
          user_id?: string
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
      favorites: {
        Row: {
          created_at: string
          id: string
          item_id: string
          item_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          item_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          item_type?: string
          user_id?: string
        }
        Relationships: []
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
      kb_article_versions: {
        Row: {
          article_id: string
          content: string | null
          created_at: string | null
          created_by: string
          id: string
          version: number
        }
        Insert: {
          article_id: string
          content?: string | null
          created_at?: string | null
          created_by: string
          id?: string
          version: number
        }
        Update: {
          article_id?: string
          content?: string | null
          created_at?: string | null
          created_by?: string
          id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "kb_article_versions_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "kb_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      kb_articles: {
        Row: {
          author_id: string
          category_id: string | null
          content: string | null
          created_at: string | null
          id: string
          project_id: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          author_id: string
          category_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          project_id: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          author_id?: string
          category_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          project_id?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "kb_articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "kb_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kb_articles_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      kb_categories: {
        Row: {
          created_at: string | null
          icon: string | null
          id: string
          name: string
          parent_id: string | null
          project_id: string
        }
        Insert: {
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
          parent_id?: string | null
          project_id: string
        }
        Update: {
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kb_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "kb_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kb_categories_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      kb_files: {
        Row: {
          created_at: string | null
          file_size: number | null
          file_type: string | null
          file_url: string
          folder_id: string | null
          id: string
          name: string
          project_id: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url: string
          folder_id?: string | null
          id?: string
          name: string
          project_id: string
          uploaded_by: string
        }
        Update: {
          created_at?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          folder_id?: string | null
          id?: string
          name?: string
          project_id?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "kb_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
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
      notes: {
        Row: {
          content: string | null
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
      onboarding_checklists: {
        Row: {
          created_at: string | null
          id: string
          project_id: string
          role: string
          tasks: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          project_id: string
          role: string
          tasks?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          project_id?: string
          role?: string
          tasks?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_checklists_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      password_reset_requests: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string
          id: string
          ip_address: unknown
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
          ip_address?: unknown
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
          ip_address?: unknown
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
          {
            foreignKeyName: "password_reset_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
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
      platform_api_configs: {
        Row: {
          config_key: string
          config_value: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          updated_at: string
        }
        Insert: {
          config_key: string
          config_value: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          config_key?: string
          config_value?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
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
      platform_staff: {
        Row: {
          assigned_by: string
          created_at: string
          id: string
          is_active: boolean
          permissions: Json
          staff_role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_by: string
          created_at?: string
          id?: string
          is_active?: boolean
          permissions?: Json
          staff_role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_by?: string
          created_at?: string
          id?: string
          is_active?: boolean
          permissions?: Json
          staff_role?: string
          updated_at?: string
          user_id?: string
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
          counterparty_contacts: Json
          created_at: string
          currency: string | null
          documents_status: string | null
          email: string | null
          email_verified: boolean | null
          experience_level: string | null
          financial_verification: Json | null
          first_name: string | null
          id: string
          investment_capacity: number | null
          investment_range_verified: boolean | null
          kyc_status: string | null
          language: string | null
          last_login: string | null
          last_name: string | null
          onboarding_completed: boolean | null
          onboarding_completed_at: string | null
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
          role_specific_data: Json | null
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
          verification_documents: Json | null
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
          counterparty_contacts?: Json
          created_at?: string
          currency?: string | null
          documents_status?: string | null
          email?: string | null
          email_verified?: boolean | null
          experience_level?: string | null
          financial_verification?: Json | null
          first_name?: string | null
          id?: string
          investment_capacity?: number | null
          investment_range_verified?: boolean | null
          kyc_status?: string | null
          language?: string | null
          last_login?: string | null
          last_name?: string | null
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
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
          role_specific_data?: Json | null
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
          verification_documents?: Json | null
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
          counterparty_contacts?: Json
          created_at?: string
          currency?: string | null
          documents_status?: string | null
          email?: string | null
          email_verified?: boolean | null
          experience_level?: string | null
          financial_verification?: Json | null
          first_name?: string | null
          id?: string
          investment_capacity?: number | null
          investment_range_verified?: boolean | null
          kyc_status?: string | null
          language?: string | null
          last_login?: string | null
          last_name?: string | null
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
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
          role_specific_data?: Json | null
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
          verification_documents?: Json | null
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
          {
            foreignKeyName: "profiles_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "public_profiles"
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
      project_moderation: {
        Row: {
          action: string
          comment: string | null
          created_at: string
          id: string
          level_changed_to: string | null
          moderator_id: string
          new_status: string | null
          previous_status: string | null
          project_id: string
        }
        Insert: {
          action: string
          comment?: string | null
          created_at?: string
          id?: string
          level_changed_to?: string | null
          moderator_id: string
          new_status?: string | null
          previous_status?: string | null
          project_id: string
        }
        Update: {
          action?: string
          comment?: string | null
          created_at?: string
          id?: string
          level_changed_to?: string | null
          moderator_id?: string
          new_status?: string | null
          previous_status?: string | null
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_moderation_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_permissions: {
        Row: {
          can_manage_crm: boolean | null
          can_manage_hr: boolean | null
          can_manage_kb: boolean | null
          can_manage_pm: boolean | null
          can_view_bi: boolean | null
          created_at: string | null
          id: string
          project_id: string
          user_id: string
        }
        Insert: {
          can_manage_crm?: boolean | null
          can_manage_hr?: boolean | null
          can_manage_kb?: boolean | null
          can_manage_pm?: boolean | null
          can_view_bi?: boolean | null
          created_at?: string | null
          id?: string
          project_id: string
          user_id: string
        }
        Update: {
          can_manage_crm?: boolean | null
          can_manage_hr?: boolean | null
          can_manage_kb?: boolean | null
          can_manage_pm?: boolean | null
          can_view_bi?: boolean | null
          created_at?: string | null
          id?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_permissions_project_id_fkey"
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
      project_vacancies: {
        Row: {
          created_at: string | null
          created_by: string
          currency: string | null
          description: string | null
          id: string
          project_id: string
          requirements: string[] | null
          salary_range_max: number | null
          salary_range_min: number | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          currency?: string | null
          description?: string | null
          id?: string
          project_id: string
          requirements?: string[] | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          currency?: string | null
          description?: string | null
          id?: string
          project_id?: string
          requirements?: string[] | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_vacancies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          archived_at: string | null
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
          gold_fund_added_at: string | null
          gold_fund_added_by: string | null
          id: string
          industry: Database["public"]["Enums"]["industry_category"] | null
          intellectual_property: string[] | null
          investment_terms: Json | null
          is_featured: boolean | null
          is_pitch: boolean | null
          is_sandbox: boolean | null
          key_metrics: Json | null
          location: string | null
          market_size: number | null
          max_investment: number | null
          milestones: Json | null
          min_investment: number | null
          moderation_status: string | null
          monthly_revenue: number | null
          owner_id: string
          partnerships: string[] | null
          pitch_deck_url: string | null
          previous_funding: number | null
          product_screenshots: string[] | null
          project_category: Database["public"]["Enums"]["project_category_type"]
          project_stage: Database["public"]["Enums"]["project_stage"] | null
          project_type: string
          projected_exit_timeline: number | null
          regulatory_status: string | null
          revenue_model: string | null
          risk_factors: string[] | null
          roi_projected: number | null
          runway_months: number | null
          sandbox_approved_at: string | null
          sandbox_approved_by: string | null
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
          approved_at?: string | null
          approved_by?: string | null
          archived_at?: string | null
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
          gold_fund_added_at?: string | null
          gold_fund_added_by?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_category"] | null
          intellectual_property?: string[] | null
          investment_terms?: Json | null
          is_featured?: boolean | null
          is_pitch?: boolean | null
          is_sandbox?: boolean | null
          key_metrics?: Json | null
          location?: string | null
          market_size?: number | null
          max_investment?: number | null
          milestones?: Json | null
          min_investment?: number | null
          moderation_status?: string | null
          monthly_revenue?: number | null
          owner_id: string
          partnerships?: string[] | null
          pitch_deck_url?: string | null
          previous_funding?: number | null
          product_screenshots?: string[] | null
          project_category?: Database["public"]["Enums"]["project_category_type"]
          project_stage?: Database["public"]["Enums"]["project_stage"] | null
          project_type: string
          projected_exit_timeline?: number | null
          regulatory_status?: string | null
          revenue_model?: string | null
          risk_factors?: string[] | null
          roi_projected?: number | null
          runway_months?: number | null
          sandbox_approved_at?: string | null
          sandbox_approved_by?: string | null
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
          approved_at?: string | null
          approved_by?: string | null
          archived_at?: string | null
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
          gold_fund_added_at?: string | null
          gold_fund_added_by?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_category"] | null
          intellectual_property?: string[] | null
          investment_terms?: Json | null
          is_featured?: boolean | null
          is_pitch?: boolean | null
          is_sandbox?: boolean | null
          key_metrics?: Json | null
          location?: string | null
          market_size?: number | null
          max_investment?: number | null
          milestones?: Json | null
          min_investment?: number | null
          moderation_status?: string | null
          monthly_revenue?: number | null
          owner_id?: string
          partnerships?: string[] | null
          pitch_deck_url?: string | null
          previous_funding?: number | null
          product_screenshots?: string[] | null
          project_category?: Database["public"]["Enums"]["project_category_type"]
          project_stage?: Database["public"]["Enums"]["project_stage"] | null
          project_type?: string
          projected_exit_timeline?: number | null
          regulatory_status?: string | null
          revenue_model?: string | null
          risk_factors?: string[] | null
          roi_projected?: number | null
          runway_months?: number | null
          sandbox_approved_at?: string | null
          sandbox_approved_by?: string | null
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
            foreignKeyName: "projects_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "projects_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["user_id"]
          },
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
      role_verification_requirements: {
        Row: {
          created_at: string | null
          id: string
          required_documents: string[] | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          verification_criteria: Json | null
          verification_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          required_documents?: string[] | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          verification_criteria?: Json | null
          verification_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          required_documents?: string[] | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          verification_criteria?: Json | null
          verification_type?: string
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown
          new_value: Json | null
          old_value: Json | null
          target_id: string | null
          target_table: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown
          new_value?: Json | null
          old_value?: Json | null
          target_id?: string | null
          target_table: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown
          new_value?: Json | null
          old_value?: Json | null
          target_id?: string | null
          target_table?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
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
      superadmin_audit_log: {
        Row: {
          action: string
          admin_id: string
          created_at: string
          details: Json | null
          id: string
          target_id: string | null
          target_type: string
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string
          details?: Json | null
          id?: string
          target_id?: string | null
          target_type: string
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          target_id?: string | null
          target_type?: string
        }
        Relationships: []
      }
      task_attachments: {
        Row: {
          created_at: string | null
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          task_id: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          task_id: string
          uploaded_by: string
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          task_id?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_attachments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          task_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          task_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_comments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_dependencies: {
        Row: {
          created_at: string | null
          depends_on_task_id: string
          id: string
          task_id: string
        }
        Insert: {
          created_at?: string | null
          depends_on_task_id: string
          id?: string
          task_id: string
        }
        Update: {
          created_at?: string | null
          depends_on_task_id?: string
          id?: string
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_dependencies_depends_on_task_id_fkey"
            columns: ["depends_on_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_dependencies_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          actual_hours: number | null
          assignee_id: string | null
          created_at: string | null
          created_by: string
          deadline: string | null
          description: string | null
          estimated_hours: number | null
          id: string
          priority: string | null
          project_id: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          actual_hours?: number | null
          assignee_id?: string | null
          created_at?: string | null
          created_by: string
          deadline?: string | null
          description?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: string | null
          project_id: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          actual_hours?: number | null
          assignee_id?: string | null
          created_at?: string | null
          created_by?: string
          deadline?: string | null
          description?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: string | null
          project_id?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      team_performance_metrics: {
        Row: {
          created_at: string | null
          id: string
          metrics: Json | null
          period_end: string
          period_start: string
          project_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metrics?: Json | null
          period_end: string
          period_start: string
          project_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metrics?: Json | null
          period_end?: string
          period_start?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_performance_metrics_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
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
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          expires_at: string
          fingerprint_id: string
          id: string
          is_active: boolean
          last_activity_at: string
          session_token: string
          started_at: string
          user_id: string
        }
        Insert: {
          expires_at?: string
          fingerprint_id: string
          id?: string
          is_active?: boolean
          last_activity_at?: string
          session_token: string
          started_at?: string
          user_id: string
        }
        Update: {
          expires_at?: string
          fingerprint_id?: string
          id?: string
          is_active?: boolean
          last_activity_at?: string
          session_token?: string
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_fingerprint_id_fkey"
            columns: ["fingerprint_id"]
            isOneToOne: false
            referencedRelation: "device_fingerprints"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      public_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string | null
          experience_level: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          skills: string[] | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          experience_level?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          skills?: string[] | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          experience_level?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          skills?: string[] | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_project_to_gold_fund: {
        Args: { p_admin_id: string; p_project_id: string }
        Returns: undefined
      }
      approve_project_to_sandbox: {
        Args: { p_admin_id: string; p_project_id: string }
        Returns: undefined
      }
      archive_project: {
        Args: { p_admin_id: string; p_project_id: string }
        Returns: undefined
      }
      authenticate_admin: {
        Args: { p_password: string; p_username: string }
        Returns: {
          last_login: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
          username: string
        }[]
      }
      authorize_device: { Args: { p_fingerprint_id: string }; Returns: Json }
      calculate_investment_match_score: {
        Args: { p_investor_id: string; p_project_id: string }
        Returns: number
      }
      check_and_register_device: {
        Args: {
          p_browser_info: string
          p_device_info: Json
          p_fingerprint_hash: string
          p_ip_address: string
        }
        Returns: Json
      }
      clean_expired_password_reset_tokens: { Args: never; Returns: undefined }
      get_current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["new_user_role"]
      }
      get_max_devices_for_tariff: {
        Args: { p_user_id: string }
        Returns: number
      }
      get_platform_stats: { Args: never; Returns: Json }
      get_platform_stats_secured: {
        Args: never
        Returns: {
          active_freelancers: number
          active_investors: number
          successful_projects: number
          total_funding_raised: number
          total_investments: number
          total_projects: number
          total_users: number
        }[]
      }
      get_user_api_config: {
        Args: { p_user_id: string }
        Returns: {
          api_key: string
          model: string
          provider: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["new_user_role"]
          _user_id: string
        }
        Returns: boolean
      }
      revoke_device_authorization: {
        Args: { p_fingerprint_id: string }
        Returns: Json
      }
      switch_user_role: {
        Args: { p_role: Database["public"]["Enums"]["new_user_role"] }
        Returns: undefined
      }
      terminate_session: { Args: { p_session_id: string }; Returns: Json }
      update_platform_statistics: { Args: never; Returns: undefined }
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
        | "expert"
        | "consultant"
        | "administrator"
        | "employee"
        | "ambassador"
        | "partner"
        | "blogger"
        | "co_investor"
        | "superadmin"
        | "franchiser"
        | "co_partner"
        | "franchisee"
      organization_type: "individual" | "company" | "fund" | "organization"
      project_category_type: "active" | "sandbox" | "gold_fund" | "archived"
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
        | "collective_investor"
        | "partner"
        | "expert"
        | "consultant"
        | "employee"
        | "affiliate"
        | "ambassador"
        | "influencer"
        | "blogger"
        | "co_investor"
        | "administrator"
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
        "expert",
        "consultant",
        "administrator",
        "employee",
        "ambassador",
        "partner",
        "blogger",
        "co_investor",
        "superadmin",
        "franchiser",
        "co_partner",
        "franchisee",
      ],
      organization_type: ["individual", "company", "fund", "organization"],
      project_category_type: ["active", "sandbox", "gold_fund", "archived"],
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
        "collective_investor",
        "partner",
        "expert",
        "consultant",
        "employee",
        "affiliate",
        "ambassador",
        "influencer",
        "blogger",
        "co_investor",
        "administrator",
      ],
    },
  },
} as const
