import React from 'react';
import { ArrowLeft, Download, Printer, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHelmet } from '../components/SEOHelmet';

export function QRCodePage() {
  const towns = [
    {
      name: 'Tewksbury',
      path: '/tewksbury-coupons',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://spendlocal.net/tewksbury-coupons',
      color: 'bg-blue-600'
    },
    {
      name: 'Wilmington',
      path: '/wilmington-coupons',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://spendlocal.net/wilmington-coupons',
      color: 'bg-green-600'
    },
    {
      name: 'Billerica',
      path: '/billerica-coupons',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://spendlocal.net/billerica-coupons',
      color: 'bg-purple-600'
    },
    {
      name: 'Andover',
      path: '/andover-coupons',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://spendlocal.net/andover-coupons',
      color: 'bg-red-600'
    },
    {
      name: 'North Andover',
      path: '/northandover-coupons',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://spendlocal.net/northandover-coupons',
      color: 'bg-amber-600'
    }
  ];

  const downloadQRCode = (url: string, townName: string) => {
    const link = document.createElement('a');
    link.href = url; link.download = `${townName.replace(' ', '-')}-Coupons-QR-Code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printQRCode = (townName: string) => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHelmet 
        town={null} 
        pageTitle="Local Coupon QR Codes | SPENDLOCAL"
        pageDescription="Scan these QR codes to access exclusive local deals and coupons from businesses in your community."
      />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center text-center">
            <Link to="/" className="flex items-center text-white hover:text-blue-200 transition-colors mb-6">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-4">Local Coupon QR Codes</h1>
            <p className="text-xl max-w-2xl">
              Scan these QR codes with your smartphone camera to access exclusive local deals and coupons
            </p>
          </div>
        </div>
      </div>
      
      {/* QR Code Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {towns.map((town) => (
            <div key={town.name} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className={`${town.color} py-4 px-6`}>
                <h2 className="text-2xl font-bold text-white">{town.name} Coupons</h2>
              </div>
              
              <div className="p-6 flex flex-col items-center">
                <div className="bg-white p-3 rounded-lg shadow-md mb-6">
                  <img 
                    src={town.qrCodeUrl} 
                    alt={`QR Code for ${town.name} Coupons`}
                    className="w-48 h-48"
                  />
                </div>
                
                <p className="text-gray-600 text-center mb-6">
                  Scan this code to access exclusive deals from local {town.name} businesses
                </p>
                
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => downloadQRCode(town.qrCodeUrl, town.name)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                  
                  <button
                    onClick={() => printQRCode(town.name)}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </button>
                  
                  <Link
                    to={town.path}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    View Coupons
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Instructions Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">How to Use QR Codes</h2>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <ol className="space-y-6">
                <li className="flex items-start">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex-shrink-0 mr-4">1</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Open your camera app</h3>
                    <p className="text-gray-600 mt-1">Most modern smartphones have built-in QR code scanners in the default camera app.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex-shrink-0 mr-4">2</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Point camera at QR code</h3>
                    <p className="text-gray-600 mt-1">Hold your phone so the QR code appears in the viewfinder.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex-shrink-0 mr-4">3</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Tap the notification</h3>
                    <p className="text-gray-600 mt-1">Your phone will recognize the QR code and show a notification to open the link.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex-shrink-0 mr-4">4</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Browse and save coupons</h3>
                    <p className="text-gray-600 mt-1">Explore local deals and save your favorites to use when shopping locally.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold">SPENDLOCAL</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 Spend Local. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}