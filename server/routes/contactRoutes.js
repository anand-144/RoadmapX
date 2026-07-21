import express from "express";

import { contact } from "../controllers/contactController.js";

const router = express.Router();

// Send Contact Message

router.post("/", contact);

export default router;