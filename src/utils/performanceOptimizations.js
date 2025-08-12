// Comprehensive performance optimizations for NutriCook website

// Critical resource preloading
export const preloadCriticalResources = () => {
  const criticalResources = [
    // Critical fonts
    {
      href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous'
    },
    // Hero background image
    {
      href: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80&fm=webp',
      as: 'image'
    }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
    document.head.appendChild(link);
  });
};

// DNS prefetching for external resources
export const prefetchDNS = () => {
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://images.unsplash.com'
  ];

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

// Optimize images with intersection observer
export const optimizeImageLoading = () => {
  if (!('IntersectionObserver' in window)) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Load WebP if supported, fallback to original
        if (img.dataset.srcWebp && supportsWebP()) {
          img.src = img.dataset.srcWebp;
        } else if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  // Observe all lazy images
  document.querySelectorAll('img[data-src], img[data-src-webp]').forEach(img => {
    imageObserver.observe(img);
  });
};

// Check WebP support
export const supportsWebP = () => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// Optimize scroll performance
export const optimizeScrolling = () => {
  let ticking = false;
  
  const updateScrollElements = () => {
    // Update scroll-dependent elements
    const scrollY = window.pageYOffset;
    
    // Update navigation background
    const nav = document.querySelector('nav');
    if (nav) {
      nav.classList.toggle('scrolled', scrollY > 50);
    }
    
    // Update scroll indicator
    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
      indicator.style.opacity = scrollY > 100 ? '0' : '1';
    }
    
    ticking = false;
  };
  
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollElements);
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', onScroll, { passive: true });
};

// Optimize animations with Intersection Observer
export const optimizeAnimations = () => {
  if (!('IntersectionObserver' in window)) return;

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  });

  // Observe elements with animation classes
  document.querySelectorAll('.fade-in-up, .animate-on-scroll').forEach(el => {
    animationObserver.observe(el);
  });
};

// Optimize form performance
export const optimizeFormPerformance = () => {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    // Debounce form validation
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      let timeout;
      
      input.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          // Validate input
          validateInput(input);
        }, 300);
      });
    });
  });
};

// Input validation helper
const validateInput = (input) => {
  const value = input.value.trim();
  const type = input.type;
  let isValid = true;
  let message = '';

  // Basic validation
  if (input.required && !value) {
    isValid = false;
    message = 'This field is required';
  } else if (type === 'email' && value && !isValidEmail(value)) {
    isValid = false;
    message = 'Please enter a valid email address';
  } else if (type === 'tel' && value && !isValidPhone(value)) {
    isValid = false;
    message = 'Please enter a valid phone number';
  }

  // Update UI
  input.classList.toggle('invalid', !isValid);
  input.classList.toggle('valid', isValid && value);
  
  const errorElement = input.parentElement.querySelector('.error-message');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = message ? 'block' : 'none';
  }
};

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (Indian format)
const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[0-9]{10,13}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Optimize third-party scripts
export const optimizeThirdPartyScripts = () => {
  // Lazy load non-critical third-party scripts
  const lazyScripts = [
    // Add any third-party scripts here
  ];

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // Load scripts after page interaction
  const loadThirdPartyScripts = () => {
    lazyScripts.forEach(src => {
      loadScript(src).catch(err => {
        console.warn('Failed to load script:', src, err);
      });
    });
  };

  // Load on first user interaction
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
  const loadOnce = () => {
    loadThirdPartyScripts();
    events.forEach(event => {
      document.removeEventListener(event, loadOnce, { passive: true });
    });
  };

  events.forEach(event => {
    document.addEventListener(event, loadOnce, { passive: true });
  });
};

// Memory optimization
export const optimizeMemoryUsage = () => {
  // Clean up event listeners on page unload
  window.addEventListener('beforeunload', () => {
    // Remove all event listeners
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      el.removeEventListener?.();
    });
  });

  // Optimize image memory usage
  const optimizeImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Unload images that are far from viewport
      const rect = img.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight + 1000 && rect.bottom > -1000;
      
      if (!isVisible && img.src) {
        img.dataset.originalSrc = img.src;
        img.src = '';
      } else if (isVisible && img.dataset.originalSrc) {
        img.src = img.dataset.originalSrc;
        delete img.dataset.originalSrc;
      }
    });
  };

  // Run optimization periodically
  setInterval(optimizeImages, 5000);
};

// Bundle size optimization
export const optimizeBundleSize = () => {
  // Dynamic imports for heavy components
  const loadHeavyComponent = async (componentName) => {
    try {
      const module = await import(`../components/${componentName}.jsx`);
      return module.default;
    } catch (error) {
      console.error(`Failed to load component: ${componentName}`, error);
      return null;
    }
  };

  // Expose for use in components
  window.loadHeavyComponent = loadHeavyComponent;
};

// Initialize all performance optimizations
export const initAllOptimizations = () => {
  // Run immediately
  prefetchDNS();
  preloadCriticalResources();
  
  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizeImageLoading();
      optimizeScrolling();
      optimizeAnimations();
      optimizeFormPerformance();
      optimizeThirdPartyScripts();
      optimizeMemoryUsage();
      optimizeBundleSize();
    });
  } else {
    optimizeImageLoading();
    optimizeScrolling();
    optimizeAnimations();
    optimizeFormPerformance();
    optimizeThirdPartyScripts();
    optimizeMemoryUsage();
    optimizeBundleSize();
  }
};

// Performance monitoring integration
export const monitorPerformance = () => {
  // Import and initialize performance monitoring
  import('./performanceTest.js').then(({ initPerformanceMonitoring }) => {
    initPerformanceMonitoring();
  });
};

// Main initialization function
export const initPerformanceOptimizations = () => {
  initAllOptimizations();
  
  if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING) {
    monitorPerformance();
  }
};