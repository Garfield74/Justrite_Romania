import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProductSection } from './components/ProductSection';
import { SafetyAssistant } from './components/SafetyAssistant';
import { ContactFooter } from './components/ContactFooter';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ProductSection />
      </main>
      <SafetyAssistant />
      <ContactFooter />
    </div>
  );
}

export default App;
