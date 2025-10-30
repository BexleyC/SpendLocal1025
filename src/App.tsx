import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SEOHelmet } from './components/SEOHelmet';
import { Header } from './components/Header';
import LandingSite from './sites/LandingSite';
import PricingPage from './sites/PricingPage.tsx';

export type Town = 'wilmington' | 'tewksbury' | 'billerica' | 'andover' | 'northandover' | null;

function App() {
  return (
    <Router>
      <SEOHelmet town={null} />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Header />
              <main className="pt-16">
                <LandingSite />
              </main>
            </>
          } />
          
          <Route path="/pricing" element={
            <>
              <Header />
              <main className="pt-16">
                <PricingPage />
              </main>
            </>
          } />
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;