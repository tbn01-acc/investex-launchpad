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
      profiles: {
        Row: {
          added_by: string | null
          allowed_projects: string[] | null
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string
          currency: string | null
          email: string | null
          email_verified: boolean | null
          experience_level: string | null
          first_name: string | null
          id: string
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
          role: Database["public"]["Enums"]["user_role"]
          skills: string[] | null
          subscription_expires_at: string | null
          subscription_plan: string | null
          total_earnings: number | null
          total_projects: number | null
          two_factor_enabled: boolean | null
          two_factor_secret: string | null
          updated_at: string
          user_id: string
          verification_status: string | null
          website: string | null
        }
        Insert: {
          added_by?: string | null
          allowed_projects?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          currency?: string | null
          email?: string | null
          email_verified?: boolean | null
          experience_level?: string | null
          first_name?: string | null
          id?: string
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
          role?: Database["public"]["Enums"]["user_role"]
          skills?: string[] | null
          subscription_expires_at?: string | null
          subscription_plan?: string | null
          total_earnings?: number | null
          total_projects?: number | null
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
          updated_at?: string
          user_id: string
          verification_status?: string | null
          website?: string | null
        }
        Update: {
          added_by?: string | null
          allowed_projects?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          currency?: string | null
          email?: string | null
          email_verified?: boolean | null
          experience_level?: string | null
          first_name?: string | null
          id?: string
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
          role?: Database["public"]["Enums"]["user_role"]
          skills?: string[] | null
          subscription_expires_at?: string | null
          subscription_plan?: string | null
          total_earnings?: number | null
          total_projects?: number | null
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
          updated_at?: string
          user_id?: string
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
      projects: {
        Row: {
          attachments: Json | null
          budget_max: number | null
          budget_min: number | null
          category_id: string | null
          created_at: string
          currency: string | null
          deadline: string | null
          description: string
          equity_offered: number | null
          favorites_count: number | null
          funding_goal: number | null
          funding_raised: number | null
          id: string
          location: string | null
          milestones: Json | null
          owner_id: string
          project_type: string
          roi_projected: number | null
          skills_required: string[] | null
          status: string | null
          tags: string[] | null
          team_size: number | null
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          attachments?: Json | null
          budget_max?: number | null
          budget_min?: number | null
          category_id?: string | null
          created_at?: string
          currency?: string | null
          deadline?: string | null
          description: string
          equity_offered?: number | null
          favorites_count?: number | null
          funding_goal?: number | null
          funding_raised?: number | null
          id?: string
          location?: string | null
          milestones?: Json | null
          owner_id: string
          project_type: string
          roi_projected?: number | null
          skills_required?: string[] | null
          status?: string | null
          tags?: string[] | null
          team_size?: number | null
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          attachments?: Json | null
          budget_max?: number | null
          budget_min?: number | null
          category_id?: string | null
          created_at?: string
          currency?: string | null
          deadline?: string | null
          description?: string
          equity_offered?: number | null
          favorites_count?: number | null
          funding_goal?: number | null
          funding_raised?: number | null
          id?: string
          location?: string | null
          milestones?: Json | null
          owner_id?: string
          project_type?: string
          roi_projected?: number | null
          skills_required?: string[] | null
          status?: string | null
          tags?: string[] | null
          team_size?: number | null
          title?: string
          updated_at?: string
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
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_current?: boolean | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_current?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
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
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
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
      investment_status: "pending" | "approved" | "rejected" | "funded"
      organization_type: "individual" | "company" | "fund" | "organization"
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
      investment_status: ["pending", "approved", "rejected", "funded"],
      organization_type: ["individual", "company", "fund", "organization"],
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
      ],
    },
  },
} as const
