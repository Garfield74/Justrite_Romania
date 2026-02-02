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
    // Send email to sales.romania@buyjustrite.eu
    const emailBody = `
Solicitare Evaluare Siguranță Site STUD-E™

Tip utilizator: ${formData.userType}
Nume: ${formData.firstName} ${formData.lastName}
Companie: ${formData.company}
Email: ${formData.email}
Cod Poștal: ${formData.postalCode}
Telefon: ${formData.phone}

Informații Adiționale:
${formData.additionalInfo}

Marketing: ${formData.agreeMarketing ? 'Da' : 'Nu'}
    `.trim();

    window.location.href = `mailto:sales.romania@buyjustrite.eu?subject=Solicitare STUD-E Survey&body=${encodeURIComponent(emailBody)}`;
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
            STUD-E™ Evaluare Siguranță la Locul de Muncă
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Preveniți accidentele la locul de muncă cu o evaluare gratuită a siguranței de la experții Justrite România
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Left Side - Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Protejați Oamenii, Proprietatea și Mediul™
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Accidentele la locul de muncă se întâmplă și pot fi costisitoare. O stropire cu substanțe chimice periculoase 
              care duce la pierderea vederii ar putea costa o companie sute de mii de euro. Permiteți-ne să vă ajutăm să 
              evitați accidentele cu soluții adecvate pentru depozitarea materialelor periculoase, containere pentru scurgeri, 
              identificare siguranță, dușuri de urgență și spălătoare pentru ochi, și mai mult!
            </p>
            
            <div className="bg-brand-black text-white p-6 rounded-lg mb-6">
              <h4 className="text-brand-yellow font-bold text-xl mb-4">
                Evaluarea Noastră Gratuită Atenuează Riscul
              </h4>
              <p className="text-gray-300">
                Oferim un expert în siguranță în facilitatea dumneavoastră pentru a identifica pericolele și 
                recomanda soluții pentru un loc de muncă sigur și conform.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 mb-4">STUD-E™ prioritizează problemele critice de siguranță:</h4>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Prevenirea încălcărilor conformității (standarde românești și UE)</span>
              </div>
              
              <div className="flex items-start">
                <TrendingDown className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Evitarea amenzilor costisitoare</span>
              </div>
              
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Prevenirea reclamațiilor privind compensarea lucrătorilor</span>
              </div>
              
              <div className="flex items-start">
                <TrendingDown className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Reducerea primelor de asigurare</span>
              </div>
              
              <div className="flex items-start">
                <Award className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Îmbunătățirea proceselor operaționale</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Solicitați o Evaluare a Siguranței Site-ului
            </h3>

            {submitted ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-4 rounded-full">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Mulțumim!</h4>
                <p className="text-gray-600">
                  Cererea dumneavoastră a fost trimisă. Echipa noastră vă va contacta în curând.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Eu Sunt Un<span className="text-red-600">*</span>
                  </label>
                  <select
                    name="userType"
                    required
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                  >
                    <option value="">--Selectați--</option>
                    <option value="end-user">Utilizator Final</option>
                    <option value="distributor">Distribuitor</option>
                    <option value="other">Altul</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prenume<span className="text-red-600">*</span>
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
                      Nume<span className="text-red-600">*</span>
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
                    Companie<span className="text-red-600">*</span>
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
                      Cod Poștal<span className="text-red-600">*</span>
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
                      Telefon<span className="text-red-600">*</span>
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
                    Informații Adiționale
                  </label>
                  <textarea
                    name="additionalInfo"
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Descrieți pe scurt nevoile dvs. de siguranță..."
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
                      Sunt de acord să primesc e-mailuri de marketing de la Justrite Romania și înțeleg că mă pot dezabona oricând.
                    </span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sunteți de acord cu politica de confidențialitate?<span className="text-red-600">*</span>
                    </label>
                    <select
                      name="agreePrivacy"
                      required
                      value={formData.agreePrivacy}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                    >
                      <option value="">--Selectați--</option>
                      <option value="yes">Da</option>
                      <option value="no">Nu</option>
                    </select>
                  </div>

                  <p className="text-xs text-gray-500">
                    Înțeleg că prin trimiterea informațiilor mele de contact, furnizez aceste informații personale către 
                    Justrite Romania S.R.L. și acestea pot fi folosite în scopurile pentru care au fost furnizate.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-yellow text-brand-black font-bold py-3 px-6 rounded-md hover:bg-yellow-400 transition-colors text-lg"
                  data-testid="submit-survey-request"
                >
                  Trimiteți Solicitarea
                </button>
              </form>
            )}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Cum Funcționează STUD-E™?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-brand-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-black font-bold text-2xl">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Contact</h4>
              <p className="text-gray-600 text-sm">
                Discutați cu unul dintre experții noștri pentru a programa o vizită la fața locului
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-black font-bold text-2xl">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Evaluare</h4>
              <p className="text-gray-600 text-sm">
                Realizăm o evaluare completă a facilității dumneavoastră
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-black font-bold text-2xl">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Analiză</h4>
              <p className="text-gray-600 text-sm">
                Identificăm vulnerabilitățile actuale și potențiale
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-black font-bold text-2xl">4</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Raport</h4>
              <p className="text-gray-600 text-sm">
                Primiți un raport detaliat cu recomandări pentru conformitate
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-brand-black rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Sunteți Gata să Îmbunătățiți Siguranța la Locul de Muncă?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Contactați-ne astăzi pentru a programa evaluarea gratuită STUD-E™ și aflați cum putem ajuta 
            să faceți locul de muncă mai sigur și conform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:sales.romania@buyjustrite.eu"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-brand-black bg-brand-yellow hover:bg-yellow-400 transition-colors"
            >
              Email: sales.romania@buyjustrite.eu
            </a>
            <a
              href="tel:+40236325301"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
            >
              Telefon: 0236 325 301
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
