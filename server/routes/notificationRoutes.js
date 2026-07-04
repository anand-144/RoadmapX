import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", protect, getMyNotifications);

router.put("/:id/read", protect, markNotificationAsRead);

router.put("/read-all", protect, markAllNotificationsAsRead);

router.delete("/:id", protect, deleteNotification);

export default router;