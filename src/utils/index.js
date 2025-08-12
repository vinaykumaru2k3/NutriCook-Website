// Export all utility functions for easy importing
export * from './cn';
export * from './scroll';
export * from './validation';
export * from './design-system';

// Re-export commonly used utilities with shorter names
export { cn, mergeClasses, conditionalClass, variantClass } from './cn';
export { 
  scrollToSection, 
  scrollToElement, 
  getActiveSection, 
  isInViewport,
  throttle,
  debounce 
} from './scroll';
export { 
  validateName, 
  validatePhone, 
  validateCity, 
  formatPhoneNumber 
} from './validation';
export { 
  breakpoints, 
  isBreakpoint, 
  getCurrentBreakpoint,
  formatCurrency,
  truncateText,
  generateId 
} from './design-system';