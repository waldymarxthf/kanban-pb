export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      columns: {
        Row: {
          id: number;
          position: number;
          title: string;
          user_id: string;
        };
        Insert: {
          id?: number;
          position: number;
          title: string;
          user_id: string;
        };
        Update: {
          id?: number;
          position?: number;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "columns_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      tasks: {
        Row: {
          column_id: number | null;
          id: number;
          position: number;
          priority: string;
          title: string | null;
        };
        Insert: {
          column_id?: number | null;
          id?: number;
          position: number;
          priority?: string;
          title?: string | null;
        };
        Update: {
          column_id?: number | null;
          id?: number;
          position?: number;
          priority?: string;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_column_id_fkey";
            columns: ["column_id"];
            referencedRelation: "columns";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
