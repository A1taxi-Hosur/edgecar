import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";
import { getAssetUrl } from "@/lib/assets";

const productCategories = [
  { id: 'audio', name: 'Audio' },
  { id: 'light', name: 'Light' },
  { id: 'motors', name: 'Motors' },
  { id: 'dash-camera', name: 'Dash Camera' },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('audio');

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const filteredProducts = products.filter((product: Product) => product.category === activeCategory);

  if (isLoading) {
    return (
      <div className="bg-primary-dark text-light-gray font-sans min-h-screen">
        <Navigation />
        <main className="pt-20 flex items-center justify-center min-h-screen">
          <p className="text-white text-xl">Loading products...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-primary-dark text-light-gray font-sans">
      <Navigation />
      
      <main className="pt-20">
        <section className="py-20 bg-secondary-dark">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
              <p className="text-xl text-light-gray max-w-4xl mx-auto">
                Discover our premium selection of car accessories at Unique Car Accessories. From stylish exterior enhancements to innovative interior upgrades, our products are designed to elevate your vehicle's aesthetics and functionality. Explore our collection and enhance your driving experience.
              </p>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-8 text-center">Brands</h2>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {productCategories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      activeCategory === category.id
                        ? 'bg-accent-orange text-white hover:bg-accent-orange-light'
                        : 'border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white'
                    }`}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {filteredProducts.map((product: Product) => (
                <Card key={product.id} className="product-card rounded-2xl p-6 hover:border-accent-orange/30 transition-all">
                  <CardContent className="p-0">
                    <img 
                      src={getAssetUrl(product.image || '')} 
                      alt={product.name} 
                      className="w-full h-32 object-cover rounded-xl mb-4" 
                    />
                    <h3 className="text-lg font-bold text-white">{product.name}</h3>
                    {product.description && (
                      <p className="text-sm text-light-gray mt-2">{product.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-light-gray">No products found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
