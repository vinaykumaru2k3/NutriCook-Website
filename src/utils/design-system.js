/**
 * Design System Utilities
 * Centralized utilities for consistent design implementation
 */

/**
 * Breakpoint utilities
 */
export const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1600,
};

/**
 * Check if current screen size matches breakpoint
 */
export const isBreakpoint = (breakpoint) => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints[breakpoint];
};

/**
 * Get current breakpoint
 */
export const getCurrentBreakpoint = () => {
  if (typeof window === 'undefined') return 'sm';
  
  const width = window.innerWidth;
  
  if (width >= breakpoints['3xl']) return '3xl';
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

/**
 * Spacing utilities
 */
export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  '3xl': '3rem',    // 48px
  '4xl': '4rem',    // 64px
  '5xl': '6rem',    // 96px
  section: '6rem',  // 96px
  'section-sm': '4rem', // 64px
};

/**
 * Color utilities
 */
export const colors = {
  primary: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

/**
 * Typography utilities
 */
export const typography = {
  fontSizes: {
    'hero': '3.5rem',
    'hero-sm': '2.5rem',
    'h1': '2.5rem',
    'h1-sm': '2rem',
    'h2': '2rem',
    'h2-sm': '1.75rem',
    'h3': '1.5rem',
    'h3-sm': '1.25rem',
    'body-lg': '1.125rem',
    'body': '1rem',
    'body-sm': '0.875rem',
    'caption': '0.75rem',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.1,
    snug: 1.2,
    normal: 1.3,
    relaxed: 1.4,
    loose: 1.6,
  },
};

/**
 * Animation utilities
 */
export const animations = {
  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  easings: {
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

/**
 * Shadow utilities
 */
export const shadows = {
  soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  medium: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  large: '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  glow: '0 0 20px rgba(249, 115, 22, 0.3)',
};

/**
 * Generate responsive class names
 */
export const responsive = (classes) => {
  if (typeof classes === 'string') return classes;
  
  return Object.entries(classes)
    .map(([breakpoint, className]) => {
      if (breakpoint === 'default') return className;
      return `${breakpoint}:${className}`;
    })
    .join(' ');
};

/**
 * Generate component variants
 */
export const createVariants = (baseClasses, variants) => {
  return (variant = 'default') => {
    const variantClasses = variants[variant] || variants.default || '';
    return `${baseClasses} ${variantClasses}`.trim();
  };
};

/**
 * Generate size variants
 */
export const createSizes = (sizes) => {
  return (size = 'md') => {
    return sizes[size] || sizes.md || '';
  };
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format phone number for display
 */
export const formatPhoneDisplay = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Generate random ID for components
 */
export const generateId = (prefix = 'id') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get optimal image size based on container width
 */
export const getOptimalImageSize = (containerWidth) => {
  if (containerWidth <= 400) return 400;
  if (containerWidth <= 800) return 800;
  if (containerWidth <= 1200) return 1200;
  return 1600;
};

/**
 * Create CSS custom properties object
 */
export const createCSSProperties = (properties) => {
  return Object.entries(properties).reduce((acc, [key, value]) => {
    acc[`--${key}`] = value;
    return acc;
  }, {});
};

/**
 * Focus management utilities
 */
export const focusManagement = {
  trapFocus: (element) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  },

  restoreFocus: (previousElement) => {
    if (previousElement && typeof previousElement.focus === 'function') {
      previousElement.focus();
    }
  },
};

/**
 * Accessibility utilities
 */
export const a11y = {
  announceToScreenReader: (message) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  generateAriaLabel: (text, context) => {
    return context ? `${text}, ${context}` : text;
  },
};