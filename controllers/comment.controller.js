import Comment from "../models/comment.model.js";

// Hàm lấy comment
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId", "displayName avatar")
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json("Lỗi khi lấy bình luận!");
  }
};

// Hàm thêm comment
export const addComment = async (req, res) => {
  try {
    const newComment = new Comment({
      ...req.body,
      userId: req.user.id, // Lấy từ verifyToken
    });
    const savedComment = await newComment.save();

    // Sau khi lưu xong, lấy thêm thông tin user để trả về cho FE hiện luôn
    const fullComment = await savedComment.populate(
      "userId",
      "displayName avatar"
    );

    res.status(200).json(fullComment);
  } catch (err) {
    res.status(500).json("Lỗi khi đăng bình luận!");
  }
};
