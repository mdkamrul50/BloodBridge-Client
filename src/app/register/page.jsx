'use client';

import { useState, useEffect, useRef } from 'react';
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
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import Image from 'next/image';
import logoImg from '@/assets/logo.png';
import { authClient } from '@/lib/auth-client'; 

import districtsRaw from '../../../data/districts.json';
import upazilasRaw from '../../../data/upazilas.json';
import toast from 'react-hot-toast';

const districtsInfo = districtsRaw[2].data;
const upazilasInfo = upazilasRaw[2].data;

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const RegisterPage = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    bloodGroup: '',
    phone: '',
    district: '',
    upazila: '',
    avatarUrl: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Avatar upload states
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  // District & Upazila state
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    if (formData.district) {
      const selectedDistrict = districtsInfo.find(
        (d) => d.name === formData.district
      );
      if (selectedDistrict) {
        const upazilas = upazilasInfo.filter(
          (u) => u.district_id === selectedDistrict.id
        );
        setFilteredUpazilas(upazilas);

        if (!upazilas.find((u) => u.name === formData.upazila)) {
          setFormData((prev) => ({ ...prev, upazila: '' }));
        }
      }
    } else {
      setFilteredUpazilas([]);
      setFormData((prev) => ({ ...prev, upazila: '' }));
    }
  }, [formData.district]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // Avatar upload to ImageBB
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);

    setAvatarUploading(true);
    const apiKey = '9fe474f0963f1d16fc425bca88d257cb';

    const formPayload = new FormData();
    formPayload.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formPayload,
      });
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, avatarUrl: data.data.url }));
      } else {
        setError('Avatar upload failed. Please try again.');
        setAvatarPreview(null);
      }
    } catch (err) {
      setError('Avatar upload error. Check your connection.');
      setAvatarPreview(null);
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- Validation (existing) ---
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.bloodGroup ||
      !formData.district ||
      !formData.upazila
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

    try {
      // Better Auth sign-up
      const { data, error: signUpError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.fullName,
        password: formData.password,
        image: formData.avatarUrl,
        // Additional data as metadata (if your schema supports it)
        metadata: {
          bloodGroup: formData.bloodGroup,
          district: formData.district,
          upazila: formData.upazila,
          phone: formData.phone,
          avatarUrl: formData.avatarUrl,
        },
      });

      if (signUpError) {
        // Handle specific error messages
        setError(signUpError.message || 'Registration failed');
        toast.error(signUpError.message || 'Registration failed.');
        setLoading(false);
        return;
      }

      // Success – redirect to dashboard or login
      toast.success('Registration successful! ');
      router.push('/dashboard');
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020611] relative overflow-hidden p-4 sm:p-8 font-sans selection:bg-red-500/30">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-red-600/15 rounded-full blur-[140px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-blue-600/10 rounded-full blur-[140px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Main container */}
      <div className="mt-10 relative w-full max-w-5xl bg-[#091120]/60 backdrop-blur-2xl border border-white/[0.08] rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row overflow-hidden z-10">
        {/* Left Side - Branding (unchanged) */}
        <div
          className="hidden lg:flex w-5/12 relative p-12 flex-col justify-between border-r border-white/[0.05] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
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
                  className="w-10 h-10 rounded-full border-2 border-[#091120] object-cover ring-2 ring-white/5"
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

        {/* Right Side - Form (updated) */}
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
            {/* Avatar Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1 tracking-wide uppercase">
                Avatar (optional)
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-white/20 bg-white/[0.03] flex items-center justify-center overflow-hidden group cursor-pointer hover:border-red-500/50 transition-colors">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon
                      size={24}
                      className="text-slate-500 group-hover:text-red-400 transition-colors"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={avatarUploading}
                  />
                </div>
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                    disabled={avatarUploading}
                  >
                    <Upload size={14} />
                    {avatarUploading ? 'Uploading...' : 'Choose Image'}
                  </button>
                  <p className="text-[10px] text-slate-500 mt-1">
                    JPG, PNG, up to 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1 tracking-wide uppercase">
                Full Name
              </label>
              <div className="relative group">
                <User
                  size={18}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === 'name' ? 'text-red-400' : 'text-slate-500'
                  }`}
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
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === 'email' ? 'text-red-400' : 'text-slate-500'
                  }`}
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

            {/* Password & Confirm Password Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1 tracking-wide uppercase">
                  Password
                </label>
                <div className="relative group">
                  <Lock
                    size={18}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'pass'
                        ? 'text-red-400'
                        : 'text-slate-500'
                    }`}
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
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'cpass'
                        ? 'text-red-400'
                        : 'text-slate-500'
                    }`}
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

            {/* Blood Group & District Grid */}
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
                    className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${
                      focusedField === 'blood'
                        ? 'text-red-400'
                        : 'text-slate-500'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1 tracking-wide uppercase">
                  District
                </label>
                <div className="relative group">
                  <select
                    name="district"
                    required
                    onFocus={() => setFocusedField('district')}
                    onBlur={() => setFocusedField(null)}
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full appearance-none pl-4 pr-10 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-red-500/50 focus:bg-red-500/[0.02] focus:ring-4 focus:ring-red-500/10 transition-all duration-300 cursor-pointer"
                  >
                    <option
                      value=""
                      disabled
                      className="bg-[#091120] text-slate-400"
                    >
                      Select district
                    </option>
                    {districtsInfo.map((district) => (
                      <option
                        key={district.id}
                        value={district.name}
                        className="bg-[#091120] text-white"
                      >
                        {district.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${
                      focusedField === 'district'
                        ? 'text-red-400'
                        : 'text-slate-500'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Upazila & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1 tracking-wide uppercase">
                  Upazila
                </label>
                <div className="relative group">
                  <select
                    name="upazila"
                    required
                    onFocus={() => setFocusedField('upazila')}
                    onBlur={() => setFocusedField(null)}
                    value={formData.upazila}
                    onChange={handleChange}
                    disabled={!formData.district}
                    className="w-full appearance-none pl-4 pr-10 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-red-500/50 focus:bg-red-500/[0.02] focus:ring-4 focus:ring-red-500/10 transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <option
                      value=""
                      disabled
                      className="bg-[#091120] text-slate-400"
                    >
                      Select upazila
                    </option>
                    {filteredUpazilas.map((upazila) => (
                      <option
                        key={upazila.id}
                        value={upazila.name}
                        className="bg-[#091120] text-white"
                      >
                        {upazila.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${
                      focusedField === 'upazila'
                        ? 'text-red-400'
                        : 'text-slate-500'
                    }`}
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
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'phone'
                        ? 'text-red-400'
                        : 'text-slate-500'
                    }`}
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
