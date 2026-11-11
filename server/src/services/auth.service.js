const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/environment');
const { createAndSaveOtp, verifyOtp, checkResendCooldown } = require('./otp.service');
const { sendOtpEmail } = require('./email.service');

const getCookieOptions = () => ({
  httpOnly: true,
  secure: config.env === 'production',
  sameSite: config.env === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role || 'participant',
    },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
};

const signup = async ({ fullName, email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Check if user already exists
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    if (existingUser.isEmailVerified) {
      const error = new Error('An account with this email address already exists. Please log in.');
      error.statusCode = 409;
      throw error;
    } else {
      // User exists but is unverified: update password and issue a fresh OTP
      const salt = await bcrypt.genSalt(10);
      existingUser.fullName = fullName.trim();
      existingUser.passwordHash = await bcrypt.hash(password, salt);
      await existingUser.save();

      const { plainOtp } = await createAndSaveOtp(existingUser);
      // Attempt sending email
      await sendOtpEmail(existingUser.email, existingUser.fullName, plainOtp);

      return {
        user: existingUser.toJSON(),
        email: existingUser.email,
        message: 'Account was already registered but unverified. A new verification code has been dispatched.',
      };
    }
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    fullName: fullName.trim(),
    email: normalizedEmail,
    passwordHash,
    isEmailVerified: false,
  });

  await newUser.save();

  // Create OTP and send email
  const { plainOtp } = await createAndSaveOtp(newUser);
  await sendOtpEmail(newUser.email, newUser.fullName, plainOtp);

  return {
    user: newUser.toJSON(),
    email: newUser.email,
    message: 'Account created. Verification code sent to your email address.',
  };
};

const verifyUserEmail = async ({ email, otp }) => {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail }).select('+otpHash +otpExpiresAt');

  if (!user) {
    const error = new Error('No account found with this email address.');
    error.statusCode = 404;
    throw error;
  }

  if (user.isEmailVerified) {
    return {
      verified: true,
      alreadyVerified: true,
      message: 'Account is already verified. You can proceed to log in.',
    };
  }

  const result = await verifyOtp(user, otp);
  if (!result.valid) {
    const error = new Error(result.message || 'OTP verification failed.');
    error.statusCode = 400;
    throw error;
  }

  return {
    verified: true,
    message: 'Email verified successfully. You may now log in to your account.',
  };
};

const resendUserOtp = async ({ email }) => {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail }).select('+otpHash +otpExpiresAt');

  if (!user) {
    const error = new Error('No account found with this email address.');
    error.statusCode = 404;
    throw error;
  }

  if (user.isEmailVerified) {
    const error = new Error('This account is already verified. You can log in directly.');
    error.statusCode = 400;
    throw error;
  }

  const cooldown = checkResendCooldown(user);
  if (!cooldown.allowed) {
    const error = new Error(
      `Please wait ${cooldown.waitSeconds} second(s) before requesting another OTP.`
    );
    error.statusCode = 429;
    throw error;
  }

  const { plainOtp } = await createAndSaveOtp(user);
  await sendOtpEmail(user.email, user.fullName, plainOtp);

  return {
    message: 'A fresh verification code has been dispatched to your email.',
  };
};

const login = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');

  if (!user) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  if (!user.isEmailVerified) {
    const error = new Error(
      'Your email address has not been verified yet. Please verify your account.'
    );
    error.statusCode = 403;
    error.unverified = true;
    error.email = user.email;
    throw error;
  }

  const token = generateToken(user);

  return {
    user: user.toJSON(),
    token,
  };
};

module.exports = {
  signup,
  verifyUserEmail,
  resendUserOtp,
  login,
  generateToken,
  getCookieOptions,
};

