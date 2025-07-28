'use client';

import { useState } from 'react';
import { ProductData } from "@/services/api";
import FAQItem from "../ui/FAQItem";

interface FAQProps {
  product: ProductData;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQ({ product }: FAQProps) {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Find the FAQ section
  const faqSection = product.sections.find(section => section.type === "faq");
  const faqItems = faqSection?.values as FAQItem[] || [];

  const toggleFAQ = (id: string) => {
    setActiveItemId(activeItemId === id ? null : id);
  };

  const filteredFAQs = searchTerm
    ? faqItems.filter(
        item =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : faqItems;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EB1F26] to-[#f04e53] mb-4">
              {faqSection?.name || "সচরাচর জিজ্ঞাসা"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              আপনার যেকোনো প্রশ্নের উত্তর এখানে খুঁজে পাবেন। আরও কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন।
            </p>
          </div>

          <div className="mb-8 relative">
            <input
              type="text"
              placeholder="প্রশ্ন খুঁজুন..."
              className="w-full px-5 py-4 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EB1F26]/30 focus:border-[#EB1F26] transition-all duration-300 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((item) => (
                <FAQItem
                  key={item.id}
                  id={item.id}
                  question={item.question}
                  answer={item.answer}
                  isOpen={activeItemId === item.id}
                  toggleFAQ={toggleFAQ}
                />
              ))
            ) : (
              <div className="p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 text-lg">কোনো ফলাফল পাওয়া যায়নি</p>
                <p className="text-gray-400 mt-2">অন্য কিছু খুঁজে দেখুন</p>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              আরও প্রশ্ন আছে? 
              <a href="#contact" className="text-[#EB1F26] font-medium ml-1 hover:text-[#9e1418] transition-colors">
                আমাদের সাথে যোগাযোগ করুন
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 