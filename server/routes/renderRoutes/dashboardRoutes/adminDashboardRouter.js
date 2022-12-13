const express=require("express")
const { isAuthenticatedUser, authorizeRoles, } =require("../../../middleware/auth")
const { showAdminDashBoardOverview, showAdminDashBoardAllUser, showAdminDashBoardAllAppointments,showAdminDashBoardAllHospitals,showAdminDashBoardAllDonors,showAdminDashBoardAllContacts,showAdminDashBoardRegisterHospital, processRegisterHospitalForm } = require("../../../controller/renderController/dashboard/adminDashboard");
const router=express.Router()


//ADMIN DASHBOARD ROUTES

router.route("/").get(authorizeRoles("admin"), showAdminDashBoardOverview)
router.route("/users/all").get(authorizeRoles("admin"),showAdminDashBoardAllUser)
router.route("/appointments/all").get(authorizeRoles("admin"),showAdminDashBoardAllAppointments)
router.route("/hospitals/all").get(authorizeRoles("admin"),showAdminDashBoardAllHospitals)
router.route("/donors/all").get(authorizeRoles("admin"),showAdminDashBoardAllDonors)
router.route("/contacts/all").get(authorizeRoles("admin"),showAdminDashBoardAllContacts)
router.route("/hospital/register").get(authorizeRoles("admin"),showAdminDashBoardRegisterHospital)
router.route("/action/hospital").post(authorizeRoles("admin"),processRegisterHospitalForm)


module.exports=router;
