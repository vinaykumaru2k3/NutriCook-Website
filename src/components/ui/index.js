// Export all UI components for easy importing
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Container } from './Container';

// Re-export with named exports for convenience
import ButtonComponent from './Button';
import CardComponent from './Card';
import ContainerComponent from './Container';

export {
  ButtonComponent as ButtonAlt,
  CardComponent as CardAlt,
  ContainerComponent as ContainerAlt,
  // Container sub-components
  ContainerComponent as Section,
  ContainerComponent as Grid,
  ContainerComponent as Flex,
};