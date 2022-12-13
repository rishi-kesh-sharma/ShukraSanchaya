const {  authorizeRoles, isClientUserOnly, isAuthorizedUser } = require("../../middleware/auth")
const User = require("../../model/user")
const Donor=require("../../model/donor")
const { registerDonor,getAllDonor,updateDonor,getSingleDonor,deleteDonor } = require("../../controller/apiController/donor")

const Router=require("express").Router()

// for all

// for admin
Router.route("/admin/all/").get(authorizeRoles("admin"),getAllDonor);
Router.route("/admin/:userId").get(authorizeRoles("admin"),getSingleDonor)
Router.route("/admin/:userId").put(authorizeRoles("admin"),updateDonor)
Router.route("/admin/:userId").delete(authorizeRoles("admin"),deleteDonor)

// for donor authorized user
Router.route("/me/:userId").get(authorizeRoles("donor"),isAuthorizedUser,getSingleDonor)
Router.route("/me/:userId").put(authorizeRoles("donor"),isAuthorizedUser,updateDonor)
Router.route("/me/:userId").delete(authorizeRoles("donor"),isAuthorizedUser,deleteDonor)

// for only user
Router.route("/register").post(isClientUserOnly,registerDonor)

module.exports=Router;
