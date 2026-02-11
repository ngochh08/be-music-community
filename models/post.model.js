import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500, // Giới hạn độ dài bài viết
    },
    img: {
      type: String, // Link ảnh (nếu có)
    },
    video: {
      type: String, // Link video/nhạc (nếu có)
    },
    likes: {
      type: Array, // Chứa danh sách ID của những người đã like
      default: [],
    },
  },
  { timestamps: true } // Tự động tạo createdAt và updatedAt
);

export default mongoose.model("Post", postSchema);
