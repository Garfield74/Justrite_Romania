import React from 'react';
import { Download, FileText, ExternalLink, Factory, Flame, Footprints, Droplet, Cable, ShieldCheck } from 'lucide-react';

interface Catalogue {
  id: string;
  brand: string;
  title: string;
  description: string;
  filename: string;
  icon: React.ReactNode;
  color: string;
  brandColor: string;
}

const catalogues: Catalogue[] = [
  {
    id: 'sall',
    brand: 'Sall',
    title: 'Materials Storage and Handling Essentials',
    description: 'Complete range of Italian-engineered storage solutions for industrial materials',
    filename: 'Sall-Materials-Storage-and-Handling-Essentials.pdf',
    icon: '🏗️',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 'justrite-industrial',
    brand: 'Justrite',
    title: 'Industrial Storage & Handling Solutions for Hazardous Materials',
    description: 'Comprehensive guide to safe storage and handling of hazardous industrial materials',
    filename: 'Justrite-Industrial-Storage-Handling-Solutions-for-Hazardous-Materials.pdf',
    icon: '⚠️',
    color: 'from-red-500 to-red-700'
  },
  {
    id: 'justrite-safety',
    brand: 'Justrite',
    title: 'Safety Cans & Material Handling Solutions',
    description: 'Industry-leading safety cans and material handling equipment specifications',
    filename: 'Justrite-Safety-Cans-Material-Handling-Solutions.pdf',
    icon: '🛢️',
    color: 'from-red-500 to-red-700'
  },
  {
    id: 'notrax-ergonomic',
    brand: 'NoTrax',
    title: 'Ergonomic, Anti-Fatigue & Safety Matting',
    description: 'Reduce workplace fatigue and improve safety with premium ergonomic matting',
    filename: 'NoTrax-Ergonomic-Anti-Fatigue-Safety-Matting.pdf',
    icon: '🦺',
    color: 'from-green-500 to-green-700'
  },
  {
    id: 'notrax-dust',
    brand: 'NoTrax',
    title: 'Dust Control & Entrance Matting',
    description: 'Keep facilities clean and safe with professional entrance matting systems',
    filename: 'NoTrax-Dust-Control-Entrance-Matting.pdf',
    icon: '🚪',
    color: 'from-green-500 to-green-700'
  },
  {
    id: 'hughes',
    brand: 'Hughes',
    title: 'Emergency Safety Showers & Eye Washes',
    description: 'ANSI-compliant emergency response equipment for chemical exposure protection',
    filename: 'Hughes-Emergency-Safety-Showers-Eye-Washes.pdf',
    icon: '🚿',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'checkers',
    brand: 'Checkers',
    title: 'Cable Management, Vehicle Safety, and Ground Protection',
    description: 'Professional solutions for cable management and workplace vehicle safety',
    filename: 'Checkers-Cable-Management-Vehicle-Safety-Ground-Protection.pdf',
    icon: '🚧',
    color: 'from-purple-500 to-purple-700'
  }
];

export const ResourcesSection: React.FC = () => {
  return (
    <section id="resources" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-base text-brand-red font-semibold tracking-wide uppercase">
            Resources & Downloads
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Product Catalogues & Technical Documentation
          </p>
          <p className="max-w-2xl text-xl text-gray-500 lg:mx-auto mt-4">
            Download comprehensive product catalogues from our family of brands. Each catalogue includes 
            detailed specifications, certifications, and ordering information.
          </p>
        </div>

        {/* Catalogues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogues.map((catalogue) => (
            <div 
              key={catalogue.id}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
              data-testid={`catalogue-${catalogue.id}`}
            >
              {/* Brand Badge */}
              <div className={`bg-gradient-to-r ${catalogue.color} p-4 relative`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white text-xs font-bold uppercase tracking-wider">
                      {catalogue.brand}
                    </span>
                  </div>
                  <span className="text-3xl">{catalogue.icon}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                  {catalogue.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {catalogue.description}
                </p>

                {/* Download Button */}
                <a
                  href={`/catalogues/${catalogue.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-brand-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors group-hover:bg-brand-red"
                  data-testid={`download-${catalogue.id}`}
                >
                  <Download className="h-5 w-5" />
                  <span>Download PDF</span>
                  <ExternalLink className="h-4 w-4 opacity-60" />
                </a>
              </div>

              {/* File Info */}
              <div className="px-6 pb-4">
                <div className="flex items-center text-xs text-gray-500">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>PDF Document</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-brand-black rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need Technical Assistance?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our technical team is available to help you select the right products for your specific requirements. 
            Contact us for personalized recommendations and custom solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:sales.romania@buyjustrite.eu"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-brand-black bg-brand-yellow hover:bg-yellow-400 transition-colors"
            >
              Email Technical Team
            </a>
            <a
              href="tel:+40236325301"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
            >
              Call: 0236 325 301
            </a>
          </div>
        </div>

        {/* Quick Links to Main Brands */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 mb-4">Explore our brand websites for more resources:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://www.justritesafetygroup.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-red hover:text-red-700 font-semibold text-sm transition-colors"
            >
              Justrite Safety Group →
            </a>
            <a 
              href="https://www.sall.it" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-red hover:text-red-700 font-semibold text-sm transition-colors"
            >
              Sall Italia →
            </a>
            <a 
              href="https://www.notrax.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-red hover:text-red-700 font-semibold text-sm transition-colors"
            >
              NoTrax →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
