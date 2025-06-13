import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Helper functions for donations
export async function createDonation(data: Database['public']['Tables']['donations']['Insert']) {
  const { data: donation, error } = await supabase
    .from('donations')
    .insert(data)
    .select()
    .single()

  if (error) throw error
  return donation
}

export async function updateDonationStatus(
  id: string,
  status: Database['public']['Tables']['donations']['Row']['status'],
  transactionId?: string
) {
  const { data: donation, error } = await supabase
    .from('donations')
    .update({
      status,
      transaction_id: transactionId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return donation
}

export async function createRecurringDonation(
  data: Database['public']['Tables']['recurring_donations']['Insert']
) {
  const { data: recurringDonation, error } = await supabase
    .from('recurring_donations')
    .insert(data)
    .select()
    .single()

  if (error) throw error
  return recurringDonation
}

export async function getDonationStatistics(
  givingType: Database['public']['Tables']['donation_statistics']['Row']['giving_type'],
  currency: Database['public']['Tables']['donation_statistics']['Row']['currency']
) {
  const { data: stats, error } = await supabase
    .from('donation_statistics')
    .select()
    .eq('giving_type', givingType)
    .eq('currency', currency)
    .single()

  if (error && error.code !== 'PGRST116') throw error // PGRST116 is "not found"
  return stats
}

export async function getUserDonations(userId: string) {
  const { data: donations, error } = await supabase
    .from('donations')
    .select(`
      *,
      donation_receipts (*)
    `)
    .eq('donor_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return donations
}

export async function getUserRecurringDonations(userId: string) {
  const { data: recurringDonations, error } = await supabase
    .from('recurring_donations')
    .select()
    .eq('donor_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return recurringDonations
} 