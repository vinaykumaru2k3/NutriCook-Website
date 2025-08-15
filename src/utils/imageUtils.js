// Image utility functions for better image loading and error handling

/**
 * Preload an image and return a promise
 * @param {string} src - Image source URL
 * @returns {Promise} - Resolves when image loads, rejects on error
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * Check if an image exists and is accessible
 * @param {string} src - Image source URL
 * @returns {Promise<boolean>} - True if image exists, false otherwise
 */
export const imageExists = async (src) => {
  try {
    await preloadImage(src);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get optimized image path with fallbacks
 * @param {string} originalPath - Original image path
 * @returns {string} - Optimized image path
 */
export const getOptimizedImagePath = (originalPath) => {
  // Ensure path starts with /
  if (!originalPath.startsWith('/')) {
    originalPath = '/' + originalPath;
  }
  
  // Add cache busting for development
  if (import.meta.env.DEV) {
    const separator = originalPath.includes('?') ? '&' : '?';
    return `${originalPath}${separator}v=${Date.now()}`;
  }
  
  return originalPath;
};

/**
 * Create a fallback image element
 * @param {string} alt - Alt text for the image
 * @param {string} className - CSS classes
 * @returns {HTMLElement} - Fallback div element
 */
export const createFallbackElement = (alt, className = '') => {
  const fallback = document.createElement('div');
  fallback.className = `bg-gray-200 flex items-center justify-center text-gray-500 ${className}`;
  fallback.innerHTML = `
    <div class="text-center p-4">
      <div class="text-sm font-medium">${alt}</div>
      <div class="text-xs mt-1">Image unavailable</div>
    </div>
  `;
  return fallback;
};

/**
 * Enhanced image loading with retry logic
 * @param {HTMLImageElement} img - Image element
 * @param {string} src - Image source
 * @param {number} retries - Number of retries
 * @returns {Promise} - Promise that resolves when image loads
 */
export const loadImageWithRetry = (img, src, retries = 3) => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const attemptLoad = () => {
      attempts++;
      
      img.onload = () => {
        console.log(`Image loaded successfully: ${src}`);
        resolve(img);
      };
      
      img.onerror = () => {
        console.warn(`Image load attempt ${attempts} failed: ${src}`);
        
        if (attempts < retries) {
          // Wait a bit before retrying
          setTimeout(attemptLoad, 1000 * attempts);
        } else {
          console.error(`Image failed to load after ${retries} attempts: ${src}`);
          reject(new Error(`Failed to load image: ${src}`));
        }
      };
      
      // Set the source to trigger loading
      img.src = getOptimizedImagePath(src);
    };
    
    attemptLoad();
  });
};

/**
 * Force image visibility (nuclear option for stubborn images)
 * @param {HTMLImageElement} img - Image element
 */
export const forceImageVisibility = (img) => {
  if (!img) return;
  
  // Force visibility with !important styles
  img.style.setProperty('opacity', '1', 'important');
  img.style.setProperty('visibility', 'visible', 'important');
  img.style.setProperty('display', 'block', 'important');
  img.style.setProperty('max-width', '100%', 'important');
  img.style.setProperty('height', 'auto', 'important');
  
  // Remove any hiding classes
  img.classList.remove('opacity-0', 'invisible', 'hidden');
  img.classList.add('opacity-100', 'visible');
  
  // Set loading attributes
  img.loading = 'eager';
  img.decoding = 'sync';
};

/**
 * Initialize image monitoring for the entire page
 */
export const initImageMonitoring = () => {
  // Monitor all images on the page
  const monitorImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      forceImageVisibility(img);
      
      // Add error handling if not already present
      if (!img.dataset.errorHandled) {
        img.addEventListener('error', (e) => {
          console.error('Image failed to load:', e.target.src);
          // Try to reload once
          if (!e.target.dataset.retried) {
            e.target.dataset.retried = 'true';
            setTimeout(() => {
              e.target.src = e.target.src + (e.target.src.includes('?') ? '&' : '?') + 'retry=' + Date.now();
            }, 1000);
          }
        });
        img.dataset.errorHandled = 'true';
      }
    });
  };
  
  // Run immediately
  monitorImages();
  
  // Run on DOM changes
  const observer = new MutationObserver(monitorImages);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Run periodically as backup
  setInterval(monitorImages, 2000);
  
  // Run on scroll events
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(monitorImages, 100);
  });
  
  console.log('Image monitoring initialized');
};

// Auto-initialize in browser environment
if (typeof window !== 'undefined') {
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageMonitoring);
  } else {
    initImageMonitoring();
  }
}