export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-orange-500 mb-3 sm:mb-4">NutriCook</h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Premium surgical steel cookware for healthy, oil-free cooking. 
              Transforming kitchens and lives across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="text-gray-300 hover:text-orange-500 transition-colors focus:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">
                  Home
                </a>
              </li>
              <li>
                <a href="#why-nutricook" className="text-gray-300 hover:text-orange-500 transition-colors focus:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">
                  Why NutriCook?
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-300 hover:text-orange-500 transition-colors focus:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">
                  Our Products
                </a>
              </li>
              <li>
                <a href="#demo" className="text-gray-300 hover:text-orange-500 transition-colors focus:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">
                  Free Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Business</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#dealer" className="text-gray-300 hover:text-orange-500 transition-colors focus:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">
                  Become a Dealer
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-orange-500 transition-colors focus:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="tel:+919448169903" className="text-gray-300 hover:text-orange-500 transition-colors focus:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">
                  +91 9448169903
                </a>
              </li>
              <li>
                <a href="mailto:nutricooksmg@gmail.com" className="text-gray-300 hover:text-orange-500 transition-colors focus:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded break-all">
                  nutricooksmg@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <a href="?page=privacy-policy" className="text-gray-300 hover:text-orange-500 transition-colors focus:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="?page=terms-of-service" className="text-gray-300 hover:text-orange-500 transition-colors focus:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="?page=warranty-policy" className="text-gray-300 hover:text-orange-500 transition-colors focus:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">
                  Warranty Policy
                </a>
              </li>
              <li>
                <a href="?page=return-policy" className="text-gray-300 hover:text-orange-500 transition-colors focus:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              <p>© {currentYear} NutriCook. All rights reserved.</p>
              <p className="mt-1">Made with ❤️ for healthier cooking</p>
            </div>
            
            <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-right">
              <p>Surgical Grade 316L Steel Cookware</p>
              <p className="mt-1">30-Year Guarantee • Oil-Free Cooking</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}