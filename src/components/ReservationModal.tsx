import React, { useState } from 'react';
import { AdSlot } from '../types';
import { X, DollarSign, Ruler, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as storage from '../lib/storage';

interface ReservationModalProps {
  slot: AdSlot | null;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  slot,
  onClose,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!slot || !user) return null;

  const isPremium = slot.price === 900;

  const handleInquiry = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create reservation in local storage
      await storage.createReservation(slot.id, user.id);
      setSuccess(true);
    } catch (err) {
      setError('Failed to send inquiry. Please try again.');
      console.error('Inquiry error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 modal-overlay flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full modal-content">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{isPremium ? 'Premium' : 'Standard'} Ad Space</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Inquiry Sent Successfully!</h3>
              <p className="text-gray-600">
                Our team will contact you shortly about your interest in this advertising space.
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                Details for this {isPremium ? 'Premium' : 'Standard'} advertising space:
              </p>
              <div className="bg-blue-50 rounded-xl p-6 space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Price</p>
                    <p className="text-2xl font-bold text-blue-700">${slot.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Ruler className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Dimensions</p>
                    <p className="text-lg font-semibold text-blue-700">{slot.dimensions}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleInquiry}
                disabled={loading}
                className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 
                         hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {success && (
          <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
            <button
              onClick={onClose}
              className="w-full bg-gray-600 text-white rounded-lg py-2 px-4 
                       hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};