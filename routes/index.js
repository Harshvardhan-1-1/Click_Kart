const express = require("express")
const isLoggenin = require("../middleware/isLoggenin")
const productModel = require("../models/product-model")
const userModel = require("../models/user-model")
const router = express.Router()

router.get("/" , (req,res)=>{
    res.cookie("token" , "")
    let error = req.flash("error")
    res.render("index",{error})
})

router.get("/login" ,(req,res)=>{
    let error = req.flash("error")
    res.render("login" , {error})
})


router.get("/shop",isLoggenin,async (req,res)=>{
    let products = await productModel.find()
    let done = req.flash("done")
    res.render("shop" , {products , done})
})

router.get("/cart",isLoggenin,async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email}).populate("cart")
    res.render("cart" , {user})
})

router.get("/addtocart/:id",isLoggenin,async (req,res)=>{
    let user = await userModel.findOne({email : req.user.email})
    user.cart.push(req.params.id)
    await user.save()
    req.flash("done" ,"Successfully added to cart")
    res.redirect("/shop")
})

router.get("/remove/:id" ,isLoggenin, async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email})
    await userModel.findOneAndUpdate({_id:user._id} , {$pull : {cart:req.params.id}} )
    res.redirect("/cart")
})

router.get("/contactus" , (req,res)=>{
    res.render("contact")
})


module.exports = router ;