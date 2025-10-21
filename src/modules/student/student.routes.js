const express = require('express')
const { addStudent, getStudent, getStudentById, updateStudent, deleteStudent } = require('./student.controller.js')
const allowRoles = require('../../middleware/roles.js');
const { authMiddleware } = require('../../middleware/authMiddleware.js');

const studentRouter = express.Router()


studentRouter.post(
    '/',
    authMiddleware,
    allowRoles('admin'),
    addStudent
)

studentRouter.get(
    '/',
    authMiddleware,
    allowRoles('admin', 'teacher'),
    getStudent
)

studentRouter.get(
    '/:id',
    authMiddleware,
    allowRoles('admin', 'teacher'),
    getStudentById
)
studentRouter.put(
    '/:id',
    authMiddleware,
    allowRoles('admin'),
    updateStudent
)
studentRouter.delete(
    '/:id',
    authMiddleware,
    allowRoles('admin'),
    deleteStudent
)









module.exports=studentRouter