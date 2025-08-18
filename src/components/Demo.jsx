import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAnimatedRef, useStaggerAnimation } from '../hooks/useAnimations';
import { smoothScrollTo } from '../utils/animations';
import { trackButtonClick } from '../utils/analytics';

export default function Demo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Refs
  const imageContainerRef = useRef(null);
  
  // Animation refs
  const headerRef = useAnimatedRef('fadeInUp', 0);
  const mediaRef = useAnimatedRef('fadeInLeft', 200);
  const contentRef = useAnimatedRef('fadeInRight', 400);
  const trustIndicatorsRef = useStaggerAnimation(3, 150);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;
  
  // Demo images - showcasing demonstration process
  const demoMedia = [
    {
      type: 'image',
      src: 'https://img.freepik.com/premium-photo/person-cooking-vegetables-kitchen_961875-264359.jpg',
      alt: 'NutriCook demonstration showing oil-free cooking',
      caption: 'Watch as vegetables cook perfectly without any oil'
    },
    {
      type: 'image', 
      src: 'https://images.unsplash.com/photo-1577303935007-0d306ee638cf?w=800&h=600&fit=crop&crop=center',
      alt: 'Family enjoying NutriCook demonstration meal',
      caption: 'Families taste the difference in every bite'
    },
    {
      type: 'image',
      src: 'https://www.escoffier.edu/wp-content/uploads/2022/08/Chef-sauteing-vegetables-in-a-black-pan-with-a-wooden-spoon-1400.jpeg',
      alt: 'NutriCook presenter explaining cooking process',
      caption: 'Our experts guide you through the entire process'
    }
  ];

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev + 1) % demoMedia.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev - 1 + demoMedia.length) % demoMedia.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Touch handlers for swipe gestures
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
      trackButtonClick('swipe_next_demo_image', 'demo_section');
    } else if (isRightSwipe) {
      prevImage();
      trackButtonClick('swipe_prev_demo_image', 'demo_section');
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    // Only add keyboard listener when component is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.addEventListener('keydown', handleKeyDown);
        } else {
          document.removeEventListener('keydown', handleKeyDown);
        }
      },
      { threshold: 0.5 }
    );

    if (imageContainerRef.current) {
      observer.observe(imageContainerRef.current);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, []);

  // Auto-advance images (optional - can be enabled)
  useEffect(() => {
    // Uncomment below to enable auto-advance
    // const interval = setInterval(() => {
    //   nextImage();
    // }, 5000);
    // return () => clearInterval(interval);
  }, [currentImageIndex]);

  const scrollToContact = () => {
    smoothScrollTo('contact', { offset: 80, duration: 800 });
    trackButtonClick('book_free_home_demo', 'demo_section');
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Seeing is Believing. Tasting is Knowing.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the magic of oil-free, water-free cooking in the comfort of your own home. 
            Our expert presenters will cook a complete meal using your ingredients.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Visual Content - Left Side */}
          <div ref={mediaRef} className="order-2 lg:order-1">
            <div className="relative">
              {/* Main Media Display with Swipe Support */}
              <div 
                ref={imageContainerRef}
                data-demo-carousel
                className="relative aspect-video bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl cursor-grab active:cursor-grabbing select-none demo-swipe-container"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                style={{ touchAction: 'pan-x' }}
                role="region"
                aria-label="Demo image carousel"
                aria-live="polite"
              >
                <div 
                  className={`flex demo-carousel-transition h-full ${isTransitioning ? 'pointer-events-none' : ''}`}
                  style={{ 
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                    width: `${demoMedia.length * 100}%`,
                    transition: isTransitioning ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
                  }}
                >
                  {demoMedia.map((media, index) => (
                    <div 
                      key={index}
                      className="w-full h-full flex-shrink-0 relative"
                      style={{ width: `${100 / demoMedia.length}%` }}
                    >
                      <img
                        src={media.src}
                        alt={media.alt}
                        className="w-full h-full object-cover demo-carousel-item"
                        loading={index === 0 ? "eager" : "lazy"}
                        draggable={false}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zOTUgMjk1SDQwNVYzMDVIMzk1VjI5NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                        }}
                        style={{
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          MozUserSelect: 'none',
                          msUserSelect: 'none',
                          pointerEvents: 'none'
                        }}
                      />
                      
                      {/* Loading indicator for current image */}
                      {index === currentImageIndex && isTransitioning && (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Navigation Arrows - Hidden on Mobile, Enhanced for Desktop */}
                <button
                  onClick={prevImage}
                  disabled={isTransitioning}
                  className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={nextImage}
                  disabled={isTransitioning}
                  className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                
                {/* Swipe Progress Indicator (Mobile Only) */}
                <div className="sm:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 demo-progress-indicator">
                  {currentImageIndex + 1} / {demoMedia.length}
                </div>
              </div>

              {/* Media Caption */}
              <p className="text-center text-gray-600 mt-3 sm:mt-4 font-medium text-sm sm:text-base">
                {demoMedia[currentImageIndex].caption}
              </p>

              {/* Enhanced Carousel Indicators with Touch Support */}
              <div className="flex justify-center mt-4 sm:mt-6 space-x-1 sm:space-x-2">
                {demoMedia.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isTransitioning) {
                        setIsTransitioning(true);
                        setCurrentImageIndex(index);
                        setTimeout(() => setIsTransitioning(false), 300);
                        trackButtonClick(`demo_indicator_${index + 1}`, 'demo_section');
                      }
                    }}
                    disabled={isTransitioning}
                    className={`demo-indicator relative p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center disabled:opacity-50 ${
                      index === currentImageIndex ? 'scale-110' : 'hover:scale-105'
                    }`}
                    aria-label={`View media ${index + 1}`}
                    style={{ 
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                  >
                    <div className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-orange-500 w-6 sm:w-8 shadow-md'
                        : 'bg-gray-300 hover:bg-gray-400 w-1.5 sm:w-2'
                    }`} />
                  </button>
                ))}
              </div>
              
              {/* Enhanced Mobile Swipe Indicator */}
              <div className="flex sm:hidden justify-center mt-3 text-gray-500 text-xs">
                <div className="demo-swipe-hint flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  <span className="font-medium">Swipe to navigate</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content - Right Side */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <div className="space-y-6 sm:space-y-8">
              {/* What to Expect */}
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                  What to Expect During Your Demo
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Complete Meal Preparation</h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Our expert will cook a full meal using your own ingredients, demonstrating the oil-free and water-free cooking process.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Taste the Difference</h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Experience the enhanced flavors and authentic taste that comes from cooking with surgical steel and Accuthermal technology.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Learn the Benefits</h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Understand how NutriCook saves up to 50% on gas, 80% on oil, and preserves maximum nutrition in your food.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg border border-orange-100">
                <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Why Choose a Home Demo?</h4>
                <ul className="space-y-1.5 sm:space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">100% FREE with no obligation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">Cook with your own ingredients</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">See, taste, and feel the difference</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">Expert guidance and tips</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">No pressure, just education</span>
                  </li>
                </ul>
              </div>

              {/* CTA Button */}
              <div className="text-center lg:text-left">
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base lg:text-lg rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 min-h-[44px]"
                >
                  Book Your FREE Home Demo Today
                </button>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Available across major cities • No hidden charges
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 sm:mt-16 text-center">
          <div ref={trustIndicatorsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1 sm:mb-2">10,000+</div>
              <div className="text-gray-600 text-sm sm:text-base">Successful Demonstrations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1 sm:mb-2">95%</div>
              <div className="text-gray-600 text-sm sm:text-base">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1 sm:mb-2">30+</div>
              <div className="text-gray-600 text-sm sm:text-base">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}