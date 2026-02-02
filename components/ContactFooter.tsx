import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Facebook, Shield, FileText } from 'lucide-react';

export const ContactFooter: React.FC = () => {
  return (
    <footer id="contact" className="bg-brand-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-8 w-8 text-brand-yellow" />
              <span className="font-bold text-2xl tracking-tight">
                Justrite <span className="text-brand-yellow">Romania</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Leading the way in industrial safety manufacturing. Providing world-class protection solutions for workers and workplaces across Europe.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/justrite-safety-group/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://www.facebook.com/JustriteSafetyGroup" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-brand-yellow/30 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-brand-yellow transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-brand-yellow transition-colors">Safety Products</a></li>
              <li><a href="https://www.justritesafetygroup.com/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">Justrite Safety Group</a></li>
              <li><a href="https://www.sall.it" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">Sall Italia</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-brand-yellow/30 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-yellow mr-3 mt-0.5 flex-shrink-0" />
                <span>
                  TULUCEȘTI, Nr. 1843C,<br />
                  județ GALAȚI,<br />
                  Romania
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-brand-yellow mr-3 flex-shrink-0" />
                <a href="tel:+40236325301" className="hover:text-brand-yellow transition-colors">
                  0236 325 301
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-brand-yellow mr-3 flex-shrink-0" />
                <a href="mailto:sales.ro@justrite.com" className="hover:text-brand-yellow transition-colors break-all">
                  sales.ro@justrite.com
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Form Mock */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-brand-yellow/30 pb-2 inline-block">Send Inquiry</h3>
            <form className="space-y-3" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get('email');
              const message = formData.get('message');
              window.location.href = `mailto:sales.ro@justrite.com?subject=Website Inquiry&body=${encodeURIComponent(message as string)}`;
            }}>
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                required
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow"
              />
              <textarea 
                name="message"
                rows={3} 
                placeholder="Message" 
                required
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow"
              ></textarea>
              <button type="submit" className="w-full bg-brand-yellow text-brand-black font-bold py-2 rounded hover:bg-yellow-400 transition-colors text-sm">
                Submit
              </button>
            </form>
          </div>

        </div>
        
        {/* Company Details */}
        <div className="border-t border-gray-800 pt-8 pb-4">
          <div className="flex items-start mb-4 text-xs text-gray-500">
            <FileText className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-400 mb-1">JUSTRITE ROMANIA S.R.L.</p>
              <p>National Registry Registration Number: J17/1002/1998</p>
              <p>Fiscal ID: RO11196159</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Justrite Romania S.R.L. All rights reserved. Part of Justrite Safety Group.
          </p>
        </div>
      </div>
    </footer>
  );
};
