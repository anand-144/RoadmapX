import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  likeRoadmap,
  unlikeRoadmap,
  getRoadmapLikes,
} from "../controllers/likeController.js";

const router = express.Router();

// Protected
router.post("/:roadmapId", protect, likeRoadmap);
router.delete("/:roadmapId", protect, unlikeRoadmap);

// Public
router.get("/:roadmapId", getRoadmapLikes);

export default router;