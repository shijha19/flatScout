import express from 'express';
import FlatmateProfile from '../models/FlatmateProfile.js';

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
router.get('/matches/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const allProfiles = await FlatmateProfile.find({ userId: { $ne: userId } });
    res.json(allProfiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
