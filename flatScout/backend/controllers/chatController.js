import { StreamChat } from 'stream-chat';
import User from '../models/user.models.js';

const serverClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

export const generateToken = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Get user from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate Stream Chat token
    const token = serverClient.createToken(userId);

    // Return token to client
    res.json({ token });
  } catch (error) {
    console.error('Error generating chat token:', error);
    res.status(500).json({ message: 'Error generating chat token' });
  }
};
