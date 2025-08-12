import { forwardRef } from 'react';
import { useAnimatedRef } from '../../hooks/useAnimations';
import { cn } from '../../utils/cn';

const AnimatedSection = forwardRef(({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0, 
  className = '',
  as: Component = 'div',
  ...props 
}, ref) => {
  const animatedRef = useAnimatedRef(animation, delay);
  const elementRef = ref || animatedRef;

  return (
    <Component
      ref={elementRef}
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

export default AnimatedSection;