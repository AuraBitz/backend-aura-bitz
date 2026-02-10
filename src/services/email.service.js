const nodemailer = require("nodemailer");

// ─── SMTP Configuration (Gmail) ─────────────────────────────────────────────
const SMTP_CONFIG = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "aurabitzz@gmail.com",
    pass: "xnoj zlqx hghi oryp",
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
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0a0a0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;">
          
          <!-- Header -->
          <tr>
            <td style="padding:30px 40px;text-align:center;border-radius:16px 16px 0 0;background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a78bfa 100%);">
              <img src="${COMPANY.logoUrl}" alt="Aura Bitz" width="180" height="50" style="display:block;margin:0 auto 12px;max-width:180px;height:auto;" />
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.8);letter-spacing:3px;text-transform:uppercase;">
                AI-Powered Digital Solutions
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#111118;padding:40px;border-left:1px solid #1e1e2e;border-right:1px solid #1e1e2e;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#0d0d14;padding:30px 40px;border-radius:0 0 16px 16px;border:1px solid #1e1e2e;border-top:none;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align:center;">
                    <img src="${COMPANY.logoUrl}" alt="Aura Bitz" width="120" height="34" style="display:block;margin:0 auto 12px;max-width:120px;height:auto;" />
                    <p style="margin:0 0 4px;font-size:12px;color:#64748b;">aurabitzz@gmail.com | +91 9510157477</p>
                    <p style="margin:0;font-size:11px;color:#475569;padding-top:16px;border-top:1px solid #1e1e2e;margin-top:16px;">
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
</body>
</html>
`;

// ─── Thank You Email to Customer ────────────────────────────────────────────
const buildThankYouEmail = (inquiry) => {
  const content = `
    <!-- Greeting -->
    <h2 style="margin:0 0 8px;font-size:24px;color:#f1f5f9;font-weight:700;">
      Thank You, ${inquiry.name}!
    </h2>
    <p style="margin:0 0 24px;font-size:15px;color:#94a3b8;line-height:1.7;">
      We've received your inquiry and our team is already on it. You can expect a response within <strong style="color:#a78bfa;">24 hours</strong>.
    </p>

    <!-- Divider -->
    <div style="height:1px;background:linear-gradient(to right,transparent,#6366f1,transparent);margin:24px 0;"></div>

    <!-- Inquiry Summary -->
    <h3 style="margin:0 0 16px;font-size:16px;color:#a78bfa;text-transform:uppercase;letter-spacing:2px;font-weight:600;">
      Your Inquiry Summary
    </h3>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
      <tr>
        <td style="padding:12px 16px;background-color:#0d0d14;border-radius:8px 8px 0 0;border:1px solid #1e1e2e;">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Service Interested In</span>
          <p style="margin:4px 0 0;font-size:15px;color:#e2e8f0;font-weight:500;">${inquiry.service}</p>
        </td>
      </tr>
      ${inquiry.companyName ? `
      <tr>
        <td style="padding:12px 16px;background-color:#0d0d14;border-left:1px solid #1e1e2e;border-right:1px solid #1e1e2e;">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Company</span>
          <p style="margin:4px 0 0;font-size:15px;color:#e2e8f0;font-weight:500;">${inquiry.companyName}</p>
        </td>
      </tr>
      ` : ""}
      <tr>
        <td style="padding:12px 16px;background-color:#0d0d14;border-radius:0 0 8px 8px;border:1px solid #1e1e2e;border-top:none;">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Your Message</span>
          <p style="margin:4px 0 0;font-size:14px;color:#cbd5e1;line-height:1.6;">${inquiry.message}</p>
        </td>
      </tr>
    </table>

    <!-- Divider -->
    <div style="height:1px;background:linear-gradient(to right,transparent,#6366f1,transparent);margin:24px 0;"></div>

    <!-- What's Next -->
    <h3 style="margin:0 0 16px;font-size:16px;color:#a78bfa;text-transform:uppercase;letter-spacing:2px;font-weight:600;">
      What Happens Next?
    </h3>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td style="padding:12px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0">
            <tr>
              <td style="width:36px;height:36px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;text-align:center;vertical-align:middle;color:#fff;font-size:14px;font-weight:700;">1</td>
              <td style="padding-left:14px;">
                <p style="margin:0;font-size:14px;color:#e2e8f0;font-weight:600;">Review</p>
                <p style="margin:2px 0 0;font-size:13px;color:#94a3b8;">Our team reviews your requirements</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0">
            <tr>
              <td style="width:36px;height:36px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;text-align:center;vertical-align:middle;color:#fff;font-size:14px;font-weight:700;">2</td>
              <td style="padding-left:14px;">
                <p style="margin:0;font-size:14px;color:#e2e8f0;font-weight:600;">Connect</p>
                <p style="margin:2px 0 0;font-size:13px;color:#94a3b8;">We'll reach out within 24 hours</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0">
            <tr>
              <td style="width:36px;height:36px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;text-align:center;vertical-align:middle;color:#fff;font-size:14px;font-weight:700;">3</td>
              <td style="padding-left:14px;">
                <p style="margin:0;font-size:14px;color:#e2e8f0;font-weight:600;">Collaborate</p>
                <p style="margin:2px 0 0;font-size:13px;color:#94a3b8;">Free consultation to discuss your project</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Divider -->
    <div style="height:1px;background:linear-gradient(to right,transparent,#6366f1,transparent);margin:24px 0;"></div>

    <p style="margin:0;font-size:14px;color:#94a3b8;line-height:1.7;">
      In the meantime, feel free to reply to this email if you have any questions. We're here to help!
    </p>

    <p style="margin:20px 0 0;font-size:14px;color:#94a3b8;">
      Warm regards,<br>
      <strong style="color:#e2e8f0;">The Aura Bitz Team</strong>
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
    <div style="display:inline-block;padding:6px 16px;background-color:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);border-radius:20px;margin-bottom:20px;">
      <span style="font-size:12px;color:#22c55e;font-weight:600;letter-spacing:1px;text-transform:uppercase;">New Inquiry Received</span>
    </div>

    <h2 style="margin:0 0 8px;font-size:22px;color:#f1f5f9;font-weight:700;">
      New Inquiry from ${inquiry.name}
    </h2>
    <p style="margin:0 0 24px;font-size:14px;color:#64748b;">
      Received on ${createdAt} (IST)
    </p>

    <!-- Divider -->
    <div style="height:1px;background:linear-gradient(to right,transparent,#6366f1,transparent);margin:24px 0;"></div>

    <!-- Customer Details -->
    <h3 style="margin:0 0 16px;font-size:14px;color:#a78bfa;text-transform:uppercase;letter-spacing:2px;font-weight:600;">
      Customer Details
    </h3>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;background-color:#0d0d14;border-radius:12px;border:1px solid #1e1e2e;overflow:hidden;">
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #1e1e2e;" width="35%">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Full Name</span>
        </td>
        <td style="padding:14px 20px;border-bottom:1px solid #1e1e2e;">
          <span style="font-size:15px;color:#e2e8f0;font-weight:600;">${inquiry.name}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #1e1e2e;">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Email</span>
        </td>
        <td style="padding:14px 20px;border-bottom:1px solid #1e1e2e;">
          <a href="mailto:${inquiry.email}" style="font-size:15px;color:#6366f1;text-decoration:none;font-weight:500;">${inquiry.email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #1e1e2e;">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Phone</span>
        </td>
        <td style="padding:14px 20px;border-bottom:1px solid #1e1e2e;">
          <a href="tel:${inquiry.phoneNumber}" style="font-size:15px;color:#6366f1;text-decoration:none;font-weight:500;">${inquiry.phoneNumber}</a>
        </td>
      </tr>
      ${inquiry.companyName ? `
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #1e1e2e;">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Company</span>
        </td>
        <td style="padding:14px 20px;border-bottom:1px solid #1e1e2e;">
          <span style="font-size:15px;color:#e2e8f0;font-weight:500;">${inquiry.companyName}</span>
        </td>
      </tr>
      ` : ""}
      <tr>
        <td style="padding:14px 20px;">
          <span style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Service</span>
        </td>
        <td style="padding:14px 20px;">
          <span style="display:inline-block;padding:4px 12px;background:linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2));border:1px solid rgba(99,102,241,0.3);border-radius:6px;font-size:13px;color:#a78bfa;font-weight:600;">${inquiry.service}</span>
        </td>
      </tr>
    </table>

    <!-- Message -->
    <h3 style="margin:0 0 12px;font-size:14px;color:#a78bfa;text-transform:uppercase;letter-spacing:2px;font-weight:600;">
      Message
    </h3>
    <div style="padding:20px;background-color:#0d0d14;border-radius:12px;border:1px solid #1e1e2e;border-left:3px solid #6366f1;margin-bottom:24px;">
      <p style="margin:0;font-size:14px;color:#cbd5e1;line-height:1.8;white-space:pre-wrap;">${inquiry.message}</p>
    </div>

    <!-- Quick Actions -->
    <div style="text-align:center;padding-top:8px;">
      <a href="mailto:${inquiry.email}" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;letter-spacing:0.5px;">
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
