import express from 'express';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import pgRoutes from './routes/pgRoutes.js';
import userRoutes from './routes/userRoutes.js';
import flatListingRoutes from './routes/flatListingRoutes.js';
import flatmateRoutes from './routes/flatmate.js';
import authRoutes from './routes/auth.js';
import notificationRoutes from './routes/notification.js';
import connectionRequestRoutes from './routes/connectionRequest.js';
import bookingRoutes from './routes/booking.js';
import './config/passport.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Session middleware
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// JSON body parser
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pg', pgRoutes);
app.use('/api/user', userRoutes);
app.use('/api/flats', flatListingRoutes);
app.use('/api/flatmates', flatmateRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/connection', connectionRequestRoutes);
app.use('/api/booking', bookingRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
