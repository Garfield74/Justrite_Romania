import React from 'react';
import { Factory, FlaskConical, UtensilsCrossed, Hospital, HardHat, Truck } from 'lucide-react';
import { useLanguage, translations } from '../i18n';

export const IndustriesSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations.industries;

  const industries = [
    {
      icon: <Factory className="h-8 w-8" />,
      title: t.manufacturing.title[language],
      description: t.manufacturing.description[language]
    },
    {
      icon: <FlaskConical className="h-8 w-8" />,
      title: t.chemical.title[language],
      description: t.chemical.description[language]
    },
    {
      icon: <UtensilsCrossed className="h-8 w-8" />,
      title: t.food.title[language],
      description: t.food.description[language]
    },
    {
      icon: <Hospital className="h-8 w-8" />,
      title: t.healthcare.title[language],
      description: t.healthcare.description[language]
    },
    {
      icon: <HardHat className="h-8 w-8" />,
      title: t.construction.title[language],
      description: t.construction.description[language]
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: t.logistics.title[language],
      description: t.logistics.description[language]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-brand-red font-semibold tracking-wide uppercase">{t.subtitle[language]}</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t.title[language]}
          </p>
          <p className="max-w-2xl text-xl text-gray-500 lg:mx-auto mt-4">
            {t.description[language]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              data-testid={`industry-${index}`}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-brand-yellow/10 rounded-lg mb-4">
                <div className="text-brand-red">
                  {industry.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{industry.title}</h3>
              <p className="text-gray-600 leading-relaxed">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
