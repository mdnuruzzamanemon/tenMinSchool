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

  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <div className="h-10 bg-gray-200 rounded px-4 flex items-center">
                    <span className="text-gray-600">Google Play</span>
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
                  <div className="h-10 bg-gray-200 rounded px-4 flex items-center">
                    <span className="text-gray-600">App Store</span>
                  </div>
                )}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Career / Job Openings</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Join as Teacher</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Join as Affiliate</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Refund Policy</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Use</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Others</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Book Store</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Free Notes & Guides</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Job Preparation Courses</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Verify Certificate</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Free Downloads</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Call: 16910 (24x7)</li>
              <li className="text-gray-600">WhatsApp: +8801896016252 (24x7)</li>
              <li className="text-gray-600">From outside Bangladesh: +880 9610916910</li>
              <li className="text-gray-600">Email: support@10minuteschool.com</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <Link href="#" aria-label="Facebook">
                <svg className="w-6 h-6 text-gray-600 hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" aria-label="Instagram">
                <svg className="w-6 h-6 text-gray-600 hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <svg className="w-6 h-6 text-gray-600 hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
              <Link href="#" aria-label="YouTube">
                <svg className="w-6 h-6 text-gray-600 hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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