const express = require("express")
const { addCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require("./course.controller.js")
const { authMiddleware } = require("../../middleware/authMiddleware.js")
const allowRoles = require("../../middleware/roles.js")
const courseRouter = express.Router()

courseRouter.post('/', authMiddleware,allowRoles('admin', 'teacher'), addCourse)
courseRouter.get('/',getAllCourses)
courseRouter.get('/:id', getCourseById)
courseRouter.put("/:id", authMiddleware, allowRoles("admin", "teacher"), updateCourse);
courseRouter.put("/:id", authMiddleware, allowRoles("admin", "teacher"), deleteCourse);

module.exports=courseRouter