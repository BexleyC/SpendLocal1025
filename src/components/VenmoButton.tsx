import React from 'react';
import { useVenmo } from '../hooks/useVenmo';

interface VenmoButtonProps {
  amount: number;
  description: string;
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const VenmoButton: React.FC<VenmoButtonProps> = ({
  amount,
  description,
  onSuccess,
  onError
}) => {
  const { initiatePayment, loading } = useVenmo();

  const handleClick = async () => {
    try {
      await initiatePayment({
        amount,
        description,
        recipientId: '@SpendLocal', // Your Venmo business username
      });
      onSuccess();
    } catch (error) {
      onError(error instanceof Error ? error : new Error('Payment failed'));
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
        w-full px-4 py-3 rounded-lg font-medium text-white
        bg-[#008CFF] hover:bg-[#0070CC] 
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2 transition-colors
      `}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
      ) : (
        <>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm-7.5 13.5h-3v-9h3c2.486 0 4.5 2.014 4.5 4.5s-2.014 4.5-4.5 4.5z"/>
          </svg>
          Pay with Venmo
        </>
      )}
    </button>
  );
};