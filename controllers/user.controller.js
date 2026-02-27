export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Không trả về password
    const userPosts = await Post.find({ userId: req.params.id })
      .sort({ createdAt: -1 })
      .populate("userId");

    res.status(200).json({ user, posts: userPosts });
  } catch (err) {
    res.status(500).json(err);
  }
};
