const express = require('express')
const { addStudent } = require('./student.controller.js')

const studentRouter = express.Router()

studentRouter.post('/student', addStudent)









module.exports=studentRouter