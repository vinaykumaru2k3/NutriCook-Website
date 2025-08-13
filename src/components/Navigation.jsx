import { useState, useEffect } from "react";
import { Menu, X, Leaf, Heart, Shield, Zap } from "lucide-react";
import { cn } from "../utils/cn";

import { useNavigationScroll } from "../hooks/useAnimations";
import { trackButtonClick } from "../utils/analytics";
import Button from "./ui/Button";

const Navigation = ({ activeSection = "home" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useNavigationScroll();



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
    
    // Simple scroll implementation as fallback
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }, 100);
    
    trackButtonClick(`nav_${sectionId}`, 'navigation');
  };

  // Handle demo button click
  const handleDemoClick = () => {
    setIsMenuOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById("contact");
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }, 100);
    
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

  // Handle scroll effect for glassmorphism (desktop only)
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 nav-animated",
        // Mobile: Always solid background
        "bg-white shadow-sm border-b border-gray-100",
        // Desktop: Transparent by default, glassmorphism when scrolled
        "lg:bg-transparent lg:shadow-none lg:border-none",
        isScrolled && "lg:bg-white/80 lg:backdrop-blur-2xl lg:shadow-lg lg:border-b lg:border-gray-100/50"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-18 lg:h-22 py-2">
          {/* Modern Logo */}
          <div className="flex-shrink-0 logo-container">
            <button
              onClick={() => {
                handleNavClick("home");
                trackButtonClick('nav_logo', 'navigation');
              }}
              className="flex items-center space-x-3 focus-ring rounded-xl p-2 -m-2 group transition-all duration-300 logo-container"
              aria-label="NutriCook home"
            >
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Leaf className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-none">
                  NutriCook
                </span>
                <span className="text-xs text-green-600 font-medium leading-none tracking-wide">
                  Healthy Living
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                onKeyDown={(e) => handleKeyDown(e, link.id)}
                className={cn(
                  "relative px-4 py-2.5 text-sm font-medium transition-all duration-300 focus-ring rounded-lg group",
                  "hover:text-green-600 hover:bg-green-50/80",
                  activeSection === link.id
                    ? "text-green-600 bg-green-50/80"
                    : "text-gray-700"
                )}
                aria-current={activeSection === link.id ? "page" : undefined}
              >
                {link.label}
                {/* Modern Active Indicator */}
                {activeSection === link.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></div>
                )}
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-green-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <Button
              onClick={() => {
                handleDemoClick();
                trackButtonClick('nav_request_free_demo', 'navigation');
              }}
              variant="primary"
              size="md"
              className="font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
            >
              Get FREE Demo
            </Button>
          </div>

          {/* Mobile Menu Button - Improved functionality */}
          <div className="lg:hidden mobile-menu-container">
            <button
              onClick={toggleMenu}
              className={cn(
                "relative p-3 rounded-lg transition-all duration-200 touch-target",
                "bg-white hover:bg-gray-50 active:bg-gray-100",
                "border border-gray-200 hover:border-gray-300 shadow-sm",
                "min-h-12 min-w-12 flex items-center justify-center",
                "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
                isMenuOpen && "bg-gray-100 border-gray-300"
              )}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              type="button"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* No overlay - clean design */}

      {/* Clean Mobile Menu - Full Height */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed top-0 right-0 h-screen w-72 max-w-[80vw] bg-white shadow-xl transform transition-transform duration-300 ease-out lg:hidden z-50 border-l border-gray-200",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-screen bg-white">
          {/* Clean Header with Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-gray-900">NutriCook</span>
                <span className="text-xs text-green-600 font-medium">Healthy Living</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMenu();
              }}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              type="button"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Navigation Links - Reduced Spacing */}
          <div className="flex-1 py-3 bg-white">
            <nav className="space-y-1 px-4" role="navigation">
              {navigationLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleNavClick(link.id);
                    trackButtonClick(`mobile_nav_${link.id}`, 'mobile_navigation');
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                    "min-h-12 flex items-center justify-between cursor-pointer",
                    "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
                    activeSection === link.id
                      ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                  type="button"

                  aria-current={activeSection === link.id ? "page" : undefined}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>
            
            {/* CTA Button - Moved closer to navigation links */}
            <div className="px-4 mt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDemoClick();
                  trackButtonClick('mobile_nav_request_free_demo', 'mobile_navigation');
                }}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
                type="button"
              >
                Get FREE Demo
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                No commitment • Free consultation
              </p>
            </div>
          </div>

          {/* Bottom Section - Optional additional content */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Surgical Grade Steel • 30-Year Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
