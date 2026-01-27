import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { StatisticsSection } from './components/StatisticsSection';
import { ProductSection } from './components/ProductSection';
import { SallAdvantageSection } from './components/SallAdvantageSection';
import { IndustriesSection } from './components/IndustriesSection';
import { MissionSection } from './components/MissionSection';
import { SafetyAssistant } from './components/SafetyAssistant';
import { ContactFooter } from './components/ContactFooter';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <StatisticsSection />
        <ProductSection />
        <SallAdvantageSection />
        <IndustriesSection />
        <MissionSection />
      </main>
      <SafetyAssistant />
      <ContactFooter />
    </div>
  );
}

export default App;
