import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
    trim: true, // Tự động xoá khoảng trắng dư ở đầu và cuối chuỗi khi lưu vào DB
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false, // không trả password khi query
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  avatar: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// export default mongoose.model("User", userSchema); => gây lỗi vì Mongoose sẽ mặc định
// tự thêm chữ "s" vào để tìm collection tên là users (số nhiều) nhưng db đang lưu là collection "user"
export default mongoose.model("User", userSchema);
