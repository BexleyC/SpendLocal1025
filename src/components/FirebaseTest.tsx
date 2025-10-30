import React, { useEffect, useState } from 'react';
import { auth, db, analytics, initializeFirebase } from '../lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { logEvent } from 'firebase/analytics';
import { Loader2, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

export function FirebaseTest() {
  const [authStatus, setAuthStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [firestoreStatus, setFirestoreStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [analyticsStatus, setAnalyticsStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  async function testConnections() {
    setIsRetrying(true);
    setError(null);
    setAuthStatus('testing');
    setFirestoreStatus('testing');
    setAnalyticsStatus('testing');

    // Initialize Firebase first
    try {
      const initialized = await initializeFirebase();
      if (!initialized) {
        throw new Error('Failed to initialize Firebase');
      }
    } catch (err) {
      console.error('Firebase initialization error:', err);
      setAuthStatus('error');
      setFirestoreStatus('error');
      setAnalyticsStatus('error');
      setError('Failed to initialize Firebase services. Please check your connection and try again.');
      setIsRetrying(false);
      return;
    }

    // Test Authentication
    try {
      await signInAnonymously(auth);
      setAuthStatus('success');
    } catch (err) {
      console.error('Auth Error:', err);
      setAuthStatus('error');
      setError('Authentication failed. Please check your connection and try again.');
      setIsRetrying(false);
      return;
    }

    // Test Firestore
    try {
      const testCollection = collection(db, 'test');
      await addDoc(testCollection, {
        timestamp: new Date().toISOString(),
        test: true
      });
      await getDocs(testCollection);
      setFirestoreStatus('success');
    } catch (err) {
      console.error('Firestore Error:', err);
      setFirestoreStatus('error');
      setError('Database connection failed. Please check your connection and try again.');
      setIsRetrying(false);
      return;
    }

    // Test Analytics
    try {
      if (analytics) {
        await logEvent(analytics, 'test_connection');
        setAnalyticsStatus('success');
      } else {
        setAnalyticsStatus('error');
        setError('Analytics not supported in this environment');
      }
    } catch (err) {
      console.error('Analytics Error:', err);
      setAnalyticsStatus('error');
      setError('Analytics initialization failed');
    }

    setIsRetrying(false);
  }

  useEffect(() => {
    testConnections();
  }, []);

  const StatusIcon = ({ status }: { status: 'testing' | 'success' | 'error' }) => {
    switch (status) {
      case 'testing':
        return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Firebase Connection Test</h2>
        <button
          onClick={testConnections}
          disabled={isRetrying}
          className="p-2 text-blue-600 hover:text-blue-800 disabled:opacity-50 
                   disabled:cursor-not-allowed rounded-full hover:bg-blue-50 transition-colors"
        >
          <RefreshCw className={`w-5 h-5 ${isRetrying ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="font-medium">Authentication</span>
          <StatusIcon status={authStatus} />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="font-medium">Firestore</span>
          <StatusIcon status={firestoreStatus} />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="font-medium">Analytics</span>
          <StatusIcon status={analyticsStatus} />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}