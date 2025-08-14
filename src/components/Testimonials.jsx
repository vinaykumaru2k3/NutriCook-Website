import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAnimatedRef } from '../hooks/useAnimations';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Animation ref
  const sectionRef = useAnimatedRef('fadeInUp', 0);
  const containerRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const testimonials = [
    {
      id: 1,
      videoSrc: '/videos/testimonial_NC/WhatsApp Video 2025-08-12 at 19.49.23_5d3ba4d6.mp4',
      poster: '/images/testimonials/customer1.jpg',
      quote: "This cookware has completely transformed how I cook. My family loves the healthy meals I can now prepare.",
      name: "Manjunatha Baraki",
      location: "Bangalore"
    },
    {
      id: 2,
      videoSrc: '/videos/testimonial_NC/WhatsApp Video 2025-08-12 at 19.49.24_479c1fd3.mp4',
      poster: '/images/testimonials/customer2.jpg',
      quote: "I've saved so much money on gas and oil. The quality is exceptional and it's been 5 years and still looks new.",
      name: "Vinay",
      location: "Mysuru"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
      nextTestimonial();
    } else if (isRightSwipe) {
      prevTestimonial();
    }
  };

  // Removed auto-play functionality - users control navigation via swipe/click

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-green-50/30">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from families who have transformed their cooking experience with NutriCook
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards Container */}
          <div 
            className="overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl testimonials-swipe-area"
            ref={containerRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out testimonials-slide-mobile"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="flex-shrink-0 w-full"
                >
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 h-full">
                    <div className="aspect-video bg-gray-100 rounded-lg sm:rounded-xl mb-4 sm:mb-6 overflow-hidden relative">
                      <video 
                        className="w-full h-full object-contain bg-black"
                        poster={testimonial.poster}
                        preload="metadata"
                        playsInline
                        controls
                        controlsList="nodownload"
                      >
                        <source src={testimonial.videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg italic leading-relaxed">"{testimonial.quote}"</p>
                      <div className="font-bold text-gray-900 text-base sm:text-lg md:text-xl">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm sm:text-base">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Hidden on Mobile, Visible on Desktop */}
          <button 
            onClick={prevTestimonial}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 z-10 w-12 h-12 items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            onClick={nextTestimonial}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 z-10 w-12 h-12 items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Carousel Indicators - Smaller for Mobile */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-1 sm:space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className="p-1 sm:p-2 transition-all duration-300"
              aria-label={`View testimonial ${index + 1}`}
            >
              <div className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                currentTestimonial === index ? 'bg-green-500 w-4 sm:w-6' : 'bg-gray-300 hover:bg-gray-400 w-1.5 sm:w-2'
              }`} />
            </button>
          ))}
        </div>

        {/* Swipe Indicator - Mobile Only */}
        <div className="flex md:hidden justify-center mt-4 text-gray-500 text-sm">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>Swipe</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;