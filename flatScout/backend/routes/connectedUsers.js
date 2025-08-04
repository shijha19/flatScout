import express from 'express';
import ConnectionRequest from '../models/connectionRequest.models.js';
import User from '../models/user.models.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/connected-users/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all accepted connection requests where the user is either the sender or receiver
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUser: userId },
        { toUser: userId }
      ],
      status: 'accepted'
    });

    // Extract the IDs of connected users
    const connectedUserIds = connections.map(conn => 
      conn.fromUser.toString() === userId ? conn.toUser : conn.fromUser
    );

    // Fetch user details for connected users
    const connectedUsers = await User.find(
      { _id: { $in: connectedUserIds } },
      'name email profilePicture' // Only select necessary fields
    );

    res.json({ connectedUsers });
  } catch (error) {
    console.error('Error fetching connected users:', error);
    res.status(500).json({ message: 'Error fetching connected users' });
  }
});

export default router;
