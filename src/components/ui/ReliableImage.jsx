import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

/**
 * Ultra-reliable image component that never disappears once loaded
 * No lazy loading, no intersection observers - just reliable image display
 */
const ReliableImage = ({ 
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
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  const handleLoad = (e) => {
    setIsLoaded(true);
    
    // Mark as loaded for CSS targeting
    if (e.target) {
      e.target.setAttribute('data-loaded', 'true');
      e.target.classList.add('loaded');
      e.target.style.opacity = '1';
      e.target.style.visibility = 'visible';
    }
    
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  // Simple visibility fix - non-blocking
  useEffect(() => {
    if (imgRef.current && src) {
      imgRef.current.style.opacity = '1';
      imgRef.current.style.visibility = 'visible';
    }
  }, [src]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Placeholder - only show while loading */}
      {!isLoaded && !hasError && src && (
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

      {/* Actual Image - Always visible, no lazy loading */}
      {src && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={cn(
            'w-full h-full object-cover',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading="eager" // Always load immediately
          decoding="async"
          style={{
            opacity: '1', // Always visible
            visibility: 'visible', // Always visible
            display: 'block' // Always displayed
          }}
          {...props}
        />
      )}
    </div>
  );
};

export default ReliableImage;