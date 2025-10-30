import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'SPENDLOCAL - Collaborative Advertising',
        short_name: 'SPENDLOCAL',
        description: 'Local advertising solutions for businesses in Northeastern Massachusetts',
        theme_color: '#1e293b',
        background_color: '#ffffff',
        display: 'standalone',
        icons: []
      }
    })
  ],
  build: {
    // Optimize build for performance
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react']
        }
      }
    }
  },
  server: {
    // Enable compression for faster loading
    compress: true
  }
});