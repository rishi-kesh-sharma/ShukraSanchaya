const express=require("express")
const { showDonorDashboardMyAppointments, showDonorDashboardDeleteAccountConfirmationForm,showDonorDashboardOverview, deleteAccountAction,showDeleteDonorAccountConfirmationForm, deleteDonorAccountAction } = require("../../../controller/renderController/dashboard/donorDashboard")
const { isAuthenticatedUser, authorizeRoles, isDonorUserOnly, isAuthorizedUser, } =require("../../../middleware/auth")
const router=express.Router()


//DONOR DASHBOARD ROUTES

router.route("/").get(showDonorDashboardOverview)
router.route("/appointments/all").get(showDonorDashboardMyAppointments)
router.route("/confirmDelete").get(showDonorDashboardDeleteAccountConfirmationForm)
router.route("/action/:userId").delete(isAuthorizedUser,deleteAccountAction)
router.route("/confirmDelete/donorAccount").get(showDeleteDonorAccountConfirmationForm)
router.route("/action/donorAccount/:userId").delete(isAuthorizedUser,deleteDonorAccountAction)
module.exports=router;
