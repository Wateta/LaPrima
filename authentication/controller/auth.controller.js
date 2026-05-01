import User from "../model/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendemail.js";
import { generateToken } from "../middleware/auth.middleware.js";
import path from "path";
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
const window = new JSDOM('').window;
const purify = DOMPurify(window);
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationEmail(toEmail, code) {
  const logoPath = path.resolve("staffnet-frontend/staffnet-frontend/src/assets/logo.jpg");
  
  const htmlContent = `
  <div style="margin:0;padding:0;background-color:#FAFAFA;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FAFAFA;">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#FFFFFF;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
            <tr>
              <td style="background-color:#2e5a88;padding:24px;text-align:center;">
                <!-- StaffNet Logo -->
                <div style="background-color:#FFFFFF;border-radius:16px;padding:8px;display:inline-block;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
                  <img src="cid:staffnet-logo" alt="StaffNet Logo" style="width:64px;height:64px;display:block;object-fit:contain;" />
                </div>
                <h1 style="color:#FFFFFF;margin:12px 0 0 0;font-size:28px;font-weight:900;letter-spacing:-0.5px;">StaffNet.</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 16px 32px;text-align:center;color:#1F2937;">
                <h2 style="margin:0 0 16px 0;font-size:24px;line-height:1.3;font-weight:800;color:#2e5a88;">
                  Verify your account
                </h2>
                <p style="margin:0 0 12px 0;font-size:16px;line-height:1.6;color:#4B5563;">
                  Welcome to StaffNet! Use the code below to verify your account and start managing staff discipline.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 32px 32px;text-align:center;">
                <div style="display:inline-block;padding:20px 40px;border-radius:20px;background-color:#f8fafc;border:2px solid #2e5a88;">
                  <span style="display:inline-block;font-size:36px;font-weight:900;letter-spacing:8px;color:#2e5a88;font-family:'SF Mono',Menlo,Monaco,Consolas,monospace;">
                    ${code}
                  </span>
                </div>
                <p style="margin:20px 0 4px 0;font-size:14px;line-height:1.5;color:#64748b;">
                  This code will expire in <strong>10 minutes</strong>.
                </p>
                <p style="margin:0;font-size:13px;line-height:1.5;color:#94a3b8;">
                  If you didn't request this, please ignore this email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px 32px;">
                <div style="padding:20px;border-radius:16px;background-color:#fff1f2;border:1px solid #fecaca;">
                  <p style="margin:0;font-size:13px;line-height:1.5;color:#e11d48;text-align:center;font-weight:600;">
                    Security Note: Never share this code with anyone. StaffNet staff will never ask for it.
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px 32px;text-align:center;">
                <p style="margin:0 0 4px 0;font-size:12px;color:#94a3b8;">
                  &copy; ${new Date().getFullYear()} StaffNet. Nyabihu, Rwanda.
                </p>
                <p style="margin:0;font-size:12px;color:#94a3b8;">
                  Secure Workforce & Discipline Management.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
  `;

  await sendEmail({
    to: toEmail,
    subject: "Your Verification Code",
    html: htmlContent,
    attachments: [{
      filename: 'logo.jpg',
      path: logoPath,
      cid: 'staffnet-logo'
    }]
  });
}

const signup = async (req, res) => {
  try {
const { name, email, password } = req.body;
const cleanName = purify.sanitize(name);

    // ❌ REMOVE hashing here
    // const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = generateCode();
    const role = ADMIN_EMAILS.includes(email) ? "admin" : "staff";

    const user = await User.create({
      name:cleanName,
      email,
      password,
      verificationCode,
      isVerified: false,
      role,
    });

    try {
      await sendVerificationEmail(email, verificationCode);
    } catch (emailError) {
      const isDev = process.env.NODE_ENV !== "production";
      
      // In development, always show the verification code if email fails
      if (isDev) {
        console.log("\n" + "=".repeat(60));
        console.log("EMAIL ERROR - Verification code (use this to verify):");
        console.log(`  Email: ${email}`);
        console.log(`  Code:  ${verificationCode}`);
        console.log(`  Error: ${emailError?.message || 'Unknown error'}`);
        console.log("=".repeat(60) + "\n");
      } else {
        // In production, delete user and return error
        await User.destroy({ where: { id: user.id } });
        return res.status(500).json({
          message: "We couldn't send the verification email. Please try again later.",
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "Signup successful! Please verify your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ message: "Already verified" });
    if (user.verificationCode !== code)
      return res.status(400).json({ message: "Invalid code" });

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      success: true,
      message: "Email verified successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const code = generateCode();
    user.resetPasswordCode = code;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    try {
      await sendVerificationEmail(email, code);
    } catch (emailError) {
      const isDev = process.env.NODE_ENV !== "production";
      const isAuthError =
        emailError?.message?.includes("535") ||
        emailError?.message?.toLowerCase().includes("credentials");
      if (isDev && isAuthError) {
        console.log("\n" + "=".repeat(60));
        console.log("EMAIL NOT CONFIGURED: Password reset code:");
        console.log(`  Email: ${email} | Code: ${code}`);
        console.log("=".repeat(60) + "\n");
      } else {
        user.resetPasswordCode = null;
        user.resetPasswordExpires = null;
        await user.save();
        return res
          .status(500)
          .json({ message: "Could not send email. Please try again later." });
      }
    }

    res.json({
      success: true,
      message: "Password reset code sent to your email.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.resetPasswordCode !== code)
      return res.status(400).json({ message: "Invalid reset code" });

    if (Date.now() > user.resetPasswordExpires)
      return res.status(400).json({ message: "Reset code expired" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordCode = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
import { addToBlacklist } from "../../utils/tokenBlacklist.js";

const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    addToBlacklist(token);

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const testEmail = async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({ message: "Not found" });
  }
  const toEmail = req.body?.email || process.env.EMAIL_USER;
  if (!toEmail) {
    return res
      .status(400)
      .json({
        message:
          'Add email in body: { "email": "your@email.com" } or set EMAIL_USER in .env',
      });
  }
  const testCode = "123456";
  try {
    await sendVerificationEmail(toEmail, testCode);
    res.json({
      success: true,
      message:
        "Test email sent! Check your inbox (and spam). Code in email: " +
        testCode,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message?.includes("535")
        ? "Gmail rejected credentials. Use App Password in .env (see .env.example)"
        : err.message,
    });
  }
};

export {
  signup,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  logout,
  testEmail,
};
