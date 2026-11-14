import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  User,
} from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  // Password Strength Calculation
  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;
    return score;
  };

  const passwordScore = getPasswordStrength(formData.password);

  const getStrengthLabel = (score) => {
    if (!formData.password) return { text: '', color: 'bg-transparent' };
    if (score <= 2) return { text: 'Weak', color: 'bg-rose-500' };
    if (score === 3) return { text: 'Fair', color: 'bg-amber-400' };
    if (score === 4) return { text: 'Good', color: 'bg-cyan-400' };
    return { text: 'Strong', color: 'bg-emerald-400' };
  };

  const strength = getStrengthLabel(passwordScore);

  const validate = () => {
    const errs = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errs.fullName = 'Full Name must be at least 3 characters long';
    } else if (!/^[a-zA-Z\s.'-]+$/.test(formData.fullName.trim())) {
      errs.fullName = 'Full Name should only contain letters and standard name characters';
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errs.password = 'Password must be at least 8 characters long';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errs.password = 'Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number';
    }

    if (formData.confirmPassword !== formData.password) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await signup(formData);
      toast.success(res?.message || 'Verification code dispatched to your email.');
      navigate(`/verify-otp?email=${encodeURIComponent(formData.email.trim().toLowerCase())}`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(msg);
      if (err.response?.data?.errors) {
        const fieldErrors = {};
        err.response.data.errors.forEach((e) => {
          if (e.field) fieldErrors[e.field] = e.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#080C14] bg-tech-dots overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow-navy -top-20 -left-20 opacity-60" />
      <div className="ambient-glow-cyan -bottom-20 -right-20 opacity-50" />

      <div className="relative w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block group">
            <img
              src="/logo.png"
              alt="Code-a-Nova Logo"
              className="w-14 h-14 rounded-[10px] object-contain mx-auto shadow-[0_0_20px_rgba(56,189,248,0.3)] group-hover:scale-105 transition-transform"
            />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Create Participant Account
          </h1>
          <p className="text-xs text-slate-400">
            Sign up to register your team, submit project materials, and access your dashboard.
          </p>
        </div>

        <Card className="shadow-2xl border-white/10 bg-[#0F172A]/90 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              required
              placeholder="e.g. Priyanshu Sharma"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              error={errors.fullName}
            />

            <Input
              label="Email Address"
              required
              type="email"
              placeholder="student@college.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              helperText="A single-use 6-digit OTP will be dispatched to this address."
            />

            <div className="relative">
              <Input
                label="Password"
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-slate-400 hover:text-white focus:outline-none cursor-pointer"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">Password Complexity:</span>
                  <span className="font-bold text-cyan-300">{strength.text}</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`h-full flex-1 transition-colors ${
                        i <= passwordScore ? strength.color : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 font-mono">
                  <span className={formData.password.length >= 8 ? 'text-emerald-400 font-bold' : ''}>
                    ✓ 8+ chars
                  </span>
                  <span className={/[A-Z]/.test(formData.password) ? 'text-emerald-400 font-bold' : ''}>
                    ✓ Uppercase
                  </span>
                  <span className={/[a-z]/.test(formData.password) ? 'text-emerald-400 font-bold' : ''}>
                    ✓ Lowercase
                  </span>
                  <span className={/\d/.test(formData.password) ? 'text-emerald-400 font-bold' : ''}>
                    ✓ Number
                  </span>
                </div>
              </div>
            )}

            <Input
              label="Confirm Password"
              required
              type={showPassword ? 'text' : 'password'}
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="w-full gap-2 font-bold shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.45)]"
              >
                <span>Continue to OTP Verification</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          <div className="mt-6 border-t border-white/[0.08] pt-4 text-center">
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-cyan-400 hover:text-cyan-300">
                Sign in here &rarr;
              </Link>
            </p>
          </div>
        </Card>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted with salted bcrypt &bull; 10-Minute Expiry OTP</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
