import React from 'react';
import { MapPin, Globe, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-10 lg:mb-0">
            <h2 className="text-base text-brand-yellow font-semibold tracking-wide uppercase">Our Heritage</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Global Standards, Local Excellence
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Justrite Romania SRL is a proud subsidiary of the Justrite Manufacturing Group, a global leader in industrial safety based in the United States.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Located strategically in Romania, we serve the European market with high-quality safety containers manufactured to the same rigorous standards (FM Global, UL/ULC, TUV) as our American parent company. We ensure your facility meets the highest safety regulations for handling flammable liquids.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <MapPin className="h-8 w-8 text-brand-red mb-2" />
                <span className="font-bold text-gray-900">Romania</span>
                <span className="text-sm text-gray-500">Strategic Location</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <Globe className="h-8 w-8 text-blue-600 mb-2" />
                <span className="font-bold text-gray-900">Global Group</span>
                <span className="text-sm text-gray-500">US Parent Company</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <Award className="h-8 w-8 text-brand-yellow mb-2" />
                <span className="font-bold text-gray-900">Certified</span>
                <span className="text-sm text-gray-500">FM, UL, TUV</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-w-3 aspect-h-2 rounded-lg shadow-xl overflow-hidden">
               <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Justrite Manufacturing Facility"
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-brand-yellow p-6 rounded-lg shadow-lg hidden md:block">
              <p className="text-brand-black font-bold text-xl">Since 1906</p>
              <p className="text-brand-black/80 text-sm">Justrite Group Heritage</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
