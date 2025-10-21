exports.uploadProfile = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const fileUrl = `/uploads/profile/${req.file.filename}`;
    res.status(200).json({
      message: "Profile picture uploaded successfully",
      profilePictureUrl: fileUrl
    });
  } catch (err) {
    next(err);
  }
};

exports.uploadDocument = async (req, res, next) => {
  try {
    const { studentId } = req.body;
    const userRole = req.user.role;
    const currentUserId = req.user.userId;
    const finalStudentId = userRole === "student" ? currentUserId : studentId;

    if (!finalStudentId) return res.status(400).json({ message: "Missing studentId" });
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const fileUrl = `/uploads/documents/${req.file.filename}`;
    res.status(200).json({
      message: "Document uploaded successfully",
      documentUrl: fileUrl
    });
  } catch (err) {
    next(err);
  }
};
