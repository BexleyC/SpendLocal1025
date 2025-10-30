import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from './components/ErrorBoundary';

// Register service worker for PWA
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);

// Add structured data for rich results
const addStructuredData = () => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'SPENDLOCAL',
    'url': 'https://spendlocal.net',
    'logo': 'https://spendlocal.net/logo.png',
    'description': 'Collaborative advertising solutions for local businesses in Northeastern Massachusetts',
    'areaServed': [
      'Wilmington, MA',
      'Tewksbury, MA',
      'Billerica, MA',
      'Andover, MA',
      'North Andover, MA'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer service',
      'email': 'info@spendlocal.net'
    }
  });
  document.head.appendChild(script);
};

// Add structured data after the page loads
window.addEventListener('load', addStructuredData);