const enrollmentModel = require("../../../database/models/enrollment.model");
const userModel = require("../../../database/models/user.model");
const courseModel = require("../../../database/models/course.model");

// POST /api/enrollments
exports.createEnrollment = async (req, res, next) => {
  try {
    const { courseId, studentId } = req.body;
    const userRole = req.user.role;
    const currentUserId = req.user.userId;

    // لو الطالب نفسه بيسجل، استخدم الـ id بتاعه
    const finalStudentId = userRole === "student" ? currentUserId : studentId;
    if (!finalStudentId || !courseId) {
      return res.status(400).json({ message: "Missing studentId or courseId" });
    }

    // check if course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // check if already enrolled
    const exists = await enrollmentModel.findOne({ studentId: finalStudentId, courseId });
    if (exists) return res.status(409).json({ message: "Student already enrolled" });

    const enrollment = await enrollmentModel.create({ studentId: finalStudentId, courseId });
    res.status(201).json({
      message: "Enrollment created successfully",
      enrollment
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/enrollments/student/:studentId
exports.getStudentCourses = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const enrollments = await enrollmentModel.find({ studentId }).populate("courseId", "name");
    res.status(200).json({
      studentId,
      courses: enrollments.map(e => ({
        courseId: e.courseId._id,
        courseName: e.courseId.name,
        enrolledAt: e.enrolledAt
      }))
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/enrollments/course/:courseId
exports.getCourseStudents = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const enrollments = await enrollmentModel.find({ courseId }).populate("studentId", "name email");
    res.status(200).json({
      courseId,
      students: enrollments.map(e => ({
        studentId: e.studentId._id,
        name: e.studentId.name,
        email: e.studentId.email
      }))
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/enrollments/:id
exports.deleteEnrollment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enrollment = await enrollmentModel.findById(id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    // check permissions
    if (req.user.role === "student" && enrollment.studentId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Enrollment.findByIdAndDelete(id);
    res.status(200).json({ message: "Enrollment removed successfully", removedId: id });
  } catch (err) {
    next(err);
  }
};
