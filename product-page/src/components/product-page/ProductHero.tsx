'use client';

import Image from "next/image";
import { ProductData } from "@/services/api";
import { useState } from "react";

interface ProductHeroProps {
  product: ProductData;
}

export default function ProductHero({ product }: ProductHeroProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [imageError, setImageError] = useState(false);
  
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
  
  return (
    <section className="pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: product.title }} />
            <div 
              className="text-gray-700 mb-6 text-lg"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {product.checklist.slice(0, 6).map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
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
            
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform">
              {product.cta_text.name}
            </button>
          </div>
          
          <div className="order-1 lg:order-2 relative">
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-80 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 md:h-10 md:w-10 text-blue-600"
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 