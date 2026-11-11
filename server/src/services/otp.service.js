const bcrypt = require('bcryptjs');
const generateOtp = require('../utils/generateOtp');

const OTP_EXPIRY_MINUTES = 10;
const RESEND_COOLDOWN_SECONDS = 60;

/**
 * Generates and saves a hashed OTP with a 10-minute expiration
 * @param {Object} user Mongoose User instance
 * @returns {Promise<{plainOtp: string, expiresAt: Date}>}
 */
const createAndSaveOtp = async (user) => {
  const plainOtp = generateOtp();
  const salt = await bcrypt.genSalt(10);
  const otpHash = await bcrypt.hash(plainOtp, salt);

  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  user.otpHash = otpHash;
  user.otpExpiresAt = expiresAt;
  user.otpLastSentAt = new Date();

  await user.save();

  return { plainOtp, expiresAt };
};

/**
 * Validates cooldown window between OTP resend attempts
 * @param {Object} user 
 * @returns {{allowed: boolean, waitSeconds: number}}
 */
const checkResendCooldown = (user) => {
  if (!user.otpLastSentAt) return { allowed: true, waitSeconds: 0 };

  const diffMs = Date.now() - new Date(user.otpLastSentAt).getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < RESEND_COOLDOWN_SECONDS) {
    return {
      allowed: false,
      waitSeconds: RESEND_COOLDOWN_SECONDS - diffSec,
    };
  }

  return { allowed: true, waitSeconds: 0 };
};

/**
 * Verifies the submitted OTP against the stored hash
 * @param {Object} user Mongoose User instance (with otpHash and otpExpiresAt selected)
 * @param {string} candidateOtp
 * @returns {Promise<{valid: boolean, message?: string}>}
 */
const verifyOtp = async (user, candidateOtp) => {
  if (!user.otpHash || !user.otpExpiresAt) {
    return { valid: false, message: 'No active OTP verification code found. Please request a new one.' };
  }

  // Check expiration (10 minutes)
  if (new Date() > new Date(user.otpExpiresAt)) {
    return { valid: false, message: 'This OTP verification code has expired. Please request a new one.' };
  }

  // Compare hash
  const isMatch = await bcrypt.compare(candidateOtp, user.otpHash);
  if (!isMatch) {
    return { valid: false, message: 'Invalid OTP code. Please check and try again.' };
  }

  // Single-use: Mark verified and invalidate stored OTP
  user.isEmailVerified = true;
  user.otpHash = undefined;
  user.otpExpiresAt = undefined;
  await user.save();

  return { valid: true };
};

module.exports = {
  createAndSaveOtp,
  checkResendCooldown,
  verifyOtp,
};

