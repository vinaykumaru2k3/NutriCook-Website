import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  placeholder,
  fallback,
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  const getWebPSrc = (originalSrc) => {
    if (!originalSrc || hasError) return null;
    
    // Convert common image formats to WebP
    if (originalSrc.includes('unsplash.com')) {
      return `${originalSrc}&fm=webp`;
    }
    
    // For local images, assume WebP versions exist
    if (originalSrc.startsWith('/images/')) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    
    return null;
  };

  const webpSrc = getWebPSrc(src);

  return (
    <div ref={imgRef} className={cn('relative overflow-hidden', className)}>
      {/* Placeholder/Skeleton */}
      {!isLoaded && !hasError && (
        <div className={cn(
          'absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center',
          className
        )}>
          {placeholder || (
            <div className="text-gray-400 text-sm">Loading...</div>
          )}
        </div>
      )}

      {/* Error Fallback */}
      {hasError && fallback && (
        <div className={cn('absolute inset-0 flex items-center justify-center bg-gray-100', className)}>
          {fallback}
        </div>
      )}

      {/* Actual Image */}
      {isInView && !hasError && (
        <picture>
          {webpSrc && (
            <source srcSet={webpSrc} type="image/webp" />
          )}
          <img
            src={src}
            alt={alt}
            className={cn(
              'transition-opacity duration-500',
              isLoaded ? 'opacity-100' : 'opacity-0',
              className
            )}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            {...props}
          />
        </picture>
      )}
    </div>
  );
};

export default LazyImage;