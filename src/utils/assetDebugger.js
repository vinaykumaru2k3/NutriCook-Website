// Asset Debugging Utility for Production Issues
// Helps diagnose why images and videos aren't loading on Netlify

/**
 * Asset debugging configuration
 */
const ASSET_DEBUG_CONFIG = {
  // Assets to test
  testAssets: [
    '/videos/demo-video.mp4',
    '/images/products/biryani-pot-12-ltr.jpg',
    '/images/products/fish-pot.jpg',
    '/images/products/casserole-3-ltr.jpg',
    '/images/products/casserole-2-2-ltr.jpg',
    '/images/products/sauce-pot.jpg',
    '/images/products/multipurpose-bowl.jpg',
    '/videos/testimonial_NC/testimonial-1.mp4',
    '/videos/testimonial_NC/testimonial-2.mp4'
  ],
  
  // Timeout for asset loading tests
  timeout: 10000,
  
  // Retry attempts
  retryAttempts: 3
};

/**
 * Test if an asset can be loaded
 * @param {string} url - Asset URL to test
 * @returns {Promise<Object>} - Test result
 */
export const testAssetLoad = (url) => {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    // Determine asset type
    const isVideo = url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg');
    const isImage = url.includes('.jpg') || url.includes('.png') || url.includes('.svg') || url.includes('.webp');
    
    if (isImage) {
      const img = new Image();
      
      img.onload = () => {
        resolve({
          url,
          success: true,
          loadTime: Date.now() - startTime,
          type: 'image',
          dimensions: { width: img.naturalWidth, height: img.naturalHeight },
          error: null
        });
      };
      
      img.onerror = (error) => {
        resolve({
          url,
          success: false,
          loadTime: Date.now() - startTime,
          type: 'image',
          dimensions: null,
          error: error.message || 'Failed to load image'
        });
      };
      
      img.src = url;
      
    } else if (isVideo) {
      const video = document.createElement('video');
      
      video.onloadedmetadata = () => {
        resolve({
          url,
          success: true,
          loadTime: Date.now() - startTime,
          type: 'video',
          dimensions: { width: video.videoWidth, height: video.videoHeight },
          duration: video.duration,
          error: null
        });
      };
      
      video.onerror = (error) => {
        resolve({
          url,
          success: false,
          loadTime: Date.now() - startTime,
          type: 'video',
          dimensions: null,
          duration: null,
          error: error.message || 'Failed to load video'
        });
      };
      
      video.src = url;
      video.load();
      
    } else {
      // Generic fetch test
      fetch(url, { method: 'HEAD' })
        .then(response => {
          resolve({
            url,
            success: response.ok,
            loadTime: Date.now() - startTime,
            type: 'unknown',
            status: response.status,
            statusText: response.statusText,
            error: response.ok ? null : `HTTP ${response.status}: ${response.statusText}`
          });
        })
        .catch(error => {
          resolve({
            url,
            success: false,
            loadTime: Date.now() - startTime,
            type: 'unknown',
            status: null,
            statusText: null,
            error: error.message
          });
        });
    }
    
    // Timeout fallback
    setTimeout(() => {
      resolve({
        url,
        success: false,
        loadTime: ASSET_DEBUG_CONFIG.timeout,
        type: isVideo ? 'video' : isImage ? 'image' : 'unknown',
        error: 'Timeout'
      });
    }, ASSET_DEBUG_CONFIG.timeout);
  });
};

/**
 * Test all configured assets
 * @returns {Promise<Object>} - Complete test results
 */
export const testAllAssets = async () => {
  console.log('🔍 Testing asset loading...');
  
  const results = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    totalAssets: ASSET_DEBUG_CONFIG.testAssets.length,
    successfulAssets: 0,
    failedAssets: 0,
    tests: []
  };
  
  for (const asset of ASSET_DEBUG_CONFIG.testAssets) {
    console.log(`Testing: ${asset}`);
    const result = await testAssetLoad(asset);
    
    if (result.success) {
      results.successfulAssets++;
      console.log(`✅ ${asset} (${result.loadTime}ms)`);
    } else {
      results.failedAssets++;
      console.log(`❌ ${asset} - ${result.error}`);
    }
    
    results.tests.push(result);
  }
  
  return results;
};

/**
 * Generate a detailed asset report
 * @param {Object} results - Test results from testAllAssets
 * @returns {string} - Formatted report
 */
export const generateAssetReport = (results) => {
  let report = `
🔍 ASSET LOADING REPORT
======================

📊 SUMMARY:
- Total Assets: ${results.totalAssets}
- Successful: ${results.successfulAssets} (${Math.round((results.successfulAssets / results.totalAssets) * 100)}%)
- Failed: ${results.failedAssets} (${Math.round((results.failedAssets / results.totalAssets) * 100)}%)
- Test Time: ${results.timestamp}
- User Agent: ${results.userAgent}
- URL: ${results.url}

`;

  if (results.failedAssets > 0) {
    report += `❌ FAILED ASSETS:\n`;
    results.tests
      .filter(test => !test.success)
      .forEach((test, index) => {
        report += `\n${index + 1}. ${test.url}\n`;
        report += `   Error: ${test.error}\n`;
        report += `   Type: ${test.type}\n`;
        report += `   Load Time: ${test.loadTime}ms\n`;
      });
  }

  if (results.successfulAssets > 0) {
    report += `\n✅ SUCCESSFUL ASSETS:\n`;
    results.tests
      .filter(test => test.success)
      .forEach((test, index) => {
        report += `\n${index + 1}. ${test.url}\n`;
        report += `   Type: ${test.type}\n`;
        report += `   Load Time: ${test.loadTime}ms\n`;
        if (test.dimensions) {
          report += `   Dimensions: ${test.dimensions.width}x${test.dimensions.height}\n`;
        }
        if (test.duration) {
          report += `   Duration: ${test.duration.toFixed(2)}s\n`;
        }
      });
  }

  report += `\n🔧 TROUBLESHOOTING TIPS:\n`;
  report += `1. Check browser Network tab for 404 errors\n`;
  report += `2. Verify files exist in Netlify deployment\n`;
  report += `3. Check file name case sensitivity\n`;
  report += `4. Clear browser cache and try again\n`;
  report += `5. Test on different browsers/devices\n`;

  return report;
};

/**
 * Check current page for broken images and videos
 * @returns {Array} - List of broken assets found on page
 */
export const findBrokenAssetsOnPage = () => {
  const brokenAssets = [];
  
  // Check images
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.complete || img.naturalWidth === 0) {
      brokenAssets.push({
        type: 'image',
        element: img,
        src: img.src,
        alt: img.alt,
        index,
        issue: 'Failed to load or zero dimensions'
      });
    }
  });
  
  // Check videos
  const videos = document.querySelectorAll('video');
  videos.forEach((video, index) => {
    if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE || 
        video.error) {
      brokenAssets.push({
        type: 'video',
        element: video,
        src: video.src || (video.querySelector('source') && video.querySelector('source').src),
        index,
        issue: video.error ? video.error.message : 'No source or network error'
      });
    }
  });
  
  return brokenAssets;
};

/**
 * Fix broken assets by adding fallbacks
 * @param {Array} brokenAssets - List of broken assets from findBrokenAssetsOnPage
 */
export const fixBrokenAssets = (brokenAssets) => {
  const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwTTIwNSAxNDVIMTk1VjE1NUgyMDVWMTQ1WiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIyMDAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
  
  brokenAssets.forEach(asset => {
    if (asset.type === 'image') {
      asset.element.src = fallbackImage;
      asset.element.alt = asset.alt || 'Image not available';
      console.log(`🔧 Fixed broken image: ${asset.src}`);
    } else if (asset.type === 'video') {
      // Hide broken videos or show placeholder
      asset.element.style.display = 'none';
      const placeholder = document.createElement('div');
      placeholder.className = 'video-placeholder bg-gray-200 flex items-center justify-center text-gray-500';
      placeholder.innerHTML = '<p>Video not available</p>';
      asset.element.parentNode.insertBefore(placeholder, asset.element);
      console.log(`🔧 Fixed broken video: ${asset.src}`);
    }
  });
};

/**
 * Initialize asset debugging (for development and production)
 */
export const initAssetDebugging = () => {
  // Add debugging functions to window for console access
  window.assetDebugger = {
    testAll: testAllAssets,
    testAsset: testAssetLoad,
    generateReport: generateAssetReport,
    findBroken: findBrokenAssetsOnPage,
    fixBroken: fixBrokenAssets,
    
    // Quick test function
    quickTest: async () => {
      const results = await testAllAssets();
      const report = generateAssetReport(results);
      console.log(report);
      return results;
    },
    
    // Auto-fix function
    autoFix: () => {
      const broken = findBrokenAssetsOnPage();
      if (broken.length > 0) {
        console.log(`Found ${broken.length} broken assets, fixing...`);
        fixBrokenAssets(broken);
      } else {
        console.log('No broken assets found on current page');
      }
      return broken;
    }
  };
  
  console.log('🔧 Asset Debugger initialized');
  console.log('Use window.assetDebugger.quickTest() to test all assets');
  console.log('Use window.assetDebugger.autoFix() to fix broken assets');
  
  // Auto-check for broken assets on page load
  setTimeout(() => {
    const broken = findBrokenAssetsOnPage();
    if (broken.length > 0) {
      console.warn(`⚠️ Found ${broken.length} broken assets on page load`);
      console.log('Run window.assetDebugger.autoFix() to fix them');
    }
  }, 2000);
};

// Auto-initialize
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAssetDebugging);
  } else {
    initAssetDebugging();
  }
}

export default {
  testAssetLoad,
  testAllAssets,
  generateAssetReport,
  findBrokenAssetsOnPage,
  fixBrokenAssets,
  initAssetDebugging
};