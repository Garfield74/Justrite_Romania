import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Facebook, Shield } from 'lucide-react';

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
              <a href="#" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-yellow transition-colors">
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
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Compliance Guide</a></li>
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-brand-yellow/30 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-yellow mr-3 mt-0.5 flex-shrink-0" />
                <span>
                  Parc Industrial, <br />
                  Strada Justrite Nr. 1,<br />
                  Romania
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-brand-yellow mr-3 flex-shrink-0" />
                <span>+40 21 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-brand-yellow mr-3 flex-shrink-0" />
                <span>sales.ro@justrite.com</span>
              </li>
            </ul>
          </div>

          {/* Contact Form Mock */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-brand-yellow/30 pb-2 inline-block">Send Inquiry</h3>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow"
              />
              <textarea 
                rows={3} 
                placeholder="Message" 
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow"
              ></textarea>
              <button className="w-full bg-brand-yellow text-brand-black font-bold py-2 rounded hover:bg-yellow-400 transition-colors text-sm">
                Submit
              </button>
            </form>
          </div>

        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Justrite Romania SRL. All rights reserved. Part of Justrite Manufacturing Group.
          </p>
        </div>
      </div>
    </footer>
  );
};
