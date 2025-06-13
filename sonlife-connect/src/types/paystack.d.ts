// Define the base transaction interface
export interface PaystackTransaction {
  reference: string;
  status: string;
  message: string;
}

// Define the configuration interface
export interface PaystackConfig {
  key?: string;
  email: string;
  amount: number;
  currency: string;
  ref?: string;
  callback?: (response: PaystackTransaction) => void;
  onClose?: () => void;
  metadata?: Record<string, any>;
  channels?: string[];
}

// Define the Paystack popup interface
export interface PaystackPopup {
  newTransaction(config: PaystackConfig): void;
}

// Extend the Window interface
declare global {
  interface Window {
    PaystackPop: {
      new(): PaystackPopup;
      setup(config: PaystackConfig): void;
    }
  }
}
