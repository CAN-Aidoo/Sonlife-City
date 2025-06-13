export type GivingType = 'tithe' | 'missions' | 'building' | 'outreach'
export type DonationStatus = 'pending' | 'completed' | 'failed'
export type DonationFrequency = 'one-time' | 'weekly' | 'monthly'
export type CurrencyType = 'GHS' | 'USD'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  created_at: string
  updated_at: string
}

export interface Donation {
  id: string
  donor_id: string
  amount: number
  currency: CurrencyType
  giving_type: GivingType
  frequency: DonationFrequency
  reference: string
  status: DonationStatus
  payment_method: string | null
  transaction_id: string | null
  metadata: Record<string, any>
  created_at: string
  updated_at: string
}

export interface DonationReceipt {
  id: string
  donation_id: string
  receipt_number: string
  issued_at: string
  pdf_url: string | null
  created_at: string
}

export interface RecurringDonation {
  id: string
  donor_id: string
  amount: number
  currency: CurrencyType
  giving_type: GivingType
  frequency: DonationFrequency
  next_donation_date: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface DonationStatistics {
  id: string
  giving_type: GivingType
  currency: CurrencyType
  total_amount: number
  donor_count: number
  donation_count: number
  period_start: string
  period_end: string
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
      }
      donations: {
        Row: Donation
        Insert: Omit<Donation, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Donation, 'id' | 'created_at' | 'updated_at'>>
      }
      donation_receipts: {
        Row: DonationReceipt
        Insert: Omit<DonationReceipt, 'id' | 'receipt_number' | 'created_at'>
        Update: Partial<Omit<DonationReceipt, 'id' | 'donation_id' | 'receipt_number' | 'created_at'>>
      }
      recurring_donations: {
        Row: RecurringDonation
        Insert: Omit<RecurringDonation, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<RecurringDonation, 'id' | 'created_at' | 'updated_at'>>
      }
      donation_statistics: {
        Row: DonationStatistics
        Insert: Omit<DonationStatistics, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<DonationStatistics, 'id' | 'created_at' | 'updated_at'>>
      }
    }
    Functions: {
      process_recurring_donations: {
        Args: Record<string, never>
        Returns: number
      }
    }
  }
} 