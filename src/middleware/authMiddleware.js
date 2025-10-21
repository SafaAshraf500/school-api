
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  console.log("✅ دخلنا على authMiddleware");
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    console.log("🔹 Received token:", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded token:", decoded);

    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = { authMiddleware };

