const mongoose = require("mongoose");
const enrollmentSchema = new mongoose.Schema({
    
    student: {
        type: mongoose.Types.objectId,ref:'Student'
    },
      course: {
        type: mongoose.Types.objectId,ref:'Course'
    },
    enrolledAt: Date
}, { timestamps: true })


const enrollmentModel = mongoose.model('enrollment', enrollmentSchema)
module.export =enrollmentModel