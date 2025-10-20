const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref:'user'
    },
    dob: Date,
    documents:[String]
}, { timestamps: true })


const studentModel = mongoose.model('student', studentSchema)

module.exports =studentModel