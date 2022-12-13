const express=require("express")
const { showHospitalDashboardOverview, showHospitalDashboardRequestedAppointments,showHospitalDashboardAcceptedAppointments,showHospitalDashboardRejectedAppointments, updateAppointmentStatusAction } = require("../../../controller/renderController/dashboard/hospitalDashboard")

const { isAuthenticatedUser, authorizeRoles, isDonorUserOnly, isAuthorizedUser, } =require("../../../middleware/auth")
const router=express.Router()


//DONOR DASHBOARD ROUTES

router.route("/").get(showHospitalDashboardOverview)
router.route("/appointments/:userId/all").get(showHospitalDashboardRequestedAppointments)
router.route("/appointments/accepted/:userId/all").get(showHospitalDashboardAcceptedAppointments)
router.route("/appointments/rejected/:userId/all").get(showHospitalDashboardRejectedAppointments)
router.route("/appointments/:appointmentId/me/:userId/status/accepted").get(updateAppointmentStatusAction)
router.route("/appointments/:appointmentId/me/:userId/status/rejected").get(updateAppointmentStatusAction)
// router.route("/appointments/:appointmentId/me/:userId/status/rejected").get(updateAppointmentStatusAction)
// router.route("/appointments/:appointmentId/me/:userId/status/rejected").get(updateAppointmentStatusAction)
// router.route("/appointments/:appointmentId/me/:userId/status/rejected").get(updateAppointmentStatusAction)
module.exports=router;
