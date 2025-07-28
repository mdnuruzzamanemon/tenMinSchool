'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import TestimonialCard from './TestimonialCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
  id: string;
  name: string;
  profile_image: string;
  testimonial: string;
  description: string;
  thumb?: string;
  video_url?: string;
  video_type?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(null);

  if (testimonials.length === 0) return null;

  return (
    <div className="testimonial-carousel-container relative">
      {/* Custom Navigation Buttons */}
      <div className="testimonial-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className="testimonial-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          nextEl: '.testimonial-swiper-button-next',
          prevEl: '.testimonial-swiper-button-prev',
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        className="testimonial-swiper px-5"
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 }
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={testimonial.id} className="h-auto pb-12">
            <div className="h-full">
              <TestimonialCard
                id={testimonial.id}
                name={testimonial.name}
                profile_image={testimonial.profile_image}
                testimonial={testimonial.testimonial}
                description={testimonial.description}
                thumb={testimonial.thumb}
                video_url={testimonial.video_url}
                onVideoPlay={() => setActiveTestimonial(index)}
                isVideoPlaying={activeTestimonial === index}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 