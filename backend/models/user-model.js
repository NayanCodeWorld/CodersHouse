const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: false },
    phoneNumber: { type: String, required: true },
    activated: { type: Boolean, required: false, default: false },
    avatar: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema, "CoderHouse");
