'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import Image from 'next/image';
import logoImg from '@/assets/logo.png'; // Make sure this path is correct

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    bloodGroup: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.bloodGroup
    ) {
      setError('Please fill in all required fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms and Privacy Policy.');
      return;
    }

    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  return (
    // Deep Navy Base Background
    <div className=" min-h-screen flex items-center justify-center bg-[#020611] relative overflow-hidden p-4 sm:p-8 font-sans selection:bg-red-500/30">
      {/* Cinematic Neon Glow Backgrounds - More Subtle & Premium */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-red-600/15 rounded-full blur-[140px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-blue-600/10 rounded-full blur-[140px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_reverse]" />

        {/* Very subtle noise overlay for realistic texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Main Glassmorphism Container - Refined Borders and Shadows */}
      <div className="mt-10 relative w-full max-w-5xl bg-[#091120]/60 backdrop-blur-2xl border border-white/[0.08] rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row overflow-hidden z-10">
        {/* Left Side: Cinematic Branding */}
        <div
          className="hidden lg:flex w-5/12 relative p-12 flex-col justify-between border-r border-white/[0.05] bg-cover bg-center bg-no-repeat "
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=2070&auto=format&fit=crop')`,
            
          }}
        >
          {/* ডার্ক ওভারলে — টেক্সট ও এলিমেন্টের উপর রিডেবিলিটি বাড়াবে */}
          <div className="absolute inset-0 bg-black/60 z-0" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative overflow-hidden rounded-2xl p-2 backdrop-blur-md border border-white/5 group-hover:border-red-500/40 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all duration-500">
                <Image
                  src={logoImg}
                  height={32}
                  width={32}
                  alt="BloodBridge Logo"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-extrabold text-2xl tracking-tight text-white/90">
                  Blood<span className="text-red-500">Bridge</span>
                </h1>
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-400 mt-0.5">
                  Save Lives Together
                </p>
              </div>
            </Link>
          </div>

          <div className="relative z-10 space-y-6 mt-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wide">
              <ShieldCheck size={14} />
              SECURE & VERIFIED
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight">
              Start your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-rose-600">
                lifesaving
              </span>{' '}
              journey.
            </h1>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm font-light">
              Join thousands of heroes in your community. Every drop of blood
              you donate is a ray of hope for someone in need.
            </p>
          </div>

          <div className="relative z-10 mt-16">
            <div className="flex -space-x-3">
              {[45, 12, 32, 53].map((img, i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/150?img=${img}`}
                  className="w-10 h-10 rounded-full border-2 border-[#091120] object-cover ring-2 ring-white/5 "
                  alt="Donor"
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#091120] bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white/5">
                +2k
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 font-medium tracking-wide">
              Join our growing community
            </p>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-full lg:w-7/12 p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-[#070D18]/80">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Create Account
            </h2>
            <p className="text-slate-400 text-sm">
              Fill in the details to register as a donor.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1 tracking-wide uppercase">
                Full Name
              </label>
              <div className="relative group">
                <User
                  size={18}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'name' ? 'text-red-400' : 'text-slate-500'}`}
                />
                <input
                  type="text"
                  name="fullName"
                  required
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 focus:bg-red-500/[0.02] focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1 tracking-wide uppercase">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  size={18}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'email' ? 'text-red-400' : 'text-slate-500'}`}
                />
                <input
                  type="email"
                  name="email"
                  required
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 focus:bg-red-500/[0.02] focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1 tracking-wide uppercase">
                  Password
                </label>
                <div className="relative group">
                  <Lock
                    size={18}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'pass' ? 'text-red-400' : 'text-slate-500'}`}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    onFocus={() => setFocusedField('pass')}
                    onBlur={() => setFocusedField(null)}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 focus:bg-red-500/[0.02] focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1 tracking-wide uppercase">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock
                    size={18}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'cpass' ? 'text-red-400' : 'text-slate-500'}`}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    onFocus={() => setFocusedField('cpass')}
                    onBlur={() => setFocusedField(null)}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 focus:bg-red-500/[0.02] focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Bio Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1 tracking-wide uppercase">
                  Blood Group
                </label>
                <div className="relative group">
                  <select
                    name="bloodGroup"
                    required
                    onFocus={() => setFocusedField('blood')}
                    onBlur={() => setFocusedField(null)}
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full appearance-none pl-4 pr-10 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-red-500/50 focus:bg-red-500/[0.02] focus:ring-4 focus:ring-red-500/10 transition-all duration-300 cursor-pointer"
                  >
                    <option
                      value=""
                      disabled
                      className="bg-[#091120] text-slate-400"
                    >
                      Select group
                    </option>
                    {bloodGroups.map((group) => (
                      <option
                        key={group}
                        value={group}
                        className="bg-[#091120] text-white"
                      >
                        {group}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${focusedField === 'blood' ? 'text-red-400' : 'text-slate-500'}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1 tracking-wide uppercase">
                  Phone{' '}
                  <span className="text-slate-600 font-normal normal-case">
                    (optional)
                  </span>
                </label>
                <div className="relative group">
                  <Phone
                    size={18}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'phone' ? 'text-red-400' : 'text-slate-500'}`}
                  />
                  <input
                    type="tel"
                    name="phone"
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 focus:bg-red-500/[0.02] focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Terms and Error */}
            <div className="flex items-start gap-3 pt-2">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="peer appearance-none w-4 h-4 border border-slate-600 rounded bg-white/[0.03] checked:bg-red-500 checked:border-red-500 transition-colors cursor-pointer"
                />
                <ShieldCheck
                  size={12}
                  className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                />
              </div>
              <label
                htmlFor="terms"
                className="text-sm text-slate-400 cursor-pointer"
              >
                I agree to BloodBridge's{' '}
                <Link
                  href="/terms"
                  className="text-red-400 hover:text-red-300 font-medium transition-colors"
                >
                  Terms
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="text-red-400 hover:text-red-300 font-medium transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {error && (
              <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-semibold py-3.5 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} className="ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-slate-400 mt-8">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-white font-semibold hover:text-red-400 transition-colors underline decoration-white/20 underline-offset-4 hover:decoration-red-400/50"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
