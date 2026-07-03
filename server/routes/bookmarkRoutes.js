import express from "express";
import {
  addBookmarks,
  removeBookmark,
  getMyBookmarks,
} from "../controllers/bookmarkController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected Routes
router.post("/:roadmapId", protect, addBookmarks);
router.delete("/:roadmapId", protect, removeBookmark);
router.get("/my", protect, getMyBookmarks);

export default router;