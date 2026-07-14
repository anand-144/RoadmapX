import express from "express";
import {
  createRoadmap,
  getRoadmaps,
  getRoadmapBySlug,
  getFeaturedRoadmaps,
  getMyRoadmaps,
  updateRoadmap,
  toggleFeaturedRoadmap,
  deleteRoadmap,
} from "../controllers/roadmapController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// ==========================
// Public Routes
// ==========================

// Get all roadmaps
router.get("/", getRoadmaps);
router.get("/featured", getFeaturedRoadmaps);


// ==========================
// Protected Routes
// ==========================

// Get logged-in user's roadmaps
router.get("/my", protect, getMyRoadmaps);

// Create roadmap
router.post("/", protect, createRoadmap);

// Update roadmap
router.put("/:id", protect, updateRoadmap);

router.patch(
  "/:id/feature",
  protect,
  adminOnly,
  toggleFeaturedRoadmap
);

// Delete roadmap
router.delete("/:id", protect, deleteRoadmap);


// Get single roadmap by slug
router.get("/:slug", getRoadmapBySlug);

export default router;