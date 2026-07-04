import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addComment,
  getCommentsByRoadmap,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

// Protected Routes
router.post("/:roadmapId", protect, addComment);
router.put("/:commentId", protect, updateComment);
router.delete("/:commentId", protect, deleteComment);

// Public Route
router.get("/:roadmapId", getCommentsByRoadmap);

export default router;