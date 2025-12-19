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
      advice_types: {
        Row: {
          created_at: string | null
          id: string
          type_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          type_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          type_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      analytics_metrics: {
        Row: {
          category_id: string | null
          country_id: string | null
          created_at: string | null
          id: string
          metric_key: string
          metric_type: string
          recorded_at: string
          value: number
        }
        Insert: {
          category_id?: string | null
          country_id?: string | null
          created_at?: string | null
          id?: string
          metric_key: string
          metric_type: string
          recorded_at?: string
          value: number
        }
        Update: {
          category_id?: string | null
          country_id?: string | null
          created_at?: string | null
          id?: string
          metric_key?: string
          metric_type?: string
          recorded_at?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "analytics_metrics_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_metrics_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      archives: {
        Row: {
          created_at: string | null
          extracted_text: string | null
          file_path: string | null
          file_type: string | null
          id: string
          model_id: string
          model_type: string
          number: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          extracted_text?: string | null
          file_path?: string | null
          file_type?: string | null
          id?: string
          model_id: string
          model_type: string
          number?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          extracted_text?: string | null
          file_path?: string | null
          file_type?: string | null
          id?: string
          model_id?: string
          model_type?: string
          number?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          code: string
          color: string | null
          created_at: string | null
          id: string
          name_ar: string
          name_en: string
        }
        Insert: {
          code: string
          color?: string | null
          created_at?: string | null
          id?: string
          name_ar: string
          name_en: string
        }
        Update: {
          code?: string
          color?: string | null
          created_at?: string | null
          id?: string
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      contract_categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contracts: {
        Row: {
          contract_category_id: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          start_date: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
          value: number | null
        }
        Insert: {
          contract_category_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
          value?: number | null
        }
        Update: {
          contract_category_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_contract_category_id_fkey"
            columns: ["contract_category_id"]
            isOneToOne: false
            referencedRelation: "contract_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          created_at: string | null
          id: string
          iso2: string
          iso3: string
          lat: number | null
          lon: number | null
          name_ar: string
          name_en: string
          region_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          iso2: string
          iso3: string
          lat?: number | null
          lon?: number | null
          name_ar: string
          name_en: string
          region_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          iso2?: string
          iso3?: string
          lat?: number | null
          lon?: number | null
          name_ar?: string
          name_en?: string
          region_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "countries_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      investigation_action_types: {
        Row: {
          action_name: string
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          action_name: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          action_name?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      investigation_actions: {
        Row: {
          action_date: string | null
          created_at: string | null
          id: string
          investigation_action_type_id: string | null
          investigation_id: string
          notes: string | null
          updated_at: string | null
        }
        Insert: {
          action_date?: string | null
          created_at?: string | null
          id?: string
          investigation_action_type_id?: string | null
          investigation_id: string
          notes?: string | null
          updated_at?: string | null
        }
        Update: {
          action_date?: string | null
          created_at?: string | null
          id?: string
          investigation_action_type_id?: string | null
          investigation_id?: string
          notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investigation_actions_investigation_action_type_id_fkey"
            columns: ["investigation_action_type_id"]
            isOneToOne: false
            referencedRelation: "investigation_action_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investigation_actions_investigation_id_fkey"
            columns: ["investigation_id"]
            isOneToOne: false
            referencedRelation: "investigations"
            referencedColumns: ["id"]
          },
        ]
      }
      investigations: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      legal_advices: {
        Row: {
          advice_type_id: string | null
          content: string | null
          created_at: string | null
          id: string
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          advice_type_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          advice_type_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "legal_advices_advice_type_id_fkey"
            columns: ["advice_type_id"]
            isOneToOne: false
            referencedRelation: "advice_types"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_cases: {
        Row: {
          category_id: string | null
          closed_at: string | null
          country_id: string | null
          created_at: string | null
          description: string | null
          id: string
          priority: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
          value: number | null
        }
        Insert: {
          category_id?: string | null
          closed_at?: string | null
          country_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
          value?: number | null
        }
        Update: {
          category_id?: string | null
          closed_at?: string | null
          country_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "legal_cases_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "legal_cases_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      litigation_action_types: {
        Row: {
          action_name: string
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          action_name: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          action_name?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      litigation_actions: {
        Row: {
          action_date: string | null
          created_at: string | null
          id: string
          litigation_action_type_id: string | null
          litigation_id: string
          notes: string | null
          updated_at: string | null
        }
        Insert: {
          action_date?: string | null
          created_at?: string | null
          id?: string
          litigation_action_type_id?: string | null
          litigation_id: string
          notes?: string | null
          updated_at?: string | null
        }
        Update: {
          action_date?: string | null
          created_at?: string | null
          id?: string
          litigation_action_type_id?: string | null
          litigation_id?: string
          notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "litigation_actions_litigation_action_type_id_fkey"
            columns: ["litigation_action_type_id"]
            isOneToOne: false
            referencedRelation: "litigation_action_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "litigation_actions_litigation_id_fkey"
            columns: ["litigation_id"]
            isOneToOne: false
            referencedRelation: "litigations"
            referencedColumns: ["id"]
          },
        ]
      }
      litigations: {
        Row: {
          case_number: string | null
          court_name: string | null
          created_at: string | null
          description: string | null
          filed_date: string | null
          id: string
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          case_number?: string | null
          court_name?: string | null
          created_at?: string | null
          description?: string | null
          filed_date?: string | null
          id?: string
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          case_number?: string | null
          court_name?: string | null
          created_at?: string | null
          description?: string | null
          filed_date?: string | null
          id?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      regions: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name_ar: string
          name_en: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          name_ar: string
          name_en: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      signals: {
        Row: {
          country_id: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string | null
          severity: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          country_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          severity?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          country_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          severity?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "signals_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
