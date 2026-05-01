const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const User = require("../model/user.models");
const tokenBlacklist = require("../utils/tokenBlacklist");


const signupValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string()
      .trim()
      .pattern(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$")
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character",
      }),
    field: Joi.string().required(),
    surveyAnswers: Joi.array().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error)
    return res.status(400).json({ message: error.details[0].message });

  const existingUser = await User.findOne({ email: value.email });
  if (existingUser)
    return res.status(400).json({ message: "Email already registered" });

  try {
    const saltRounds = 12;
    value.password = await bcrypt.hash(value.password, saltRounds);
    req.body = value;
    next();
  } catch (err) {
    console.error("Password hashing error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string().trim().min(8).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error)
    return res.status(400).json({ message: error.details[0].message });

  req.body = value;
  next();
};


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id }, // store only ID
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
      issuer: "HerIngress",
      audience: "HerIngress",
    }
  );
};


const logout = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(400).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  tokenBlacklist.add(token);

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  if (tokenBlacklist.has(token))
    return res.status(401).json({ message: "Token expired, please login again" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user)
      return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


const adminOnly = (req, res, next) => {
  if (!req.user)
    return res.status(401).json({ message: "Unauthorized" });

  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin access only" });

  next();
};


module.exports = {
  signupValidation,
  loginValidation,
  generateToken,
  logout,
  authenticate,
  adminOnly,
};
