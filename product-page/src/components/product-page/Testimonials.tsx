'use client';

import { ProductData } from "@/services/api";
import Image from "next/image";
import { useState } from "react";

interface TestimonialsProps {
  product: ProductData;
}

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

export default function Testimonials({ product }: TestimonialsProps) {
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  // Find the testimonials section
  const testimonialsSection = product.sections.find(section => section.type === "testimonials");
  const testimonials = testimonialsSection?.values as Testimonial[] || [];
  
  if (!testimonialsSection || testimonials.length === 0) {
    return null;
  }
  
  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">{testimonialsSection.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {testimonial.video_url ? (
                <div className="relative">
                  <div 
                    className="aspect-video cursor-pointer"
                    onClick={() => setActiveTestimonial(index)}
                  >
                    {activeTestimonial === index ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${testimonial.video_url}?autoplay=1&rel=0`}
                        title={`Testimonial by ${testimonial.name}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    ) : (
                      <>
                        {(testimonial.thumb || testimonial.profile_image) && !imageErrors[testimonial.id] ? (
                          <Image
                            src={testimonial.thumb || testimonial.profile_image}
                            alt={testimonial.name}
                            width={400}
                            height={225}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(testimonial.id)}
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">Thumbnail not available</span>
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-md">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-blue-600"
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
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {testimonial.profile_image && !imageErrors[testimonial.id] ? (
                      <Image
                        src={testimonial.profile_image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full w-12 h-12 object-cover"
                        onError={() => handleImageError(testimonial.id)}
                        unoptimized
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-xs">{testimonial.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="ml-4">
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.description}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{testimonial.testimonial}</p>
                </div>
              )}
              
              {testimonial.video_url ? (
                <div className="p-4">
                  <div className="flex items-center">
                    {testimonial.profile_image && !imageErrors[testimonial.id] ? (
                      <Image
                        src={testimonial.profile_image}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full w-10 h-10 object-cover"
                        onError={() => handleImageError(testimonial.id)}
                        unoptimized
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-xs">{testimonial.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="ml-3">
                      <h3 className="font-semibold text-sm">{testimonial.name}</h3>
                      <p className="text-xs text-gray-600">{testimonial.description}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 