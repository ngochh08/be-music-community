import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

// 1. Lấy danh sách tất cả blog
router.get("/", getAllBlogs);

// 2. Lấy chi tiết một bài blog
router.get("/:id", getBlogById);

// 3. API tạo blog mới
router.post("/", createBlog);

export default router;
