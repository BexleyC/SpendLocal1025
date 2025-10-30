import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Loader2, AlertCircle, Image as ImageIcon, Upload, FileText } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

export function ClientDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Netlify Identity
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', (user: any) => {
        setUser(user);
        setLoading(false);
      });

      window.netlifyIdentity.on('login', (user: any) => {
        setUser(user);
        navigate('/dashboard');
      });

      window.netlifyIdentity.on('logout', () => {
        setUser(null);
        navigate('/');
      });
    }
  }, [navigate]);

  // If not logged in, show login modal
  useEffect(() => {
    if (!loading && !user) {
      window.netlifyIdentity.open('login');
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Login modal will be shown by Netlify Identity
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user.user_metadata.full_name || user.email}
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-600 ml-11">
            Manage your ad spaces and graphics
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => window.netlifyIdentity.open('user')}
            className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4 text-left">
                <h3 className="font-semibold text-gray-900">Account Settings</h3>
                <p className="text-sm text-gray-600">Update your profile information</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setShowUploadModal(true)}
            className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Upload className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4 text-left">
                <h3 className="font-semibold text-gray-900">Upload Graphics</h3>
                <p className="text-sm text-gray-600">Add new artwork</p>
              </div>
            </div>
          </button>

          <button className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4 text-left">
                <h3 className="font-semibold text-gray-900">View Invoices</h3>
                <p className="text-sm text-gray-600">Access your billing history</p>
              </div>
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your Graphics</h2>
          </div>
          
          <div className="p-6">
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No Graphics Yet</h3>
              <p className="mt-2 text-gray-500">Upload some graphics to see them here</p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload Graphics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showUploadModal && (
        <ImageUploader onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
}