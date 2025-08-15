import { useState } from 'react';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { useAnimatedRef, useStaggerAnimation } from '../hooks/useAnimations';
import { smoothScrollTo } from '../utils/animations';
import { trackButtonClick } from '../utils/analytics';


// Product data structure with specifications, pricing, and features
const products = [
  {
    id: 'biriyani-pot-12l',
    name: '12 Ltr Biriyani Pot',
    image: '/images/products/biryani-pot-12-ltr.jpg',
    capacity: '12 Litres',
    dimensions: '32cm x 18cm',
    price: 21490,
    originalPrice: 24990,
    features: [
      'Surgical Grade 316L Steel',
      'Oilless & Waterless Cooking',
      'Accuthermal Technology',
      '30-Year Guarantee'
    ],
    category: 'pot',
    isBestseller: true,
    description: 'Perfect for large family gatherings and special occasions. Cook authentic biriyani without oil or water.'
  },
  {
    id: 'fish-pot-6l',
    name: '6 Ltr Fish Pot',
    image: '/images/products/fish-pot.jpg',
    capacity: '6 Litres',
    dimensions: '26cm x 14cm',
    price: 19490,
    originalPrice: 22490,
    features: [
      'Surgical Grade 316L Steel',
      'Steam Cooking Technology',
      'Retains Natural Flavors',
      '30-Year Guarantee'
    ],
    category: 'pot',
    description: 'Specially designed for cooking fish and seafood while preserving natural flavors and nutrients.'
  },
  {
    id: 'casserole-3l',
    name: '3 Ltr Casserole',
    image: '/images/products/casserole-3-ltr.jpg',
    capacity: '3 Litres',
    dimensions: '22cm x 12cm',
    price: 15490,
    originalPrice: 17490,
    features: [
      'Surgical Grade 316L Steel',
      'Multi-Purpose Cooking',
      'Heat Retention Technology',
      '30-Year Guarantee'
    ],
    category: 'casserole',
    description: 'Versatile casserole perfect for curries, vegetables, and everyday cooking needs.'
  },
  {
    id: 'casserole-2l',
    name: '2.2 Ltr Casserole',
    image: '/images/products/casserole-2-2-ltr.jpg',
    capacity: '2.2 Litres',
    dimensions: '20cm x 10cm',
    price: 13490,
    originalPrice: 15490,
    features: [
      'Surgical Grade 316L Steel',
      'Compact Size',
      'Perfect for Small Families',
      '30-Year Guarantee'
    ],
    category: 'casserole',
    description: 'Compact casserole ideal for small families and everyday cooking needs.'
  },
  {
    id: 'sauce-pot',
    name: 'Sauce Pot',
    image: '/images/products/sauce-pot.jpg',
    capacity: '1.5 Litres',
    dimensions: '18cm x 8cm',
    price: 9490,
    originalPrice: 11490,
    features: [
      'Surgical Grade 316L Steel',
      'Perfect for Sauces',
      'Heat Distribution',
      '30-Year Guarantee'
    ],
    category: 'pot',
    isNew: true,
    description: 'Specially designed for making sauces, gravies, and small quantity cooking.'
  },
  {
    id: 'multipurpose-bowl',
    name: 'Multipurpose Bowl',
    image: '/images/products/multipurpose-bowl.jpg',
    capacity: '2 Litres',
    dimensions: '22cm x 8cm',
    price: 11490,
    originalPrice: 13490,
    features: [
      'Surgical Grade 316L Steel',
      'Versatile Design',
      'Multi-Use Functionality',
      '30-Year Guarantee'
    ],
    category: 'bowl',
    description: 'Versatile bowl perfect for mixing, serving, and light cooking tasks.'
  }
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Animation refs
  const headerRef = useAnimatedRef('fadeInUp', 0);
  const filtersRef = useAnimatedRef('fadeInUp', 200);
  const productsGridRef = useStaggerAnimation(6, 150);
  const ctaRef = useAnimatedRef('scaleIn', 400);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'pot', name: 'Pots' },
    { id: 'casserole', name: 'Casseroles' },
    { id: 'bowl', name: 'Bowls' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleLearnMore = (productId) => {
    // Handle learn more click - could open modal, navigate to detail page, etc.
    console.log('Learn more clicked for product:', productId);
    // For now, scroll to contact section to request demo
    smoothScrollTo('contact', { offset: 80, duration: 800 });
    trackButtonClick('learn_more', 'products_section');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="py-12 sm:py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Explore the NutriCook Range
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our complete collection of surgical steel cookware designed for healthy, 
            oil-free cooking. Each piece comes with a 30-year guarantee.
          </p>
        </div>

        {/* Category Filter - Mobile Optimized */}
        <div ref={filtersRef} className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-h-[44px] flex items-center ${
                selectedCategory === category.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-sm'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid - Mobile Optimized */}
        <div ref={productsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 absolute inset-0"
                    loading="eager"
                    decoding="async"
                    onLoad={(e) => {
                      console.log('Image loaded successfully:', product.image);
                      e.target.style.opacity = '1';
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', product.image);
                      // Try loading without cache buster
                      if (e.target.src.includes('?v=')) {
                        e.target.src = product.image;
                        return;
                      }
                      e.target.style.display = 'none';
                      e.target.parentElement.querySelector('.fallback-content').style.display = 'flex';
                    }}
                    style={{
                      opacity: 1,
                      visibility: 'visible',
                      display: 'block'
                    }}
                  />
                  <div className="fallback-content absolute inset-0 bg-gray-100 flex items-center justify-center" style={{ display: 'none' }}>
                    <div className="text-center text-gray-500 p-2">
                      <div className="text-xs sm:text-sm font-medium">{product.name}</div>
                      <div className="text-xs">Image unavailable</div>
                    </div>
                  </div>
                </div>
                
                {/* Badges - Mobile Optimized */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 sm:gap-2">
                  {product.isBestseller && (
                    <span className="bg-orange-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="hidden sm:inline">Bestseller</span>
                      <span className="sm:hidden">Best</span>
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-green-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                      New
                    </span>
                  )}
                </div>

                {/* Discount Badge - Original Format */}
                {product.originalPrice && (
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                    <span className="bg-red-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                      <span className="hidden sm:inline">Save </span>{formatPrice(product.originalPrice - product.price)}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info - Compact Mobile */}
              <div className="p-2.5 sm:p-4 md:p-6">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2 leading-tight">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-xs mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Specifications - Mobile Compact */}
                <div className="flex justify-between text-xs text-gray-500 mb-2 sm:mb-3">
                  <span>{product.capacity}</span>
                  <span>{product.dimensions}</span>
                </div>

                {/* Features - Mobile Compact */}
                <div className="mb-2 sm:mb-3">
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-0.5 text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded"
                      >
                        {index === 0 && <Shield className="w-2.5 h-2.5" />}
                        {index === 1 && <Zap className="w-2.5 h-2.5" />}
                        <span className="truncate">{feature.length > 12 ? feature.substring(0, 12) + '...' : feature}</span>
                      </span>
                    ))}
                  </div>
                  {product.features.length > 2 && (
                    <span className="text-xs text-gray-500 mt-1 block">
                      +{product.features.length - 2} more
                    </span>
                  )}
                </div>

                {/* Price - Original Format Compact */}
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Learn More Button - Compact Mobile */}
                <button
                  onClick={() => handleLearnMore(product.id)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group min-h-[40px] sm:min-h-[44px] text-xs sm:text-sm transform hover:scale-105"
                >
                  Learn More
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action - Mobile Optimized */}
        <div ref={ctaRef} className="text-center mt-8 sm:mt-12 px-4">
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
            Want to see these products in action? Book a free home demonstration.
          </p>
          <button
            onClick={() => {
              smoothScrollTo('contact', { offset: 80, duration: 800 });
              trackButtonClick('request_free_demo', 'products_section');
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-all duration-200 inline-flex items-center gap-2 min-h-[44px] text-sm sm:text-base transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Request FREE Demo
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}