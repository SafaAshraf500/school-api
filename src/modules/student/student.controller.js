const studentModel = require("../../../database/models/student.model.js")
const jwt = require('jsonwebtoken')


const addStudent = async (req, res,next) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const student = await studentModel.create(req.body);
        res.status(201).json({message:"success",student});
    } catch (err) {
        next(err);
    }
}

const getStudent = async (req, res, next) => {
    try {
        const students = await studentModel.find().populate('user', 'name email role');
        res.json({
            success: true,
            data: students
        });
    } catch (err) {
        next(err);
    }
}

const getStudentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const student = await studentModel.findById(id).populate('user', 'name email role');

        if (!student) {
            const err = new Error('Student not found');
            err.statusCode = 404;
            return next(err);
        }

        res.json({
            success: true,
            data: student
        });
    } catch (err) {
        next(err);
    }
}


const updateStudent =  async(req,res,next)=>{
    let student = await studentModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !student || res.json({message:'success', student})
}

const deleteStudent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedStudent = await studentModel.findByIdAndDelete(id);

        if (!deletedStudent) {
            const err = new Error('Student not found');
            err.statusCode = 404;
            return next(err);
        }

        res.json({
            success: true,
            message: "Student deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { addStudent, getStudent, getStudentById, updateStudent, deleteStudent };


