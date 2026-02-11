import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  // req.user được tạo ra từ middleware verifyToken
  const newPost = new Post({ ...req.body, userId: req.user.id });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json("Lỗi khi đăng bài: " + err.message);
  }
};
