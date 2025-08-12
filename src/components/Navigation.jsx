import { useState, useEffect } from "react";
import { Menu, X, Leaf, Heart, Shield, Zap } from "lucide-react";
import { cn } from "../utils/cn";
import { smoothScrollTo } from "../utils/animations";
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
    smoothScrollTo(sectionId, { offset: 80, duration: 800 });
    setIsMenuOpen(false);
    trackButtonClick(`nav_${sectionId}`, 'navigation');
  };

  // Handle demo button click
  const handleDemoClick = () => {
    smoothScrollTo("contact", { offset: 80, duration: 800 });
    setIsMenuOpen(false);
    trackButtonClick('nav_request_free_demo', 'navigation');
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
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
        isScrolled
          ? "bg-white/80 backdrop-blur-2xl shadow-lg border-b border-gray-100/50"
          : "bg-transparent"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-18 lg:h-22 py-2">
          {/* Modern Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                handleNavClick("home");
                trackButtonClick('nav_logo', 'navigation');
              }}
              className="flex items-center space-x-3 focus-ring rounded-xl p-2 -m-2 group transition-all duration-300"
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

          {/* Mobile Menu Button - Optimized for touch */}
          <div className="lg:hidden mobile-menu-container">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "p-3 rounded-xl focus-ring transition-all duration-300 touch-target",
                "hover:bg-green-50 active:bg-green-100",
                "border border-gray-200/50 hover:border-green-200",
                "min-h-12 min-w-12 flex items-center justify-center"
              )}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-40"
          aria-hidden="true"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Modern Mobile Menu - Optimized for touch */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-out lg:hidden z-50 border-l border-gray-100 safe-area-inset",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  handleNavClick("home");
                  trackButtonClick('mobile_nav_logo', 'mobile_navigation');
                }}
                className="flex items-center space-x-3 focus-ring rounded-lg p-2 -m-2 group transition-all duration-300"
                aria-label="NutriCook home"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-900">
                    NutriCook
                  </span>
                  <span className="text-xs text-green-600 font-medium">
                    Healthy Living
                  </span>
                </div>
              </button>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 focus-ring transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 py-6">
            <nav className="space-y-1 px-6" role="navigation">
              {navigationLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => {
                    handleNavClick(link.id);
                    trackButtonClick(`mobile_nav_${link.id}`, 'mobile_navigation');
                  }}
                  onKeyDown={(e) => handleKeyDown(e, link.id)}
                  className={cn(
                    "w-full text-left px-4 py-4 rounded-xl text-lg font-medium transition-all duration-200 focus-ring group mobile-nav-item touch-target",
                    "hover:bg-green-50 hover:text-green-700 hover:translate-x-1",
                    "min-h-14 flex items-center",
                    activeSection === link.id
                      ? "bg-green-50 text-green-700 border-l-4 border-green-500 shadow-sm"
                      : "text-gray-700"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                  aria-current={activeSection === link.id ? "page" : undefined}
                >
                  <div className="flex items-center justify-between w-full">
                    {link.label}
                    {activeSection === link.id && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile Menu CTA */}
          <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-green-50 to-teal-50">
            <Button
              onClick={() => {
                handleDemoClick();
                trackButtonClick('mobile_nav_request_free_demo', 'mobile_navigation');
              }}
              variant="primary"
              size="lg"
              fullWidth
              className="font-semibold shadow-lg bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
            >
              Get FREE Demo
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              No commitment • Free consultation
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
