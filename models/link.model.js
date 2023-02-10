const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  link: { type: String, required: true, unique: true },
  destination: { type: String, required: true },
  isProtected: { type: Boolean, default: false },
  password: { type: String, default: null },
  visits: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});
module.exports = mongoose.model("link", linkSchema);
