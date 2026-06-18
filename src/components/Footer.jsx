// components/Footer.jsx
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import Logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 text-gray-300 pt-16 pb-8 border-t border-red-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
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
                  className="font-extrabold text-2xl tracking-tight transition-colors duration-300"
                >
                  Blood<span className="text-red-600">Bridge</span>
                </h1>
                <p
                  className="text-[10px] font-medium tracking-wider uppercase transition-colors duration-300 "
                >
                  Save Lives Together
                </p>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Connecting donors with patients in need. Every drop counts —
              together we save lives across Bangladesh.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/donation-requests"
                  className="hover:text-red-400 transition-colors"
                >
                  Donation Requests
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="hover:text-red-400 transition-colors"
                >
                  Search Donors
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-red-400 transition-colors"
                >
                  Join as Donor
                </Link>
              </li>
              <li>
                <Link
                  href="/funding"
                  className="hover:text-red-400 transition-colors"
                >
                  Funding
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="hover:text-red-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-red-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-red-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-red-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-red-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-red-400 flex-shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-red-400 flex-shrink-0" />
                <span>support@bloodbridge.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-red-400 flex-shrink-0 mt-1" />
                <span>123 Life Saver Road, Dhanmondi, Dhaka-1205</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            © {currentYear} BloodBridge. Made with{' '}
            <Heart size={14} className="text-red-500 fill-red-500 inline" /> for
            humanity.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link
              href="/privacy"
              className="hover:text-red-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-red-400 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="hover:text-red-400 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
