# FlatScout Preference Form Fix - Deployment Checklist

## 🎯 Issue Fixed
**Problem:** Preference form worked in localhost but failed in production with "could not save preferences" error.

**Root Cause:** Axios was using relative URLs (`/api/...`) which don't resolve correctly in production environments.

## ✅ Changes Made

### 1. Created Centralized API Configuration (`src/utils/api.js`)
- ✅ Axios instance with dynamic baseURL from environment variables
- ✅ Request/response interceptors for debugging and error handling
- ✅ Convenience methods for common API endpoints
- ✅ Automatic auth token handling

### 2. Updated FlatmateForm Component (`src/components/FlatmateForm.jsx`)
- ✅ Replaced relative axios calls with centralized API methods
- ✅ Proper error handling with detailed logging
- ✅ Uses `apiMethods.flatmate.createProfile()` and `apiMethods.user.markPreferencesCompleted()`

### 3. Updated EditProfile Component (`src/pages/EditProfile.jsx`)
- ✅ Replaced fetch calls with centralized API methods
- ✅ Better error handling and user feedback

### 4. Added Debugging Tools
- ✅ ApiTester component (`src/components/ApiTester.jsx`) - accessible at `/api-test`
- ✅ Can test backend connection and preference save functionality

## 🚀 Deployment Steps

### For Netlify/Vercel (Frontend)
1. **Ensure environment variable is set:**
   ```
   VITE_API_URL=https://your-backend-name.onrender.com
   ```

2. **Deploy the updated code:**
   - Push changes to GitHub
   - Netlify/Vercel will auto-deploy
   - OR manually trigger redeploy

3. **Verify deployment:**
   - Visit: `https://your-site.netlify.app/debug`
   - Check that VITE_API_URL shows correctly
   - Test API connection

### For Render (Backend)
1. **Ensure environment variable is set:**
   ```
   FRONTEND_URL=https://your-site.netlify.app
   ```

2. **Backend should auto-deploy from GitHub**

## 🧪 Testing Steps

### 1. Test Environment Configuration
1. Visit: `https://your-site.netlify.app/debug`
2. Verify API URL is set correctly
3. Test API connection - should return success

### 2. Test API Functionality
1. Visit: `https://your-site.netlify.app/api-test`
2. Click "Test Backend Connection" - should succeed
3. Login to your account
4. Click "Test Preference Save" - should succeed

### 3. Test Complete User Flow
1. **New User:**
   - Sign up → Should redirect to preference form
   - Fill preference form → Should save successfully
   - Should redirect to homepage

2. **Existing User:**
   - Login → Should work normally
   - If no preferences → Should redirect to preference form
   - Fill preferences → Should save and redirect

## 🔧 Debug Issues

### If API URL shows "NOT SET":
```bash
# Check environment variables in deployment platform
# For Netlify: Site settings → Environment variables
# For Vercel: Project settings → Environment variables
# Ensure: VITE_API_URL=https://your-backend.onrender.com
```

### If API connection fails:
```bash
# Test backend directly
curl https://your-backend.onrender.com/health
# Should return: {"status": "ok"}
```

### If CORS errors:
```bash
# Check backend logs in Render dashboard
# Ensure FRONTEND_URL is set correctly in Render environment
```

## 🌐 URLs to Update

Replace these with your actual deployment URLs:

**Frontend URL:** `https://your-site-name.netlify.app`
**Backend URL:** `https://your-backend-name.onrender.com`

### Environment Variables

**Frontend (Netlify/Vercel):**
```
VITE_API_URL=https://your-backend-name.onrender.com
```

**Backend (Render):**
```
FRONTEND_URL=https://your-site-name.netlify.app
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🎉 Expected Result

After deployment:
- ✅ New users can complete preference form successfully
- ✅ Form saves to database without errors
- ✅ Users are redirected appropriately after form completion
- ✅ All API calls use correct absolute URLs
- ✅ Works in both development and production

## 📞 Support

If you encounter issues:
1. Check `/debug` page for environment configuration
2. Check `/api-test` page for API connectivity
3. Check browser console for specific error messages
4. Check backend logs in Render dashboard