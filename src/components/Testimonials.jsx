import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAnimatedRef } from '../hooks/useAnimations';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Animation ref
  const sectionRef = useAnimatedRef('fadeInUp', 0);

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

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-green-50/30">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from families who have transformed their cooking experience with NutriCook
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards Container */}
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="flex-shrink-0 w-full"
                >
                  <div className="bg-white rounded-2xl p-6 md:p-8 h-full">
                    <div className="aspect-video bg-gray-100 rounded-xl mb-6 overflow-hidden relative">
                      <video 
                        className="w-full h-full object-contain bg-black"
                        controls
                        poster={testimonial.poster}
                      >
                        <source src={testimonial.videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-700 mb-4 text-lg italic">"{testimonial.quote}"</p>
                      <div className="font-bold text-gray-900 text-xl">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentTestimonial === index ? 'bg-green-500 w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;