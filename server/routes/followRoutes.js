import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "../controllers/followController.js";

const router = express.Router();

// Protected
router.post("/:userId", protect, followUser);
router.delete("/:userId", protect, unfollowUser);

// Public
router.get("/followers/:userId", getFollowers);
router.get("/following/:userId", getFollowing);

export default router;