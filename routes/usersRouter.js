const express = require("express")
const userModel = require("../models/user-model")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {generateToken} = require("../utils/generateTokens")
const {signupUser,loginUser,logoutUser} = require("../controllers/authController")


router.get("/" , (req,res)=>{
    res.send("Hey it's working")
})

router.post("/signup" , signupUser )

router.post("/login" , loginUser)

router.get("/logout" , logoutUser)


module.exports = router;