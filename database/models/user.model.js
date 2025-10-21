

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type: String,
        enum: ['admin', 'teacher', 'student'],
        default:'student'
    },
    profilePic:String
}, { timestamps: true })


const userModel = mongoose.model('user', userSchema)

module.exports =userModel
