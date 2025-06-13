import { donationsService } from '@/services/donations';
import type { Donation } from './supabase';
import { toast } from "@/hooks/use-toast";
import type { PaystackConfig, PaystackTransaction, PaystackPopup } from '../types/paystack';

// Supported currencies and their multipliers
const CURRENCY_CONFIG = {
  GHS: {
    label: 'Ghana Cedis',
    multiplier: 100, // Convert to pesewas
    symbol: '₵'
  },
  USD: {
    label: 'US Dollars',
    multiplier: 100, // Convert to cents
    symbol: '$'
  }
} as const;

type SupportedCurrency = keyof typeof CURRENCY_CONFIG;

interface DonationConfig {
  email: string;
  amount: number;
  ref: string;
  currency: SupportedCurrency;
  metadata: {
    name: string;
    giving_type: Donation['giving_type'];
    frequency: Donation['frequency'];
    currency: SupportedCurrency;
  };
  onSuccess?: (transaction: PaystackTransaction) => void;
  onCancel?: () => void;
}

const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

if (!paystackPublicKey) {
  throw new Error('Missing Paystack public key in environment variables');
}

const convertToSmallestUnit = (amount: number, currency: SupportedCurrency): number => {
  const multiplier = CURRENCY_CONFIG[currency].multiplier;
  return Math.round(amount * multiplier);
};

const formatAmount = (amount: number, currency: SupportedCurrency): string => {
  const { symbol } = CURRENCY_CONFIG[currency];
  return `${symbol}${amount.toFixed(2)}`;
};

let isLoadingScript = false;
let scriptLoadPromise: Promise<void> | null = null;

const loadPaystackScript = (): Promise<void> => {
  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  if (typeof window.PaystackPop !== 'undefined') {
    return Promise.resolve();
  }

  scriptLoadPromise = new Promise((resolve, reject) => {
    if (isLoadingScript) {
      reject(new Error('Paystack script is already loading'));
      return;
    }

    isLoadingScript = true;
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    const cleanup = () => {
      isLoadingScript = false;
      scriptLoadPromise = null;
    };
    
    script.onerror = () => {
      cleanup();
      reject(new Error('Failed to load Paystack script'));
    };
    
    script.onload = () => {
      setTimeout(() => {
        if (typeof window.PaystackPop !== 'undefined') {
          cleanup();
          resolve();
        } else {
          cleanup();
          reject(new Error('Paystack script loaded but PaystackPop is not defined'));
        }
      }, 100);
    };

    document.head.appendChild(script);
  });

  return scriptLoadPromise;
};

export const generateTransactionReference = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 15);
  return `SONLIFE-${timestamp}-${random}`;
};

export const initializePayment = async (config: DonationConfig) => {
  if (typeof window === 'undefined') {
    throw new Error('Payment can only be initialized in a browser environment');
  }

  try {
    await loadPaystackScript();

    const amount = convertToSmallestUnit(config.amount, config.currency);

    window.PaystackPop.setup({
      key: paystackPublicKey,
      email: config.email,
      amount,
      currency: config.currency,
      ref: config.ref,
      metadata: {
        custom_fields: [
          {
            display_name: "Name",
            variable_name: "name",
            value: config.metadata.name
          },
          {
            display_name: "Giving Type",
            variable_name: "giving_type",
            value: config.metadata.giving_type
          },
          {
            display_name: "Frequency",
            variable_name: "frequency",
            value: config.metadata.frequency
          }
        ]
      },
      callback: (response: PaystackTransaction) => {
        if (config.onSuccess) {
          config.onSuccess(response);
        }
      },
      onClose: () => {
        if (config.onCancel) {
          config.onCancel();
        }
      }
    });
  } catch (error) {
    console.error('Failed to initialize payment:', error);
    toast({
      title: "Error",
      description: "Failed to initialize payment. Please try again.",
      variant: "destructive"
    });
    throw error;
  }
};
