import express from "express";
import User from "../models/user.models.js";
import ConnectionRequest from "../models/connectionRequest.models.js";

const router = express.Router();

// Get notifications: pending connection requests for the logged-in user
router.get("/notifications", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: "userId is required." });
  
  try {
    // Find pending connection requests for this user
    const pendingRequests = await ConnectionRequest.find({
      toUser: userId,
      status: "pending"
    }).populate('fromUser', 'name email _id').sort({ createdAt: -1 });

    // Format the response to match the existing notification structure
    const notifications = pendingRequests.map(request => ({
      _id: request._id,
      name: request.fromUser.name,
      email: request.fromUser.email,
      fromUserId: request.fromUser._id,
      type: "connection_request",
      createdAt: request.createdAt
    }));

    res.status(200).json({ notifications });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
