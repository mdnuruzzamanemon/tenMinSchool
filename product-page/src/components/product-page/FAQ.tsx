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
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">{faqSection.name}</h2>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
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
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div 
                  className="p-4 bg-gray-50 border-t border-gray-200"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600">Still have questions?</p>
          <div className="mt-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 