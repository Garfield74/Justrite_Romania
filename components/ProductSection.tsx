import React from 'react';
import { Product } from '../types';
import { Flame, Home, Droplets, ShowerHead, Wind, Users } from 'lucide-react';

const products: Product[] = [
  {
    id: 'industrial-metal-containers',
    title: 'Industrial Metal Containers',
    description: 'Versatile storage solutions including sheet metal containers, wire mesh containers, metal containers with wolf mouth, and folding metal containers for efficient warehouse organization.',
    imageUrl: 'https://images.unsplash.com/photo-1759647028384-1efcc6e0eff4?auto=format&fit=crop&q=80&w=600&h=400',
    features: ['Sheet Metal Containers', 'Wire Mesh Containers', 'Wolf Mouth Design', 'Folding Options']
  },
  {
    id: 'liquid-containment-tank',
    title: 'Liquid Containment Tank',
    description: 'Professional spill containment solutions featuring steel collection tanks, drum trolleys with integrated collection systems, and floor-mounted steel collection tanks for leak prevention.',
    imageUrl: 'https://images.unsplash.com/photo-1743228746138-c8690a2f7ffa?auto=format&fit=crop&q=80&w=600&h=400',
    features: ['Steel Collection Tank', 'Drum Trolleys', 'Floor Collection Systems', 'Spill Prevention']
  },
  {
    id: 'metal-pallets',
    title: 'Metal Pallets',
    description: 'Durable metal pallet systems including stackable free-standing designs, pallet bar holders, fabric pallets, and specialized pallets & cylinder baskets for diverse storage needs.',
    imageUrl: 'https://images.unsplash.com/photo-1573845949327-18db541e187f?auto=format&fit=crop&q=80&w=600&h=400',
    features: ['Stackable Design', 'Free-Standing', 'Pallet Bar Holder', 'Cylinder Baskets']
  },
  {
    id: 'open-bottom-containers',
    title: 'Open Bottom Containers',
    description: 'Specialized open bottom container systems designed for efficient loading, unloading, and material handling in industrial environments.',
    imageUrl: 'https://images.unsplash.com/photo-1616614979687-8a8fece9cfb2?auto=format&fit=crop&q=80&w=600&h=400',
    features: ['Easy Loading', 'Efficient Unloading', 'Industrial Grade', 'Durable Construction']
  },
  {
    id: 'big-bag-holders',
    title: 'Big Bag Holders',
    description: 'Robust FIBC (Flexible Intermediate Bulk Container) holders and frames designed for safe handling and storage of bulk materials in large bags.',
    imageUrl: 'https://images.unsplash.com/photo-1762033159465-9d9e0e1e7401?auto=format&fit=crop&q=80&w=600&h=400',
    features: ['FIBC Compatible', 'Heavy Duty Frame', 'Safe Handling', 'Bulk Storage']
  },
  {
    id: 'waste-cans-receptacles',
    title: 'Waste Cans & Receptacles',
    description: 'Industry-leading safety waste containers including oily waste cans, safety plunger cans, and safety bench cans for compliant hazardous material disposal.',
    imageUrl: 'https://images.unsplash.com/photo-1763310225071-af00bef26d1c?auto=format&fit=crop&q=80&w=600&h=400',
    features: ['Oily Waste Cans', 'Safety Plunger Cans', 'Safety Bench Cans', 'FM Approved']
  }
];

const getIcon = (id: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    'safety-cans': <Flame className="h-8 w-8 text-brand-red" />,
    'outdoor-storage': <Home className="h-8 w-8 text-brand-red" />,
    'spill-containment': <Droplets className="h-8 w-8 text-brand-red" />,
    'emergency-equipment': <ShowerHead className="h-8 w-8 text-brand-red" />,
    'gas-cylinder': <Wind className="h-8 w-8 text-brand-red" />,
    'ergonomic-solutions': <Users className="h-8 w-8 text-brand-red" />
  };
  return icons[id] || <Flame className="h-8 w-8 text-brand-red" />;
};

export const ProductSection: React.FC = () => {
  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-brand-red font-semibold tracking-wide uppercase">Comprehensive Product Portfolio</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Built for Safety. Built to Last.
          </p>
          <p className="max-w-2xl text-xl text-gray-500 lg:mx-auto mt-4">
            From flammable liquid storage to emergency response equipment, our extensive range addresses every aspect of industrial safety. 
            Each product line is engineered to the highest standards and certified for compliance with stringent EU regulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
              data-testid={`product-${product.id}`}
            >
              <div className="h-48 w-full overflow-hidden relative group">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {getIcon(product.id)}
                  <h3 className="text-xl font-bold text-gray-900 ml-3">{product.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm min-h-[80px]">
                  {product.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="#contact"
                  className="block w-full text-center bg-brand-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors text-sm"
                >
                  Request Information
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Why Romanian Businesses Choose Justrite</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-brand-yellow rounded-lg p-3">
                <span className="text-brand-black font-bold text-lg">✓</span>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-900">Local Expertise, Global Standards</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Our Galați facility combines the accessibility of local service with the quality standards of a global leader.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-brand-yellow rounded-lg p-3">
                <span className="text-brand-black font-bold text-lg">✓</span>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-900">Rapid Delivery & Support</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Immediate access to engineering support and consultation services—all delivered in Romanian.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-brand-yellow rounded-lg p-3">
                <span className="text-brand-black font-bold text-lg">✓</span>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-900">Romanian Compliance Knowledge</h4>
                <p className="text-gray-600 text-sm mt-1">
                  We understand Romanian workplace regulations and the specific challenges facing Eastern European industries.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-brand-yellow rounded-lg p-3">
                <span className="text-brand-black font-bold text-lg">✓</span>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-900">Comprehensive Solutions</h4>
                <p className="text-gray-600 text-sm mt-1">
                  From chemical storage to waste handling, we offer integrated safety solutions unavailable elsewhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
