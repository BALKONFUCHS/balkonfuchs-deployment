import React, { useState } from 'react';
import Head from 'next/head';
import { ArrowLeft, Home, CheckCircle2, Star, Zap, Shield, Clock, Users, Award, Rocket, Crown, AlertCircle, Mail, Phone, Building, MapPin } from 'lucide-react';
import ZohoSalesIQ from '../components/ZohoSalesIQ.js';

const SneakPreviewBestellung = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    website: '',
    experience: '',
    specialties: '',
    currentLeads: '',
    expectations: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier würde normalerweise die Daten an den Server gesendet werden
    console.log('Sneak Preview Bestellung:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <>
        <Head>
          <title>Sneak Preview Bestellung bestätigt | BALKONFUCHS</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <div className="min-h-screen bg-gray-900">
          {/* Header */}
          <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <a href="/" className="flex items-center">
                    <img 
                      src="/Balkonfuchs-Logo_white.png" 
                      alt="BALKONFUCHS Logo" 
                      className="h-10 w-auto"
                    />
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                    <Home className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Success Content */}
          <main className="py-16 bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Sneak Preview Bestellung <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                    erfolgreich!
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
                  Vielen Dank für Ihr Interesse! Wir haben Ihre Sneak Preview Bestellung erhalten 
                  und werden uns <strong className="text-green-400">innerhalb von 24 Stunden</strong> bei Ihnen melden.
                </p>

                {/* Next Steps */}
                <div className="bg-gray-800/50 rounded-2xl p-8 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Was passiert als nächstes?</h2>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-700/30 rounded-xl p-6 text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">1. Bestätigung</h3>
                      <p className="text-gray-300 text-sm">
                        Wir senden Ihnen eine Bestätigungs-E-Mail mit allen Details
                      </p>
                    </div>
                    
                    <div className="bg-gray-700/30 rounded-xl p-6 text-center">
                      <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">2. Anruf</h3>
                      <p className="text-gray-300 text-sm">
                        Persönlicher Anruf zur Klärung aller Details und Fragen
                      </p>
                    </div>
                    
                    <div className="bg-gray-700/30 rounded-xl p-6 text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Rocket className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">3. Start</h3>
                      <p className="text-gray-300 text-sm">
                        Ihr Sneak Preview Paket wird aktiviert - Sie erhalten 5 Leads
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Haben Sie Fragen?</h3>
                  <p className="text-gray-300 mb-4">
                    Unser Team steht Ihnen gerne zur Verfügung:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => {
                        if (window.$zoho && window.$zoho.salesiq) {
                          window.$zoho.salesiq.floatwindow.visible('show');
                        }
                      }}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <span className="text-xl">💬</span>
                      Live-Chat starten
                    </button>
                    
                    <a 
                      href="tel:+4930123456789" 
                      className="inline-flex items-center justify-center gap-2 bg-gray-800 border-2 border-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:border-orange-500 transition-all duration-300"
                    >
                      <Phone className="w-5 h-5" />
                      Anrufen
                    </a>
                  </div>
                </div>

                {/* Back to Home */}
                <a 
                  href="/" 
                  className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Zurück zur Startseite
                </a>
              </div>
            </div>
          </main>
          
          <ZohoSalesIQ />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Sneak Preview bestellen - Exklusives Testangebot | BALKONFUCHS</title>
        <meta name="description" content="Bestellen Sie jetzt Ihr Sneak Preview Paket: 5 qualifizierte Leads für €798, 30 Tage Laufzeit, keine Bindung." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="author" content="BALKONFUCHS GmbH" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <a href="/" className="flex items-center">
                  <img 
                    src="/Balkonfuchs-Logo_white.png" 
                    alt="BALKONFUCHS Logo" 
                    className="h-10 w-auto"
                  />
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                  <Home className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-16 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="mb-8">
              <a href="/sneak-preview" className="inline-flex items-center text-gray-400 hover:text-orange-400 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zur Sneak Preview
              </a>
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-8 mb-8">
              <h1 className="text-3xl font-bold mb-4 text-center">Sneak Preview Paket bestellen</h1>
              
              <div className="bg-white/20 backdrop-blur rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-semibold">Sneak Preview Paket</span>
                  <span className="text-4xl font-bold">€798</span>
                </div>
                <div className="text-blue-100 text-center">
                  5 qualifizierte Leads · 30 Tage Laufzeit · Keine Bindung
                </div>
              </div>
              
              <div className="bg-green-400/20 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-lg font-semibold mb-2">
                  🎁 Upgrade-Bonus: Bei Abo-Abschluss €100-150 Gutschrift
                </div>
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Company Information */}
              <div className="bg-gray-800/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Building className="w-6 h-6 text-orange-400 mr-3" />
                  Unternehmensdaten
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Firmenname *</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="Ihr Firmenname"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Ansprechpartner *</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="Ihr Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">E-Mail *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="ihre@email.de"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Telefon *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="+49 30 123456789"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Straße & Hausnummer</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="Musterstraße 123"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">PLZ</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="10115"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Stadt</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="Berlin"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="https://ihre-website.de"
                    />
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="bg-gray-800/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Award className="w-6 h-6 text-orange-400 mr-3" />
                  Geschäftsinformationen
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Erfahrung im Balkonbau *</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                    >
                      <option value="">Bitte wählen...</option>
                      <option value="0-2">0-2 Jahre</option>
                      <option value="3-5">3-5 Jahre</option>
                      <option value="6-10">6-10 Jahre</option>
                      <option value="10+">10+ Jahre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Spezialisierungen</label>
                    <input
                      type="text"
                      name="specialties"
                      value={formData.specialties}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="z.B. Anbaubalkone, Dachbalkone, Stahlbeton..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Aktuelle Lead-Quellen</label>
                    <input
                      type="text"
                      name="currentLeads"
                      value={formData.currentLeads}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="z.B. Empfehlungen, Google Ads, eigene Website..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Erwartungen an das Sneak Preview</label>
                    <textarea
                      name="expectations"
                      value={formData.expectations}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="Was erwarten Sie von dem Sneak Preview Paket? Welche Art von Leads suchen Sie?"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Wichtige Hinweise</h3>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Dieses Angebot kann pro Unternehmen nur <strong className="text-yellow-400">einmal</strong> in Anspruch genommen werden</li>
                      <li>• Das Sneak Preview Paket läuft 30 Tage ohne Bindung</li>
                      <li>• Bei Abo-Abschluss erhalten Sie €100-150 Gutschrift</li>
                      <li>• Wir melden uns innerhalb von 24 Stunden bei Ihnen</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Rocket className="w-6 h-6" />
                  Sneak Preview bestellen
                </button>
                <p className="text-gray-400 text-sm mt-4">
                  Mit der Bestellung akzeptieren Sie unsere AGB und Datenschutzerklärung
                </p>
              </div>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                © 2025 BALKONFUCHS GmbH - Sneak Preview Bestellung
              </p>
              <div className="flex justify-center space-x-6 text-sm">
                <a href="/impressum/" className="text-gray-400 hover:text-orange-400 transition-colors">Impressum</a>
                <a href="/datenschutz/" className="text-gray-400 hover:text-orange-400 transition-colors">Datenschutz</a>
                <a href="/agb/" className="text-gray-400 hover:text-orange-400 transition-colors">AGB</a>
              </div>
            </div>
          </div>
        </footer>
        
        {/* ZOHO Sales IQ Chat Widget */}
        <ZohoSalesIQ />
      </div>
    </>
  );
};

export default SneakPreviewBestellung;
