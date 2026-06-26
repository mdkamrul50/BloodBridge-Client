// app/success/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Home, HandCoins, Loader2 } from 'lucide-react';

// ✅ এই লাইনটি দাও, যাতে বিল্ডের সময় এটা প্রি-রেন্ডার না হয়
export const dynamic = 'force-dynamic';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    fetch(`/api/confirm-funding`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus('recorded');
        } else {
          setStatus('error');
        }
      })
      .catch(() => {
        setStatus('error');
      });
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0b0f1c] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1c] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-green-600">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-6 " />
        </p>
        <h1 className="text-3xl font-bold text-white mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-400 mb-8">
          {status === 'recorded'
            ? 'Your donation has been recorded. Thank you for your support!'
            : 'Your payment was successful, but we had trouble saving the record. Please contact support.'}
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
            href="/funding"
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
