import React from 'react';
import { DirectImageDisplay } from '../components/DirectImageDisplay';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Advertising Options
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Strategic Direct Delivery to Thousands of Local Homes and Businesses
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Premium Ad Space */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">Premium Ad Space</h3>
            <div className="text-3xl font-bold text-white mb-4">5.7" x 3.7"</div>
            <div className="text-xl text-blue-100 mb-6">
              As low as 8.5¢ per delivery
              <div className="text-sm">(Postage Included)</div>
            </div>
            <div className="space-y-4">
              <div className="text-blue-100">
                <div className="font-semibold mb-1">Perfect For</div>
                <div>Maximum visibility and brand impact</div>
              </div>
            </div>
          </div>

          {/* Standard Ad Space */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">Standard Ad Space</h3>
            <div className="text-3xl font-bold text-white mb-4">2.7" x 3.7"</div>
            <div className="text-xl text-purple-100 mb-6">
              As low as 4.7¢ per delivery
              <div className="text-sm">(Postage Included)</div>
            </div>
            <div className="space-y-4">
              <div className="text-purple-100">
                <div className="font-semibold mb-1">Perfect For</div>
                <div>Balanced visibility and value</div>
              </div>
            </div>
          </div>

          {/* Mini Ad Space */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">Mini Ad Space</h3>
            <div className="text-3xl font-bold text-white mb-4">2.7" x 1.7"</div>
            <div className="text-xl text-emerald-100 mb-6">
              As low as 3.0¢ per delivery
              <div className="text-sm">(Postage Included)</div>
            </div>
            <div className="space-y-4">
              <div className="text-emerald-100">
                <div className="font-semibold mb-1">Perfect For</div>
                <div>Essential messaging and offers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Layout */}
        <div className="mt-24 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Sample Layout</h2>
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <DirectImageDisplay 
              src="https://github.com/BexleyC/SpendLocalTewksbury/raw/refs/heads/main/SpendLocal%20Pricing%20Sheet"
              alt="SPENDLOCAL pricing sheet showing ad space layout and dimensions"
              className="w-full h-auto"
            />
          </div>
          <p className="mt-4 text-gray-300 text-sm text-center">
            Actual size: 9" x 12" - Professionally printed on high-quality card stock
          </p>
        </div>
      </div>
    </div>
  );
}