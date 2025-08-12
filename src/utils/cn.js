/**
 * Utility function to concatenate class names conditionally
 * Similar to clsx/classnames but lightweight
 */
export function cn(...classes) {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim();
}

/**
 * Utility function to merge Tailwind classes with proper precedence
 * Handles conflicting classes by keeping the last one
 */
export function mergeClasses(...classes) {
  const classArray = cn(...classes).split(' ');
  const classMap = new Map();
  
  // Group classes by their property (e.g., 'text-', 'bg-', 'p-', etc.)
  classArray.forEach(cls => {
    if (!cls) return;
    
    // Extract the property prefix (e.g., 'text' from 'text-red-500')
    const prefix = cls.split('-')[0];
    
    // For responsive prefixes (sm:, md:, lg:, xl:, 2xl:)
    const responsiveMatch = cls.match(/^(sm|md|lg|xl|2xl):/);
    if (responsiveMatch) {
      const responsivePrefix = responsiveMatch[1];
      const baseClass = cls.replace(`${responsivePrefix}:`, '');
      const basePrefix = baseClass.split('-')[0];
      const key = `${responsivePrefix}:${basePrefix}`;
      classMap.set(key, cls);
    } else {
      classMap.set(prefix, cls);
    }
  });
  
  return Array.from(classMap.values()).join(' ');
}

/**
 * Utility to create conditional class names
 */
export function conditionalClass(condition, trueClass, falseClass = '') {
  return condition ? trueClass : falseClass;
}

/**
 * Utility to create variant-based class names
 */
export function variantClass(variant, variants, defaultVariant = 'default') {
  return variants[variant] || variants[defaultVariant] || '';
}