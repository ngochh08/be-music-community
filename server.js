import express from "express";
import cors from "cors";
import post from "./api/post.route.js";
import authRoute from "./api/auth.route.js";
import userRoute from "./api/user.route.js";
import blogRoute from "./api/blog.route.js";

const app = express();
app.use(cors()); // Cho phép tất cả các nguồn truy cập
app.use(express.json());

// 1. Các route hợp lệ
app.use("/api/posts", post);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

// 2. Route báo lỗi "Không tìm thấy"
app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
