# 🚀 Quick Deployment Guide - NutriCook Website

## 🎯 Ready to Deploy!

Your website is fully optimized and ready for production. Choose your preferred deployment method:

## Option 1: Netlify (Recommended) ⭐

### Step 1: Connect Repository
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub/GitLab repository
4. Select the `nutricook-website` repository

### Step 2: Configure Build Settings
```
Build command: npm run build
Publish directory: dist
```
*(These are already configured in `netlify.toml`)*

### Step 3: Deploy
- Click "Deploy site"
- Your site will be live in 2-3 minutes!

### Step 4: Custom Domain (Optional)
- Go to Site settings > Domain management
- Add your custom domain
- Configure DNS records as instructed

---

## Option 2: Vercel ⚡

### Step 1: Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository

### Step 2: Configure Project
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```
*(These are already configured in `vercel.json`)*

### Step 3: Deploy
- Click "Deploy"
- Your site will be live in 1-2 minutes!

---

## Option 3: Manual Deployment 📁

### Step 1: Build the Project
```bash
cd nutricook-website
npm install
npm run build
```

### Step 2: Upload Files
- Upload the entire `dist/` folder contents to your web server
- Ensure your server supports SPA routing (redirect all routes to `index.html`)

---

## 🔧 Post-Deployment Setup

### 1. Configure Analytics (Optional)
Replace `G-XXXXXXXXXX` in `index.html` with your Google Analytics ID:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
```

### 2. Test Your Site
- [ ] Homepage loads correctly
- [ ] Navigation works on all devices
- [ ] Contact form functions
- [ ] Demo video plays
- [ ] Mobile responsiveness
- [ ] All images load

### 3. Performance Check
Run a Lighthouse audit:
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Generate report"
4. Aim for 90+ scores across all metrics

---

## 🚨 Troubleshooting

### Common Issues:

**Build Fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**404 Errors on Refresh:**
- Ensure your hosting platform supports SPA routing
- Check that redirects are configured (already done in config files)

**Images Not Loading:**
- Verify all images are in the `public/images/` folder
- Check image paths in components

**Forms Not Working:**
- Configure form handling in your hosting platform
- Update form action URLs if needed

---

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Verify all files are uploaded correctly
3. Test on different devices and browsers
4. Contact your hosting provider's support if needed

---

## 🎉 You're Live!

Once deployed, your NutriCook website will be:
- ⚡ **Fast**: Optimized for speed and performance
- 📱 **Mobile-friendly**: Perfect on all devices
- 🔍 **SEO-ready**: Optimized for search engines
- 🔒 **Secure**: Protected with modern security headers

**Congratulations on your successful deployment!** 🎊