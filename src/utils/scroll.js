/**
 * Smooth scroll to section with customizable offset
 */
export const scrollToSection = (sectionId, offset = 80) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementTop = element.offsetTop - offset;
    window.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    });
  }
};

/**
 * Smooth scroll to element with more options
 */
export const scrollToElement = (element, options = {}) => {
  const {
    offset = 80,
    behavior = 'smooth',
    block = 'start',
    inline = 'nearest'
  } = options;

  if (typeof element === 'string') {
    element = document.getElementById(element) || document.querySelector(element);
  }

  if (element) {
    const elementTop = element.offsetTop - offset;
    window.scrollTo({
      top: elementTop,
      behavior
    });
  }
};

/**
 * Get current active section based on scroll position
 */
export const getActiveSection = (sections, offset = 100) => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  
  // Special case: if we're near the bottom of the page, return the last section
  if (scrollPosition + windowHeight >= document.documentElement.scrollHeight - 100) {
    return sections[sections.length - 1];
  }
  
  // Find the section that's currently most in view
  let activeSection = sections[0];
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i]);
    if (!section) continue;
    
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + scrollPosition;
    
    // If the section top is above the current scroll position (plus offset), it's active
    if (sectionTop <= scrollPosition + offset) {
      activeSection = sections[i];
      break;
    }
  }
  
  return activeSection;
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element, threshold = 0) => {
  if (typeof element === 'string') {
    element = document.getElementById(element) || document.querySelector(element);
  }
  
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= windowHeight + threshold &&
    rect.right <= windowWidth + threshold
  );
};

/**
 * Check if element is partially in viewport
 */
export const isPartiallyInViewport = (element, threshold = 0.1) => {
  if (typeof element === 'string') {
    element = document.getElementById(element) || document.querySelector(element);
  }
  
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const elementHeight = rect.height;
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  
  return visibleHeight > elementHeight * threshold;
};

/**
 * Get scroll progress (0 to 1)
 */
export const getScrollProgress = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  return scrollHeight > 0 ? scrollTop / scrollHeight : 0;
};

/**
 * Get element scroll progress (0 to 1)
 */
export const getElementScrollProgress = (element) => {
  if (typeof element === 'string') {
    element = document.getElementById(element) || document.querySelector(element);
  }
  
  if (!element) return 0;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const elementTop = rect.top;
  const elementHeight = rect.height;
  
  if (elementTop > windowHeight) return 0;
  if (elementTop + elementHeight < 0) return 1;
  
  const visibleTop = Math.max(0, -elementTop);
  const visibleHeight = Math.min(elementHeight, windowHeight - Math.max(0, elementTop));
  
  return visibleTop / elementHeight;
};

/**
 * Throttle function for scroll events
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Debounce function for scroll events
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Scroll to top of page
 */
export const scrollToTop = (behavior = 'smooth') => {
  window.scrollTo({
    top: 0,
    behavior
  });
};

/**
 * Lock/unlock body scroll (useful for modals)
 */
export const lockScroll = () => {
  document.body.style.overflow = 'hidden';
};

export const unlockScroll = () => {
  document.body.style.overflow = '';
};

/**
 * Custom hook for scroll-based animations
 */
export const useScrollAnimation = () => {
  const observeElements = (selector, callback, options = {}) => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        callback(entry.target, entry.isIntersecting, entry);
      });
    }, defaultOptions);

    const elements = document.querySelectorAll(selector);
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  };

  return { observeElements };
};

/**
 * Parallax scroll effect
 */
export const parallaxScroll = (element, speed = 0.5) => {
  if (typeof element === 'string') {
    element = document.getElementById(element) || document.querySelector(element);
  }
  
  if (!element) return;

  const scrolled = window.pageYOffset;
  const parallax = scrolled * speed;
  
  element.style.transform = `translateY(${parallax}px)`;
};

/**
 * Initialize scroll animations for elements with data-animate attribute
 */
export const initScrollAnimations = () => {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        
        // Add stagger delay if specified
        const staggerDelay = entry.target.dataset.staggerDelay;
        if (staggerDelay) {
          entry.target.style.setProperty('--stagger-delay', `${staggerDelay}ms`);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  return () => {
    animatedElements.forEach(el => observer.unobserve(el));
  };
};