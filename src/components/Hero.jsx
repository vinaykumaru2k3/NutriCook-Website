import { useState } from 'react';
import { Play, ArrowRight, Shield, Leaf, Heart, Zap } from 'lucide-react';
import { cn } from '../utils/cn';
import { useAnimatedRef, useStaggerAnimation } from '../hooks/useAnimations';
import { trackButtonClick } from '../utils/analytics';
import Container from './ui/Container';


const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  
  // Animation refs - More subtle and reliable
  const heroContentRef = useAnimatedRef('fadeInUp', 0);
  const headlineRef = useAnimatedRef('fadeInUp', 50);  // Reduced delay
  const subtitleRef = useAnimatedRef('fadeInUp', 100); // Reduced delay
  const buttonsRef = useAnimatedRef('fadeInUp', 150);  // Reduced delay
  const trustIndicatorsRef = useStaggerAnimation(4, 50); // Reduced stagger delay

  const handlePlayVideo = () => {
    setShowVideo(true);
    trackButtonClick('watch_demo_video', 'hero_section');
  };

  return (
    <section className="relative min-h-screen mobile-viewport-fix flex items-start justify-center overflow-hidden hero-section pt-16 sm:pt-20 md:items-center md:pt-0">
      {/* Refined Gradient Background */}
      <div className="absolute inset-0 z-0">
        {/* Subtle gradient background using brand-consistent colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-green-50/80 to-green-100/60"></div>
        
        {/* Additional subtle overlay for enhanced text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10"></div>
      </div>
      
      {/* Decorative Elements - Mobile Responsive */}
      <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
        <div className="absolute top-12 left-2 w-16 h-16 sm:top-16 sm:left-4 sm:w-20 sm:h-20 md:top-20 md:left-10 md:w-32 md:h-32 bg-green-200/12 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-24 right-2 w-12 h-12 sm:top-32 sm:right-4 sm:w-16 sm:h-16 md:top-40 md:right-20 md:w-24 md:h-24 bg-teal-200/12 rounded-full opacity-35 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-16 left-2 w-20 h-20 sm:bottom-20 sm:left-4 sm:w-24 sm:h-24 md:bottom-32 md:left-20 md:w-40 md:h-40 bg-emerald-200/12 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-green-300/10 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl font-bold z-10 w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-sm flex items-center justify-center hover:bg-gray-700/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white shadow-lg md:w-10 md:h-10"
              aria-label="Close video"
            >
              ✕
            </button>
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <video className="w-full h-full object-cover" controls autoPlay>
                <source src="/videos/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* Hero Content - Mobile Optimized */}
      <Container className="relative z-20 text-center px-4 sm:px-6 lg:px-8 hero-mobile-container mobile-scroll-container">
        <div ref={heroContentRef} className="max-w-6xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8 animate-mobile-optimized">

          {/* Main Headline - Mobile-First Typography */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <h1 ref={headlineRef} className="font-bold leading-[1.1] sm:leading-tight">
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 mb-1 sm:mb-2">
                The Healthiest
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-green-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                Investment
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-800">
                Your Family Will Ever Make
              </span>
            </h1>

            <p ref={subtitleRef} className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light px-2 sm:px-0">
              Revolutionary <span className="font-semibold text-green-700">oilless & waterless</span> cooking technology that 
              <span className="font-semibold text-teal-700"> preserves nutrients</span>, enhances flavors, and 
              <span className="font-semibold text-emerald-700"> saves money</span> while keeping your family healthier.
            </p>
          </div>

          {/* CTA Buttons - Mobile-First Design */}
          <div ref={buttonsRef} className="flex flex-row gap-3 justify-center items-center pt-2 sm:pt-4 lg:pt-6 flex-wrap">
            {/* Primary CTA - Mobile Optimized */}
            <button
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("contact");
                if (element) {
                  const offsetTop = element.offsetTop - 80;
                  window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                  });
                }
                trackButtonClick('request_free_demo', 'hero_section');
              }}
              className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm focus:outline-none focus:ring-4 focus:ring-green-500/50 min-h-[44px] whitespace-nowrap"
              type="button"
            >
              <span>Request FREE Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary CTA - Mobile Optimized */}
            <button
              onClick={handlePlayVideo}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-gray-700 hover:text-green-600 transition-all duration-300 group bg-white/95 rounded-xl px-4 py-3 shadow-lg hover:shadow-xl border border-gray-200 hover:border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 min-h-[44px] whitespace-nowrap"
              type="button"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                <Play className="w-3 h-3 text-white ml-0.5" fill="currentColor" />
              </div>
              <span className="text-sm sm:text-base font-semibold">Watch Demo</span>
            </button>
          </div>

          {/* Trust Indicators - Enhanced Mobile Layout */}
          <div className="pt-6 sm:pt-8 md:pt-12 px-2 sm:px-4 md:px-0 trust-indicators-mobile">
            <div ref={trustIndicatorsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto">
              {[
                { icon: Shield, title: "30-Year", subtitle: "Guarantee", color: "from-blue-500 to-blue-600" },
                { icon: Heart, title: "Surgical Grade", subtitle: "Steel", color: "from-red-500 to-red-600" },
                { icon: Leaf, title: "50% Gas", subtitle: "Savings", color: "from-green-500 to-green-600" },
                { icon: Zap, title: "80% Oil", subtitle: "Savings", color: "from-yellow-500 to-yellow-600" }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="text-center group p-1 sm:p-2 trust-indicator-mobile trust-card-mobile animate-mobile-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                    <div className={cn(
                      'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-xl md:rounded-2xl bg-gradient-to-r flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110',
                      item.color
                    )}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-white" />
                    </div>
                    <div className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 drop-shadow-sm leading-tight text-mobile-optimized">{item.title}</div>
                    <div className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 drop-shadow-sm text-mobile-optimized">{item.subtitle}</div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </Container>


    </section>
  );
};

export default Hero;