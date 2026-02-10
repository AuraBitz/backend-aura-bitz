const nodemailer = require("nodemailer");
const dns = require("dns");

// Force IPv4 (Render doesn't support IPv6)
dns.setDefaultResultOrder("ipv4first");

// ─── SMTP Configuration (Gmail) ─────────────────────────────────────────────
const SMTP_CONFIG = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "aurabitzz@gmail.com",
    pass: "xnoj zlqx hghi oryp",
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const COMPANY = {
  name: "Aura Bitz",
  email: "aurabitzz@gmail.com",
  phone: "+91 9510157477",
  website: "https://aurabitz.com",
  backendUrl: "https://backend-aura-bitz.onrender.com",
  logoUrl: "https://backend-aura-bitz.onrender.com/public/AuraBitz_logo.png",
};

// ─── Create Transporter ─────────────────────────────────────────────────────
const transporter = nodemailer.createTransport(SMTP_CONFIG);

// Verify connection on startup
transporter.verify().then(() => {
  console.log("SMTP Email service ready");
}).catch((err) => {
  console.error("SMTP Email service error:", err.message);
});

// ─── Email Base Layout ──────────────────────────────────────────────────────
const emailLayout = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aura Bitz</title>
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Full-width top accent bar -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a78bfa 100%);">
    <tr><td style="height:6px;font-size:0;line-height:0;">&nbsp;</td></tr>
  </table>

  <!-- Full-width outer background -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f0f0f5;width:100%;min-width:100%;">
    <tr>
      <td align="center" style="padding:32px 16px 48px;">

        <!-- Header -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;width:100%;">
          <tr>
            <td style="padding:28px 40px 20px;text-align:center;background-color:#ffffff;border-radius:16px 16px 0 0;border:1px solid #e2e2ea;border-bottom:none;">
              <img src="${COMPANY.logoUrl}" alt="Aura Bitz" width="200" height="56" style="display:block;margin:0 auto 12px;max-width:200px;height:auto;" />
              <p style="margin:0;font-size:11px;color:#6366f1;letter-spacing:3px;text-transform:uppercase;font-weight:600;">
                AI-Powered Digital Solutions
              </p>
            </td>
          </tr>
          <!-- Purple accent line below header -->
          <tr>
            <td style="height:4px;font-size:0;line-height:0;background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a78bfa 100%);">&nbsp;</td>
          </tr>
        </table>

        <!-- Body Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;width:100%;">
          <tr>
            <td style="background-color:#ffffff;padding:40px 44px;border-left:1px solid #e2e2ea;border-right:1px solid #e2e2ea;">
              ${content}
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;width:100%;">
          <tr>
            <td style="background-color:#f8f8fc;padding:28px 40px;border-radius:0 0 16px 16px;border:1px solid #e2e2ea;border-top:none;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align:center;">
                    <img src="${COMPANY.logoUrl}" alt="Aura Bitz" width="110" height="30" style="display:block;margin:0 auto 10px;max-width:110px;height:auto;" />
                    <p style="margin:0 0 4px;font-size:12px;color:#6b7280;">aurabitzz@gmail.com &nbsp;|&nbsp; +91 9510157477</p>
                    <p style="margin:0;font-size:11px;color:#9ca3af;padding-top:14px;border-top:1px solid #e5e7eb;margin-top:14px;">
                      &copy; ${new Date().getFullYear()} Aura Bitz. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

  <!-- Full-width bottom accent bar -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:linear-gradient(135deg,#8b5cf6 0%,#6366f1 100%);">
    <tr><td style="height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>
  </table>

</body>
</html>
`;

// ─── Thank You Email to Customer ────────────────────────────────────────────
const buildThankYouEmail = (inquiry) => {
  const content = `
    <!-- Greeting -->
    <h2 style="margin:0 0 8px;font-size:24px;color:#1e1b4b;font-weight:700;">
      Thank You, ${inquiry.name}!
    </h2>
    <p style="margin:0 0 24px;font-size:15px;color:#4b5563;line-height:1.7;">
      We've received your inquiry and our team is already on it. You can expect a response within <strong style="color:#6366f1;">24 hours</strong>.
    </p>

    <!-- Divider -->
    <div style="height:2px;background:linear-gradient(to right,#e0e7ff,#6366f1,#e0e7ff);margin:24px 0;border-radius:2px;"></div>

    <!-- Inquiry Summary -->
    <h3 style="margin:0 0 16px;font-size:13px;color:#6366f1;text-transform:uppercase;letter-spacing:2px;font-weight:700;">
      Your Inquiry Summary
    </h3>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
      <tr>
        <td style="padding:14px 18px;background-color:#f5f3ff;border-radius:10px 10px 0 0;border:1px solid #e0e7ff;">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Service Interested In</span>
          <p style="margin:4px 0 0;font-size:15px;color:#1e1b4b;font-weight:600;">${inquiry.service}</p>
        </td>
      </tr>
      ${inquiry.companyName ? `
      <tr>
        <td style="padding:14px 18px;background-color:#f5f3ff;border-left:1px solid #e0e7ff;border-right:1px solid #e0e7ff;">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Company</span>
          <p style="margin:4px 0 0;font-size:15px;color:#1e1b4b;font-weight:600;">${inquiry.companyName}</p>
        </td>
      </tr>
      ` : ""}
      <tr>
        <td style="padding:14px 18px;background-color:#f5f3ff;border-radius:0 0 10px 10px;border:1px solid #e0e7ff;border-top:none;">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Your Message</span>
          <p style="margin:4px 0 0;font-size:14px;color:#374151;line-height:1.6;">${inquiry.message}</p>
        </td>
      </tr>
    </table>

    <!-- Divider -->
    <div style="height:2px;background:linear-gradient(to right,#e0e7ff,#6366f1,#e0e7ff);margin:24px 0;border-radius:2px;"></div>

    <!-- What's Next -->
    <h3 style="margin:0 0 16px;font-size:13px;color:#6366f1;text-transform:uppercase;letter-spacing:2px;font-weight:700;">
      What Happens Next?
    </h3>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td style="padding:10px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0">
            <tr>
              <td style="width:38px;height:38px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;text-align:center;vertical-align:middle;color:#fff;font-size:14px;font-weight:700;">1</td>
              <td style="padding-left:14px;">
                <p style="margin:0;font-size:14px;color:#1e1b4b;font-weight:600;">Review</p>
                <p style="margin:2px 0 0;font-size:13px;color:#6b7280;">Our team reviews your requirements</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0">
            <tr>
              <td style="width:38px;height:38px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;text-align:center;vertical-align:middle;color:#fff;font-size:14px;font-weight:700;">2</td>
              <td style="padding-left:14px;">
                <p style="margin:0;font-size:14px;color:#1e1b4b;font-weight:600;">Connect</p>
                <p style="margin:2px 0 0;font-size:13px;color:#6b7280;">We'll reach out within 24 hours</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0">
            <tr>
              <td style="width:38px;height:38px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;text-align:center;vertical-align:middle;color:#fff;font-size:14px;font-weight:700;">3</td>
              <td style="padding-left:14px;">
                <p style="margin:0;font-size:14px;color:#1e1b4b;font-weight:600;">Collaborate</p>
                <p style="margin:2px 0 0;font-size:13px;color:#6b7280;">Free consultation to discuss your project</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Divider -->
    <div style="height:2px;background:linear-gradient(to right,#e0e7ff,#6366f1,#e0e7ff);margin:24px 0;border-radius:2px;"></div>

    <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.7;">
      In the meantime, feel free to reply to this email if you have any questions. We're here to help!
    </p>

    <p style="margin:20px 0 0;font-size:14px;color:#4b5563;">
      Warm regards,<br>
      <strong style="color:#1e1b4b;">The Aura Bitz Team</strong>
    </p>
  `;

  return emailLayout(content);
};

// ─── New Inquiry Notification to Aura Bitz ──────────────────────────────────
const buildInquiryNotificationEmail = (inquiry) => {
  const createdAt = inquiry.createdAt
    ? new Date(inquiry.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const content = `
    <!-- Alert Badge -->
    <div style="display:inline-block;padding:6px 16px;background-color:#ecfdf5;border:1px solid #a7f3d0;border-radius:20px;margin-bottom:20px;">
      <span style="font-size:12px;color:#059669;font-weight:700;letter-spacing:1px;text-transform:uppercase;">New Inquiry Received</span>
    </div>

    <h2 style="margin:0 0 8px;font-size:22px;color:#1e1b4b;font-weight:700;">
      New Inquiry from ${inquiry.name}
    </h2>
    <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">
      Received on ${createdAt} (IST)
    </p>

    <!-- Divider -->
    <div style="height:2px;background:linear-gradient(to right,#e0e7ff,#6366f1,#e0e7ff);margin:24px 0;border-radius:2px;"></div>

    <!-- Customer Details -->
    <h3 style="margin:0 0 16px;font-size:13px;color:#6366f1;text-transform:uppercase;letter-spacing:2px;font-weight:700;">
      Customer Details
    </h3>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;background-color:#f5f3ff;border-radius:12px;border:1px solid #e0e7ff;overflow:hidden;">
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #e0e7ff;" width="35%">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Full Name</span>
        </td>
        <td style="padding:14px 20px;border-bottom:1px solid #e0e7ff;">
          <span style="font-size:15px;color:#1e1b4b;font-weight:600;">${inquiry.name}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #e0e7ff;">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Email</span>
        </td>
        <td style="padding:14px 20px;border-bottom:1px solid #e0e7ff;">
          <a href="mailto:${inquiry.email}" style="font-size:15px;color:#6366f1;text-decoration:none;font-weight:600;">${inquiry.email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #e0e7ff;">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Phone</span>
        </td>
        <td style="padding:14px 20px;border-bottom:1px solid #e0e7ff;">
          <a href="tel:${inquiry.phoneNumber}" style="font-size:15px;color:#6366f1;text-decoration:none;font-weight:600;">${inquiry.phoneNumber}</a>
        </td>
      </tr>
      ${inquiry.companyName ? `
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #e0e7ff;">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Company</span>
        </td>
        <td style="padding:14px 20px;border-bottom:1px solid #e0e7ff;">
          <span style="font-size:15px;color:#1e1b4b;font-weight:600;">${inquiry.companyName}</span>
        </td>
      </tr>
      ` : ""}
      <tr>
        <td style="padding:14px 20px;">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Service</span>
        </td>
        <td style="padding:14px 20px;">
          <span style="display:inline-block;padding:5px 14px;background-color:#eef2ff;border:1px solid #c7d2fe;border-radius:6px;font-size:13px;color:#4f46e5;font-weight:700;">${inquiry.service}</span>
        </td>
      </tr>
    </table>

    <!-- Message -->
    <h3 style="margin:0 0 12px;font-size:13px;color:#6366f1;text-transform:uppercase;letter-spacing:2px;font-weight:700;">
      Message
    </h3>
    <div style="padding:20px;background-color:#f5f3ff;border-radius:12px;border:1px solid #e0e7ff;border-left:4px solid #6366f1;margin-bottom:24px;">
      <p style="margin:0;font-size:14px;color:#374151;line-height:1.8;white-space:pre-wrap;">${inquiry.message}</p>
    </div>

    <!-- Quick Actions -->
    <div style="text-align:center;padding-top:8px;">
      <a href="mailto:${inquiry.email}" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;letter-spacing:0.5px;">
        Reply to ${inquiry.name}
      </a>
    </div>
  `;

  return emailLayout(content);
};

// ─── Send Emails ────────────────────────────────────────────────────────────

/**
 * Send thank you email to customer
 */
const sendThankYouEmail = async (inquiry) => {
  try {
    const html = buildThankYouEmail(inquiry);

    await transporter.sendMail({
      from: `"Aura Bitz" <${COMPANY.email}>`,
      to: inquiry.email,
      subject: `Thank You for Your Inquiry, ${inquiry.name}! - Aura Bitz`,
      html,
    });

    console.log(`Thank you email sent to: ${inquiry.email}`);
    return true;
  } catch (error) {
    console.error(`Failed to send thank you email to ${inquiry.email}:`, error.message);
    return false;
  }
};

/**
 * Send inquiry notification email to Aura Bitz team
 */
const sendInquiryNotificationEmail = async (inquiry) => {
  try {
    const html = buildInquiryNotificationEmail(inquiry);

    await transporter.sendMail({
      from: `"Aura Bitz Website" <${COMPANY.email}>`,
      to: COMPANY.email,
      subject: `New Inquiry: ${inquiry.name} - ${inquiry.service}`,
      html,
    });

    console.log(`Inquiry notification email sent to: ${COMPANY.email}`);
    return true;
  } catch (error) {
    console.error(`Failed to send inquiry notification:`, error.message);
    return false;
  }
};

/**
 * Send both emails (customer thank you + team notification)
 */
const sendInquiryEmails = async (inquiry) => {
  const results = await Promise.allSettled([
    sendThankYouEmail(inquiry),
    sendInquiryNotificationEmail(inquiry),
  ]);

  return {
    customerEmail: results[0].status === "fulfilled" && results[0].value,
    teamEmail: results[1].status === "fulfilled" && results[1].value,
  };
};

module.exports = {
  sendThankYouEmail,
  sendInquiryNotificationEmail,
  sendInquiryEmails,
};
