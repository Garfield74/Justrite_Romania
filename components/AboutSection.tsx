import React from 'react';
import { MapPin, Award, Calendar } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-10 lg:mb-0">
            <h2 className="text-base text-brand-yellow font-semibold tracking-wide uppercase">Our Heritage</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Over a Century of Safety Innovation
            </p>
            <p className="mt-4 text-lg text-gray-600">
              <strong>From Chicago to Global Leadership</strong>
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Founded in 1906 in Chicago, Justrite pioneered workplace safety with the iconic Justrite Safety Can, revolutionizing 
              how industries handle flammable liquids. What began as a single product innovation has evolved into a comprehensive 
              global safety ecosystem.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Through strategic acquisitions of leading brands including <strong>Eagle, NoTrax, Checkers, and Sall</strong>, we've built the 
              Justrite Safety Group—a family of specialized brands delivering integrated safety solutions across every industrial sector. 
              Today, we combine American innovation with European precision engineering to protect workplaces worldwide.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Our Romanian operations in <strong>Galați</strong> bring this century-long expertise directly to Eastern European industries, 
              offering both time-tested reliability and cutting-edge safety technology.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="h-8 w-8 text-brand-red mb-2" />
                <span className="font-bold text-gray-900">Since 1906</span>
                <span className="text-sm text-gray-500">118 Years of Safety</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <MapPin className="h-8 w-8 text-brand-yellow mb-2" />
                <span className="font-bold text-gray-900">Galați, Romania</span>
                <span className="text-sm text-gray-500">Local Presence</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <Award className="h-8 w-8 text-blue-600 mb-2" />
                <span className="font-bold text-gray-900">FM, UL, TUV</span>
                <span className="text-sm text-gray-500">Global Certifications</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-w-3 aspect-h-2 rounded-lg shadow-xl overflow-hidden">
               <img
                src="/old_vintage_justrite_safety_can.png"
                alt="Vintage Justrite Safety Can - Over a Century of Safety Innovation Since 1906"
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-brand-yellow p-6 rounded-lg shadow-lg hidden md:block">
              <p className="text-brand-black font-bold text-xl">Global Standards</p>
              <p className="text-brand-black/80 text-sm">Local Excellence</p>
            </div>
          </div>
        </div>

        {/* Building Complete Safety Ecosystems */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900">Building Complete Safety Ecosystems</h3>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              At Justrite Romania, we don't just sell products—we identify vulnerabilities and engineer comprehensive safety solutions 
              tailored to your facility's unique risks. Our approach combines decades of expertise with on-site risk analysis to create 
              integrated protection systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-brand-yellow/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-red font-bold text-2xl">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Risk Assessment</h4>
              <p className="text-gray-600 text-sm">Comprehensive workplace hazard identification and vulnerability mapping</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-yellow/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-red font-bold text-2xl">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Custom Engineering</h4>
              <p className="text-gray-600 text-sm">Tailored solutions designed for your specific operational requirements</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-yellow/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-red font-bold text-2xl">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Compliance Assurance</h4>
              <p className="text-gray-600 text-sm">Full alignment with Romanian and EU safety regulations</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-yellow/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-red font-bold text-2xl">4</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Implementation Support</h4>
              <p className="text-gray-600 text-sm">End-to-end installation guidance and ongoing technical assistance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};