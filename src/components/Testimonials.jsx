'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Fatima Akhter',
    role: 'Blood Donor',
    avatar: 'https://i.pravatar.cc/150?img=45',
    quote:
      'Donating blood for the first time through BloodBridge was a life-changing experience. I felt an immense sense of pride knowing I helped save a child’s life. The process was seamless and the team was incredibly supportive.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rafiq Hasan',
    role: 'Recipient Family Member',
    avatar: 'https://i.pravatar.cc/150?img=12',
    quote:
      'When my mother needed an emergency transfusion, BloodBridge connected us with a donor within minutes. I will forever be grateful. This platform is a true blessing for our community.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ayesha Siddiqua',
    role: 'Regular Donor',
    avatar: 'https://i.pravatar.cc/150?img=32',
    quote:
      'I’ve donated 8 times through BloodBridge. Each time I’m reminded why I started – the joy on a recipient’s face is priceless. The health tracking feature keeps me motivated.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Kazi Nazrul',
    role: 'Blood Recipient',
    avatar: 'https://i.pravatar.cc/150?img=53',
    quote:
      'After a major surgery, I needed 3 bags of blood. BloodBridge volunteers showed up like angels. I’m now a donor myself – because I know what it means to receive.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Sadia Rahman',
    role: 'Donor & Volunteer',
    avatar: 'https://i.pravatar.cc/150?img=10',
    quote:
      'The transparency and speed of BloodBridge are unmatched. I’ve referred at least 20 friends to become donors. Together, we are building a lifeline for Bangladesh.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = testimonials.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000); // Increased to 5s for better readability
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const StarRating = ({ rating }) => (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={20}
          className={`${
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
          } drop-shadow-sm`}
        />
      ))}
    </div>
  );

  return (
    <section
      className="relative py-28 bg-gray-50 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Premium Background Glow Effects */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-[-10%] w-[40rem] h-[40rem] bg-red-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-[-10%] w-[35rem] h-[35rem] bg-rose-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-[pulse_10s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-red-600 bg-red-50 px-5 py-2 rounded-full text-sm font-bold mb-6 border border-red-100 shadow-sm uppercase tracking-wider">
            <Star size={16} className="fill-red-500 text-red-500" />
            Real Stories
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            What Our <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
              Heroes Say
            </span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Hear from the heroes who have given the gift of life. Their words
            inspire us to keep building a safer, connected community.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Card Wrapper (Hidden overflow for sliding) */}
          <div className="overflow-hidden rounded-[2.5rem] p-4 md:p-8">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-2 md:px-4"
                >
                  <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-14 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative group hover:shadow-[0_8px_40px_rgb(220,38,38,0.08)] transition-all duration-500">
                    {/* Giant decorative Quote Icon */}
                    <Quote className="absolute top-8 right-8 text-red-50 w-24 h-24 -z-10 transform -scale-x-100 rotate-12 group-hover:rotate-6 transition-transform duration-500" />

                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start relative z-10">
                      {/* Avatar with glowing ring */}
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl relative">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <StarRating rating={testimonial.rating} />

                        <p className="mt-6 text-gray-700 text-xl md:text-2xl leading-relaxed font-medium">
                          "{testimonial.quote}"
                        </p>

                        <div className="mt-8 flex flex-col md:flex-row items-center md:items-baseline gap-2">
                          <h4 className="text-gray-900 font-extrabold text-2xl">
                            {testimonial.name}
                          </h4>
                          <span className="hidden md:block text-gray-300">
                            |
                          </span>
                          <p className="text-red-500 font-semibold text-lg">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows (Positioned cleanly outside the card on desktop) */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white border border-gray-100 hover:border-red-200 hover:bg-red-50 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 transition-all shadow-lg hover:shadow-xl z-20 hover:-translate-x-1"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white border border-gray-100 hover:border-red-200 hover:bg-red-50 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 transition-all shadow-lg hover:shadow-xl z-20 hover:translate-x-1"
            aria-label="Next testimonial"
          >
            <ChevronRight size={28} />
          </button>

          {/* Modern Pill Indicators */}
          <div className="flex justify-center gap-3 mt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                  idx === activeIndex
                    ? 'w-10 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                    : 'w-2.5 bg-gray-300 hover:bg-red-300'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
