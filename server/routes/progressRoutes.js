import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  completeTopic,
  removeCompletedTopic,
  getRoadmapProgress,
  getMyProgress,
} from "../controllers/progressController.js";

const router = express.Router();

router.post("/:roadmapId/topic/:topicId", protect, completeTopic);

router.delete("/:roadmapId/topic/:topicId", protect, removeCompletedTopic);

router.get("/my", protect, getMyProgress);

router.get("/:roadmapId", protect, getRoadmapProgress);

export default router;