const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Appointment = require("../../model/appointments");
const ApiFeatures = require("../../utils/apiFeatures");
const {sendResponse}=require("../../utils/sendResponse")


// CREATE APPOINTMENT
exports.createAppointment=catchAsyncErrors(async(req,res,next)=>{
    const appointment=await Appointment.create({...req.body,createdBy:req.user.id,createdAt:Date.now()});
      await appointment.save();
     sendResponse(res,200,{success:true,message:"appointment created successfully!!!"})

})


// GET ALL APPOINTMENTS
exports.getAllAppointments=catchAsyncErrors(async(req,res,next)=>{
   // const allAppointments=await Appointment.find().

   const resultPerPage=4;
   let apiFeature1= new ApiFeatures(Appointment.find().populate(["createdBy","appointmentFor"]),req.query).search()
   let allAppointments=await apiFeature1.query
   const totalAppointments=allAppointments.length

  const  apiFeature2= new ApiFeatures(Appointment.find().populate(["createdBy","appointmentFor"]),req.query).search().pagination(resultPerPage)
     let appointments=await apiFeature2.query;


   const isNext=  parseInt(req.query.page)*resultPerPage < totalAppointments  &&  totalAppointments > resultPerPage
  sendResponse(res,200,{success:true,appointments,next:isNext,prev: apiFeature2.prev,skip:apiFeature2.skip})
})

// GET HOSPITAL ALL REQUESTED APPOINTMENTS

exports.getHospitalAllRequestedAppointment=catchAsyncErrors(async(req,res,next)=>{
   const appointments=await Appointment.find({appointmentFor:req.params.userId,status:"pending"}).populate("createdBy");
   sendResponse(res,200,{success:true,appointments})
})
// GET HOSPITAL ALL ACCEPTED APPOINTMENTS

exports.getHospitalAllAcceptedAppointment=catchAsyncErrors(async(req,res,next)=>{
   const appointments=await Appointment.find({appointmentFor:req.params.userId,status:"accepted"}).populate("createdBy");
   sendResponse(res,200,{success:true,appointments})
})
// GET HOSPITAL ALL REJECTED APPOINTMENTS

exports.getHospitalAllRejectedAppointment=catchAsyncErrors(async(req,res,next)=>{
   const appointments=await Appointment.find({appointmentFor:req.params.userId,status:"rejected"}).populate("createdBy");
   sendResponse(res,200,{success:true,appointments})
})

// GET APPOINTMENT
exports.getAppointment=catchAsyncErrors(async(req,res,next)=>{
   const appointment=await Appointment.findById(req.params.appointmentId).populate(["createdBy","appointmentFor"])
   sendResponse(res,200,{success:true,appointment})
})

//  UPDATE APPOINTMENT
exports.updateAppointment=catchAsyncErrors(async(req,res,next)=>{
   await Appointment.findByIdAndUpdate(req.params.appointmentId,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
})
sendResponse(res,200,{success:true,message:"appointment  updated successfully"})
})


// DELETE APPOINTMENT
exports.deleteAppointment=catchAsyncErrors(async(req,res,next)=>{
 const appointment=  await Appointment.findById(req.params.appointmentId)
     await appointment.remove()
   sendResponse(res,200,{success:true,message:"appointment deleted successfully"})
})


// UPDATE APPOINTMENT STATUS
exports.updateAppointmentStatus=catchAsyncErrors(async(req,res,next)=>{
   await Appointment.findByIdAndUpdate(req.params.appointmentId,
   {
   $set:req.body,
   new:true,
   runValidators:true,
   useFindAndModify:false
})
sendResponse(res,200,{success:true,message:"appointment status updated successfully"})
})


exports.getUsersAllAppointments=catchAsyncErrors(async(req,res,next)=>{
   const appointments=await Appointment.find({createdBy:req.user._id}).populate("appointmentFor")
   sendResponse(res,200,appointments)
})

   