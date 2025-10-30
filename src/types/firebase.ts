import { Timestamp } from 'firebase/firestore';

export interface Profile {
  id: string;
  email: string;
  company_name: string | null;
  phone_number: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface Subscription {
  id: string;
  profile_id: string;
  slot_id: string;
  status: 'active' | 'pending' | 'cancelled' | 'expired';
  start_date: Timestamp;
  end_date: Timestamp | null;
  price: number;
  auto_renew: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
  town: string;
  type: 'premium' | 'standard' | 'mini';
  design_service: boolean;
}

export interface AdImage {
  id: string;
  subscription_id: string;
  url: string;
  filename: string;
  mime_type: string;
  size_bytes: number;
  width: number | null;
  height: number | null;
  status: 'pending' | 'approved' | 'rejected';
  approval_notes: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface Invoice {
  id: string;
  subscription_id: string | null;
  profile_id: string | null;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  payment_method: string | null;
  payment_date: Timestamp | null;
  due_date: Timestamp;
  invoice_number: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}