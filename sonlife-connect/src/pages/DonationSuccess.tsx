
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageLayout } from '@/components/layouts/PageLayout';
import { Button } from '@/components/ui/button';
import { donationsService } from '@/services/donations';
import type { Donation } from '@/lib/supabase';
import { CheckCircle2, Loader2 } from 'lucide-react';

const currencySymbols: Record<string, string> = {
  GHS: "₵",
  USD: "$"
};

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const [donation, setDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState(true);
  const reference = searchParams.get('reference');

  useEffect(() => {
    document.title = "Thank You - Sonlife City Church HQ";
  }, []);

  useEffect(() => {
    const fetchDonation = async () => {
      if (!reference) return;

      try {
        const data = await donationsService.getDonationByReference(reference);
        setDonation(data);
      } catch (err) {
        console.error('Error fetching donation:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonation();
  }, [reference]);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-sonlife-blue" />
          <p className="text-gray-600">Loading donation details...</p>
        </div>
      </PageLayout>
    );
  }

  if (!donation) {
    return (
      <PageLayout>
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Donation Not Found</h1>
          <p className="text-gray-600">We couldn't find the donation details for this reference.</p>
          <Button onClick={() => window.location.href = '/give'}>
            Return to Give Page
          </Button>
        </div>
      </PageLayout>
    );
  }

  // Determine currency symbol
  const currencySymbol = donation.currency ? 
    currencySymbols[donation.currency] || donation.currency : 
    "₵"; // Default to Ghana Cedis if no currency specified

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">Thank You for Your Generosity!</h1>
        
        <p className="text-xl text-gray-600">
          Your donation of {currencySymbol}{donation.amount.toFixed(2)} has been received and will help support our ministry.
        </p>

        <div className="glass p-6 rounded-xl space-y-3 text-left">
          <div className="grid grid-cols-2 gap-2">
            <p className="text-gray-600">Reference:</p>
            <p className="font-medium">{donation.reference}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <p className="text-gray-600">Type:</p>
            <p className="font-medium capitalize">{donation.giving_type}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <p className="text-gray-600">Frequency:</p>
            <p className="font-medium capitalize">{donation.frequency}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <p className="text-gray-600">Currency:</p>
            <p className="font-medium">{donation.currency || "GHS"}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <p className="text-gray-600">Date:</p>
            <p className="font-medium">
              {new Date(donation.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            A receipt has been sent to your email address. Please keep it for your records.
          </p>
          
          <Button onClick={() => window.location.href = '/give'}>
            Make Another Donation
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default DonationSuccess;
