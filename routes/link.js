const express = require("express");
const router = express.Router();
const linkController = require("../controllers/link.controller");
const { verifyToken } = require("../middlewares/auth");
const roles = require("../models/user.model").ROLES;
/* GET users listing. */
router.get(
  "/",
  [verifyToken(roles.USER, roles.ADMIN)],
  linkController.getLinks
);
router.get("/all", [verifyToken(roles.ADMIN)], linkController.getAllLinks);
router.post(
  "/create",
  [verifyToken(roles.USER, roles.ADMIN)],
  linkController.createLink
);
router.get("/:link", linkController.getSpecificLink);
router.delete(
  "/:link",
  [verifyToken(roles.USER, roles.ADMIN)],
  linkController.deleteLink
);

module.exports = router;
