import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, connectFirestoreEmulator } from 'firebase/firestore';
import * as dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase with retries
async function initializeFirebase(maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempting to initialize Firebase (attempt ${attempt}/${maxRetries})...`);
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      
      // Connect to emulator in development
      if (process.env.NODE_ENV === 'development') {
        try {
          connectFirestoreEmulator(db, 'localhost', 8080);
          console.log('Connected to Firestore emulator');
        } catch (error) {
          console.warn('Failed to connect to Firestore emulator:', error);
        }
      }
      
      // Test the connection
      const testCollection = collection(db, 'test');
      await getDocs(testCollection);
      
      console.log('Firebase initialized successfully!');
      return db;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === maxRetries) {
        throw new Error('Failed to initialize Firebase after multiple attempts');
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
}

const initialSlots = [
  { position: 1, price: 900, dimensions: '2.75 x 3.75' },
  { position: 2, price: 900, dimensions: '2.75 x 3.75' },
  { position: 3, price: 900, dimensions: '2.75 x 3.75' },
  { position: 4, price: 500, dimensions: '2.75 x 1.75' },
  { position: 5, price: 500, dimensions: '2.75 x 1.75' },
  { position: 6, price: 500, dimensions: '2.75 x 1.75' },
  { position: 7, price: 500, dimensions: '2.75 x 1.75' },
  { position: 8, price: 900, dimensions: '2.75 x 3.75' },
  { position: 9, price: 900, dimensions: '2.75 x 3.75' },
  { position: 10, price: 900, dimensions: '2.75 x 3.75' }
];

async function initializeSlots() {
  try {
    const db = await initializeFirebase();
    
    // Check if slots already exist
    const slotsCollection = collection(db, 'slots');
    const snapshot = await getDocs(slotsCollection);
    
    if (!snapshot.empty) {
      console.log('Slots already exist. Skipping initialization.');
      process.exit(0);
    }

    // Initialize slots with batch writes
    console.log('Initializing slots...');
    
    for (const slot of initialSlots) {
      const docRef = doc(slotsCollection);
      await setDoc(docRef, {
        ...slot,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      console.log(`Created slot ${slot.position}`);
    }

    console.log('Successfully initialized all slots!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing slots:', error);
    process.exit(1);
  }
}

initializeSlots();