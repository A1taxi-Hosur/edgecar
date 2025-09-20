import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ProductsSlider from "@/components/products-slider";
import ShowroomGallery from "@/components/showroom-gallery";
import AboutSection from "@/components/about-section";
import Testimonials from "@/components/testimonials";
import QuoteForm from "@/components/quote-form";
import LocationSection from "@/components/location-section";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";

export default function Home() {
  return (
    <div className="bg-primary-dark text-light-gray font-sans">
      <Navigation />
      <HeroSection />
      <ProductsSlider />
      <ShowroomGallery />
      <AboutSection />
      <Testimonials />
      <QuoteForm />
      <LocationSection />
      <Footer />
    </div>
  );
}
