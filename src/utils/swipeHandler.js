// Enhanced Swipe Handler for Mobile Carousels
// Provides robust touch/swipe functionality for image carousels

/**
 * Swipe configuration options
 */
const DEFAULT_SWIPE_CONFIG = {
  minSwipeDistance: 50,        // Minimum distance for a valid swipe
  maxSwipeTime: 1000,          // Maximum time for a valid swipe (ms)
  preventDefaultTouchMove: true, // Prevent default touch move behavior
  enableMouseSwipe: false,     // Enable mouse drag on desktop
  velocityThreshold: 0.3,      // Minimum velocity for swipe detection
  directionThreshold: 30,      // Maximum angle deviation for horizontal swipe
};

/**
 * Enhanced swipe handler class
 */
export class SwipeHandler {
  constructor(element, callbacks, config = {}) {
    this.element = element;
    this.callbacks = callbacks;
    this.config = { ...DEFAULT_SWIPE_CONFIG, ...config };
    
    // Touch tracking
    this.touchStart = null;
    this.touchEnd = null;
    this.touchStartTime = 0;
    this.touchEndTime = 0;
    this.isTracking = false;
    this.startY = 0;
    
    // Mouse tracking (for desktop testing)
    this.mouseStart = null;
    this.mouseEnd = null;
    this.isMouseDown = false;
    
    this.init();
  }
  
  init() {
    if (!this.element) return;
    
    // Touch events
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    this.element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    this.element.addEventListener('touchcancel', this.handleTouchCancel.bind(this), { passive: true });
    
    // Mouse events (if enabled)
    if (this.config.enableMouseSwipe) {
      this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
      this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
      this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }
    
    // Prevent context menu on long press
    this.element.addEventListener('contextmenu', (e) => {
      if (this.isTracking) {
        e.preventDefault();
      }
    });
  }
  
  handleTouchStart(e) {
    if (e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    this.touchStart = { x: touch.clientX, y: touch.clientY };
    this.startY = touch.clientY;
    this.touchStartTime = Date.now();
    this.isTracking = true;
    this.touchEnd = null;
    
    // Call start callback
    if (this.callbacks.onSwipeStart) {
      this.callbacks.onSwipeStart(e);
    }
  }
  
  handleTouchMove(e) {
    if (!this.isTracking || e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    this.touchEnd = { x: touch.clientX, y: touch.clientY };
    
    // Calculate distances
    const deltaX = Math.abs(touch.clientX - this.touchStart.x);
    const deltaY = Math.abs(touch.clientY - this.startY);
    
    // If horizontal swipe is dominant, prevent vertical scrolling
    if (deltaX > deltaY && deltaX > 10) {
      if (this.config.preventDefaultTouchMove) {
        e.preventDefault();
      }
    }
    
    // Call move callback
    if (this.callbacks.onSwipeMove) {
      this.callbacks.onSwipeMove(e, {
        deltaX: touch.clientX - this.touchStart.x,
        deltaY: touch.clientY - this.touchStart.y,
        currentX: touch.clientX,
        currentY: touch.clientY
      });
    }
  }
  
  handleTouchEnd(e) {
    if (!this.isTracking) return;
    
    this.touchEndTime = Date.now();
    this.isTracking = false;
    
    this.processSwipe();
    
    // Call end callback
    if (this.callbacks.onSwipeEnd) {
      this.callbacks.onSwipeEnd(e);
    }
  }
  
  handleTouchCancel(e) {
    this.isTracking = false;
    this.touchStart = null;
    this.touchEnd = null;
    
    if (this.callbacks.onSwipeCancel) {
      this.callbacks.onSwipeCancel(e);
    }
  }
  
  // Mouse event handlers (for desktop testing)
  handleMouseDown(e) {
    if (!this.config.enableMouseSwipe) return;
    
    this.mouseStart = { x: e.clientX, y: e.clientY };
    this.isMouseDown = true;
    this.touchStartTime = Date.now();
    
    e.preventDefault();
  }
  
  handleMouseMove(e) {
    if (!this.config.enableMouseSwipe || !this.isMouseDown) return;
    
    this.mouseEnd = { x: e.clientX, y: e.clientY };
    
    if (this.callbacks.onSwipeMove) {
      this.callbacks.onSwipeMove(e, {
        deltaX: e.clientX - this.mouseStart.x,
        deltaY: e.clientY - this.mouseStart.y,
        currentX: e.clientX,
        currentY: e.clientY
      });
    }
  }
  
  handleMouseUp(e) {
    if (!this.config.enableMouseSwipe || !this.isMouseDown) return;
    
    this.touchEndTime = Date.now();
    this.isMouseDown = false;
    
    // Use mouse coordinates for swipe processing
    this.touchStart = this.mouseStart;
    this.touchEnd = this.mouseEnd;
    
    this.processSwipe();
  }
  
  handleMouseLeave(e) {
    if (this.isMouseDown) {
      this.handleMouseUp(e);
    }
  }
  
  processSwipe() {
    if (!this.touchStart || !this.touchEnd) return;
    
    const deltaX = this.touchStart.x - this.touchEnd.x;
    const deltaY = this.touchStart.y - this.touchEnd.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const duration = this.touchEndTime - this.touchStartTime;
    const velocity = distance / duration;
    
    // Check if it's a valid swipe
    const isValidDistance = Math.abs(deltaX) > this.config.minSwipeDistance;
    const isValidTime = duration < this.config.maxSwipeTime;
    const isValidVelocity = velocity > this.config.velocityThreshold;
    const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
    
    // Calculate angle to ensure it's mostly horizontal
    const angle = Math.abs(Math.atan2(deltaY, deltaX) * 180 / Math.PI);
    const isValidDirection = angle < this.config.directionThreshold || angle > (180 - this.config.directionThreshold);
    
    if (isValidDistance && isValidTime && isHorizontal && isValidDirection) {
      const direction = deltaX > 0 ? 'left' : 'right';
      
      // Call appropriate callback
      if (direction === 'left' && this.callbacks.onSwipeLeft) {
        this.callbacks.onSwipeLeft({
          distance: Math.abs(deltaX),
          velocity,
          duration,
          direction
        });
      } else if (direction === 'right' && this.callbacks.onSwipeRight) {
        this.callbacks.onSwipeRight({
          distance: Math.abs(deltaX),
          velocity,
          duration,
          direction
        });
      }
      
      // Call general swipe callback
      if (this.callbacks.onSwipe) {
        this.callbacks.onSwipe({
          direction,
          distance: Math.abs(deltaX),
          velocity,
          duration
        });
      }
    }
    
    // Reset tracking
    this.touchStart = null;
    this.touchEnd = null;
    this.mouseStart = null;
    this.mouseEnd = null;
  }
  
  destroy() {
    if (!this.element) return;
    
    // Remove touch events
    this.element.removeEventListener('touchstart', this.handleTouchStart);
    this.element.removeEventListener('touchmove', this.handleTouchMove);
    this.element.removeEventListener('touchend', this.handleTouchEnd);
    this.element.removeEventListener('touchcancel', this.handleTouchCancel);
    
    // Remove mouse events
    if (this.config.enableMouseSwipe) {
      this.element.removeEventListener('mousedown', this.handleMouseDown);
      this.element.removeEventListener('mousemove', this.handleMouseMove);
      this.element.removeEventListener('mouseup', this.handleMouseUp);
      this.element.removeEventListener('mouseleave', this.handleMouseLeave);
    }
  }
}

/**
 * Simple swipe hook for React components
 * @param {Object} callbacks - Swipe event callbacks
 * @param {Object} config - Swipe configuration
 * @returns {Function} - Ref callback function
 */
export const useSwipe = (callbacks, config = {}) => {
  let swipeHandler = null;
  
  const refCallback = (element) => {
    // Cleanup previous handler
    if (swipeHandler) {
      swipeHandler.destroy();
      swipeHandler = null;
    }
    
    // Create new handler if element exists
    if (element) {
      swipeHandler = new SwipeHandler(element, callbacks, config);
    }
  };
  
  // Cleanup on unmount
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      if (swipeHandler) {
        swipeHandler.destroy();
      }
    });
  }
  
  return refCallback;
};

/**
 * Utility function to create a simple swipe handler
 * @param {HTMLElement} element - Element to attach swipe handler to
 * @param {Function} onSwipeLeft - Left swipe callback
 * @param {Function} onSwipeRight - Right swipe callback
 * @param {Object} config - Configuration options
 * @returns {SwipeHandler} - Swipe handler instance
 */
export const createSwipeHandler = (element, onSwipeLeft, onSwipeRight, config = {}) => {
  return new SwipeHandler(element, {
    onSwipeLeft,
    onSwipeRight
  }, config);
};

/**
 * Test swipe functionality (for development)
 */
export const testSwipeFunctionality = () => {
  console.log('🔧 Swipe Handler Test Mode');
  
  // Find demo carousel
  const demoCarousel = document.querySelector('[data-demo-carousel]');
  if (demoCarousel) {
    console.log('✅ Demo carousel found');
    
    // Test swipe detection
    const testHandler = new SwipeHandler(demoCarousel, {
      onSwipeLeft: (data) => console.log('👈 Left swipe detected:', data),
      onSwipeRight: (data) => console.log('👉 Right swipe detected:', data),
      onSwipeStart: () => console.log('🤏 Swipe started'),
      onSwipeEnd: () => console.log('✋ Swipe ended')
    }, {
      enableMouseSwipe: true // Enable for desktop testing
    });
    
    console.log('🎯 Swipe test handler attached. Try swiping on the demo images!');
    
    return testHandler;
  } else {
    console.log('❌ Demo carousel not found');
  }
};

// Auto-initialize testing in development
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  window.testSwipe = testSwipeFunctionality;
  console.log('🔧 Swipe testing available: window.testSwipe()');
}

export default SwipeHandler;