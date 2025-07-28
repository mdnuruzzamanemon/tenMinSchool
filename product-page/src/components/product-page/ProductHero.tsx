'use client';

import Image from "next/image";
import { ProductData } from "@/services/api";
import { useState, useEffect } from "react";

interface ProductHeroProps {
  product: ProductData;
}

export default function ProductHero({ product }: ProductHeroProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Find the preview gallery video for the trailer
  const trailerVideo = product.media.find(
    (media) => media.name === "preview_gallery" && media.resource_type === "video"
  );
  
  // Find a thumbnail image
  const thumbnailImage = product.media.find(
    (media) => media.name === "thumbnail" && media.resource_type === "image"
  );
  
  const thumbnailUrl = thumbnailImage?.resource_value || "";
  const videoId = trailerVideo?.resource_value || "";
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Calculate background position based on mouse movement
  const backgroundPositionX = `${50 + (mousePosition.x - 0.5) * 10}%`;
  const backgroundPositionY = `${50 + (mousePosition.y - 0.5) * 10}%`;
  
  // Calculate parallax effect for content based on scroll
  const parallaxOffset = Math.min(scrollPosition * 0.2, 100);
  
  return (
    <section className="pt-24 pb-12 relative overflow-hidden">
      {/* Interactive Background */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            url(/hero-bg-pattern.svg),
            linear-gradient(120deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 50%, rgba(236, 72, 153, 0.05) 100%)
          `,
          backgroundPosition: `${backgroundPositionX} ${backgroundPositionY}`,
          backgroundSize: '120% 120%',
          transition: 'background-position 0.5s ease-out'
        }}
      >
        {/* Animated particles */}
        <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-indigo-500/5 animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-purple-500/5 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-pink-500/5 animate-pulse" style={{ animationDuration: '5s' }}></div>
        
        {/* Floating shapes */}
        <div className="absolute top-20 left-[10%] w-12 h-12 rotate-45 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-lg animate-float" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[40%] right-[15%] w-16 h-16 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full animate-float" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-[20%] w-10 h-10 bg-gradient-to-br from-pink-500/10 to-transparent rotate-12 rounded-lg animate-float" style={{ animationDuration: '7s', animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1" style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}>
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-sm font-medium animate-fade-in backdrop-blur-sm">
              Featured Course
            </div>
            <h1 
              className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600" 
              dangerouslySetInnerHTML={{ __html: product.title }} 
            />
            <div 
              className="text-gray-700 mb-6 text-lg"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {product.checklist.slice(0, 6).map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/80 transition-all duration-300 hover:shadow-sm"
                  style={{ 
                    transitionDelay: `${index * 50}ms`,
                    transform: `translateY(${Math.max(0, parallaxOffset * 0.1 * (index % 3))}px)` 
                  }}
                >
                  {item.icon && (
                    <div className="w-6 h-6 flex-shrink-0">
                      <Image
                        src={item.icon}
                        alt=""
                        width={24}
                        height={24}
                        className="w-6 h-6"
                        onError={() => console.log(`Failed to load icon: ${item.icon}`)}
                        unoptimized
                      />
                    </div>
                  )}
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
            
            <button className="btn-gradient-primary px-8 py-3 rounded-full text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform relative overflow-hidden group">
              <span className="relative z-10">{product.cta_text.name}</span>
              <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </button>
          </div>
          
          <div 
            className="order-1 lg:order-2 relative" 
            style={{ transform: `translateY(${-parallaxOffset * 0.1}px)` }}
          >
            {showVideo ? (
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            ) : (
              <div 
                className="aspect-video w-full rounded-lg overflow-hidden shadow-xl relative cursor-pointer group"
                onClick={() => setShowVideo(true)}
              >
                {thumbnailUrl && !imageError ? (
                  <Image
                    src={thumbnailUrl}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={() => setImageError(true)}
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Thumbnail not available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500/30 rounded-full animate-ping"></div>
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg relative z-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 md:h-10 md:w-10 text-indigo-600"
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
                </div>
              </div>
            )}
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 