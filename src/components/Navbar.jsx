'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Bell, ChevronDown } from 'lucide-react';
import Logo from '@/assets/logo.png'; 

const Navbar = ({ isLoggedIn = false, user = null }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // Scroll Effect Logic
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => router.push('/login');

  const handleLogout = () => {
    console.log('Logout');
    setDropdownOpen(false);
  };

  // Dynamic Text Colors based on scroll position
  const textColor = scrolled ? 'text-gray-700' : 'text-gray-100';
  const logoTextColor = scrolled ? 'text-gray-900' : 'text-white';

  // Premium Link Component with Animated Underline
  const NavItem = ({ path, label }) => {
    const isActive = pathname === path;
    return (
      <Link
        href={path}
        className={`relative font-medium transition-colors duration-300 group ${
          isActive ? 'text-red-500' : `${textColor} hover:text-red-400`
        }`}
      >
        {label}
        <span
          className={`absolute left-0 -bottom-1 h-[2px] w-full bg-red-500 origin-left transition-transform duration-300 ease-out ${
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </Link>
    );
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'backdrop-blur-2xl bg-white/50 border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative overflow-hidden rounded-full p-1 bg-white/10 backdrop-blur-sm border border-white/20 group-hover:border-red-500/50 transition-colors">
            <Image
              src={Logo}
              height={32}
              width={32}
              alt="BloodBridge Logo"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <h1
              className={`font-extrabold text-2xl tracking-tight transition-colors duration-300 ${logoTextColor}`}
            >
              Blood<span className="text-red-600">Bridge</span>
            </h1>
            <p
              className={`text-[10px] font-medium tracking-wider uppercase transition-colors duration-300 ${scrolled ? 'text-gray-500' : 'text-gray-300'}`}
            >
              Save Lives Together
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <NavItem path="/" label="Home" />
          <NavItem path="/donation-requests" label="Donation Requests" />
          <NavItem path="/funding" label="Funding" />
          <NavItem path="/dashboard" label="Dashboard" />

          {/* AUTH SECTION */}
          <div className="flex items-center gap-4 border-l border-gray-400/30 pl-6 ml-2">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/register"
                  className={`font-semibold transition-colors duration-300 ${
                    scrolled
                      ? 'text-gray-700 hover:text-red-600'
                      : 'text-white hover:text-red-400'
                  }`}
                >
                  Register
                </Link>

                <button
                  onClick={handleLogin}
                  className="relative overflow-hidden group bg-red-600 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Login</span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-red-500 to-red-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-5 relative">
                {/* Notification */}
                <button
                  className={`relative transition-colors ${scrolled ? 'text-gray-700 hover:text-red-600' : 'text-white hover:text-red-300'}`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white/50 animate-pulse" />
                </button>

                {/* USER PROFILE */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-white/10 p-1.5 rounded-full border border-white/20 hover:bg-white/20 transition backdrop-blur-sm"
                >
                  <Image
                    src={user?.avatar || '/default-avatar.png'}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                    alt="user"
                  />
                  <ChevronDown className={`w-4 h-4 mr-1 ${textColor}`} />
                </button>

                {/* DROPDOWN */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-14 w-56 bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-100 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                      <p className="font-semibold text-gray-800">
                        Hello, User!
                      </p>
                    </div>
                    <div className="p-2 flex flex-col gap-1">
                      <Link
                        href="/profile"
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/dashboard"
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                      >
                        Dashboard
                      </Link>
                      <div className="h-px bg-gray-100 my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-full transition-colors ${
            scrolled ? 'text-gray-900 bg-gray-100/50' : 'text-white bg-white/10'
          }`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU (Glassmorphism Slide Down) */}
      <div
        className={`md:hidden absolute top-full left-0 w-full backdrop-blur-2xl bg-white/95 border-b border-gray-200 shadow-xl transition-all duration-300 origin-top ${
          mobileOpen
            ? 'scale-y-100 opacity-100'
            : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          <Link
            href="/"
            className="text-gray-800 font-medium hover:text-red-600 transition"
          >
            Home
          </Link>
          <Link
            href="/donation-requests"
            className="text-gray-800 font-medium hover:text-red-600 transition"
          >
            Donation Requests
          </Link>
          <Link
            href="/funding"
            className="text-gray-800 font-medium hover:text-red-600 transition"
          >
            Funding
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-800 font-medium hover:text-red-600 transition"
          >
            Dashboard
          </Link>

          <div className="h-px bg-gray-200 my-2" />

          {!isLoggedIn ? (
            <div className="flex flex-col gap-3">
              <Link
                href="/register"
                className="text-center font-medium text-gray-700 py-2"
              >
                Register
              </Link>
              <button
                onClick={handleLogin}
                className="w-full bg-red-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-red-700 transition"
              >
                Login
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full text-center text-red-600 font-medium py-3 border border-red-200 rounded-xl hover:bg-red-50 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
