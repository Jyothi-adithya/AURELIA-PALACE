const { Resend } = require('resend');

// ---------- Configuration ----------

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || 'Aurelia Palace <onboarding@resend.dev>';

let resend = null;

if (RESEND_API_KEY) {
  resend = new Resend(RESEND_API_KEY);
} else {
  console.warn('[emailService] RESEND_API_KEY is not set. Email sending is disabled.');
}

// ---------- Email Template ----------

/**
 * Builds the HTML body for the enquiry confirmation email.
 */
const buildConfirmationHtml = ({ name, eventTypeName, eventDate, guestCount }) => {
  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Enquiry Confirmation</title>
</head>
<body style="margin:0; padding:0; background-color:#FAF8F5; font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF8F5; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border:1px solid #D6CFC6;">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#1C1917; padding:40px 40px 32px; text-align:center;">
              <h1 style="margin:0; font-size:28px; font-weight:400; color:#ffffff; letter-spacing:1px;">
                Aurelia <span style="color:#C9A96E; font-style:italic;">Palace</span>
              </h1>
              <div style="width:48px; height:1px; background-color:#C9A96E; margin:20px auto 0;"></div>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 24px; font-size:16px; color:#1C1917; line-height:1.7;">
                Dear ${name},
              </p>
              <p style="margin:0 0 24px; font-size:16px; color:#1C1917; line-height:1.7;">
                Thank you for contacting Aurelia Palace. We have successfully received your enquiry and our events team will review it shortly.
              </p>
              
              <!-- Enquiry Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0; border:1px solid #D6CFC6;">
                <tr>
                  <td style="background-color:#FAF8F5; padding:20px 24px; border-bottom:1px solid #D6CFC6;">
                    <p style="margin:0 0 4px; font-size:11px; text-transform:uppercase; letter-spacing:2px; color:#8C8078;">Event Type</p>
                    <p style="margin:0; font-size:18px; color:#1C1917;">${eventTypeName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color:#FAF8F5; padding:20px 24px; border-bottom:1px solid #D6CFC6;">
                    <p style="margin:0 0 4px; font-size:11px; text-transform:uppercase; letter-spacing:2px; color:#8C8078;">Event Date</p>
                    <p style="margin:0; font-size:18px; color:#1C1917;">${formattedDate}</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color:#FAF8F5; padding:20px 24px;">
                    <p style="margin:0 0 4px; font-size:11px; text-transform:uppercase; letter-spacing:2px; color:#8C8078;">Expected Guests</p>
                    <p style="margin:0; font-size:18px; color:#1C1917;">${guestCount}</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px; font-size:16px; color:#1C1917; line-height:1.7;">
                A member of our events team will be in touch with you shortly to discuss your vision and next steps.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color:#1C1917; padding:32px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:14px; color:#C9A96E; letter-spacing:1px;">Warm regards,</p>
              <p style="margin:0 0 16px; font-size:18px; color:#ffffff;">Aurelia Palace</p>
              <p style="margin:0; font-size:12px; color:#8C8078; letter-spacing:1px;">LUXURY EVENT VENUE</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

/**
 * Builds the plain-text fallback for the enquiry confirmation email.
 */
const buildConfirmationText = ({ name, eventTypeName, eventDate, guestCount }) => {
  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return [
    `Dear ${name},`,
    '',
    'Thank you for contacting Aurelia Palace.',
    'We have successfully received your enquiry.',
    '',
    'Enquiry Details:',
    `  Event: ${eventTypeName}`,
    `  Date:  ${formattedDate}`,
    `  Guests: ${guestCount}`,
    '',
    'Our events team will review your enquiry and contact you shortly.',
    '',
    'Warm regards,',
    'Aurelia Palace',
    'Luxury Event Venue',
  ].join('\n');
};

// ---------- Public API ----------

/**
 * Send enquiry confirmation email.
 * Never throws — returns { success: boolean, error?: string }.
 */
const sendEnquiryConfirmation = async ({ name, email, eventTypeName, eventDate, guestCount }) => {
  if (!resend) {
    console.warn('[emailService] Skipping email — Resend client not initialised.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: 'Thank you for your enquiry — Aurelia Palace',
      html: buildConfirmationHtml({ name, eventTypeName, eventDate, guestCount }),
      text: buildConfirmationText({ name, eventTypeName, eventDate, guestCount }),
    });

    return { success: true };
  } catch (error) {
    console.error('[emailService] Failed to send confirmation email:', error.message || error);
    return { success: false, error: error.message || 'Unknown email error' };
  }
};

module.exports = {
  sendEnquiryConfirmation,
};
