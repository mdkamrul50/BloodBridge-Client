// app/login/page.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Droplets,
} from 'lucide-react';

const FloatingBloodCell = ({ size, top, left, delay, duration }) => (
  <div
    className="absolute rounded-full bg-red-600/20 blur-2xl"
    style={{
      width: size,
      height: size,
      top,
      left,
      animation: `float ${duration} ${delay} infinite ease-in-out`,
      opacity: 0.6,
    }}
  />
);

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    // --- REPLACE WITH YOUR AUTH LOGIC ---
    setTimeout(() => {
      if (
        formData.email === 'test@bloodbridge.com' &&
        formData.password === '123456'
      ) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password.');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0b0f1c] overflow-hidden px-4 py-12">
      {/* Animated background with floating blood cells */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingBloodCell
          size="300px"
          top="10%"
          left="5%"
          delay="0s"
          duration="15s"
        />
        <FloatingBloodCell
          size="400px"
          top="70%"
          left="80%"
          delay="2s"
          duration="20s"
        />
        <FloatingBloodCell
          size="250px"
          top="40%"
          left="60%"
          delay="4s"
          duration="18s"
        />
        <FloatingBloodCell
          size="200px"
          top="80%"
          left="20%"
          delay="1s"
          duration="14s"
        />
      </div>

      {/* Main card – glass effect */}
      <div className="relative w-full max-w-5xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-2xl shadow-red-900/20 grid lg:grid-cols-2 overflow-hidden z-10">
        {/* Left: Illustration / branding */}
        <div className="hidden lg:flex flex-col justify-center items-center p-10 bg-gradient-to-br from-red-700/40 to-rose-800/30 relative">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 text-center space-y-6">
            <div className="mx-auto w-40 h-40 flex items-center justify-center bg-white/10 rounded-full p-6 shadow-[0_0_60px_rgba(220,38,38,0.3)]">
              <Droplets size={72} className="text-red-300 drop-shadow-lg" />
            </div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">
              BloodBridge
            </h2>
            <p className="text-red-100/80 max-w-xs mx-auto">
              Every drop brings hope. Log in to continue your lifesaving
              mission.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back</h1>
              <p className="text-gray-400 mt-1">
                Please sign in to your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-600 bg-white/5 accent-red-600"
                  />
                  Remember me
                </label>
                <Link
                  href="/forgot-password"
                  className="text-red-400 hover:text-red-300 transition"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error message */}
              {error && (
                <div className="p-3 text-sm bg-red-900/20 border border-red-500/30 rounded-2xl text-red-300 text-center">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-red-600/25 transition-all disabled:opacity-70 group"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                ) : (
                  <>
                    Sign In
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#0b0f1c] text-gray-500">
                  or continue with
                </span>
              </div>
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-gray-700 rounded-2xl text-gray-300 hover:bg-white/10 transition font-medium">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-gray-700 rounded-2xl text-gray-300 hover:bg-white/10 transition font-medium">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>

            {/* Register link */}
            <p className="text-center text-gray-400 mt-6">
              Don’t have an account?{' '}
              <Link
                href="/register"
                className="text-red-400 font-semibold hover:text-red-300 transition"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Global animation for floating cells */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
