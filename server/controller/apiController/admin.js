const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Appointment = require("../../model/appointments");
const Hospital = require("../../model/hospital");
const User = require("../../model/user");
const Donor = require("../../model/donor");
const { sendResponse } = require("../../utils/sendResponse");

exports.getOverview=catchAsyncErrors(async(req,res,next)=>{
    const totalUsers=(await User.find()).length
    const totalHospitals=(await Hospital.find()).length
    const totalDonors=(await Donor.find()).length
    const totalAppointments=(await Appointment.find()).length
    const totalPendingAppointments=(await Appointment.find({status:"pending"})).length
    const totalSuccessfulAppointments=(await Appointment.find({status:"accepted"})).length
    const totalRejectedAppointments=(await Appointment.find({status:"rejected"})).length
    const overview={totalAppointments,totalDonors,totalHospitals,totalUsers,totalPendingAppointments,totalSuccessfulAppointments,totalRejectedAppointments}
    sendResponse(res,200,overview)
})