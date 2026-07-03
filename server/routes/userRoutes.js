import express from "express";
import {
  getProfile,
  updateProfile,
  getUserByUsername,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected Routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Public Route
router.get("/:username", getUserByUsername);

export default router;