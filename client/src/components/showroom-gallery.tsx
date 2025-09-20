import { getAssetUrl } from "@/lib/assets";

export default function ShowroomGallery() {
  const images = [
    "@assets/2025-05-20 (1)_1751633753234.jpg",  // Skoda with LED headlight packages
    "@assets/2025-05-20 (2)_1751633753235.webp", // Hyundai in service bay 
    "@assets/2023-05-06 (1)_1751633753236.webp", // BMW with dash cam installation
    "@assets/2025-03-09 (1)_1751633753236.webp", // Morel speaker installation close-up
    "@assets/2025-05-06 (1)_1751633753237.webp", // Yellow Volkswagen in showroom
    "@assets/2025-05-20_1751633753237.jpg",      // White Ford EcoSport in showroom
    "@assets/2023-05-06_1751633753238.webp",     // Exterior showroom view with Unique Car branding
    "@assets/2025-03-03_1751633753238.webp",     // Street view of Unique Car Accessories shop
    "@assets/2025-05-20 (1)_1751633753238.webp", // White BMW with LED headlight kit
    "@assets/2025-03-09_1751633753238.webp",     // White Hyundai with LED upgrades
    "@assets/2025-05-03_1751633753239.webp",     // Car interior dashboard multimedia system
    "@assets/2025-05-06_1751633753239.webp"      // White Mahindra Thar with LED headlights
  ];

  return (
    <section id="showroom" className="py-20 bg-primary-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Showroom</h2>
          <p className="text-xl text-light-gray">
            Personalize Your Vehicle with Premium Accessories!
          </p>
          <p className="text-lg text-light-gray mt-4">
            Step into a world of style, convenience, and functionality as you explore our extensive collection of top-quality car accessories. We offer a wide range of options to suit your tastes and preferences.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <img 
              key={index}
              src={getAssetUrl(image)}
              alt={`Showroom image ${index + 1}`}
              className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow w-full h-64 object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
