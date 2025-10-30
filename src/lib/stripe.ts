import { doc, collection, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { Subscription } from '../types/firebase';

interface CreateSubscriptionParams {
  userId: string;
  adType: 'premium' | 'standard' | 'mini';
  term: 'monthly' | '3months' | '6months' | 'annual';
  includeDesign: boolean;
  town: string;
  amount: number;
}

export async function createSubscription({
  userId,
  adType,
  term,
  includeDesign,
  town,
  amount
}: CreateSubscriptionParams): Promise<string> {
  try {
    // Create a new subscription document
    const subscriptionRef = doc(collection(db, 'subscriptions'));
    
    // Calculate end date based on term
    const now = new Date();
    const endDate = new Date(now);
    switch (term) {
      case 'monthly':
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case '3months':
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case '6months':
        endDate.setMonth(endDate.getMonth() + 6);
        break;
      case 'annual':
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
    }

    const subscription: Omit<Subscription, 'id'> = {
      profile_id: userId,
      status: 'pending',
      type: adType,
      town,
      price: amount,
      design_service: includeDesign,
      auto_renew: term === 'monthly',
      start_date: serverTimestamp(),
      end_date: serverTimestamp(),
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    };

    await setDoc(subscriptionRef, subscription);
    return subscriptionRef.id;

  } catch (error) {
    console.error('Error creating subscription:', error);
    throw new Error('Failed to create subscription');
  }
}

// Calculate subscription price with discounts
export function calculateSubscriptionPrice(
  basePrice: number,
  term: 'monthly' | '3months' | '6months' | 'annual',
  includeDesign: boolean
): { subtotal: number; discount: number; designFee: number; total: number } {
  const months = term === 'monthly' ? 1 :
                term === '3months' ? 3 :
                term === '6months' ? 6 : 12;
                
  const discountPercentage = term === 'monthly' ? 0 :
                            term === '3months' ? 0.05 :
                            term === '6months' ? 0.10 : 0.15;

  const subtotal = basePrice * months;
  const discount = subtotal * discountPercentage;
  const designFee = includeDesign ? 25 : 0;
  const total = subtotal - discount + designFee;

  return {
    subtotal,
    discount,
    designFee,
    total
  };
}