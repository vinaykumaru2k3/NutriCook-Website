import { useEffect, useRef, useCallback } from 'react';
import { 
  ScrollAnimationObserver, 
  smoothScrollTo, 
  addButtonHoverAnimation,
  addInputFocusAnimation,
  addCardHoverAnimation,
  prefersReducedMotion,
  ANIMATION_CONFIG
} from '../utils/animations';

// Hook for scroll-triggered animations
export const useScrollAnimation = (options = {}) => {
  const observerRef = useRef(null);
  const elementsRef = useRef(new Set());

  useEffect(() => {
    observerRef.current = new ScrollAnimationObserver(options);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const observe = useCallback((element) => {
    if (observerRef.current && element) {
      observerRef.current.observe(element);
      elementsRef.current.add(element);
    }
  }, []);

  const unobserve = useCallback((element) => {
    if (observerRef.current && element) {
      observerRef.current.unobserve(element);
      elementsRef.current.delete(element);
    }
  }, []);

  return { observe, unobserve };
};

// Hook for element ref with scroll animation
export const useAnimatedRef = (animationType = 'fadeInUp', delay = 0) => {
  const ref = useRef(null);
  const { observe } = useScrollAnimation();

  useEffect(() => {
    if (ref.current) {
      ref.current.dataset.animation = animationType;
      ref.current.dataset.delay = delay.toString();
      observe(ref.current);
    }
  }, [animationType, delay, observe]);

  return ref;
};

// Hook for smooth scrolling
export const useSmoothScroll = () => {
  const scrollTo = useCallback((target, options = {}) => {
    smoothScrollTo(target, options);
  }, []);

  return { scrollTo };
};

// Hook for button animations
export const useButtonAnimation = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      addButtonHoverAnimation(buttonRef.current);
    }
  }, []);

  return buttonRef;
};

// Hook for input animations
export const useInputAnimation = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      addInputFocusAnimation(inputRef.current);
    }
  }, []);

  return inputRef;
};

// Hook for card animations
export const useCardAnimation = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      addCardHoverAnimation(cardRef.current);
    }
  }, []);

  return cardRef;
};

// Hook for loading animations
export const useLoadingAnimation = (isLoading) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current;
      
      if (isLoading) {
        element.style.opacity = '0.7';
        element.style.transform = 'scale(0.98)';
        element.style.transition = `all ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}`;
        if (element.tagName === 'BUTTON') {
          element.disabled = true;
        }
      } else {
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
        if (element.tagName === 'BUTTON') {
          element.disabled = false;
        }
      }
    }
  }, [isLoading]);

  return elementRef;
};

// Hook for stagger animations
export const useStaggerAnimation = (count, delay = 150) => {
  const containerRef = useRef(null);
  const { observe } = useScrollAnimation();

  useEffect(() => {
    if (containerRef.current) {
      const children = containerRef.current.children;
      Array.from(children).forEach((child, index) => {
        child.dataset.animation = 'fadeInUp';
        child.dataset.delay = (index * delay).toString();
        observe(child);
      });
    }
  }, [count, delay, observe]);

  return containerRef;
};

// Hook for navigation scroll behavior
export const useNavigationScroll = () => {
  const navRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !navRef.current) return;

    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateNavigation = () => {
      const currentScrollY = window.pageYOffset;
      const nav = navRef.current;
      
      if (!nav) return;

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          nav.style.transform = 'translateY(-100%)';
        } else {
          // Scrolling up
          nav.style.transform = 'translateY(0)';
        }
        nav.style.backdropFilter = 'blur(12px)';
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      } else {
        nav.style.transform = 'translateY(0)';
        nav.style.backdropFilter = 'none';
        nav.style.backgroundColor = 'transparent';
        nav.style.boxShadow = 'none';
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavigation);
        ticking = true;
      }
    };

    // Set initial transition
    if (navRef.current) {
      navRef.current.style.transition = `all ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}`;
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', requestTick);
    };
  }, []);

  return navRef;
};

// Hook for form submission animations
export const useFormAnimation = () => {
  const formRef = useRef(null);

  const animateSubmission = useCallback((isSubmitting) => {
    if (!formRef.current) return;

    const form = formRef.current;
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (isSubmitting) {
      form.style.opacity = '0.8';
      form.style.pointerEvents = 'none';
      if (submitButton) {
        submitButton.style.transform = 'scale(0.98)';
      }
    } else {
      form.style.opacity = '1';
      form.style.pointerEvents = 'auto';
      if (submitButton) {
        submitButton.style.transform = 'scale(1)';
      }
    }
  }, []);

  const animateSuccess = useCallback(() => {
    if (!formRef.current) return;

    const form = formRef.current;
    form.style.transform = 'scale(1.02)';
    
    setTimeout(() => {
      form.style.transform = 'scale(1)';
    }, 200);
  }, []);

  const animateError = useCallback(() => {
    if (!formRef.current || prefersReducedMotion()) return;

    const form = formRef.current;
    form.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
      form.style.animation = '';
    }, 500);
  }, []);

  return {
    formRef,
    animateSubmission,
    animateSuccess,
    animateError
  };
};

// Hook for parallax effects
export const useParallax = (speed = 0.5) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !elementRef.current) return;

    let ticking = false;

    const updateParallax = () => {
      if (elementRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        elementRef.current.style.transform = `translateY(${rate}px)`;
      }
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', requestTick);
    };
  }, [speed]);

  return elementRef;
};

// Hook for intersection observer with callback
export const useIntersectionObserver = (callback, options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    });

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return elementRef;
};