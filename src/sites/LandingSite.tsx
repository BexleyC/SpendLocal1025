import React, { useEffect } from 'react';
import { Users, TrendingUp, Target, DollarSign } from 'lucide-react';
import { DirectImageDisplay } from '../components/DirectImageDisplay';
import { Link } from 'react-router-dom';

export function LandingSite() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: 'url("https://www.worldatlas.com/r/w960-q80/upload/31/42/30/shutterstock-1878690619.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)'
          }}
          aria-hidden="true"
        />
        
        {/* Content positioned above the background */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-10 sm:pb-24 lg:py-40">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mt-10 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400">
                Big, Bold and Beautiful.
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-8 text-gray-200">
              One Giant Postcard Delivered to Every Mailbox in Your Area.
            </p>
            <div className="mt-10">
              <button
                onClick={() => {
                  const element = document.getElementById('features');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg
                         hover:bg-blue-50 transition-colors duration-300 shadow-xl
                         hover:shadow-2xl hover:scale-105 transform"
                aria-label="Learn more about our advertising solutions"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" aria-hidden="true" />
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">
              Why advertise in <span className="text-amber-400">Envelopes</span> and <span className="text-amber-400">Magazines</span> that no one ever opens?
            </p>
            <p className="mt-4 text-xl text-gray-300 text-center font-bold">
              SpendLocal offers an "in your face" solution that's too big to ignore at a price so affordable you can't say no.
            </p>

            {/* Pricing Chart Button */}
            <Link
              to="/pricing"
              className="inline-flex items-center px-8 py-4 mt-8 bg-gradient-to-r from-blue-500 to-cyan-500
                       text-white font-bold rounded-lg hover:from-blue-600 hover:to-cyan-600
                       transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <DollarSign className="w-6 h-6 mr-2" />
              See our Pricing Chart Here
            </Link>
          </div>
        </div>

        {/* Full Width Image Section - Breaking out of container */}
        <div className="mt-12 px-2 sm:px-4 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <img
              src="/spendlocal-landing.png"
              alt="SPENDLOCAL advertising example showing the full layout of the direct mail piece"
              className="w-full h-auto rounded-lg shadow-2xl"
              width="2000"
              height="1505"
              loading="eager"
              decoding="async"
              fetchpriority="high"
              style={{
                maxWidth: '100%',
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
                aspectRatio: '2000/1505'
              }}
            />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-12 sm:mt-16 lg:mt-20">
            <dl className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
              {[
                {
                  icon: Users,
                  title: 'Community Focus',
                  description: 'Strategic Direct Delivery to Thousands of Local Homes and Businesses, ensuring your message reaches your target audience.'
                },
                {
                  icon: TrendingUp,
                  title: 'Cost-Effective Impact',
                  description: 'Share the cost of advertising with other local businesses through our front-page-focused postcard campaigns.'
                },
                {
                  icon: Target,
                  title: 'Category Exclusive Advertising',
                  description: 'Be the exclusive business in your category—one roofer, one plumber, one restaurant per mailing. Renew first or let it go!'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="relative bg-gray-800/50 rounded-2xl p-6 sm:p-8"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <feature.icon className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                    {feature.title}
                  </dt>
                  <dd className="mt-4 text-base leading-7 text-gray-300">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">© 2025 Spend Local. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingSite;