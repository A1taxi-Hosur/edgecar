import { Link } from "wouter";
import { Car, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logoPath from "@assets/LL-removebg-preview_1751631586310.png";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary-dark border-t border-secondary-dark py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logoPath} 
                alt="Unique Car Accessories" 
                className="h-10 w-auto" 
              />
            </div>
            <p className="text-light-gray">
              Your trusted partner for premium car accessories in Bangalore. Enhancing your driving experience with quality products and exceptional service.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-light-gray">
              <li>
                <button onClick={() => scrollToSection('home')} className="hover:text-accent-orange transition-colors">
                  Home
                </button>
              </li>
              <li>
                <Link href="/products" className="hover:text-accent-orange transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <button onClick={() => scrollToSection('showroom')} className="hover:text-accent-orange transition-colors">
                  Showroom
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-accent-orange transition-colors">
                  About Us
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Products</h4>
            <ul className="space-y-2 text-light-gray">
              <li><a href="#" className="hover:text-accent-orange transition-colors">Audio Systems</a></li>
              <li><a href="#" className="hover:text-accent-orange transition-colors">LED Headlights</a></li>
              <li><a href="#" className="hover:text-accent-orange transition-colors">Dash Cameras</a></li>
              <li><a href="#" className="hover:text-accent-orange transition-colors">Seat Covers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Contact Info</h4>
            <ul className="space-y-2 text-light-gray">
              <li className="flex items-center space-x-2">
                <span className="text-accent-orange">📞</span>
                <span>+91 6366239811</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent-orange">📍</span>
                <span>HSR Layout, Bengaluru, Karnataka</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent-orange">✉️</span>
                <span>info@uniquecaraccessories.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-dark pt-8 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <h4 className="font-bold text-white">Follow Us on</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-light-gray hover:text-accent-orange transition-colors">
                <Facebook className="text-xl" />
              </a>
              <a href="#" className="text-light-gray hover:text-accent-orange transition-colors">
                <Instagram className="text-xl" />
              </a>
              <a href="#" className="text-light-gray hover:text-accent-orange transition-colors">
                <Twitter className="text-xl" />
              </a>
              <a href="#" className="text-light-gray hover:text-accent-orange transition-colors">
                <Youtube className="text-xl" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-light-gray text-sm">
              © UniqueCarAccessories All Right Reserved
            </p>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <Link 
                href="/admin" 
                className="text-xs text-gray-500 hover:text-accent-orange transition-colors px-2 py-1 rounded border border-gray-700 hover:border-accent-orange"
              >
                Admin
              </Link>
              <p className="text-light-gray text-sm">
                Created by <span className="text-accent-orange font-semibold">ZARA CREATIONS</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
