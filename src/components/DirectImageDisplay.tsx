import React, { useState } from 'react';

interface DirectImageDisplayProps {
  src: string;
  alt: string;
  className?: string;
}

export const DirectImageDisplay: React.FC<DirectImageDisplayProps> = ({
  src,
  alt,
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return null;
  }

  return (
    <div className={`relative w-full ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <span className="sr-only">Loading image: {alt}</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-auto object-contain transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};