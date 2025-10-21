const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    description: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher', required: true },
    maxStudents: { type: Number, default: 30 }
}, { timestamps: true });

const courseModel = mongoose.model('course', courseSchema);

module.exports = courseModel;
