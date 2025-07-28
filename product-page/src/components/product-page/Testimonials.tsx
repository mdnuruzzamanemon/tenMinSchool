'use client';

import { ProductData } from "@/services/api";
import TestimonialCarousel from "../ui/TestimonialCarousel";

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
  // Find the testimonials section
  const testimonialsSection = product.sections.find(section => section.type === "testimonials");
  const testimonials = testimonialsSection?.values as Testimonial[] || [];
  
  // Return null if no testimonials
  if (!testimonialsSection || testimonials.length === 0) {
    return null;
  }
  
  return (
    <section className="py-16 bg-gradient-to-b from-white via-indigo-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-center mb-12">
          <div className="h-1 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mr-3"></div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            {testimonialsSection.name}
          </h2>
          <div className="h-1 w-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded ml-3"></div>
        </div>
        
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
} 