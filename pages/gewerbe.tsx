import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Building2, Users, TrendingUp, Shield, CheckCircle, ArrowRight, Mail, Phone, MapPin, FileText, Clock, Award, Target, Zap, Calculator, Home, Calendar, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ZohoSalesIQ from '../components/ZohoSalesIQ';

export default function GewerbeFunnel() {
  const [formData, setFormData] = useState({
    // Schritt 1: Projektart
    projekttyp: '',
    
    // Schritt 2: Projektdetails
    anzahlEinheiten: '',
    balkontyp: [],
    
    // Schritt 3: Zeitrahmen & Budget
    zeitrahmen: '',
    budgetrahmen: '',
    
    // Schritt 4: Unternehmensdaten
    firmenname: '',
    ansprechpartner: '',
    position: '',
    email: '',
    telefon: '',
    plz: '',
    ort: '',
    strasse: '',
    
    // Schritt 5: Zusätzliche Informationen
    nachricht: '',
    datenschutz: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Rotierende Überschrift
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = [
    { text: 'Bauträger', color: 'from-blue-400 to-cyan-400' },
    { text: 'Wohnbaugesellschaften', color: 'from-green-400 to-emerald-400' },
    { text: 'Großprojekte', color: 'from-purple-400 to-pink-400' },
    { text: 'Investoren', color: 'from-orange-400 to-red-400' },
    { text: 'Gewerbeprojekte', color: 'from-yellow-400 to-orange-400' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBalkonTypToggle = (typ: string) => {
    setFormData(prev => {
      const current = prev.balkontyp || [];
      if (current.includes(typ)) {
        return { ...prev, balkontyp: current.filter(t => t !== typ) };
      } else {
        return { ...prev, balkontyp: [...current, typ] };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    console.log('Business Lead Data:', formData);
    // Hier später API-Integration für Zoho CRM
    alert('Vielen Dank für Ihre Anfrage! Wir melden uns innerhalb von 24 Stunden bei Ihnen.');
  };

  const canProceedStep1 = formData.projekttyp !== '';
  const canProceedStep2 = formData.anzahlEinheiten !== '' && formData.balkontyp.length > 0;
  const canProceedStep3 = formData.zeitrahmen !== '' && formData.budgetrahmen !== '';
  const canProceedStep4 = formData.firmenname && formData.ansprechpartner && formData.email && formData.telefon && formData.plz && formData.ort;
  const canSubmit = canProceedStep4 && formData.datenschutz;

  return (
    <>
      <Head>
        <title>Gewerbeprojekte | Mehrfamilienhäuser | BALKONFUCHS Business</title>
        <meta name="description" content="Professionelle Balkonlösungen für Wohnbaugesellschaften, Bauträger und institutionelle Bauherren. Individuelle Angebote für Großprojekte." />
        <meta name="keywords" content="gewerbliche balkone, mehrfamilienhaus balkon, bauträger balkon, wohnbaugesellschaft, großprojekte balkon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
        <Header />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
                <Building2 className="w-5 h-5" />
                <span className="font-semibold">B2B | Gewerbliche Projekte</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl mx-auto">
                Professionelle Balkonlösungen für{' '}
                <span 
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${texts[currentTextIndex].color} transition-all duration-500`}
                  style={{ display: 'inline-block', minWidth: '300px' }}
                >
                  {texts[currentTextIndex].text}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Ihr Partner für Mehrfamilienhäuser, Bauträger-Projekte und institutionelle Bauherren
              </p>

              {/* Trust Indicators - von Startseite übernommen */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-300" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Geprüfte Partner</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">DSGVO konform</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">4.8/5 Sterne</div>
                    <div className="text-blue-200 text-sm">von über 850 Kunden</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Schritt {currentStep} von {totalSteps}</span>
              <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% abgeschlossen</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              
              {/* Schritt 1: Projektart */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Welche Art von Projekt planen Sie?</h2>
                    <p className="text-gray-600">Bitte wählen Sie die passende Projektkategorie</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <button
                      onClick={() => handleInputChange('projekttyp', 'neubau')}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.projekttyp === 'neubau' 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <Building2 className={`w-12 h-12 mb-4 ${formData.projekttyp === 'neubau' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Neubau</h3>
                      <p className="text-gray-600">Balkonlösungen für Neubauprojekte und Projektentwicklungen</p>
                    </button>

                    <button
                      onClick={() => handleInputChange('projekttyp', 'sanierung')}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.projekttyp === 'sanierung' 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <Home className={`w-12 h-12 mb-4 ${formData.projekttyp === 'sanierung' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Sanierung / Modernisierung</h3>
                      <p className="text-gray-600">Balkonsanierung oder Nachrüstung im Bestand</p>
                    </button>

                    <button
                      onClick={() => handleInputChange('projekttyp', 'wohnbaugesellschaft')}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.projekttyp === 'wohnbaugesellschaft' 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <Users className={`w-12 h-12 mb-4 ${formData.projekttyp === 'wohnbaugesellschaft' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Wohnbaugesellschaft</h3>
                      <p className="text-gray-600">Portfolio-Projekte für Wohnungsbaugesellschaften</p>
                    </button>

                    <button
                      onClick={() => handleInputChange('projekttyp', 'bautraeger')}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.projekttyp === 'bautraeger' 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <TrendingUp className={`w-12 h-12 mb-4 ${formData.projekttyp === 'bautraeger' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Bauträger</h3>
                      <p className="text-gray-600">Großprojekte für Bauträger und Projektentwickler</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Schritt 2: Projektdetails */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Projektdetails</h2>
                    <p className="text-gray-600">Geben Sie uns mehr Informationen zu Ihrem Vorhaben</p>
                  </div>

                  {/* Anzahl Wohneinheiten */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Anzahl der Wohneinheiten / Balkone
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['1-10', '11-25', '26-50', '51-100', '101-200', '201-500', '500+'].map((range) => (
                        <button
                          key={range}
                          onClick={() => handleInputChange('anzahlEinheiten', range)}
                          className={`p-4 rounded-lg border-2 font-semibold transition-all duration-300 ${
                            formData.anzahlEinheiten === range
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-blue-300 text-gray-700'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Balkontyp (Mehrfachauswahl) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Welche Balkontypen sind geplant? (Mehrfachauswahl möglich)
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { value: 'anbaubalkon', label: 'Anbaubalkon', desc: 'Klassischer Balkonanbau' },
                        { value: 'vorstellbalkon', label: 'Vorstellbalkon', desc: 'Freistehende Konstruktion' },
                        { value: 'haengebalkon', label: 'Hängebalkon', desc: 'An der Fassade aufgehängte Konstruktion' },
                        { value: 'franzoesisch', label: 'Französischer Balkon', desc: 'Bodentiefes Fenster mit Geländer' },
                        { value: 'loggia', label: 'Loggia', desc: 'Überdachter Balkon' },
                        { value: 'andere', label: 'Andere / Individuelle Lösung', desc: 'Spezielle Anforderungen' }
                      ].map((typ) => (
                        <button
                          key={typ.value}
                          onClick={() => handleBalkonTypToggle(typ.value)}
                          className={`p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                            formData.balkontyp.includes(typ.value)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-semibold text-gray-900">{typ.label}</div>
                              <div className="text-sm text-gray-600 mt-1">{typ.desc}</div>
                            </div>
                            {formData.balkontyp.includes(typ.value) && (
                              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Schritt 3: Zeitrahmen & Budget */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Zeitrahmen & Budget</h2>
                    <p className="text-gray-600">Helfen Sie uns, Ihr Projekt optimal zu planen</p>
                  </div>

                  {/* Zeitrahmen */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Wann soll das Projekt umgesetzt werden?
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { value: 'sofort', label: 'So schnell wie möglich', icon: Zap },
                        { value: '3monate', label: 'In den nächsten 3 Monaten', icon: Clock },
                        { value: '6monate', label: 'In 3-6 Monaten', icon: Clock },
                        { value: '12monate', label: 'In 6-12 Monaten', icon: Calendar },
                        { value: 'planung', label: 'Noch in Planung', icon: FileText }
                      ].map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            onClick={() => handleInputChange('zeitrahmen', option.value)}
                            className={`p-4 rounded-lg border-2 flex items-center gap-3 transition-all duration-300 ${
                              formData.zeitrahmen === option.value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <Icon className={`w-6 h-6 ${formData.zeitrahmen === option.value ? 'text-blue-600' : 'text-gray-400'}`} />
                            <span className="font-semibold text-gray-900">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budgetrahmen */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Geschätzter Budgetrahmen (optional)
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        '< 100.000 €',
                        '100.000 - 250.000 €',
                        '250.000 - 500.000 €',
                        '500.000 - 1 Mio. €',
                        '> 1 Mio. €',
                        'Noch offen'
                      ].map((budget) => (
                        <button
                          key={budget}
                          onClick={() => handleInputChange('budgetrahmen', budget)}
                          className={`p-4 rounded-lg border-2 font-semibold transition-all duration-300 ${
                            formData.budgetrahmen === budget
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-blue-300 text-gray-700'
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Schritt 4: Unternehmensdaten */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ihre Kontaktdaten</h2>
                    <p className="text-gray-600">Damit wir Sie für ein individuelles Angebot kontaktieren können</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Firmenname */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Firmenname *
                      </label>
                      <input
                        type="text"
                        value={formData.firmenname}
                        onChange={(e) => handleInputChange('firmenname', e.target.value)}
                        placeholder="Ihr Unternehmen"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Ansprechpartner */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ansprechpartner *
                      </label>
                      <input
                        type="text"
                        value={formData.ansprechpartner}
                        onChange={(e) => handleInputChange('ansprechpartner', e.target.value)}
                        placeholder="Vor- und Nachname"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Position */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Position
                      </label>
                      <input
                        type="text"
                        value={formData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        placeholder="Ihre Position"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* E-Mail */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="ihre.email@firma.de"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Telefon */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        value={formData.telefon}
                        onChange={(e) => handleInputChange('telefon', e.target.value)}
                        placeholder="+49 123 456789"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Straße */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Straße & Hausnummer
                      </label>
                      <input
                        type="text"
                        value={formData.strasse}
                        onChange={(e) => handleInputChange('strasse', e.target.value)}
                        placeholder="Musterstraße 123"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* PLZ */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        PLZ *
                      </label>
                      <input
                        type="text"
                        value={formData.plz}
                        onChange={(e) => handleInputChange('plz', e.target.value)}
                        placeholder="12345"
                        maxLength={5}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Ort */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ort *
                      </label>
                      <input
                        type="text"
                        value={formData.ort}
                        onChange={(e) => handleInputChange('ort', e.target.value)}
                        placeholder="Musterstadt"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Schritt 5: Zusätzliche Informationen */}
              {currentStep === 5 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Zusätzliche Informationen</h2>
                    <p className="text-gray-600">Fast geschafft! Gibt es noch etwas, das wir wissen sollten?</p>
                  </div>

                  {/* Nachricht */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ihre Nachricht (optional)
                    </label>
                    <textarea
                      value={formData.nachricht}
                      onChange={(e) => handleInputChange('nachricht', e.target.value)}
                      placeholder="Besondere Anforderungen, Fragen oder zusätzliche Informationen zu Ihrem Projekt..."
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Datenschutz */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.datenschutz}
                        onChange={(e) => handleInputChange('datenschutz', e.target.checked)}
                        className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        Ich habe die <a href="/datenschutz/" className="text-blue-600 hover:underline" target="_blank">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu. Ich bin damit einverstanden, dass BALKONFUCHS mich bezüglich meiner Anfrage kontaktiert. *
                      </span>
                    </label>
                  </div>

                  {/* Zusammenfassung */}
                  <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                    <h3 className="text-lg font-bold text-blue-900 mb-4">Ihre Projektübersicht</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Projekttyp:</span>
                        <span className="font-semibold text-gray-900">{formData.projekttyp || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Anzahl Einheiten:</span>
                        <span className="font-semibold text-gray-900">{formData.anzahlEinheiten || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Balkontypen:</span>
                        <span className="font-semibold text-gray-900">{formData.balkontyp.length > 0 ? formData.balkontyp.join(', ') : '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Zeitrahmen:</span>
                        <span className="font-semibold text-gray-900">{formData.zeitrahmen || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Budget:</span>
                        <span className="font-semibold text-gray-900">{formData.budgetrahmen || '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-2 px-6 py-3 text-gray-700 font-semibold hover:text-gray-900 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                    Zurück
                  </button>
                )}

                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && !canProceedStep1) ||
                      (currentStep === 2 && !canProceedStep2) ||
                      (currentStep === 3 && !canProceedStep3) ||
                      (currentStep === 4 && !canProceedStep4)
                    }
                    className={`ml-auto flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      (currentStep === 1 && canProceedStep1) ||
                      (currentStep === 2 && canProceedStep2) ||
                      (currentStep === 3 && canProceedStep3) ||
                      (currentStep === 4 && canProceedStep4)
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Weiter
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className={`ml-auto flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      canSubmit
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Anfrage absenden
                    <CheckCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ihre Vorteile mit <span className="text-blue-600">BALKONFUCHS Business</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Profitieren Sie von unserer langjährigen Erfahrung im gewerblichen Balkonbau
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Maßgeschneidert</h3>
                <p className="text-gray-600">Individuelle Lösungen für Ihr Projekt</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Zertifiziert</h3>
                <p className="text-gray-600">DIN-Normen & Baurecht konform</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Termingenau</h3>
                <p className="text-gray-600">Verlässliche Projektabwicklung</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Transparent</h3>
                <p className="text-gray-600">Klare Kostenstruktur ohne versteckte Kosten</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bereit für Ihr nächstes Großprojekt?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Unsere Experten beraten Sie gerne persönlich und erstellen Ihnen ein individuelles Angebot.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+4930123456789"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                +49 30 123 456 789
              </a>
              <a
                href="mailto:business@balkonfuchs.de"
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                business@balkonfuchs.de
              </a>
            </div>
          </div>
        </section>

        <Footer />
        <ZohoSalesIQ />
      </div>
    </>
  );
}

