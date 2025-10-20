


const mongoose = require('mongoose');
const dbConnection = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/school').then(() => {
    console.log("db connected");
}).catch((err) => {
    console.log("db failed",err)
})
}
module.exports= dbConnection