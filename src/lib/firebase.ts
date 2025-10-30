import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyD6cJP158CSKlg6M9W5IZ4qhXOelWv0Qq0",
  authDomain: "spendlocal2025.firebaseapp.com",
  projectId: "spendlocal2025",
  storageBucket: "spendlocal2025.appspot.com",
  messagingSenderId: "71153828127",
  appId: "1:71153828127:web:f65b3af3ac8ecde1ec702a",
  measurementId: "G-1762T1D1R6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize analytics only in production and if supported
let analytics = null;
if (process.env.NODE_ENV === 'production') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, storage, analytics };