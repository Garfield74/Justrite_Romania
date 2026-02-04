import React from 'react';
import { Award, Globe, Users, TrendingUp } from 'lucide-react';
import { useLanguage, translations } from '../i18n';

export const StatisticsSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations.stats;

  const stats = [
    {
      icon: <Award className="h-10 w-10 text-brand-yellow" />,
      value: '118',
      label: t.yearsExperience[language],
      description: t.yearsDesc[language]
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-brand-yellow" />,
      value: '100%',
      label: t.euCompliance[language],
      description: t.euDesc[language]
    },
    {
      icon: <Users className="h-10 w-10 text-brand-yellow" />,
      value: '6',
      label: t.integratedBrands[language],
      description: t.brandsDesc[language]
    },
    {
      icon: <Globe className="h-10 w-10 text-brand-yellow" />,
      value: '50+',
      label: t.countriesServed[language],
      description: t.countriesDesc[language]
    }
  ];

  return (
    <section className="py-16 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
              data-testid={`stat-${index}`}
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-brand-yellow font-semibold mb-2">{stat.label}</div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
