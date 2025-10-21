
const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    subject: String,
    Phone:String
}, { timestamps: true })


const teacherModel = mongoose.model('teacher', teacherSchema)

module.exports =teacherModel