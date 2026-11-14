import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
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
    <div className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
      <div className="relative w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block group">
            <img
              src="/logo.png"
              alt="Code-a-Nova Logo"
              className="w-14 h-14 rounded-2xl object-contain mx-auto border border-slate-200 shadow-sm group-hover:scale-105 transition-transform"
            />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Sign In to Code-a-Nova
          </h1>
          <p className="text-xs text-slate-500">
            Access your team registration, project deliverables, and participant portal.
          </p>
        </div>

        {/* Unverified account warning banner */}
        {unverifiedEmail && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <p className="text-amber-900 font-bold">Email Verification Required</p>
              <p className="text-amber-800">
                Your account is pending verification. Please enter the OTP sent to your email to activate it.
              </p>
              <Link
                to={`/verify-otp?email=${encodeURIComponent(unverifiedEmail)}`}
                className="inline-flex items-center gap-1 font-bold text-amber-900 hover:underline"
              >
                Go to OTP Verification &rarr;
              </Link>
            </div>
          </div>
        )}

        <Card className="shadow-sm border-slate-200 bg-white">
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
                className="absolute right-3 top-8 text-slate-400 hover:text-slate-700 focus:outline-none cursor-pointer"
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
                className="w-full gap-2 font-bold shadow-xs"
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-4 text-center">
            <p className="text-xs text-slate-500">
              Don't have an account yet?{' '}
              <Link to="/signup" className="font-bold text-slate-900 hover:underline">
                Create participant account &rarr;
              </Link>
            </p>
          </div>
        </Card>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Secure HTTP-Only Sessions &bull; Salted Bcrypt Hashing</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
