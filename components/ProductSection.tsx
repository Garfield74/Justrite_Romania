import React from 'react';
import { Product } from '../types';
import { Flame, Home, Droplets, ShowerHead, Wind, Users } from 'lucide-react';

const products: Product[] = [
  {
    id: 'safety-cans',
    title: 'Safety Cans & Cabinets',
    description: 'Industry-leading storage solutions for flammable liquids, featuring our legendary safety can design alongside fire-rated cabinets for bulk storage. Available in multiple capacities with advanced venting systems.',
    imageUrl: 'https://images.unsplash.com/photo-1722227089176-a981d2544b5f?auto=format&fit=crop&q=80&w=600&h=400',
    features: ['FM Approved', 'Fire-rated cabinets', 'Advanced venting', 'Multiple capacities']
  },
  {
    id: 'outdoor-storage',
    title: 'Outdoor Storage Systems',
    description: 'Weather-resistant, secure storage buildings and lockers for hazardous materials requiring exterior placement. Engineered for temperature control and environmental protection.',
    imageUrl: 'https://images.unsplash.com/photo-1759277700771-137173db0e5b?auto=format&fit=crop&q=80&w=600&h=400',
    features: ['Weather-resistant', 'Secure locking', 'Temperature control', 'EU certified']
  },
  {
    id: 'spill-containment',
    title: 'Spill Containment',
    description: 'Steel spill pallets, drum storage platforms, and containment systems designed to capture leaks and prevent environmental contamination. Custom configurations available for IBC tanks and bulk storage.',
    imageUrl: 'https://images.unsplash.com/photo-1768759578182-b686cf94ddff?auto=format&fit=crop&q=80&w=600&h=400',
    features: ['Steel construction', 'Custom sizes', 'Environmental protection', 'IBC compatible']
  },
  {
    id: 'emergency-equipment',
    title: 'Emergency Equipment',
    description: 'ANSI-compliant safety showers and eye/face wash stations for immediate response to chemical exposure incidents. Available in plumbed and self-contained models.',
    imageUrl: 'https://images.unsplash.com/photo-1664285831203-fc5687b44e2a?auto=format&fit=crop&q=80&w=600&h=400',
    features: ['ANSI compliant', 'Quick response', 'Multiple models', 'Easy installation']
  },
  {
    id: 'gas-cylinder',
    title: 'Gas Cylinder Storage',
    description: 'Secure storage cages, racks, and cabinets for compressed gas cylinders. Features segregation systems for incompatible materials and chain restraint options.',
    imageUrl: 'https://images.unsplash.com/photo-1664396113489-e50bddd4a777?auto=format&fit=crop&q=80&w=600&h=400',
    features: ['Secure cages', 'Segregation systems', 'Chain restraints', 'Compliant design']
  },
  {
    id: 'ergonomic-solutions',
    title: 'Ergonomic Solutions',
    description: 'Anti-fatigue mats and ergonomic flooring from NoTrax, reducing workplace injury and improving employee comfort in standing work environments.',
    imageUrl: 'https://images.unsplash.com/photo-1717386255773-1e3037c81788?auto=format&fit=crop&q=80&w=600&h=400',
    features: ['Anti-fatigue design', 'NoTrax quality', 'Comfort improvement', 'Injury prevention']
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
