import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Clock, Phone, Mail, MapPin, Award } from 'lucide-react';
import { useAnimatedRef } from '../hooks/useAnimations';
import Container from './ui/Container';

export default function WarrantyPolicy() {
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
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Warranty Policy</h1>
              </div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Your NutriCook products are backed by our comprehensive 30-year manufacturing guarantee.
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
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">30-Year Manufacturing Guarantee</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              At NutriCook, we stand behind the quality and craftsmanship of our premium surgical steel cookware. Every product comes with an industry-leading 30-year manufacturing guarantee, demonstrating our confidence in the superior materials and construction methods we use.
            </p>
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <p className="text-gray-700 font-medium">
                This warranty covers manufacturing defects and ensures that your investment in healthy cooking will last for decades.
              </p>
            </div>
          </div>

          {/* What's Covered */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What's Covered</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                Our comprehensive warranty covers all manufacturing defects and material failures under normal household use:
              </p>
              
              <div className="grid gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    Material Defects
                  </h4>
                  <ul className="space-y-1 text-gray-600 ml-7">
                    <li>• Defects in surgical grade 316L stainless steel</li>
                    <li>• Structural integrity issues</li>
                    <li>• Base warping or deformation</li>
                    <li>• Metal composition problems</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Workmanship Issues
                  </h4>
                  <ul className="space-y-1 text-gray-600 ml-7">
                    <li>• Welding defects or joint failures</li>
                    <li>• Handle attachment problems</li>
                    <li>• Lid fitting issues</li>
                    <li>• Manufacturing assembly errors</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                    Functional Problems
                  </h4>
                  <ul className="space-y-1 text-gray-600 ml-7">
                    <li>• Heat distribution irregularities due to manufacturing defects</li>
                    <li>• Vacuum seal failures in waterless cooking</li>
                    <li>• Temperature control knob malfunctions</li>
                    <li>• Steam vent mechanism defects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* What's NOT Covered */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What's NOT Covered</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                The following are not covered under our warranty as they result from normal use or misuse:
              </p>
              
              <div className="grid gap-4">
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-gray-900 mb-2">Normal Wear and Tear</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Surface scratches from normal cooking and cleaning</li>
                    <li>• Natural patina or color changes over time</li>
                    <li>• Minor dents from regular handling</li>
                    <li>• Gradual dulling of finish</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-2">Misuse or Negligence</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Damage from overheating or excessive heat</li>
                    <li>• Damage from dropping or impact</li>
                    <li>• Damage from using abrasive cleaners or steel wool</li>
                    <li>• Damage from dishwasher use (hand washing recommended)</li>
                    <li>• Damage from storing acidic foods for extended periods</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-gray-900 mb-2">External Factors</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Damage during shipping (covered under separate shipping policy)</li>
                    <li>• Damage from accidents or natural disasters</li>
                    <li>• Modifications or repairs by unauthorized persons</li>
                    <li>• Commercial or industrial use (warranty covers household use only)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty Claims Process */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How to Claim Warranty</h2>
            </div>
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                If you believe your NutriCook product has a manufacturing defect, follow these simple steps:
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Contact Our Support Team</h4>
                    <p className="text-gray-600">Call us at +91 9448169903 or email nutricooksmg@gmail.com with your concern.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Provide Product Information</h4>
                    <p className="text-gray-600">Share your purchase details, product model, and describe the issue with photos if possible.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Assessment and Resolution</h4>
                    <p className="text-gray-600">Our team will assess your claim and arrange for inspection, repair, or replacement as needed.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Quick Resolution</h4>
                    <p className="text-gray-600">Valid warranty claims are typically resolved within 7-14 business days.</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 mb-2">Required Information for Claims:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Purchase date and location</li>
                  <li>• Product model and serial number (if applicable)</li>
                  <li>• Clear description of the defect or issue</li>
                  <li>• Photos showing the problem area</li>
                  <li>• Your contact information and address</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Care Instructions */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Care Instructions to Maintain Warranty</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                To ensure your warranty remains valid and your cookware lasts for decades, follow these care guidelines:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">✅ Do's</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Hand wash with mild soap and warm water</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Use low to medium heat settings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Allow cookware to cool before washing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Use wooden or silicone utensils</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Store in a dry place</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">❌ Don'ts</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Don't use in dishwashers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Don't use abrasive cleaners or steel wool</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Don't use high heat settings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Don't store acidic foods for long periods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Don't drop or impact the cookware</span>
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
              Warranty Support Contact
            </h2>
            <p className="text-orange-100 leading-relaxed mb-6">
              For warranty claims, questions, or support, our dedicated team is here to help:
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
                <strong>Support Hours:</strong> Monday to Saturday, 9:00 AM - 8:00 PM IST
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