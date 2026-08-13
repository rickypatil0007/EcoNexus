/**
 * Supabase Database Types — EcoNexus
 *
 * Auto-generated types would normally come from Supabase CLI:
 *   npx supabase gen types typescript --local > types/database.ts
 *
 * This file provides a typed placeholder until the Supabase project
 * is connected in Phase 3. It mirrors the 09-database.md schema.
 *
 * Reference: 09-database.md (MVP tables)
 */

export type Database = {
  public: {
    Tables: {
      // ── profiles ──────────────────────────────────────────────────────────
      profiles: {
        Row: {
          id: string;
          user_id: string;
          display_name: string;
          avatar_url: string | null;
          role: "individual" | "college" | "ngo" | "csr";
          bio: string | null;
          location: string | null;
          onboarding_completed: boolean;
          green_points: number;
          streak_days: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          display_name: string;
          avatar_url?: string | null;
          role: "individual" | "college" | "ngo" | "csr";
          bio?: string | null;
          location?: string | null;
          onboarding_completed?: boolean;
          green_points?: number;
          streak_days?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };

      // ── carbon_records ────────────────────────────────────────────────────
      carbon_records: {
        Row: {
          id: string;
          user_id: string;
          total_kg_co2e: number;
          breakdown: {
            transportation: number;
            energy: number;
            food: number;
            waste: number;
            shopping: number;
            other: number;
          };
          score: number;
          month: string;
          calculated_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_kg_co2e: number;
          breakdown: {
            transportation: number;
            energy: number;
            food: number;
            waste: number;
            shopping: number;
            other: number;
          };
          score: number;
          month: string;
          calculated_at?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["carbon_records"]["Insert"]>;
      };

      // ── challenges ────────────────────────────────────────────────────────
      challenges: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          difficulty: "easy" | "medium" | "hard";
          points_reward: number;
          estimated_impact_kg: number;
          duration_days: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: string;
          difficulty: "easy" | "medium" | "hard";
          points_reward: number;
          estimated_impact_kg: number;
          duration_days: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["challenges"]["Insert"]>;
      };

      // ── user_challenges ───────────────────────────────────────────────────
      user_challenges: {
        Row: {
          id: string;
          user_id: string;
          challenge_id: string;
          status: "active" | "completed" | "abandoned";
          started_at: string;
          completed_at: string | null;
          proof_image_url: string | null;
          points_earned: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          challenge_id: string;
          status?: "active" | "completed" | "abandoned";
          started_at?: string;
          completed_at?: string | null;
          proof_image_url?: string | null;
          points_earned?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["user_challenges"]["Insert"]>;
      };

      // ── chat_history ──────────────────────────────────────────────────────
      chat_history: {
        Row: {
          id: string;
          user_id: string;
          role: "user" | "assistant";
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: "user" | "assistant";
          content: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["chat_history"]["Insert"]>;
      };
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
    Enums: {
      user_role: "individual" | "college" | "ngo" | "csr";
      challenge_difficulty: "easy" | "medium" | "hard";
      challenge_status: "active" | "completed" | "abandoned";
    };
    CompositeTypes: {
      [_ in never]: never
    };
  };
};
