// Analytics utilities for NutriCook website

// Initialize Google Analytics
export const initAnalytics = () => {
  // Check if gtag is available
  if (typeof window !== 'undefined' && window.gtag) {
    // Configure Google Analytics
    window.gtag('config', 'G-XXXXXXXXXX', {
      // Custom parameters
      custom_map: {
        dimension1: 'user_type',
        dimension2: 'page_type',
        metric1: 'form_submissions',
        metric2: 'demo_requests'
      }
    });
    
    console.log('Google Analytics initialized');
  } else {
    console.warn('Google Analytics not found');
  }
};

// Track page view
export const trackPageView = (pagePath, pageTitle) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
};

// Track custom event
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...eventParams,
      // Add timestamp
      timestamp: new Date().toISOString()
    });
  }
};

// Track form submission
export const trackFormSubmission = (formType, success = true) => {
  trackEvent('form_submission', {
    form_type: formType,
    success: success,
    // Add form-specific data
    form_data: {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language
    }
  });
};

// Track demo request
export const trackDemoRequest = (requestData) => {
  trackEvent('demo_request', {
    event_category: 'engagement',
    event_label: 'demo_request',
    // Add demo-specific data
    demo_data: {
      ...requestData,
      timestamp: new Date().toISOString()
    }
  });
};

// Track product view
export const trackProductView = (productId, productName) => {
  trackEvent('product_view', {
    product_id: productId,
    product_name: productName,
    event_category: 'engagement',
    event_label: 'product_view'
  });
};

// Track scroll depth
export const trackScrollDepth = (depth) => {
  // Only track significant scroll events
  if (depth >= 25 && depth < 50) {
    trackEvent('scroll_depth', {
      scroll_percentage: depth,
      event_category: 'engagement',
      event_label: '25_percent_scroll'
    });
  } else if (depth >= 50 && depth < 75) {
    trackEvent('scroll_depth', {
      scroll_percentage: depth,
      event_category: 'engagement',
      event_label: '50_percent_scroll'
    });
  } else if (depth >= 75 && depth < 100) {
    trackEvent('scroll_depth', {
      scroll_percentage: depth,
      event_category: 'engagement',
      event_label: '75_percent_scroll'
    });
  } else if (depth >= 100) {
    trackEvent('scroll_depth', {
      scroll_percentage: depth,
      event_category: 'engagement',
      event_label: '100_percent_scroll'
    });
  }
};

// Track time on page
export const trackTimeOnPage = (seconds) => {
  // Track time on page in 30-second intervals
  const interval = Math.floor(seconds / 30) * 30;
  
  if (interval >= 30) {
    trackEvent('time_on_page', {
      time_spent: interval,
      event_category: 'engagement',
      event_label: `${interval}_seconds`
    });
  }
};

// Track outbound link click
export const trackOutboundLink = (url) => {
  trackEvent('outbound_link_click', {
    link_url: url,
    event_category: 'engagement',
    event_label: 'outbound_link'
  });
};

// Track file download
export const trackFileDownload = (fileName, fileType) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
    event_category: 'engagement',
    event_label: 'file_download'
  });
};

// Track video play
export const trackVideoPlay = (videoId, videoTitle) => {
  trackEvent('video_play', {
    video_id: videoId,
    video_title: videoTitle,
    event_category: 'engagement',
    event_label: 'video_play'
  });
};

// Track button click
export const trackButtonClick = (buttonName, buttonLocation) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: buttonLocation,
    event_category: 'engagement',
    event_label: 'button_click'
  });
};

// Initialize scroll tracking
export const initScrollTracking = () => {
  let scrollTimer;
  let lastScrollDepth = 0;
  
  const handleScroll = () => {
    // Clear the previous timer
    clearTimeout(scrollTimer);
    
    // Set a new timer
    scrollTimer = setTimeout(() => {
      // Calculate scroll depth as a percentage
      const scrollDepth = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      // Only track if we've scrolled further than before
      if (scrollDepth > lastScrollDepth) {
        lastScrollDepth = scrollDepth;
        trackScrollDepth(scrollDepth);
      }
    }, 1000); // Wait 1 second after scrolling stops
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Initialize time tracking
export const initTimeTracking = () => {
  const startTime = new Date().getTime();
  
  const trackTime = () => {
    const currentTime = new Date().getTime();
    const timeSpent = Math.round((currentTime - startTime) / 1000);
    trackTimeOnPage(timeSpent);
  };
  
  // Track time when user leaves the page
  window.addEventListener('beforeunload', trackTime);
  
  // Track time every 30 seconds while user is on the page
  setInterval(trackTime, 30000);
};

// Initialize analytics
export const initializeAnalytics = () => {
  // Initialize Google Analytics
  initAnalytics();
  
  // Initialize scroll tracking
  initScrollTracking();
  
  // Initialize time tracking
  initTimeTracking();
  
  console.log('Analytics tracking initialized');
};

// Export all functions for use in components
export default {
  initAnalytics,
  trackPageView,
  trackEvent,
  trackFormSubmission,
  trackDemoRequest,
  trackProductView,
  trackScrollDepth,
  trackTimeOnPage,
  trackOutboundLink,
  trackFileDownload,
  trackVideoPlay,
  trackButtonClick,
  initScrollTracking,
  initTimeTracking,
  initializeAnalytics
};