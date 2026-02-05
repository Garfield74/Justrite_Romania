import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      data-testid="scroll-to-top"
      className="fixed bottom-24 right-6 z-50 bg-brand-yellow text-brand-black p-3 rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-110"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
};
