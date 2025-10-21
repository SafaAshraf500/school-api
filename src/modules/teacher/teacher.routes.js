const express = require('express')
const { authMiddleware } = require('../../middleware/authMiddleware.js')
const { addTeacher, getTeachers, getTeacherById, updateTeacher, deleteTeacher } = require('./teacher.controller.js')
const allowRoles = require('../../middleware/roles.js')

const teacherRouter = express.Router()


teacherRouter.post(
    '/',
    authMiddleware,
    allowRoles('admin'),
    addTeacher
)

teacherRouter.get(
    '/',
    authMiddleware,
    allowRoles('admin'),
    getTeachers
)

teacherRouter.get(
    '/:id',
    authMiddleware,
    allowRoles('admin'),
    getTeacherById
)
teacherRouter.put(
    '/:id',
    authMiddleware,
    allowRoles('admin'),
    updateTeacher
)
teacherRouter.delete(
    '/:id',
    authMiddleware,
    allowRoles('admin'),
    deleteTeacher
)


module.exports=teacherRouter