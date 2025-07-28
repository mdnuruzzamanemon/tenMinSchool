'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

interface Media {
  resource_type: string;
  resource_value: string;
  thumbnail_url?: string;
}

interface CourseTrailerCarouselProps {
  media: Media[];
}

export default function CourseTrailerCarousel({ media }: CourseTrailerCarouselProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // If no media, return null
  if (media.length === 0) return null;

  const handleThumbnailClick = (index: number) => {
    setActiveMediaIndex(index);
    
    // If it's a video, prepare for playing but don't auto-play
    if (media[index].resource_type === 'video') {
      setActiveVideoId(media[index].resource_value);
      setShowVideo(false); // Reset video state when changing media
    } else {
      setActiveVideoId(null);
      setShowVideo(false);
    }
    
    // Update swiper to show the selected thumbnail
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const handleMainVideoClick = () => {
    if (media[activeMediaIndex].resource_type === 'video') {
      setShowVideo(true);
    }
  };

  const handlePrevClick = () => {
    const newIndex = activeMediaIndex === 0 ? media.length - 1 : activeMediaIndex - 1;
    handleThumbnailClick(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = activeMediaIndex === media.length - 1 ? 0 : activeMediaIndex + 1;
    handleThumbnailClick(newIndex);
  };

  // Get current active media
  const activeMedia = media[activeMediaIndex];

  return (
    <div className="course-trailer-carousel">
      {/* Main Media Display */}
      <div className="main-video-container relative aspect-video w-full overflow-hidden rounded-t-lg">
        {showVideo && activeVideoId ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${activeVideoId}?rel=0&autoplay=1`}
            title="Course Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          ></iframe>
        ) : (
          <div 
            className="main-video-thumbnail relative w-full h-full cursor-pointer"
            onClick={handleMainVideoClick}
          >
            <Image
              src={
                activeMedia.resource_type === 'video'
                  ? activeMedia.thumbnail_url || '/placeholder-video.jpg'
                  : activeMedia.resource_value
              }
              alt={activeMedia.resource_type === 'video' ? 'Video thumbnail' : 'Course media'}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = activeMedia.resource_type === 'video' ? '/placeholder-video.jpg' : '/placeholder-image.jpg';
              }}
              unoptimized
            />
            {activeMedia.resource_type === 'video' && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-center justify-center">
                <div className="play-button-container relative">
                  <div className="absolute inset-0 bg-indigo-500/30 rounded-full animate-ping"></div>
                  <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-lg relative z-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-indigo-600"
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
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-lg font-semibold drop-shadow-md">
                    Watch Course Trailer
                  </h3>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Thumbnails Carousel - Always Visible */}
      {media.length > 1 && (
        <div className="thumbnails-carousel bg-gray-100 p-3 rounded-b-lg relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={3}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            className="h-20"
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveMediaIndex(swiper.activeIndex);
              const currentMedia = media[swiper.activeIndex];
              if (currentMedia.resource_type === 'video') {
                setActiveVideoId(currentMedia.resource_value);
                setShowVideo(false);
              } else {
                setActiveVideoId(null);
                setShowVideo(false);
              }
            }}
          >
            {media.map((item, index) => (
              <SwiperSlide key={index} className="h-full">
                <div 
                  className={`relative h-full rounded overflow-hidden cursor-pointer border-2 transition-all ${
                    index === activeMediaIndex ? 'border-indigo-500 shadow-md' : 'border-transparent hover:border-indigo-300'
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <Image
                    src={item.thumbnail_url || (item.resource_type === 'video' ? '/placeholder-video.jpg' : item.resource_value)}
                    alt={item.resource_type === 'video' ? 'Video thumbnail' : 'Course media'}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = item.resource_type === 'video' ? '/placeholder-video.jpg' : '/placeholder-image.jpg';
                    }}
                    unoptimized
                  />
                  {item.resource_type === 'video' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
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
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation Buttons */}
          <button 
            className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-md cursor-pointer left-1 hover:scale-110 transition-transform"
            onClick={handlePrevClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-md cursor-pointer right-1 hover:scale-110 transition-transform"
            onClick={handleNextClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
} 