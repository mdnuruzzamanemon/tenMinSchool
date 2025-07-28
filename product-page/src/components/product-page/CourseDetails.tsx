'use client';

import { ProductData } from "@/services/api";
import Image from "next/image";
import { useState, useEffect } from "react";
import CourseTrailerCarousel from "../ui/CourseTrailerCarousel";
import FreePdfDownload from "../ui/FreePdfDownload";
import ContentPreview from "../ui/ContentPreview";
import FreeItems from "../ui/FreeItems";
import Requirements from "../ui/Requirements";
import PaymentInstructions from "../ui/PaymentInstructions";
import CourseExclusiveFeatures from "../ui/CourseExclusiveFeatures";

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

// Define types for the PDF download data
interface PdfDownloadData {
  title: string;
  description: string;
  thumbnail: string;
  cta: {
    text: string;
    clicked_url: string;
  };
  top_left_icon_img?: string;
}

// Add new interface for exclusive features
interface ExclusiveFeature {
  id: string;
  title: string;
  checklist: string[];
  file_url: string;
  file_type: string;
  video_thumbnail?: string;
}

export default function CourseDetails({ product }: CourseDetailsProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  
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
  
  // Extract group join engagement section for PDF download
  const groupJoinSection = product.sections.find(section => section.type === "group_join_engagement");
  const pdfDownloadData = groupJoinSection?.values?.[0] as PdfDownloadData | undefined;
  
  // Extract content preview section
  const contentPreviewSection = product.sections.find(section => section.type === "content_preview");
  
  // Create content preview items
  const contentPreviewItems = [
    {
      id: "content-1",
      title: "Video: IELTS: Introduction",
      type: "video"
    },
    {
      id: "content-2",
      title: "Video: IELTS: Overview",
      type: "video"
    },
    {
      id: "content-3",
      title: "Video: How to Prepare for IELTS?",
      type: "video"
    },
    {
      id: "content-4",
      title: "Video: Making a Daily Routine",
      type: "video"
    },
    {
      id: "content-5",
      title: "Video: Different Sentence Structures to Improve Writing",
      type: "video"
    },
    {
      id: "content-6",
      title: "IELTS General Facts",
      type: "document"
    },
    {
      id: "content-7",
      title: "IELTS Vocabulary",
      type: "document"
    }
  ];
  
  // Extract free items section
  const freeItemsSection = product.sections.find(section => section.type === "free_items");
  
  // Create free items
  const freeItems = [
    {
      id: "free-1",
      title: "১টি ফ্রি হার্ডকপি বই",
      icon: "https://cdn.10minuteschool.com/images/PDP/course-fact-icons/digital-book_work-book.png"
    },
    {
      id: "free-2",
      title: "ফেসবুক সাপোর্ট গ্রুপ",
      icon: "https://cdn.10minuteschool.com/images/PDP/course-fact-icons/facebook-community.png"
    },
    {
      id: "free-3",
      title: "কোর্সের মেয়াদ আজীবন",
      icon: "https://cdn.10minuteschool.com/images/PDP/course-fact-icons/time-limit.png"
    }
  ];
  
  // Extract requirements section
  const requirementsSection = product.sections.find(section => section.type === "requirements");
  
  // Create requirements
  const requirements = [
    {
      id: "req-1",
      title: "স্মার্টফোন, ট্যাব বা কম্পিউটার",
      icon: "https://cdn.10minuteschool.com/images/PDP/course-fact-icons/video.png"
    },
    {
      id: "req-2",
      title: "ইন্টারনেট সংযোগ",
      icon: "https://cdn.10minuteschool.com/images/PDP/course-fact-icons/time.png"
    }
  ];
  
  // Extract payment instructions section
  const paymentSection = product.sections.find(section => section.type === "how_to_pay");
  
  // Create payment methods
  const paymentMethods = [
    {
      id: "payment-1",
      name: "বিকাশ",
      icon: "https://cdn.10minuteschool.com/images/payment-icons/bkash.png",
      videoUrl: "5wfn60rmWX4"
    },
    {
      id: "payment-2",
      name: "নগদ",
      icon: "https://cdn.10minuteschool.com/images/payment-icons/nagad.png"
    },
    {
      id: "payment-3",
      name: "রকেট",
      icon: "https://cdn.10minuteschool.com/images/payment-icons/rocket.png"
    },
    {
      id: "payment-4",
      name: "কার্ড",
      icon: "https://cdn.10minuteschool.com/images/payment-icons/card.png"
    }
  ];
  
  // Extract feature explanations section
  const featureExplanationsSection = product.sections.find(section => section.type === "feature_explanations");
  const exclusiveFeatures = featureExplanationsSection?.values as ExclusiveFeature[] || [];
  
  // Set the first about item as active by default
  useEffect(() => {
    if (aboutItems.length > 0 && !activeTab) {
      setActiveTab(aboutItems[0].id);
    }
  }, [aboutItems, activeTab]);
  
  // Get course media
  const courseMedia = product.media.filter(media => 
    media.name === "preview_gallery" && 
    (media.resource_type === "video" || media.resource_type === "image")
  );
  
  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check which sections are in viewport
      const sections = ["instructors", "features", "pointers", "about", "pdf-download", "content-preview", "free-items", "requirements", "payment", "exclusive-features"];
      const newVisibleSections = sections.filter(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight - 100 && rect.bottom > 0;
      });
      
      setVisibleSections(newVisibleSections);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initially
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Instructors Section */}
          {instructorsSection && instructors.length > 0 && (
            <section id="instructors" className="mb-12 relative">
              <div className="flex items-center mb-6 sticky top-20 bg-white/80 backdrop-blur-sm z-10 py-2">
                <div className="h-1 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mr-3"></div>
                <h2 className="text-2xl font-bold">{instructorsSection.name}</h2>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {instructors.map((instructor, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col md:flex-row items-center md:items-start gap-4 p-6 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-full border border-gray-100"
                  >
                    {instructor.image && (
                      <div className="w-32 h-32 relative rounded-full overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                        <Image
                          src={instructor.image}
                          alt={instructor.name}
                          width={128}
                          height={128}
                          className="rounded-full w-32 h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/128?text=Instructor";
                          }}
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        {instructor.name}
                      </h3>
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
            <section id="features" className="mb-12 relative">
              <div className="flex items-center mb-6 sticky top-20 bg-white/80 backdrop-blur-sm z-10 py-2">
                <div className="h-1 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mr-3"></div>
                <h2 className="text-2xl font-bold">{featuresSection.name}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature) => (
                  <div 
                    key={feature.id} 
                    className={`flex gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer ${
                      activeFeature === feature.id ? 'border-indigo-300 shadow-md' : ''
                    }`}
                    onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                  >
                    {feature.icon && (
                      <div className="w-12 h-12 flex-shrink-0 relative group">
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 transform scale-0 group-hover:scale-150 transition-transform duration-500 ${activeFeature === feature.id ? 'scale-150' : ''}`}></div>
                        <Image
                          src={feature.icon}
                          alt=""
                          width={48}
                          height={48}
                          className={`w-12 h-12 relative z-10 transition-transform duration-300 ${activeFeature === feature.id ? 'scale-110' : ''}`}
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
          
          {/* PDF Download Section */}
          {pdfDownloadData && (
            <section id="pdf-download" className="mb-12 relative">
              <div className="flex items-center mb-6 sticky top-20 bg-white/80 backdrop-blur-sm z-10 py-2">
                <div className="h-1 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mr-3"></div>
                <h2 className="text-2xl font-bold">ফ্রি PDF Download করুন</h2>
              </div>
              <FreePdfDownload
                title={pdfDownloadData.title}
                description={pdfDownloadData.description}
                thumbnail={pdfDownloadData.thumbnail}
                ctaText={pdfDownloadData.cta.text}
                ctaUrl={pdfDownloadData.cta.clicked_url}
                iconUrl={pdfDownloadData.top_left_icon_img}
              />
            </section>
          )}
          
          {/* What You'll Learn Section */}
          {pointersSection && pointers.length > 0 && (
            <section id="pointers" className="mb-12 relative">
              <div className="flex items-center mb-6 sticky top-20 bg-white/80 backdrop-blur-sm z-10 py-2">
                <div className="h-1 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mr-3"></div>
                <h2 className="text-2xl font-bold">{pointersSection.name}</h2>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-6 shadow-sm border border-gray-100">
                <ul className="space-y-4">
                  {pointers.map((pointer, index) => (
                    <li 
                      key={pointer.id} 
                      className="flex items-start gap-3 hover:bg-white/80 p-2 rounded-lg transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span>{pointer.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
          
          {/* Course Exclusive Features Section */}
          {featureExplanationsSection && exclusiveFeatures.length > 0 && (
            <section id="exclusive-features" className="mb-12 relative">
              <div className="flex items-center mb-6 sticky top-20 bg-white/80 backdrop-blur-sm z-10 py-2">
                <div className="h-1 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mr-3"></div>
                <h2 className="text-2xl font-bold">{featureExplanationsSection.name}</h2>
              </div>
              <CourseExclusiveFeatures
                title={featureExplanationsSection.name}
                features={exclusiveFeatures}
              />
            </section>
          )}
          
          {/* Content Preview Section */}
          {contentPreviewSection && (
            <section id="content-preview" className="mb-12 relative">
              <div className="flex items-center mb-6 sticky top-20 bg-white/80 backdrop-blur-sm z-10 py-2">
                <div className="h-1 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mr-3"></div>
                <h2 className="text-2xl font-bold">{contentPreviewSection.name || "কন্টেন্ট প্রিভিউ"}</h2>
              </div>
              <ContentPreview
                title={contentPreviewSection.name || "কন্টেন্ট প্রিভিউ"}
                items={contentPreviewItems}
              />
            </section>
          )}
          
          {/* About Section with Tabs */}
          {aboutSection && aboutItems.length > 0 && (
            <section id="about" className="mb-12 relative">
              <div className="flex items-center mb-6 sticky top-20 bg-white/80 backdrop-blur-sm z-10 py-2">
                <div className="h-1 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mr-3"></div>
                <h2 className="text-2xl font-bold">{aboutSection.name}</h2>
              </div>
              
              {/* Tabs Navigation */}
              <div className="flex flex-wrap mb-6 gap-2">
                {aboutItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === item.id 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: item.title }} />
                  </button>
                ))}
              </div>
              
              {/* Tab Content with Animation */}
              <div className="relative overflow-hidden">
                {aboutItems.map((item) => (
                  <div
                    key={item.id}
                    className={`transition-all duration-500 ${
                      activeTab === item.id 
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 absolute top-0 left-0 right-0 transform -translate-y-4 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 relative overflow-hidden">
                      {/* Decorative elements */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full"></div>
                      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full"></div>
                      
                      {/* Icon if available */}
                      {item.icon && (
                        <div className="w-16 h-16 mb-4 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full transform scale-150"></div>
                          <Image
                            src={item.icon}
                            alt=""
                            width={64}
                            height={64}
                            className="w-16 h-16 relative z-10"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                            }}
                            unoptimized
                          />
                        </div>
                      )}
                      
                      <h3 
                        className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 relative"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                      
                      <div 
                        className="prose prose-lg max-w-none relative"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Free Items Section */}
          {freeItemsSection && (
            <section id="free-items" className="mb-12 relative">
              <div className="flex items-center mb-6 sticky top-20 bg-white/80 backdrop-blur-sm z-10 py-2">
                <div className="h-1 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mr-3"></div>
                <h2 className="text-2xl font-bold">{freeItemsSection.name || "এই কোর্সের সাথে ফ্রি পাচ্ছেন–"}</h2>
              </div>
              <FreeItems
                title={freeItemsSection.name || "এই কোর্সের সাথে ফ্রি পাচ্ছেন–"}
                items={freeItems}
              />
            </section>
          )}
          
          {/* Requirements Section */}
          {requirementsSection && (
            <section id="requirements" className="mb-12 relative">
              <div className="flex items-center mb-6 sticky top-20 bg-white/80 backdrop-blur-sm z-10 py-2">
                <div className="h-1 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mr-3"></div>
                <h2 className="text-2xl font-bold">{requirementsSection.name || "ক্লাস করার জন্য প্রয়োজন হবে"}</h2>
              </div>
              <Requirements
                title={requirementsSection.name || "ক্লাস করার জন্য প্রয়োজন হবে"}
                requirements={requirements}
              />
            </section>
          )}
          
          {/* Payment Instructions Section */}
          {paymentSection && (
            <section id="payment" className="mb-12 relative">
              <div className="flex items-center mb-6 sticky top-20 bg-white/80 backdrop-blur-sm z-10 py-2">
                <div className="h-1 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mr-3"></div>
                <h2 className="text-2xl font-bold">{paymentSection.name || "যেভাবে পেমেন্ট করবেন"}</h2>
              </div>
              <PaymentInstructions
                title={paymentSection.name || "যেভাবে পেমেন্ট করবেন"}
                paymentMethods={paymentMethods}
              />
            </section>
          )}
        </div>
        
        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Course Media Carousel */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-500 hover:shadow-xl">
              {/* Course Trailer Carousel */}
              <CourseTrailerCarousel media={courseMedia} />
              
              {/* Price and CTA Button */}
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>
                
                <div className="flex justify-between items-center mb-4 relative">
                  <div className="text-gray-500 line-through text-lg">৳1500</div>
                  <div className="text-indigo-600 font-bold text-2xl">৳1000</div>
                </div>
                
                <button className="btn-gradient-primary w-full py-3 rounded-full text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform relative overflow-hidden group">
                  <span className="relative z-10">{product.cta_text.name}</span>
                  <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </button>
              </div>
              
              {/* Checklist */}
              <div className="p-6 border-t border-gray-100 relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full"></div>
                
                <h3 className="font-semibold text-lg mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 relative">
                  এই কোর্সে যা থাকছে
                </h3>
                <ul className="space-y-4 relative">
                  {product.checklist.map((item) => (
                    <li 
                      key={item.id} 
                      className="flex items-center gap-3 group hover:bg-white/80 p-2 rounded-lg transition-all duration-300"
                    >
                      {item.icon ? (
                        <div className="w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform">
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
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      )}
                      <span className="text-sm group-hover:translate-x-1 transition-transform">{item.text}</span>
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