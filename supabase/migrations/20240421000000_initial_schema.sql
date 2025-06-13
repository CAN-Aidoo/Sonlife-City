-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE giving_type AS ENUM ('tithe', 'missions', 'building', 'outreach');
CREATE TYPE donation_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE donation_frequency AS ENUM ('one-time', 'weekly', 'monthly');
CREATE TYPE currency_type AS ENUM ('GHS', 'USD');

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create donations table
CREATE TABLE public.donations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    donor_id UUID REFERENCES public.profiles(id),
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    currency currency_type NOT NULL DEFAULT 'GHS',
    giving_type giving_type NOT NULL,
    frequency donation_frequency NOT NULL DEFAULT 'one-time',
    reference TEXT UNIQUE NOT NULL,
    status donation_status NOT NULL DEFAULT 'pending',
    payment_method TEXT,
    transaction_id TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on donations
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create donation_receipts table
CREATE TABLE public.donation_receipts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    donation_id UUID REFERENCES public.donations(id) ON DELETE CASCADE,
    receipt_number TEXT UNIQUE NOT NULL,
    issued_at TIMESTAMPTZ DEFAULT NOW(),
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on donation_receipts
ALTER TABLE public.donation_receipts ENABLE ROW LEVEL SECURITY;

-- Create recurring_donations table
CREATE TABLE public.recurring_donations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    donor_id UUID REFERENCES public.profiles(id),
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    currency currency_type NOT NULL DEFAULT 'GHS',
    giving_type giving_type NOT NULL,
    frequency donation_frequency NOT NULL,
    next_donation_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on recurring_donations
ALTER TABLE public.recurring_donations ENABLE ROW LEVEL SECURITY;

-- Create donation_statistics table for caching aggregated data
CREATE TABLE public.donation_statistics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    giving_type giving_type NOT NULL,
    currency currency_type NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    donor_count INTEGER NOT NULL DEFAULT 0,
    donation_count INTEGER NOT NULL DEFAULT 0,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(giving_type, currency, period_start, period_end)
);

-- Enable RLS on donation_statistics
ALTER TABLE public.donation_statistics ENABLE ROW LEVEL SECURITY;

-- Create indexes for better query performance
CREATE INDEX idx_donations_donor_id ON public.donations(donor_id);
CREATE INDEX idx_donations_status ON public.donations(status);
CREATE INDEX idx_donations_created_at ON public.donations(created_at);
CREATE INDEX idx_donations_giving_type ON public.donations(giving_type);
CREATE INDEX idx_recurring_donations_next_date ON public.recurring_donations(next_donation_date) WHERE is_active = true;

-- RLS Policies

-- Profiles policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id);

-- Donations policies
CREATE POLICY "Users can view their own donations"
    ON public.donations
    FOR SELECT
    USING (auth.uid() = donor_id);

CREATE POLICY "Users can insert their own donations"
    ON public.donations
    FOR INSERT
    WITH CHECK (auth.uid() = donor_id);

-- Donation receipts policies
CREATE POLICY "Users can view their own donation receipts"
    ON public.donation_receipts
    FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.donations
        WHERE donations.id = donation_receipts.donation_id
        AND donations.donor_id = auth.uid()
    ));

-- Recurring donations policies
CREATE POLICY "Users can view their own recurring donations"
    ON public.recurring_donations
    FOR SELECT
    USING (auth.uid() = donor_id);

CREATE POLICY "Users can insert their own recurring donations"
    ON public.recurring_donations
    FOR INSERT
    WITH CHECK (auth.uid() = donor_id);

CREATE POLICY "Users can update their own recurring donations"
    ON public.recurring_donations
    FOR UPDATE
    USING (auth.uid() = donor_id);

-- Donation statistics are viewable by all authenticated users
CREATE POLICY "Authenticated users can view donation statistics"
    ON public.donation_statistics
    FOR SELECT
    TO authenticated
    USING (true);

-- Functions

-- Function to update donation statistics
CREATE OR REPLACE FUNCTION update_donation_statistics()
RETURNS TRIGGER AS $$
BEGIN
    -- Update statistics for the current month
    INSERT INTO public.donation_statistics (
        giving_type,
        currency,
        total_amount,
        donor_count,
        donation_count,
        period_start,
        period_end
    )
    SELECT
        NEW.giving_type,
        NEW.currency,
        COALESCE(SUM(amount), 0),
        COUNT(DISTINCT donor_id),
        COUNT(*),
        date_trunc('month', NEW.created_at)::date,
        (date_trunc('month', NEW.created_at) + interval '1 month - 1 day')::date
    FROM public.donations
    WHERE status = 'completed'
    AND giving_type = NEW.giving_type
    AND currency = NEW.currency
    AND created_at >= date_trunc('month', NEW.created_at)
    AND created_at < date_trunc('month', NEW.created_at) + interval '1 month'
    GROUP BY giving_type, currency
    ON CONFLICT (giving_type, currency, period_start, period_end)
    DO UPDATE SET
        total_amount = EXCLUDED.total_amount,
        donor_count = EXCLUDED.donor_count,
        donation_count = EXCLUDED.donation_count,
        updated_at = NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update statistics when a donation is completed
CREATE TRIGGER update_donation_stats_trigger
    AFTER INSERT OR UPDATE OF status
    ON public.donations
    FOR EACH ROW
    WHEN (NEW.status = 'completed')
    EXECUTE FUNCTION update_donation_statistics();

-- Function to generate receipt number
CREATE OR REPLACE FUNCTION generate_receipt_number()
RETURNS TEXT AS $$
DECLARE
    year TEXT;
    sequence_number INTEGER;
    receipt_number TEXT;
BEGIN
    year := to_char(CURRENT_DATE, 'YYYY');
    
    -- Get the next sequence number for the current year
    WITH seq AS (
        SELECT COALESCE(
            MAX(CAST(SUBSTRING(receipt_number FROM '\d+$') AS INTEGER)),
            0
        ) + 1 as next_seq
        FROM public.donation_receipts
        WHERE receipt_number LIKE 'RCP-' || year || '-%'
    )
    SELECT next_seq INTO sequence_number FROM seq;
    
    -- Format the receipt number
    receipt_number := 'RCP-' || year || '-' || LPAD(sequence_number::TEXT, 6, '0');
    
    RETURN receipt_number;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically generate receipt number
CREATE OR REPLACE FUNCTION set_receipt_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.receipt_number IS NULL THEN
        NEW.receipt_number := generate_receipt_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_receipt_number_trigger
    BEFORE INSERT ON public.donation_receipts
    FOR EACH ROW
    EXECUTE FUNCTION set_receipt_number();

-- Function to handle recurring donations
CREATE OR REPLACE FUNCTION process_recurring_donations()
RETURNS INTEGER AS $$
DECLARE
    donations_created INTEGER := 0;
    rec RECORD;
BEGIN
    FOR rec IN
        SELECT * FROM public.recurring_donations
        WHERE is_active = true
        AND next_donation_date <= CURRENT_DATE
    LOOP
        -- Create new donation
        INSERT INTO public.donations (
            donor_id,
            amount,
            currency,
            giving_type,
            frequency,
            reference,
            status
        ) VALUES (
            rec.donor_id,
            rec.amount,
            rec.currency,
            rec.giving_type,
            rec.frequency,
            'RECURRING-' || uuid_generate_v4(),
            'pending'
        );

        -- Update next donation date based on frequency
        UPDATE public.recurring_donations
        SET next_donation_date = CASE
            WHEN frequency = 'weekly' THEN next_donation_date + interval '1 week'
            WHEN frequency = 'monthly' THEN next_donation_date + interval '1 month'
            ELSE next_donation_date
        END,
        updated_at = NOW()
        WHERE id = rec.id;

        donations_created := donations_created + 1;
    END LOOP;

    RETURN donations_created;
END;
$$ LANGUAGE plpgsql; 