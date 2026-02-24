import Post from "../models/post.model.js";

// Thêm bài viết
export const createPost = async (req, res) => {
  // req.user được tạo ra từ middleware verifyToken
  const newPost = new Post({ ...req.body, userId: req.user.id });
  try {
    const savedPost = await newPost.save();
    const fullPost = await Post.findById(savedPost._id).populate(
      "userId",
      "displayName avatar"
    );
    res.status(200).json(fullPost);
  } catch (err) {
    res.status(500).json("Lỗi khi đăng bài: " + err.message);
  }
};

// Xoá bài viết
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Không tìm thấy bài viết!");

    // Lấy đúng cái ID ra để so sánh và ép về String
    const postOwnerId = post.userId._id
      ? post.userId._id.toString()
      : post.userId.toString();
    const currentUserId = req.user.id.toString();

    if (postOwnerId === currentUserId) {
      await post.deleteOne();
      res.status(200).json("Xóa bài viết thành công!");
    } else {
      res.status(403).json("Bạn chỉ có thể xóa bài viết của chính mình!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Sửa bài viết
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Không tìm thấy bài viết!");

    const postOwnerId = post.userId._id
      ? post.userId._id.toString()
      : post.userId.toString();
    const currentUserId = req.user.id.toString();

    if (postOwnerId === currentUserId) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      ).populate("userId"); // Luôn populate để trả về đầy đủ thông tin user cho FE cập nhật state
      res.status(200).json(updatedPost);
    } else {
      res.status(403).json("Bạn chỉ có thể sửa bài viết của chính mình!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Lấy tất cả bài viết
export const getAllPosts = async (req, res) => {
  try {
    // find() lấy hết, sort({createdAt: -1}) để bài mới nhất hiện lên đầu
    // Tìm tất cả bài viết và tự động lấy displayName, avatar từ bảng User dựa trên userId
    const posts = await Post.find()
      .populate("userId", "displayName avatar")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json("Không thể lấy bài viết: " + err.message);
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Không tìm thấy bài viết!");

    // Kiểm tra xem user đã like bài này chưa
    if (!post.likes.includes(req.user.id)) {
      // Chưa like -> Thêm userId vào mảng likes
      await post.updateOne({ $push: { likes: req.user.id } });
      res.status(200).json("Đã thích bài viết!");
    } else {
      // Đã like rồi -> Xóa userId khỏi mảng likes (Unlike)
      await post.updateOne({ $pull: { likes: req.user.id } });
      res.status(200).json("Đã bỏ thích bài viết!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
