import React, { useEffect } from 'react';
import { LanguageProvider } from './i18n';
import { SEOHead } from './components/SEOHead';
import { CookieConsent } from './components/CookieConsent';
import { initAnalytics } from './utils/analytics';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { StatisticsSection } from './components/StatisticsSection';
import { ProductSection } from './components/ProductSection';
import { SallAdvantageSection } from './components/SallAdvantageSection';
import { IndustriesSection } from './components/IndustriesSection';
import { ResourcesSection } from './components/ResourcesSection';
import { SafetySurveySection } from './components/SafetySurveySection';
import { MissionSection } from './components/MissionSection';
import { SafetyAssistant } from './components/SafetyAssistant';
import { ContactFooter } from './components/ContactFooter';

function App() {
  // Initialize analytics on app load (respects cookie consent)
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <LanguageProvider>
      <SEOHead />
      <div className="min-h-screen bg-white font-sans">
        <Navbar />
        <main>
          <Hero />
          <AboutSection />
          <StatisticsSection />
          <ProductSection />
          <SallAdvantageSection />
          <IndustriesSection />
          <ResourcesSection />
          <SafetySurveySection />
          <MissionSection />
        </main>
        <SafetyAssistant />
        <ContactFooter />
      </div>
      <CookieConsent />
    </LanguageProvider>
  );
}

export default App;
