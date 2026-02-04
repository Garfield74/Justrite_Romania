import React, { useState } from 'react';
import { CheckCircle, Shield, TrendingDown, Award } from 'lucide-react';
import { useLanguage, translations } from '../i18n';
import { trackSurveySubmission } from '../utils/analytics';

export const SafetySurveySection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations.survey;

  const [formData, setFormData] = useState({
    userType: '',
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    postalCode: '',
    phone: '',
    additionalInfo: '',
    agreeMarketing: false,
    agreePrivacy: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailBody = `
STUD-E™ Site Safety Assessment Request

User Type: ${formData.userType}
Name: ${formData.firstName} ${formData.lastName}
Company: ${formData.company}
Email: ${formData.email}
Postal Code: ${formData.postalCode}
Phone: ${formData.phone}

Additional Information:
${formData.additionalInfo}

Marketing Consent: ${formData.agreeMarketing ? 'Yes' : 'No'}
    `.trim();

    // Track survey submission
    trackSurveySubmission(formData.userType);

    window.location.href = `mailto:sales.ro@justrite.com?subject=STUD-E Survey Request&body=${encodeURIComponent(emailBody)}`;
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <section id="safety-survey" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img 
              src="https://customer-assets.emergentagent.com/job_b482c598-833c-4b73-bb0a-46ff30f52167/artifacts/lzh6i447_Justrite_Logo.webp" 
              alt="Justrite" 
              className="h-20 w-auto object-contain"
              data-testid="stude-survey-logo"
            />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            {t.title[language]}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle[language]}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Left Side - Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t.protectTitle[language]}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t.protectDesc[language]}
            </p>
            
            <div className="bg-brand-black text-white p-6 rounded-lg mb-6">
              <h4 className="text-brand-yellow font-bold text-xl mb-4">
                {t.assessmentTitle[language]}
              </h4>
              <p className="text-gray-300">
                {t.assessmentDesc[language]}
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 mb-4">{t.prioritizes[language]}</h4>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{t.benefit1[language]}</span>
              </div>
              
              <div className="flex items-start">
                <TrendingDown className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{t.benefit2[language]}</span>
              </div>
              
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{t.benefit3[language]}</span>
              </div>
              
              <div className="flex items-start">
                <TrendingDown className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{t.benefit4[language]}</span>
              </div>
              
              <div className="flex items-start">
                <Award className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{t.benefit5[language]}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t.requestTitle[language]}
            </h3>

            {submitted ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-4 rounded-full">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{t.thankYou[language]}</h4>
                <p className="text-gray-600">
                  {t.thankYouDesc[language]}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.iAmA[language]}<span className="text-red-600">*</span>
                  </label>
                  <select
                    name="userType"
                    required
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                  >
                    <option value="">{t.select[language]}</option>
                    <option value="end-user">{t.endUser[language]}</option>
                    <option value="distributor">{t.distributor[language]}</option>
                    <option value="other">{t.other[language]}</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.firstName[language]}<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.lastName[language]}<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.company[language]}<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.email[language]}<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.postalCode[language]}<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.phone[language]}<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.additionalInfo[language]}
                  </label>
                  <textarea
                    name="additionalInfo"
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder={t.additionalPlaceholder[language]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                  ></textarea>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeMarketing"
                      checked={formData.agreeMarketing}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <span className="text-sm text-gray-600">
                      {t.marketingConsent[language]}
                    </span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.privacyQuestion[language]}<span className="text-red-600">*</span>
                    </label>
                    <select
                      name="agreePrivacy"
                      required
                      value={formData.agreePrivacy}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                    >
                      <option value="">{t.select[language]}</option>
                      <option value="yes">{t.yes[language]}</option>
                      <option value="no">{t.no[language]}</option>
                    </select>
                  </div>

                  <p className="text-xs text-gray-500">
                    {t.privacyNotice[language]}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-yellow text-brand-black font-bold py-3 px-6 rounded-md hover:bg-yellow-400 transition-colors text-lg"
                  data-testid="submit-survey-request"
                >
                  {t.submitRequest[language]}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t.howItWorks[language]}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-brand-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-black font-bold text-2xl">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t.step1Title[language]}</h4>
              <p className="text-gray-600 text-sm">
                {t.step1Desc[language]}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-black font-bold text-2xl">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t.step2Title[language]}</h4>
              <p className="text-gray-600 text-sm">
                {t.step2Desc[language]}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-black font-bold text-2xl">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t.step3Title[language]}</h4>
              <p className="text-gray-600 text-sm">
                {t.step3Desc[language]}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-black font-bold text-2xl">4</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{t.step4Title[language]}</h4>
              <p className="text-gray-600 text-sm">
                {t.step4Desc[language]}
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-brand-black rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            {t.readyTitle[language]}
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            {t.readyDesc[language]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:sales.ro@justrite.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-brand-black bg-brand-yellow hover:bg-yellow-400 transition-colors"
            >
              Email: sales.ro@justrite.com
            </a>
            <a
              href="tel:+40236325301"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
            >
              Phone: 0236 325 301
            </a>
            <a
              href="tel:+40751556555"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
            >
              Mobile: +40 751 556 555
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
