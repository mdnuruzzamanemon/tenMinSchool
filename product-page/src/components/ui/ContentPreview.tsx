'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ContentItem {
  id: string;
  title: string;
  icon?: string;
  isLocked?: boolean;
  type?: string;
}

interface ContentPreviewProps {
  title: string;
  items: ContentItem[];
}

export default function ContentPreview({ title, items }: ContentPreviewProps) {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleItemClick = () => {
    setShowLoginPrompt(true);
    
    // Hide the toast after 3 seconds
    setTimeout(() => {
      setShowLoginPrompt(false);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-[#EB1F26]/10 to-[#f04e53]/10">
        <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EB1F26] to-[#f04e53]">
          {title}
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3 flex items-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={handleItemClick}
          >
            <div className="flex-shrink-0 mr-3">
              {item.type === 'video' ? (
                <div className="w-8 h-8 bg-[#EB1F26]/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#EB1F26]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">{item.title}</h3>
            </div>
            
            <div className="ml-2 flex items-center">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full mr-2">ফ্রি দেখুন</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Login Prompt Toast */}
      {showLoginPrompt && (
        <div className="fixed bottom-4 right-4 bg-[#EB1F26] text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>দয়া করে আগে লগইন করুন</span>
        </div>
      )}
    </div>
  );
} 