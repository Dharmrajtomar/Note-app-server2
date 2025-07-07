const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendOtp = require("../utils/sendOtp");

exports.sendOtp = async (req, res) => {
  try {
    const { name, dob, email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, dob, email, otp });
    } else {
      user.otp = otp;
      await user.save();
    }

    await sendOtp(email, otp);
    res.json({ msg: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to send OTP" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    user.isVerified = true;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "OTP verification failed" });
  }
};
