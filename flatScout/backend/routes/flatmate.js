import express from 'express';
import FlatmateProfile from '../models/FlatmateProfile.js';
import User from '../models/user.models.js';

const router = express.Router();

// Get flatmate profile by userId
router.get('/profile/:userId', async (req, res) => {
  try {
    const profile = await FlatmateProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json(null);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get full profile (user + flatmate profile) by userId
router.get('/profile/full/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('Looking for user with ID:', userId);
    
    let user = null;
    let profile = null;
    
    // Strategy 1: Try to find user by _id (if it's a MongoDB ObjectId)
    if (/^[a-fA-F0-9]{24}$/.test(userId)) {
      console.log('Trying to find user by MongoDB ObjectId');
      user = await User.findById(userId);
      if (user) {
        console.log('Found user by ObjectId:', user.name);
        // Get flatmate profile using the user's ObjectId
        profile = await FlatmateProfile.findOne({ userId: userId });
      }
    }
    
    // Strategy 2: If not found by ObjectId, try to find user by email
    if (!user && userId.includes('@')) {
      console.log('Trying to find user by email');
      user = await User.findOne({ email: userId });
      if (user) {
        console.log('Found user by email:', user.name);
        // Get flatmate profile using the user's ObjectId
        profile = await FlatmateProfile.findOne({ userId: user._id.toString() }) ||
                   await FlatmateProfile.findOne({ userEmail: userId });
      }
    }
    
    // Strategy 3: If still not found, try to find flatmate profile first and get user from there
    if (!user) {
      console.log('Trying to find flatmate profile first');
      profile = await FlatmateProfile.findOne({ userId: userId }) ||
                await FlatmateProfile.findOne({ userEmail: userId });
      
      if (profile) {
        console.log('Found flatmate profile:', profile.name);
        // Try to find user by the userId in the profile
        if (profile.userId && /^[a-fA-F0-9]{24}$/.test(profile.userId)) {
          user = await User.findById(profile.userId);
        } else if (profile.userEmail) {
          user = await User.findOne({ email: profile.userEmail });
        }
      }
    }
    
    if (!user) {
      console.log('User not found with any strategy');
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log('Final result - User:', user.name, 'Profile:', profile ? profile.name : 'No profile');
    
    res.json({
      user: user,
      profile: profile
    });
  } catch (err) {
    console.error('Error in /profile/full/:userId:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create or update flatmate profile by userId
router.post('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const update = req.body;
    const profile = await FlatmateProfile.findOneAndUpdate(
      { userId },
      update,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get matches for a user, show all cards (no kmeans clustering)
// Get matches for a user, show all cards except own (by userId or email)
router.get('/matches/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Optionally support email fallback for uniqueness
    const userEmail = req.query.userEmail;
    let query = { userId: { $ne: userId } };
    if (userEmail) {
      query = {
        $and: [
          { userId: { $ne: userId } },
          { userEmail: { $ne: userEmail } }
        ]
      };
    }
    const allProfiles = await FlatmateProfile.find(query);
    res.json(allProfiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
