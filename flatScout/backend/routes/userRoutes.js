import express from 'express';
import User from '../models/user.models.js';

const router = express.Router();

// Change password route
router.put('/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    if (user.password !== oldPassword) {
      return res.status(401).json({ message: 'Old password is incorrect.' });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get user profile by email (for frontend display)
router.get('/profile', async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Signup route: create user in MongoDB if not exists
router.post('/signup', async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ message: 'Email, name, and password are required.' });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User already exists. Please log in.' });
    }
    user = new User({ email, name, password });
    await user.save();
    res.status(201).json({ message: 'Signup successful. You can now log in.', user });
  } catch (err) {
    console.error('Error in /signup:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login route: add user to DB if not exists
router.post('/login', async (req, res) => {
  const { email, name, password } = req.body;
  console.log('Received login:', { email, name }); // Debug log
  if (!email || !name || !password) {
    return res.status(400).json({ message: 'Email, name, and password are required.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // User not found, send 401 and message to redirect to signup
      return res.status(401).json({ message: 'User not found. Please sign up.' });
    }
    if (user.name !== name || user.password !== password) {
      // Name or password do not match
      return res.status(401).json({ message: 'Invalid credentials. Please check your name and password.' });
    }
    // User exists and credentials match, allow login
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Error in /login:', err); // Debug log
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  const { email, name, phone, bio, location } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required to update profile.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;
    if (location) user.location = location;
    await user.save();
    res.status(200).json({ message: 'Profile updated successfully.', user });
  } catch (err) {
    console.error('Error in PUT /profile:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
