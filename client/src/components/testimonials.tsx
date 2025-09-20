import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      text: "Excellent service and quality products! Got my car's audio system upgraded here. The Pioneer speakers sound amazing and the installation was professional.",
      name: "Rajesh Kumar",
      location: "HSR Layout, Bengaluru",
      rating: 5,
      date: "2 months ago"
    },
    {
      text: "Best place for car accessories in Bengaluru! The LED headlight upgrade has completely transformed my car's look. Very satisfied with the quality and pricing.",
      name: "Priya Sharma",
      location: "Sector 2, HSR Layout",
      rating: 5,
      date: "3 weeks ago"
    },
    {
      text: "Amazing collection of car accessories. Got seat covers and dashboard accessories. Perfect fitting and premium quality. Highly recommend!",
      name: "Amit Patil",
      location: "Somasandra Palya",
      rating: 5,
      date: "1 month ago"
    },
    {
      text: "Professional service and genuine products. The team helped me choose the right accessories for my car. Installation was done perfectly.",
      name: "Sneha Reddy",
      location: "HSR Layout",
      rating: 5,
      date: "2 weeks ago"
    },
    {
      text: "Great experience! Quick service and reasonable prices. The dash cam installation was done professionally. Will definitely come back.",
      name: "Vikram Singh",
      location: "Sector 2, HSR",
      rating: 5,
      date: "1 week ago"
    },
    {
      text: "Top-notch car accessories store! Got my car's interior completely upgraded. The quality of materials and workmanship is excellent.",
      name: "Meera Nair",
      location: "Near Somasandra Palya",
      rating: 5,
      date: "3 days ago"
    },
    {
      text: "Impressed by the wide selection and competitive prices. The seat covers I ordered fit perfectly and added a stylish touch to my car's interior.",
      name: "Arjun Rao",
      location: "HSR Layout",
      rating: 5,
      date: "5 days ago"
    },
    {
      text: "Outstanding audio system installation! The Sony system sounds crystal clear. The team was very knowledgeable and helpful throughout.",
      name: "Deepika Joshi",
      location: "Sector 2, HSR",
      rating: 5,
      date: "1 week ago"
    }
  ];

  const testimonialsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * testimonialsPerSlide;
    return testimonials.slice(startIndex, startIndex + testimonialsPerSlide);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section id="testimonials" className="py-20 bg-secondary-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Customer Reviews</h2>
          <p className="text-xl text-light-gray">What our customers say about us!</p>
          <div className="flex justify-center items-center mt-4 space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-white font-bold">4.9/5</span>
            <span className="text-light-gray">({testimonials.length} reviews)</span>
          </div>
        </div>
        
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {getCurrentTestimonials().map((testimonial, index) => (
              <Card key={`${currentSlide}-${index}`} className="product-card rounded-2xl p-6 text-left">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-light-gray">{testimonial.date}</span>
                  </div>
                  <p className="text-light-gray mb-4">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-light-gray">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center space-x-4">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex space-x-2">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-accent-orange' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center mt-8">
            <a
              href="https://g.co/kgs/Y7YNcjk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-accent-orange text-white px-6 py-3 rounded-lg hover:bg-accent-orange-light transition-colors font-medium"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View More Reviews on Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
