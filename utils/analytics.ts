// Analytics utility for tracking events
// Replace G-XXXXXXXXXX with your actual Google Analytics 4 Measurement ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Event categories
export const EventCategory = {
  NAVIGATION: 'navigation',
  ENGAGEMENT: 'engagement',
  FORM: 'form',
  DOWNLOAD: 'download',
  CHATBOT: 'chatbot',
  LANGUAGE: 'language',
} as const;

// Track page view
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// Track custom event
export const trackEvent = (
  eventName: string,
  category: string,
  label?: string,
  value?: number,
  additionalParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: category,
      event_label: label,
      value: value,
      ...additionalParams,
    });
  }
};

// Specific tracking functions

// Track navigation clicks
export const trackNavClick = (linkName: string) => {
  trackEvent('nav_click', EventCategory.NAVIGATION, linkName);
};

// Track section views (for scroll tracking)
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', EventCategory.ENGAGEMENT, sectionName);
};

// Track contact form submission
export const trackFormSubmission = (formType: string, subject: string) => {
  trackEvent('form_submit', EventCategory.FORM, `${formType}_${subject}`);
};

// Track PDF catalogue downloads
export const trackDownload = (fileName: string, brand: string) => {
  trackEvent('file_download', EventCategory.DOWNLOAD, fileName, undefined, {
    file_name: fileName,
    brand: brand,
  });
};

// Track chatbot interactions
export const trackChatbotOpen = () => {
  trackEvent('chatbot_open', EventCategory.CHATBOT);
};

export const trackChatbotMessage = (messageType: 'user' | 'quick_question') => {
  trackEvent('chatbot_message', EventCategory.CHATBOT, messageType);
};

export const trackChatbotClose = () => {
  trackEvent('chatbot_close', EventCategory.CHATBOT);
};

// Track language change
export const trackLanguageChange = (fromLang: string, toLang: string) => {
  trackEvent('language_change', EventCategory.LANGUAGE, `${fromLang}_to_${toLang}`);
};

// Track CTA button clicks
export const trackCTAClick = (buttonName: string, location: string) => {
  trackEvent('cta_click', EventCategory.ENGAGEMENT, `${buttonName}_${location}`);
};

// Track external link clicks
export const trackExternalLink = (url: string, linkName: string) => {
  trackEvent('external_link', EventCategory.NAVIGATION, linkName, undefined, {
    link_url: url,
  });
};

// Track survey form submission
export const trackSurveySubmission = (userType: string) => {
  trackEvent('survey_submit', EventCategory.FORM, userType);
};

// Track phone/email clicks
export const trackContactClick = (contactType: 'phone' | 'email' | 'mobile') => {
  trackEvent('contact_click', EventCategory.ENGAGEMENT, contactType);
};

// Initialize analytics (call once on app load)
export const initAnalytics = () => {
  if (typeof window !== 'undefined') {
    // Track initial page view
    trackPageView(window.location.pathname, document.title);
    
    // Set up scroll tracking for sections
    const sections = ['about', 'products', 'resources', 'safety-survey', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trackSectionView(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe sections after DOM is ready
    setTimeout(() => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
        }
      });
    }, 1000);
  }
};
