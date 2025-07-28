import { getProductData } from "../services/api";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductHero from "../components/product-page/ProductHero";
import CourseDetails from "../components/product-page/CourseDetails";
import Testimonials from "../components/product-page/Testimonials";
import FAQ from "../components/product-page/FAQ";

// Enable ISR with revalidation every hour
export const revalidate = 3600;

export default async function ProductPage() {
  // Fetch product data from API
  const productSlug = "ielts-course"; // This could be dynamic based on route params
  const productResponse = await getProductData(productSlug);
  const product = productResponse.data;
  
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow">
        <ProductHero product={product} />
        <CourseDetails product={product} />
        <Testimonials product={product} />
        <FAQ product={product} />
        </div>
      
      <Footer />
      </main>
  );
}
