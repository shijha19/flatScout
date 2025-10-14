# Vercel Deployment Guide for FlatScout Frontend

## Prerequisites
- GitHub account with your code pushed to a repository
- Vercel account (free tier available)
- Backend deployed on Render, Railway, or similar service

## Step-by-Step Deployment Instructions

### Step 1: Prepare Your Repository
1. **Commit all your changes:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository:**
   - Select your repository from the list
   - Choose the `flatScout` repository

4. **Configure Project Settings:**
   - **Framework Preset**: Vite
   - **Root Directory**: `flatScout/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Click "Deploy"** (Don't set environment variables yet)

### Step 3: Configure Environment Variables

1. **Go to your project dashboard on Vercel**
2. **Navigate to Settings → Environment Variables**
3. **Add the following variables:**

   **REQUIRED Variables:**
   ```
   VITE_API_URL = https://your-backend-app.onrender.com
   ```
   
   **OPTIONAL Variables (add if you use these features):**
   ```
   VITE_STREAM_API_KEY = your-stream-api-key
   VITE_GOOGLE_MAPS_API_KEY = your_google_maps_api_key  
   VITE_APP_NAME = FlatScout
   ```

4. **For each variable:**
   - Set Environment: `Production`, `Preview`, and `Development`
   - Click "Save"

### Step 4: Redeploy with Environment Variables

1. **Go to Deployments tab**
2. **Click on the latest deployment**
3. **Click "Redeploy"** to apply environment variables

### Step 5: Update Backend CORS Settings

1. **Your frontend URL will be:** `https://your-project-name.vercel.app`
2. **Update your backend's `FRONTEND_URL` environment variable** to this new URL
3. **Redeploy your backend** to apply changes

## Verification Steps

### 1. Test Your Deployment
Visit your Vercel URL and verify:
- ✅ Site loads without errors
- ✅ API calls work (check browser console)
- ✅ Authentication/login works
- ✅ All features function properly

### 2. Debug Issues (if needed)
Visit: `https://your-app.vercel.app/debug`
- Check if `VITE_API_URL` shows correctly
- Test API connection
- Verify environment variables

### 3. Test API Connection
```bash
# Test your backend health endpoint
curl https://your-backend-app.onrender.com/health

# Should return: {"status": "ok"}
```

## Important URLs to Update

After deployment, update these in your backend:
- **Render Environment Variables:**
  ```
  FRONTEND_URL=https://your-project-name.vercel.app
  ```

## Common Issues & Solutions

### Issue 1: "VITE_API_URL not set" error
**Solution:**
- Verify you added `VITE_API_URL` to Vercel environment variables
- Redeploy your project after adding variables
- Clear browser cache

### Issue 2: CORS errors
**Solution:**
- Update `FRONTEND_URL` in your backend environment variables
- Ensure the URL matches exactly (no trailing slashes)
- Redeploy your backend

### Issue 3: 404 errors on page refresh
**Solution:**
- This should be handled by `vercel.json` routing
- If issues persist, check the vercel.json configuration

### Issue 4: Build fails
**Solution:**
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility (we're using 18.x)

## Advanced Configuration

### Custom Domain (Optional)
1. Go to Settings → Domains in your Vercel project
2. Add your custom domain
3. Update DNS records as instructed
4. Update backend `FRONTEND_URL` to match

### Performance Optimization
The configuration includes:
- Code splitting for better loading
- Asset optimization
- Source map generation for development
- Minification for production

## Useful Commands

```bash
# Test build locally
npm run build
npm run preview

# Check environment variables locally
npm run dev

# Force fresh deployment
# Go to Vercel dashboard → Deployments → Redeploy
```

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Use the `/debug` route on your deployed site  
3. Verify backend logs on Render
4. Check browser console for client-side errors

---

**Your app will be available at:** `https://your-project-name.vercel.app`

Replace `your-project-name` with your actual Vercel project name and `your-backend-app` with your actual backend URL.