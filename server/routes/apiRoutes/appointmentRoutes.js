const express=require("express");
const {  authorizeRoles, isAuthorizedUser, isAuthenticatedUser } = require("../../middleware/auth");
const {getAllAppointments,createAppointment,getAppointment,updateAppointment,deleteAppointment,updateAppointmentStatus,getHospitalAllRequestedAppointment,getHospitalAllAcceptedAppointment,getHospitalAllRejectedAppointment,getUsersAllAppointments}=require("../../controller/apiController/appointment")
const router=express.Router()

// for admin
router.route("/admin/all").get(authorizeRoles("admin"),getAllAppointments);
router.route("/admin/:appointmentId").get(authorizeRoles("admin"),getAppointment)
router.route("/admin/:appointmentId").put(authorizeRoles("admin"),updateAppointment)
router.route("/admin/:appointmentId").delete(authorizeRoles("admin",),deleteAppointment)



// for authorized client and donor
router.route("/me/:userId/:appointmentId").get(isAuthenticatedUser,authorizeRoles("client donor"),isAuthorizedUser,getAppointment);
router.route("/me/:userId/:appointmentId").put(isAuthenticatedUser,authorizeRoles("client donor"),isAuthorizedUser,updateAppointment)
router.route("/me/:userId/:appointmentId").delete(isAuthenticatedUser,authorizeRoles("client donor"),isAuthorizedUser,deleteAppointment)
router.route("/").post(isAuthenticatedUser,authorizeRoles("client donor"),createAppointment)
router.route("/me/all").get(isAuthenticatedUser,getUsersAllAppointments)

// for requested hospital
router.route("/hospital/me/:userId/all").get(isAuthenticatedUser,authorizeRoles("hospital"),getHospitalAllRequestedAppointment)
router.route("/accepted/hospital/me/:userId/all").get(isAuthenticatedUser,authorizeRoles("hospital"),getHospitalAllAcceptedAppointment)
router.route("/rejected/hospital/me/:userId/all").get(isAuthenticatedUser,authorizeRoles("hospital"),getHospitalAllRejectedAppointment)
router.route("/hospital/me/:userId/:appointmentId").put(isAuthenticatedUser,authorizeRoles("hospital"),isAuthorizedUser,updateAppointmentStatus)
router.route("/hospital/me/:userId/:appointmentId").put(isAuthenticatedUser,authorizeRoles("hospital"),isAuthorizedUser,updateAppointmentStatus)



// for a client






module.exports=router
