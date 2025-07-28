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

  // Extract IELTS score from description if available
  const getScoreFromDescription = (desc: string) => {
    const match = desc.match(/IELTS Score: ([\d.]+)/);
    return match ? match[1] : null;
  };

  const score = getScoreFromDescription(description);
  const isVideoTestimonial = video_url && video_url.trim() !== '';
  const hasLongText = testimonial.length > 150;
  
  // Don't show testimonial text for video testimonials
  const shouldShowTestimonialText = !isVideoTestimonial && testimonial !== description;

  return (
    <div className="testimonial-card bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-indigo-200 h-full flex flex-col relative group hover:-translate-y-3 transform">
      {/* Decorative Elements - Show for both video and text testimonials */}
      <div className="decorative-float absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 z-0"></div>
      <div className="absolute bottom-6 left-6 w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 z-0"></div>

      {/* Quote Icon Badge - Only show for text testimonials */}
      {shouldShowTestimonialText && (
        <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>
      )}

      {/* Video Testimonial Section */}
      {isVideoTestimonial ? (
        <div className="relative overflow-visible z-10">
          <div className="aspect-video cursor-pointer group/video overflow-hidden">
            {isVideoPlaying ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video_url}?autoplay=1&rel=0`}
                title={`Testimonial by ${name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-t-3xl"
              ></iframe>
            ) : (
              <>
                {(thumb || profile_image) && !imageError ? (
                  <Image
                    src={thumb || profile_image}
                    alt={name}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover rounded-t-3xl group-hover/video:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center rounded-t-3xl">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-indigo-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <span className="text-indigo-600 font-medium">Video Testimonial</span>
                    </div>
                  </div>
                )}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-center justify-center group-hover/video:from-black/50 transition-all duration-300"
                  onClick={onVideoPlay}
                >
                  <div className="video-play-button w-20 h-20 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover/video:scale-110 shadow-xl group-hover/video:bg-white border-4 border-white/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-indigo-600 ml-1"
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
      ) : null}

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col relative z-10">
        {/* Profile Section */}
        <div className="flex items-center mb-6">
          {profile_image && !imageError ? (
            <div className="profile-ring relative group/profile">
              <Image
                src={profile_image}
                alt={name}
                width={isVideoTestimonial ? 48 : 60}
                height={isVideoTestimonial ? 48 : 60}
                className={`rounded-full object-cover ring-3 ring-indigo-100 group-hover/profile:ring-indigo-300 transition-all duration-300 ${
                  isVideoTestimonial ? 'w-12 h-12' : 'w-15 h-15'
                }`}
                onError={handleImageError}
                unoptimized
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full border-3 border-white shadow-lg"></div>
            </div>
          ) : (
            <div className={`bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center ring-3 ring-indigo-100 ${
              isVideoTestimonial ? 'w-12 h-12' : 'w-15 h-15'
            }`}>
              <span className="text-white font-bold text-lg">{name.charAt(0)}</span>
            </div>
          )}
          <div className="ml-4 flex-1">
            <h3 className={`font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 ${
              isVideoTestimonial ? 'text-base' : 'text-lg'
            }`}>
              {name}
            </h3>
            <p className="text-sm text-gray-600 font-medium">{description}</p>
          </div>
        </div>
        
        {/* Testimonial Text - Only show for non-video testimonials */}
        {shouldShowTestimonialText && (
          <div className="flex-grow flex flex-col relative overflow-visible">
            <blockquote className="testimonial-quote relative mb-4 px-6 overflow-visible">
              {/* Large Opening Quote */}
              <span className="absolute -top-4 -left-2 text-6xl font-serif text-indigo-200 leading-none select-none pointer-events-none opacity-60 z-0 overflow-visible">&ldquo;</span>
              
              <div className={`text-gray-700 leading-relaxed relative z-10 ${
                !isExpanded && hasLongText ? 'line-clamp-4' : ''
              }`}>
                {testimonial}
              </div>
              
              {/* Large Closing Quote */}
              <span className="absolute -bottom-6 right-0 text-6xl font-serif text-indigo-200 leading-none select-none pointer-events-none opacity-60 z-0 overflow-visible">&rdquo;</span>
            </blockquote>
            
            {/* Read More Button */}
            {hasLongText && (
              <button 
                onClick={toggleReadMore}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold mt-auto flex items-center transition-all duration-300 self-start group/btn"
              >
                {isExpanded ? 'Show Less' : 'Read More'}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transition-transform duration-300 group-hover/btn:scale-110 ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer Section - Consistent spacing */}
      <div className="px-6 pb-6 relative z-10">
        {/* Empty footer for consistent spacing */}
      </div>
    </div>
  );
}