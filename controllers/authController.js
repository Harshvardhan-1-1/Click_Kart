const express = require("express")
const userModel = require("../models/user-model")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {generateToken} = require("../utils/generateTokens")

module.exports.signupUser = async (req,res)=>{
     try{
        let {fullname,email,password} = req.body

        let user = await userModel.findOne({email})
        
        if(user){
            req.flash("error", "You already have an account");
            return res.redirect("/");
        }

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async (err,hash)=>{
            let user = await userModel.create({
        fullname,
        email,
        password:hash
            })
            let token = generateToken(user)
        res.cookie("token" , token)
        res.redirect("/shop")
        })
        
        
    })
    
    } catch(err){
        console.log(err.message)
    }
}

module.exports.loginUser = async (req,res)=>{
    let {email,password} = req.body
    let user = await userModel.findOne({email})
    if(!user){
        req.flash("error" , "Email or password is wrong")
        return res.redirect("/login")
    }
    
    bcrypt.compare(password , user.password , (err,result)=>{
        if(result){
            let token = generateToken(user)
            res.cookie("token" , token)
            res.redirect("/shop")
        }
        else{
            req.flash("error" , "Email or password is wrong")
            return res.redirect("/login")
        }
    })
}

module.exports.logoutUser = async(req,res)=>{
    res.cookie("token" , "")
    res.redirect("/")
}

