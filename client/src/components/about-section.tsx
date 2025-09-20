import { Card, CardContent } from "@/components/ui/card";
import { Tag, Shield, Users } from "lucide-react";
import { getAssetUrl } from "@/lib/assets";

export default function AboutSection() {
  const features = [
    {
      icon: <Tag className="text-white" />,
      title: "Competitive Pricing",
      subtitle: "Best Value Products"
    },
    {
      icon: <Shield className="text-white" />,
      title: "Quality Assurance",
      subtitle: "Genuine Products"
    },
    {
      icon: <Users className="text-white" />,
      title: "Expert Support",
      subtitle: "Professional Service"
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">About Us</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Who we are</h3>
            <p className="text-light-gray mb-6">
              At Unique Car Accessories, we are passionate about cars and committed to provide the best products and exceptional service. With our expertise and dedication, we are driven to exceed your expectations. We carefully curate our selection from trusted manufacturers, ensuring durability, performance, and style in every product we offer.
            </p>
            
            <h3 className="text-2xl font-bold mb-6 text-white">Our Mission</h3>
            <p className="text-light-gray">
              Our mission is to provide car enthusiasts with the highest quality car accessories, offering a wide selection of products that enhance performance, style, and functionality. We strive to exceed customer expectations by delivering exceptional value, outstanding service, and a seamless shopping experience.
            </p>
          </div>
          
          <div className="flex justify-center">
            <img 
              src={getAssetUrl("Luxury Car Detailing in Action_1751633951336.png")}
              alt="Professional luxury car detailing services at Unique Car Accessories"
              className="rounded-xl shadow-lg max-w-md w-full"
            />
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-8 text-white">Why Choose Us</h3>
          <p className="text-xl text-light-gray mb-12 max-w-3xl mx-auto">
            We ensure extensive expertise, uncompromising quality! Your trusted partner for an enhanced car experience.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-primary-dark/30 hover:bg-primary-dark/50 transition-colors">
                <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-2">{feature.title}</h4>
                  <p className="text-light-gray">{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
