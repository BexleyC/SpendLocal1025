import { 
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import type { Profile, Subscription, AdImage, Invoice } from '../types/firebase';

// Collection References
const profilesRef = collection(db, 'profiles');
const subscriptionsRef = collection(db, 'subscriptions');
const adImagesRef = collection(db, 'ad_images');
const invoicesRef = collection(db, 'invoices');

// Profiles
export async function getProfile(userId: string): Promise<Profile | null> {
  try {
    const docRef = doc(profilesRef, userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Profile : null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}

export async function createProfile(userId: string, data: Omit<Profile, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
  try {
    const docRef = doc(profilesRef, userId);
    await setDoc(docRef, {
      ...data,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
}

// Subscriptions
export async function createSubscription(data: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
  try {
    const docRef = doc(subscriptionsRef);
    const subscription = {
      ...data,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    };
    
    await setDoc(docRef, subscription);
    return docRef.id;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}

export async function getUserSubscriptions(userId: string): Promise<Subscription[]> {
  try {
    const q = query(subscriptionsRef, where('profile_id', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Subscription));
  } catch (error) {
    console.error('Error fetching user subscriptions:', error);
    throw error;
  }
}

// Ad Images
export async function createAdImage(data: Omit<AdImage, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
  try {
    const docRef = doc(adImagesRef);
    const adImage = {
      ...data,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    };
    
    await setDoc(docRef, adImage);
    return docRef.id;
  } catch (error) {
    console.error('Error creating ad image:', error);
    throw error;
  }
}

// Invoices
export async function createInvoice(data: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
  try {
    const docRef = doc(invoicesRef);
    const invoice = {
      ...data,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    };
    
    await setDoc(docRef, invoice);
    return docRef.id;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
}

export async function getUserInvoices(userId: string): Promise<Invoice[]> {
  try {
    const q = query(invoicesRef, where('profile_id', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invoice));
  } catch (error) {
    console.error('Error fetching user invoices:', error);
    throw error;
  }
}