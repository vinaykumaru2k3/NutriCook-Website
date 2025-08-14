// Comprehensive responsive design testing utilities

/**
 * Test touch target sizes across the application
 * @returns {Object} Test results
 */
export const testTouchTargets = () => {
  const results = {
    passed: 0,
    failed: 0,
    issues: []
  };

  // Get all interactive elements
  const interactiveElements = document.querySelectorAll(
    'button, a, input, textarea, select, [role="button"], [tabindex="0"]'
  );

  interactiveElements.forEach((element, index) => {
    const rect = element.getBoundingClientRect();
    const minSize = window.innerWidth <= 768 ? 48 : 44; // Larger targets on mobile
    
    if (rect.width < minSize || rect.height < minSize) {
      results.failed++;
      results.issues.push({
        element: element.tagName.toLowerCase(),
        id: element.id || `element-${index}`,
        className: element.className,
        size: { width: rect.width, height: rect.height },
        minRequired: minSize,
        issue: 'Touch target too small'
      });
    } else {
      results.passed++;
    }
  });

  return results;
};

/**
 * Test text readability across different screen sizes
 * @returns {Object} Test results
 */
export const testTextReadability = () => {
  const results = {
    passed: 0,
    failed: 0,
    issues: []
  };

  // Get all text elements
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
  
  textElements.forEach((element, index) => {
    const styles = window.getComputedStyle(element);
    const fontSize = parseFloat(styles.fontSize);
    
    // Check minimum font size (16px on mobile to prevent zoom)
    const minFontSize = window.innerWidth <= 768 ? 16 : 14;
    
    if (fontSize < minFontSize && element.textContent.trim()) {
      results.failed++;
      results.issues.push({
        element: element.tagName.toLowerCase(),
        id: element.id || `text-${index}`,
        className: element.className,
        fontSize: fontSize,
        minRequired: minFontSize,
        issue: 'Font size too small for mobile'
      });
    } else if (element.textContent.trim()) {
      results.passed++;
    }
  });

  return results;
};

/**
 * Test responsive images
 * @returns {Object} Test results
 */
export const testResponsiveImages = () => {
  const results = {
    passed: 0,
    failed: 0,
    issues: []
  };

  const images = document.querySelectorAll('img');
  
  images.forEach((img, index) => {
    const hasResponsiveClass = img.classList.contains('responsive-image') || 
                              img.classList.contains('w-full') ||
                              img.style.maxWidth === '100%';
    
    const hasAlt = img.hasAttribute('alt') && img.alt.trim() !== '';
    
    if (!hasResponsiveClass) {
      results.failed++;
      results.issues.push({
        element: 'img',
        id: img.id || `img-${index}`,
        src: img.src,
        issue: 'Missing responsive classes'
      });
    } else if (!hasAlt) {
      results.failed++;
      results.issues.push({
        element: 'img',
        id: img.id || `img-${index}`,
        src: img.src,
        issue: 'Missing alt text'
      });
    } else {
      results.passed++;
    }
  });

  return results;
};

/**
 * Test layout at different breakpoints
 * @returns {Object} Test results
 */
export const testBreakpoints = () => {
  const results = {
    mobile: { width: 375, issues: [] },
    tablet: { width: 768, issues: [] },
    desktop: { width: 1024, issues: [] }
  };

  // Test each breakpoint
  Object.keys(results).forEach(breakpoint => {
    const width = results[breakpoint].width;
    
    // Simulate viewport resize (note: this is limited in actual testing)
    // In real testing, you'd use browser dev tools or automated testing
    
    // Check for horizontal scrollbars
    if (document.body.scrollWidth > width) {
      results[breakpoint].issues.push({
        issue: 'Horizontal scroll detected',
        scrollWidth: document.body.scrollWidth,
        viewportWidth: width
      });
    }
    
    // Check for elements extending beyond viewport
    const elements = document.querySelectorAll('*');
    elements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      if (rect.right > width) {
        results[breakpoint].issues.push({
          element: element.tagName.toLowerCase(),
          id: element.id || `element-${index}`,
          issue: 'Element extends beyond viewport',
          elementRight: rect.right,
          viewportWidth: width
        });
      }
    });
  });

  return results;
};

/**
 * Test form usability on mobile
 * @returns {Object} Test results
 */
export const testFormUsability = () => {
  const results = {
    passed: 0,
    failed: 0,
    issues: []
  };

  const formElements = document.querySelectorAll('input, textarea, select');
  
  formElements.forEach((element, index) => {
    const styles = window.getComputedStyle(element);
    const fontSize = parseFloat(styles.fontSize);
    const height = parseFloat(styles.height) || element.offsetHeight;
    
    // Check font size (should be 16px+ on mobile to prevent zoom)
    if (window.innerWidth <= 768 && fontSize < 16) {
      results.failed++;
      results.issues.push({
        element: element.tagName.toLowerCase(),
        id: element.id || `form-${index}`,
        type: element.type,
        fontSize: fontSize,
        issue: 'Font size too small (will cause zoom on iOS)'
      });
    }
    
    // Check minimum height for touch targets
    const minHeight = window.innerWidth <= 768 ? 48 : 44;
    if (height < minHeight) {
      results.failed++;
      results.issues.push({
        element: element.tagName.toLowerCase(),
        id: element.id || `form-${index}`,
        type: element.type,
        height: height,
        minRequired: minHeight,
        issue: 'Form element too small for touch'
      });
    }
    
    if (fontSize >= 16 && height >= minHeight) {
      results.passed++;
    }
  });

  return results;
};

/**
 * Test navigation usability
 * @returns {Object} Test results
 */
export const testNavigationUsability = () => {
  const results = {
    passed: 0,
    failed: 0,
    issues: []
  };

  // Test mobile menu
  const mobileMenuButton = document.querySelector('[aria-expanded]');
  if (mobileMenuButton) {
    const rect = mobileMenuButton.getBoundingClientRect();
    const minSize = 44;
    
    if (rect.width < minSize || rect.height < minSize) {
      results.failed++;
      results.issues.push({
        element: 'mobile-menu-button',
        size: { width: rect.width, height: rect.height },
        issue: 'Mobile menu button too small'
      });
    } else {
      results.passed++;
    }
  }

  // Test navigation links
  const navLinks = document.querySelectorAll('nav a, nav button');
  navLinks.forEach((link, index) => {
    const rect = link.getBoundingClientRect();
    const minHeight = window.innerWidth <= 768 ? 48 : 44;
    
    if (rect.height < minHeight) {
      results.failed++;
      results.issues.push({
        element: 'nav-link',
        id: link.id || `nav-${index}`,
        height: rect.height,
        issue: 'Navigation link too small for touch'
      });
    } else {
      results.passed++;
    }
  });

  return results;
};

/**
 * Run comprehensive responsive design test
 * @returns {Object} Complete test results
 */
export const runResponsiveTest = () => {
  const results = {
    timestamp: new Date().toISOString(),
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio
    },
    tests: {
      touchTargets: testTouchTargets(),
      textReadability: testTextReadability(),
      responsiveImages: testResponsiveImages(),
      breakpoints: testBreakpoints(),
      formUsability: testFormUsability(),
      navigationUsability: testNavigationUsability()
    }
  };

  // Calculate overall score
  const totalPassed = Object.values(results.tests).reduce((sum, test) => sum + (test.passed || 0), 0);
  const totalFailed = Object.values(results.tests).reduce((sum, test) => sum + (test.failed || 0), 0);
  const totalTests = totalPassed + totalFailed;
  
  results.summary = {
    totalTests,
    passed: totalPassed,
    failed: totalFailed,
    score: totalTests > 0 ? Math.round((totalPassed / totalTests) * 100) : 0
  };

  return results;
};

/**
 * Generate responsive test report
 * @param {Object} results - Test results from runResponsiveTest
 * @returns {string} Formatted report
 */
export const generateTestReport = (results) => {
  let report = `
RESPONSIVE DESIGN TEST REPORT
=============================
Timestamp: ${results.timestamp}
Viewport: ${results.viewport.width}x${results.viewport.height} (${results.viewport.devicePixelRatio}x DPR)
Overall Score: ${results.summary.score}% (${results.summary.passed}/${results.summary.totalTests} passed)

`;

  Object.entries(results.tests).forEach(([testName, testResult]) => {
    report += `${testName.toUpperCase()}:\n`;
    report += `  Passed: ${testResult.passed || 0}\n`;
    report += `  Failed: ${testResult.failed || 0}\n`;
    
    if (testResult.issues && testResult.issues.length > 0) {
      report += `  Issues:\n`;
      testResult.issues.forEach((issue, index) => {
        report += `    ${index + 1}. ${issue.issue}\n`;
        if (issue.element) report += `       Element: ${issue.element}\n`;
        if (issue.id) report += `       ID: ${issue.id}\n`;
      });
    }
    report += '\n';
  });

  return report;
};

// Export for console testing
if (typeof window !== 'undefined') {
  window.responsiveTest = {
    run: runResponsiveTest,
    report: generateTestReport,
    individual: {
      touchTargets: testTouchTargets,
      textReadability: testTextReadability,
      responsiveImages: testResponsiveImages,
      breakpoints: testBreakpoints,
      formUsability: testFormUsability,
      navigationUsability: testNavigationUsability
    }
  };
}