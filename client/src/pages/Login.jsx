import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const validate = () => {
    const errs = {};
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.password) {
      errs.password = 'Password is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setUnverifiedEmail('');
    try {
      await login(formData);
      toast.success('Authentication successful! Welcome back.');
      navigate(from, { replace: true });
    } catch (err) {
      const isUnverified =
        err.response?.status === 403 ||
        err.response?.data?.message?.toLowerCase().includes('not yet verified') ||
        err.response?.data?.message?.toLowerCase().includes('unverified');

      if (isUnverified) {
        setUnverifiedEmail(formData.email.trim().toLowerCase());
        toast.error('Your email is not verified yet. Please complete OTP verification.');
      } else {
        const msg = err.response?.data?.message || 'Invalid email or password.';
        toast.error(msg);
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
            Sign In to Code-a-Nova
          </h1>
          <p className="text-xs text-slate-400">
            Access your team registration, project deliverables, and participant portal.
          </p>
        </div>

        {/* Unverified account warning banner */}
        {unverifiedEmail && (
          <div className="bg-amber-950/40 border border-amber-500/40 rounded-[8px] p-4 flex items-start gap-3 shadow-sm animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs">
              <p className="text-amber-300 font-bold">Email Verification Required</p>
              <p className="text-amber-200/80">
                Your account is pending verification. Please enter the OTP sent to your email to activate it.
              </p>
              <Link
                to={`/verify-otp?email=${encodeURIComponent(unverifiedEmail)}`}
                className="inline-flex items-center gap-1 font-bold text-amber-300 hover:text-amber-200 underline"
              >
                Go to OTP Verification &rarr;
              </Link>
            </div>
          </div>
        )}

        <Card className="shadow-2xl border-white/10 bg-[#0F172A]/90 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              required
              type="email"
              placeholder="student@college.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              autoComplete="email"
            />

            <div className="relative">
              <Input
                label="Password"
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                autoComplete="current-password"
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

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="w-full gap-2 font-bold shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.45)]"
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          <div className="mt-6 border-t border-white/[0.08] pt-4 text-center">
            <p className="text-xs text-slate-400">
              Don't have an account yet?{' '}
              <Link to="/signup" className="font-bold text-cyan-400 hover:text-cyan-300">
                Create participant account &rarr;
              </Link>
            </p>
          </div>
        </Card>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Secure HTTP-Only Sessions &bull; Industry-Grade Encryption</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
