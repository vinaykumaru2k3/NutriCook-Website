import { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { generateSrcSet, generateSizes, getOptimalImageSize } from '../../utils/responsive';

const ResponsiveImage = ({
  src,
  alt,
  className = '',
  aspectRatio = 16/9,
  sizes,
  priority = false,
  placeholder = true,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [optimalSize, setOptimalSize] = useState({ width: 800, height: 450 });

  useEffect(() => {
    const updateOptimalSize = () => {
      setOptimalSize(getOptimalImageSize(aspectRatio));
    };

    updateOptimalSize();
    window.addEventListener('resize', updateOptimalSize);
    return () => window.removeEventListener('resize', updateOptimalSize);
  }, [aspectRatio]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
    
    // Set fallback image
    e.target.src = `https://via.placeholder.com/${optimalSize.width}x${optimalSize.height}/f3f4f6/6b7280?text=${encodeURIComponent(alt || 'Image')}`;
  };

  const imageSizes = sizes || generateSizes({
    mobile: '(max-width: 640px) 100vw',
    tablet: '(max-width: 1024px) 50vw',
    desktop: '33vw'
  });

  const srcSet = src.includes('placeholder') ? undefined : generateSrcSet(src);

  return (
    <div className={cn('relative overflow-hidden', className)} {...props}>
      {/* Placeholder/Loading state */}
      {placeholder && !isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ aspectRatio }}
        >
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main image */}
      <img
        src={src}
        alt={alt}
        srcSet={srcSet}
        sizes={imageSizes}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          hasError && 'opacity-100'
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{ aspectRatio }}
      />

      {/* Error state overlay */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveImage;