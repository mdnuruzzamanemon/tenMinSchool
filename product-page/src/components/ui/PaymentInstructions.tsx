'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  videoUrl?: string;
}

interface PaymentInstructionsProps {
  title: string;
  paymentMethods: PaymentMethod[];
}

export default function PaymentInstructions({ title, paymentMethods }: PaymentInstructionsProps) {
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleMethodClick = (id: string) => {
    setActiveMethod(id);
  };

  const handleWatchVideo = () => {
    setShowLoginPrompt(true);
    setTimeout(() => setShowLoginPrompt(false), 3000);
  };

  const activePaymentMethod = paymentMethods.find(method => method.id === activeMethod);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b bg-gradient-to-r from-[#EB1F26]/10 to-[#f04e53]/10">
        <h2 className="text-lg font-bold text-[#EB1F26] flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#EB1F26]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
          {title}
        </h2>
      </div>

      {/* Payment Methods */}
      <div className="p-5">
      <div className="-mx-5 px-5 overflow-x-auto">
  <div className="flex gap-x-4 w-full min-w-full">
    {paymentMethods.map((method) => (
      <div
        key={method.id}
        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 min-w-[180px] flex-shrink-0 ${
          activeMethod === method.id
            ? 'border-[#EB1F26] bg-[#EB1F26]/5 ring-1 ring-[#EB1F26]/20'
            : 'border-gray-200 hover:border-[#EB1F26]/30 hover:bg-gray-50'
        }`}
        onClick={() => handleMethodClick(method.id)}
      >
        <div className="h-10 mr-3 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={method.icon}
            alt={method.name}
            height={40}
            width={0}
            className="h-full w-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
            unoptimized
          />
        </div>
        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{method.name}</span>
      </div>
    ))}
  </div>
</div>


        {/* Watch Video */}
        {activePaymentMethod?.videoUrl && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleWatchVideo}
              className="flex items-center text-[#EB1F26] hover:text-[#9e1418] font-medium transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>ভিডিও দেখুন</span>
            </button>
          </div>
        )}

        {/* Help Message */}
        <div className="bg-blue-50 p-4 rounded-lg mt-6 text-sm text-blue-800">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold mb-1">পেমেন্ট সম্পর্কে সাহায্য প্রয়োজন?</p>
              <p>কোর্স কেনার সময় কোন সমস্যা হলে আমাদের হেল্পলাইন নাম্বারে কল করুন: <span className="font-semibold">16910</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showLoginPrompt && (
        <div className="fixed bottom-5 right-5 bg-[#EB1F26] text-white px-5 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>দয়া করে আগে লগইন করুন</span>
        </div>
      )}
    </div>
  );
}
