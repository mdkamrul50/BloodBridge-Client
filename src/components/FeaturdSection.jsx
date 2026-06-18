'use client';

import { useRef, useEffect, useState } from 'react';
import { HeartHandshake, ShieldCheck, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning-Fast Matching',
    desc: 'Find donors in your area within seconds during emergencies. Get real-time notifications and instant confirmations.',
    color: 'from-red-500 to-rose-600',
    shadow: 'shadow-red-500/30',
  },
  {
    icon: ShieldCheck,
    title: 'Verified & Secure',
    desc: 'Every donor and request goes through a strict verification process. Your personal data is completely encrypted and secure.',
    color: 'from-blue-500 to-indigo-600',
    shadow: 'shadow-blue-500/30',
  },
  {
    icon: Users,
    title: 'Community Driven',
    desc: 'Join a powerful network of thousands of blood donors. Together, we can make a difference and save lives.',
    color: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/30',
  },
  {
    icon: HeartHandshake,
    title: 'Intuitive Dashboard',
    desc: 'Track your donation history, discover upcoming camps, and get personalized health insights all in one place.',
    color: 'from-violet-500 to-purple-600',
    shadow: 'shadow-violet-500/30',
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: disconnect after revealing once so it doesn't reset
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Premium Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40rem] h-[40rem] bg-red-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] -right-[10%] w-[35rem] h-[35rem] bg-blue-50 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-[pulse_10s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="inline-flex items-center gap-2 text-red-600 bg-red-50 px-5 py-2 rounded-full text-sm font-bold mb-6 border border-red-100 shadow-sm uppercase tracking-wider">
            <Zap size={16} className="animate-pulse" />
            Why Choose BloodBridge
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Our Life-Saving <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We have combined modern technology with humanity to create a
            platform that makes blood donation simple, fast, and completely
            secure.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
          {features.map((feat, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: `${idx * 150}ms` }}
              className={`group relative bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-700 ease-out
                ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-20'
                }
              `}
            >
              {/* Subtle hover background gradient */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Icon Container with glowing shadow */}
              <div
                className={`w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-xl ${feat.shadow} transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500`}
              >
                <feat.icon size={32} strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                {feat.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {feat.desc}
              </p>

              {/* Animated Bottom Border on Hover */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 rounded-t-full bg-gradient-to-r from-red-500 to-rose-500 group-hover:w-1/2 transition-all duration-500 ease-out" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
