import React, { useState } from 'react';
import { CheckCircle, Shield, TrendingDown, Award, FileCheck, Building2 } from 'lucide-react';

export const SafetySurveySection: React.FC = () => {
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
    // Send email to sales.ro@justrite.com
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
            <div className="bg-brand-yellow p-4 rounded-full">
              <Shield className="h-12 w-12 text-brand-black" />
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            STUD-E™ Workplace Safety Survey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Prevent accidents in the workplace with a free safety assessment from Justrite Romania experts
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Left Side - Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Protect People, Property, and the Planet™
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Workplace accidents happen and they can be costly. A hazardous chemical splash resulting in vision loss 
              could cost a company hundreds of thousands of euros. Let us help you avoid accidents with proper storage 
              of hazardous materials, spill containment, safety identification, emergency shower and eye wash, and more!
            </p>
            
            <div className="bg-brand-black text-white p-6 rounded-lg mb-6">
              <h4 className="text-brand-yellow font-bold text-xl mb-4">
                Our Complimentary Site Assessment Mitigates Risk
              </h4>
              <p className="text-gray-300">
                It puts a safety expert in your facility to identify hazards and recommend solutions for a safe 
                and compliant workplace.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 mb-4">STUD-E™ prioritizes critical safety issues:</h4>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Preventing compliance violations from Romanian and EU regulations</span>
              </div>
              
              <div className="flex items-start">
                <TrendingDown className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Avoiding costly fines</span>
              </div>
              
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Preventing workers compensation claims</span>
              </div>
              
              <div className="flex items-start">
                <TrendingDown className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Lowering insurance premiums</span>
              </div>
              
              <div className="flex items-start">
                <Award className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Enhancing process improvements</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Request a Site Safety Assessment
            </h3>

            {submitted ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-4 rounded-full">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
                <p className="text-gray-600">
                  Your request has been submitted. Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    I Am A<span className="text-red-600">*</span>
                  </label>
                  <select
                    name="userType"
                    required
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                  >
                    <option value="">--Select--</option>
                    <option value="end-user">End User</option>
                    <option value="distributor">Distributor</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name<span className="text-red-600">*</span>
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
                      Last Name<span className="text-red-600">*</span>
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
                    Company<span className="text-red-600">*</span>
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
                    Email<span className="text-red-600">*</span>
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
                      Zip / Postal Code<span className="text-red-600">*</span>
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
                      Phone<span className="text-red-600">*</span>
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
                    Additional Information Needed
                  </label>
                  <textarea
                    name="additionalInfo"
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Briefly describe your safety needs..."
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
                      I agree to receive marketing emails from Justrite Safety Group and understand I can unsubscribe anytime.
                    </span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you agree to our privacy policy?<span className="text-red-600">*</span>
                    </label>
                    <select
                      name="agreePrivacy"
                      required
                      value={formData.agreePrivacy}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                    >
                      <option value="">--Select--</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <p className="text-xs text-gray-500">
                    I understand by submitting my contact information, I am providing that personal information to 
                    Justrite Romania S.R.L. and they may use this information for the purposes which it was provided.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-yellow text-brand-black font-bold py-3 px-6 rounded-md hover:bg-yellow-400 transition-colors text-lg"
                  data-testid="submit-survey-request"
                >
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How Does STUD-E™ Work?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-brand-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-black font-bold text-2xl">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Contact</h4>
              <p className="text-gray-600 text-sm">
                Talk with one of our experts to schedule a site visit
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-black font-bold text-2xl">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Assessment</h4>
              <p className="text-gray-600 text-sm">
                We conduct a walk through of your facility
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-black font-bold text-2xl">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Analysis</h4>
              <p className="text-gray-600 text-sm">
                We identify current and potential vulnerabilities
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-black font-bold text-2xl">4</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Report</h4>
              <p className="text-gray-600 text-sm">
                Receive a report with recommendations for compliance
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-brand-black rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Improve Workplace Safety?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Contact us today to schedule your free STUD-E™ assessment and learn how we can help 
            make your workplace safer and compliant.
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
          </div>
        </div>

      </div>
    </section>
  );
};
