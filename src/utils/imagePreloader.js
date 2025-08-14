/**
 * Image preloading utilities to ensure images load reliably
 */

// Cache for preloaded images
const imageCache = new Map();
const preloadPromises = new Map();

/**
 * Preload a single image
 * @param {string} src - Image source URL
 * @returns {Promise} - Promise that resolves when image is loaded
 */
export const preloadImage = (src) => {
  // Return cached promise if already preloading
  if (preloadPromises.has(src)) {
    return preloadPromises.get(src);
  }

  // Return resolved promise if already cached
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src));
  }

  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      imageCache.set(src, img);
      preloadPromises.delete(src);
      resolve(img);
    };
    
    img.onerror = () => {
      preloadPromises.delete(src);
      reject(new Error(`Failed to load image: ${src}`));
    };
    
    // Set crossOrigin for external images
    if (src.includes('unsplash.com') || src.startsWith('http')) {
      img.crossOrigin = 'anonymous';
    }
    
    img.src = src;
  });

  preloadPromises.set(src, promise);
  return promise;
};

/**
 * Preload multiple images
 * @param {string[]} sources - Array of image source URLs
 * @returns {Promise} - Promise that resolves when all images are loaded
 */
export const preloadImages = (sources) => {
  return Promise.allSettled(sources.map(preloadImage));
};

/**
 * Check if image is already cached
 * @param {string} src - Image source URL
 * @returns {boolean} - True if image is cached
 */
export const isImageCached = (src) => {
  return imageCache.has(src);
};

/**
 * Get cached image
 * @param {string} src - Image source URL
 * @returns {HTMLImageElement|null} - Cached image element or null
 */
export const getCachedImage = (src) => {
  return imageCache.get(src) || null;
};

/**
 * Preload critical images (hero, above-the-fold content)
 */
export const preloadCriticalImages = () => {
  const criticalImages = [
    // Hero background image
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    // Add other critical images here
  ];

  return preloadImages(criticalImages);
};

/**
 * Preload product images
 */
export const preloadProductImages = () => {
  const productImages = [
    '/images/products/Biryani pot 12 ltr.jpg',
    '/images/products/fish pot.jpg',
    '/images/products/casserole 3 ltr.jpg',
    '/images/products/casserole 2.2 ltr.jpg',
    '/images/products/multipurpose bowl.jpg',
    '/images/products/sauce pot.jpg'
  ];

  return preloadImages(productImages);
};

/**
 * Initialize image preloading on page load
 */
export const initImagePreloading = () => {
  // Preload critical images immediately
  preloadCriticalImages().then(() => {
    console.log('Critical images preloaded');
  }).catch((error) => {
    console.warn('Some critical images failed to preload:', error);
  });

  // Preload product images after a short delay
  setTimeout(() => {
    preloadProductImages().then(() => {
      console.log('Product images preloaded');
    }).catch((error) => {
      console.warn('Some product images failed to preload:', error);
    });
  }, 1000);
};

/**
 * Create optimized image URL for external services
 * @param {string} src - Original image URL
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized image URL
 */
export const optimizeImageUrl = (src, options = {}) => {
  const { width, height, quality = 80, format } = options;

  if (src.includes('unsplash.com')) {
    let optimizedUrl = src;
    
    // Add width parameter
    if (width) {
      optimizedUrl = optimizedUrl.includes('?') 
        ? `${optimizedUrl}&w=${width}` 
        : `${optimizedUrl}?w=${width}`;
    }
    
    // Add height parameter
    if (height) {
      optimizedUrl = optimizedUrl.includes('?') 
        ? `${optimizedUrl}&h=${height}` 
        : `${optimizedUrl}?h=${height}`;
    }
    
    // Add quality parameter
    optimizedUrl = optimizedUrl.includes('?') 
      ? `${optimizedUrl}&q=${quality}` 
      : `${optimizedUrl}?q=${quality}`;
    
    // Add format parameter
    if (format) {
      optimizedUrl = optimizedUrl.includes('?') 
        ? `${optimizedUrl}&fm=${format}` 
        : `${optimizedUrl}?fm=${format}`;
    }
    
    return optimizedUrl;
  }

  return src;
};

export default {
  preloadImage,
  preloadImages,
  isImageCached,
  getCachedImage,
  preloadCriticalImages,
  preloadProductImages,
  initImagePreloading,
  optimizeImageUrl
};