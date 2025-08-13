import { useState, useEffect, lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import WarrantyPolicy from './components/WarrantyPolicy';
import ReturnPolicy from './components/ReturnPolicy';
import LazySection from './components/ui/LazySection';
import LoadingState from './components/ui/LoadingState';
import { BenefitsSkeleton, ProductCardSkeleton } from './components/ui/SkeletonLoader';
import { getActiveSection, throttle } from './utils/scroll';
import { initPerformanceOptimizations } from './utils/performanceOptimizations';
import { initializeAnimations } from './utils/animations';
import { initializeAnalytics } from './utils/analytics';

// Lazy load components that are below the fold
const Benefits = lazy(() => import('./components/Benefits'));
const Products = lazy(() => import('./components/Products'));
const Demo = lazy(() => import('./components/Demo'));
const Dealer = lazy(() => import('./components/Dealer'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Import responsive test for development
if (import.meta.env.DEV) {
  import('./utils/responsiveTest.js');
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentPage, setCurrentPage] = useState('home');
  
  const sections = ['home', 'why-nutricook', 'products', 'demo', 'dealer', 'contact'];

  useEffect(() => {
    // Check URL parameters for page routing
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    if (page === 'privacy-policy') {
      setCurrentPage('privacy-policy');
    } else if (page === 'terms-of-service') {
      setCurrentPage('terms-of-service');
    } else if (page === 'warranty-policy') {
      setCurrentPage('warranty-policy');
    } else if (page === 'return-policy') {
      setCurrentPage('return-policy');
    } else {
      setCurrentPage('home');
    }

    // Initialize comprehensive performance optimizations
    initPerformanceOptimizations();
    
    // Initialize animations
    const animationCleanup = initializeAnimations();
    
    // Initialize analytics
    const analyticsCleanup = initializeAnalytics();

    const handleScroll = throttle(() => {
      if (currentPage === 'home') {
        const currentSection = getActiveSection(sections);
        setActiveSection(currentSection);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationCleanup && animationCleanup.destroy) {
        animationCleanup.destroy();
      }
      if (analyticsCleanup && analyticsCleanup.destroy) {
        analyticsCleanup.destroy();
      }
    };
  }, [currentPage]);

  // Render Privacy Policy page
  if (currentPage === 'privacy-policy') {
    return <PrivacyPolicy />;
  }

  // Render Terms of Service page
  if (currentPage === 'terms-of-service') {
    return <TermsOfService />;
  }

  // Render Warranty Policy page
  if (currentPage === 'warranty-policy') {
    return <WarrantyPolicy />;
  }

  // Render Return Policy page
  if (currentPage === 'return-policy') {
    return <ReturnPolicy />;
  }

  // Render main homepage
  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-to-main sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-4 py-2 rounded-md z-50 focus:z-50"
      >
        Skip to main content
      </a>
      
      <Navigation activeSection={activeSection} />
      
      <main id="main-content" className="safe-area-inset">
        <section id="home" className="pt-18 lg:pt-22">
          <Hero />
        </section>
        
        <LazySection
          fallback={<BenefitsSkeleton />}
          rootMargin="100px"
        >
          <section id="why-nutricook">
            <Suspense fallback={<BenefitsSkeleton />}>
              <Benefits />
            </Suspense>
          </section>
        </LazySection>
        
        {/* Testimonials Section */}
        <section id="testimonials">
          <Testimonials />
        </section>
        
        <LazySection
          fallback={
            <div className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            </div>
          }
          rootMargin="150px"
        >
          <section id="products">
            <Suspense fallback={<LoadingState size="lg" text="Loading products..." />}>
              <Products />
            </Suspense>
          </section>
        </LazySection>
        
        <LazySection
          fallback={<LoadingState size="lg" text="Loading demo section..." />}
          rootMargin="100px"
        >
          <section id="demo">
            <Suspense fallback={<LoadingState size="lg" text="Loading demo section..." />}>
              <Demo />
            </Suspense>
          </section>
        </LazySection>
        
        <LazySection
          fallback={<LoadingState size="lg" text="Loading dealer information..." />}
          rootMargin="100px"
        >
          <section id="dealer">
            <Suspense fallback={<LoadingState size="lg" text="Loading dealer information..." />}>
              <Dealer />
            </Suspense>
          </section>
        </LazySection>
        
        <LazySection
          fallback={<LoadingState size="lg" text="Loading contact form..." />}
          rootMargin="100px"
        >
          <section id="contact">
            <Suspense fallback={<LoadingState size="lg" text="Loading contact form..." />}>
              <Contact />
            </Suspense>
          </section>
        </LazySection>
      </main>
      
      <Suspense fallback={<LoadingState size="sm" text="Loading footer..." />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;