const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    dob: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    googleId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
