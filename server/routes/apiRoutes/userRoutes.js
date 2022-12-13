const express = require("express");
const router = express.Router();

const {
  updateUserPassword,
  getSingleUser,
  getAllUser,
  updateUserRole,
  deleteUser,
  updateUser,
} = require("../../controller/apiController/user");
const {
  authorizeRoles,
  isAuthorizedUser,
} = require("../../middleware/auth.js");

// for all

// for admin
router.route("/admin/all").get(authorizeRoles("admin"), getAllUser);

router.route("/admin/:userId").get(authorizeRoles("admin"), getSingleUser);
router.route("/admin/:userId").put(authorizeRoles("admin"), updateUser);
router
  .route("/admin/role/:userId")
  .put(authorizeRoles("admin"), updateUserRole);
router.route("/admin/:userId").delete(authorizeRoles("admin"), deleteUser);

// for authrorized user
router.route("/me/password").put(updateUserPassword);
router.route("/me/:userId").get(isAuthorizedUser, getSingleUser);
router.route("/me/:userId").put(isAuthorizedUser, updateUser);
router.route("/me/:userId").delete(isAuthorizedUser, deleteUser);

module.exports = router;
