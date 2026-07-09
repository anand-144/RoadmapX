import express from "express";
import {
  createRoadmap,
  getRoadmaps,
  getRoadmapBySlug,
  getMyRoadmaps,
  updateRoadmap,
  deleteRoadmap,
} from "../controllers/roadmapController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// Public Routes
// ==========================

// Get all roadmaps
router.get("/", getRoadmaps);


// ==========================
// Protected Routes
// ==========================

// Get logged-in user's roadmaps
router.get("/my", protect, getMyRoadmaps);

// Create roadmap
router.post("/", protect, createRoadmap);

// Update roadmap
router.put("/:id", protect, updateRoadmap);

// Delete roadmap
router.delete("/:id", protect, deleteRoadmap);

// Get single roadmap by slug
router.get("/:slug", getRoadmapBySlug);

export default router;