import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    // 1. Kiểm tra xem số điện thoại đã tồn tại chưa
    const userExists = await User.findOne({ phone: req.body.phone });
    if (userExists)
      return res.status(400).json("Số điện thoại này đã tồn tại!");

    // 2. Mã hóa mật khẩu
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // 3. Tạo link avatar ngẫu nhiên
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      req.body.displayName
    )}`;

    // 4. Tạo User mới
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      avatar: avatarUrl,
    });

    const savedUser = await newUser.save();

    // Tự động tạo luôn Token để Frontend đăng nhập ngay lập tức
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

    const { password, ...otherDetails } = savedUser._doc;

    // Trả về object chứa cả token và thông tin user giống như hàm login
    res.status(201).json({ token, ...otherDetails });
  } catch (err) {
    res.status(500).json("Lỗi đăng ký: " + err.message);
  }
};

export const login = async (req, res) => {
  try {
    // Tìm user theo số điện thoại và lấy thêm trường password
    const user = await User.findOne({ phone: req.body.phone }).select(
      "+password"
    );
    if (!user)
      return res
        .status(400)
        .json("Số điện thoại không có trong danh sách lớp!");

    // Kiểm tra mật khẩu
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json("Sai mật khẩu. Vui lòng thử lại!");

    // Tạo Token (Lấy chuỗi bí mật từ file .env)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Không gửi mật khẩu về frontend
    const { password, ...otherDetails } = user._doc;

    res.status(200).json({ token, ...otherDetails });
  } catch (err) {
    res.status(500).json("Lỗi hệ thống: " + err.message);
  }
};
