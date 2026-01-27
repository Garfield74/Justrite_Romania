import React from 'react';
import { Award, Globe, Users, TrendingUp } from 'lucide-react';

export const StatisticsSection: React.FC = () => {
  const stats = [
    {
      icon: <Award className="h-10 w-10 text-brand-yellow" />,
      value: '118',
      label: 'Years of Experience',
      description: 'Over a century of safety innovation'
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-brand-yellow" />,
      value: '100%',
      label: 'EU Compliance',
      description: 'Every product certified to European standards'
    },
    {
      icon: <Users className="h-10 w-10 text-brand-yellow" />,
      value: '6',
      label: 'Integrated Brands',
      description: 'Justrite, Sall, Eagle, NoTrax, Checkers'
    },
    {
      icon: <Globe className="h-10 w-10 text-brand-yellow" />,
      value: '50+',
      label: 'Countries Served',
      description: 'Global expertise with local presence'
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
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
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