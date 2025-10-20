const studentModel = require("../../../database/models/student.model.js")



const addStudent = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const student = await studentModel.create(req.body);
        res.status(201).json({message:"success"});
    } catch (err) {
        next(err);
    }
}

module.exports={addStudent}