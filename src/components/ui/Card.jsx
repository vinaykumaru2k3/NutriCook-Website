import { cn } from '../../utils/cn';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false, 
  interactive = false,
  padding = 'default',
  ...props 
}) => {
  const baseClasses = 'card-base';
  
  const variants = {
    default: '',
    elevated: 'shadow-medium',
    outlined: 'border-2 border-gray-200 shadow-none',
    ghost: 'bg-transparent border-none shadow-none',
    gradient: 'bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    paddingClasses[padding],
    hover && 'card-hover',
    interactive && 'card-interactive',
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', padding = 'default', ...props }) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4 pb-2',
    default: 'p-6 pb-4',
    lg: 'p-8 pb-6',
    xl: 'p-10 pb-8',
  };

  return (
    <div className={cn(paddingClasses[padding], className)} {...props}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className = '', padding = 'default', ...props }) => {
  const paddingClasses = {
    none: '',
    sm: 'px-4 pb-4',
    default: 'px-6 pb-6',
    lg: 'px-8 pb-8',
    xl: 'px-10 pb-10',
  };

  return (
    <div className={cn(paddingClasses[padding], className)} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = '', padding = 'default', ...props }) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4 pt-2',
    default: 'p-6 pt-4',
    lg: 'p-8 pt-6',
    xl: 'p-10 pt-8',
  };

  return (
    <div className={cn(paddingClasses[padding], className)} {...props}>
      {children}
    </div>
  );
};

const CardImage = ({ src, alt, className = '', aspectRatio = 'video', ...props }) => {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-portrait',
  };

  return (
    <div className={cn('overflow-hidden', aspectClasses[aspectRatio])}>
      <img 
        src={src} 
        alt={alt} 
        className={cn('w-full h-full object-cover', className)} 
        {...props} 
      />
    </div>
  );
};

const CardTitle = ({ children, className = '', 
  // eslint-disable-next-line no-unused-vars
  as: Component = 'h3', ...props }) => {
  return (
    <Component className={cn('heading-3 mb-2', className)} {...props}>
      {children}
    </Component>
  );
};

const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={cn('body-text', className)} {...props}>
      {children}
    </p>
  );
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Image = CardImage;
Card.Title = CardTitle;
Card.Description = CardDescription;

export default Card;