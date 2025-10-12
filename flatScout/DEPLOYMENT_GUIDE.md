# FlatScout Deployment Guide

This guide will help you deploy your FlatScout application with the frontend on Netlify and backend on Render.

## Prerequisites

1. **GitHub Repository**: Ensure your code is pushed to a GitHub repository
2. **MongoDB Atlas**: Set up a MongoDB Atlas cluster for production database
3. **Accounts**: Create accounts on [Netlify](https://netlify.com) and [Render](https://render.com)

## Backend Deployment on Render

### Step 1: Prepare MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Create a database user and whitelist IP addresses (or use 0.0.0.0/0 for all IPs)
4. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/flatscout`)

### Step 2: Deploy Backend
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the backend folder: `flatScout/backend`
5. Configure the service:
   - **Name**: `flatscout-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for better performance)

### Step 3: Set Environment Variables
In your Render service dashboard, go to "Environment" tab and add:

**Required Variables:**
```bash
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/flatscout?retryWrites=true&w=majority
JWT_SECRET=your_secure_32_character_random_string
FRONTEND_URL=https://your-app-name.netlify.app
```

**Optional Variables (configure as needed):**
```bash
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-backend-app.onrender.com/api/auth/google/callback

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM="FlatScout" <noreply@flatscout.com>

# Stream Chat
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Web Push Notifications
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
VAPID_CONTACT_EMAIL=mailto:your_email@example.com
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Your backend will be available at: `https://your-backend-name.onrender.com`
4. Test the health endpoint: `https://your-backend-name.onrender.com/health`

## Frontend Deployment on Netlify

### Step 1: Deploy Frontend
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure build settings:
   - **Base directory**: `flatScout/frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### Step 2: Set Environment Variables
In your Netlify site dashboard, go to "Site settings" → "Environment variables":

**Required Variables:**
```bash
VITE_API_URL=https://your-backend-name.onrender.com
```

**Optional Variables (configure as needed):**
```bash
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_STREAM_API_KEY=your_stream_api_key
VITE_APP_NAME=FlatScout
```

### Step 3: Update Backend URL
After deployment, update your backend's `FRONTEND_URL` environment variable in Render to match your Netlify URL:
```bash
FRONTEND_URL=https://your-app-name.netlify.app
```

## Security Considerations

### JWT Secret Generation
Generate a secure JWT secret:
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

### VAPID Keys Generation (for Push Notifications)
```bash
npx web-push generate-vapid-keys
```

### Gmail App Password
1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account settings → Security → 2-Step Verification → App passwords
3. Generate an app password for "Mail"
4. Use this password (not your regular Gmail password) in `EMAIL_PASS`

## Testing Deployment

### Backend Tests
1. Health check: `GET https://your-backend-name.onrender.com/health`
2. API test: `GET https://your-backend-name.onrender.com/api`
3. Check logs in Render dashboard for any errors

### Frontend Tests
1. Open your Netlify URL
2. Check browser console for API connection errors
3. Test key functionality like user registration/login
4. Verify API calls are going to the correct backend URL

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `FRONTEND_URL` in backend matches your Netlify URL exactly
2. **Database Connection**: Verify MongoDB Atlas connection string and IP whitelist
3. **Environment Variables**: Double-check all required variables are set correctly
4. **Build Errors**: Check build logs in respective dashboards

### Render Free Tier Limitations
- Services sleep after 15 minutes of inactivity
- Cold starts may take 10-30 seconds
- Consider upgrading to paid plan for production use

### Netlify Free Tier Limitations
- 100GB bandwidth per month
- 300 build minutes per month
- Consider upgrading for high-traffic applications

## Monitoring and Maintenance

### Render
- Monitor service logs in dashboard
- Set up health check notifications
- Regular database backups

### Netlify
- Monitor site analytics
- Set up form submissions (if using Netlify Forms)
- Configure custom domain (optional)

## Custom Domain Setup (Optional)

### For Netlify (Frontend)
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS records with your domain provider

### For Render (Backend)
1. Go to service Settings → Custom domains
2. Add your API subdomain (e.g., api.yourdomain.com)
3. Update DNS records with your domain provider

## Support

- **Render Support**: [Render Documentation](https://render.com/docs)
- **Netlify Support**: [Netlify Documentation](https://docs.netlify.com)
- **MongoDB Atlas**: [Atlas Documentation](https://docs.atlas.mongodb.com)

---

## Quick Deployment Checklist

### Before Deployment:
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables prepared
- [ ] Code pushed to GitHub
- [ ] Build scripts tested locally

### Backend (Render):
- [ ] Service created and connected to repo
- [ ] Environment variables configured
- [ ] Deployment successful
- [ ] Health endpoint accessible

### Frontend (Netlify):
- [ ] Site created and connected to repo
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Site loads correctly
- [ ] API calls working

### Post-Deployment:
- [ ] Test all major functionality
- [ ] Monitor logs for errors
- [ ] Set up monitoring/alerts
- [ ] Document production URLs