import { ArrowLeft, Package, AlertTriangle, CheckCircle, Truck, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useAnimatedRef } from '../hooks/useAnimations';
import Container from './ui/Container';

export default function ReturnPolicy() {
  const headerRef = useAnimatedRef('fadeInUp', 0);
  const contentRef = useAnimatedRef('fadeInUp', 200);

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <Container>
          <div className="py-6">
            <button
              onClick={handleBackToHome}
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg px-2 py-1"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
            
            <div ref={headerRef} className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Return Policy</h1>
              </div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our policy regarding returns, exchanges, and product replacements for shipping damage.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <strong>Effective Date:</strong> August 13, 2025
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-12">
        <div ref={contentRef} className="max-w-4xl mx-auto space-y-8">
          
          {/* Important Notice */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Important Notice</h2>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-red-900 mb-4">No Returns or Exchanges Policy</h3>
              <p className="text-red-800 leading-relaxed mb-4">
                <strong>NutriCook does not undertake returns or exchanges</strong> of products under normal circumstances. 
                All sales are final once the product has been delivered and accepted by the customer.
              </p>
              <p className="text-red-700 text-sm">
                This policy is in place due to the premium nature of our surgical steel cookware and hygiene considerations 
                for products intended for food preparation.
              </p>
            </div>
          </div>

          {/* Shipping Damage Exception */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <Truck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Shipping Damage Replacement</h2>
            </div>
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                The <strong>only exception</strong> to our no-return policy is when products arrive damaged due to shipping or transit issues. 
                In such cases, we will replace the damaged product at no additional cost to you.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-blue-900 mb-4">What Qualifies as Shipping Damage?</h3>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Physical Damage</h4>
                      <p className="text-blue-800 text-sm">Dents, cracks, or deformation caused during transit</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Broken Components</h4>
                      <p className="text-blue-800 text-sm">Damaged handles, lids, or other detachable parts</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Packaging Damage</h4>
                      <p className="text-blue-800 text-sm">Severely damaged packaging that resulted in product damage</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Missing Items</h4>
                      <p className="text-blue-800 text-sm">Incomplete delivery or missing components from the set</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What Does NOT Qualify */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What Does NOT Qualify for Replacement</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                The following situations do <strong>not</strong> qualify for product replacement:
              </p>
              
              <div className="grid gap-4">
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-900 mb-2">Change of Mind</h4>
                  <p className="text-red-800 text-sm">
                    Deciding you no longer want the product, prefer a different size, or found a better deal elsewhere.
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-900 mb-2">Cosmetic Preferences</h4>
                  <p className="text-orange-800 text-sm">
                    Disliking the appearance, finish, or design after seeing the actual product.
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-900 mb-2">Size or Capacity Issues</h4>
                  <p className="text-yellow-800 text-sm">
                    Realizing the product is too large or small for your needs after delivery.
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-900 mb-2">User-Caused Damage</h4>
                  <p className="text-purple-800 text-sm">
                    Damage caused after delivery due to misuse, accidents, or improper handling.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-500">
                  <h4 className="font-semibold text-gray-900 mb-2">Normal Wear and Tear</h4>
                  <p className="text-gray-800 text-sm">
                    Minor scratches, discoloration, or other signs of normal use after the product has been used.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reporting Shipping Damage */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How to Report Shipping Damage</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-green-800 font-medium mb-2">
                  ⏰ <strong>Time Limit:</strong> Shipping damage must be reported within 48 hours of delivery.
                </p>
                <p className="text-green-700 text-sm">
                  This ensures we can quickly resolve the issue and prevents confusion with post-delivery damage.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Step-by-Step Process:</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Immediate Inspection</h4>
                      <p className="text-gray-600">Inspect your package immediately upon delivery, preferably in the presence of the delivery person.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Document the Damage</h4>
                      <p className="text-gray-600">Take clear photos of the damaged product, packaging, and any visible issues from multiple angles.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Contact Us Immediately</h4>
                      <p className="text-gray-600">Call +91 9448169903 or email nutricooksmg@gmail.com within 48 hours with your photos and order details.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Provide Required Information</h4>
                      <p className="text-gray-600">Share your order number, delivery date, photos of damage, and contact information.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Replacement Processing</h4>
                      <p className="text-gray-600">We'll arrange for pickup of the damaged item and dispatch a replacement within 3-5 business days.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Required Information for Damage Claims:</h4>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Order number and purchase date</li>
                  <li>• Delivery date and time</li>
                  <li>• Clear photos of the damaged product</li>
                  <li>• Photos of the packaging condition</li>
                  <li>• Description of the damage observed</li>
                  <li>• Your contact information and delivery address</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Prevention Tips */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600">
                <Package className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Prevention & Best Practices</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                To minimize the risk of shipping damage and ensure smooth delivery:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">📦 During Delivery</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Be present during delivery if possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Inspect packaging before accepting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Note any visible damage on delivery receipt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Open and inspect immediately after delivery</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">🏠 Address Details</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Provide complete and accurate address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Include landmarks for easy location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Ensure someone is available to receive</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Keep your phone accessible for delivery calls</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Phone className="w-6 h-6" />
              Report Shipping Damage
            </h2>
            <p className="text-orange-100 leading-relaxed mb-6">
              If you receive a damaged product, contact us immediately. Our team will resolve the issue quickly:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-200" />
                <div>
                  <div className="font-semibold">Email</div>
                  <a href="mailto:nutricooksmg@gmail.com" className="text-orange-100 hover:text-white transition-colors">
                    nutricooksmg@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-200" />
                <div>
                  <div className="font-semibold">Phone</div>
                  <a href="tel:+919448169903" className="text-orange-100 hover:text-white transition-colors">
                    +91 9448169903
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-200" />
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-orange-100">Shivamogga</div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-orange-600/50 p-4 rounded-lg">
              <p className="text-orange-100 text-sm">
                <strong>Response Time:</strong> We respond to shipping damage reports within 2-4 hours during business hours.
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <button
              onClick={handleBackToHome}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Return to NutriCook Home
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}