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
    <section id="dealer" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div ref={contentRef} className="space-y-8">
            <div ref={headerRef} className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Join Our Mission: Become a{' '}
                <span className="text-orange-500">NutriCook Partner</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Help us bring healthy living to more families across India while building
                a rewarding business for yourself. Join our network of successful partners
                who are making a difference in their communities.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Why Partner With Us?
              </h3>
              <div className="grid gap-4">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 card-animated">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-orange-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button
                onClick={() => {
                  handleDealerInquiry();
                  trackButtonClick('learn_more_about_dealership', 'dealer_section');
                }}
                className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl btn-animated"
              >
                <Users className="w-5 h-5 mr-2" />
                Learn More About Dealership
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Ready to start your journey? Contact us to learn more about partnership opportunities.
              </p>
            </div>
          </div>

          {/* Right Column - Professional Image */}
          <div ref={imageRef} className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://thumbs.dreamstime.com/b/two-businessmen-shake-hands-large-hall-signifying-global-agreement-partnership-two-businessmen-shake-hands-large-365343995.jpg"
                alt="Successful NutriCook dealer with happy customers"
                className="w-full h-[600px] object-cover"
                onError={(e) => {
                  // Fallback to a placeholder if image doesn't exist
                  e.target.src = "data:image/svg+xml,%3Csvg width='600' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' dy='.3em' fill='%236b7280'%3EPartnership Image%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">500+</p>
                  <p className="text-sm text-gray-600">Successful Partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div ref={trustIndicatorsRef} className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Built on Trust & Excellence
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our partnership program is designed for long-term success, backed by proven 
              business models and comprehensive support systems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-500">30+</div>
              <div className="text-gray-600">Years of Excellence</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-500">₹25L+</div>
              <div className="text-gray-600">Average Annual Revenue</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-500">95%</div>
              <div className="text-gray-600">Partner Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}