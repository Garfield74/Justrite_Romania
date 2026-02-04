import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from './translations';
import { trackLanguageChange } from '../utils/analytics';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = 'justrite_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Load from localStorage or default to 'en'
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      if (saved === 'en' || saved === 'ro') {
        return saved;
      }
    }
    return 'en';
  });

  // Save to localStorage when language changes
  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (lang !== language) {
      trackLanguageChange(language, lang);
    }
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ro' : 'en';
    trackLanguageChange(language, newLang);
    setLanguageState(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
