'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ExclusiveFeature {
  id: string;
  title: string;
  checklist: string[];
  file_url: string;
  file_type: string;
  video_thumbnail?: string;
}

interface CourseExclusiveFeaturesProps {
  title: string;
  features: ExclusiveFeature[];
}

export default function CourseExclusiveFeatures({ title, features }: CourseExclusiveFeaturesProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(
    features.length > 0 ? features[0].id : null
  );

  const handleFeatureClick = (id: string) => {
    setActiveFeature(id);
  };

  const currentFeature = features.find(feature => feature.id === activeFeature);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {/* Left sidebar - Features list */}
        <div className="md:col-span-1 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              {title}
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`p-4 cursor-pointer transition-all duration-300 ${
                  activeFeature === feature.id 
                    ? 'bg-white shadow-sm border-l-4 border-l-indigo-500' 
                    : 'hover:bg-white/50'
                }`}
                onClick={() => handleFeatureClick(feature.id)}
              >
                <h4 className={`font-medium ${activeFeature === feature.id ? 'text-indigo-600' : 'text-gray-800'}`}>
                  {feature.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Right content - Feature details */}
        <div className="md:col-span-2 p-6">
          {currentFeature ? (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Feature image */}
                <div className="w-full md:w-1/3 aspect-square relative rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={currentFeature.file_url}
                    alt={currentFeature.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-image.jpg';
                    }}
                    unoptimized
                  />
                  
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* Feature checklist */}
                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-semibold mb-4 text-indigo-600">{currentFeature.title}</h3>
                  <ul className="space-y-3">
                    {currentFeature.checklist.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 group">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex-shrink-0 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Interactive elements */}
              <div className="flex justify-center">
                <button className="btn-gradient-primary px-6 py-2 rounded-full text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform">
                  কোর্সটি কিনুন
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">কোনো ফিচার নির্বাচন করুন</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full"></div>
      <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full"></div>
    </div>
  );
} 