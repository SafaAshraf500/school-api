const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: String,
    code: { type: String, unique: true },
    description: String,
    teacher: {
        type: mongoose.Types.objectId,ref:'teacher'
    },
    maxStudents :Number
}, { timestamps: true })


const courseModel = mongoose.model('course', courseSchema)

module.export =courseModel