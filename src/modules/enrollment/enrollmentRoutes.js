const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/authMiddleware");
const { roleMiddleware } = require("../../middleware/roleMiddleware");

const {
  createEnrollment,
  getStudentCourses,
  getCourseStudents,
  deleteEnrollment
} = require("./enrollmentController");

// POST - Create enrollment
router.post("/", authMiddleware, roleMiddleware(["student", "admin"]), createEnrollment);

// GET - Get student courses
router.get("/student/:studentId", authMiddleware, roleMiddleware(["student", "admin"]), getStudentCourses);

// GET - Get students in a course
router.get("/course/:courseId", authMiddleware, roleMiddleware(["teacher", "admin"]), getCourseStudents);

// DELETE - Remove enrollment
router.delete("/:id", authMiddleware, roleMiddleware(["student", "admin"]), deleteEnrollment);

module.exports = router;
