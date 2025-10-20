const mongoose= require("mongoose")


const courseSchema = new mongoose.Schema({
    title: string,
    code: { type: string, unique: true },
    description: string,
    teacher: {
        type: mongoose.Types.objectId,ref:'teacher'
    },
    maxStudents :Number
}, { timestamps: true })


const courseModel = mongoose.model('course', courseSchema)

module.exports =courseModel