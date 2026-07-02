import express from "express";
import {
  createRoadmap,
  getRoadmaps,
  getRoadmapBySlug,
  updateRoadmap,
  deleteRoadmap,
} from "../controllers/roadmapController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getRoadmaps);
router.get("/:slug", getRoadmapBySlug);

// Protected Routes
router.post("/", protect, createRoadmap);
router.put("/:id", protect, updateRoadmap);
router.delete("/:id", protect, deleteRoadmap);

export default router;