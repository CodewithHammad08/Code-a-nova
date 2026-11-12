/**
 * Email templates for Code-a-Nova platform
 * Follows design requirements: Dark navy (#17243A), Gold Accent (#D6A64F), Warm Neutral (#F7F7F4)
 * High-end editorial digital pass styling with responsive email-safe tables.
 */

const getOtpEmailTemplate = (fullName, otp) => {
  const otpDigits = String(otp).split('');
  const digitsHtml = otpDigits
    .map(
      (d) =>
        `<span style="display:inline-block; width:44px; height:52px; line-height:52px; background:#FFFFFF; border:2px solid #17243A; border-radius:6px; font-size:28px; font-weight:800; color:#17243A; margin:0 4px; font-family:'Courier New', Courier, monospace; box-shadow:0 2px 4px rgba(0,0,0,0.06); text-align:center;">${d}</span>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Code-a-Nova Verification Code</title>
</head>
<body style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color:#F7F7F4; margin:0; padding:40px 16px; color:#20242B;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width:580px; background:#FFFFFF; border:1px solid #E5E7EB; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);" border="0" cellspacing="0" cellpadding="0">
          
          <!-- Brand Header -->
          <tr>
            <td style="background:#17243A; padding:32px 36px; border-bottom:3px solid #D6A64F;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size:22px; font-weight:800; color:#FFFFFF; letter-spacing:0.08em; text-transform:uppercase; margin:0;">CODE-A-NOVA</div>
                    <div style="font-size:11px; font-weight:600; color:#D6A64F; letter-spacing:0.12em; text-transform:uppercase; margin-top:4px;">Hackathon Identity & Access Management</div>
                  </td>
                  <td align="right">
                    <span style="display:inline-block; background:rgba(214,166,79,0.15); border:1px solid #D6A64F; color:#D6A64F; font-size:10px; font-weight:700; padding:4px 10px; border-radius:4px; text-transform:uppercase; letter-spacing:0.06em;">SECURE AUTH</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding:40px 36px;">
              <div style="font-size:18px; font-weight:700; color:#17243A; margin-bottom:12px;">Email Verification Code</div>
              <p style="font-size:14px; line-height:1.6; color:#4B5563; margin:0 0 24px;">
                Hello <strong>${fullName || 'Participant'}</strong>,<br>
                Welcome to <strong>Code-a-Nova 2026</strong>. Use the 6-digit One-Time Password (OTP) below to authenticate your account and access the participant portal.
              </p>

              <!-- OTP Digits Box -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:28px 0;">
                <tr>
                  <td align="center" style="background:#F7F7F4; border:1px solid #E5E7EB; border-radius:8px; padding:28px 16px;">
                    <div style="font-size:11px; text-transform:uppercase; font-weight:700; color:#6B7280; letter-spacing:0.1em; margin-bottom:14px;">ONE-TIME VERIFICATION CODE</div>
                    <div style="white-space:nowrap; margin-bottom:12px;">
                      ${digitsHtml}
                    </div>
                    <div style="font-size:12px; color:#6B7280; margin-top:12px;">
                      ⏱ This passcode expires in <strong style="color:#17243A;">10 minutes</strong> &bull; Single-use security token
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Security Notice -->
              <div style="background:#F9FAFB; border-left:3px solid #17243A; padding:14px 18px; border-radius:0 6px 6px 0; margin-top:24px;">
                <div style="font-size:12px; font-weight:700; color:#17243A; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:4px;">🔒 Security Advisory</div>
                <div style="font-size:12px; line-height:1.5; color:#6B7280;">
                  Never share your verification code with anyone. Code-a-Nova organizers will never ask for your password or OTP. If you did not request this verification, you can safely ignore this email.
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#FAFAFA; border-top:1px solid #E5E7EB; padding:20px 36px; text-align:center;">
              <div style="font-size:12px; color:#6B7280; margin-bottom:4px;">
                <strong>Code-a-Nova Hackathon 2026</strong> &bull; Build Something That Moves The Future
              </div>
              <div style="font-size:11px; color:#9CA3AF;">
                This is an automated system dispatch. Please do not reply directly to this email.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const getRegistrationConfirmationTemplate = (registration) => {
  const {
    participantName,
    registrationId,
    projectName,
    domain,
    teamSize,
    teamName,
    teamMembers = [],
    collegeName,
    course,
    branch,
    yearOfStudy,
  } = registration;

  // Generate dynamic QR Code URL targeting public participant reference check
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=CODEANOVA-${encodeURIComponent(
    registrationId
  )}&color=17243A&bgcolor=FFFFFF`;

  // Team roster rows
  const membersHtml =
    teamMembers && teamMembers.length > 0
      ? teamMembers
          .map(
            (m, idx) => `
        <tr style="border-bottom:1px solid #E5E7EB;">
          <td style="padding:10px 14px; font-size:12px; font-family:'Courier New', monospace; color:#6B7280; font-weight:600;">MBR #${idx + 2}</td>
          <td style="padding:10px 14px; font-size:13px; font-weight:600; color:#17243A;">${m.name}</td>
          <td style="padding:10px 14px; font-size:12px; color:#4B5563; font-family:'Courier New', monospace;">${m.email}</td>
        </tr>
      `
          )
          .join('')
      : '';

  const academicString = [course, branch, yearOfStudy].filter(Boolean).join(' • ');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Official Hackathon Pass - Code-a-Nova 2026</title>
</head>
<body style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color:#F4F4F0; margin:0; padding:36px 12px; color:#20242B;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <!-- Container Wrapper -->
        <table role="presentation" width="100%" style="max-width:640px; background:#FFFFFF; border:1px solid #D1D5DB; border-radius:8px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);" border="0" cellspacing="0" cellpadding="0">
          
          <!-- Top Brand Bar -->
          <tr>
            <td style="background:#17243A; padding:28px 36px; border-bottom:3px solid #D6A64F;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size:22px; font-weight:800; color:#FFFFFF; letter-spacing:0.08em; margin:0;">CODE-A-NOVA '26</div>
                    <div style="font-size:11px; font-weight:600; color:#D6A64F; letter-spacing:0.12em; text-transform:uppercase; margin-top:4px;">Official Hackathon Entry Pass</div>
                  </td>
                  <td align="right">
                    <span style="display:inline-block; background:#10B981; color:#FFFFFF; font-size:11px; font-weight:700; padding:4px 10px; border-radius:4px; text-transform:uppercase; letter-spacing:0.05em;">● CONFIRMED</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Welcome Banner -->
          <tr>
            <td style="padding:32px 36px 20px;">
              <div style="font-size:20px; font-weight:800; color:#17243A; margin-bottom:8px;">
                You're in, ${participantName}! 🚀
              </div>
              <p style="font-size:14px; line-height:1.6; color:#4B5563; margin:0 0 16px;">
                Your registration for <strong>Code-a-Nova 2026</strong> has been officially confirmed and logged in our system. Below is your <strong>Digital Hacker Pass</strong>. Please keep this pass accessible during event check-in and presentation evaluation.
              </p>
            </td>
          </tr>

          <!-- ==================== DIGITAL PASS TICKET COMPONENT ==================== -->
          <tr>
            <td style="padding:0 28px 28px;">
              <table role="presentation" width="100%" style="background:#17243A; border-radius:8px; overflow:hidden; border:2px solid #D6A64F; box-shadow:0 4px 16px rgba(23,36,58,0.25);" border="0" cellspacing="0" cellpadding="0">
                
                <!-- Ticket Top Header -->
                <tr>
                  <td style="background:#111A29; padding:16px 24px; border-bottom:1px solid rgba(214,166,79,0.3);">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <span style="color:#D6A64F; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase;">ADMIT ONE // HACKER PASS</span>
                        </td>
                        <td align="right">
                          <span style="color:#9CA3AF; font-size:11px; font-family:'Courier New', monospace; letter-spacing:0.05em;">CODEANOVA-2026</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Ticket Main Body -->
                <tr>
                  <td style="padding:28px 24px; background:#17243A;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <!-- Left Details Column -->
                        <td valign="top" style="padding-right:20px;">
                          <!-- Participant Name -->
                          <div style="color:#9CA3AF; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:4px;">PARTICIPANT</div>
                          <div style="color:#FFFFFF; font-size:22px; font-weight:800; letter-spacing:0.02em; margin-bottom:14px;">${participantName}</div>

                          <!-- Project Name -->
                          <div style="color:#9CA3AF; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:4px;">PROJECT</div>
                          <div style="color:#D6A64F; font-size:15px; font-weight:700; margin-bottom:14px;">"${projectName}"</div>

                          <!-- Track & Role Pill -->
                          <div style="margin-bottom:16px;">
                            <span style="display:inline-block; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#FFFFFF; font-size:11px; font-weight:600; padding:4px 10px; border-radius:4px; font-family:'Courier New', monospace; margin-right:6px; margin-bottom:4px;">
                              TRACK: ${domain}
                            </span>
                            <span style="display:inline-block; background:rgba(214,166,79,0.2); border:1px solid #D6A64F; color:#D6A64F; font-size:11px; font-weight:700; padding:4px 10px; border-radius:4px; text-transform:uppercase; margin-bottom:4px;">
                              ${teamSize > 1 ? `TEAM LEAD (${teamSize} MBRS)` : 'SOLO BUILDER'}
                            </span>
                          </div>

                          <!-- Institution -->
                          <div style="color:#9CA3AF; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:2px;">INSTITUTION</div>
                          <div style="color:#E5E7EB; font-size:12px; font-weight:500;">${collegeName}</div>
                          ${academicString ? `<div style="color:#9CA3AF; font-size:11px; margin-top:2px;">${academicString}</div>` : ''}
                        </td>

                        <!-- Right QR Code Column -->
                        <td width="150" align="center" valign="middle" style="background:#FFFFFF; padding:14px; border-radius:6px; border:2px solid #D6A64F;">
                          <img src="${qrCodeUrl}" alt="Check-in QR Code" width="130" height="130" style="display:block; border:none;" />
                          <div style="color:#17243A; font-family:'Courier New', monospace; font-size:10px; font-weight:700; margin-top:6px; letter-spacing:0.05em;">SCAN AT CHECK-IN</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Ticket Perforated Divider -->
                <tr>
                  <td style="padding:0 12px; background:#17243A;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="border-top:2px dashed rgba(214,166,79,0.4); height:1px;"></td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Ticket Bottom Stub -->
                <tr>
                  <td style="background:#111A29; padding:16px 24px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <div style="color:#9CA3AF; font-size:10px; text-transform:uppercase; letter-spacing:0.08em; font-weight:700;">REGISTRATION REFERENCE ID</div>
                          <div style="color:#FFFFFF; font-size:18px; font-weight:800; font-family:'Courier New', monospace; letter-spacing:0.08em; margin-top:2px;">
                            ${registrationId}
                          </div>
                        </td>
                        <td align="right">
                          <div style="color:#D6A64F; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em;">ALL ACCESS PASS</div>
                          <div style="color:#9CA3AF; font-size:10px; margin-top:2px;">NOV 20–22, 2026 &bull; INNOVATION ARENA</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
          <!-- ==================== END DIGITAL PASS TICKET ==================== -->

          <!-- Details & Team Roster Section -->
          <tr>
            <td style="padding:0 36px 32px;">
              ${
                teamSize > 1
                  ? `
                <div style="font-size:14px; font-weight:700; color:#17243A; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:10px;">
                  Team Roster (${teamName ? `"${teamName}" - ` : ''}${teamSize} Members)
                </div>
                <table role="presentation" width="100%" style="border-collapse:collapse; background:#FAFAFA; border:1px solid #E5E7EB; border-radius:6px; overflow:hidden; margin-bottom:24px;" border="0" cellspacing="0" cellpadding="0">
                  <tr style="background:#F3F4F6; border-bottom:1px solid #E5E7EB;">
                    <th align="left" style="padding:8px 14px; font-size:11px; color:#6B7280; font-family:'Courier New', monospace; text-transform:uppercase;">Role</th>
                    <th align="left" style="padding:8px 14px; font-size:11px; color:#6B7280; text-transform:uppercase;">Participant Name</th>
                    <th align="left" style="padding:8px 14px; font-size:11px; color:#6B7280; text-transform:uppercase;">Email</th>
                  </tr>
                  <tr style="border-bottom:1px solid #E5E7EB;">
                    <td style="padding:10px 14px; font-size:12px; font-family:'Courier New', monospace; color:#17243A; font-weight:700;">LEAD</td>
                    <td style="padding:10px 14px; font-size:13px; font-weight:700; color:#17243A;">${participantName}</td>
                    <td style="padding:10px 14px; font-size:12px; color:#4B5563; font-family:'Courier New', monospace;">${registration.email}</td>
                  </tr>
                  ${membersHtml}
                </table>
              `
                  : ''
              }

              <!-- Action Links & Next Steps -->
              <div style="background:#F9FAFB; border:1px solid #E5E7EB; border-radius:8px; padding:20px 24px;">
                <div style="font-size:13px; font-weight:700; color:#17243A; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.04em;">Next Steps & Guidelines</div>
                <ol style="margin:0; padding-left:20px; font-size:13px; line-height:1.6; color:#4B5563;">
                  <li><strong>Refine Your Prototype:</strong> You can update your presentation slide links, GitHub repo, or demo video anytime via your participant portal.</li>
                  <li><strong>Discord Sync:</strong> Join the official hackathon Discord channels to connect with mentors and access API sandbox workshops.</li>
                  <li><strong>Event Check-in:</strong> Present your QR code or registration ID (<code>${registrationId}</code>) at the registration desk on day 1.</li>
                </ol>
              </div>

              <!-- Button CTA -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <a href="http://localhost:5173/dashboard" style="display:inline-block; background:#17243A; color:#FFFFFF; font-size:14px; font-weight:700; text-decoration:none; padding:14px 28px; border-radius:5px; letter-spacing:0.04em; border:1px solid #17243A; box-shadow:0 2px 6px rgba(23,36,58,0.2);">
                      Open Participant Dashboard &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#FAFAFA; border-top:1px solid #E5E7EB; padding:24px 36px; text-align:center;">
              <div style="font-size:12px; font-weight:600; color:#17243A; margin-bottom:4px;">
                Code-a-Nova Hackathon 2026 &bull; Build Something That Moves The Future
              </div>
              <div style="font-size:11px; color:#9CA3AF;">
                Pass ID: ${registrationId} &bull; Generated dynamically for ${participantName}
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

module.exports = {
  getOtpEmailTemplate,
  getRegistrationConfirmationTemplate,
};
