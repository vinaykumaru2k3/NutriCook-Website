// Performance testing utilities for Core Web Vitals

export class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = [];
    this.isSupported = this.checkSupport();
  }

  checkSupport() {
    return (
      typeof window !== 'undefined' &&
      'PerformanceObserver' in window &&
      'performance' in window
    );
  }

  // Measure Largest Contentful Paint (LCP)
  measureLCP() {
    if (!this.isSupported) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      this.metrics.lcp = {
        value: lastEntry.startTime,
        element: lastEntry.element,
        timestamp: Date.now()
      };

      this.reportMetric('LCP', lastEntry.startTime);
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.push(observer);
  }

  // Measure First Input Delay (FID)
  measureFID() {
    if (!this.isSupported) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fid = entry.processingStart - entry.startTime;
        
        this.metrics.fid = {
          value: fid,
          timestamp: Date.now()
        };

        this.reportMetric('FID', fid);
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
    this.observers.push(observer);
  }

  // Measure Cumulative Layout Shift (CLS)
  measureCLS() {
    if (!this.isSupported) return;

    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries = [];

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

          if (sessionValue && 
              entry.startTime - lastSessionEntry.startTime < 1000 &&
              entry.startTime - firstSessionEntry.startTime < 5000) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }

          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            
            this.metrics.cls = {
              value: clsValue,
              entries: [...sessionEntries],
              timestamp: Date.now()
            };

            this.reportMetric('CLS', clsValue);
          }
        }
      });
    });

    observer.observe({ entryTypes: ['layout-shift'] });
    this.observers.push(observer);
  }

  // Measure Time to First Byte (TTFB)
  measureTTFB() {
    if (!this.isSupported) return;

    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      
      this.metrics.ttfb = {
        value: ttfb,
        timestamp: Date.now()
      };

      this.reportMetric('TTFB', ttfb);
    }
  }

  // Measure First Contentful Paint (FCP)
  measureFCP() {
    if (!this.isSupported) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = {
            value: entry.startTime,
            timestamp: Date.now()
          };

          this.reportMetric('FCP', entry.startTime);
        }
      });
    });

    observer.observe({ entryTypes: ['paint'] });
    this.observers.push(observer);
  }

  // Measure Time to Interactive (TTI)
  measureTTI() {
    if (!this.isSupported) return;

    // Simplified TTI measurement
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const longTasks = entries.filter(entry => entry.duration > 50);
      
      if (longTasks.length === 0) {
        const tti = performance.now();
        
        this.metrics.tti = {
          value: tti,
          timestamp: Date.now()
        };

        this.reportMetric('TTI', tti);
      }
    });

    observer.observe({ entryTypes: ['longtask'] });
    this.observers.push(observer);
  }

  // Report metric to console and analytics
  reportMetric(name, value) {
    const rating = this.getRating(name, value);
    
    console.log(`%c${name}: ${Math.round(value)}ms (${rating})`, 
      `color: ${rating === 'good' ? 'green' : rating === 'needs-improvement' ? 'orange' : 'red'}`);

    // Send to analytics service (placeholder)
    this.sendToAnalytics(name, value, rating);
  }

  // Get performance rating based on Core Web Vitals thresholds
  getRating(metric, value) {
    const thresholds = {
      'LCP': { good: 2500, poor: 4000 },
      'FID': { good: 100, poor: 300 },
      'CLS': { good: 0.1, poor: 0.25 },
      'TTFB': { good: 800, poor: 1800 },
      'FCP': { good: 1800, poor: 3000 },
      'TTI': { good: 3800, poor: 7300 }
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  // Send metrics to analytics service
  sendToAnalytics(name, value, rating) {
    // Placeholder for analytics integration
    if (import.meta.env.PROD) {
      // Example: Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', 'web_vital', {
          name,
          value: Math.round(value),
          rating,
          event_category: 'Web Vitals'
        });
      }

      // Example: Custom analytics endpoint
      fetch('/api/analytics/web-vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric: name,
          value: Math.round(value),
          rating,
          url: window.location.href,
          timestamp: Date.now()
        })
      }).catch(err => console.warn('Analytics error:', err));
    }
  }

  // Get all collected metrics
  getMetrics() {
    return { ...this.metrics };
  }

  // Generate performance report
  generateReport() {
    const report = {
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      metrics: this.getMetrics(),
      recommendations: this.getRecommendations()
    };

    console.table(report.metrics);
    return report;
  }

  // Get performance recommendations
  getRecommendations() {
    const recommendations = [];
    
    if (this.metrics.lcp?.value > 2500) {
      recommendations.push('Optimize Largest Contentful Paint by reducing server response times and optimizing images');
    }
    
    if (this.metrics.fid?.value > 100) {
      recommendations.push('Reduce First Input Delay by minimizing JavaScript execution time');
    }
    
    if (this.metrics.cls?.value > 0.1) {
      recommendations.push('Improve Cumulative Layout Shift by setting dimensions for images and ads');
    }
    
    if (this.metrics.ttfb?.value > 800) {
      recommendations.push('Improve Time to First Byte by optimizing server performance');
    }

    return recommendations;
  }

  // Start monitoring all metrics
  startMonitoring() {
    if (!this.isSupported) {
      console.warn('Performance monitoring not supported in this browser');
      return;
    }

    this.measureLCP();
    this.measureFID();
    this.measureCLS();
    this.measureTTFB();
    this.measureFCP();
    this.measureTTI();

    // Generate report after 10 seconds
    setTimeout(() => {
      this.generateReport();
    }, 10000);
  }

  // Stop monitoring and cleanup
  stopMonitoring() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Resource loading performance
export class ResourceMonitor {
  constructor() {
    this.resources = [];
  }

  // Monitor resource loading
  monitorResources() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        const resource = {
          name: entry.name,
          type: entry.initiatorType,
          size: entry.transferSize || 0,
          duration: entry.duration,
          startTime: entry.startTime,
          rating: this.getRating(entry.duration, entry.initiatorType)
        };

        this.resources.push(resource);
        
        if (resource.rating === 'poor') {
          console.warn(`Slow resource: ${resource.name} (${Math.round(resource.duration)}ms)`);
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  getRating(duration, type) {
    const thresholds = {
      'script': { good: 200, poor: 500 },
      'stylesheet': { good: 100, poor: 300 },
      'img': { good: 300, poor: 800 },
      'fetch': { good: 200, poor: 500 }
    };

    const threshold = thresholds[type] || { good: 200, poor: 500 };
    
    if (duration <= threshold.good) return 'good';
    if (duration <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  getSlowResources() {
    return this.resources.filter(resource => resource.rating === 'poor');
  }

  generateResourceReport() {
    const report = {
      totalResources: this.resources.length,
      slowResources: this.getSlowResources(),
      byType: this.groupByType(),
      totalSize: this.getTotalSize(),
      recommendations: this.getResourceRecommendations()
    };

    console.log('Resource Performance Report:', report);
    return report;
  }

  groupByType() {
    return this.resources.reduce((acc, resource) => {
      if (!acc[resource.type]) {
        acc[resource.type] = [];
      }
      acc[resource.type].push(resource);
      return acc;
    }, {});
  }

  getTotalSize() {
    return this.resources.reduce((total, resource) => total + resource.size, 0);
  }

  getResourceRecommendations() {
    const recommendations = [];
    const slowResources = this.getSlowResources();
    
    if (slowResources.length > 0) {
      recommendations.push(`Optimize ${slowResources.length} slow-loading resources`);
    }
    
    const totalSize = this.getTotalSize();
    if (totalSize > 2000000) { // 2MB
      recommendations.push('Consider reducing total resource size');
    }

    return recommendations;
  }
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (import.meta.env.DEV) {
    console.log('Performance monitoring initialized');
  }

  const performanceMonitor = new PerformanceMonitor();
  const resourceMonitor = new ResourceMonitor();

  // Start monitoring when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      performanceMonitor.startMonitoring();
      resourceMonitor.monitorResources();
    });
  } else {
    performanceMonitor.startMonitoring();
    resourceMonitor.monitorResources();
  }

  // Expose to window for debugging
  if (import.meta.env.DEV) {
    window.performanceMonitor = performanceMonitor;
    window.resourceMonitor = resourceMonitor;
  }

  return { performanceMonitor, resourceMonitor };
}