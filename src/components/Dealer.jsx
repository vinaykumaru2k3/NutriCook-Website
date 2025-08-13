import { CheckCircle, Users, MapPin, HeadphonesIcon, TrendingUp, Shield } from 'lucide-react';
import { useAnimatedRef } from '../hooks/useAnimations';
import { trackButtonClick } from '../utils/analytics';

export default function Dealer() {
  // Animation refs
  const headerRef = useAnimatedRef('fadeInUp', 0);
  const contentRef = useAnimatedRef('fadeInLeft', 200);
  const imageRef = useAnimatedRef('fadeInRight', 400);
  const trustIndicatorsRef = useAnimatedRef('fadeInUp', 600);

  const benefits = [
    {
      icon: TrendingUp,
      title: "Attractive Margins",
      description: "Earn 20-25% margins on every sale with our premium product line"
    },
    {
      icon: MapPin,
      title: "Exclusive Territory",
      description: "Get exclusive rights to your designated area with protected territory"
    },
    {
      icon: HeadphonesIcon,
      title: "Complete Support",
      description: "Comprehensive training, marketing materials, and ongoing business support"
    },
    {
      icon: Users,
      title: "Growing Market",
      description: "Tap into the expanding health-conscious consumer market"
    },
    {
      icon: Shield,
      title: "Trusted Brand",
      description: "Partner with a premium brand known for quality and reliability"
    }
  ];

  const handleDealerInquiry = () => {
    // Scroll to contact section or open dealer-specific form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="dealer" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div ref={contentRef} className="space-y-6 sm:space-y-8">
            <div ref={headerRef} className="space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Join Our Mission: Become a{' '}
                <span className="text-orange-500">NutriCook Partner</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                Help us bring healthy living to more families across India while building
                a rewarding business for yourself.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                Why Partner With Us?
              </h3>
              <div className="grid gap-3 sm:gap-4">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 leading-tight">
                          {benefit.title}
                        </h4>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 sm:pt-6">
              <button
                onClick={() => {
                  handleDealerInquiry();
                  trackButtonClick('learn_more_about_dealership', 'dealer_section');
                }}
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl min-h-[44px] text-sm sm:text-base"
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Learn More About Dealership
              </button>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3">
                Ready to start your journey? Contact us to learn more about partnership opportunities.
              </p>
            </div>
          </div>


        </div>

        {/* Trust Indicators */}
        <div ref={trustIndicatorsRef} className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Built on Trust & Excellence
            </h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our partnership program is designed for long-term success, backed by proven 
              business models and comprehensive support systems.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-orange-500">500+</div>
              <div className="text-gray-600 text-sm sm:text-base">Successful Partners</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-orange-500">30+</div>
              <div className="text-gray-600 text-sm sm:text-base">Years of Excellence</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-orange-500">₹25L+</div>
              <div className="text-gray-600 text-sm sm:text-base">Average Annual Revenue</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-orange-500">95%</div>
              <div className="text-gray-600 text-sm sm:text-base">Partner Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}