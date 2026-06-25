
import Link from 'next/link';
import { CheckCircle, Home, HandCoins } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0b0f1c] flex items-center justify-center px-4">
      <div className="text-center">
        <CheckCircle size={64} className="text-emerald-400 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-400 mb-8">
          Thank you for your donation. Your support saves lives.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            <Home size={18} />
            Home
          </Link>
          <Link
            href="/dashboard/funding"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            <HandCoins size={18} />
            Funding Page
          </Link>
        </div>
      </div>
    </div>
  );
}
