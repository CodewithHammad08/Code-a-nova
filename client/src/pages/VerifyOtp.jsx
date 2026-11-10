import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { KeyRound, RotateCw, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const VerifyOtp = () => {
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get('email') || '';

  const [email, setEmail] = useState(emailParam);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Expiry countdown: 10 minutes (600s)
  const [expirySeconds, setExpirySeconds] = useState(600);
  // Resend cooldown: 60 seconds
  const [cooldownSeconds, setCooldownSeconds] = useState(60);

  const inputRefs = useRef([]);
  const { verifyOtp, resendOtp } = useAuth();
  const navigate = useNavigate();

  // Expiry and cooldown interval
  useEffect(() => {
    const timer = setInterval(() => {
      setExpirySeconds((prev) => (prev > 0 ? prev - 1 : 0));
      setCooldownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index, value) => {
    // Only accept numeric input
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take latest typed digit
    setOtp(newOtp);

    // Auto-advance focus
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');

    if (fullOtp.length !== 6) {
      toast.error('Please enter all 6 digits of your OTP.');
      return;
    }

    if (!email) {
      toast.error('Email address is missing. Please re-enter your email.');
      return;
    }

    setIsVerifying(true);
    try {
      const res = await verifyOtp({ email, otp: fullOtp });
      setIsSuccess(true);
      toast.success(res?.message || 'Email verified successfully! You can now log in.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid or expired OTP. Please try again.';
      toast.error(msg);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (cooldownSeconds > 0) return;
    if (!email) {
      toast.error('Email address required to resend OTP.');
      return;
    }

    setIsResending(true);
    try {
      await resendOtp({ email });
      toast.success('A new verification code has been dispatched.');
      setCooldownSeconds(60);
      setExpirySeconds(600);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to resend OTP. Please wait a moment.';
      toast.error(msg);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-[5px] bg-[#17243A] text-[#D6A64F] flex items-center justify-center mx-auto">
            <KeyRound className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#17243A] tracking-tight">
            Verify Your Email Address
          </h1>
          <p className="text-xs text-[#6B7280]">
            We dispatched a 6-digit confirmation code to{' '}
            <strong className="text-[#17243A] font-semibold">
              {email || 'your email'}
            </strong>
          </p>
        </div>

        <Card className="shadow-sm">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 bg-[#21845B]/10 rounded-full flex items-center justify-center mx-auto text-[#21845B]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#17243A]">Verification Confirmed!</h3>
              <p className="text-xs text-[#6B7280]">
                Your account is now activated. Redirecting you to login...
              </p>
              <Link to="/login">
                <Button variant="primary" size="sm" className="gap-2">
                  <span>Sign In to Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {!emailParam && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#17243A] mb-1.5">
                    Confirm Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter the registered email"
                    className="w-full rounded-[5px] border border-[#E5E7EB] px-3.5 py-2 text-sm text-[#20242B]"
                  />
                </div>
              )}

              {/* 6 Individual OTP inputs */}
              <div className="space-y-2">
                <label className="block text-center text-xs font-semibold uppercase tracking-wider text-[#17243A]">
                  Enter 6-Digit Code
                </label>
                <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      autoFocus={index === 0}
                      className="w-11 h-12 sm:w-12 sm:h-14 text-center font-mono font-bold text-lg sm:text-xl text-[#17243A] bg-white border border-[#E5E7EB] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-[#17243A] focus:border-[#17243A] transition-colors"
                    />
                  ))}
                </div>
              </div>

              {/* Expiry Notice */}
              <div className="text-center text-xs text-[#6B7280]">
                {expirySeconds > 0 ? (
                  <span>
                    Code expires in{' '}
                    <strong className="text-[#17243A] font-mono">
                      {formatTime(expirySeconds)}
                    </strong>
                  </span>
                ) : (
                  <span className="text-[#C44545] font-semibold">
                    Code expired. Please request a new code.
                  </span>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isVerifying}
                disabled={otp.join('').length !== 6 || expirySeconds === 0}
                className="w-full"
              >
                Verify & Activate Account
              </Button>

              {/* Resend OTP */}
              <div className="border-t border-[#E5E7EB] pt-4 flex items-center justify-between text-xs">
                <span className="text-[#6B7280]">Didn't receive the email?</span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldownSeconds > 0 || isResending}
                  className="font-semibold text-[#17243A] hover:underline disabled:text-[#9CA3AF] disabled:no-underline inline-flex items-center gap-1"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                  {cooldownSeconds > 0
                    ? `Resend in ${cooldownSeconds}s`
                    : 'Resend Code'}
                </button>
              </div>
            </form>
          )}
        </Card>

        <div className="text-center">
          <Link to="/login" className="text-xs text-[#6B7280] hover:text-[#17243A] underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
