const LinkModel = require("../models/link.model");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.createLink = async (
  linkUrl,
  destination,
  isProtected,
  password,
  user
) => {
  const saltRounds = 10;
  const link = new LinkModel({
    link: linkUrl,
    destination: destination,
    isProtected: isProtected,
    // password: password ? await bcrypt.hash(password, saltRounds) : null,
    password: password ? password : null,
    user: user,
  });
  return link.save();
};

exports.getAllLinks = async () => {
  return LinkModel.find();
};

exports.getLinks = async (userId) => {
  return LinkModel.find({ user: userId });
  // return UserModel.findById(userId)
  //   .populate("links")
  //   .then((user) => {
  //     return {
  //       link: link.link,
  //       destination: link.destination,
  //       isProtected: link.isProtected,
  //       password: link.password,
  //       user: link.user,
  //     };
  //   });
};

exports.addLinkToUser = async (userId, linkId) => {
  return UserModel.findByIdAndUpdate(
    userId,
    { $push: { links: linkId } },
    { new: true }
  );
};

exports.getOneLink = async (linkName) => {
  return LinkModel.findOne({ link: linkName });
};

exports.addVisit = async (linkId) => {
  return LinkModel.findByIdAndUpdate(
    linkId,
    { $inc: { visits: 1 } },
    { new: true }
  );
};

exports.deleteLink = async (linkId) => {
  return LinkModel.findByIdAndDelete(linkId);
};
