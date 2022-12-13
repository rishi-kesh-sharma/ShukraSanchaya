const express=require("express");
const { registerUser,loginUser, logoutUser, registerDonor, createAppointment,createContact,updateProfile ,updateUserPassword} = require("../../controller/actionController/actions");
const router=express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logoutUser)
router.post("/donor/register",registerDonor)
router.post("/appointment",createAppointment)
router.post("/contact",createContact)
router.put("/profile/password/me",updateUserPassword)
router.put("/profile/:userId",updateProfile)

module.exports=router;