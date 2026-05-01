import express from "express";
const router = express.Router();

import {
  signup,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  logout,
  testEmail
} from "../controller/auth.controller.js";

import { signupValidation, loginValidation } from "../middleware/auth.middleware.js";

router.post("/test-email", testEmail);
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", logout);

export default router;