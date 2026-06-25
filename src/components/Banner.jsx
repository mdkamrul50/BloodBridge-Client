'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, HeartPulse } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4',
    title: 'Donate Blood, Save Lives',
    desc: 'Every drop counts. Become a hero today and bring hope to those in need.',
  },
  {
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309',
    title: 'Find Donors Instantly',
    desc: 'Connect with verified blood donors in emergencies with just a few clicks.',
  },
  {
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118',
    title: 'Join Bangladesh Blood Network',
    desc: 'A smart, reliable, and life-saving platform for our community.',
  },
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds gives enough time to read and enjoy the animation

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[85vh] overflow-hidden bg-black">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index
              ? 'opacity-100 z-10 pointer-events-auto'
              : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* BACKGROUND IMAGE WITH KEN BURNS EFFECT */}
          <img
            src={slide.image}
            alt="blood donation"
            className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
              i === index ? 'scale-110' : 'scale-100'
            }`}
          />

          {/* PREMIUM GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

          {/* CONTENT CARD (Animated with the slide) */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
            <div
              className={`transform transition-all duration-1000 delay-300 ease-out ${
                i === index
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
              } backdrop-blur-xl bg-white/10 border border-white/20 p-8 md:p-14 rounded-3xl max-w-3xl text-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)]`}
            >
              {/* Badge */}
              <div className="inline-flex items-center justify-center gap-2 text-sm md:text-base font-medium mb-6 text-red-300 bg-red-950/40 px-4 py-2 rounded-full border border-red-500/30">
                <HeartPulse size={18} className="animate-pulse" />
                Trusted Blood Donation Platform
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="mt-5 text-gray-200 text-lg md:text-xl font-light max-w-xl mx-auto drop-shadow-md">
                {slide.desc}
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
                <Link
                  href="/register"
                  className="group bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] hover:-translate-y-1"
                >
                  Become Donor
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <Link
                  href="/search-blood-request"
                  className="group border border-white/50 bg-white/5 hover:bg-white hover:text-black px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm hover:-translate-y-1"
                >
                  Find Donors
                  <Search
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* MODERN PILL NAVIGATION */}
      <div className="absolute bottom-8 w-full flex justify-center gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
              i === index
                ? 'w-10 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]'
                : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
