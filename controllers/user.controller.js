const userService = require("../services/user.service");
const roles = require("../models/user.model").ROLES;

exports.createUser = async (req, res, next) => {
  try {
    if (
      !req.body.username ||
      !req.body.password ||
      !req.body.email ||
      !req.body.fullName
    ) {
      throw new Error("missing required fields");
    }
    await userService.createUser(
      req.body.username,
      req.body.password,
      req.body.email,
      req.body.fullName,
      roles.USER
    );
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    if (error.message.includes("duplicate key")) {
      error.message = "Username or email already exists";
      error.status = 409;
      return next(error);
    }
    if (error.message.includes("missing required fields")) {
      error.status = 400;
      return next(error);
    }
    console.error(error);
    return next(error);
  }
};

exports.createAdmin = async (req, res, next) => {
  try {
    if (
      !req.body.username ||
      !req.body.password ||
      !req.body.email ||
      !req.body.fullName
    ) {
      throw new Error("missing required fields");
    }
    await userService.createUser(
      req.body.username,
      req.body.password,
      req.body.email,
      req.body.fullName,
      roles.ADMIN
    );
    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    if (error.message.includes("duplicate key")) {
      error.message = "Username or email already exists";
      error.status = 409;
      return next(error);
    }
    if (error.message.includes("missing required fields")) {
      error.status = 400;
      return next(error);
    }
    console.error(error);
    return next(error);
  }
};
exports.getAllUser = async (req, res, next) => {
  try {
    const users = await userService.getAllUser();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
