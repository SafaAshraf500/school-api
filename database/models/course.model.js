const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: String,
    code: { type: String, unique: true },
    description: String,
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: "teacher",
    },
    maxStudents :Number
}, { timestamps: true })


const courseModel = mongoose.model('course', courseSchema)

module.exports = courseModel