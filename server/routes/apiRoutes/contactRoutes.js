const express=require("express");
const {createContact,getAllContact, deleteContact,getSingleContact}=require("../../controller/apiController/contact");
const { authorizeRoles } = require("../../middleware/auth");

const router=express.Router()

// for non-admin users
router.route("/").post(authorizeRoles("client hospital donor"),createContact)

// for admin
router.route("/admin/all").get(authorizeRoles("admin"),getAllContact)
router.route("/admin/:contactId").delete(authorizeRoles("admin"),deleteContact)
router.route("/admin/:contactId").get(authorizeRoles("admin"),getSingleContact)

module.exports=router;