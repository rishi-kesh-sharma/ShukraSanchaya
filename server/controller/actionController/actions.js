const { registerUser, loginUser, logoutUser, registerDonor, createAppointment,createContact,updateProfile,updateUserPassword } = require("../../../apiCalls/authApiCalls");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const redirectTopages=require("../../utils/redirectToPages");

 exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const response= await registerUser(req)
    res.apiResponse=response;
    redirectTopages(res)
})  

exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const response=await loginUser(req)
    res.apiResponse=response;
    redirectTopages(res)
})

exports.logoutUser=catchAsyncErrors(async(req,res,next)=>{
    const response=await logoutUser(req)
    res.apiResponse=response;
    redirectTopages(res)
})
exports.registerDonor=catchAsyncErrors(async(req,res,next)=>{
    const response=await registerDonor(req)
    res.apiResponse=response;
    redirectTopages(res)
})

exports.createAppointment=catchAsyncErrors(async(req,res,next)=>{
    const response=await createAppointment(req)
    res.apiResponse=response;
    redirectTopages(res)
})

exports.createContact=catchAsyncErrors(async(req,res,next)=>{
    const response=await createContact(req)
    res.apiResponse=response;
    redirectTopages(res)
})
exports.updateProfile=catchAsyncErrors(async(req,res,next)=>{
    const response=await updateProfile(req)
    res.apiResponse=response;
    redirectTopages(res)
})
exports.updateUserPassword=catchAsyncErrors(async(req,res,next)=>{
    const response=await updateUserPassword(req)
    res.apiResponse=response;
    redirectTopages(res)
})