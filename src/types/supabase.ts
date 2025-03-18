export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string | null
          avatar_url: string | null
          role: 'user' | 'admin'
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          stripe_customer_id?: string | null
        }
      }
      subscriptions: {
        Row: {
          id: string
          created_at: string
          user_id: string
          status: 'trialing' | 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'unpaid'
          price_id: string
          quantity: number
          cancel_at_period_end: boolean
          current_period_start: string
          current_period_end: string
          ended_at: string | null
          cancel_at: string | null
          canceled_at: string | null
          trial_start: string | null
          trial_end: string | null
        }
        Insert: {
          id: string
          created_at?: string
          user_id: string
          status: 'trialing' | 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'unpaid'
          price_id: string
          quantity?: number
          cancel_at_period_end?: boolean
          current_period_start: string
          current_period_end: string
          ended_at?: string | null
          cancel_at?: string | null
          canceled_at?: string | null
          trial_start?: string | null
          trial_end?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          status?: 'trialing' | 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'unpaid'
          price_id?: string
          quantity?: number
          cancel_at_period_end?: boolean
          current_period_start?: string
          current_period_end?: string
          ended_at?: string | null
          cancel_at?: string | null
          canceled_at?: string | null
          trial_start?: string | null
          trial_end?: string | null
        }
      }
      products: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          active: boolean
          image: string | null
          metadata: Json | null
        }
        Insert: {
          id: string
          created_at?: string
          name: string
          description?: string | null
          active?: boolean
          image?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          active?: boolean
          image?: string | null
          metadata?: Json | null
        }
      }
      prices: {
        Row: {
          id: string
          created_at: string
          product_id: string
          active: boolean
          description: string | null
          unit_amount: number
          currency: string
          type: 'one_time' | 'recurring'
          interval: 'day' | 'week' | 'month' | 'year' | null
          interval_count: number | null
          trial_period_days: number | null
          metadata: Json | null
        }
        Insert: {
          id: string
          created_at?: string
          product_id: string
          active?: boolean
          description?: string | null
          unit_amount: number
          currency: string
          type: 'one_time' | 'recurring'
          interval?: 'day' | 'week' | 'month' | 'year' | null
          interval_count?: number | null
          trial_period_days?: number | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          product_id?: string
          active?: boolean
          description?: string | null
          unit_amount?: number
          currency?: string
          type?: 'one_time' | 'recurring'
          interval?: 'day' | 'week' | 'month' | 'year' | null
          interval_count?: number | null
          trial_period_days?: number | null
          metadata?: Json | null
        }
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
  }
}
