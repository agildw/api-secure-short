const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");

const verifyToken = (...role) => {
  return (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.username = decoded.username;
      req.role = decoded.role;

      // if (role && req.role !== role) {
      //   return res.status(403).send({
      //     message: "Require " + role + " Role!",
      //   });
      // }

      if (role.length && !role.includes(req.role)) {
        return res.status(403).send({
          message: "Require " + role + " role!",
        });
      }
      next();
    });
  };
};

module.exports = {
  verifyToken,
};
