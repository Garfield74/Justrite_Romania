import React from 'react';
import { Download, FileText, ExternalLink, Factory, Flame, Footprints, Droplet, Cable, ShieldCheck } from 'lucide-react';
import { useLanguage, translations } from '../i18n';

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
    description: 'Complete range of Italian-engineered storage solutions for industrial materials and hazardous substance containment',
    filename: 'Sall-Materials-Storage-and-Handling-Essentials.pdf',
    icon: <Factory className="h-8 w-8" />,
    color: 'from-blue-600 to-blue-800',
    brandColor: 'bg-blue-600'
  },
  {
    id: 'justrite-industrial',
    brand: 'Justrite',
    title: 'Industrial Storage & Handling Solutions for Hazardous Materials',
    description: 'Comprehensive guide to safe storage and handling of hazardous industrial materials with fire safety heritage',
    filename: 'Justrite-Industrial-Storage-Handling-Solutions-for-Hazardous-Materials.pdf',
    icon: <ShieldCheck className="h-8 w-8" />,
    color: 'from-red-600 to-red-800',
    brandColor: 'bg-red-600'
  },
  {
    id: 'justrite-safety',
    brand: 'Justrite',
    title: 'Safety Cans & Material Handling Solutions',
    description: 'Industry-leading safety cans and material handling equipment specifications with fire safety focus',
    filename: 'Justrite-Safety-Cans-Material-Handling-Solutions.pdf',
    icon: <Flame className="h-8 w-8" />,
    color: 'from-red-600 to-red-800',
    brandColor: 'bg-red-600'
  },
  {
    id: 'notrax-ergonomic',
    brand: 'NoTrax',
    title: 'Ergonomic, Anti-Fatigue & Safety Matting',
    description: 'Reduce workplace fatigue and improve safety with premium ergonomic matting - ISO-certified manufacturing',
    filename: 'NoTrax-Ergonomic-Anti-Fatigue-Safety-Matting.pdf',
    icon: <Footprints className="h-8 w-8" />,
    color: 'from-green-600 to-green-800',
    brandColor: 'bg-green-600'
  },
  {
    id: 'notrax-dust',
    brand: 'NoTrax',
    title: 'Dust Control & Entrance Matting',
    description: 'Keep facilities clean and safe with professional entrance matting systems and custom logo options',
    filename: 'NoTrax-Dust-Control-Entrance-Matting.pdf',
    icon: <Footprints className="h-8 w-8" />,
    color: 'from-green-600 to-green-800',
    brandColor: 'bg-green-600'
  },
  {
    id: 'hughes',
    brand: 'Hughes',
    title: 'Emergency Safety Showers & Eye Washes',
    description: 'ANSI Z358.1 compliant emergency response equipment for chemical exposure protection - Over 50 years experience',
    filename: 'Hughes-Emergency-Safety-Showers-Eye-Washes.pdf',
    icon: <Droplet className="h-8 w-8" />,
    color: 'from-cyan-600 to-blue-700',
    brandColor: 'bg-cyan-600'
  },
  {
    id: 'checkers',
    brand: 'Checkers',
    title: 'Cable Management, Vehicle Safety, and Ground Protection',
    description: 'Professional solutions for cable management and workplace vehicle safety - Made in USA with high-visibility designs',
    filename: 'Checkers-Cable-Management-Vehicle-Safety-Ground-Protection.pdf',
    icon: <Cable className="h-8 w-8" />,
    color: 'from-yellow-500 to-orange-600',
    brandColor: 'bg-yellow-500'
  }
];

export const ResourcesSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations.resources;

  return (
    <section id="resources" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-base text-brand-red font-semibold tracking-wide uppercase">
            {t.title[language]}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t.cataloguesTitle[language]}
          </p>
          <p className="max-w-2xl text-xl text-gray-500 lg:mx-auto mt-4">
            {t.cataloguesDesc[language]}
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
                  <div className="flex items-center gap-3">
                    <div className={`${catalogue.brandColor} p-2 rounded-lg bg-white/20 backdrop-blur-sm`}>
                      <div className="text-white">
                        {catalogue.icon}
                      </div>
                    </div>
                    <span className="text-white text-sm font-bold uppercase tracking-wider">
                      {catalogue.brand}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-semibold">
                    PDF
                  </div>
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
                  <span>{t.downloadPdf[language]}</span>
                  <ExternalLink className="h-4 w-4 opacity-60" />
                </a>
              </div>

              {/* File Info */}
              <div className="px-6 pb-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{t.pdfDocument[language]}</span>
                  </div>
                  <span className="text-gray-400">{t.clickToOpen[language]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-brand-black rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            {t.needHelp[language]}
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            {t.needHelpDesc[language]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:sales.ro@justrite.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-brand-black bg-brand-yellow hover:bg-yellow-400 transition-colors"
            >
              {t.emailTechnical[language]}
            </a>
            <a
              href="tel:+40236325301"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
            >
              Call: 0236 325 301
            </a>
            <a
              href="tel:+40751556555"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
            >
              Mobile: +40 751 556 555
            </a>
          </div>
        </div>

        {/* Quick Links to Main Brands */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 mb-4">{t.exploreBrands[language]}</p>
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
