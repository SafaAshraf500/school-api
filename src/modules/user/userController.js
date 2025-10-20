const User = require("../../../database/models/user.model");

// Get current user
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    next(err);
  }
};

//  Update user info
exports.updateProfile = async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.file) updates.profilePicture = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(req.user.userId, updates, {
      new: true,
      select: "-password",
    });

    res.json({ message: "Profile updated", user });
  } catch (err) {
    next(err);
  }
};
