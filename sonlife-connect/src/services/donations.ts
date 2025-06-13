import { supabase } from '@/lib/supabase';
import type { Donation } from '@/lib/supabase';

export const donationsService = {
  async createDonation(donation: Omit<Donation, 'id' | 'created_at'>) {
    try {
      // Validate required fields
      if (!donation.email || !donation.amount || !donation.reference || !donation.currency) {
        throw new Error('Missing required donation fields');
      }

      // Validate amount
      if (donation.amount <= 0) {
        throw new Error('Invalid donation amount');
      }

      // Create donation record
      const { data, error } = await supabase
        .from('donations')
        .insert(donation)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        if (error.code === '23505') {
          throw new Error('A donation with this reference already exists');
        } else if (error.code === '42P01') {
          throw new Error('Database table not found. Please ensure the donations table exists');
        } else if (error.code === '42703') {
          throw new Error('Invalid donation data structure');
        } else if (error.code === '23503') {
          throw new Error('Invalid reference to related data');
        } else {
          throw new Error('Failed to create donation record: ' + error.message);
        }
      }

      return data;
    } catch (error) {
      console.error("Error creating donation:", error);
      
      // In preview/development environment, return a mock donation
      if (window.location.hostname.includes('lovable.app')) {
        console.log("Generating mock donation data for preview environment");
        return {
          id: "mock-id",
          ...donation,
          created_at: new Date().toISOString(),
        };
      }

      // If it's a known error, throw it directly
      if (error instanceof Error) {
        throw error;
      }

      // Otherwise, throw a generic error
      throw new Error('Failed to create donation record. Please try again.');
    }
  },

  async getDonationByReference(reference: string) {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('reference', reference)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error getting donation:", error);
      // In preview environment, return mock data
      if (window.location.hostname.includes('lovable.app')) {
        return {
          id: "mock-id",
          amount: 100,
          email: "donor@example.com",
          name: "Mock Donor",
          giving_type: "tithe",
          frequency: "one-time",
          reference: reference,
          status: "completed",
          created_at: new Date().toISOString(),
          currency: "GHS"
        };
      }
      throw error;
    }
  },

  async updateDonationStatus(reference: string, status: Donation['status']) {
    try {
      const { error } = await supabase
        .from('donations')
        .update({ status })
        .eq('reference', reference);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating donation status:", error);
      // Don't throw in preview environment
      if (!window.location.hostname.includes('lovable.app')) {
        throw error;
      }
    }
  },

  async getDonationsByEmail(email: string) {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error getting donations by email:", error);
      if (window.location.hostname.includes('lovable.app')) {
        return [];
      }
      throw error;
    }
  },

  async getDonationStats() {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('amount, giving_type, currency')
        .eq('status', 'completed');

      if (error) throw error;

      return data.reduce((acc, curr) => {
        const key = curr.giving_type;
        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key] += Number(curr.amount);
        return acc;
      }, {} as Record<Donation['giving_type'], number>);
    } catch (error) {
      console.error("Error getting donation stats:", error);
      if (window.location.hostname.includes('lovable.app')) {
        return {
          tithe: 5000,
          missions: 3000,
          building: 8000,
          outreach: 2500
        };
      }
      throw error;
    }
  }
}; 
