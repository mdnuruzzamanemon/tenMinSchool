'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          {!logoError ? (
            <Image 
              src="/logo.svg" 
              alt="10 Minute School" 
              width={120} 
              height={40}
              className="h-10 w-auto"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="text-xl font-bold">10 Minute School</span>
          )}
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Classes 6-12</Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Skills</Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Admission</Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Online Batch</Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">English Center</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
            Login
          </button>
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
} 