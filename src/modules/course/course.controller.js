const courseModel = require("../../../database/models/course.model.js");



const addCourse = async (req, res, next) => {
    try {
        const course = await courseModel.create(req.body);
        res.status(201).json({ message: "success", course });
    } catch (err) {
    next(err);
    }
}

const getAllCourses = async (req, res, next) => {
    try {
    const courses = await courseModel.find().populate("teacher")
    res.status(200).json({ message: "success", courses })
    } catch (err) {
    next(err);
    }
}

const getCourseById = async (req, res, next) => {
    try {
    const course = await courseModel.findById(req.params.id).populate("teacher");
    if (!course) {
        return res.status(404).json({ message: "course not found" });
    }
    res.status(200).json({ message: "success", course });
    } catch (err) {
    next(err);
    }
};


const updateCourse = async (req, res, next) => {
    try {
    const course = await courseModel.findById(req.params.id);

    if (!course) {
        return res.status(404).json({ message: "course not found" });
    }

    if (req.user.role === "teacher" && course.teacher.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access denied: not your course" });
    }

    const updatedCourse = await courseModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json({ message: "success", course: updatedCourse });
    } catch (err) {
    next(err);
    }
}


const deleteCourse = async (req, res, next) => {
    try {
    const course = await courseModel.findById(req.params.id);
    if (!course) {
        return res.status(404).json({ message: "course not found" });
    }
    if (req.user.role === "teacher" && course.teacher.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access denied: not your course" });
    }
    await courseModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "course deleted successfully" });
    } catch (err) {
    next(err);
    }
};

module.exports={addCourse,getAllCourses,getCourseById,updateCourse,deleteCourse}