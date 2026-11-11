const { getTransporter } = require('../config/mail');
const config = require('../config/environment');
const {
  getOtpEmailTemplate,
  getRegistrationConfirmationTemplate,
} = require('../utils/emailTemplates');

/**
 * Sends a branded OTP email to the user
 * @param {string} toEmail 
 * @param {string} fullName 
 * @param {string} otp 
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
const sendOtpEmail = async (toEmail, fullName, otp) => {
  try {
    const transporter = await getTransporter();
    const mailOptions = {
      from: config.email.from,
      to: toEmail,
      subject: `Code-a-Nova Verification Code: ${otp}`,
      html: getOtpEmailTemplate(fullName, otp),
      text: `Your Code-a-Nova verification code is ${otp}. It will expire in 10 minutes. Please do not share this code with anyone.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Service] OTP successfully sent to ${toEmail} (ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[Email Service] Failed to send OTP to ${toEmail}:`, error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Sends a registration confirmation email to the participant
 * @param {Object} registration Mongoose HackathonRegistration instance
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
const sendConfirmationEmail = async (registration) => {
  try {
    const transporter = await getTransporter();
    const mailOptions = {
      from: config.email.from,
      to: registration.email,
      subject: `Registration Confirmed - ${registration.projectName} [${registration.registrationId}]`,
      html: getRegistrationConfirmationTemplate(registration),
      text: `Congratulations ${registration.participantName}! Your registration for Code-a-Nova is confirmed. Reference ID: ${registration.registrationId}. Project: ${registration.projectName}. Track: ${registration.domain}.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(
      `[Email Service] Confirmation email sent to ${registration.email} (ID: ${info.messageId})`
    );

    // Update registration email delivery status
    registration.emailStatus = 'sent';
    await registration.save().catch((e) => console.error('Failed to update emailStatus:', e.message));

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(
      `[Email Service] Confirmation email failed for ${registration.email}:`,
      error.message
    );

    registration.emailStatus = 'failed';
    await registration.save().catch((e) => console.error('Failed to update emailStatus:', e.message));

    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOtpEmail,
  sendConfirmationEmail,
};

