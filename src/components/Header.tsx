import React from 'react';
import { Newspaper, Menu, X, MessageSquare, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleTextUsClick = () => {
    window.location.href = 'sms:6173948707';
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
            >
              <img
                src="/Spendlocal Logo.jpg"
                alt="SpendLocal"
                className="h-10 sm:h-12 w-auto"
              />
              <span className="font-bold text-lg sm:text-xl text-white">SpendLocal</span>
            </Link>
          </div>

          {/* Desktop navigation - Centered */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <Link
              to="/pricing"
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Pricing Chart</span>
            </Link>
          </div>

          {/* Right section */}
          <div className="hidden md:flex flex-1 items-center justify-end">
            <button 
              onClick={handleTextUsClick}
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Text Us: 617.394.8707</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 
                     hover:text-white hover:bg-gray-700 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="block h-6 w-6" />
            ) : (
              <Menu className="block h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/pricing"
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-300 
                     hover:text-white hover:bg-gray-700 rounded-md"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Pricing Chart
            </Link>
            <button
              onClick={handleTextUsClick}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-300 
                     hover:text-white hover:bg-gray-700 rounded-md"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Text Us: 617.394.8707
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};