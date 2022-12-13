const express=require("express")
const { showClientDashboardMyAppointments, showClientDashboardDeleteAccountConfirmationForm,showClientDashboardOverview, deleteAccountAction } = require("../../../controller/renderController/dashboard/clientDashboard")
const { isAuthenticatedUser, authorizeRoles, isClientUserOnly, isAuthorizedUser, } =require("../../../middleware/auth")
const router=express.Router()


//ADMIN DASHBOARD ROUTES

router.route("/").get(showClientDashboardOverview)
router.route("/appointments/all").get(showClientDashboardMyAppointments)
router.route("/confirmDelete").get(showClientDashboardDeleteAccountConfirmationForm)
router.route("/action/:userId").delete(isAuthorizedUser,deleteAccountAction)
module.exports=router;
