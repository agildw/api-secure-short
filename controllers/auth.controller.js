const userService = require("../services/user.service");
const roles = require("../models/user.model").ROLES;
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");

exports.login = async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    const error = new Error("Username and password are required");
    error.status = 400;
    return next(error);
  }
  try {
    const user = await userService.getUser(req.body.username);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await userService.comparePassword(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Password is invalid");
    }
    const token = jwt.sign(
      { username: user.username, role: user.role },
      config.secret,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    //set token to cookie for client
    res.cookie("token", token, {
      maxAge: 86400 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      message: "login successful",
      token: token,
    });
  } catch (error) {
    if (error.message.includes("user not found")) {
      error.status = 404;
    }
    if (error.message.includes("password is invalid")) {
      error.status = 401;
    }
    next(error);
  }
};
