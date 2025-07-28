'use client';

import { useState } from 'react';
import Image from 'next/image';

interface FreePdfDownloadProps {
  title: string;
  description: string;
  thumbnail: string;
  ctaText: string;
  ctaUrl: string;
  iconUrl?: string;
}

export default function FreePdfDownload({
  title,
  description,
  thumbnail,
  ctaText,
  ctaUrl,
  iconUrl,
}: FreePdfDownloadProps) {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleDownload = () => {
    setShowLoginPrompt(true);
    setTimeout(() => {
      setShowLoginPrompt(false);
    }, 3000);
  };

  return (
    <div className="relative overflow-hidden rounded-xl shadow-xl bg-gradient-to-r from-[#00273B] via-[#004D7A] to-[#007CA6]">
      <div className="flex flex-col md:flex-row">
        {/* Left content */}
        <div className="p-6 md:p-8 flex-grow">
          {/* Icon */}
          {iconUrl && (
            <div className="mb-4 flex items-center">
              <div className="h-10 overflow-hidden mr-3">
                <Image
                  src={iconUrl}
                  alt="Icon"
                  width={0}
                  height={40}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                  unoptimized
                />
              </div>
            </div>
          )}

          {/* Title and description */}
          <h3 className="text-white font-extrabold text-2xl mb-2">{title}</h3>
          <p className="text-gray-200 mb-5 text-sm leading-relaxed">{description}</p>

          {/* CTA Button */}
          <button
            onClick={handleDownload}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-transform duration-300 transform hover:scale-105 flex items-center"
          >
            <span>{ctaText}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </button>
        </div>

        {/* Right image */}
        <div className="md:w-1/3 relative h-48 md:h-auto">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-image.jpg';
            }}
            unoptimized
          />
        </div>
      </div>

      {/* Login Prompt Toast */}
      {showLoginPrompt && (
        <div className="fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in flex items-center">
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
