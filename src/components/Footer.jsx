export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold text-orange-500 mb-4">NutriCook</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium surgical steel cookware for healthy, oil-free cooking. 
              Transforming kitchens and lives across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#why-nutricook" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Why NutriCook?
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Our Products
                </a>
              </li>
              <li>
                <a href="#demo" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Free Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="font-semibold text-white mb-4">Business</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#dealer" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Become a Dealer
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="text-gray-300 hover:text-orange-500 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:demo@nutricook.com" className="text-gray-300 hover:text-orange-500 transition-colors">
                  demo@nutricook.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Warranty Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400 text-center md:text-left">
              <p>© {currentYear} NutriCook. All rights reserved.</p>
              <p className="mt-1">Made with ❤️ for healthier cooking</p>
            </div>
            
            <div className="text-sm text-gray-400 text-center md:text-right">
              <p>Surgical Grade 316L Steel Cookware</p>
              <p className="mt-1">30-Year Guarantee • Oil-Free Cooking</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}