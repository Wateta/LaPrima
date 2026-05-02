const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendVerificationEmail = async (toEmail, code) => {
  console.log("EMAIL DEBUG -> EMAIL_USER:", process.env.EMAIL_USER);
  if (process.env.EMAIL_PASS) {
    console.log("EMAIL DEBUG -> EMAIL_PASS length:", process.env.EMAIL_PASS.length);
  } else {
    console.log("EMAIL DEBUG -> EMAIL_PASS is NOT set");
  }

  const transporter = createTransporter();

  const htmlContent = `
  <div style="margin:0;padding:0;background-color:#2b2b2b;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#2b2b2b;">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#2b2b2b;border:1px solid #c9a961;border-radius:12px;overflow:hidden;box-shadow:0 10px 40px rgba(201,169,97,0.15);font-family:'Georgia',serif;">
            <tr>
              <td style="background-color:#3e3e3e;border-bottom:2px solid #c9a961;padding:20px 24px;text-align:center;">
                <h1 style="margin:0;font-size:24px;color:#f5f1e8;">La Prima</h1>
                <p style="margin:4px 0 0 0;font-size:12px;color:#d4a574;">Your Verification Code</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 24px 8px 24px;text-align:left;color:#f5f1e8;">
                <h2 style="margin:0 0 12px 0;font-size:22px;line-height:1.3;font-weight:700;color:#f5f1e8;font-family:'Georgia',serif;">
                  Verify your La Prima account
                </h2>
                <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;color:#e8d7c3;">
                  Welcome to La Prima! Use the code below to verify your email address.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 24px 24px;text-align:center;">
                <div style="display:inline-block;padding:16px 28px;border-radius:8px;background-color:#3e3e3e;border:2px solid #c9a961;">
                  <span style="display:inline-block;font-size:32px;font-weight:800;letter-spacing:6px;color:#c9a961;font-family:'Georgia',monospace;">
                    ${code}
                  </span>
                </div>
                <p style="margin:16px 0 4px 0;font-size:13px;line-height:1.5;color:#e8d7c3;">
                  This code will expire in <strong>15 minutes</strong>.
                </p>
                <p style="margin:0;font-size:12px;line-height:1.5;color:#d4a574;">
                  If you did not request this, you can safely ignore this email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px;">
                <div style="border-radius:8px;background-color:#3e3e3e;border:1px solid #4a4a4a;padding:14px 16px;display:flex;align-items:flex-start;gap:10px;">
                  <div style="width:24px;height:24px;border-radius:999px;background-color:#c9a961;display:flex;align-items:center;justify-content:center;color:#2b2b2b;font-size:14px;font-weight:700;flex-shrink:0;">
                    !
                  </div>
                  <p style="margin:0;font-size:12px;line-height:1.5;color:#e8d7c3;">
                    For your security, never share this code with anyone. La Prima staff will never ask you for it.
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px;text-align:center;">
                <p style="margin:0 0 4px 0;font-size:11px;color:#d4a574;">
                  &copy; ${new Date().getFullYear()} La Prima. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
  `;

  await transporter.sendMail({
    from: `La Prima <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your Verification Code",
    html: htmlContent,
  });
};

const sendResetPasswordEmail = async (toEmail, code) => {
  console.log("EMAIL DEBUG -> EMAIL_USER:", process.env.EMAIL_USER);
  if (process.env.EMAIL_PASS) {
    console.log("EMAIL DEBUG -> EMAIL_PASS length:", process.env.EMAIL_PASS.length);
  } else {
    console.log("EMAIL DEBUG -> EMAIL_PASS is NOT set");
  }

  const transporter = createTransporter();

  const htmlContent = `
  <div style="margin:0;padding:0;background-color:#2b2b2b;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#2b2b2b;">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#2b2b2b;border:1px solid #c9a961;border-radius:12px;overflow:hidden;box-shadow:0 10px 40px rgba(201,169,97,0.15);font-family:'Georgia',serif;">
            <tr>
              <td style="background-color:#3e3e3e;border-bottom:2px solid #c9a961;padding:20px 24px;text-align:center;">
                <h1 style="margin:0;font-size:24px;color:#f5f1e8;">La Prima</h1>
                <p style="margin:4px 0 0 0;font-size:12px;color:#d4a574;">Your Password Reset Code</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 24px 8px 24px;text-align:left;color:#f5f1e8;">
                <h2 style="margin:0 0 12px 0;font-size:22px;line-height:1.3;font-weight:700;color:#f5f1e8;font-family:'Georgia',serif;">
                  Reset your La Prima password
                </h2>
                <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;color:#e8d7c3;">
                  Use the code below to reset your password.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 24px 24px;text-align:center;">
                <div style="display:inline-block;padding:16px 28px;border-radius:8px;background-color:#3e3e3e;border:2px solid #c9a961;">
                  <span style="display:inline-block;font-size:32px;font-weight:800;letter-spacing:6px;color:#c9a961;font-family:'Georgia',monospace;">
                    ${code}
                  </span>
                </div>
                <p style="margin:16px 0 4px 0;font-size:13px;line-height:1.5;color:#e8d7c3;">
                  This code will expire in <strong>15 minutes</strong>.
                </p>
                <p style="margin:0;font-size:12px;line-height:1.5;color:#d4a574;">
                  If you did not request this, you can safely ignore this email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px;">
                <div style="border-radius:8px;background-color:#3e3e3e;border:1px solid #4a4a4a;padding:14px 16px;display:flex;align-items:flex-start;gap:10px;">
                  <div style="width:24px;height:24px;border-radius:999px;background-color:#c9a961;display:flex;align-items:center;justify-content:center;color:#2b2b2b;font-size:14px;font-weight:700;flex-shrink:0;">
                    !
                  </div>
                  <p style="margin:0;font-size:12px;line-height:1.5;color:#e8d7c3;">
                    For your security, never share this code with anyone. La Prima staff will never ask you for it.
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px;text-align:center;">
                <p style="margin:0 0 4px 0;font-size:11px;color:#d4a574;">
                  &copy; ${new Date().getFullYear()} La Prima. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
  `;

  await transporter.sendMail({
    from: `La Prima <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your Password Reset Code",
    html: htmlContent,
  });
};

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
  generateCode,
};
