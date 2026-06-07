const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const path = require("path")
const db = require("./config/mongoose-connection")

const ownersRouter = require("./routes/ownersRouter")
const productsRouter = require("./routes/productsRouter")
const usersRouter = require("./routes/usersRouter")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())
app.set("view engine" , "ejs")


app.use('/owner' , ownersRouter)
app.use("/products" , productsRouter)
app.use("/users" , usersRouter)

app.listen(3000)