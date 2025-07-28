'use client';

import { ProductData } from "@/services/api";
import { useState } from "react";

interface FAQProps {
  product: ProductData;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQ({ product }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Find the FAQ section
  const faqSection = product.sections.find(section => section.type === "faq");
  const faqs = faqSection?.values as FAQItem[] || [];
  
  if (!faqSection || faqs.length === 0) {
    return null;
  }
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-white via-indigo-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-center mb-12">
          <div className="h-1 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mr-3"></div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            {faqSection.name}
          </h2>
          <div className="h-1 w-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded ml-3"></div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                className={`w-full flex justify-between items-center p-4 text-left transition-colors ${
                  openIndex === index 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50' 
                    : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <span className={`font-medium text-lg ${
                  openIndex === index 
                    ? 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600' 
                    : 'text-gray-800'
                }`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  openIndex === index 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500' 
                    : 'bg-gray-100'
                }`}>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      openIndex === index 
                        ? 'rotate-180 text-white' 
                        : 'text-gray-600'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div 
                  className="p-4 bg-white border-t border-gray-200"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600">Still have questions?</p>
          <div className="mt-4">
            <button className="btn-gradient-primary px-6 py-2 rounded-full shadow-sm hover:shadow-md">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 