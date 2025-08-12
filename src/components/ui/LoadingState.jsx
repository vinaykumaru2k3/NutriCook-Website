import { cn } from '../../utils/cn';

const LoadingState = ({ 
  size = 'md', 
  variant = 'spinner',
  className,
  text = 'Loading...'
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  if (variant === 'spinner') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <div className="flex flex-col items-center space-y-2">
          <div className={cn(
            'animate-spin rounded-full border-2 border-gray-300 border-t-orange-500',
            sizes[size]
          )} />
          {text && (
            <span className="text-sm text-gray-600">{text}</span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center justify-center space-x-1', className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'bg-orange-500 rounded-full animate-pulse',
              size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'
            )}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
        {text && (
          <span className="ml-2 text-sm text-gray-600">{text}</span>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <div className="flex flex-col items-center space-y-2">
          <div className={cn(
            'bg-orange-500 rounded-full animate-pulse',
            sizes[size]
          )} />
          {text && (
            <span className="text-sm text-gray-600">{text}</span>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingState;