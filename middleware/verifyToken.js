import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Lấy token từ header "Authorization"
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Lấy phần chuỗi sau chữ "Bearer"

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return res.status(403).json("Token không hợp lệ hoặc đã hết hạn!");
      req.user = user; // Lưu thông tin user vào request để dùng ở các hàm sau
      next(); // Cho phép đi tiếp
    });
  } else {
    return res.status(401).json("Bạn chưa đăng nhập!");
  }
};
