const express=require("express")
const { isAuthenticatedUser, isNotAuthenticatedUser, authorizeRoles } = require("../../../middleware/auth")
const { showHomePage,showRegisterPage,showLoginPage,showContactPage,showAboutPage,showProfilePage, showAppointmentPage, showDonorRegistrationPage, logoutUser } = require("../../../controller/renderController/general/render")
const router=express.Router()

//routes for server side rendering/get routes


router.route("/").get(isAuthenticatedUser, showHomePage)
router.route("/register").get(isNotAuthenticatedUser, showRegisterPage)
router.route("/login").get(isNotAuthenticatedUser,showLoginPage)
router.route("/logout").get(isAuthenticatedUser,logoutUser)
router.route("/contact").get(isAuthenticatedUser,authorizeRoles("user donor"), showContactPage)
router.route("/about").get(isAuthenticatedUser, showAboutPage)
router.route("/appointment").get(isAuthenticatedUser,authorizeRoles("user donor"), showAppointmentPage)
router.route("/profile").get(isAuthenticatedUser,  showProfilePage)
router.route("/donor/register").get(isAuthenticatedUser,authorizeRoles("user"),showDonorRegistrationPage)

module.exports=router

