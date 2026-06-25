
'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Heart, MessageSquare } from 'lucide-react';

// Fixed (non‑random) styles for the decorative floating cells
const floatingCells = [
  {
    width: 180,
    height: 180,
    left: '15%',
    top: '20%',
    duration: '18s',
    delay: '0s',
  },
  {
    width: 140,
    height: 140,
    left: '75%',
    top: '60%',
    duration: '22s',
    delay: '1s',
  },
  {
    width: 220,
    height: 220,
    left: '40%',
    top: '10%',
    duration: '20s',
    delay: '2.5s',
  },
  {
    width: 160,
    height: 160,
    left: '85%',
    top: '30%',
    duration: '24s',
    delay: '0.5s',
  },
  {
    width: 200,
    height: 200,
    left: '25%',
    top: '80%',
    duration: '19s',
    delay: '3s',
  },
  {
    width: 130,
    height: 130,
    left: '60%',
    top: '45%',
    duration: '21s',
    delay: '1.5s',
  },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your actual API call or form submission logic
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 overflow-hidden">
      {/* Floating blood cells – now with fixed styles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {floatingCells.map((cell, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-red-500/20 blur-xl animate-float-${i + 1}`}
            style={{
              width: `${cell.width}px`,
              height: `${cell.height}px`,
              left: cell.left,
              top: cell.top,
              animationDuration: cell.duration,
              animationDelay: cell.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-red-400 bg-red-900/30 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-red-500/30">
            <Heart size={16} className="animate-pulse" />
            We're Here to Help
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Get In{' '}
            <span className="bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Have questions or want to join our life‑saving mission? Reach out to
            us — we respond within hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column – Contact Info */}
          <div className="space-y-8">
            <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-red-500/50 transition-all duration-500 hover:-translate-y-1 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Call Us</h3>
                  <p className="text-gray-400">+880 1700-000000</p>
                  <p className="text-gray-400">+880 1800-000000</p>
                </div>
              </div>
            </div>

            <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-red-500/50 transition-all duration-500 hover:-translate-y-1 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Email Us
                  </h3>
                  <p className="text-gray-400">support@bloodbridge.com</p>
                  <p className="text-gray-400">info@bloodbridge.com</p>
                </div>
              </div>
            </div>

            <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-red-500/50 transition-all duration-500 hover:-translate-y-1 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Visit Us
                  </h3>
                  <p className="text-gray-400">
                    123, Life Saver Road, Dhanmondi,
                    <br />
                    Dhaka-1205, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column – Contact Form */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare size={28} className="text-red-400" />
              <h3 className="text-2xl font-bold text-white">Send a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Donation query"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-300 hover:-translate-y-1"
              >
                <Send size={20} />
                Send Message
              </button>

              {submitted && (
                <div className="mt-4 p-3 bg-green-900/50 border border-green-500/50 rounded-xl text-green-300 text-center">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.1);
          }
        }
        .animate-float-1 {
          animation: float 18s infinite ease-in-out;
        }
        .animate-float-2 {
          animation: float 22s infinite ease-in-out;
        }
        .animate-float-3 {
          animation: float 20s infinite ease-in-out;
        }
        .animate-float-4 {
          animation: float 24s infinite ease-in-out;
        }
        .animate-float-5 {
          animation: float 19s infinite ease-in-out;
        }
        .animate-float-6 {
          animation: float 21s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default ContactUs;
