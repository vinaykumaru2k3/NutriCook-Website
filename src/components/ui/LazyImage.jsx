import { useState } from 'react';
import { cn } from '../../utils/cn';

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  placeholder,
  fallback,
  onLoad,
  onError,
  priority = false,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  // Ultra-simple image component - just show the image
  return (
    <img
      src={src}
      alt={alt}
      className={cn('w-full h-full object-cover', className)}
      onLoad={handleLoad}
      onError={handleError}
      loading="eager"
      decoding="async"
      style={{
        opacity: 1,
        visibility: 'visible',
        display: 'block'
      }}
      {...props}
    />
  );
};

export default LazyImage;