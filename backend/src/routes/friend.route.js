import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getPendingRequests
} from "../controllers/friend.controller.js";

const router = express.Router();

router.get("/search/:username", protectRoute, searchUsers);
router.post("/request/:receiverId", protectRoute, sendFriendRequest);
router.put("/request/:requestId/accept", protectRoute, acceptFriendRequest);
router.put("/request/:requestId/reject", protectRoute, rejectFriendRequest);
router.get("/requests/pending", protectRoute, getPendingRequests);

export default router;
