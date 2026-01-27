import React from 'react';
import { Shield, CheckCircle, Settings } from 'lucide-react';

export const SallAdvantageSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-base text-brand-yellow font-semibold tracking-wide uppercase">The Sall Advantage</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Italian Engineering Excellence
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Since 1975, Sall has defined the standard for European industrial safety equipment from their facility in Corte Tegge, Italy. 
              Acquired by Justrite Safety Group in 2017, Sall brings uncompromising Italian engineering and EU compliance expertise to our Romanian operations.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Every Sall product features robust steel construction, certified to meet or exceed EU safety norms. Their specialization in 
              hazardous material management—from chemical storage to waste handling—complements Justrite's broader portfolio, creating a 
              comprehensive safety solution unavailable elsewhere in Eastern Europe.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-yellow text-brand-black">
                    <Shield className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Certified Steel Construction</h4>
                  <p className="mt-2 text-gray-600">
                    Heavy-gauge steel with corrosion-resistant finishes, engineered for decades of reliable service in demanding industrial environments.
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
                  <h4 className="text-lg font-bold text-gray-900">EU Compliance Guarantee</h4>
                  <p className="mt-2 text-gray-600">
                    All products certified to current European safety directives, ensuring your facility meets regulatory requirements without exception.
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
                  <h4 className="text-lg font-bold text-gray-900">Custom Configuration</h4>
                  <p className="mt-2 text-gray-600">
                    Modular design allows tailored solutions matching your exact spatial constraints and operational workflow requirements.
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
              <p className="text-brand-yellow font-bold text-2xl">Five Decades</p>
              <p className="text-white text-lg">of Precision Manufacturing Since 1975</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};