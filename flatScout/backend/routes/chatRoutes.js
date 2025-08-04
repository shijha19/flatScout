import express from 'express';
import { generateToken } from '../controllers/chatController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Generate Stream Chat token
router.post('/token', auth, generateToken);

export default router;
