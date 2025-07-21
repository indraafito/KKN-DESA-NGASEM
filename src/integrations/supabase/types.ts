export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          content: string | null
          created_at: string
          id: string
          status: string | null
          title: string
          updated_at: string
          urgent: boolean | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          status?: string | null
          title: string
          updated_at?: string
          urgent?: boolean | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          status?: string | null
          title?: string
          updated_at?: string
          urgent?: boolean | null
        }
        Relationships: []
      }
      community_programs: {
        Row: {
          created_at: string
          description: string | null
          id: string
          location: string | null
          schedule: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          schedule: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          schedule?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      facilities: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          alamat: string | null
          lokasi: string | null
          updated_at: string
        }
        Insert: {
          condition?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          alamat?: string | null
          lokasi?: string | null
          updated_at?: string
        }
        Update: {
          condition?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          alamat?: string | null
          lokasi?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      kkn_programs: {
        Row: {
          activities: string[] | null
          created_at: string
          description: string | null
          id: string
          participants: number | null
          period: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          activities?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          participants?: number | null
          period: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          activities?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          participants?: number | null
          period?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          priority: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_applications: {
        Row: {
          applicant_address: string | null
          applicant_email: string
          applicant_name: string
          applicant_phone: string
          documents: Json | null
          id: string
          notes: string | null
          service_id: string
          status: string | null
          submitted_at: string
          updated_at: string
        }
        Insert: {
          applicant_address?: string | null
          applicant_email: string
          applicant_name: string
          applicant_phone: string
          documents?: Json | null
          id?: string
          notes?: string | null
          service_id: string
          status?: string | null
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          applicant_address?: string | null
          applicant_email?: string
          applicant_name?: string
          applicant_phone?: string
          documents?: Json | null
          id?: string
          notes?: string | null
          service_id?: string
          status?: string | null
          submitted_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_applications_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          process_time: string | null
          requirements: string | null
          status: string | null
          link: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          process_time?: string | null
          requirements?: string | null
          status?: string | null
          link?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          process_time?: string | null
          requirements?: string | null
          status?: string | null
          link?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      village_achievements: {
        Row: {
          achievement_date: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          order_index: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          achievement_date?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          order_index?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          achievement_date?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          order_index?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      village_officials: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          order_index: number | null
          phone: string | null
          photo_url: string | null
          position: string
          status: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          order_index?: number | null
          phone?: string | null
          photo_url?: string | null
          position: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          order_index?: number | null
          phone?: string | null
          photo_url?: string | null
          position?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      village_profile: {
        Row: {
          description: string | null
          id: string
          kepala_desa: string | null
          maps_url: string | null
          misi: string | null
          photo_url: string | null
          updated_at: string
          video_url: string | null
          visi: string | null
          welcome_message: string | null
        }
        Insert: {
          id?: string
          kepala_desa?: string | null
          maps_url?: string | null
          misi?: string | null
          photo_url?: string | null
          updated_at?: string
          video_url?: string | null
          visi?: string | null
          welcome_message?: string | null
        }
        Update: {
          id?: string
          kepala_desa?: string | null
          latitude?: number | null
          longitude?: number | null
          maps_url?: string | null
          misi?: string | null
          photo_url?: string | null
          updated_at?: string
          video_url?: string | null
          visi?: string | null
          welcome_message?: string | null
        }
        Relationships: []
      }
      village_statistics: {
        Row: {
          color_class: string | null
          created_at: string
          icon: string | null
          id: string
          label: string
          order_index: number
          status: string
          updated_at: string
          value: string
        }
        Insert: {
          color_class?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          label: string
          order_index?: number
          status?: string
          updated_at?: string
          value: string
        }
        Update: {
          color_class?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          label?: string
          order_index?: number
          status?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
