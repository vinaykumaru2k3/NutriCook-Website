// Responsive utility functions

/**
 * Generate responsive image srcSet for different screen sizes
 * @param {string} baseUrl - Base image URL
 * @param {Array} sizes - Array of sizes [width, height]
 * @returns {string} srcSet string
 */
export const generateSrcSet = (baseUrl, sizes = []) => {
  if (!sizes.length) {
    sizes = [
      [320, 240],   // Mobile
      [640, 480],   // Tablet
      [1024, 768],  // Desktop
      [1920, 1440]  // Large desktop
    ];
  }
  
  return sizes
    .map(([width, height]) => `${baseUrl}?w=${width}&h=${height} ${width}w`)
    .join(', ');
};

/**
 * Generate responsive image sizes attribute
 * @param {Object} breakpoints - Breakpoint configuration
 * @returns {string} sizes string
 */
export const generateSizes = (breakpoints = {}) => {
  const defaultBreakpoints = {
    mobile: '(max-width: 640px) 100vw',
    tablet: '(max-width: 1024px) 50vw',
    desktop: '33vw'
  };
  
  const config = { ...defaultBreakpoints, ...breakpoints };
  
  return Object.values(config).join(', ');
};

/**
 * Check if device is mobile based on screen width
 * @returns {boolean}
 */
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
};

/**
 * Check if device is tablet based on screen width
 * @returns {boolean}
 */
export const isTablet = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth > 768 && window.innerWidth <= 1024;
};

/**
 * Check if device is desktop based on screen width
 * @returns {boolean}
 */
export const isDesktop = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth > 1024;
};

/**
 * Get current breakpoint
 * @returns {string} Current breakpoint name
 */
export const getCurrentBreakpoint = () => {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
};

/**
 * Check if device supports touch
 * @returns {boolean}
 */
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Get optimal image dimensions for current viewport
 * @param {number} aspectRatio - Desired aspect ratio (width/height)
 * @returns {Object} Optimal dimensions
 */
export const getOptimalImageSize = (aspectRatio = 16/9) => {
  if (typeof window === 'undefined') return { width: 800, height: 450 };
  
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  
  let optimalWidth;
  
  if (viewport.width <= 640) {
    optimalWidth = Math.min(viewport.width * 0.9, 600);
  } else if (viewport.width <= 1024) {
    optimalWidth = Math.min(viewport.width * 0.7, 800);
  } else {
    optimalWidth = Math.min(viewport.width * 0.5, 1200);
  }
  
  return {
    width: Math.round(optimalWidth),
    height: Math.round(optimalWidth / aspectRatio)
  };
};

/**
 * Debounce function for resize events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 250) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for scroll events
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get safe area insets for devices with notches
 * @returns {Object} Safe area insets
 */
export const getSafeAreaInsets = () => {
  if (typeof window === 'undefined' || !CSS.supports('padding', 'env(safe-area-inset-top)')) {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
  
  const computedStyle = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-top)')) || 0,
    right: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-right)')) || 0,
    bottom: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-bottom)')) || 0,
    left: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-left)')) || 0
  };
};

/**
 * Responsive breakpoint utility for non-React components
 */
export const createResponsiveListener = (callback) => {
  const handleResize = debounce(() => {
    callback(getCurrentBreakpoint());
  }, 250);
  
  window.addEventListener('resize', handleResize);
  
  return () => window.removeEventListener('resize', handleResize);
};