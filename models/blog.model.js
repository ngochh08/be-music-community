import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String }, // Mô tả ngắn ngoài danh sách
    content: { type: String, required: true }, // Nội dung chi tiết (có thể chứa HTML)
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
