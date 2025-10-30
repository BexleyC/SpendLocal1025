import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Building2 } from 'lucide-react';
import { Town } from '../App';
import { useNavigate } from 'react-router-dom';

interface TownSearchProps {
  onClose?: () => void;
}

const FREQUENT_TOWNS = [
  { id: 'tewksbury', name: 'Tewksbury, MA', reach: '~10,000 Homes and Businesses' },
  { id: 'wilmington', name: 'Wilmington, MA', reach: '~8,500 Homes and Businesses' },
  { id: 'andover', name: 'Andover, MA', reach: '~12,500 Homes and Businesses' },
  { id: 'billerica', name: 'Billerica, MA', reach: '~15,000 Homes and Businesses' },
  { id: 'northandover', name: 'North Andover, MA', reach: '~11,000 Homes and Businesses' }
];

export function TownSearch({ onClose }: TownSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Handle click outside
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTowns = FREQUENT_TOWNS.filter(town =>
    town.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTownSelect = (townId: Town) => {
    navigate(`/${townId}`);
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4 z-50">
      <div 
        ref={modalRef}
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Search Input */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for your town..."
              className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Results */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            {searchTerm ? 'Search Results' : 'Most Frequently Searched'}
          </h3>
          
          <div className="space-y-2">
            {filteredTowns.map(town => (
              <button
                key={town.id}
                onClick={() => handleTownSelect(town.id as Town)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{town.name}</div>
                    <div className="text-sm text-gray-500">{town.reach}</div>
                  </div>
                </div>
                <span className="text-blue-600 text-sm">View →</span>
              </button>
            ))}
          </div>

          {searchTerm && filteredTowns.length === 0 && (
            <div className="text-center py-8">
              <Building2 className="w-12 h-12 text-blue-100 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                We're steadily growing and hope to be in your area soon!
              </h3>
              <p className="text-gray-500">
                Currently serving Tewksbury, Wilmington, Billerica, Andover, and North Andover
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}