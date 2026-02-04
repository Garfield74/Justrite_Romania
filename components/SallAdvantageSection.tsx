import React from 'react';
import { Shield, CheckCircle, Settings } from 'lucide-react';
import { useLanguage, translations } from '../i18n';

export const SallAdvantageSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations.sallAdvantage;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-base text-brand-yellow font-semibold tracking-wide uppercase">{t.subtitle[language]}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t.title[language]}
            </p>
            <p className="mt-4 text-lg text-gray-600">
              {t.paragraph1[language]}
            </p>
            <p className="mt-4 text-lg text-gray-600">
              {t.paragraph2[language]}
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-yellow text-brand-black">
                    <Shield className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">{t.certifiedSteel[language]}</h4>
                  <p className="mt-2 text-gray-600">
                    {t.certifiedSteelDesc[language]}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-yellow text-brand-black">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">{t.euCompliance[language]}</h4>
                  <p className="mt-2 text-gray-600">
                    {t.euComplianceDesc[language]}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-yellow text-brand-black">
                    <Settings className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">{t.customConfig[language]}</h4>
                  <p className="mt-2 text-gray-600">
                    {t.customConfigDesc[language]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <div className="aspect-w-3 aspect-h-2 rounded-lg shadow-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1717386255773-1e3037c81788?auto=format&fit=crop&q=80&w=800"
                alt="Italian Manufacturing Excellence"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mt-6 bg-brand-black p-6 rounded-lg">
              <p className="text-brand-yellow font-bold text-2xl">{t.fiveDecades[language]}</p>
              <p className="text-white text-lg">{t.precisionManufacturing[language]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
