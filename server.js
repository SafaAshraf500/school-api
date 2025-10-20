
require("dotenv").config(); 
const express = require("express");
const cookieParser = require("cookie-parser");
const dbConnection = require("./database/dbConnections.js");
const globalError = require("./src/middleware/errorHander.js");
const userRoutes = require("./src/modules/user/userRoutes");

const authRoutes = require("./src/modules/auth/authRoutes.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser()); 

dbConnection();


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(globalError);

app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});
