// app/success/page.jsx
import { Suspense } from 'react';
import SuccessContent from './SuccessContent';


export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0f1c] flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
