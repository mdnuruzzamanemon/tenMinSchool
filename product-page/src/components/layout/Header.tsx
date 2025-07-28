'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate background position based on mouse movement
  const backgroundPositionX = `${50 + (mousePosition.x - 0.5) * 5}%`;
  const backgroundPositionY = `${50 + (mousePosition.y - 0.5) * 5}%`;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'py-4'
      }`}
    >
      {/* Animated Background */}
      {!isScrolled && (
        <div 
          className="absolute inset-0 -z-10 animated-bg opacity-80"
          style={{
            backgroundImage: `
              url(/header-bg-pattern.svg),
              linear-gradient(120deg, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.08) 50%, rgba(236, 72, 153, 0.08) 100%)
            `,
            backgroundPosition: `${backgroundPositionX} ${backgroundPositionY}`,
            backgroundSize: '120% 120%',
            transition: 'background-position 0.5s ease-out'
          }}
        >
          {/* Animated particles */}
          <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-indigo-500/10 animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-3/4 left-1/3 w-8 h-8 rounded-full bg-purple-500/10 animate-ping" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-10 h-10 rounded-full bg-pink-500/10 animate-ping" style={{ animationDuration: '5s' }}></div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between relative">
        <Link href="/" className="flex items-center">
          {!logoError ? (
            <Image 
              src="/logo/10mslogo-svg.svg" 
              alt="10 Minute School" 
              width={120} 
              height={40}
              className="h-8 w-auto"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              10 Minute School
            </span>
          )}
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#" className="text-gray-700 hover:text-indigo-600 transition-colors relative group">
            Classes 6-12
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="#" className="text-gray-700 hover:text-indigo-600 transition-colors relative group">
            Skills
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="#" className="text-gray-700 hover:text-indigo-600 transition-colors relative group">
            Admission
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="#" className="text-gray-700 hover:text-indigo-600 transition-colors relative group">
            Online Batch
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="#" className="text-gray-700 hover:text-indigo-600 transition-colors relative group">
            English Center
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="btn-gradient-primary px-4 py-2 rounded-full shadow-sm hover:shadow-md">
            Login
          </button>
          <button 
            className="md:hidden z-20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-white z-10 md:hidden transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="container mx-auto px-4 py-20">
            <nav className="flex flex-col space-y-6">
              <Link 
                href="#" 
                className="text-xl font-medium text-gray-800 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Classes 6-12
              </Link>
              <Link 
                href="#" 
                className="text-xl font-medium text-gray-800 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </Link>
              <Link 
                href="#" 
                className="text-xl font-medium text-gray-800 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Admission
              </Link>
              <Link 
                href="#" 
                className="text-xl font-medium text-gray-800 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Online Batch
              </Link>
              <Link 
                href="#" 
                className="text-xl font-medium text-gray-800 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                English Center
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
} 