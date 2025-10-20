
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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

