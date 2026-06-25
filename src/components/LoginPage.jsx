
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

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
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    // Simulate API call (replace with real authentication logic)
    setTimeout(() => {
      // Fake check – replace with your actual auth call
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
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-red-950 to-slate-900">
      {/* LEFT SIDE – FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12 sm:px-8 lg:px-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo & Back link */}
          <div className="text-center lg:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors mb-6"
            >
              <Heart size={20} className="animate-pulse" />
              <span className="font-semibold">BloodBridge</span>
            </Link>
            <h1 className="text-4xl font-extrabold text-white">Welcome back</h1>
            <p className="mt-2 text-gray-400">
              Log in to your account and continue saving lives.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded bg-white/5 border-gray-600 accent-red-600"
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
              <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-xl text-red-300 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-600/25 transition-all disabled:opacity-70"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                <>
                  Log In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Social login (optional) */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-900 text-gray-400">
                or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-gray-700 rounded-2xl text-gray-300 hover:bg-white/10 transition">
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
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-gray-700 rounded-2xl text-gray-300 hover:bg-white/10 transition">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Bottom link */}
          <p className="text-center text-gray-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-red-400 font-semibold hover:text-red-300 transition"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE – VISUAL / ILLUSTRATION */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-red-600/20 to-rose-600/20 items-center justify-center">
        {/* Decorative blood cells */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-60 h-60 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl" />
        </div>

        {/* Main illustration (replace with your own) */}
        <div className="relative z-10 text-center px-8">
          <div className="mx-auto w-48 h-48 mb-8">
            <svg
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="60" r="55" fill="url(#paint0_linear)" />
              <path
                d="M60 30 C60 30 40 50 40 70 C40 85 52 95 60 95 C68 95 80 85 80 70 C80 50 60 30 60 30Z"
                fill="#fff"
                opacity="0.9"
              />
              <circle cx="55" cy="60" r="4" fill="#e53e3e" />
              <circle cx="65" cy="60" r="4" fill="#e53e3e" />
              <path
                d="M54 70 C54 70 58 75 60 75 C62 75 66 70 66 70"
                stroke="#e53e3e"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="0"
                  y1="0"
                  x2="120"
                  y2="120"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E53E3E" />
                  <stop offset="1" stopColor="#BE123C" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Save a life today
          </h2>
          <p className="text-red-100 max-w-xs mx-auto">
            Every 2 seconds someone needs blood. Your login brings us one step
            closer to a lifesaving connection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
