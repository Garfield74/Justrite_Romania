import React from 'react';
import { Users, Building2, Leaf } from 'lucide-react';

export const MissionSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Our Mission: Protecting People, Property & Planet
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-brand-yellow rounded-full">
                <Users className="h-10 w-10 text-brand-black" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Workforce Protection</h3>
            <p className="text-gray-400">
              Every solution we engineer prioritizes employee safety, reducing exposure to hazardous materials and minimizing 
              workplace injury risk through intelligent design.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-brand-yellow rounded-full">
                <Building2 className="h-10 w-10 text-brand-black" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Asset Security</h3>
            <p className="text-gray-400">
              Preventing spills, fires, and contamination incidents protects your valuable equipment, inventory, and facility 
              infrastructure from catastrophic loss.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-brand-yellow rounded-full">
                <Leaf className="h-10 w-10 text-brand-black" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Environmental Stewardship</h3>
            <p className="text-gray-400">
              Robust containment systems prevent environmental contamination, ensuring your operations meet sustainability goals 
              and regulatory standards.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We believe workplace safety extends beyond compliance—it's about creating a culture where every employee returns home safely, 
            every facility operates without incident, and every community benefits from responsible industrial practices. This philosophy 
            has guided us since 1906 and drives our commitment to Romanian industries today.
          </p>
        </div>
      </div>
    </section>
  );
};