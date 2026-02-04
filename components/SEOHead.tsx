import { useEffect } from 'react';
import { useLanguage } from '../i18n';

interface SEOData {
  title: { en: string; ro: string };
  description: { en: string; ro: string };
}

const seoData: SEOData = {
  title: {
    en: 'Justrite Romania - Industrial Safety Solutions | Galați',
    ro: 'Justrite România - Soluții de Siguranță Industrială | Galați',
  },
  description: {
    en: 'Leading industrial safety solutions provider in Romania. Safety cans, spill containment, hazardous material storage, emergency showers & more. Serving Eastern Europe from Galați since 1998.',
    ro: 'Furnizor lider de soluții de siguranță industrială în România. Recipiente de siguranță, retenție scurgeri, depozitare materiale periculoase, dușuri de urgență și multe altele. Deservim Europa de Est din Galați din 1998.',
  },
};

export const SEOHead: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Update document title
    document.title = seoData.title[language];

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData.description[language]);
    }

    // Update meta title
    const metaTitle = document.querySelector('meta[name="title"]');
    if (metaTitle) {
      metaTitle.setAttribute('content', seoData.title[language]);
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', seoData.title[language]);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', seoData.description[language]);
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', seoData.title[language]);
    }

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', seoData.description[language]);
    }

    // Update HTML lang attribute
    document.documentElement.lang = language === 'en' ? 'en' : 'ro';

    // Update OG locale
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute('content', language === 'en' ? 'en_US' : 'ro_RO');
    }

  }, [language]);

  return null; // This component doesn't render anything
};

export default SEOHead;
