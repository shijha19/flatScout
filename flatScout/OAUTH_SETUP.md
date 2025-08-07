# Google OAuth Setup for Local Development

## Important Steps to Fix OAuth:

### 1. Google Cloud Console Setup
You need to add the localhost callback URL to your Google OAuth app:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services > Credentials
3. Find your OAuth 2.0 Client ID: `898373000196-s0o5i41eeesric2mndu7n60vn2uutgbh.apps.googleusercontent.com`
4. Click on it to edit
5. Under "Authorized redirect URIs", add:
   ```
   http://localhost:5000/api/auth/google/callback
   ```
6. Save the changes

### 2. Environment Variables Updated
✅ Backend `.env` has been updated with:
- `GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback`
- `FRONTEND_URL=http://localhost:3000`

✅ Frontend `.env` has been updated with:
- `VITE_API_URL=http://localhost:5000`

### 3. Test the Setup

#### Start the servers:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

#### Test OAuth:
1. Visit: http://localhost:3000/oauth-test
2. Click "Test Auth Endpoint" to verify backend is running
3. Click "Sign in with Google" to test OAuth flow

### 4. Troubleshooting

If OAuth still doesn't work:

1. **Check Google Console**: Make sure `http://localhost:5000/api/auth/google/callback` is in authorized redirect URIs
2. **Check Network**: Ensure both frontend (3000) and backend (5000) are running
3. **Check Browser Console**: Look for CORS or network errors
4. **Test Backend Directly**: Visit `http://localhost:5000/api/auth/test` to verify backend is working

### 5. Production vs Development

The app is now configured for local development. When deploying:
- Update `GOOGLE_CALLBACK_URL` back to production URL
- Update `FRONTEND_URL` back to production URL
- Update frontend `VITE_API_URL` back to production URL

## Files Modified:
- `backend/.env` - Updated URLs for localhost
- `frontend/.env` - Updated API URL for localhost
- `backend/routes/auth.js` - Added test endpoint
- `frontend/src/pages/OAuthTest.jsx` - New test page
- `frontend/src/AppRoutes.jsx` - Added test route
