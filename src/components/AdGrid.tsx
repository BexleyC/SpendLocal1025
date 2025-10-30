import React, { useState } from 'react';
import { AdSlot } from '../types';
import { DollarSign, Ruler } from 'lucide-react';

interface AdGridProps {
  onSlotClick: (slot: AdSlot) => void;
  townName: string;
}

export const AdGrid: React.FC<AdGridProps> = ({ onSlotClick, townName }) => {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

  // Mock slots data (this would typically come from Firebase)
  const slots: AdSlot[] = [
    { id: '1', position: 1, price: 900, dimensions: '2.75 x 3.75' },
    { id: '2', position: 2, price: 900, dimensions: '2.75 x 3.75' },
    { id: '3', position: 3, price: 900, dimensions: '2.75 x 3.75' },
    { id: '4', position: 4, price: 500, dimensions: '2.75 x 1.75' },
    { id: '5', position: 5, price: 500, dimensions: '2.75 x 1.75' },
    { id: '6', position: 6, price: 500, dimensions: '2.75 x 1.75' },
    { id: '7', position: 7, price: 500, dimensions: '2.75 x 1.75' },
    { id: '8', position: 8, price: 900, dimensions: '2.75 x 3.75' },
    { id: '9', position: 9, price: 900, dimensions: '2.75 x 3.75' },
    { id: '10', position: 10, price: 900, dimensions: '2.75 x 3.75' }
  ];

  return (
    <div className="relative max-w-[1400px] mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="relative flex flex-col">
        {/* Top row */}
        <div className="grid grid-cols-4 gap-1 bg-slate-900 p-1">
          <div className="col-span-1 aspect-[2.75/3.75] bg-white relative">
            {renderSlot(slots[0])}
          </div>
          <div className="col-span-1 aspect-[2.75/3.75] bg-white relative">
            {renderSlot(slots[1])}
          </div>
          <div className="col-span-1 aspect-[2.75/3.75] bg-white relative">
            {renderSlot(slots[2])}
          </div>
          <div className="col-span-1 flex flex-col gap-1">
            <div className="aspect-[2.75/1.75] bg-white relative">
              {renderSlot(slots[3])}
            </div>
            <div className="aspect-[2.75/1.75] bg-white relative">
              {renderSlot(slots[4])}
            </div>
          </div>
        </div>

        {/* Banner with text */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-accent-400 text-4xl font-bold tracking-wider">SPEND LOCAL</span>
              <span className="text-white text-4xl font-bold tracking-wider">{townName.toUpperCase()}</span>
            </div>
            <div className="flex justify-between w-full px-8">
              <span className="text-slate-300 italic ml-[4.5rem]">Delivered to over 8,500 Homes Every Month</span>
              <span className="text-slate-300 mr-[8rem]">Collaborative Advertising</span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-4 gap-1 bg-slate-900 p-1">
          <div className="col-span-1 flex flex-col gap-1">
            <div className="aspect-[2.75/1.75] bg-white relative">
              {renderSlot(slots[5])}
            </div>
            <div className="aspect-[2.75/1.75] bg-white relative">
              {renderSlot(slots[6])}
            </div>
          </div>
          <div className="col-span-1 aspect-[2.75/3.75] bg-white relative">
            {renderSlot(slots[7])}
          </div>
          <div className="col-span-1 aspect-[2.75/3.75] bg-white relative">
            {renderSlot(slots[8])}
          </div>
          <div className="col-span-1 aspect-[2.75/3.75] bg-white relative">
            {renderSlot(slots[9])}
          </div>
        </div>
      </div>
    </div>
  );

  function renderSlot(slot: AdSlot) {
    if (!slot) return null;
    
    const isHovered = hoveredSlot === slot.id;
    const isPremium = slot.price === 900;
    
    return (
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center cursor-pointer
          transition-all duration-300 border-2 p-2
          ${isHovered 
            ? `${isPremium ? 'premium-gradient' : 'standard-gradient'} text-white border-transparent` 
            : 'bg-gradient-to-br from-slate-50 to-slate-100 border-transparent hover:border-slate-300'
          }
        `}
        onClick={() => onSlotClick(slot)}
        onMouseEnter={() => setHoveredSlot(slot.id)}
        onMouseLeave={() => setHoveredSlot(null)}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <span className={`font-serif text-4xl italic font-bold mb-2 
              ${isHovered ? 'text-white' : isPremium ? 'text-blue-800' : 'text-teal-700'}
              tracking-wide transform hover:scale-105 transition-transform
            `}>
              Your Ad Here
            </span>
            <div className={`flex flex-col items-center ${isHovered ? 'text-white/90' : 'text-slate-600'}`}>
              <span className="text-sm font-medium">
                {isPremium ? 'Premium' : 'Standard'} Space
              </span>
              <span className="text-sm mt-1">
                {slot.dimensions}
              </span>
            </div>
          </div>
        </div>
        
        {isHovered && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-slate-800 text-xs py-1 px-3 rounded-full shadow-md font-medium">
            Select Space
          </div>
        )}
      </div>
    );
  }
};