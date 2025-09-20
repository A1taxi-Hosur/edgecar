import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoPath from "@assets/LL-removebg-preview_1751631586310.png";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (window.location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed w-full z-50 bg-primary-dark/95 backdrop-blur-md border-b border-secondary-dark">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <img 
            src={logoPath} 
            alt="Unique Car Accessories" 
            className="h-12 w-auto" 
          />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('home')} className="text-light-gray hover:text-accent-orange transition-colors py-2 interactive-element">
            Home
          </button>
          <Link href="/products" className="text-light-gray hover:text-accent-orange transition-colors py-2 interactive-element">
            Products
          </Link>
          <button onClick={() => scrollToSection('testimonials')} className="text-light-gray hover:text-accent-orange transition-colors py-2 interactive-element">
            Testimonials
          </button>
          <button onClick={() => scrollToSection('location')} className="text-light-gray hover:text-accent-orange transition-colors py-2 interactive-element">
            Location
          </button>
          <a href="tel:+916366239811" className="bg-accent-orange text-white px-4 py-2 rounded-lg btn-interactive floating">
            Call Now
          </a>
          <button onClick={() => scrollToSection('quote')} className="border border-accent-orange text-accent-orange px-4 py-2 rounded-lg hover:bg-accent-orange hover:text-white btn-interactive magnetic-hover">
            Get Quote
          </button>
        </nav>
        
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary-dark border-t border-secondary-dark p-4">
          <div className="flex flex-col space-y-4">
            <button onClick={() => scrollToSection('home')} className="text-light-gray hover:text-accent-orange transition-colors text-left">
              Home
            </button>
            <Link href="/products" className="text-light-gray hover:text-accent-orange transition-colors">
              Products
            </Link>
            <button onClick={() => scrollToSection('testimonials')} className="text-light-gray hover:text-accent-orange transition-colors text-left">
              Testimonials
            </button>
            <button onClick={() => scrollToSection('location')} className="text-light-gray hover:text-accent-orange transition-colors text-left">
              Location
            </button>
            <a href="tel:+916366239811" className="bg-accent-orange text-white px-4 py-2 rounded-lg hover:bg-accent-orange-light transition-colors text-center">
              Call Now
            </a>
            <button onClick={() => scrollToSection('quote')} className="border border-accent-orange text-accent-orange px-4 py-2 rounded-lg hover:bg-accent-orange hover:text-white transition-colors">
              Get Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
