const express = require("express");
const router = express.Router();
const upload = require("./uploadMiddleware");
const { authMiddleware } = require("../../middleware/authMiddleware");

// رفع صورة البروفايل
router.post(
  "/profile",
  authMiddleware,
  upload.single("profile"),
  (req, res) => {
    console.log("🔥 Route /api/upload/profile hit!");
    res.json({
      message: "Profile uploaded successfully",
      file: req.file
    });
  }
);

// رفع مستند
router.post(
  "/document",
  authMiddleware,
  upload.single("document"),
  (req, res) => {
    console.log("🔥 Route /api/upload/document hit!");
    res.json({
      message: "Document uploaded successfully",
      file: req.file
    });
  }
);

module.exports = router;
