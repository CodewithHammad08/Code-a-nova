/**
 * Email templates for Code-a-Nova platform
 * Follows design requirements: Dark navy (#17243A), Gold Accent (#D6A64F), Warm Neutral (#F7F7F4)
 */

const getOtpEmailTemplate = (fullName, otp) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Code-a-Nova Verification Code</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F7F7F4; margin: 0; padding: 40px 15px; color: #20242B; }
    .container { max-width: 560px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .header { background: #17243A; padding: 28px 32px; border-bottom: 2px solid #D6A64F; }
    .header h1 { margin: 0; color: #FFFFFF; font-size: 20px; font-weight: 700; letter-spacing: 0.05em; }
    .header p { margin: 4px 0 0; color: #D6A64F; font-size: 13px; font-weight: 500; }
    .content { padding: 36px 32px; }
    .greeting { font-size: 16px; font-weight: 600; color: #20242B; margin-bottom: 12px; }
    .message { font-size: 14px; line-height: 1.6; color: #4B5563; margin-bottom: 24px; }
    .otp-card { background: #F7F7F4; border: 1px solid #E5E7EB; border-radius: 6px; padding: 24px; text-align: center; margin: 24px 0; }
    .otp-code { font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #17243A; font-family: monospace; display: inline-block; }
    .otp-meta { font-size: 12px; color: #6B7280; margin-top: 8px; }
    .warning { font-size: 13px; color: #6B7280; line-height: 1.5; border-top: 1px solid #E5E7EB; padding-top: 18px; margin-top: 24px; }
    .footer { background: #FAFAFA; padding: 18px 32px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #9CA3AF; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>CODE-A-NOVA</h1>
      <p>HACKATHON REGISTRATION PLATFORM</p>
    </div>
    <div class="content">
      <div class="greeting">Hello, ${fullName || 'Participant'}</div>
      <div class="message">
        Thank you for signing up for <strong>Code-a-Nova</strong>. Please use the following One-Time Password (OTP) to verify your email address and activate your account.
      </div>
      <div class="otp-card">
        <div class="otp-code">${otp}</div>
        <div class="otp-meta">Valid for <strong>10 minutes</strong>. Single use only.</div>
      </div>
      <div class="warning">
        <strong>Security Notice:</strong> Never share this verification code with anyone. Code-a-Nova staff will never ask for your OTP or password. If you did not initiate this request, you can safely ignore this email.
      </div>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Code-a-Nova. All rights reserved.
    </div>
  </div>
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
    teamMembers = [],
    collegeName,
  } = registration;

  const membersHtml = teamMembers && teamMembers.length > 0
    ? teamMembers.map((m, idx) => `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #E5E7EB; font-size: 13px;">${idx + 2}. ${m.name}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #E5E7EB; font-size: 13px; color: #6B7280;">${m.email}</td>
      </tr>
    `).join('')
    : '<tr><td colspan="2" style="padding: 8px 12px; font-size: 13px; color: #6B7280;">Solo Participant (No additional members)</td></tr>';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hackathon Registration Confirmed - Code-a-Nova</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F7F7F4; margin: 0; padding: 40px 15px; color: #20242B; }
    .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .header { background: #17243A; padding: 28px 32px; border-bottom: 2px solid #D6A64F; }
    .header h1 { margin: 0; color: #FFFFFF; font-size: 20px; font-weight: 700; letter-spacing: 0.05em; }
    .header p { margin: 4px 0 0; color: #D6A64F; font-size: 13px; font-weight: 500; }
    .content { padding: 36px 32px; }
    .success-badge { display: inline-block; background: #E8F5E9; color: #21845B; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; margin-bottom: 16px; letter-spacing: 0.05em; }
    .greeting { font-size: 18px; font-weight: 600; color: #20242B; margin-bottom: 8px; }
    .message { font-size: 14px; line-height: 1.6; color: #4B5563; margin-bottom: 24px; }
    .ref-box { background: #F7F7F4; border-left: 4px solid #17243A; padding: 14px 18px; margin-bottom: 24px; border-radius: 0 4px 4px 0; }
    .ref-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #6B7280; font-weight: 600; }
    .ref-id { font-size: 20px; font-weight: 700; color: #17243A; font-family: monospace; margin-top: 4px; }
    .detail-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
    .detail-table th { text-align: left; padding: 10px 12px; background: #FAFAFA; border-bottom: 1px solid #E5E7EB; color: #4B5563; font-weight: 600; font-size: 12px; text-transform: uppercase; }
    .detail-table td { padding: 10px 12px; border-bottom: 1px solid #E5E7EB; color: #20242B; }
    .detail-table tr:last-child td { border-bottom: none; }
    .team-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .next-steps { background: #FAFAFA; border: 1px solid #E5E7EB; border-radius: 6px; padding: 18px 20px; font-size: 13px; color: #4B5563; line-height: 1.5; margin-top: 24px; }
    .footer { background: #FAFAFA; padding: 18px 32px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #9CA3AF; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>CODE-A-NOVA</h1>
      <p>HACKATHON REGISTRATION CONFIRMED</p>
    </div>
    <div class="content">
      <div class="success-badge">&#10003; Confirmed</div>
      <div class="greeting">Congratulations, ${participantName}!</div>
      <div class="message">
        Your registration for <strong>Code-a-Nova</strong> has been received and verified. Save this email and your registration ID for future event communications and check-in.
      </div>

      <div class="ref-box">
        <div class="ref-label">Registration Reference ID</div>
        <div class="ref-id">${registrationId}</div>
      </div>

      <table class="detail-table">
        <tr>
          <td style="width: 35%; color: #6B7280; font-weight: 500;">Project Name</td>
          <td style="font-weight: 600;">${projectName}</td>
        </tr>
        <tr>
          <td style="color: #6B7280; font-weight: 500;">Domain / Track</td>
          <td>${domain}</td>
        </tr>
        <tr>
          <td style="color: #6B7280; font-weight: 500;">Team Size</td>
          <td>${teamSize} member(s) (Leader: ${participantName})</td>
        </tr>
        <tr>
          <td style="color: #6B7280; font-weight: 500;">Institution / College</td>
          <td>${collegeName}</td>
        </tr>
      </table>

      ${teamSize > 1 ? `
        <div style="font-size: 13px; font-weight: 600; color: #20242B; margin-top: 16px; margin-bottom: 6px;">Team Members Registered:</div>
        <table class="team-table">
          <tr style="background: #FAFAFA;">
            <th style="text-align: left; padding: 6px 12px; font-size: 11px; color: #6B7280;">Member Name</th>
            <th style="text-align: left; padding: 6px 12px; font-size: 11px; color: #6B7280;">Email</th>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #E5E7EB; font-size: 13px; font-weight: 600;">1. ${participantName} (Lead)</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #E5E7EB; font-size: 13px; color: #6B7280;">${registration.email}</td>
          </tr>
          ${membersHtml}
        </table>
      ` : ''}

      <div class="next-steps">
        <strong>What's Next?</strong><br>
        1. Keep refining your prototype and presentation.<br>
        2. You can access your personalized participant dashboard anytime at <code>/dashboard</code>.<br>
        3. Important announcements and shortlist updates will be shared via email and your dashboard.
      </div>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Code-a-Nova. All rights reserved.
    </div>
  </div>
</body>
</html>
  `;
};

module.exports = {
  getOtpEmailTemplate,
  getRegistrationConfirmationTemplate,
};

