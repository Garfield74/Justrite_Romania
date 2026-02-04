import React from 'react';
import { Users, Building2, Leaf } from 'lucide-react';
import { useLanguage, translations } from '../i18n';

export const MissionSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations.mission;

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            {t.title[language]}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-brand-yellow rounded-full">
                <Users className="h-10 w-10 text-brand-black" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{t.workforce[language]}</h3>
            <p className="text-gray-400">
              {t.workforceDesc[language]}
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-brand-yellow rounded-full">
                <Building2 className="h-10 w-10 text-brand-black" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{t.asset[language]}</h3>
            <p className="text-gray-400">
              {t.assetDesc[language]}
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-brand-yellow rounded-full">
                <Leaf className="h-10 w-10 text-brand-black" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{t.environmental[language]}</h3>
            <p className="text-gray-400">
              {t.environmentalDesc[language]}
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t.philosophy[language]}
          </p>
        </div>
      </div>
    </section>
  );
};
