import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { getAssetUrl } from "@/lib/assets";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "1001_1751652556369.png",
      alt: "Premium Car Seat Covers"
    },
    {
      image: "1002_1751652556369.png", 
      alt: "70mai Dash Camera"
    },
    {
      image: "1003_1751652556368.png",
      alt: "JBL Audio System"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Full-screen image carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={getAssetUrl(`@assets/${slide.image}`)}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-accent-orange scale-110 shadow-lg' 
                : 'bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="w-8 h-8 text-white drop-shadow-lg" />
      </div>
    </section>
  );
}
