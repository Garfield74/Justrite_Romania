import React, { useState } from 'react';
import { Phone, Mail, MapPin, Linkedin, Facebook, Shield, FileText, Send, Loader2, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';
import { useLanguage, translations } from '../i18n';
import { trackFormSubmission, trackContactClick, trackExternalLink } from '../utils/analytics';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: 'quote',
  message: '',
};

export const ContactFooter: React.FC = () => {
  const { language } = useLanguage();
  const t = translations.contact;
  const navT = translations.nav;
  
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [copied, setCopied] = useState(false);
  const [submittedData, setSubmittedData] = useState<{subject: string; body: string} | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setStatus('sending');
    
    try {
      const subjectText = t.subjects[formData.subject as keyof typeof t.subjects]?.[language] || formData.subject;
      const body = `
${language === 'en' ? 'Name' : 'Nume'}: ${formData.name}
Email: ${formData.email}
${language === 'en' ? 'Phone' : 'Telefon'}: ${formData.phone || (language === 'en' ? 'Not provided' : 'Nespecificat')}
${language === 'en' ? 'Company' : 'Companie'}: ${formData.company || (language === 'en' ? 'Not provided' : 'Nespecificat')}

${language === 'en' ? 'Message' : 'Mesaj'}:
${formData.message}
      `.trim();
      
      // Store submission in localStorage
      const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
      submissions.push({
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('contact_submissions', JSON.stringify(submissions.slice(-10)));
      
      // Store for potential copy
      setSubmittedData({ subject: subjectText, body });
      
      // Track form submission
      trackFormSubmission('contact_footer', formData.subject);
      
      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Try to open mailto
      const mailtoLink = `mailto:sales.ro@justrite.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      
      setStatus('success');
      setFormData(initialFormData);
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  const copyToClipboard = async () => {
    if (!submittedData) return;
    
    const textToCopy = `To: sales.ro@justrite.com\nSubject: ${submittedData.subject}\n\n${submittedData.body}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setFormData(initialFormData);
    setErrors({});
    setSubmittedData(null);
    setCopied(false);
  };

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
              {t.brandDescription[language]}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/justrite-romania/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=100075854833422" 
                target="_blank"
                className="text-gray-400 hover:text-brand-yellow transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-brand-yellow/30 pb-2 inline-block">{t.quickLinks[language]}</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-yellow transition-colors">{navT.home[language]}</a></li>
              <li><a href="#about" className="hover:text-brand-yellow transition-colors">{navT.aboutUs[language]}</a></li>
              <li><a href="#products" className="hover:text-brand-yellow transition-colors">{t.safetyProducts[language]}</a></li>
              <li><a href="https://www.justritesafetygroup.com/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">Justrite Safety Group</a></li>
              <li><a href="https://www.sall.it" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">Sall Italia</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-brand-yellow/30 pb-2 inline-block">{t.contactUs[language]}</h3>
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
                <div className="flex flex-col gap-1">
                  <a href="tel:+40236325301" onClick={() => trackContactClick('phone')} className="hover:text-brand-yellow transition-colors">
                    0236 325 301
                  </a>
                  <a href="tel:+40751556555" onClick={() => trackContactClick('mobile')} className="hover:text-brand-yellow transition-colors">
                    +40 751 556 555 (Mobile)
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-brand-yellow mr-3 flex-shrink-0" />
                <a href="mailto:sales.ro@justrite.com" className="hover:text-brand-yellow transition-colors break-all">
                  sales.ro@justrite.com
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-brand-yellow/30 pb-2 inline-block">{t.sendInquiry[language]}</h3>
            
            {status === 'success' ? (
              <div className="text-center py-4" data-testid="contact-success">
                <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">{t.successTitle[language]}</h4>
                <p className="text-gray-400 text-xs mb-3">{t.successMessage[language]}</p>
                
                {/* Copy to clipboard option */}
                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-2 w-full bg-white/10 text-white py-2 px-3 rounded text-xs hover:bg-white/20 transition-colors mb-3"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-green-400" />
                      <span className="text-green-400">{language === 'en' ? 'Copied!' : 'Copiat!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>{language === 'en' ? 'Copy message to clipboard' : 'Copiază mesajul'}</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={resetForm}
                  className="text-brand-yellow hover:text-yellow-300 text-xs underline"
                >
                  {t.sendAnother[language]}
                </button>
              </div>
            ) : status === 'error' ? (
              <div className="text-center py-4" data-testid="contact-error">
                <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">{t.errorTitle[language]}</h4>
                <p className="text-gray-400 text-xs mb-3">{t.errorMessage[language]}</p>
                <button
                  onClick={resetForm}
                  className="text-brand-yellow hover:text-yellow-300 text-xs underline"
                >
                  {t.sendAnother[language]}
                </button>
              </div>
            ) : (
              <form className="space-y-2.5" onSubmit={handleSubmit} data-testid="contact-form">
                {/* Name */}
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t.yourName[language]}
                  data-testid="contact-name"
                  className={`w-full bg-white/10 border rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow transition-colors ${
                    errors.name ? 'border-red-500' : 'border-white/20'
                  }`}
                />
                
                {/* Email */}
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.yourEmail[language]}
                  data-testid="contact-email"
                  className={`w-full bg-white/10 border rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow transition-colors ${
                    errors.email ? 'border-red-500' : 'border-white/20'
                  }`}
                />
                
                {/* Phone & Company in row */}
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t.phone[language]}
                    data-testid="contact-phone"
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow transition-colors"
                  />
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder={t.company[language]}
                    data-testid="contact-company"
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow transition-colors"
                  />
                </div>
                
                {/* Subject */}
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  data-testid="contact-subject"
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors cursor-pointer"
                >
                  <option value="quote" className="bg-gray-800">{t.subjects.quote[language]}</option>
                  <option value="product" className="bg-gray-800">{t.subjects.product[language]}</option>
                  <option value="support" className="bg-gray-800">{t.subjects.support[language]}</option>
                  <option value="partnership" className="bg-gray-800">{t.subjects.partnership[language]}</option>
                  <option value="other" className="bg-gray-800">{t.subjects.other[language]}</option>
                </select>
                
                {/* Message */}
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3} 
                  placeholder={t.message[language]}
                  data-testid="contact-message"
                  className={`w-full bg-white/10 border rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-white/20'
                  }`}
                ></textarea>
                
                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  data-testid="contact-submit"
                  className="w-full bg-brand-yellow text-brand-black font-bold py-2.5 rounded hover:bg-yellow-400 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t.sending[language]}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t.submit[language]}
                    </>
                  )}
                </button>
              </form>
            )}
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
            &copy; {new Date().getFullYear()} Justrite Romania S.R.L. {t.allRightsReserved[language]}
          </p>
        </div>
      </div>
    </footer>
  );
};
