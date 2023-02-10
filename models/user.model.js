const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  role: { type: String, default: "user" },
  links: [{ type: Schema.Types.ObjectId, ref: "Link" }],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});
module.exports = mongoose.model("User", userSchema);

//export role
module.exports.ROLES = {
  USER: "user",
  ADMIN: "admin",
};
