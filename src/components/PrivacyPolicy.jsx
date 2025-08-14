import { ArrowLeft, Shield, Lock, Eye, Users, FileText, Phone, Mail, MapPin } from 'lucide-react';
import { useAnimatedRef } from '../hooks/useAnimations';
import Container from './ui/Container';

export default function PrivacyPolicy() {
  const headerRef = useAnimatedRef('fadeInUp', 0);
  const contentRef = useAnimatedRef('fadeInUp', 200);

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const sections = [
    {
      id: 'information-we-collect',
      title: '1. Information We Collect',
      icon: <Eye className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            We collect information to provide and improve our service to you. The types of information we collect are:
          </p>
          
          <div className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-gray-900 mb-2">a) Personal Data You Provide to Us:</h4>
              <p className="text-gray-600 mb-3">This is information that you voluntarily give us when you make a purchase, create an account, or contact us.</p>
              <ul className="space-y-1 text-gray-600">
                <li><strong>Contact Information:</strong> Your full name, email address, phone number.</li>
                <li><strong>Shipping & Billing Information:</strong> Your shipping address and billing address.</li>
                <li><strong>Account Information:</strong> Your username and password if you create an account on our site.</li>
                <li><strong>Communication Data:</strong> Information you provide when you contact our customer support or communicate with us in any other way.</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-gray-900 mb-2">b) Information Collected Automatically:</h4>
              <p className="text-gray-600 mb-3">As you navigate through the site, we may use automatic data collection technologies to collect certain information about your equipment and browsing actions.</p>
              <ul className="space-y-1 text-gray-600">
                <li><strong>Usage Data:</strong> Information on how you use our website, such as the pages you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.</li>
                <li><strong>Device Information:</strong> Your IP address, browser type, browser version, operating system, and other technical information.</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-gray-900 mb-2">c) Payment Information:</h4>
              <p className="text-gray-600">
                Our website does not currently support online payments. When you place an order, we will contact you directly to arrange for payment through offline methods. We do not collect or store any credit card, debit card, or net banking details on our website.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'how-we-use',
      title: '2. How We Use Your Information',
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            We use the information we collect for various purposes, including:
          </p>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div><strong>To Fulfill Your Orders:</strong> To process your orders, arrange for shipping, and provide you with invoices and order confirmations.</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div><strong>To Provide Customer Support:</strong> To respond to your inquiries, resolve issues, and manage your requests.</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div><strong>To Improve Our Website:</strong> To understand how our users interact with our site so we can improve the user experience, design, and product offerings.</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div><strong>For Marketing and Communications:</strong> To send you information about new products, special offers, and other updates that may be of interest to you. You will always have the option to opt-out of receiving these communications.</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div><strong>For Security and Legal Compliance:</strong> To prevent fraud, enforce our terms of service, and comply with legal obligations.</div>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'how-we-share',
      title: '3. How We Share Your Information',
      icon: <Shield className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            We do not sell or rent your personal data to third parties. We only share your information with trusted partners who help us operate our business, under strict confidentiality agreements.
          </p>
          <div className="grid gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Logistics & Courier Partners:</h4>
              <p className="text-gray-600">We share your name, address, and phone number with our courier partners to deliver your orders.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Marketing & Analytics Partners:</h4>
              <p className="text-gray-600">We may share non-personal, aggregated data with partners like Google Analytics to help us understand website traffic and user behavior.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Legal Authorities:</h4>
              <p className="text-gray-600">We may disclose your information if required to do so by law or in response to valid requests by public authorities.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-security',
      title: '4. Data Security',
      icon: <Lock className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            We take the security of your data very seriously. We implement reasonable technical and administrative security measures to protect your personal information from unauthorized access, use, or disclosure. Our website uses Secure Sockets Layer (SSL) technology to encrypt data during transmission.
          </p>
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <p className="text-gray-600">
              <strong>Important:</strong> Please remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'cookies',
      title: '5. Cookies and Tracking Technologies',
      icon: <FileText className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. They are used to improve your experience by, for example, remembering the items in your shopping cart.
          </p>
          <p className="text-gray-600 leading-relaxed">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
          </p>
        </div>
      )
    },
    {
      id: 'your-rights',
      title: '6. Your Rights and Choices',
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            You have certain rights regarding your personal information:
          </p>
          <div className="grid gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Access and Correction:</h4>
              <p className="text-gray-600">You have the right to access and update the personal information that we hold about you. You can do this through your account settings or by contacting us.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Opt-Out of Marketing:</h4>
              <p className="text-gray-600">You can unsubscribe from our marketing email list at any time by clicking the "unsubscribe" link at the bottom of our emails.</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Data Deletion:</h4>
              <p className="text-gray-600">You may request the deletion of your personal data, subject to certain legal obligations we may have to retain some information.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'childrens-privacy',
      title: '7. Children\'s Privacy',
      icon: <Shield className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Our website is not intended for use by children under the age of 18. We do not knowingly collect personal data from children. If we become aware that we have collected personal data from a child without verification of parental consent, we will take steps to remove that information from our servers.
          </p>
        </div>
      )
    },
    {
      id: 'changes',
      title: '8. Changes to This Privacy Policy',
      icon: <FileText className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. We encourage you to review this Privacy Policy periodically for any changes.
          </p>
        </div>
      )
    }
  ];

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
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Privacy Policy</h1>
              </div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We are committed to protecting your privacy and ensuring that your personal data is handled with care and respect.
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
        <div ref={contentRef} className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to NutriCook</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We are committed to protecting your privacy and ensuring that your personal data is handled with care and respect. This Privacy Policy outlines how we collect, use, share, and protect your information when you visit our website, purchase our products, or otherwise interact with our brand.
            </p>
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 font-medium">
                By using our website, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.id} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                {section.content}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg p-8 mt-8 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Phone className="w-6 h-6" />
              9. Contact Us
            </h2>
            <p className="text-orange-100 leading-relaxed mb-6">
              If you have any questions or concerns about this Privacy Policy or our data practices, please do not hesitate to contact us:
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

          {/* Back to Top */}
          <div className="text-center mt-12">
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