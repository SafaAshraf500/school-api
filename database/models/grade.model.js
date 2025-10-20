const { models } = require("mongoose")


const gradeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Types.objectId,ref:'Student'
    },
    course: {
            type: mongoose.Types.objectId,
            ref: 'Course'
    },
    assignmentName: String,
    score: Number,
    maxScore: Number,
        givenBy: {
        type: mongoose.Types.objectId,ref:'teacher'
    }
}, { timestamps: true })


const gradeModel = mongoose.model('grade', gradeSchema)

models.export =gradeModel