const express = require('express')
const { authMiddleware } = require('../../middleware/authMiddleware.js')
const { addTeacher, getTeachers, getTeacherById, updateTeacher, deleteTeacher } = require('./teacher.controller.js')
const allowRoles = require('../../middleware/roles.js')

const teacherRouter = express.Router()


teacherRouter.post(
    '/student',
    authMiddleware,
    allowRoles('admin'),
    addTeacher
)

teacherRouter.get(
    '/student',
    authMiddleware,
    allowRoles('admin'),
    getTeachers
)

teacherRouter.get(
    '/students/:id',
    authMiddleware,
    allowRoles('admin'),
    getTeacherById
)
teacherRouter.put(
    '/students/:id',
    authMiddleware,
    allowRoles('admin'),
    updateTeacher
)
teacherRouter.delete(
    '/students/:id',
    authMiddleware,
    allowRoles('admin'),
    deleteTeacher
)


module.exports=teacherRouter