import React from 'react';
import { MapPin, Award, Calendar } from 'lucide-react';
import { useLanguage, translations } from '../i18n';

export const AboutSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations.about;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-10 lg:mb-0">
            <h2 className="text-base text-brand-yellow font-semibold tracking-wide uppercase">{t.heritage[language]}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t.centuryInnovation[language]}
            </p>
            <p className="mt-4 text-lg text-gray-600">
              <strong>{t.chicagoToGlobal[language]}</strong>
            </p>
            <p className="mt-4 text-lg text-gray-600">
              {t.paragraph1[language]}
            </p>
            <p className="mt-4 text-lg text-gray-600">
              {t.paragraph2[language]}
            </p>
            <p className="mt-4 text-lg text-gray-600">
              {t.paragraph3[language]}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="h-8 w-8 text-brand-red mb-2" />
                <span className="font-bold text-gray-900">{t.since1906[language]}</span>
                <span className="text-sm text-gray-500">{t.yearsOfSafety[language]}</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <MapPin className="h-8 w-8 text-brand-yellow mb-2" />
                <span className="font-bold text-gray-900">Galați, Romania</span>
                <span className="text-sm text-gray-500">{t.localPresence[language]}</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <Award className="h-8 w-8 text-blue-600 mb-2" />
                <span className="font-bold text-gray-900">FM, UL, TUV</span>
                <span className="text-sm text-gray-500">{t.globalCertifications[language]}</span>
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
              <p className="text-brand-black font-bold text-xl">{t.globalStandards[language]}</p>
              <p className="text-brand-black/80 text-sm">{t.localExcellence[language]}</p>
            </div>
          </div>
        </div>

        {/* Building Complete Safety Ecosystems */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900">{t.buildingSafetyTitle[language]}</h3>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              {t.buildingSafetyDesc[language]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-brand-yellow/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-red font-bold text-2xl">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t.riskAssessment[language]}</h4>
              <p className="text-gray-600 text-sm">{t.riskAssessmentDesc[language]}</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-yellow/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-red font-bold text-2xl">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t.customEngineering[language]}</h4>
              <p className="text-gray-600 text-sm">{t.customEngineeringDesc[language]}</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-yellow/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-red font-bold text-2xl">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t.complianceAssurance[language]}</h4>
              <p className="text-gray-600 text-sm">{t.complianceAssuranceDesc[language]}</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-yellow/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-red font-bold text-2xl">4</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t.implementationSupport[language]}</h4>
              <p className="text-gray-600 text-sm">{t.implementationSupportDesc[language]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
