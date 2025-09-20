import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@shared/schema";
import { getAssetUrl } from "@/lib/assets";

export default function ProductsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(0);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const categories = [
    { id: 'audio', name: 'Audio Systems' },
    { id: 'light', name: 'LED Lighting' },
    { id: 'motors', name: 'Power Solutions' },
    { id: 'dash-camera', name: 'Dash Cameras' },
  ];

  const categoryProducts = products.filter(
    product => product.category === categories[currentCategory]?.id
  );

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(categoryProducts.length / itemsPerSlide);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (totalSlides > 1) {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
      }
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Auto-switch categories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategory(prev => (prev + 1) % categories.length);
      setCurrentSlide(0); // Reset slide when category changes
    }, 16000); // Change category every 16 seconds (4 slides × 4 seconds)

    return () => clearInterval(interval);
  }, [categories.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlideProducts = () => {
    const startIndex = currentSlide * itemsPerSlide;
    const endIndex = startIndex + itemsPerSlide;
    return categoryProducts.slice(startIndex, endIndex);
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-primary-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Products</h2>
          <p className="text-xl text-light-gray max-w-4xl mx-auto">
            Explore our comprehensive range of premium car accessories and enhancement solutions
          </p>
        </div>

        {/* Category Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => {
                  setCurrentCategory(index);
                  setCurrentSlide(0);
                }}
                className={`px-4 py-2 rounded-lg btn-interactive magnetic-hover ${
                  currentCategory === index
                    ? 'bg-accent-orange text-white pulse'
                    : 'bg-secondary-dark text-light-gray hover:bg-accent-orange/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-4 gap-6">
                    {categoryProducts
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((product) => (
                      <Card key={product.id} className="product-card card-3d rounded-2xl p-6 hover-lift interactive-element stagger-animation">
                        <CardContent className="p-0">
                          <img 
                            src={getAssetUrl(product.image || '')} 
                            alt={product.name} 
                            className="w-full h-32 object-cover rounded-xl mb-4 hover-glow transition-all duration-300" 
                          />
                          <h3 className="text-lg font-bold text-white mb-2 text-reveal">{product.name}</h3>
                          {product.description && (
                            <p className="text-sm text-light-gray opacity-90">{product.description}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-secondary-dark/80 hover:bg-accent-orange text-white"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-secondary-dark/80 hover:bg-accent-orange text-white"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>

        {/* Slide Indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-accent-orange' : 'bg-secondary-dark'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}