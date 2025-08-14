/**
 * Animation utilities for smooth interactions and scroll-triggered animations
 */

// Animation configuration - More subtle and reliable
export const ANIMATION_CONFIG = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 400,
    slower: 500  // Reduced from 800ms
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  stagger: {
    short: 50,   // Reduced from 100ms
    medium: 75,  // Reduced from 150ms
    long: 100    // Reduced from 200ms
  }
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get animation duration based on user preference
export const getAnimationDuration = (duration) => {
  return prefersReducedMotion() ? 0 : duration;
};

// Intersection Observer for scroll animations - More reliable
export class ScrollAnimationObserver {
  constructor(options = {}) {
    this.defaultOptions = {
      threshold: 0.05,  // Reduced threshold for earlier trigger
      rootMargin: '50px 0px 0px 0px',  // Trigger earlier, more forgiving
      ...options
    };
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.defaultOptions
    );
    
    this.animatedElements = new Set();
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
        this.animateElement(entry.target);
        this.animatedElements.add(entry.target);
      }
    });
  }

  animateElement(element) {
    const animationType = element.dataset.animation || 'fadeInUp';
    const delay = parseInt(element.dataset.delay) || 0;
    const duration = parseInt(element.dataset.duration) || ANIMATION_CONFIG.duration.normal;
    
    // Ensure element is visible first (fallback)
    element.style.opacity = '1';
    element.style.visibility = 'visible';
    
    // Apply subtle animation with delay
    setTimeout(() => {
      element.classList.add('animate-in');
      element.style.setProperty('--animation-duration', `${getAnimationDuration(duration)}ms`);
      
      // Trigger subtle animation based on type
      switch (animationType) {
        case 'fadeInUp':
          this.subtleFadeInUp(element);
          break;
        case 'fadeInLeft':
          this.subtleFadeInLeft(element);
          break;
        case 'fadeInRight':
          this.subtleFadeInRight(element);
          break;
        case 'scaleIn':
          this.subtleScaleIn(element);
          break;
        case 'slideInUp':
          this.subtleSlideInUp(element);
          break;
        default:
          this.subtleFadeInUp(element);
      }
    }, Math.min(delay, 200)); // Cap delay at 200ms
  }

  // Subtle animation methods
  subtleFadeInUp(element) {
    element.style.transition = `opacity ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}, transform ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}`;
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }

  subtleFadeInLeft(element) {
    element.style.transition = `opacity ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}, transform ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}`;
    element.style.opacity = '1';
    element.style.transform = 'translateX(0)';
  }

  subtleFadeInRight(element) {
    element.style.transition = `opacity ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}, transform ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}`;
    element.style.opacity = '1';
    element.style.transform = 'translateX(0)';
  }

  subtleScaleIn(element) {
    element.style.transition = `opacity ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}, transform ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}`;
    element.style.opacity = '1';
    element.style.transform = 'scale(1)';
  }

  subtleSlideInUp(element) {
    element.style.transition = `opacity ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}, transform ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}`;
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }

  fadeInLeft(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateX(0)';
  }

  fadeInRight(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateX(0)';
  }

  scaleIn(element) {
    element.style.opacity = '1';
    element.style.transform = 'scale(1)';
  }

  slideInUp(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }

  observe(element) {
    // Set initial state based on animation type
    const animationType = element.dataset.animation || 'fadeInUp';
    this.setInitialState(element, animationType);
    
    this.observer.observe(element);
  }

  setInitialState(element, animationType) {
    const duration = parseInt(element.dataset.duration) || ANIMATION_CONFIG.duration.slower;
    
    element.style.transition = `all ${getAnimationDuration(duration)}ms ${ANIMATION_CONFIG.easing.ease}`;
    
    switch (animationType) {
      case 'fadeInUp':
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        break;
      case 'fadeInLeft':
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        break;
      case 'fadeInRight':
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        break;
      case 'scaleIn':
        element.style.opacity = '0';
        element.style.transform = 'scale(0.9)';
        break;
      case 'slideInUp':
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        break;
    }
  }

  unobserve(element) {
    this.observer.unobserve(element);
    this.animatedElements.delete(element);
  }

  disconnect() {
    this.observer.disconnect();
    this.animatedElements.clear();
  }
}

// Stagger animation utility
export const staggerAnimation = (elements, delay = ANIMATION_CONFIG.stagger.medium) => {
  elements.forEach((element, index) => {
    element.dataset.delay = (index * delay).toString();
  });
};

// Button hover animation utility
export const addButtonHoverAnimation = (button) => {
  if (prefersReducedMotion()) return;

  button.style.transition = `all ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}`;
  
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '';
  });
  
  button.addEventListener('mousedown', () => {
    button.style.transform = 'translateY(0) scale(0.98)';
  });
  
  button.addEventListener('mouseup', () => {
    button.style.transform = 'translateY(-2px) scale(1)';
  });
};

// Form input focus animation
export const addInputFocusAnimation = (input) => {
  if (prefersReducedMotion()) return;

  input.style.transition = `all ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}`;
  
  input.addEventListener('focus', () => {
    input.style.transform = 'scale(1.02)';
    input.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
  });
  
  input.addEventListener('blur', () => {
    input.style.transform = 'scale(1)';
    input.style.boxShadow = '';
  });
};

// Loading animation for buttons
export const addLoadingAnimation = (button, isLoading) => {
  if (isLoading) {
    button.style.opacity = '0.7';
    button.style.transform = 'scale(0.98)';
    button.disabled = true;
  } else {
    button.style.opacity = '1';
    button.style.transform = 'scale(1)';
    button.disabled = false;
  }
};

// Smooth scroll with custom easing
export const smoothScrollTo = (target, options = {}) => {
  const {
    offset = 80,
    duration = 800
  } = options;

  const element = typeof target === 'string' 
    ? document.getElementById(target) || document.querySelector(target)
    : target;

  if (!element) return;

  const targetPosition = element.offsetTop - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  // Easing function
  const ease = (t) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / getAnimationDuration(duration), 1);
    
    const easedProgress = prefersReducedMotion() ? 1 : ease(progress);
    window.scrollTo(0, startPosition + distance * easedProgress);
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

// Parallax scroll effect
export const addParallaxEffect = (element, speed = 0.5) => {
  if (prefersReducedMotion()) return;

  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -speed;
    element.style.transform = `translateY(${rate}px)`;
  };

  window.addEventListener('scroll', updateParallax);
  return () => window.removeEventListener('scroll', updateParallax);
};

// Card hover animation
export const addCardHoverAnimation = (card) => {
  if (prefersReducedMotion()) return;

  card.style.transition = `all ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}`;
  
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px) scale(1.02)';
    card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = '';
  });
};

// Navigation animation
export const addNavigationAnimation = (nav) => {
  if (prefersReducedMotion()) return;

  let lastScrollY = window.pageYOffset;
  
  const updateNavigation = () => {
    const currentScrollY = window.pageYOffset;
    
    if (currentScrollY > 100) {
      nav.style.transform = currentScrollY > lastScrollY ? 'translateY(-100%)' : 'translateY(0)';
      nav.style.backdropFilter = 'blur(12px)';
      nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
      nav.style.transform = 'translateY(0)';
      nav.style.backdropFilter = 'none';
      nav.style.backgroundColor = 'transparent';
    }
    
    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', updateNavigation);
  return () => window.removeEventListener('scroll', updateNavigation);
};

// Initialize all animations with reliability safeguards
export const initializeAnimations = () => {
  // Ensure all content is visible first (critical fix)
  const ensureContentVisible = () => {
    const allElements = document.querySelectorAll('[data-animation], .animate-on-scroll');
    allElements.forEach(element => {
      element.style.opacity = '1';
      element.style.visibility = 'visible';
    });
  };
  
  // Run immediately and after delays as fallbacks
  ensureContentVisible();
  setTimeout(ensureContentVisible, 100);
  setTimeout(ensureContentVisible, 500);
  
  // Create scroll animation observer
  const scrollObserver = new ScrollAnimationObserver();
  
  // Observe all elements with data-animation attribute
  const animatedElements = document.querySelectorAll('[data-animation]');
  animatedElements.forEach(element => {
    // Ensure element is visible before observing
    element.style.opacity = '1';
    element.style.visibility = 'visible';
    scrollObserver.observe(element);
  });
  
  // Add button hover animations (non-critical)
  try {
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    buttons.forEach(addButtonHoverAnimation);
  } catch (e) {
    console.warn('Button animations failed:', e);
  }
  
  // Add input focus animations (non-critical)
  try {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(addInputFocusAnimation);
  } catch (e) {
    console.warn('Input animations failed:', e);
  }
  
  // Add card hover animations (non-critical)
  try {
    const cards = document.querySelectorAll('.card, [data-card]');
    cards.forEach(addCardHoverAnimation);
  } catch (e) {
    console.warn('Card animations failed:', e);
  }
  
  // Add navigation animation (non-critical)
  try {
    const navigation = document.querySelector('nav:not([data-no-hide]), [data-navigation]');
    if (navigation) {
      addNavigationAnimation(navigation);
    }
  } catch (e) {
    console.warn('Navigation animations failed:', e);
  }
  
  // Final fallback timer to ensure all content is visible
  const fallbackTimer = setTimeout(() => {
    const stillHidden = document.querySelectorAll('[data-animation]:not(.animate-in)');
    stillHidden.forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      element.style.visibility = 'visible';
      element.classList.add('animate-in');
    });
  }, 2000);
  
  return {
    scrollObserver,
    destroy: () => {
      scrollObserver.disconnect();
      clearTimeout(fallbackTimer);
    }
  };
};

// Scroll animation utility (non-React version)
export const createScrollAnimation = (element, options = {}) => {
  const observer = new ScrollAnimationObserver(options);
  
  if (element) {
    observer.observe(element);
  }
  
  return {
    destroy: () => {
      if (element) {
        observer.unobserve(element);
      }
    }
  };
};

// Simple CSS-based animation system (no JavaScript dependencies)
export const initSimpleAnimations = () => {
  // Add CSS animation classes to elements on page load
  const addSimpleAnimations = () => {
    // Hero section elements
    const heroElements = document.querySelectorAll('.hero-section [data-animation]');
    heroElements.forEach((element, index) => {
      element.classList.add('animate-css-fade-in');
      element.classList.add(`animate-css-stagger-${Math.min(index + 1, 4)}`);
    });
    
    // All other animated elements
    const otherElements = document.querySelectorAll('[data-animation]:not(.hero-section [data-animation])');
    otherElements.forEach((element, index) => {
      // Add animation with a slight delay based on scroll position
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        element.classList.add('animate-css-fade-in');
      } else {
        // Add animation when element comes into view
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-css-fade-in');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1, rootMargin: '50px' });
        
        observer.observe(element);
      }
    });
  };
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSimpleAnimations);
  } else {
    addSimpleAnimations();
  }
  
  // Fallback: ensure all content is visible after 1 second
  setTimeout(() => {
    const allElements = document.querySelectorAll('[data-animation], .animate-on-scroll');
    allElements.forEach(element => {
      element.style.opacity = '1';
      element.style.visibility = 'visible';
      element.style.transform = 'translateY(0)';
    });
  }, 1000);
};

// Animation presets
export const ANIMATION_PRESETS = {
  fadeInUp: {
    initial: { opacity: 0, transform: 'translateY(30px)' },
    animate: { opacity: 1, transform: 'translateY(0)' }
  },
  fadeInLeft: {
    initial: { opacity: 0, transform: 'translateX(-30px)' },
    animate: { opacity: 1, transform: 'translateX(0)' }
  },
  fadeInRight: {
    initial: { opacity: 0, transform: 'translateX(30px)' },
    animate: { opacity: 1, transform: 'translateX(0)' }
  },
  scaleIn: {
    initial: { opacity: 0, transform: 'scale(0.9)' },
    animate: { opacity: 1, transform: 'scale(1)' }
  },
  slideInUp: {
    initial: { opacity: 0, transform: 'translateY(50px)' },
    animate: { opacity: 1, transform: 'translateY(0)' }
  }
};