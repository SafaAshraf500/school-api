const multer = require("multer");
const path = require("path");
const fs = require("fs");
console.log(" uploadMiddleware loaded");
function ensureDirExist(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log("📁 Folder created:", dir);
  } else {
    console.log("📂 Folder already exists:", dir);
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("🟢 STEP 1: Inside destination()");
    console.log("📦 File field:", file.fieldname);
    

    if (!req.user) {
      console.log("❌ No user in req");
      return cb(new Error("User not authenticated"));
    }

    const userId = req.user.userId;
    console.log("👤 User ID:", userId);

    let folder = "";
    if (file.fieldname === "profile") {
      folder = `uploads/profiles/user_${userId}`;
    } else if (file.fieldname === "document") {
      folder = `uploads/documents/user_${userId}`;
    } else {
      console.log("❌ Unknown field name:", file.fieldname);
      return cb(new Error("Unexpected file field"));
    }

    ensureDirExist(folder);
    console.log("📍 Destination folder:", folder);
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    console.log("🟢 STEP 2: Inside filename()");
    const uniqueName = `${Date.now()}_${file.originalname}`;
    console.log("📝 Saved file name:", uniqueName);
    cb(null, uniqueName);
  }
});

function fileFilter(req, file, cb) {
  console.log("🟢 STEP 3: Inside fileFilter()");
  console.log("📂 File mimetype:", file.mimetype);

  if (file.fieldname === "profile") {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg and .png files allowed for profile pictures"));
    }
  } else if (file.fieldname === "document") {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .pdf, .jpg, .png files allowed for documents"));
    }
  } else {
    cb(new Error("Unknown field"));
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 
  }
});

module.exports = upload;

