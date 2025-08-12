/**
 * Animation utilities for smooth interactions and scroll-triggered animations
 */

// Animation configuration
export const ANIMATION_CONFIG = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 800
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  stagger: {
    short: 100,
    medium: 150,
    long: 200
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

// Intersection Observer for scroll animations
export class ScrollAnimationObserver {
  constructor(options = {}) {
    this.defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
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
    const duration = parseInt(element.dataset.duration) || ANIMATION_CONFIG.duration.slower;
    
    // Apply animation with delay
    setTimeout(() => {
      element.classList.add('animate-in');
      element.style.setProperty('--animation-duration', `${getAnimationDuration(duration)}ms`);
      
      // Trigger custom animation based on type
      switch (animationType) {
        case 'fadeInUp':
          this.fadeInUp(element);
          break;
        case 'fadeInLeft':
          this.fadeInLeft(element);
          break;
        case 'fadeInRight':
          this.fadeInRight(element);
          break;
        case 'scaleIn':
          this.scaleIn(element);
          break;
        case 'slideInUp':
          this.slideInUp(element);
          break;
        default:
          this.fadeInUp(element);
      }
    }, delay);
  }

  fadeInUp(element) {
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
    duration = 800,
    easing = ANIMATION_CONFIG.easing.easeInOut
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

// Initialize all animations
export const initializeAnimations = () => {
  // Create scroll animation observer
  const scrollObserver = new ScrollAnimationObserver();
  
  // Observe all elements with data-animation attribute
  const animatedElements = document.querySelectorAll('[data-animation]');
  animatedElements.forEach(element => {
    scrollObserver.observe(element);
  });
  
  // Add button hover animations
  const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
  buttons.forEach(addButtonHoverAnimation);
  
  // Add input focus animations
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(addInputFocusAnimation);
  
  // Add card hover animations
  const cards = document.querySelectorAll('.card, [data-card]');
  cards.forEach(addCardHoverAnimation);
  
  // Add navigation animation
  const navigation = document.querySelector('nav, [data-navigation]');
  if (navigation) {
    addNavigationAnimation(navigation);
  }
  
  return {
    scrollObserver,
    destroy: () => {
      scrollObserver.disconnect();
    }
  };
};

// React hook for animations
export const useScrollAnimation = (ref, options = {}) => {
  const { current: observer } = useRef(new ScrollAnimationObserver(options));
  
  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, observer]);
  
  return observer;
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