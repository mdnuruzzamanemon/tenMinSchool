'use client';

import Image from 'next/image';
import { useState } from 'react';

interface TestimonialCardProps {
  id: string;
  name: string;
  profile_image: string;
  testimonial: string;
  description: string;
  thumb?: string;
  video_url?: string;
  onVideoPlay?: () => void;
  isVideoPlaying?: boolean;
}

export default function TestimonialCard({
  id,
  name,
  profile_image,
  testimonial,
  description,
  thumb,
  video_url,
  onVideoPlay,
  isVideoPlaying
}: TestimonialCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 h-full flex flex-col">
      {video_url ? (
        <div className="relative">
          <div className="aspect-video cursor-pointer">
            {isVideoPlaying ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video_url}?autoplay=1&rel=0`}
                title={`Testimonial by ${name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <>
                {(thumb || profile_image) && !imageError ? (
                  <Image
                    src={thumb || profile_image}
                    alt={name}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Thumbnail not available</span>
                  </div>
                )}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center"
                  onClick={onVideoPlay}
                >
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center mb-4">
            {profile_image && !imageError ? (
              <Image
                src={profile_image}
                alt={name}
                width={48}
                height={48}
                className="rounded-full w-12 h-12 object-cover"
                onError={handleImageError}
                unoptimized
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{name.charAt(0)}</span>
              </div>
            )}
            <div className="ml-4">
              <h3 className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                {name}
              </h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          
          <div className="flex-grow flex flex-col">
            <div className={`text-gray-700 ${!isExpanded ? 'line-clamp-5' : ''} mb-2`}>
              {testimonial}
            </div>
            
            {testimonial.length > 200 && (
              <button 
                onClick={toggleReadMore}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-auto flex items-center transition-colors"
              >
                {isExpanded ? 'Read Less' : 'Read More'}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
      
      {video_url && (
        <div className="p-4 mt-auto">
          <div className="flex items-center">
            {profile_image && !imageError ? (
              <Image
                src={profile_image}
                alt={name}
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
                onError={handleImageError}
                unoptimized
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">{name.charAt(0)}</span>
              </div>
            )}
            <div className="ml-3">
              <h3 className="font-semibold text-sm bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                {name}
              </h3>
              <p className="text-xs text-gray-600">{description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 