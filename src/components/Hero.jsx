import { useState, useEffect } from 'react';
import { Play, ArrowRight, Shield, Leaf, Heart, Zap } from 'lucide-react';
import { cn } from '../utils/cn';
import { smoothScrollTo } from '../utils/animations';
import { useAnimatedRef, useStaggerAnimation } from '../hooks/useAnimations';
import { trackButtonClick } from '../utils/analytics';
import Button from './ui/Button';
import Container from './ui/Container';
import LazyImage from './ui/LazyImage';

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Animation refs
  const heroContentRef = useAnimatedRef('fadeInUp', 0);
  const headlineRef = useAnimatedRef('fadeInUp', 200);
  const subtitleRef = useAnimatedRef('fadeInUp', 400);
  const buttonsRef = useAnimatedRef('fadeInUp', 600);
  const trustIndicatorsRef = useStaggerAnimation(4, 150);

  const handleDemoClick = () => {
    smoothScrollTo('contact', { offset: 80, duration: 800 });
    trackButtonClick('request_free_demo', 'hero_section');
  };

  const handlePlayVideo = () => {
    setShowVideo(true);
    trackButtonClick('watch_demo_video', 'hero_section');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-teal-50">
          <LazyImage
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Happy family cooking together with premium cookware"
            className="w-full h-full object-cover opacity-30"
            placeholder={
              <div className="w-full h-full bg-gradient-to-br from-green-100 via-white to-teal-100 animate-pulse" />
            }
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        {/* Overlay Gradient for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-green-50/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-white/30"></div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-teal-200/20 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-emerald-200/20 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl font-bold z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close video"
            >
              ✕
            </button>
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <video className="w-full h-full object-cover" controls autoPlay>
                <source src="/api/placeholder/video/nutricook-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <Container className="relative z-20 text-center">
        <div ref={heroContentRef} className="max-w-6xl mx-auto space-y-8 md:space-y-12">

          {/* Main Headline - Optimized Responsive Typography */}
          <div className="space-y-4 md:space-y-6">
            <h1 ref={headlineRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight px-4 md:px-0 text-readable">
              <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent drop-shadow-sm">
                The Healthiest
              </span>
              <span className="block bg-gradient-to-r from-green-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-sm">
                Investment
              </span>
              <span className="block text-gray-800 drop-shadow-sm">
                Your Family Will Ever Make
              </span>
            </h1>

            <p ref={subtitleRef} className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light px-4 md:px-0 drop-shadow-sm text-readable-large">
              Revolutionary <span className="font-semibold text-green-700">oilless & waterless</span> cooking technology that 
              <span className="font-semibold text-teal-700"> preserves nutrients</span>, enhances flavors, and 
              <span className="font-semibold text-emerald-700"> saves money</span> while keeping your family healthier.
            </p>
          </div>

          {/* CTA Buttons - Enhanced Mobile Optimization */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center pt-6 md:pt-8 px-4 md:px-0">
            <Button
              onClick={handleDemoClick}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto text-lg font-semibold px-8 md:px-10 py-4 md:py-5 shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 rounded-2xl touch-target min-h-14"
              icon={<ArrowRight className="w-5 h-5 md:w-6 md:h-6" />}
              iconPosition="right"
            >
              Request a FREE Demo
            </Button>

            <button
              onClick={handlePlayVideo}
              className="w-full sm:w-auto flex items-center justify-center sm:justify-start space-x-3 md:space-x-4 text-gray-700 hover:text-green-600 transition-all duration-300 group bg-white/90 backdrop-blur-sm rounded-2xl px-4 md:px-6 py-4 md:py-4 shadow-lg hover:shadow-xl border border-gray-200 hover:border-green-200 touch-target min-h-14 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                <Play className="w-5 h-5 md:w-6 md:h-6 text-white ml-1" fill="currentColor" />
              </div>
              <div className="text-left">
                <div className="text-base md:text-lg font-semibold">Watch Demo</div>
                <div className="text-sm text-gray-500">See it in action</div>
              </div>
            </button>
          </div>

          {/* Trust Indicators - Enhanced Mobile Layout */}
          <div className="pt-12 md:pt-16 px-4 md:px-0">
            <div ref={trustIndicatorsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
              {[
                { icon: Shield, title: "30-Year", subtitle: "Guarantee", color: "from-blue-500 to-blue-600" },
                { icon: Heart, title: "Surgical Grade", subtitle: "Steel", color: "from-red-500 to-red-600" },
                { icon: Leaf, title: "50% Gas", subtitle: "Savings", color: "from-green-500 to-green-600" },
                { icon: Zap, title: "80% Oil", subtitle: "Savings", color: "from-yellow-500 to-yellow-600" }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="text-center group p-2">
                    <div className={cn(
                      'w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 mx-auto mb-3 md:mb-4 rounded-xl md:rounded-2xl bg-gradient-to-r flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110',
                      item.color
                    )}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white" />
                    </div>
                    <div className="text-sm sm:text-base md:text-lg font-bold text-gray-900 drop-shadow-sm leading-tight">{item.title}</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-700 drop-shadow-sm">{item.subtitle}</div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </Container>

      {/* Scroll Indicator - Hidden on Mobile */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-green-500/50 rounded-full flex justify-center bg-white/60 backdrop-blur-sm shadow-sm">
            <div className="w-1 h-3 bg-green-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;