const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { roleMiddleware } = require("../../middleware/roleMiddleware");
const { uploadProfile, uploadDocument } = require("./uploadController");

// إعداد التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profile") cb(null, "uploads/profile");
    else cb(null, "uploads/documents");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + unique);
  }
});

const upload = multer({ storage });

// POST - upload profile picture
router.post("/profile", authMiddleware, upload.single("profile"), uploadProfile);

// POST - upload student document
router.post("/document", authMiddleware, roleMiddleware(["student", "admin"]), upload.single("document"), uploadDocument);

module.exports = router;
