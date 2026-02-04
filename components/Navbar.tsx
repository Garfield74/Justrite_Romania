import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage, translations } from '../i18n';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations.nav;

  const navLinks = [
    { name: t.home[language], href: '#' },
    { name: t.aboutUs[language], href: '#about' },
    { name: t.products[language], href: '#products' },
    { name: t.resources[language], href: '#resources' },
    { name: t.studeSurvey[language], href: '#safety-survey' },
    { name: t.contact[language], href: '#contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex items-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_b482c598-833c-4b73-bb0a-46ff30f52167/artifacts/vko0e048_Logo-1024x1024.png" 
                alt="Justrite Safety Group - 50 Years" 
                className="h-16 w-auto object-contain"
                data-testid="navbar-logo"
              />
            </a>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-brand-yellow font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              data-testid="language-toggle"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:border-brand-yellow hover:text-brand-yellow transition-colors text-sm font-medium"
              title={language === 'en' ? 'Switch to Romanian' : 'Schimbă în Engleză'}
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'en' ? 'RO' : 'EN'}</span>
            </button>
            
            <a
              href="#contact"
              className="bg-brand-yellow text-brand-black px-5 py-2 rounded-md font-semibold hover:bg-yellow-400 transition-colors shadow-sm"
            >
              {t.getQuote[language]}
            </a>
          </div>

          <div className="flex items-center md:hidden gap-2">
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 rounded border border-gray-300 text-gray-700 text-sm"
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'en' ? 'RO' : 'EN'}</span>
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-brand-yellow focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-yellow hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
