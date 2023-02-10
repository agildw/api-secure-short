const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth");
const roles = require("../models/user.model").ROLES;
/* GET users listing. */
router.get("/", [verifyToken(roles.ADMIN)], userController.getAllUser);

router.post("/register", userController.createUser);

router.post(
  "/register/admin",
  [verifyToken(roles.ADMIN)],
  userController.createAdmin
);

module.exports = router;
