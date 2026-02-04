import React, { useState, useEffect } from 'react';
import { Cookie, X, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { useLanguage, translations } from '../i18n';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const COOKIE_CONSENT_KEY = 'justrite_cookie_consent';

const getStoredConsent = (): CookiePreferences | null => {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading cookie consent:', e);
  }
  return null;
};

const storeConsent = (preferences: CookiePreferences) => {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
  } catch (e) {
    console.error('Error storing cookie consent:', e);
  }
};

// Export function to check if analytics is allowed
export const isAnalyticsAllowed = (): boolean => {
  const consent = getStoredConsent();
  return consent?.analytics ?? false;
};

// Export function to check if marketing is allowed
export const isMarketingAllowed = (): boolean => {
  const consent = getStoredConsent();
  return consent?.marketing ?? false;
};

export const CookieConsent: React.FC = () => {
  const { language } = useLanguage();
  const t = translations.cookies;
  
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: true,
    marketing: false,
    timestamp: '',
  });

  useEffect(() => {
    // Check if user has already given consent
    const storedConsent = getStoredConsent();
    if (!storedConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setPreferences(storedConsent);
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    storeConsent(newPreferences);
    setPreferences(newPreferences);
    setIsVisible(false);
    
    // Reload to enable analytics
    window.location.reload();
  };

  const handleAcceptNecessary = () => {
    const newPreferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    storeConsent(newPreferences);
    setPreferences(newPreferences);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const newPreferences: CookiePreferences = {
      ...preferences,
      necessary: true, // Always true
      timestamp: new Date().toISOString(),
    };
    storeConsent(newPreferences);
    setIsVisible(false);
    
    // Reload if analytics preference changed
    const storedConsent = getStoredConsent();
    if (storedConsent?.analytics !== newPreferences.analytics) {
      window.location.reload();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in-up"
        data-testid="cookie-consent-banner"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-brand-yellow p-2 rounded-full">
                <Cookie className="h-6 w-6 text-brand-black" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{t.title[language]}</h2>
            </div>
            <button
              onClick={handleAcceptNecessary}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {t.message[language]}
          </p>

          {/* Cookie Categories (Expandable) */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 mb-4 hover:text-brand-red transition-colors"
          >
            <span>{t.customize[language]}</span>
            {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showDetails && (
            <div className="space-y-4 mb-6 border-t border-gray-100 pt-4">
              {/* Necessary Cookies */}
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-gray-900 text-sm">{t.necessary.title[language]}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{t.necessary.description[language]}</p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="h-5 w-5 rounded border-gray-300 text-green-600 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <span className="font-medium text-gray-900 text-sm">{t.analytics.title[language]}</span>
                  <p className="text-xs text-gray-500 mt-1">{t.analytics.description[language]}</p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="h-5 w-5 rounded border-gray-300 text-brand-red focus:ring-brand-red cursor-pointer"
                    data-testid="cookie-analytics-toggle"
                  />
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <span className="font-medium text-gray-900 text-sm">{t.marketing.title[language]}</span>
                  <p className="text-xs text-gray-500 mt-1">{t.marketing.description[language]}</p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="h-5 w-5 rounded border-gray-300 text-brand-red focus:ring-brand-red cursor-pointer"
                    data-testid="cookie-marketing-toggle"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {showDetails ? (
              <button
                onClick={handleSavePreferences}
                className="flex-1 bg-brand-yellow text-brand-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition-colors"
                data-testid="cookie-save-preferences"
              >
                {t.savePreferences[language]}
              </button>
            ) : (
              <>
                <button
                  onClick={handleAcceptNecessary}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  data-testid="cookie-accept-necessary"
                >
                  {t.acceptNecessary[language]}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-brand-yellow text-brand-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition-colors"
                  data-testid="cookie-accept-all"
                >
                  {t.acceptAll[language]}
                </button>
              </>
            )}
          </div>

          {/* Privacy Policy Link */}
          <p className="text-xs text-center text-gray-400 mt-4">
            <a href="#" className="hover:text-brand-red underline">
              {t.privacyPolicy[language]}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
