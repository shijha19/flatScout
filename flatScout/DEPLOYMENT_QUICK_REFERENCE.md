# Quick Deployment Commands & URLs

## Deployment URLs (Update after deployment)
- **Frontend (Netlify)**: `https://your-app-name.netlify.app`
- **Backend (Render)**: `https://your-backend-name.onrender.com`

## Important Files Created/Modified

### Frontend Files:
- `netlify.toml` - Netlify configuration
- `vite.config.js` - Updated with build optimization
- `.env.example` - Environment variables template
- `package.json` - Added production build script

### Backend Files:
- `render.yaml` - Render deployment configuration
- `.env.example` - Updated with production variables
- `package.json` - Added Node.js engine specification

## Essential Environment Variables

### Backend (Render Dashboard):
```bash
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_32_char_secret
FRONTEND_URL=https://your-app.netlify.app
```

### Frontend (Netlify Dashboard):
```bash
VITE_API_URL=https://your-backend.onrender.com
```

## Test Commands After Deployment

```bash
# Test backend health
curl https://your-backend-name.onrender.com/health

# Test backend API
curl https://your-backend-name.onrender.com/api
```

## Generate Secure Secrets

```bash
# JWT Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# VAPID Keys for push notifications
npx web-push generate-vapid-keys
```