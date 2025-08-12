import { Heart, Leaf, IndianRupee, Shield, Zap, Users } from 'lucide-react';
import Container from './ui/Container';

const Benefits = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Health & Purity",
      subtitle: "Surgical Grade 316L Steel",
      description: "Cook with the same grade steel used in medical implants. Our cookware ensures zero chemical leaching and maintains food purity for 30+ years.",
      features: [
        "100% Chemical-free cooking",
        "Preserves natural nutrients",
        "No harmful coatings",
        "30-year guarantee"
      ],
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50",
      textColor: "text-red-700"
    },
    {
      icon: Leaf,
      title: "Authentic Taste",
      subtitle: "Accuthermal Technology",
      description: "Revolutionary waterless cooking technology that locks in natural flavors and nutrients, giving you restaurant-quality taste at home.",
      features: [
        "Waterless cooking method",
        "Enhanced natural flavors",
        "Retains food texture",
        "Traditional cooking feel"
      ],
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700"
    },
    {
      icon: IndianRupee,
      title: "Smart Savings",
      subtitle: "Long-term Investment",
      description: "Save up to 50% on gas bills and 80% on cooking oil. Your investment pays for itself within the first year of use.",
      features: [
        "50% gas savings",
        "80% oil reduction",
        "Electricity bill reduction",
        "Lifetime durability"
      ],
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700"
    }
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: "30-Year Guarantee",
      description: "Unmatched warranty coverage"
    },
    {
      icon: Zap,
      title: "Energy Efficient",
      description: "Reduces cooking time by 40%"
    },
    {
      icon: Users,
      title: "Family Approved",
      description: "Trusted by 50,000+ families"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-green-50/30">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 px-4 md:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-readable">
            More Than Cookware.{' '}
            <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              A Lifelong Commitment to Health.
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto text-readable-large">
            Discover the three pillars that make NutriCook the healthiest investment for your family's future.
          </p>
        </div>

        {/* Main Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mb-16 grid-responsive">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group card-mobile"
              >
                <div className={`${benefit.bgColor} p-6 md:p-8`}>
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-readable">
                    {benefit.title}
                  </h3>
                  <p className={`text-sm md:text-base font-semibold ${benefit.textColor} mb-4`}>
                    {benefit.subtitle}
                  </p>
                </div>
                
                <div className="p-6 md:p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed text-readable">
                    {benefit.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {benefit.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm md:text-base text-gray-700">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${benefit.color} mr-3 flex-shrink-0`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 card-mobile">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-readable">
              Why Choose NutriCook?
            </h3>
            <p className="text-gray-600 text-readable">
              Additional benefits that make us the preferred choice for health-conscious families
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2 text-readable">
                    {feature.title}
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 text-readable">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16 px-4 md:px-0">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-6 md:p-8 text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-readable">
              Ready to Experience the Difference?
            </h3>
            <p className="text-base md:text-lg mb-6 opacity-90 text-readable">
              Book your free home demonstration and see these benefits in action.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-green-600 hover:bg-gray-50 font-semibold py-3 px-8 rounded-xl transition-colors duration-200 inline-flex items-center gap-2 touch-target min-h-12 text-base"
            >
              Book FREE Demo
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Benefits;