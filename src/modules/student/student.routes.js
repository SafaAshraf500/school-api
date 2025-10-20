const express = require('express')
const { addStudent, getStudent, getStudentById, updateStudent, deleteStudent } = require('./student.controller.js')
const allowRoles = require('../../middleware/roles.js');
const { authMiddleware } = require('../../middleware/authMiddleware.js');

const studentRouter = express.Router()


studentRouter.post(
    '/student',
    authMiddleware,
    allowRoles('admin'),
    addStudent
)

studentRouter.get(
    '/student',
    authMiddleware,
    allowRoles('admin', 'teacher'),
    getStudent
)

studentRouter.get(
    '/students/:id',
    authMiddleware,
    allowRoles('admin', 'teacher'),
    getStudentById
)
studentRouter.put(
    '/students/:id',
    authMiddleware,
    allowRoles('admin'),
    updateStudent
)
studentRouter.delete(
    '/students/:id',
    authMiddleware,
    allowRoles('admin'),
    deleteStudent
)









module.exports=studentRouter