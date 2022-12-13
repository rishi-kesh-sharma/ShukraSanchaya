const { isAuthenticatedUser, authorizeRoles, isDonor, isAuthorizedUser } = require("../../middleware/auth")

const { registerHospital,getAllHospital,getSingleHospital,deleteHospital,updateHospital } = require("../../controller/apiController/hospital")

const Router=require("express").Router()

// for all users
Router.route("/all").get(isAuthenticatedUser,getAllHospital);

// for admin
Router.route("/admin/register").post(isAuthenticatedUser,authorizeRoles("admin"),registerHospital)
Router.route("/admin/:userId").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleHospital)
Router.route("/admin/:userId").put(isAuthenticatedUser,authorizeRoles("admin"),updateHospital)
Router.route("/admin/:userId").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteHospital)

// for authorized hospital
Router.route("/me/:userId").get(isAuthenticatedUser,isAuthorizedUser,getSingleHospital)
Router.route("/me/:userId").put(isAuthenticatedUser,isAuthorizedUser,updateHospital)
module.exports=Router;


