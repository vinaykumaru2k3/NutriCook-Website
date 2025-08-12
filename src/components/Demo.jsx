import { useState } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Demo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Demo images/videos - using placeholder content for now
  const demoMedia = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center',
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
      src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center',
      alt: 'NutriCook presenter explaining cooking process',
      caption: 'Our experts guide you through the entire process'
    },
    {
      type: 'placeholder-video',
      src: '#',
      poster: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center',
      alt: 'Complete NutriCook home demonstration video',
      caption: 'See the complete demonstration experience'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % demoMedia.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + demoMedia.length) % demoMedia.length);
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Seeing is Believing. Tasting is Knowing.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the magic of oil-free, water-free cooking in the comfort of your own home. 
            Our expert presenters will cook a complete meal using your ingredients, demonstrating 
            the incredible health benefits and authentic taste of NutriCook.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Content - Left Side */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Main Media Display */}
              <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
                {demoMedia[currentImageIndex].type === 'video' ? (
                  <video
                    controls
                    poster={demoMedia[currentImageIndex].poster}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  >
                    <source src={demoMedia[currentImageIndex].src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : demoMedia[currentImageIndex].type === 'placeholder-video' ? (
                  <div className="relative w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <img
                      src={demoMedia[currentImageIndex].poster}
                      alt={demoMedia[currentImageIndex].alt}
                      className="w-full h-full object-cover opacity-60"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="bg-orange-500 text-white p-4 rounded-full shadow-lg mb-4 inline-block">
                          <Play className="w-8 h-8 ml-1" fill="currentColor" />
                        </div>
                        <p className="text-lg font-semibold">Demo Video Coming Soon</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={demoMedia[currentImageIndex].src}
                    alt={demoMedia[currentImageIndex].alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zOTUgMjk1SDQwNVYzMDVIMzk1VjI5NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                    }}
                  />
                )}
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Play Icon Overlay for Videos */}
                {demoMedia[currentImageIndex].type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-orange-500 text-white p-4 rounded-full shadow-lg">
                      <Play className="w-8 h-8 ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>

              {/* Media Caption */}
              <p className="text-center text-gray-600 mt-4 font-medium">
                {demoMedia[currentImageIndex].caption}
              </p>

              {/* Thumbnail Navigation */}
              <div className="flex justify-center mt-6 space-x-2">
                {demoMedia.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-orange-500 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`View media ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content - Right Side */}
          <div className="order-1 lg:order-2">
            <div className="space-y-8">
              {/* What to Expect */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  What to Expect During Your Demo
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Complete Meal Preparation</h4>
                      <p className="text-gray-600">Our expert will cook a full meal using your own ingredients, demonstrating the oil-free and water-free cooking process.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Taste the Difference</h4>
                      <p className="text-gray-600">Experience the enhanced flavors and authentic taste that comes from cooking with surgical steel and Accuthermal technology.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Learn the Benefits</h4>
                      <p className="text-gray-600">Understand how NutriCook saves up to 50% on gas, 80% on oil, and preserves maximum nutrition in your food.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-100">
                <h4 className="font-bold text-gray-900 mb-4">Why Choose a Home Demo?</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>100% FREE with no obligation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Cook with your own ingredients</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>See, taste, and feel the difference</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Expert guidance and tips</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>No pressure, just education</span>
                  </li>
                </ul>
              </div>

              {/* CTA Button */}
              <div className="text-center lg:text-left">
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Book Your FREE Home Demo Today
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Available across major cities • No hidden charges
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">10,000+</div>
              <div className="text-gray-600">Successful Demonstrations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">95%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">30+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}