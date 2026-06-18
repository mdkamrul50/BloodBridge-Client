// components/FAQSectionAlt.jsx
'use client';

import { useState } from 'react';
import {
  HelpCircle,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  Plus,
  Minus,
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  'General',
  'Eligibility',
  'Donation Process',
  'Safety & Privacy',
  'Emergency',
];

const faqData = [
  {
    category: 'General',
    question: 'What is BloodBridge?',
    answer:
      'BloodBridge is a free, community‑driven platform that connects blood donors with patients in urgent need across Bangladesh. We aim to make blood donation fast, safe, and accessible to everyone.',
  },
  {
    category: 'General',
    question: 'Is there any cost to use BloodBridge?',
    answer:
      'No. BloodBridge is completely free for both donors and recipients. Our mission is to save lives without any financial barrier.',
  },
  {
    category: 'Eligibility',
    question: 'Who can donate blood?',
    answer:
      'Generally, anyone between 18–60 years, weighing over 50 kg, and in good health can donate. Specific eligibility is assessed during the mini health check‑up before each donation.',
  },
  {
    category: 'Eligibility',
    question: 'Can I donate if I have a tattoo or piercing?',
    answer:
      'You may need to wait 6–12 months after getting a tattoo or piercing, depending on the safety standards followed. Please mention it during registration.',
  },
  {
    category: 'Donation Process',
    question: 'How do I register as a donor?',
    answer:
      'Click on “Join as a donor” or visit the Registration page. Fill in your details, blood group, and preferred areas. After verification, you’ll be listed as a donor.',
  },
  {
    category: 'Donation Process',
    question: 'What happens after I request blood?',
    answer:
      'Nearby matched donors receive an instant notification. Once a donor accepts, you’ll be connected to coordinate the donation safely.',
  },
  {
    category: 'Safety & Privacy',
    question: 'Is my personal information safe?',
    answer:
      'Absolutely. We use bank‑level encryption. Your data is only shared with medical professionals during a verified donation request.',
  },
  {
    category: 'Safety & Privacy',
    question: 'How are donors verified?',
    answer:
      'Donors undergo a basic health check and their provided documents are reviewed manually. We also use community ratings to ensure trust.',
  },
  {
    category: 'Emergency',
    question: 'How fast can I get a donor in an emergency?',
    answer:
      'Our emergency system notifies matched donors instantly. Most requests get a response within 15–30 minutes in urban areas.',
  },
  {
    category: 'Emergency',
    question: 'What if no donor matches my required blood group?',
    answer:
      'We also alert universal donors (O‑) in critical situations. You can reach our support team for alternative solutions.',
  },
];

const FAQSectionAlt = () => {
  const [activeCategory, setActiveCategory] = useState('General');
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = faqData.filter(
    (item) => item.category === activeCategory
  );

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Reset openIndex when category changes
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setOpenIndex(null);
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-red-50/30 to-white py-24">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-red-600 bg-red-50 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-red-200">
            <HelpCircle size={16} />
            Got Questions?
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Browse by category or ask us directly if you need more help.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left sidebar – Category list */}
          <div className="lg:w-1/4 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 sticky top-24">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`w-full text-left px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-between ${
                    activeCategory === cat
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  {cat}
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${
                      activeCategory === cat ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right content – Accordion */}
          <div className="lg:w-3/4 space-y-4">
            {filteredFaqs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none group"
                >
                  <span className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors pr-4">
                    {item.question}
                  </span>
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 group-hover:bg-red-100 transition-colors">
                    {openIndex === idx ? (
                      <Minus size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </span>
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    openIndex === idx
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 leading-relaxed border-t border-gray-50">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
            {filteredFaqs.length === 0 && (
              <p className="text-center text-gray-400 py-12">
                No FAQs found in this category.
              </p>
            )}
          </div>
        </div>

        {/* Still have questions? Contact us */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl p-8 md:p-10 text-center text-white shadow-xl shadow-red-200/50">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle size={28} className="text-white" />
            <h3 className="text-2xl md:text-3xl font-bold">
              Still have questions?
            </h3>
          </div>
          <p className="text-red-100 text-lg mb-8 max-w-md mx-auto">
            Our support team is ready to help you 24/7. Reach out and we’ll get
            back to you within hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-red-700 font-bold px-8 py-4 rounded-full hover:bg-red-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Contact Us
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSectionAlt;
