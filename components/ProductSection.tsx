import React from 'react';
import { Box, Droplets, Layers, PackageOpen, Package, Trash2 } from 'lucide-react';
import { useLanguage, translations } from '../i18n';

const getIcon = (id: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    'industrial-metal-containers': <Box className="h-8 w-8 text-brand-red" />,
    'liquid-containment-tank': <Droplets className="h-8 w-8 text-brand-red" />,
    'metal-pallets': <Layers className="h-8 w-8 text-brand-red" />,
    'open-bottom-containers': <PackageOpen className="h-8 w-8 text-brand-red" />,
    'big-bag-holders': <Package className="h-8 w-8 text-brand-red" />,
    'waste-cans-receptacles': <Trash2 className="h-8 w-8 text-brand-red" />,
    'hot-dip-galvanized-cylinder-pallets': <Layers className="h-8 w-8 text-brand-red" />,
    'wire-mesh-containers': <Box className="h-8 w-8 text-brand-red" />,
    'plunger-cans': <Trash2 className="h-8 w-8 text-brand-red" />
  };
  return icons[id] || <Box className="h-8 w-8 text-brand-red" />;
};

export const ProductSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations.products;
  const pt = translations.productItems;

  const products = [
    {
      id: 'industrial-metal-containers',
      title: pt.industrialContainers.title[language],
      description: pt.industrialContainers.description[language],
      imageUrl: '/industrial_metal_containers.jpg',
      features: language === 'en' 
        ? ['Sheet Metal Containers', 'Wire Mesh Containers', 'Wolf Mouth Design', 'Folding Options']
        : ['Containere din Tablă', 'Containere din Plasă', 'Design Gură de Lup', 'Opțiuni Pliabile']
    },
    {
      id: 'liquid-containment-tank',
      title: pt.liquidTank.title[language],
      description: pt.liquidTank.description[language],
      imageUrl: '/liquid_containment_tank.jpg',
      features: language === 'en'
        ? ['Steel Collection Tank', 'Drum Trolleys', 'Floor Collection Systems', 'Spill Prevention']
        : ['Tanc Colectare Oțel', 'Cărucioare Butoaie', 'Sisteme Colectare Podea', 'Prevenire Scurgeri']
    },
    {
      id: 'metal-pallets',
      title: pt.metalPallets.title[language],
      description: pt.metalPallets.description[language],
      imageUrl: '/metal_pallets.jpg',
      features: language === 'en'
        ? ['Stackable Design', 'Free-Standing', 'Pallet Bar Holder', 'Cylinder Baskets']
        : ['Design Stivuibil', 'Autoportant', 'Suport Bare Paleți', 'Coșuri Cilindri']
    },
    {
      id: 'open-bottom-containers',
      title: pt.openBottomContainers.title[language],
      description: pt.openBottomContainers.description[language],
      imageUrl: '/open_bottom_containers.jpg',
      features: language === 'en'
        ? ['Easy Loading', 'Efficient Unloading', 'Industrial Grade', 'Durable Construction']
        : ['Încărcare Ușoară', 'Descărcare Eficientă', 'Grad Industrial', 'Construcție Durabilă']
    },
    {
      id: 'big-bag-holders',
      title: pt.bigBagHolders.title[language],
      description: pt.bigBagHolders.description[language],
      imageUrl: '/big_bag_holders.jpg',
      features: language === 'en'
        ? ['FIBC Compatible', 'Heavy Duty Frame', 'Safe Handling', 'Bulk Storage']
        : ['Compatibil FIBC', 'Cadru Rezistent', 'Manipulare Sigură', 'Depozitare în Vrac']
    },
    {
      id: 'waste-cans-receptacles',
      title: pt.wasteCans.title[language],
      description: pt.wasteCans.description[language],
      imageUrl: '/waste_cans.jpg',
      features: language === 'en'
        ? ['Oily Waste Cans', 'Safety Plunger Cans', 'Safety Bench Cans', 'FM Approved']
        : ['Recipiente Deșeuri Uleioase', 'Recipiente Plunger', 'Recipiente Banc', 'Aprobat FM']
    }
  ];

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-brand-red font-semibold tracking-wide uppercase">{t.portfolioTitle[language]}</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t.builtForSafety[language]}
          </p>
          <p className="max-w-2xl text-xl text-gray-500 lg:mx-auto mt-4">
            {t.portfolioDesc[language]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
              data-testid={`product-${product.id}`}
            >
              <div className="h-56 w-full overflow-hidden relative group bg-white">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 p-4"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {getIcon(product.id)}
                  <h3 className="text-xl font-bold text-gray-900 ml-3">{product.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm min-h-[80px]">
                  {product.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="#contact"
                  className="block w-full text-center bg-brand-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors text-sm"
                >
                  {t.requestInfo[language]}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">{t.whyChoose[language]}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-brand-yellow rounded-lg p-3">
                <span className="text-brand-black font-bold text-lg">✓</span>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-900">{t.localExpertise[language]}</h4>
                <p className="text-gray-600 text-sm mt-1">
                  {t.localExpertiseDesc[language]}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-brand-yellow rounded-lg p-3">
                <span className="text-brand-black font-bold text-lg">✓</span>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-900">{t.rapidDelivery[language]}</h4>
                <p className="text-gray-600 text-sm mt-1">
                  {t.rapidDeliveryDesc[language]}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-brand-yellow rounded-lg p-3">
                <span className="text-brand-black font-bold text-lg">✓</span>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-900">{t.romanianCompliance[language]}</h4>
                <p className="text-gray-600 text-sm mt-1">
                  {t.romanianComplianceDesc[language]}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-brand-yellow rounded-lg p-3">
                <span className="text-brand-black font-bold text-lg">✓</span>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-900">{t.comprehensiveSolutions[language]}</h4>
                <p className="text-gray-600 text-sm mt-1">
                  {t.comprehensiveSolutionsDesc[language]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
