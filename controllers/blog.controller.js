import Blog from "../models/blog.model.js";

// 1. Lấy tất cả bài Blog
export const getAllBlogs = async (req, res) => {
  try {
    // Sắp xếp bài mới nhất lên đầu
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách blog", error });
  }
};

// 2. Lấy chi tiết một bài Blog theo ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết blog", error });
  }
};

// 3. Tạo Blog mới (Dùng Postman để tạo)
export const createBlog = async (req, res) => {
  const newBlog = new Blog(req.body);
  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo blog mới", error });
  }
};
