// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../../../database/models/user.model.js");
const studentModel = require("../../../database/models/student.model.js");
const teacherModel = require("../../../database/models/teacher.model.js");

//  Register controller
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, profilePic } = req.body;

    if (!name || !email || !password || !role)
      return res.status(400).json({ message: "Missing required fields" });

    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      profilePic,
    });

    if (role === "student") {
      await studentModel.create({ userId: newUser._id });
    } else if (role === "teacher") {
      await teacherModel.create({ userId: newUser._id });
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      id: user._id,
      name: user.name,
      role: user.role,
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Logout controller
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
