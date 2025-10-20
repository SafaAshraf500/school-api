const express = require('express')
const dbConnection = require('./database/dbConnections.js')
const globalError = require('./src/middleware/errorHander.js')
const studentRouter = require('./src/modules/student/student.routes.js')
const app = express()
const port = 3000
app.use(express.json())
dbConnection()







app.use('/api/student', studentRouter);

app.use(globalError)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))