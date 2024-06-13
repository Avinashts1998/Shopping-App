const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const productRouter = require('./src/routes/products.route')
const userRouter = require('./src/routes/users')
const homeRouter = require("./src/routes/home.route")


const db = require('./config/dbConnection')
const app = express()
dotenv.config({ path: "./config.env" }) // env file configured

global.clientConnection = db.initClientDbConnection() // Db connection enabled by calling

app.set('table', path.join(__dirname, 'table'));
app.set("view engine", "ejs");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/admin/products', productRouter)
app.use('/users', userRouter)
app.use('/home', homeRouter)


app.listen(process.env.PORT, () => {
    console.log(`App listening to the port :` + " " + process.env.PORT)
})