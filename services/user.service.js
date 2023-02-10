const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.createUser = async (
  username,
  password,
  email,
  fullName,
  role = "user"
) => {
  const saltRounds = 10;
  const user = new UserModel({
    username: username,
    password: await bcrypt.hashSync(password, saltRounds),
    email: email,
    fullName: fullName,
    role: role,
  });
  return user.save();
};

exports.getAllUser = async () => {
  return UserModel.find();
};

exports.getUser = async (username) => {
  return UserModel.findOne({ username: username }).then((user) => {
    if (user) {
      return {
        _id: user?._id,
        username: user?.username,
        email: user?.email,
        fullName: user?.fullName,
        role: user?.role,
        password: user?.password,
      };
    }
  });
};

exports.comparePassword = async (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
