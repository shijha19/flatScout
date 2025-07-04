import express from 'express';
import User from '../models/user.models.js';

const router = express.Router();

// Login route: add user to DB if not exists
router.post('/login', async (req, res) => {
  const { email, name } = req.body;
  console.log('Received login:', { email, name }); // Debug log
  if (!email || !name) {
    return res.status(400).json({ message: 'Email and name are required.' });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name, password: 'oauth-or-external', googleId: null });
      await user.save();
      console.log('User created:', user); // Debug log
    } else {
      console.log('User exists:', user); // Debug log
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Error in /login:', err); // Debug log
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
