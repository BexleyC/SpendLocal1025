import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Town } from '../App';
import { Palette, X, CreditCard, AlertCircle } from 'lucide-react';
import { createSubscription, calculateSubscriptionPrice } from '../lib/stripe';
import { useVenmo } from '../hooks/useVenmo';

interface AdSpacePurchaseProps {
  town: Town;
  onClose: () => void;
}

type AdType = 'premium' | 'standard' | 'mini';
type SubscriptionTerm = 'monthly' | '3months' | '6months' | 'annual';

interface PriceData {
  basePrice: number;
  dimensions: string;
}

const AD_TYPES: Record<AdType, PriceData> = {
  premium: { basePrice: 1000, dimensions: '5.7" x 3.7"' },
  standard: { basePrice: 550, dimensions: '2.7" x 3.7"' },
  mini: { basePrice: 350, dimensions: '2.7" x 1.7"' }
};

export function AdSpacePurchase({ town, onClose }: AdSpacePurchaseProps) {
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState<AdType>('premium');
  const [subscriptionTerm, setSubscriptionTerm] = useState<SubscriptionTerm>('monthly');
  const [includeDesign, setIncludeDesign] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { initiatePayment } = useVenmo();

  const calculations = useMemo(() => {
    const basePrice = AD_TYPES[selectedType].basePrice;
    return calculateSubscriptionPrice(basePrice, subscriptionTerm, includeDesign);
  }, [selectedType, subscriptionTerm, includeDesign]);

  const handlePurchase = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);

    try {
      // Create subscription record
      const subscriptionId = await createSubscription({
        userId: user.uid,
        adType: selectedType,
        term: subscriptionTerm,
        includeDesign,
        town: town || 'wilmington',
        amount: calculations.total
      });

      // Generate payment description
      const description = `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Ad Space - ${town} (${subscriptionTerm})${includeDesign ? ' with design' : ''}`;

      // Initiate Venmo payment
      await initiatePayment({
        amount: calculations.total,
        description,
        recipientId: '@SpendLocal'
      });

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.error('Purchase error:', error);
      setError('Failed to process payment. Please try again or contact support.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b bg-gradient-to-r from-blue-600 to-blue-800 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Purchase Ad Space</h2>
          <p className="text-blue-100 mt-1">
            {town ? `${town.charAt(0).toUpperCase() + town.slice(1)} Territory` : 'Select Territory'}
          </p>
        </div>

        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-h-[calc(100vh-16rem)] overflow-y-auto">
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Payment Initiated!</h3>
              <p className="text-gray-600">
                Please complete the payment in your Venmo app. Once completed, your ad space will be reserved.
              </p>
            </div>
          ) : (
            <>
              {/* Ad Type Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Choose Your Ad Space</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(Object.keys(AD_TYPES) as AdType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      disabled={loading}
                      className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                        selectedType === type
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="font-semibold capitalize">{type}</div>
                      <div className="text-xl sm:text-2xl font-bold">${AD_TYPES[type].basePrice}</div>
                      <div className="text-sm text-gray-600">{AD_TYPES[type].dimensions}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subscription Term */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Choose Your Term</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'monthly', label: 'Monthly', months: 1 },
                    { id: '3months', label: '3 Months', months: 3 },
                    { id: '6months', label: '6 Months', months: 6 },
                    { id: 'annual', label: 'Annual', months: 12 }
                  ].map((term) => (
                    <button
                      key={term.id}
                      onClick={() => setSubscriptionTerm(term.id as SubscriptionTerm)}
                      disabled={loading}
                      className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                        subscriptionTerm === term.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="font-semibold">{term.label}</div>
                      <div className="text-sm text-gray-600">{term.months} month{term.months > 1 ? 's' : ''}</div>
                      {term.id !== 'monthly' && (
                        <div className="text-green-600 font-medium text-sm">
                          {term.id === '3months' ? '5%' : term.id === '6months' ? '10%' : '15%'} off
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Design Services */}
              <div>
                <label className={`flex items-center space-x-3 p-3 sm:p-4 rounded-lg border-2 border-gray-200 cursor-pointer 
                                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-200'}`}>
                  <input
                    type="checkbox"
                    checked={includeDesign}
                    onChange={(e) => setIncludeDesign(e.target.checked)}
                    disabled={loading}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <div>
                    <div className="font-semibold flex items-center">
                      <Palette className="w-5 h-5 mr-2 text-purple-500" />
                      Professional Design Services
                    </div>
                    <div className="text-sm text-gray-600">Add professional design services for $25</div>
                  </div>
                </label>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <span>Base Price (${AD_TYPES[selectedType].basePrice} × {calculations.subtotal / AD_TYPES[selectedType].basePrice} months)</span>
                    <span>${calculations.subtotal.toFixed(2)}</span>
                  </div>
                  {calculations.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Subscription Discount</span>
                      <span>-${calculations.discount.toFixed(2)}</span>
                    </div>
                  )}
                  {calculations.designFee > 0 && (
                    <div className="flex justify-between">
                      <span>Design Services</span>
                      <span>${calculations.designFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${calculations.total.toFixed(2)}</span>
                    </div>
                    {calculations.discount > 0 && (
                      <div className="text-green-600 text-sm text-right">
                        You save: ${calculations.discount.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-6 bg-gray-50 border-t flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4">
          {success ? (
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          ) : (
            <>
              <button
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 order-2 sm:order-1 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={loading}
                className={`w-full sm:w-auto px-6 py-2 bg-[#008CFF] text-white rounded-lg
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center
                         order-1 sm:order-2 ${loading ? '' : 'hover:bg-[#0070CC]'}`}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                {loading ? 'Opening Venmo...' : 'Pay with Venmo'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}