const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  logout,
  testEmail
} = require("../controllers/auth.controller");

const { signupValidation,loginValidation } = require("../middleware/auth.middleware");

router.post("/test-email", testEmail);
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", logout);
module.exports = router;