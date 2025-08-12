import { useState } from 'react';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';
import LazyImage from './ui/LazyImage';

// Product data structure with specifications, pricing, and features
const products = [
  {
    id: 'biriyani-pot-12l',
    name: '12 Ltr Biriyani Pot',
    image: '/images/products/biriyani-pot-12l.jpg',
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
    image: '/images/products/fish-pot-6l.jpg',
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
    image: '/images/products/casserole-3l.jpg',
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
    id: 'casserole-5l',
    name: '5 Ltr Casserole',
    image: '/images/products/casserole-5l.jpg',
    capacity: '5 Litres',
    dimensions: '26cm x 14cm',
    price: 17490,
    originalPrice: 19990,
    features: [
      'Surgical Grade 316L Steel',
      'Large Family Size',
      'Energy Efficient',
      '30-Year Guarantee'
    ],
    category: 'casserole',
    description: 'Ideal for medium to large families. Perfect for cooking rice, dal, and vegetables.'
  },
  {
    id: 'frying-pan-24cm',
    name: '24cm Frying Pan',
    image: '/images/products/frying-pan-24cm.jpg',
    capacity: '2.5 Litres',
    dimensions: '24cm x 6cm',
    price: 12490,
    originalPrice: 14490,
    features: [
      'Surgical Grade 316L Steel',
      'Non-Stick Surface',
      'Oil-Free Cooking',
      '30-Year Guarantee'
    ],
    category: 'pan',
    isNew: true,
    description: 'Revolutionary frying pan that requires no oil. Perfect for healthy frying and sautéing.'
  },
  {
    id: 'complete-set',
    name: 'Complete Cookware Set',
    image: '/images/products/complete-set.jpg',
    capacity: 'Multiple Sizes',
    dimensions: 'Various',
    price: 89990,
    originalPrice: 109990,
    features: [
      '8-Piece Complete Set',
      'All Essential Cookware',
      'Maximum Savings',
      '30-Year Guarantee'
    ],
    category: 'set',
    isBestseller: true,
    description: 'Complete kitchen solution with all essential NutriCook cookware at maximum savings.'
  }
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'pot', name: 'Pots' },
    { id: 'casserole', name: 'Casseroles' },
    { id: 'pan', name: 'Pans' },
    { id: 'set', name: 'Sets' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleLearnMore = (productId) => {
    // Handle learn more click - could open modal, navigate to detail page, etc.
    console.log('Learn more clicked for product:', productId);
    // For now, scroll to contact section to request demo
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
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
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore the NutriCook Range
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our complete collection of surgical steel cookware designed for healthy, 
            oil-free cooking. Each piece comes with a 30-year guarantee.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid - Responsive Optimization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 grid-responsive">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group card-mobile"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <LazyImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300 responsive-image"
                  placeholder={
                    <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-200 animate-pulse flex items-center justify-center">
                      <div className="text-gray-400 text-sm">Loading image...</div>
                    </div>
                  }
                  fallback={
                    <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-100 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <div className="text-lg font-medium">{product.name}</div>
                        <div className="text-sm">Image unavailable</div>
                      </div>
                    </div>
                  }
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isBestseller && (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Bestseller
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      New
                    </span>
                  )}
                </div>

                {/* Discount Badge */}
                {product.originalPrice && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 text-readable">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Specifications */}
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>Capacity: {product.capacity}</span>
                  <span>Size: {product.dimensions}</span>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {index === 0 && <Shield className="w-3 h-3" />}
                        {index === 1 && <Zap className="w-3 h-3" />}
                        {feature}
                      </span>
                    ))}
                  </div>
                  {product.features.length > 2 && (
                    <span className="text-xs text-gray-500 mt-1 block">
                      +{product.features.length - 2} more features
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Learn More Button */}
                <button
                  onClick={() => handleLearnMore(product.id)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group touch-target min-h-12 text-base"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Want to see these products in action? Book a free home demonstration.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
          >
            Request FREE Demo
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}