import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

import {
  getDashboardStats,

  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,

  getAllRoadmaps,
  deleteRoadmapByAdmin,
  togglePublishRoadmap,
  toggleFeatureRoadmap,

  getAllCategories,

  getPlatformAnalytics,
} from "../controllers/adminController.js";

const router = express.Router();

/*
==========================================
Protect All Admin Routes
==========================================
*/

router.use(protect);
router.use(adminOnly);

/*
==========================================
Dashboard
==========================================
*/

router.get("/dashboard", getDashboardStats);

/*
==========================================
Users
==========================================
*/

router.get("/users", getAllUsers);

router.get("/users/:id", getUserById);

router.put("/users/:id/role", updateUserRole);

router.delete("/users/:id", deleteUser);

/*
==========================================
Roadmaps
==========================================
*/

router.get("/roadmaps", getAllRoadmaps);

router.delete("/roadmaps/:id", deleteRoadmapByAdmin);

router.put("/roadmaps/:id/publish", togglePublishRoadmap);

/*
==========================================
Categories
==========================================
*/

router.get("/categories", getAllCategories);

/*
==========================================
Analytics
==========================================
*/

router.get("/analytics", protect,adminOnly, getPlatformAnalytics);

export default router;