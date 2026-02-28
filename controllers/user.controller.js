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
