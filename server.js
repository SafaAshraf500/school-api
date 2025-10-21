
require("dotenv").config(); 
const express = require("express");
const cookieParser = require("cookie-parser");
const dbConnection = require("./database/dbConnections.js");
const globalError = require("./src/middleware/errorHander.js");
const userRoutes = require("./src/modules/user/userRoutes");

const authRoutes = require("./src/modules/auth/authRoutes.js");
const studentRouter = require("./src/modules/student/student.routes.js");
const teacherRouter = require("./src/modules/teacher/teacher.routes.js");
const courseRouter = require("./src/modules/course/course.routes.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser()); 

dbConnection();


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/coursers", courseRouter);

app.use(globalError);

app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});
