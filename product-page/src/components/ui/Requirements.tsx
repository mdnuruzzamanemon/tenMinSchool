'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Requirement {
  id: string;
  title: string;
  icon?: string;
}

interface RequirementsProps {
  title: string;
  requirements: Requirement[];
}

export default function Requirements({ title, requirements }: RequirementsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
        <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />
          </svg>
          {title}
        </h2>
      </div>

      <div className="p-4">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {requirements.map((requirement) => (
            <li 
              key={requirement.id}
              className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              {requirement.icon ? (
                <div className="w-8 h-8 flex-shrink-0 mr-3">
                  <Image
                    src={requirement.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex-shrink-0 mr-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <span className="text-sm text-gray-700">{requirement.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 