# FlatScout Deployment Fix Guide

## Issue: "Failed to fetch" error on login/signup

### Root Cause
When deploying frontend (Netlify) and backend (Render) separately, you need to properly configure environment variables and CORS settings.

## Solution Steps

### 1. Update Backend CORS Settings ✅

The backend has been updated with flexible CORS settings that automatically handle:
- Production domains (*.netlify.app, *.vercel.app, *.onrender.com)
- Development URLs (localhost:3000, localhost:5173)
- Proper error handling for blocked origins

### 2. Set Environment Variables on Netlify

1. **Go to your Netlify Dashboard**
2. **Select your site** → Site settings → Environment variables
3. **Add these variables:**

```bash
VITE_API_URL=https://your-backend-name.onrender.com
```

**Important:** Replace `your-backend-name` with your actual Render app name.

4. **Redeploy your site** after adding variables:
   - Go to Deploys → Trigger deploy

### 3. Set Environment Variables on Render

1. **Go to your Render Dashboard**
2. **Select your backend service** → Environment
3. **Add/Update these variables:**

```bash
NODE_ENV=production
FRONTEND_URL=https://your-site-name.netlify.app
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

**Important:** Replace `your-site-name` with your actual Netlify site name.

### 4. Debug Your Setup

After deploying both changes:

1. **Visit your frontend URL + `/debug`**
   - Example: `https://your-site.netlify.app/debug`
2. **Check the environment variables**
3. **Click "Test API Connection"**
4. **Verify the connection works**

### 5. Test the Fix

1. **Clear your browser cache** (Ctrl+Shift+R)
2. **Try logging in/signing up**
3. **Check browser console** for any remaining errors

## Common Issues & Solutions

### Issue: API URL still shows "NOT SET"
**Solution:** 
- Verify you added `VITE_API_URL` to Netlify (not `API_URL`)
- Redeploy your Netlify site after adding variables
- Clear browser cache

### Issue: CORS errors in console
**Solution:**
- Ensure `FRONTEND_URL` is set correctly on Render
- Redeploy your Render backend
- Check that URLs match exactly (no trailing slashes)

### Issue: Backend not responding
**Solution:**
- Check your Render backend logs for errors
- Verify your backend is actually deployed and running
- Test the health endpoint: `https://your-backend.onrender.com/health`

## Quick Verification Commands

```bash
# Test backend health
curl https://your-backend-name.onrender.com/health

# Test backend API
curl https://your-backend-name.onrender.com/api
```

## Final Checklist

- ✅ Backend CORS updated
- ⬜ `VITE_API_URL` set on Netlify
- ⬜ `FRONTEND_URL` set on Render
- ⬜ Both services redeployed
- ⬜ Debug page shows correct API URL
- ⬜ API connection test passes
- ⬜ Login/signup working

## Need Help?

If you're still having issues:

1. Visit `/debug` on your deployed site to see the current configuration
2. Check browser console for specific error messages
3. Verify your Render backend logs for any errors
4. Ensure both URLs are accessible in your browser

Remember: Changes to environment variables require redeployment to take effect!