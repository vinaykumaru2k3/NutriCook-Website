import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { preloadImage, isImageCached, optimizeImageUrl } from '../../utils/imagePreloader';

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  placeholder,
  fallback,
  onLoad,
  onError,
  priority = false, // New prop for critical images
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Priority images load immediately
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(priority ? src : null); // Preload priority images
  const [hasBeenLoaded, setHasBeenLoaded] = useState(false); // Track if image was ever loaded
  const imgRef = useRef(null);

  useEffect(() => {
    // DISABLE LAZY LOADING COMPLETELY - Load all images immediately
    // This prevents any scroll-related disappearing issues
    setIsInView(true);
    setImgSrc(src);
    
    // No intersection observer - just load everything immediately
    // This is more reliable than lazy loading for this use case
  }, [src]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    setHasBeenLoaded(true); // Mark as having been loaded
    
    // Add data attribute to mark as loaded for CSS targeting
    if (e.target) {
      e.target.setAttribute('data-loaded', 'true');
      e.target.classList.add('loaded');
    }
    
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  // Improved WebP detection and fallback
  const getWebPSrc = (originalSrc) => {
    if (!originalSrc || hasError) return null;
    
    // Convert Unsplash images to WebP
    if (originalSrc.includes('unsplash.com')) {
      return `${originalSrc}&fm=webp`;
    }
    
    // Skip WebP for local images to avoid 404 errors
    // Only use WebP if we're certain the file exists
    return null;
  };

  const webpSrc = getWebPSrc(imgSrc);

  // Preload critical images using the preloader utility
  useEffect(() => {
    if (priority && imgSrc) {
      // Check if image is already cached
      if (isImageCached(imgSrc)) {
        setIsLoaded(true);
        return;
      }

      // Preload the image
      preloadImage(imgSrc)
        .then(() => {
          setIsLoaded(true);
          setHasBeenLoaded(true);
        })
        .catch(() => {
          setHasError(true);
        });
    }
  }, [priority, imgSrc]);

  // Optimize image URL for better performance
  const optimizedSrc = imgSrc ? optimizeImageUrl(imgSrc, {
    width: priority ? 2070 : 800, // Higher resolution for priority images
    quality: priority ? 85 : 80,
    format: 'webp'
  }) : null;

  return (
    <div ref={imgRef} className={cn('relative overflow-hidden', className)}>
      {/* Placeholder/Skeleton - Only show if not loaded and not errored */}
      {!isLoaded && !hasError && imgSrc && (
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
      {hasError && (
        <div className={cn('absolute inset-0 flex items-center justify-center bg-gray-100', className)}>
          {fallback || (
            <div className="text-gray-500 text-sm">Image unavailable</div>
          )}
        </div>
      )}

      {/* Actual Image - Always render when we have a source */}
      {imgSrc && !hasError && (
        <picture>
          {optimizedSrc && optimizedSrc !== imgSrc && (
            <source srcSet={optimizedSrc} type="image/webp" />
          )}
          <img
            src={imgSrc}
            alt={alt}
            className={cn(
              'w-full h-full object-cover',
              // Once loaded, always keep visible - no more opacity transitions that cause flickering
              hasBeenLoaded ? 'opacity-100' : (isLoaded ? 'opacity-100' : 'opacity-0'),
              'transition-opacity duration-300',
              className
            )}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? "eager" : "lazy"} // Priority images load eagerly
            decoding="async"
            fetchPriority={priority ? "high" : "auto"} // Browser hint for priority
            style={{
              // Force visibility for images that have been loaded
              opacity: hasBeenLoaded ? '1' : undefined,
              visibility: hasBeenLoaded ? 'visible' : undefined
            }}
            {...props}
          />
        </picture>
      )}

      {/* Fallback for when no image source is available yet */}
      {!imgSrc && !hasError && (
        <div className={cn(
          'absolute inset-0 bg-gray-100 flex items-center justify-center',
          className
        )}>
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;