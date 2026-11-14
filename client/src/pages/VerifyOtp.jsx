import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { KeyRound, RotateCw, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const VerifyOtp = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
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
    const code = otp.join('');
    if (code.length !== 6) {
      toast.error('Please enter the full 6-digit verification code.');
      return;
    }

    if (!email) {
      toast.error('Email address required.');
      return;
    }

    setIsVerifying(true);
    try {
      await verifyOtp({ email, otp: code });
      setIsSuccess(true);
      toast.success('Email verified successfully! You may now sign in.');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
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
      toast.success('A new verification code has been dispatched to your email.');
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
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#080C14] bg-tech-dots overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow-navy -top-20 -left-20 opacity-60" />
      <div className="ambient-glow-cyan -bottom-20 -right-20 opacity-50" />

      <div className="relative w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block group mb-1">
            <img
              src="/logo.png"
              alt="Code-a-Nova Logo"
              className="w-14 h-14 rounded-[10px] object-contain mx-auto shadow-[0_0_20px_rgba(56,189,248,0.3)] group-hover:scale-105 transition-transform"
            />
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight font-display">
            Verify Your Email Address
          </h1>
          <p className="text-xs text-slate-400">
            We dispatched a 6-digit confirmation code to{' '}
            <strong className="text-cyan-300 font-mono">
              {email || 'your email'}
            </strong>
          </p>
        </div>

        <Card className="shadow-2xl border-white/10 bg-[#0F172A]/90 backdrop-blur-md">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Verification Confirmed!</h3>
              <p className="text-xs text-slate-400">
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                    Confirm Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter the registered email"
                    className="w-full rounded-[6px] border border-white/10 px-3.5 py-2.5 text-sm text-white bg-[#0B0F19] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/30"
                  />
                </div>
              )}

              {/* 6 Individual OTP inputs */}
              <div className="space-y-2.5">
                <label className="block text-center text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
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
                      className="w-11 h-12 sm:w-12 sm:h-14 text-center font-mono font-bold text-lg sm:text-xl text-white bg-[#0B0F19] border border-white/10 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all shadow-inner"
                    />
                  ))}
                </div>
              </div>

              {/* Expiry Notice */}
              <div className="text-center text-xs text-slate-400">
                {expirySeconds > 0 ? (
                  <span>
                    Code expires in{' '}
                    <strong className="text-amber-300 font-mono">
                      {formatTime(expirySeconds)}
                    </strong>
                  </span>
                ) : (
                  <span className="text-rose-400 font-semibold font-mono">
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
                className="w-full font-bold shadow-[0_0_20px_rgba(56,189,248,0.3)]"
              >
                Verify &amp; Activate Account
              </Button>

              {/* Resend OTP */}
              <div className="border-t border-white/[0.08] pt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400">Didn't receive the email?</span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldownSeconds > 0 || isResending}
                  className="font-semibold text-cyan-400 hover:text-cyan-300 disabled:text-slate-600 disabled:no-underline inline-flex items-center gap-1.5 cursor-pointer font-mono"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                  {cooldownSeconds > 0
                    ? `Resend in ${cooldownSeconds}s`
                    : 'Resend Code'}
                </button>
              </div>

              <div className="bg-[#0B0F19] p-3 rounded-[6px] border border-white/10 text-[11px] text-slate-400 text-center leading-normal">
                Check your inbox (or spam folder) for the 6-digit verification code.
              </div>
            </form>
          )}
        </Card>

        <div className="text-center">
          <Link to="/login" className="text-xs text-slate-400 hover:text-cyan-300 underline font-mono">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
