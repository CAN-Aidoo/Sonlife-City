
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for donations
export interface Donation {
  id: string;
  amount: number;
  giving_type: 'tithe' | 'missions' | 'building' | 'outreach';
  frequency: 'one-time' | 'weekly' | 'monthly';
  status: 'pending' | 'completed' | 'failed';
  email: string;
  name: string;
  reference: string;
  created_at: string;
  currency?: string;
}
