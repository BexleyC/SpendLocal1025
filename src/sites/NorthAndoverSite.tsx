import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, Target, Ticket } from 'lucide-react';
import { Header } from '../components/Header';
import { Town } from '../App';
import { Link } from 'react-router-dom';
import { DirectImageDisplay } from '../components/DirectImageDisplay';
import { ContactForm } from '../components/ContactForm';

interface NorthAndoverSiteProps {
  onTownChange: (town: Town) => void;
}

export default function NorthAndoverSite({ onTownChange }: NorthAndoverSiteProps) {
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900">
        <div 
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1580758523066-c9d2235c0e50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Header onTownChange={onTownChange} />
            
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              <span className="block text-2xl font-medium mb-4 text-blue-400">
                Shared Ad Space for Businesses Located in:
              </span>
              North Andover, MA
              <span className="block text-2xl font-medium mt-4 text-blue-400">
                9x12 Postcards Delivered to ~10,000 Homes/Businesses Every Month
              </span>
            </h1>

            {/* Ad Slots Heading */}
            <h2 className="mt-12 text-3xl font-bold text-white">
              Check Out Our Ad Slot Options
            </h2>

            {/* Reserve Button */}
            <button
              onClick={() => setShowContactForm(true)}
              className="mt-6 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-lg
                       hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl
                       transform hover:scale-105"
            >
              Reserve Your Spot
            </button>

            {/* Pricing Boxes */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Premium Ad Slot */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2">Premium Ad Slot</h3>
                <div className="text-sm text-blue-200 mb-1">As low as</div>
                <div className="text-4xl font-bold text-white mb-2">$0.085</div>
                <div className="text-sm text-blue-200 mb-2">per door</div>
                <div className="text-blue-200 font-medium">5.7" x 3.7"</div>
                <div className="mt-4 text-sm text-blue-100">
                  Maximum visibility with our largest ad space
                </div>
              </div>

              {/* Standard Ad Slot */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2">Standard Ad Slot</h3>
                <div className="text-sm text-purple-200 mb-1">As low as</div>
                <div className="text-4xl font-bold text-white mb-2">$0.047</div>
                <div className="text-sm text-purple-200 mb-2">per door</div>
                <div className="text-purple-200 font-medium">2.7" x 3.7"</div>
                <div className="mt-4 text-sm text-purple-100">
                  Perfect balance of size and value
                </div>
              </div>

              {/* Mini Ad Slot */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2">Mini Ad Slot</h3>
                <div className="text-sm text-emerald-200 mb-1">As low as</div>
                <div className="text-4xl font-bold text-white mb-2">$0.03</div>
                <div className="text-sm text-emerald-200 mb-2">per door</div>
                <div className="text-emerald-200 font-medium">2.7" x 1.7"</div>
                <div className="mt-4 text-sm text-emerald-100">
                  Compact size for essential messaging
                </div>
              </div>
            </div>

            {/* Postcard Preview */}
            <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">An Innovative Design That Can Not Be Ignored</h2>
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <DirectImageDisplay 
                  src="https://github.com/BexleyC/SpendLocalTewksbury/raw/refs/heads/main/SLTEWKS%20FULL%20MOCK"
                  alt="SPENDLOCAL 9x12 postcard design showing ad space layout"
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-4 text-gray-300 text-sm">
                Actual size: 9" x 12" - Professionally printed on high-quality card stock
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
            <div className="flex flex-col bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <Users className="h-12 w-12 text-blue-400" />
              <h3 className="mt-4 text-xl font-semibold text-white">Targeted Local Reach</h3>
              <p className="mt-4 text-gray-300">
                Direct delivery to ~10,000 North Andover, MA homes and businesses every month, ensuring your message reaches your local customer base.
              </p>
            </div>
            <div className="flex flex-col bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <TrendingUp className="h-12 w-12 text-blue-400" />
              <h3 className="mt-4 text-xl font-semibold text-white">Cost-Effective Impact</h3>
              <p className="mt-4 text-gray-300">
                Premium visibility at competitive rates, maximizing your advertising ROI through our collaborative model.
              </p>
            </div>
            <div className="flex flex-col bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <Target className="h-12 w-12 text-blue-400" />
              <h3 className="mt-4 text-xl font-semibold text-white">Category Exclusive Advertising</h3>
              <p className="mt-4 text-gray-300">
                There will only be one Breakfast Restaurant, One Roofer, One Plumber, One Italian Restaurant, One Drycleaner, etc on each mailing. The business with the ad spot in that category will retain first right of refusal.
              </p>
            </div>
          </div>

          {/* Local Coupons Button */}
          <div className="flex justify-center py-8">
            <Link 
              to="/northandover-coupons"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg 
                       hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover -shadow-xl"
            >
              <Ticket className="w-6 h-6 mr-3" />
              View Local Coupons
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-blue-400 text-4xl font-bold tracking-wider">SPENDLOCAL</span>
              <span className="text-white text-4xl font-bold tracking-wider">NORTH ANDOVER, MA</span>
            </div>
            <div className="text-center">
              <span className="text-gray-400">9x12 Postcards Delivered to ~10,000 Homes/Businesses Every Month</span>
            </div>
            <p className="text-gray-500 text-sm mt-8">
              © 2025 Spend Local North Andover. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} townName="North Andover" />
      )}
    </div>
  );
}