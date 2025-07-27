'use client';

import { ProductData } from "@/services/api";
import Image from "next/image";
import { useState } from "react";

interface CourseDetailsProps {
  product: ProductData;
}

interface Instructor {
  name: string;
  image: string;
  description: string;
  has_instructor_page: boolean;
  short_description: string;
  slug: string;
}

interface Feature {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

interface Pointer {
  id: string;
  text: string;
  color: string;
  icon: string;
}

interface AboutItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export default function CourseDetails({ product }: CourseDetailsProps) {
  // Find the instructors section
  const instructorsSection = product.sections.find(section => section.type === "instructors");
  const instructors = instructorsSection?.values as Instructor[] || [];
  
  // Find the features section
  const featuresSection = product.sections.find(section => section.type === "features");
  const features = featuresSection?.values as Feature[] || [];
  
  // Find the pointers section (what you'll learn)
  const pointersSection = product.sections.find(section => section.type === "pointers");
  const pointers = pointersSection?.values as Pointer[] || [];
  
  // Find the about section
  const aboutSection = product.sections.find(section => section.type === "about");
  const aboutItems = aboutSection?.values as AboutItem[] || [];
  
  // Find the trailer video
  const trailerVideo = product.media.find(
    (media) => media.name === "preview_gallery" && media.resource_type === "video"
  );
  const videoId = trailerVideo?.resource_value || "";
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Instructors Section */}
          {instructorsSection && instructors.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{instructorsSection.name}</h2>
              <div className="grid grid-cols-1 gap-6">
                {instructors.map((instructor, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-center md:items-start gap-4 p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full">
                    {instructor.image && (
                      <div className="w-32 h-32 relative rounded-full overflow-hidden">
                        <Image
                          src={instructor.image}
                          alt={instructor.name}
                          width={128}
                          height={128}
                          className="rounded-full w-32 h-32 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/128?text=Instructor";
                          }}
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold">{instructor.name}</h3>
                      <div 
                        className="text-gray-600 mt-3"
                        dangerouslySetInnerHTML={{ __html: instructor.description }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Course Features Section */}
          {featuresSection && features.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{featuresSection.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature) => (
                  <div key={feature.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    {feature.icon && (
                      <div className="w-12 h-12 flex-shrink-0">
                        <Image
                          src={feature.icon}
                          alt=""
                          width={48}
                          height={48}
                          className="w-12 h-12"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                          unoptimized
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-gray-600 mt-1">{feature.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* What You'll Learn Section */}
          {pointersSection && pointers.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{pointersSection.name}</h2>
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <ul className="space-y-4">
                  {pointers.map((pointer) => (
                    <li key={pointer.id} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{pointer.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
          
          {/* About Section */}
          {aboutSection && aboutItems.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{aboutSection.name}</h2>
              {aboutItems.map((item) => (
                <div key={item.id} className="mb-8 bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div 
                    className="text-xl font-semibold mb-4"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              ))}
            </section>
          )}
        </div>
        
        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Course Trailer with Checklist */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
              <div className="aspect-video relative">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                  title="Course Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
              
              {/* Price and CTA Button */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-gray-500 line-through text-lg">৳1500</div>
                  <div className="text-blue-600 font-bold text-2xl">৳1000</div>
                </div>
                
                <button className="bg-blue-600 text-white w-full py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform">
                  {product.cta_text.name}
                </button>
              </div>
              
              {/* Checklist */}
              <div className="p-6 border-t border-gray-100">
                <h3 className="font-semibold text-lg mb-4">এই কোর্সে যা থাকছে</h3>
                <ul className="space-y-4">
                  {product.checklist.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                      {item.icon && (
                        <div className="w-6 h-6 flex-shrink-0">
                          <Image
                            src={item.icon}
                            alt=""
                            width={24}
                            height={24}
                            className="w-6 h-6"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                            }}
                            unoptimized
                          />
                        </div>
                      )}
                      <span className="text-sm">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 