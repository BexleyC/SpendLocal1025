import React, { useState, useEffect } from 'react';
import { storage } from '../lib/firebase';
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { useAuth } from '../context/AuthContext';
import { Image as ImageIcon, Trash2, Download, AlertCircle } from 'lucide-react';

export function SavedGraphics() {
  const { user } = useAuth();
  const [images, setImages] = useState<Array<{ name: string; url: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadImages = async () => {
      try {
        const storageRef = ref(storage, `users/${user.uid}/saved-graphics`);
        const result = await listAll(storageRef);
        
        const imagePromises = result.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return {
            name: item.name,
            url
          };
        });

        const loadedImages = await Promise.all(imagePromises);
        setImages(loadedImages);
        setError(null);
      } catch (err) {
        console.error('Error loading images:', err);
        setError('Failed to load saved graphics');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [user]);

  const handleDelete = async (imageName: string) => {
    if (!user || !window.confirm('Are you sure you want to delete this image?')) return;

    try {
      const imageRef = ref(storage, `users/${user.uid}/saved-graphics/${imageName}`);
      await deleteObject(imageRef);
      setImages(prev => prev.filter(img => img.name !== imageName));
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Failed to delete image');
    }
  };

  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Error downloading image:', err);
      setError('Failed to download image');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p>{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No Graphics Yet</h3>
        <p className="text-gray-500 mt-1">Upload some graphics to see them here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <div key={image.name} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="aspect-video bg-gray-100 relative">
            <img
              src={image.url}
              alt={image.name}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="p-4">
            <p className="font-medium text-gray-900 truncate" title={image.name}>
              {image.name}
            </p>
            
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => handleDownload(image.url, image.name)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(image.name)}
                className="p-2 text-red-600 hover:text-red-700 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}