import { ArrowLeft, FileText, Shield, AlertTriangle, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useAnimatedRef } from '../hooks/useAnimations';
import Container from './ui/Container';

export default function TermsOfService() {
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
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Terms of Service</h1>
              </div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Please read these terms and conditions carefully before using our website or purchasing our products.
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
          
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to NutriCook</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              These Terms of Service ("Terms") govern your use of the NutriCook website and the purchase of our premium surgical steel cookware products. By accessing our website or making a purchase, you agree to be bound by these Terms.
            </p>
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 font-medium">
                If you do not agree with any part of these terms, please do not use our website or purchase our products.
              </p>
            </div>
          </div>

          {/* Product Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">1. Product Information</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                NutriCook offers premium surgical grade 316L steel cookware designed for healthy, oil-free, and waterless cooking. All product descriptions, specifications, and images on our website are provided for informational purposes.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>All products come with a 30-year manufacturing guarantee</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Products are made from surgical grade 316L stainless steel</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Free home demonstrations are available in our service areas</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Ordering and Payment */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">2. Ordering and Payment</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                Currently, we do not process online payments through our website. All orders are processed through direct contact and offline payment methods.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Order Process:</h4>
                <ol className="space-y-2 text-gray-600">
                  <li>1. Request a free home demonstration through our website</li>
                  <li>2. Our representative will contact you to schedule the demo</li>
                  <li>3. During the demo, you can place your order directly</li>
                  <li>4. Payment is collected through cash, cheque, or bank transfer</li>
                  <li>5. Products are delivered within 7-14 business days</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Delivery and Shipping */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">3. Delivery and Shipping</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                We currently serve the following areas: Kolar, Bangalore, Shivamogga, Mysuru, and Chennai. We are expanding to more cities soon.
              </p>
              <div className="grid gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Delivery Timeline:</h4>
                  <p className="text-gray-600">Standard delivery takes 7-14 business days from order confirmation.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Delivery Charges:</h4>
                  <p className="text-gray-600">Free delivery within our service areas for orders above ₹10,000.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty and Returns */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">4. Warranty and Returns</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                All NutriCook products come with a comprehensive 30-year manufacturing guarantee against defects in materials and workmanship.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Warranty Coverage:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Manufacturing defects in materials</li>
                  <li>• Workmanship issues</li>
                  <li>• Structural integrity problems</li>
                  <li>• Handle and lid defects</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-semibold text-gray-900 mb-2">Not Covered:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Normal wear and tear</li>
                  <li>• Damage due to misuse or negligence</li>
                  <li>• Scratches from normal use</li>
                  <li>• Damage from dishwashers (hand wash recommended)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">5. Limitation of Liability</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                NutriCook's liability is limited to the replacement or repair of defective products under warranty. We are not liable for any indirect, incidental, or consequential damages.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-gray-700">
                  <strong>Important:</strong> Always follow the provided cooking instructions and safety guidelines for optimal performance and safety.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Phone className="w-6 h-6" />
              6. Contact Us
            </h2>
            <p className="text-orange-100 leading-relaxed mb-6">
              If you have any questions about these Terms of Service, please contact us:
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