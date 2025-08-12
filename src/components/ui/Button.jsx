import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    text: 'btn-text',
    ghost: 'btn-ghost',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg focus:ring-red-500',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg focus:ring-green-500',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-md hover:shadow-lg focus:ring-yellow-500',
  };

  const sizes = {
    xs: 'py-1.5 px-3 text-xs',
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
    xl: 'py-5 px-10 text-xl'
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    loading && 'cursor-not-allowed',
    className
  );

  const iconClass = cn(
    iconSizes[size],
    iconPosition === 'left' ? 'mr-2' : 'ml-2'
  );

  const renderIcon = () => {
    if (loading) {
      return (
        <svg 
          className={cn(iconClass, 'animate-spin')} 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      );
    }
    
    if (icon) {
      return <span className={iconClass}>{icon}</span>;
    }
    
    return null;
  };

  return (
    <button 
      ref={ref} 
      className={classes} 
      disabled={loading || props.disabled}
      {...props}
    >
      {iconPosition === 'left' && renderIcon()}
      <span className={loading ? 'opacity-0' : ''}>{children}</span>
      {iconPosition === 'right' && renderIcon()}
      
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            className={cn(iconSizes[size], 'animate-spin')} 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;