import React from 'react';
import { Product } from '../types';
import { Trash2, Droplets, CheckCircle } from 'lucide-react';

const products: Product[] = [
  {
    id: 'waste-containers',
    title: 'Oily Waste Cans',
    description: 'Essential for the safe disposal of oil-soaked rags and wipes. Prevents spontaneous combustion and reduces fire risks in the workplace.',
    imageUrl: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=600&h=400', // Placeholder representing industrial container
    features: ['Self-closing lid', 'Foot-operated pedal', 'Ventilated bottom', 'FM Approved']
  },
  {
    id: 'plunger-cans',
    title: 'Safety Plunger Cans',
    description: 'Dispense flammable liquids safely and efficiently. The spring-loaded dasher plate acts as a flame arrester and minimizes waste.',
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=600&h=400', // Placeholder representing lab/safety equipment
    features: ['Chemically resistant', 'Flame arrester', 'Precision dispensing', 'Rugged durability']
  }
];

export const ProductSection: React.FC = () => {
  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-brand-red font-semibold tracking-wide uppercase">Our Core Products</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Built for Safety. Built to Last.
          </p>
          <p className="max-w-2xl text-xl text-gray-500 lg:mx-auto mt-4">
            We focus on critical safety equipment designed to manage hazardous materials and maintain a compliant, safe working environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <div className="h-64 w-full overflow-hidden relative group">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                <div className="absolute top-4 right-4 bg-brand-yellow text-brand-black font-bold px-3 py-1 rounded-full text-sm shadow-md">
                    Best Seller
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                    {product.id === 'waste-containers' ? (
                        <Trash2 className="h-8 w-8 text-brand-red mr-3" />
                    ) : (
                        <Droplets className="h-8 w-8 text-brand-red mr-3" />
                    )}
                  <h3 className="text-2xl font-bold text-gray-900">{product.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed h-20">
                  {product.description}
                </p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                    <button className="w-full bg-gray-900 text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors">
                        View Specifications
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
