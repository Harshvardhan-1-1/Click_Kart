require("dotenv").config()
const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const path = require("path")
const db = require("./config/mongoose-connection")
const expressSession = require("express-session")
const flash = require("connect-flash")


const index = require("./routes/index")
const ownersRouter = require("./routes/ownersRouter")
const productsRouter = require("./routes/productsRouter")
const usersRouter = require("./routes/usersRouter")
const { config } = require("dotenv")


app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret : process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())
app.set("view engine" , "ejs")


app.use("/" , index)
app.use('/owner' , ownersRouter)
app.use("/products" , productsRouter)
app.use("/users" , usersRouter)

app.listen(3000)