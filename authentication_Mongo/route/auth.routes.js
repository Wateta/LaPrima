const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  testEmail,
  verifyEmail,
} = require("../controller/auth.controller");

const { signupValidation, loginValidation } = require("../middleware/auth.middleware");

router.post("/test-email", testEmail);
router.post("/signup", signupValidation, signup);
router.post("/verify-email", verifyEmail);
router.post("/login", loginValidation, login);
router.post("/logout", logout);
module.exports = router;