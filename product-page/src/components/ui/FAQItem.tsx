'use client';

import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  toggleFAQ?: (id: string) => void;
  id: string;
}

export default function FAQItem({ question, answer, isOpen = false, toggleFAQ, id }: FAQItemProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const handleToggle = () => {
    if (toggleFAQ) {
      toggleFAQ(id);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const isCurrentlyOpen = toggleFAQ ? isOpen : isExpanded;

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        className="w-full text-left py-4 px-6 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-200 rounded-lg transition-colors duration-300"
        onClick={handleToggle}
      >
        <h3 className={`font-medium text-lg ${isCurrentlyOpen ? 'text-indigo-600' : 'text-gray-800'}`}>
          {question}
        </h3>
        <div className={`w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 ${isCurrentlyOpen ? 'bg-indigo-500 rotate-180' : 'bg-gray-200'}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3 w-3 transition-transform duration-300 ${isCurrentlyOpen ? 'text-white' : 'text-gray-600'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isCurrentlyOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </div>
  );
} 