import { useState } from 'react';

interface PaymentParams {
  amount: number;
  description: string;
  recipientId: string;
}

export function useVenmo() {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async ({ amount, description, recipientId }: PaymentParams) => {
    setLoading(true);
    
    try {
      // Format amount to 2 decimal places
      const formattedAmount = amount.toFixed(2);
      
      // Create both URLs upfront
      const venmoAppUrl = `venmo://paycharge?txn=pay&recipients=${recipientId}&amount=${formattedAmount}&note=${encodeURIComponent(description)}`;
      const venmoWebUrl = `https://venmo.com/${recipientId}?txn=pay&amount=${formattedAmount}&note=${encodeURIComponent(description)}`;
      
      // Try to open Venmo app first
      const appWindow = window.open(venmoAppUrl, '_blank');
      
      // If app window is blocked or fails, redirect to web version
      if (!appWindow || appWindow.closed || typeof appWindow.closed === 'undefined') {
        window.location.href = venmoWebUrl;
      }
      
      // Set a timeout to clear loading state
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      
    } catch (error) {
      console.error('Venmo payment error:', error);
      setLoading(false);
      throw new Error('Failed to initiate Venmo payment');
    }
  };

  return { initiatePayment, loading };
}