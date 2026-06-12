const express = require("express")
const router = express.Router()
const ownerModel = require("../models/owner-model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

router.get("/admin" , (req,res)=>{
    let success = req.flash("success")
    res.render("createProducts" , {success})
})

if(process.env.NODE_ENV === "development"){

    router.post("/create" , (req,res)=>{
     let {fullname , email , password} = req.body
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password , salt , async (err,hash)=>{
            
      

        let owners = await ownerModel.find()
        if(owners.length > 0){
        return console.log("You don't have permission")
       }

        let createdOwner = await ownerModel.create({
        fullname,
        email,
        password:hash,
       })

       res.send(createdOwner)



    })
        })
    })
}


module.exports = router;