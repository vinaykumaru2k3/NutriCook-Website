// Performance monitoring utilities for Core Web Vitals

// Measure and report Core Web Vitals
export const measureCoreWebVitals = () => {
  // Only run in production and if the browser supports the APIs
  if (import.meta.env.DEV || typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  const measureLCP = () => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        console.log('LCP:', lastEntry.startTime);
        
        // Report to analytics service
        reportMetric('LCP', lastEntry.startTime);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  };

  // First Input Delay (FID)
  const measureFID = () => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fid = entry.processingStart - entry.startTime;
          console.log('FID:', fid);
          
          // Report to analytics service
          reportMetric('FID', fid);
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    }
  };

  // Cumulative Layout Shift (CLS)
  const measureCLS = () => {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        console.log('CLS:', clsValue);
        
        // Report to analytics service
        reportMetric('CLS', clsValue);
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  };

  // Time to First Byte (TTFB)
  const measureTTFB = () => {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        console.log('TTFB:', ttfb);
        
        // Report to analytics service
        reportMetric('TTFB', ttfb);
      }
    }
  };

  // Initialize measurements
  measureLCP();
  measureFID();
  measureCLS();
  measureTTFB();
};

// Report metrics to analytics service (placeholder)
const reportMetric = (name, value) => {
  // In a real application, you would send this to your analytics service
  // Example: Google Analytics, DataDog, New Relic, etc.
  
  if (import.meta.env.DEV) {
    console.log(`Performance Metric - ${name}:`, value);
  }
  
  // Example implementation for Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'web_vital', {
      name,
      value: Math.round(value),
      event_category: 'Web Vitals'
    });
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    // Preload critical fonts
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' },
    
    // Preload hero image
    { href: '/images/hero-background.jpg', as: 'image' },
    { href: '/images/hero-background.webp', as: 'image' },
    
    // Preload critical product images
    { href: '/images/products/biriyani-pot-12l.webp', as: 'image' },
    { href: '/images/products/complete-set.webp', as: 'image' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.as === 'style') {
      link.onload = function() { this.rel = 'stylesheet'; };
    }
    document.head.appendChild(link);
  });
};

// Optimize images with intersection observer
export const optimizeImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Load high-quality version when in viewport
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          // Load WebP version if supported
          if (img.dataset.srcWebp && supportsWebP()) {
            img.src = img.dataset.srcWebp;
            img.removeAttribute('data-src-webp');
          }
          
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Check WebP support
export const supportsWebP = () => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// Prefetch next page resources
export const prefetchResources = (urls) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      urls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      });
    });
  }
};

// Measure component render time
export const measureComponentRender = (componentName, renderFn) => {
  if (import.meta.env.DEV) {
    const startTime = performance.now();
    const result = renderFn();
    const endTime = performance.now();
    
    console.log(`${componentName} render time:`, endTime - startTime, 'ms');
    
    return result;
  }
  
  return renderFn();
};

// Debounce function for performance optimization
export const debounce = (func, wait) => {
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

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  // Wait for page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      measureCoreWebVitals();
      preloadCriticalResources();
      optimizeImages();
    });
  } else {
    measureCoreWebVitals();
    preloadCriticalResources();
    optimizeImages();
  }
};