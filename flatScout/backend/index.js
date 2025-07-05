import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import pgRoutes from './routes/pgRoutes.js';
import userRoutes from './routes/userRoutes.js';
import flatListingRoutes from './routes/flatListingRoutes.js';
import flatmateRoutes from './routes/flatmate.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use('/api/pg', pgRoutes);
app.use('/api/user', userRoutes);
app.use('/api/flats', flatListingRoutes);
app.use('/api/flatmates', flatmateRoutes);

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
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
