import express from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Lấy danh sách comment (ai cũng xem được)
router.get("/:postId", getComments);

// Thêm comment mới (phải đăng nhập mới comment được)
router.post("/", verifyToken, addComment);

export default router;
