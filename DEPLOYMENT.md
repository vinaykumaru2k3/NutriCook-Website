# NutriCook Website Deployment Guide

This document provides instructions for deploying the NutriCook website to production environments.

## Prerequisites

- Node.js (version 16 or higher)
- npm (version 7 or higher) or yarn (version 1.22 or higher)
- A static hosting service (Netlify, Vercel, or similar)

## Build Process

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Build the production version:
   ```bash
   npm run build
   # or
   yarn build
   ```

   This will create a `dist` folder with the optimized production build.

## Deployment Options

### Netlify

1. Connect your Git repository to Netlify
2. Set the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables if needed
4. Deploy

### Vercel

1. Connect your Git repository to Vercel
2. Set the build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add environment variables if needed
4. Deploy

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the contents of the `dist` folder to your web server

## Environment Variables

The following environment variables can be set for production:

- `VITE_APP_TITLE` - Website title (default: "NutriCook - The Healthiest Investment Your Family Will Ever Make")
- `VITE_APP_DESCRIPTION` - Website description (default: "Discover NutriCook's premium surgical steel cookware for oilless and waterless cooking. Experience healthier meals, authentic taste, and smart savings. Book your FREE home demo today!")

## Analytics Setup

The website includes Google Analytics integration. To configure:

1. Replace `G-XXXXXXXXXX` in `index.html` with your actual Google Analytics Measurement ID
2. Ensure the Google Analytics script is properly configured in the `<head>` section

## Performance Optimizations

The website includes several performance optimizations:

- Code splitting for faster initial loads
- Image optimization with WebP format and appropriate fallbacks
- Lazy loading for images and below-the-fold content
- Critical CSS inlining
- Bundle optimization with tree shaking

## SEO Considerations

- The website includes proper meta tags for SEO
- Open Graph and Twitter cards are configured
- Responsive design ensures mobile-friendliness
- Fast loading times through performance optimizations

## Maintenance

Regular maintenance tasks include:

1. Updating dependencies:
   ```bash
   npm update
   # or
   yarn upgrade
   ```

2. Monitoring analytics data to understand user behavior
3. Checking for broken links and images
4. Ensuring all forms are working correctly
5. Testing across different browsers and devices

## Troubleshooting

### Common Issues

1. **Images not loading**: Ensure all image paths are correct and images exist in the public folder
2. **Form submissions not working**: Verify the form submission endpoint is correctly configured
3. **Animations not working**: Check browser compatibility and ensure JavaScript is enabled
4. **Performance issues**: Review bundle sizes and optimize large assets

### Browser Compatibility

The website is designed to work on modern browsers:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome for Android)

## Security Considerations

- All external resources are loaded over HTTPS
- Form submissions should be secured with proper validation
- Content Security Policy (CSP) headers should be configured on your hosting platform
- Regular security audits of dependencies should be performed

## Backup and Recovery

- Regularly backup your hosting environment
- Keep a copy of the built files for quick restoration
- Maintain a list of all environment variables and their values
- Document any custom configurations or modifications

## Contact

For deployment assistance, contact the development team at demo@nutricook.com