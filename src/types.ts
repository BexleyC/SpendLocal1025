export interface AdSlot {
  id: string;
  price: number;
  dimensions: string;
  position: number;
}

export interface User {
  id: string;
  email: string;
  company_name: string;
  phone_number: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, company_name: string, phone_number: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface Reservation {
  id: string;
  slot_id: string;
  user_id: string;
  status: 'pending' | 'completed' | 'cancelled';
}