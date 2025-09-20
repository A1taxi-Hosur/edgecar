import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function LocationSection() {
  return (
    <section id="location" className="py-20 bg-secondary-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Location</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Card className="product-card rounded-2xl p-8">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6 text-white">UNIQUE CAR ACCESSORIES</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-accent-orange text-lg mt-1" />
                    <div>
                      <p className="text-light-gray">
                        24th main Kere, near Somasandra Palya,<br />
                        Sector 2, HSR Layout,<br />
                        Bengaluru, Karnataka 560102
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="text-accent-orange text-lg" />
                    <a href="tel:+916366239811" className="text-light-gray hover:text-accent-orange transition-colors">
                      +91 6366239811
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="text-accent-orange text-lg" />
                    <a href="mailto:info@uniquecaraccessories.com" className="text-light-gray hover:text-accent-orange transition-colors">
                      info@uniquecaraccessories.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="product-card rounded-2xl p-8">
              <CardContent className="p-0">
                <h4 className="text-xl font-bold mb-4 text-white flex items-center">
                  <Clock className="text-accent-orange mr-2" />
                  Business Hours
                </h4>
                <div className="space-y-2 text-light-gray">
                  <div className="flex justify-between">
                    <span>Monday - Saturday:</span>
                    <span>10:30 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>10:30 AM - 8:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="product-card rounded-2xl p-4">
            <CardContent className="p-0">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106m!2d77.6485462!3d12.8997278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15df15a252c1%3A0x2dd04bd0bb1aebfa!2sUnique%20Car%20Accessories!5e1!3m2!1sen!2sin!4v1635845231234!5m2!1sen!2sin"
                width="100%" 
                height="400" 
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Unique Car Accessories Location - HSR Layout, Bengaluru"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
