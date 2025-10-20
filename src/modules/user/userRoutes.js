const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("./userController");
const { authMiddleware } = require('../../middleware/authMiddleware.js');
const multer = require("multer");

// إعداد multer لتخزين الملفات داخل مجلد uploads
const upload = multer({ dest: "uploads/" });

// Get current user profile
router.get("/me", authMiddleware, getProfile);

// Update current user profile
router.put("/me", authMiddleware, upload.single("profilePicture"), updateProfile);

module.exports = router;
