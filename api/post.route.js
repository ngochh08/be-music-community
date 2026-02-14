import express from "express";
import {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  likePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createPost); // Chỉ ai có Token mới được gọi hàm createPost
router.delete("/:id", verifyToken, deletePost); // Cần Token để biết ai xóa
router.put("/:id", verifyToken, updatePost); // Cần Token để biết ai sửa
router.get("/", getAllPosts); // Xem bài (Không cần Token cũng được)
router.put("/:id/like", verifyToken, likePost);

export default router;
