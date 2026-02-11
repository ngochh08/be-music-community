import express from "express";
import { createPost } from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Chỉ ai có Token mới được gọi hàm createPost
router.post("/", verifyToken, createPost);

export default router;
