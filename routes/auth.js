const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/* GET users listing. */
router.post("/", authController.login);

module.exports = router;
