'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [imageErrors, setImageErrors] = useState({
    googlePlay: false,
    appStore: false
  });

  const handleImageError = (key: keyof typeof imageErrors) => {
    setImageErrors(prev => ({ ...prev, [key]: true }));
  };

  const PlayStoreIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
    </svg>
  );

  const AppStoreIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
    </svg>
  );

  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-lg mb-2">Download Our Mobile App</h3>
            <div className="flex flex-col space-y-3">
              <Link href="#" className="inline-block">
                {!imageErrors.googlePlay ? (
                  <Image 
                    src="/google-play.png" 
                    alt="Google Play" 
                    width={140} 
                    height={42} 
                    className="h-10 w-auto"
                    onError={() => handleImageError('googlePlay')}
                  />
                ) : (
                  <div className="h-12 bg-black text-white rounded-lg px-4 flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors">
                    <PlayStoreIcon />
                    <div className="flex flex-col items-start">
                      <span className="text-xs">GET IT ON</span>
                      <span className="text-sm font-medium">Google Play</span>
                    </div>
                  </div>
                )}
              </Link>
              <Link href="#" className="inline-block">
                {!imageErrors.appStore ? (
                  <Image 
                    src="/app-store.png" 
                    alt="App Store" 
                    width={140} 
                    height={42}
                    className="h-10 w-auto" 
                    onError={() => handleImageError('appStore')}
                  />
                ) : (
                  <div className="h-12 bg-black text-white rounded-lg px-4 flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors">
                    <AppStoreIcon />
                    <div className="flex flex-col items-start">
                      <span className="text-xs">Download on the</span>
                      <span className="text-sm font-medium">App Store</span>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-[#EB1F26] transition-colors">Career / Job Openings</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#EB1F26] transition-colors">Join as Teacher</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#EB1F26] transition-colors">Join as Affiliate</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#EB1F26] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#EB1F26] transition-colors">Refund Policy</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#EB1F26] transition-colors">Terms of Use</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Others</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-[#EB1F26] transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#EB1F26] transition-colors">Book Store</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#EB1F26] transition-colors">Free Notes & Guides</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#EB1F26] transition-colors">Job Preparation Courses</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#EB1F26] transition-colors">Verify Certificate</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#EB1F26] transition-colors">Free Downloads</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#EB1F26] mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-600">Call: 16910 (24x7)</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#EB1F26] mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3.293 3.293 3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
                <span className="text-gray-600">WhatsApp: +8801896016252 (24x7)</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#EB1F26] mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">From outside Bangladesh: +880 9610916910</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#EB1F26] mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-600">Email: support@10minuteschool.com</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <Link href="#" aria-label="Facebook" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#EB1F26]/10 hover:text-[#EB1F26] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" aria-label="Instagram" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#EB1F26]/10 hover:text-[#EB1F26] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" aria-label="LinkedIn" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#EB1F26]/10 hover:text-[#EB1F26] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
              <Link href="#" aria-label="YouTube" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#EB1F26]/10 hover:text-[#EB1F26] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-gray-500 text-sm">
          © 2015 - {new Date().getFullYear()} Ten Minute School. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 