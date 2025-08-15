#!/usr/bin/env node

// Asset Verification Script for Netlify Deployment
// Ensures all referenced assets exist in the build output

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Assets that should exist in the build
const REQUIRED_ASSETS = [
  // Product images
  'images/products/biryani-pot-12-ltr.jpg',
  'images/products/fish-pot.jpg',
  'images/products/casserole-3-ltr.jpg',
  'images/products/casserole-2-2-ltr.jpg',
  'images/products/sauce-pot.jpg',
  'images/products/multipurpose-bowl.jpg',
  
  // Videos
  'videos/demo-video.mp4',
  'videos/testimonial_NC/testimonial-1.mp4',
  'videos/testimonial_NC/testimonial-2.mp4',
  
  // Other assets
  'favicon.ico',
  'favicon.svg',
  'site.webmanifest'
];

console.log('🔍 Verifying assets for Netlify deployment...\n');

let allAssetsExist = true;
let missingAssets = [];
let foundAssets = [];

// Check if dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ Build directory (dist) does not exist!');
  console.error('   Run "npm run build" first.');
  process.exit(1);
}

// Verify each required asset
REQUIRED_ASSETS.forEach(asset => {
  const distPath = path.join(DIST_DIR, asset);
  const publicPath = path.join(PUBLIC_DIR, asset);
  
  if (fs.existsSync(distPath)) {
    const stats = fs.statSync(distPath);
    foundAssets.push({
      path: asset,
      size: (stats.size / 1024).toFixed(2) + ' KB',
      location: 'dist'
    });
    console.log(`✅ ${asset} (${(stats.size / 1024).toFixed(2)} KB)`);
  } else if (fs.existsSync(publicPath)) {
    const stats = fs.statSync(publicPath);
    console.log(`⚠️  ${asset} exists in public but not in dist (${(stats.size / 1024).toFixed(2)} KB)`);
    missingAssets.push({
      path: asset,
      issue: 'Not copied to dist',
      solution: 'Check Vite build configuration'
    });
    allAssetsExist = false;
  } else {
    console.log(`❌ ${asset} - NOT FOUND`);
    missingAssets.push({
      path: asset,
      issue: 'File does not exist',
      solution: 'Add file to public directory'
    });
    allAssetsExist = false;
  }
});

console.log('\n📊 VERIFICATION SUMMARY:');
console.log(`✅ Found assets: ${foundAssets.length}`);
console.log(`❌ Missing assets: ${missingAssets.length}`);

if (missingAssets.length > 0) {
  console.log('\n🚨 MISSING ASSETS:');
  missingAssets.forEach(asset => {
    console.log(`   ${asset.path}`);
    console.log(`   Issue: ${asset.issue}`);
    console.log(`   Solution: ${asset.solution}\n`);
  });
}

// Check for extra files that might cause issues
console.log('\n🔍 Checking for potential issues...');

// Check for files with spaces (should not exist after our fixes)
const checkForSpaces = (dir, prefix = '') => {
  if (!fs.existsSync(dir)) return;
  
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const relativePath = prefix + item;
    
    if (item.includes(' ')) {
      console.log(`⚠️  File with spaces found: ${relativePath}`);
      console.log('   This may cause issues on Netlify (case-sensitive Linux)');
    }
    
    if (fs.statSync(fullPath).isDirectory()) {
      checkForSpaces(fullPath, relativePath + '/');
    }
  });
};

checkForSpaces(path.join(DIST_DIR, 'images'), 'images/');
checkForSpaces(path.join(DIST_DIR, 'videos'), 'videos/');

// Generate deployment report
const report = {
  timestamp: new Date().toISOString(),
  totalAssets: REQUIRED_ASSETS.length,
  foundAssets: foundAssets.length,
  missingAssets: missingAssets.length,
  success: allAssetsExist,
  assets: {
    found: foundAssets,
    missing: missingAssets
  }
};

// Save report
const reportPath = path.join(DIST_DIR, 'asset-verification-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\n📄 Report saved to: ${reportPath}`);

// Generate .htaccess for proper MIME types (if needed)
const htaccessContent = `
# Proper MIME types for assets
AddType video/mp4 .mp4
AddType image/jpeg .jpg
AddType image/png .png
AddType image/svg+xml .svg

# Cache control for assets
<FilesMatch "\\.(jpg|jpeg|png|gif|svg|mp4|webm)$">
  ExpiresActive On
  ExpiresDefault "access plus 1 year"
  Header set Cache-Control "public, immutable"
</FilesMatch>
`;

fs.writeFileSync(path.join(DIST_DIR, '.htaccess'), htaccessContent);

if (allAssetsExist) {
  console.log('\n🎉 All assets verified successfully!');
  console.log('✅ Ready for Netlify deployment');
  process.exit(0);
} else {
  console.log('\n❌ Asset verification failed!');
  console.log('🔧 Fix the missing assets before deploying');
  process.exit(1);
}