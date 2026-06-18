// components/WhyDonateSection.jsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { Heart, Activity, Users, Stethoscope } from 'lucide-react';

// Fixed decorative floating cells (no randomness → no hydration mismatch)
const floatingCells = [
  {
    width: 120,
    height: 120,
    left: '10%',
    top: '25%',
    duration: '15s',
    delay: '0s',
  },
  {
    width: 160,
    height: 160,
    left: '85%',
    top: '65%',
    duration: '18s',
    delay: '2s',
  },
  {
    width: 100,
    height: 100,
    left: '50%',
    top: '15%',
    duration: '14s',
    delay: '1s',
  },
];

// Reasons data
const reasons = [
  {
    icon: Heart,
    title: 'Save Lives',
    desc: 'One donation can save up to three lives. Your blood is the most precious gift you can give to someone in need.',
    gradient: 'from-red-600 to-rose-600',
  },
  {
    icon: Activity,
    title: 'Health Benefits',
    desc: 'Regular donation reduces iron overload, lowers risk of heart disease, and stimulates new blood cell production.',
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    icon: Users,
    title: 'Community Impact',
    desc: 'Join a nationwide network of heroes. Your contribution strengthens the healthcare system for everyone.',
    gradient: 'from-emerald-600 to-teal-600',
  },
  {
    icon: Stethoscope,
    title: 'Free Health Check-up',
    desc: 'Every donor receives a mini physical (BP, hemoglobin, etc.) and screening for infectious diseases.',
    gradient: 'from-violet-600 to-purple-600',
  },
];

// Statistics (target values for the counters)
const stats = [
  { label: 'Lives Saved', target: 12480, suffix: '+' },
  { label: 'Registered Donors', target: 8420, suffix: '+' },
  { label: 'Successful Donations', target: 6300, suffix: '+' },
];

const WhyDonateSection = () => {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  // Animate counters when the section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          stats.forEach((stat, idx) => {
            const step = stat.target / 60; // 60 frames for ~1s animation
            let current = 0;
            const interval = setInterval(() => {
              current += step;
              if (current >= stat.target) {
                current = stat.target;
                clearInterval(interval);
              }
              setCounters((prev) => {
                const next = [...prev];
                next[idx] = Math.floor(current);
                return next;
              });
            }, 16);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-gray-900 via-red-900/70 to-gray-900 overflow-hidden"
    >
      {/* Floating blood cells */}
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
            The Gift of Life
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Why{' '}
            <span className="bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
              Donate Blood
            </span>
            ?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Every 2 seconds someone needs blood. Your decision to donate can
            turn a tragedy into a miracle.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-red-500/50 transition-all duration-500 hover:-translate-y-2 shadow-xl"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform`}
              >
                <reason.icon size={28} />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{reason.desc}</p>

              {/* Bottom glow on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Statistics Counter */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                  {counters[idx].toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations for floating cells */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-25px) scale(1.05);
          }
        }
        .animate-float-1 {
          animation: float 15s infinite ease-in-out;
        }
        .animate-float-2 {
          animation: float 18s infinite ease-in-out;
        }
        .animate-float-3 {
          animation: float 14s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default WhyDonateSection;
