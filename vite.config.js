import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification with terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    // Generate source maps for debugging (disabled for production)
    sourcemap: false,
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
          // Separate chunks for different component groups
          ui: [
            './src/components/ui/Button.jsx',
            './src/components/ui/Container.jsx',
            './src/components/ui/LazyImage.jsx',
            './src/components/ui/SkeletonLoader.jsx',
            './src/components/ui/LazySection.jsx',
            './src/components/ui/LoadingState.jsx'
          ]
        },
        // Optimize asset naming for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize assets - inline small assets as base64
    assetsInlineLimit: 4096,
    // Enable CSS minification
    cssMinify: true,
    // Report compressed size
    reportCompressedSize: true,
    // Enable write bundle
    write: true
  },
  // Enable compression
  server: {
    compress: true,
    // Enable HTTP/2 for development
    https: false,
    // Optimize HMR
    hmr: {
      overlay: true
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
    // Force optimization of these dependencies
    force: false
  },
  // Enable experimental features for better performance
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { js: `/${filename}` };
      } else {
        return { relative: true };
      }
    }
  },
  // CSS optimization
  css: {
    devSourcemap: false,
    // PostCSS configuration is handled by postcss.config.js
  },
  // Enable esbuild optimizations
  esbuild: {
    // Remove console.log in production
    drop: ['console', 'debugger'],
    // Optimize for modern browsers
    target: 'es2020'
  }
})
