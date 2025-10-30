import React, { useState, useEffect } from 'react';
import { ArrowLeft, Scissors, Tag, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHelmet } from '../components/SEOHelmet';

export function WilmingtonCoupons() {
  const [currentMonth, setCurrentMonth] = useState('');
  
  useEffect(() => {
    // Get current month name
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const now = new Date();
    setCurrentMonth(monthNames[now.getMonth()]);
  }, []);

  const coupons = [
    {
      id: 1,
      business: "Wilmington House of Pizza",
      offer: "10% Off Any Order Over $30",
      code: "WILMINGTON10",
      expiry: "July 31, 2025",
      description: "Valid for dine-in, takeout, or delivery. Cannot be combined with other offers.",
      logo: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Food"
    },
    {
      id: 2,
      business: "Wilmington Auto Repair",
      offer: "Free Tire Rotation with Oil Change",
      code: "FREETIRES",
      expiry: "August 15, 2025",
      description: "Must present coupon at time of service. Valid for most vehicles.",
      logo: "https://images.unsplash.com/photo-1599256621730-535171e28e50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Automotive"
    },
    {
      id: 3,
      business: "Wilmington Flowers & Gifts",
      offer: "15% Off Any Arrangement",
      code: "BLOOM15",
      expiry: "June 30, 2025",
      description: "Valid on in-store purchases only. Not valid for delivery or special events.",
      logo: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Retail"
    },
    {
      id: 4,
      business: "Clean & Bright Laundromat",
      offer: "$5 Off Wash & Fold Service",
      code: "WASH5",
      expiry: "September 30, 2025",
      description: "Minimum 10 lbs. One coupon per customer per visit.",
      logo: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Services"
    },
    {
      id: 5,
      business: "Wilmington Fitness Center",
      offer: "One Week Free Trial",
      code: "FITWEEK",
      expiry: "December 31, 2025",
      description: "New members only. Must be 18 years or older with valid ID.",
      logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Health & Fitness"
    },
    {
      id: 6,
      business: "Wilmington Bagel Shop",
      offer: "Buy 6 Bagels, Get 3 Free",
      code: "BAGEL3FREE",
      expiry: "July 15, 2025",
      description: "Valid any day before 11am. Free bagels must be of equal or lesser value.",
      logo: "https://images.unsplash.com/photo-1585478259715-4ddc711c9a2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Food"
    }
  ];

  const categories = [...new Set(coupons.map(coupon => coupon.category))];
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCoupons = coupons.filter(coupon => {
    const matchesCategory = activeCategory ? coupon.category === activeCategory : true;
    const matchesSearch = coupon.business.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          coupon.offer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-900">
      <SEOHelmet 
        town="wilmington" 
        pageTitle={`${currentMonth} Coupons for Wilmington, MA | SPENDLOCAL`}
        pageDescription={`Exclusive deals and discounts from Wilmington businesses for ${currentMonth}. Save money while supporting your local community.`}
      />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center text-center">
            <Link to="/wilmington" className="flex items-center text-white hover:text-blue-200 transition-colors mb-6">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Wilmington
            </Link>
            <h1 className="text-4xl font-bold mb-4">{currentMonth} Coupons for Wilmington, MA</h1>
            <p className="text-xl max-w-2xl">Exclusive deals from local businesses delivered directly to you</p>
            
            {/* Search bar */}
            <div className="mt-8 w-full max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for deals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                           text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-100"
                  onClick={() => setSearchTerm('')}
                >
                  {searchTerm && 'Clear'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category filters */}
      <div className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 py-4 overflow-x-auto scrollbar-hide">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                        ${activeCategory === null 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
              onClick={() => setActiveCategory(null)}
            >
              All Deals
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                          ${activeCategory === category 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Coupons grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredCoupons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoupons.map(coupon => (
              <div key={coupon.id} className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700">
                <div className="h-40 bg-gray-700 relative overflow-hidden">
                  <img 
                    src={coupon.logo} 
                    alt={coupon.business} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg">
                    {coupon.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white">{coupon.business}</h3>
                    <Scissors className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  <p className="mt-3 text-lg font-semibold text-blue-400">{coupon.offer}</p>
                  <p className="mt-2 text-sm text-gray-300">{coupon.description}</p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-300">Code: {coupon.code}</span>
                      </div>
                      <div className="text-sm text-gray-400">Expires: {coupon.expiry}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white">No coupons found</h3>
            <p className="mt-2 text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      
      {/* Call to action for businesses */}
      <div className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">Stay Local, Support Local, Spend Local</h3>
            </div>
            <h2 className="text-3xl font-bold mb-4">Are you a local business?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Feature your deals and promotions here to reach thousands of local customers.
            </p>
            <Link 
              to="/wilmington"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg 
                       hover:bg-blue-700 transition-colors"
            >
              Learn More About Advertising
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold">SPENDLOCAL WILMINGTON</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 Spend Local Wilmington. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}