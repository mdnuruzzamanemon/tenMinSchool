'use client';

import { useState } from 'react';
import Image from 'next/image';

interface FreeItem {
  id: string;
  title: string;
  icon?: string;
}

interface FreeItemsProps {
  title: string;
  items: FreeItem[];
}

export default function FreeItems({ title, items }: FreeItemsProps) {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleItemClick = () => {
    setShowLoginPrompt(true);
    setTimeout(() => {
      setShowLoginPrompt(false);
    }, 3000);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-[#EB1F26] to-[#f04e53] border-b border-white/20">
        <h2 className="text-xl font-bold text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
            <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
          </svg>
          ঘরে বসে IELTS প্রস্তুতি (Hardcopy Book)
        </h2>
      </div>

      {/* Book Section */}
      <div className="bg-gradient-to-br from-[#EB1F26] to-[#9e1418] text-white">
        <div className="p-6 flex flex-col md:flex-row items-center">
          {/* Book Details */}
          <div className="w-full md:w-2/3 mb-6 md:mb-0 md:pr-6">


            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>360 পৃষ্ঠা</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>প্রিমিয়াম হার্ডকপি</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>ফ্রি ডেলিভারি</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>৪ কর্মদিবসের মধ্যে সারাদেশে ডেলিভারি</span>
              </li>
            </ul>

            <button
              onClick={handleItemClick}
              className="mt-6 bg-white text-[#EB1F26] font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              বইটি পেতে কোর্সে এনরোল করুন
            </button>
          </div>

          {/* Book Image */}
          <div className="w-full md:w-[200px] relative">
            <div className="relative w-[200px] aspect-auto transform rotate-3 hover:rotate-0 transition-transform duration-300 shadow-2xl rounded-lg overflow-hidden">
              <Image
                src="/Book_Image.jpeg"
                alt="ঘরে বসে IELTS প্রস্তুতি"
                width={200}
                height={0}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-image.jpg';
                }}
                unoptimized
              />

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-[#EB1F26] font-bold text-sm transform rotate-12 shadow-lg">
              ফ্রি
            </div>
          </div>

        </div>

        {/* Other Free Items */}
        {/* {items.length > 0 && (
          <div className="p-5 bg-gradient-to-b from-[#9e1418]/50 to-[#9e1418] border-t border-white/20">
            <h3 className="text-lg font-semibold mb-3">আরও যা পাচ্ছেন:</h3>
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center text-white cursor-pointer hover:bg-white/10 p-2 rounded-md transition-colors duration-200"
                  onClick={handleItemClick}
                >
                  {item.icon ? (
                    <div className="w-8 h-8 mr-3 flex-shrink-0">
                      <Image
                        src={item.icon}
                        alt=""
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-6 h-6 mr-3 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <span className="text-sm">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>

      {/* Toast Message */}
      {showLoginPrompt && (
        <div className="fixed bottom-4 right-4 bg-[#EB1F26] text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span>দয়া করে আগে লগইন করুন</span>
        </div>
      )}
    </div>
  );
}
