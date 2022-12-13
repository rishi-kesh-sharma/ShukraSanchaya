

const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Appointment = require("../../model/appointments");
const Donor=require("../../model/donor")
const User=require("../../model/user")
const ApiFeatures = require("../../utils/apiFeatures");

const {sendResponse}=require("../../utils/sendResponse")

// REGISTER AS DONOR
exports.registerDonor=catchAsyncErrors( async(req,res,next)=>{
    const donor=new Donor({user:req.user._id,...req.body})

    await donor.save()
    sendResponse(res,200,{success:true,message:"donor registered successfully"})
})


// GET ALL DONORS
exports.getAllDonor=catchAsyncErrors(async(req,res,next)=>{

    const resultPerPage=11;
    let apiFeature1= new ApiFeatures(User.where({role:["user client donor"]}),req.query).search()
    let allDonors=await apiFeature1.query
    const totalDonors=allDonors.length
    
     const  apiFeature2= new ApiFeatures(User.where({role:["user", "client" ,"donor"]}),req.query).search().pagination(resultPerPage)
     let donors=await apiFeature2.query;


    const isNext=  parseInt(req.query.page)*resultPerPage < totalDonors  &&  totalDonors > resultPerPage
   sendResponse(res,200,{success:true,donors,next:isNext,prev: apiFeature2.prev,skip:apiFeature2.skip})

})



// GET SINGLE DONOR
exports.getSingleDonor=catchAsyncErrors(async(req,res,next)=>{
  
    const donor=await Donor.findOne({user:req.params.userId}).populate("user")

    sendResponse(res,200,{success:true,donor})

})

// UPDATE DONOR
exports.updateDonor=catchAsyncErrors(async(req,res,next)=>{
      const donor=await Donor.findOne({user:req.params.userId})
     let  donor_doc={...donor._doc,...req.body}
     donor._doc=donor_doc;
     const savedDonor= await donor.save()
     console.log(savedDonor)
     sendResponse(res,200,{success:true,message:"donor updated successfully!!!",savedDonor})
})


// DELETE DONOR
exports.deleteDonor=catchAsyncErrors(async(req,res,next)=>{
    const donor=await Donor.findOne({user:req.params.userId})

    await donor.remove()
    sendResponse(res,200,{success:true,message:"donor deleted successfully"})

})