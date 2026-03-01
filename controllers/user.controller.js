import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // 1. Lấy thông tin User
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json("Không tìm thấy người dùng");

    // 2. Lấy bài viết của User đó
    const userPosts = await Post.find({ userId: userId })
      .sort({ createdAt: -1 })
      .populate("userId", "displayName avatar");

    // 3. Trả về cả 2 trong 1 Object
    res.status(200).json({ user, posts: userPosts });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err });
  }
};

export const updateUserProfile = async (req, res) => {
  // 1. Kiểm tra quyền: Người dùng chỉ được sửa profile của chính mình
  if (req.params.id !== req.body.userId) {
    return res.status(403).json("Bạn chỉ có thể cập nhật tài khoản của mình!");
  }

  try {
    // 2. Xử lý dữ liệu cập nhật
    const updateData = {};
    if (req.body.displayName) updateData.displayName = req.body.displayName;
    if (req.body.avatar) updateData.avatar = req.body.avatar;

    // 3. Cập nhật vào Database và lấy dữ liệu mới nhất
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true } // Trả về object đã được cập nhật
    ).select("-password"); // Không trả về mật khẩu cho Frontend

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Lỗi cập nhật user:", err);
    res.status(500).json(err);
  }
};
