import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  placeholderColor?: string;
  preserveAspectRatio?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderColor = '#f3f4f6',
  preserveAspectRatio = true,
  objectFit = 'contain'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px 0px', // Load images 200px before they come into view
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleImageError = () => {
    console.error(`Failed to load image: ${src}`);
    setError(true);
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width || '100%',
        height: typeof height === 'number' ? `${height}px` : height || 'auto',
        backgroundColor: placeholderColor,
        maxWidth: '100%'
      }}
    >
      {isInView && !error && (
        <>
          <img
            src={src}
            alt={alt}
            className={`w-full transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              objectFit,
              maxWidth: '100%',
              height: preserveAspectRatio ? 'auto' : '100%'
            }}
            onLoad={() => setIsLoaded(true)}
            onError={handleImageError}
            loading="lazy"
          />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
              <span className="sr-only">Loading image: {alt}</span>
            </div>
          )}
        </>
      )}
      
      {error && (
        <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-500 p-4 text-center">
          <span>Image could not be loaded</span>
        </div>
      )}
    </div>
  );
};