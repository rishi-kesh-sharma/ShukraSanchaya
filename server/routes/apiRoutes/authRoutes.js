const express=require("express")
const {registerUser,loginUser,logout}=require("../../controller/apiController/auth")
const router=express.Router()
const {isAuthenticatedUser}=require("../../middleware/auth")
// for all
router.route("/register").post(registerUser)

//for registered users 
router.route("/login").post(loginUser)

// for logged in user
router.route("/logout").get(isAuthenticatedUser,logout)

module.exports=router;