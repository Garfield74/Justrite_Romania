import React from 'react';
import { Factory, FlaskConical, UtensilsCrossed, Hospital, HardHat, Truck } from 'lucide-react';

export const IndustriesSection: React.FC = () => {
  const industries = [
    {
      icon: <Factory className="h-8 w-8" />,
      title: 'Manufacturing & Production',
      description: 'Comprehensive solutions for automotive, electronics, and general manufacturing facilities handling flammable materials and industrial chemicals.'
    },
    {
      icon: <FlaskConical className="h-8 w-8" />,
      title: 'Chemical & Petrochemical',
      description: 'Specialized containment and storage for hazardous substances, meeting stringent safety protocols for reactive materials and toxic compounds.'
    },
    {
      icon: <UtensilsCrossed className="h-8 w-8" />,
      title: 'Food & Beverage',
      description: 'Sanitary storage solutions and ergonomic equipment designed for food-grade facilities with strict hygiene and safety requirements.'
    },
    {
      icon: <Hospital className="h-8 w-8" />,
      title: 'Healthcare & Laboratories',
      description: 'Compliant storage for medical waste, laboratory chemicals, and pharmaceutical materials requiring precise environmental controls.'
    },
    {
      icon: <HardHat className="h-8 w-8" />,
      title: 'Construction & Mining',
      description: 'Durable outdoor storage and portable containment systems engineered for rugged job sites and remote extraction operations.'
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Logistics & Distribution',
      description: 'Efficient storage systems and safety equipment designed for high-volume material handling in warehousing and transportation hubs.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-brand-red font-semibold tracking-wide uppercase">Industries We Serve</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Protecting Romania's Most Demanding Industrial Sectors
          </p>
          <p className="max-w-2xl text-xl text-gray-500 lg:mx-auto mt-4">
            From Galați's steel mills to Bucharest's pharmaceutical labs, we understand the unique hazards facing Romanian businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              data-testid={`industry-${industry.title.toLowerCase().replace(/\s+/g, '-')}`}
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