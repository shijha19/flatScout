import express from "express";
import User from "../models/user.models.js";
import ConnectionRequest from "../models/connectionRequest.models.js";

const router = express.Router();

// Get notifications: pending connection requests for the logged-in user
router.get("/notifications", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: "userId is required." });

  try {
    // ...existing code...
    // Find both sent and received pending connection requests for this user
    const receivedRequests = await ConnectionRequest.find({
      toUser: userId,
      status: "pending"
    }).populate('fromUser', 'name email _id').sort({ createdAt: -1 });
    // ...existing code...
    const sentRequests = await ConnectionRequest.find({
      fromUser: userId,
      status: "pending"
    }).populate('toUser', 'name email _id').sort({ createdAt: -1 });
    // ...existing code...

    // Format the response to match the existing notification structure
    const notifications = [
      ...receivedRequests.map(request => ({
        _id: request._id,
        name: request.fromUser.name,
        email: request.fromUser.email,
        fromUserId: request.fromUser._id,
        direction: "received",
        type: "connection_request",
        createdAt: request.createdAt
      })),
      ...sentRequests.map(request => ({
        _id: request._id,
        name: request.toUser.name,
        email: request.toUser.email,
        toUserId: request.toUser._id,
        direction: "sent",
        type: "connection_request",
        createdAt: request.createdAt
      }))
    ];
    // ...existing code...
    res.status(200).json({ notifications });
  } catch (err) {
    console.error("[Notification API] error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
