const express = require("express");
const { sendOtp, verifyOtp } = require("../controllers/authController");
const router = express.Router();

// OTP based auth
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

const { getMe } = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

router.get("/me", authMiddleware, getMe);

module.exports = router;

const passport = require("passport");

// Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback from Google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/signin",
  }),
  (req, res) => {
    // Send token back as URL
    res.redirect(
      `http://localhost:3000/google-success?token=${req.user.token}`
    );
  }
);
