import { useState, useEffect } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { cn } from "../utils/cn";

import { trackButtonClick } from "../utils/analytics";

const Navigation = ({ activeSection = "home" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  const navigationLinks = [
    { id: "home", label: "Home" },
    { id: "why-nutricook", label: "Why NutriCook?" },
    { id: "products", label: "Our Products" },
    { id: "dealer", label: "Become a Dealer" },
    { id: "contact", label: "Contact" },
  ];
  
  

  // Handle navigation click with smooth scrolling
  const handleNavClick = (sectionId) => {
    // Close menu first for better UX
    setIsMenuOpen(false);
    
    // Scroll to section with proper offset for fixed navigation
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64; // h-16 = 64px
      const offsetTop = element.offsetTop - navHeight;
      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth'
      });
    }
    
    trackButtonClick(`nav_${sectionId}`, 'navigation');
  };

  // Handle demo button click
  const handleDemoClick = () => {
    setIsMenuOpen(false);
    
    // Scroll to contact section
    const element = document.getElementById("contact");
    if (element) {
      const navHeight = 64; // h-16 = 64px
      const offsetTop = element.offsetTop - navHeight;
      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth'
      });
    }
    
    trackButtonClick('nav_request_free_demo', 'navigation');
  };

  // Close mobile menu when clicking outside (improved)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          !event.target.closest(".mobile-menu-container") && 
          !event.target.closest("#mobile-menu")) {
        setIsMenuOpen(false);
      }
    };

    // Add a small delay to prevent immediate closing
    if (isMenuOpen) {
      const timer = setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener("click", handleClickOutside);
      };
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Force navigation to stay visible - override any external animations
  useEffect(() => {
    const nav = document.querySelector('nav[role="navigation"]');
    if (nav) {
      // Force styles to ensure navigation stays visible
      nav.style.position = 'fixed';
      nav.style.top = '0';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.zIndex = '50';
      nav.style.transform = 'translateY(0px)';
      nav.style.visibility = 'visible';
      nav.style.opacity = '1';
      
      // Override any potential scroll listeners
      const handleScroll = () => {
        if (nav.style.transform !== 'translateY(0px)') {
          nav.style.transform = 'translateY(0px)';
        }
        if (nav.style.visibility !== 'visible') {
          nav.style.visibility = 'visible';
        }
        if (nav.style.opacity !== '1') {
          nav.style.opacity = '1';
        }
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // Handle menu toggle with improved functionality
  const toggleMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsMenuOpen(prev => !prev);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.classList.add("menu-open");
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.classList.remove("menu-open");
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  // Handle window resize to close mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event, sectionId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNavClick(sectionId);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100/50 shadow-sm"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transform: 'translateY(0px)',
        visibility: 'visible',
        opacity: 1
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Minimal Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                handleNavClick("home");
                trackButtonClick('nav_logo', 'navigation');
              }}
              className="flex items-center space-x-2 group transition-all duration-200 focus:outline-none"
              aria-label="NutriCook home"
            >
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors duration-200">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                NutriCook
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                onKeyDown={(e) => handleKeyDown(e, link.id)}
                className={cn(
                  "text-sm font-medium transition-all duration-300 focus:outline-none relative group px-3 py-2 rounded-lg",
                  activeSection === link.id
                    ? "text-green-600"
                    : "text-gray-600 hover:text-gray-900"
                )}
                aria-current={activeSection === link.id ? "page" : undefined}
              >
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
                
                {/* Text content */}
                <span className="relative z-10 group-hover:transform group-hover:-translate-y-0.5 transition-transform duration-300">
                  {link.label}
                </span>
                
                {/* Active indicator - larger underline */}
                {activeSection === link.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                )}
                
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-green-200 to-emerald-200 blur-sm scale-110"></div>
              </button>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => {
                handleDemoClick();
                trackButtonClick('nav_request_free_demo', 'navigation');
              }}
              className="relative px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg focus:outline-none group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5"
            >
              {/* Background gradient animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              
              {/* Button text */}
              <span className="relative z-10">Get Demo</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              type="button"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* No overlay - clean design */}

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed top-0 right-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-200 ease-out lg:hidden z-50",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                <Leaf className="w-3 h-3 text-white" />
              </div>
              <span className="font-semibold text-gray-900">NutriCook</span>
            </div>
            <button
              onClick={toggleMenu}
              className="p-1 text-gray-600 hover:text-gray-900 focus:outline-none"
              type="button"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-4">
            <nav className="space-y-1 px-4" role="navigation">
              {navigationLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => {
                    handleNavClick(link.id);
                    trackButtonClick(`mobile_nav_${link.id}`, 'mobile_navigation');
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm font-medium transition-all duration-300 focus:outline-none rounded group relative overflow-hidden",
                    activeSection === link.id
                      ? "text-green-600 bg-green-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                  type="button"
                  aria-current={activeSection === link.id ? "page" : undefined}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: isMenuOpen ? 'slideInFromRight 0.3s ease-out forwards' : 'none'
                  }}
                >
                  {/* Hover slide effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  
                  {/* Text content */}
                  <span className="relative z-10 group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
                    {link.label}
                  </span>
                  
                  {/* Active indicator */}
                  {activeSection === link.id && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-green-500 rounded-r"></div>
                  )}
                </button>
              ))}
            </nav>
            
            {/* CTA Button */}
            <div className="px-4 mt-6">
              <button
                onClick={() => {
                  handleDemoClick();
                  trackButtonClick('mobile_nav_request_free_demo', 'mobile_navigation');
                }}
                className="w-full px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none"
                type="button"
              >
                Get Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
