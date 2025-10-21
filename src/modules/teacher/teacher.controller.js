const bcrypt = require('bcryptjs');
const teacherModel = require('../../../database/models/teacher.model.js');


const addTeacher = async (req, res, next) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const teacher = await teacherModel.create(req.body);
        res.status(201).json({ success: true, message: "Teacher created", data: teacher });
    } catch (err) {
        next(err);
    }
};
const getTeachers = async (req, res, next) => {
    try {
        const teachers = await teacherModel.find().populate('user', 'name email role');
        res.json({ success: true, data: teachers });
    } catch (err) {
        next(err);
    }
};
const getTeacherById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const teacher = await teacherModel.findById(id).populate('user', 'name email role');

        if (!teacher) {
            const err = new Error('Teacher not found');
            err.statusCode = 404;
            return next(err);
        }

        res.json({ success: true, data: teacher });
    } catch (err) {
        next(err);
    }
};


const updateTeacher = async (req, res, next) => {
    try {
    const teacher = await teacherModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) {
        return res.status(404).json({ message: "teacher not found" });
    }
    res.status(200).json({ message: "success", teacher });
    } catch (err) {
    next(err);
    }
};

const deleteTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedTeacher = await teacherModel.findByIdAndDelete(id);

        if (!deletedTeacher) {
            const err = new Error('Teacher not found');
            err.statusCode = 404;
            return next(err);
        }

        res.json({ success: true, message: "Teacher deleted successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = { addTeacher, getTeachers, getTeacherById, updateTeacher, deleteTeacher };
