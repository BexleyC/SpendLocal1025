import React, { useState } from 'react';
import { VenmoButton } from './VenmoButton';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';
import { useNavigate } from 'react-router-dom';

interface PricingCardProps {
  title: string;
  price: number;
  perDoor: number;
  dimensions: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  perDoor,
  dimensions,
  description,
  gradientFrom,
  gradientTo
}) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard/purchase');
    } else {
      setShowAuthModal(true);
    }
  };

  const cardClasses = twMerge(
    'rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300',
    `bg-gradient-to-br from-${gradientFrom} to-${gradientTo}`
  );

  return (
    <>
      <div className={cardClasses}>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <div className="text-4xl font-bold text-white mb-2">${price}</div>
        <div className="font-medium text-white/80 mb-1">{dimensions}</div>
        <div className="text-lg font-semibold text-white/90">
          As little as ${perDoor.toFixed(3)} Per Door
        </div>
        <div className="mt-4 text-sm text-white/90">{description}</div>

        <div className="mt-6">
          <button
            onClick={handleGetStarted}
            className="w-full px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg
                     hover:bg-gray-100 transition-colors duration-300"
          >
            Get Started
          </button>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            navigate('/dashboard/purchase');
          }}
        />
      )}
    </>
  );
};