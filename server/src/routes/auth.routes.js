const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const {
  signupValidator,
  loginValidator,
  verifyOtpValidator,
  resendOtpValidator,
} = require('../validators/auth.validator');
const validate = require('../middleware/validate.middleware');
const { authenticate } = require('../middleware/auth.middleware');
const { authLimiter, otpLimiter } = require('../middleware/rateLimit.middleware');

router.post('/signup', authLimiter, signupValidator, validate, authController.signup);
router.post('/verify-otp', otpLimiter, verifyOtpValidator, validate, authController.verifyOtp);
router.post('/resend-otp', otpLimiter, resendOtpValidator, validate, authController.resendOtp);
router.post('/login', authLimiter, loginValidator, validate, authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.getMe);

module.exports = router;

