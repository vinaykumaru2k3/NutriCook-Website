import { cn } from '../../utils/cn';

const SkeletonLoader = ({ className, variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-gray-200',
    card: 'bg-gray-200 rounded-lg',
    text: 'bg-gray-200 rounded h-4',
    title: 'bg-gray-200 rounded h-6',
    image: 'bg-gray-200 rounded-lg aspect-video',
    circle: 'bg-gray-200 rounded-full',
    button: 'bg-gray-200 rounded-lg h-12'
  };

  return (
    <div
      className={cn(
        'animate-pulse',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

// Pre-built skeleton components for common use cases
export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <SkeletonLoader variant="image" className="w-full h-48 sm:h-56 md:h-64" />
    <div className="p-4 sm:p-6 space-y-4">
      <SkeletonLoader variant="title" className="w-3/4" />
      <SkeletonLoader variant="text" className="w-full" />
      <SkeletonLoader variant="text" className="w-2/3" />
      <div className="flex justify-between">
        <SkeletonLoader variant="text" className="w-1/3" />
        <SkeletonLoader variant="text" className="w-1/4" />
      </div>
      <SkeletonLoader variant="button" className="w-full" />
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
      <SkeletonLoader variant="title" className="w-3/4 mx-auto h-12" />
      <SkeletonLoader variant="text" className="w-full mx-auto" />
      <SkeletonLoader variant="text" className="w-2/3 mx-auto" />
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <SkeletonLoader variant="button" className="w-full sm:w-48" />
        <SkeletonLoader variant="button" className="w-full sm:w-48" />
      </div>
    </div>
  </div>
);

export const BenefitsSkeleton = () => (
  <div className="py-8 sm:py-12 md:py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <SkeletonLoader variant="title" className="w-1/2 mx-auto h-8 mb-4" />
        <SkeletonLoader variant="text" className="w-3/4 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center space-y-4">
            <SkeletonLoader variant="circle" className="w-16 h-16 mx-auto" />
            <SkeletonLoader variant="title" className="w-3/4 mx-auto" />
            <SkeletonLoader variant="text" className="w-full" />
            <SkeletonLoader variant="text" className="w-2/3 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SkeletonLoader;