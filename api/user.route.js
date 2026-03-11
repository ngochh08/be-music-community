import express from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/:id", getUserProfile);
router.put("/:id", verifyToken, updateUserProfile);

export default router;
