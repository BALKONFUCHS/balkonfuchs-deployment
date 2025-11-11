import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Building2, Users, TrendingUp, Shield, CheckCircle, ArrowRight, Mail, MapPin, FileText, Clock, Award, Target, Zap, Calculator, Home, Calendar, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ZohoSalesIQ from '../components/ZohoSalesIQ';
import { submitToZoho, formatGewerbeData } from '../utils/zoho-submit';
import PhoneInput from '../components/PhoneInput';
import html2canvas from 'html2canvas';

export default function GewerbeFunnel() {
  const [formData, setFormData] = useState({
    // Schritt 1: Projektart
    projekttyp: '',
    
    // Schritt 2: Projektdetails
    projektname: '',
    projektort: '',
    projektadresse: '',
    anzahlBalkone: '',
    balkontyp: [],
    
    // Schritt 3: Zeitrahmen & Budget
    zeitrahmen: '',
    budgetrahmen: '',
    budgetFreitext: '',
    startMonat: '',
    startJahr: '',
    endMonat: '',
    endJahr: '',
    
    // Schritt 4: Unternehmensdaten
    firmenname: '',
    ansprechpartner: '',
    position: '',
    projektleiter: '',
    email: '',
    telefon: '',
    plz: '',
    ort: '',
    strasse: '',
    
    // Schritt 5: Zusätzliche Informationen
    nachricht: '',
    datenschutz: false,
    balkonbrief: false,
    haftungsausschluss: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const summaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

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
    try {
      console.log('Submitting Gewerbe data to Zoho:', formData);
      
      let pdfAttachment = null;
      if (summaryRef.current) {
        try {
          const canvas = await html2canvas(summaryRef.current, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#111827'
          });
          const dataUrl = canvas.toDataURL('image/png', 0.95);
          const [meta, base64Data] = dataUrl.split(',');
          const contentTypeMatch = meta?.match(/data:(.*);base64/);
          if (base64Data) {
            pdfAttachment = {
              fileName: `balkonfuchs-gewerbe-projekt-${Date.now()}.png`,
              contentType: contentTypeMatch?.[1] || 'image/png',
              base64: base64Data
            };
          }
        } catch (pdfError) {
          console.error('Fehler beim Erstellen des Projekt-PDFs:', pdfError);
        }
      }

      // Daten für Zoho formatieren
      const zohoData: any = formatGewerbeData(formData);
      if (pdfAttachment) {
        zohoData.pdfAttachment = pdfAttachment;
      }
      
      // An Zoho senden
      const result = await submitToZoho(zohoData, 'gewerbe');
      
      console.log('Zoho submission successful:', result);
      
      // Success - zur Danksagungsseite
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error('Zoho submission failed:', error);
      
      // Auch bei Fehler zur Danksagungsseite (Fallback)
      // In der Praxis würden Sie hier eine Fehlermeldung anzeigen
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canProceedStep1 = formData.projekttyp !== '';
  const canProceedStep2 = formData.projektname && formData.anzahlBalkone !== '' && formData.balkontyp.length > 0;
  const canProceedStep3 = (formData.zeitrahmen !== '' || (formData.startMonat && formData.startJahr)) && 
                         (formData.budgetrahmen !== '' || formData.budgetFreitext !== '');
  const canProceedStep4 = formData.firmenname && formData.ansprechpartner && formData.email && formData.telefon && formData.plz && formData.ort;
  const canSubmit = canProceedStep4 && formData.datenschutz && formData.haftungsausschluss;

  const blobToDataUrl = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <>
      <Head>
        <title>Gewerbeprojekte | Mehrfamilienhäuser | BALKONFUCHS Business</title>
        <meta name="description" content="Professionelle Balkonlösungen für Wohnbaugesellschaften, Bauträger und institutionelle Bauherren. Individuelle Angebote für Großprojekte." />
        <meta name="keywords" content="gewerbliche balkone, mehrfamilienhaus balkon, bauträger balkon, wohnbaugesellschaft, großprojekte balkon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />

        {/* Hero Section - nur auf Schritt 1 anzeigen */}
        {!isSubmitted && currentStep === 1 && (
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
        )}

        {/* Danksagungsseite nach Submit */}
        {isSubmitted ? (
          <section className="py-20 bg-gray-900 min-h-screen flex items-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 border-2 border-green-500/50 shadow-2xl shadow-green-500/20">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Vielen Dank für Ihre Anfrage!
                </h2>
                
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Ihre Projektanfrage wurde erfolgreich übermittelt. Unser Team prüft Ihre Angaben und wird sich{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold">
                    innerhalb von 24 Stunden
                  </span>{' '}
                  bei Ihnen melden.
                </p>

                <div className="bg-gray-700/50 rounded-xl p-6 mb-8 border border-gray-600">
                  <h3 className="text-xl font-bold text-white mb-4">Was passiert als Nächstes?</h3>
                  <div className="space-y-4 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-blue-400 font-bold">1</span>
                      </div>
                      <p className="text-gray-300">
                        Unser Team analysiert Ihre Projektanforderungen und wählt die passenden Partner aus
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-blue-400 font-bold">2</span>
                      </div>
                      <p className="text-gray-300">
                        Sie erhalten ein individuelles Angebot mit transparenter Kostenaufstellung
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-blue-400 font-bold">3</span>
                      </div>
                      <p className="text-gray-300">
                        Gemeinsam planen wir die nächsten Schritte für Ihr Balkonprojekt
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    Zur Startseite
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:post@balkonfuchs.de"
                    className="inline-flex items-center gap-2 bg-gray-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-600 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                    Direkt kontaktieren
                  </a>
                </div>

                <p className="text-gray-400 mt-8 text-sm">
                  Referenznummer: #{Date.now().toString().slice(-8)}
                </p>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* SEO-optimierte Einführung - nur auf Schritt 1 anzeigen */}
            {currentStep === 1 && (
              <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Gewerbliche <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Balkonlösungen</span> für Ihr Projekt
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Von der ersten Anfrage bis zur finalen Umsetzung - Ihr professioneller Partner für gewerbliche Balkonprojekte in Deutschland
                </p>
              </div>

              {/* W-Fragen für SEO */}
              <div className="space-y-8">
                {/* Warum */}
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">?</span>
                    </div>
                    Warum BALKONFUCHS für gewerbliche Balkonprojekte?
                  </h3>
                  <p className="text-gray-300 leading-relaxed ml-10">
                    Als spezialisierter Partner für gewerbliche Balkonprojekte verbinden wir Bauträger, Wohnbaugesellschaften und Investoren mit qualifizierten Fachbetrieben. Unsere Expertise umfasst Neubau, Sanierung und Modernisierung von Balkonanlagen für Mehrfamilienhäuser und Großprojekte. Mit über 850 erfolgreich vermittelten Projekten und geprüften Partnern garantieren wir höchste Qualitätsstandards nach DIN-Normen.
                  </p>
                </div>

                {/* Wie */}
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">?</span>
                    </div>
                    Wie läuft die Anfrage für gewerbliche Balkone ab?
                  </h3>
                  <p className="text-gray-300 leading-relaxed ml-10">
                    In nur 5 einfachen Schritten zu Ihrem individuellen Angebot: (1) Projektart definieren - Neubau, Sanierung oder Bestandsmodernisierung, (2) Projektumfang angeben - Anzahl der Einheiten und gewünschte Balkontypen, (3) Zeitrahmen und Budgetvorstellung mitteilen, (4) Unternehmensdaten hinterlegen, (5) Anfrage absenden und innerhalb von 24 Stunden ein maßgeschneidertes Angebot erhalten.
                  </p>
                </div>

                {/* Was */}
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">?</span>
                    </div>
                    Was umfasst unser Service für Gewerbeprojekte?
                  </h3>
                  <p className="text-gray-300 leading-relaxed ml-10">
                    Unser umfassender Service beinhaltet: Kostenlose Erstberatung und Projektanalyse, Vermittlung geprüfter Fachbetriebe für alle Balkontypen (Anbaubalkon, Vorstellbalkon, Hängebalkon, Loggia), transparente Angebotserstellung, Projektbegleitung von der Planung bis zur Abnahme, DIN-konforme Ausführung mit Gewährleistung, sowie flexible Finanzierungslösungen für Großprojekte.
                  </p>
                </div>

                {/* Wer */}
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">?</span>
                    </div>
                    Für wen eignet sich unser Gewerbe-Service?
                  </h3>
                  <p className="text-gray-300 leading-relaxed ml-10">
                    Unser spezialisierter Service richtet sich an: Bauträger und Projektentwickler für Neubauprojekte, Wohnbaugesellschaften und Immobilienverwalter für Portfolio-Modernisierungen, institutionelle Investoren für renditestarke Bestandsaufwertungen, Architekten und Planungsbüros für Großprojekte, sowie Eigentümergemeinschaften bei umfangreichen Sanierungsvorhaben.
                  </p>
                </div>
              </div>

              {/* Call-to-Action */}
              <div className="mt-12 text-center bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 border-2 border-blue-400/50 shadow-2xl">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Bereit für Ihr Balkonprojekt?</h3>
                <p className="text-blue-100 mb-6 text-lg max-w-2xl mx-auto">
                  Starten Sie jetzt Ihre kostenlose Anfrage und erhalten Sie binnen 24 Stunden ein maßgeschneidertes Angebot
                </p>
                <button
                  onClick={() => window.scrollTo({ top: document.getElementById('formular')?.offsetTop || 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
                >
                  Jetzt Anfrage starten
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
            )}

        {/* Progress Bar */}
        <div id="formular" className="bg-gray-800 border-b border-gray-700 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">Schritt {currentStep} von {totalSteps}</span>
              <span className="text-sm text-gray-400">{Math.round((currentStep / totalSteps) * 100)}% abgeschlossen</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-4 md:p-8 lg:p-12 border-2 border-gray-700">
              
              {/* Schritt 1: Projektart */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4">Welche Art von Projekt planen Sie?</h2>
                    <p className="text-gray-300">Bitte wählen Sie die passende Projektkategorie</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <button
                      onClick={() => {
                        handleInputChange('projekttyp', 'neubau');
                        setTimeout(() => nextStep(), 300);
                      }}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.projekttyp === 'neubau' 
                          ? 'border-blue-500 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 shadow-lg shadow-blue-500/50' 
                          : 'border-gray-600 bg-gray-700/50 hover:border-blue-400 hover:shadow-md'
                      }`}
                    >
                      <Building2 className={`w-12 h-12 mb-4 ${formData.projekttyp === 'neubau' ? 'text-blue-400' : 'text-gray-400'}`} />
                      <h3 className="text-xl font-bold text-white mb-2">Neubau</h3>
                      <p className="text-gray-300">Balkonlösungen für Neubauprojekte und Projektentwicklungen</p>
                    </button>

                    <button
                      onClick={() => {
                        handleInputChange('projekttyp', 'sanierung');
                        setTimeout(() => nextStep(), 300);
                      }}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.projekttyp === 'sanierung' 
                          ? 'border-blue-500 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 shadow-lg shadow-blue-500/50' 
                          : 'border-gray-600 bg-gray-700/50 hover:border-blue-400 hover:shadow-md'
                      }`}
                    >
                      <Home className={`w-12 h-12 mb-4 ${formData.projekttyp === 'sanierung' ? 'text-blue-400' : 'text-gray-400'}`} />
                      <h3 className="text-xl font-bold text-white mb-2">Sanierung / Modernisierung</h3>
                      <p className="text-gray-300">Balkonsanierung oder Nachrüstung im Bestand</p>
                    </button>

                    <button
                      onClick={() => {
                        handleInputChange('projekttyp', 'wohnbaugesellschaft');
                        setTimeout(() => nextStep(), 300);
                      }}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.projekttyp === 'wohnbaugesellschaft' 
                          ? 'border-blue-500 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 shadow-lg shadow-blue-500/50' 
                          : 'border-gray-600 bg-gray-700/50 hover:border-blue-400 hover:shadow-md'
                      }`}
                    >
                      <Users className={`w-12 h-12 mb-4 ${formData.projekttyp === 'wohnbaugesellschaft' ? 'text-blue-400' : 'text-gray-400'}`} />
                      <h3 className="text-xl font-bold text-white mb-2">Wohnbaugesellschaft</h3>
                      <p className="text-gray-300">Portfolio-Projekte für Wohnungsbaugesellschaften</p>
                    </button>

                    <button
                      onClick={() => {
                        handleInputChange('projekttyp', 'bautraeger');
                        setTimeout(() => nextStep(), 300);
                      }}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.projekttyp === 'bautraeger' 
                          ? 'border-blue-500 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 shadow-lg shadow-blue-500/50' 
                          : 'border-gray-600 bg-gray-700/50 hover:border-blue-400 hover:shadow-md'
                      }`}
                    >
                      <TrendingUp className={`w-12 h-12 mb-4 ${formData.projekttyp === 'bautraeger' ? 'text-blue-400' : 'text-gray-400'}`} />
                      <h3 className="text-xl font-bold text-white mb-2">Bauträger</h3>
                      <p className="text-gray-300">Großprojekte für Bauträger und Projektentwickler</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Schritt 2: Projektdetails */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4">Projektdetails</h2>
                    <p className="text-gray-300">Geben Sie uns mehr Informationen zu Ihrem Vorhaben</p>
                  </div>

                  {/* Projektdetails */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Projektname */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Projektname *
                      </label>
                      <input
                        type="text"
                        value={formData.projektname}
                        onChange={(e) => handleInputChange('projektname', e.target.value)}
                        placeholder="z.B. Wohnpark am See, Bürokomplex Mitte"
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Projektort */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Projektort *
                      </label>
                      <input
                        type="text"
                        value={formData.projektort}
                        onChange={(e) => handleInputChange('projektort', e.target.value)}
                        placeholder="z.B. Berlin, München, Hamburg"
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Projektadresse */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Projektadresse (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.projektadresse}
                      onChange={(e) => handleInputChange('projektadresse', e.target.value)}
                      placeholder="z.B. Musterstraße 123, 12345 Musterstadt"
                      className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Anzahl Balkone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Anzahl der Balkone
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['1-10', '11-25', '26-50', '51-100', '101-200', '201-500', '500+'].map((range) => (
                        <button
                          key={range}
                          onClick={() => {
                            handleInputChange('anzahlBalkone', range);
                            // Auto-advance if all required fields are filled
                            if (formData.projektname && formData.balkontyp.length > 0) {
                              setTimeout(() => nextStep(), 300);
                            }
                          }}
                          className={`p-4 rounded-lg border-2 font-semibold transition-all duration-300 ${
                            formData.anzahlBalkone === range
                              ? 'border-blue-500 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 shadow-lg shadow-blue-500/50 text-blue-400'
                              : 'border-gray-600 bg-gray-700/50 hover:border-blue-400 hover:shadow-md text-white'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Balkontyp (Mehrfachauswahl) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Welche Balkontypen sind geplant? (Mehrfachauswahl möglich)
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { value: 'anbaubalkon', label: 'Anlehnbalkon', desc: 'Klassischer Balkonanbau' },
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
                              ? 'border-blue-500 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 shadow-lg shadow-blue-500/50'
                              : 'border-gray-600 bg-gray-700/50 hover:border-blue-400 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-semibold text-white">{typ.label}</div>
                              <div className="text-sm text-gray-300 mt-1">{typ.desc}</div>
                            </div>
                            {formData.balkontyp.includes(typ.value) && (
                              <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
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
                    <h2 className="text-3xl font-bold text-white mb-4">Zeitrahmen & Budget</h2>
                    <p className="text-gray-300">Helfen Sie uns, Ihr Projekt optimal zu planen</p>
                  </div>

                  {/* Zeitrahmen */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Wann soll das Projekt umgesetzt werden?
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { value: 'sofort', label: 'So schnell wie möglich', icon: Zap },
                        { value: '3monate', label: 'In den nächsten 3 Monaten', icon: Clock },
                        { value: '6monate', label: 'In 3-6 Monaten', icon: Clock },
                        { value: '12monate', label: 'In 6-12 Monaten', icon: Calendar },
                        { value: 'planung', label: 'Noch in Planung', icon: FileText },
                        { value: 'unbekannt', label: 'Steht noch nicht fest', icon: FileText }
                      ].map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            onClick={() => handleInputChange('zeitrahmen', option.value)}
                            className={`p-4 rounded-lg border-2 flex items-center gap-3 transition-all duration-300 ${
                              formData.zeitrahmen === option.value
                                ? 'border-blue-500 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 shadow-lg shadow-blue-500/50'
                                : 'border-gray-600 bg-gray-700/50 hover:border-blue-400 hover:shadow-md'
                            }`}
                          >
                            <Icon className={`w-6 h-6 ${formData.zeitrahmen === option.value ? 'text-blue-400' : 'text-gray-400'}`} />
                            <span className="font-semibold text-white">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budgetrahmen */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Geschätzter Budgetrahmen
                    </label>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {[
                        '< 50.000 €',
                        '50.000 - 100.000 €',
                        '100.000 - 150.000 €',
                        '150.000 - 200.000 €',
                        '200.000 - 300.000 €',
                        '300.000 - 500.000 €',
                        '500.000 - 1 Mio. €',
                        '> 1 Mio. €',
                        'Steht noch nicht fest'
                      ].map((budget) => (
                        <button
                          key={budget}
                          onClick={() => handleInputChange('budgetrahmen', budget)}
                          className={`p-4 rounded-lg border-2 font-semibold transition-all duration-300 ${
                            formData.budgetrahmen === budget
                              ? 'border-blue-500 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 shadow-lg shadow-blue-500/50 text-blue-400'
                              : 'border-gray-600 bg-gray-700/50 hover:border-blue-400 hover:shadow-md text-white'
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                    
                    {/* Budget-Freifeld */}
                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Oder genaue Budget-Angabe (optional)
                      </label>
                      <input
                        type="text"
                        value={formData.budgetFreitext}
                        onChange={(e) => handleInputChange('budgetFreitext', e.target.value)}
                        placeholder="z.B. 175.000 € oder 1.2 Mio. €"
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Präzise Zeitplanung */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Präzise Projektzeitplanung
                    </label>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Starttermin */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Gewünschter Starttermin
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={formData.startMonat}
                            onChange={(e) => handleInputChange('startMonat', e.target.value)}
                            className="px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                          >
                            <option value="">Monat</option>
                            <option value="01">Januar</option>
                            <option value="02">Februar</option>
                            <option value="03">März</option>
                            <option value="04">April</option>
                            <option value="05">Mai</option>
                            <option value="06">Juni</option>
                            <option value="07">Juli</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">Oktober</option>
                            <option value="11">November</option>
                            <option value="12">Dezember</option>
                          </select>
                          <select
                            value={formData.startJahr}
                            onChange={(e) => handleInputChange('startJahr', e.target.value)}
                            className="px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                          >
                            <option value="">Jahr</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                            <option value="2031">2031</option>
                            <option value="2032">2032</option>
                            <option value="2033">2033</option>
                            <option value="2034">2034</option>
                            <option value="2035">2035</option>
                          </select>
                        </div>
                      </div>

                      {/* Endtermin */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Gewünschter Endtermin
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={formData.endMonat}
                            onChange={(e) => handleInputChange('endMonat', e.target.value)}
                            className="px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                          >
                            <option value="">Monat</option>
                            <option value="01">Januar</option>
                            <option value="02">Februar</option>
                            <option value="03">März</option>
                            <option value="04">April</option>
                            <option value="05">Mai</option>
                            <option value="06">Juni</option>
                            <option value="07">Juli</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">Oktober</option>
                            <option value="11">November</option>
                            <option value="12">Dezember</option>
                          </select>
                          <select
                            value={formData.endJahr}
                            onChange={(e) => handleInputChange('endJahr', e.target.value)}
                            className="px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                          >
                            <option value="">Jahr</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                            <option value="2031">2031</option>
                            <option value="2032">2032</option>
                            <option value="2033">2033</option>
                            <option value="2034">2034</option>
                            <option value="2035">2035</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Schritt 4: Unternehmensdaten */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4">Ihre Kontaktdaten</h2>
                    <p className="text-gray-300">Damit wir Sie für ein individuelles Angebot kontaktieren können</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Firmenname */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Firmenname *
                      </label>
                      <input
                        type="text"
                        value={formData.firmenname}
                        onChange={(e) => handleInputChange('firmenname', e.target.value)}
                        placeholder="Ihr Unternehmen"
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Ansprechpartner */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Ansprechpartner *
                      </label>
                      <input
                        type="text"
                        value={formData.ansprechpartner}
                        onChange={(e) => handleInputChange('ansprechpartner', e.target.value)}
                        placeholder="Vor- und Nachname"
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Position */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Position
                      </label>
                      <select
                        value={formData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      >
                        <option value="">Position wählen</option>
                        <option value="Geschäftsführer">Geschäftsführer</option>
                        <option value="Inhaber">Inhaber</option>
                        <option value="Prokurist">Prokurist</option>
                        <option value="Abteilungsleiter">Abteilungsleiter</option>
                        <option value="Vertriebsleiter">Vertriebsleiter</option>
                        <option value="Projektleiter">Projektleiter</option>
                        <option value="Vertriebsmitarbeiter">Vertriebsmitarbeiter</option>
                        <option value="Sonstige">Sonstige</option>
                      </select>
                    </div>

                    {/* Projektleiter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Projektleiter (optional)
                      </label>
                      <input
                        type="text"
                        value={formData.projektleiter}
                        onChange={(e) => handleInputChange('projektleiter', e.target.value)}
                        placeholder="Name des Projektleiters"
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* E-Mail */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="ihre.email@firma.de"
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Telefon */}
                    <div>
                      <PhoneInput
                        value={formData.telefon}
                        onChange={(value) => handleInputChange('telefon', value)}
                        required={true}
                        placeholder="123 456789"
                        label="Telefon"
                        className="w-full"
                      />
                    </div>

                    {/* Straße */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Straße & Hausnummer
                      </label>
                      <input
                        type="text"
                        value={formData.strasse}
                        onChange={(e) => handleInputChange('strasse', e.target.value)}
                        placeholder="Musterstraße 123"
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* PLZ */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        PLZ *
                      </label>
                      <input
                        type="text"
                        value={formData.plz}
                        onChange={(e) => handleInputChange('plz', e.target.value)}
                        placeholder="12345"
                        maxLength={5}
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Ort */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Ort *
                      </label>
                      <input
                        type="text"
                        value={formData.ort}
                        onChange={(e) => handleInputChange('ort', e.target.value)}
                        placeholder="Musterstadt"
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Schritt 5: Zusätzliche Informationen */}
              {currentStep === 5 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4">Zusätzliche Informationen</h2>
                    <p className="text-gray-300">Fast geschafft! Gibt es noch etwas, das wir wissen sollten?</p>
                  </div>

                  {/* Nachricht */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Ihre Nachricht (optional)
                    </label>
                    <textarea
                      value={formData.nachricht}
                      onChange={(e) => handleInputChange('nachricht', e.target.value)}
                      placeholder="Besondere Anforderungen, Fragen oder zusätzliche Informationen zu Ihrem Projekt..."
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Rechtliche Bestätigungen */}
                  <div className="space-y-4">
                    {/* Datenschutz */}
                    <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.datenschutz}
                          onChange={(e) => handleInputChange('datenschutz', e.target.checked)}
                          className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-300">
                          Ich habe die <a href="/datenschutz/" className="text-blue-400 hover:underline" target="_blank">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu. Ich bin damit einverstanden, dass BALKONFUCHS mich bezüglich meiner Anfrage kontaktiert. *
                        </span>
                      </label>
                    </div>

                    {/* Balkonbrief */}
                    <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.balkonbrief}
                          onChange={(e) => handleInputChange('balkonbrief', e.target.checked)}
                          className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-300">
                          Ich möchte den <a href="/balkonbrief/" className="text-blue-400 hover:underline" target="_blank">Balkonbrief</a> kostenlos abonnieren und regelmäßig über Balkon-Trends und Angebote informiert werden.
                        </span>
                      </label>
                    </div>

                    {/* Haftungsausschluss */}
                    <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.haftungsausschluss}
                          onChange={(e) => handleInputChange('haftungsausschluss', e.target.checked)}
                          className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-300">
                          Ich habe die <a href="/disclaimer/" className="text-blue-400 hover:underline" target="_blank">Haftungsausschlusserklärung</a> gelesen und akzeptiere die darin enthaltenen Bedingungen. *
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Vollständige Zusammenfassung */}
                  <div
                    ref={summaryRef}
                    className="bg-gray-700/50 rounded-lg p-6 border border-gray-600"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">📋 Vollständige Projektübersicht</h3>
                    
                    {/* Projekt-Details */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-blue-400 mb-3">🏢 Projektdetails</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Projektname:</span>
                            <span className="font-semibold text-white">{formData.projektname || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Projektort:</span>
                            <span className="font-semibold text-white">{formData.projektort || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Projektadresse:</span>
                            <span className="font-semibold text-white">{formData.projektadresse || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Gebäudetyp:</span>
                            <span className="font-semibold text-white">{formData.projekttyp || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Anzahl Balkone:</span>
                            <span className="font-semibold text-white">{formData.anzahlBalkone || '-'}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Balkontypen:</span>
                            <span className="font-semibold text-white">{formData.balkontyp.length > 0 ? formData.balkontyp.join(', ') : '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Zeitrahmen (Range):</span>
                            <span className="font-semibold text-white">{formData.zeitrahmen || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Exakter Starttermin:</span>
                            <span className="font-semibold text-white">
                              {formData.startMonat && formData.startJahr ? `${formData.startMonat}/${formData.startJahr}` : '-'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Exakter Endtermin:</span>
                            <span className="font-semibold text-white">
                              {formData.endMonat && formData.endJahr ? `${formData.endMonat}/${formData.endJahr}` : '-'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Budget (Range):</span>
                            <span className="font-semibold text-white">{formData.budgetrahmen || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Exaktes Budget:</span>
                            <span className="font-semibold text-white">{formData.budgetFreitext || '-'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Kontakt-Details */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-blue-400 mb-3">👥 Kontaktdetails</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Unternehmensname:</span>
                            <span className="font-semibold text-white">{formData.firmenname || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Ansprechpartner:</span>
                            <span className="font-semibold text-white">{formData.ansprechpartner || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Position:</span>
                            <span className="font-semibold text-white">{formData.position || '-'}</span>
                          </div>
                          {formData.projektleiter && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Projektleiter:</span>
                              <span className="font-semibold text-white">{formData.projektleiter}</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300">E-Mail:</span>
                            <span className="font-semibold text-white">{formData.email || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Telefon:</span>
                            <span className="font-semibold text-white">{formData.telefon || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">PLZ:</span>
                            <span className="font-semibold text-white">{formData.plz || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Ort:</span>
                            <span className="font-semibold text-white">{formData.ort || '-'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Zusätzliche Informationen */}
                    {formData.nachricht && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">💬 Zusätzliche Nachricht</h4>
                        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                          <p className="text-gray-300 text-sm leading-relaxed">{formData.nachricht}</p>
                        </div>
                      </div>
                    )}

                    {/* Rechtliche Bestätigungen */}
                    <div>
                      <h4 className="text-lg font-semibold text-blue-400 mb-3">✅ Rechtliche Bestätigungen</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className={`flex items-center gap-2 ${formData.datenschutz ? 'text-green-400' : 'text-red-400'}`}>
                          <CheckCircle className="w-4 h-4" />
                          <span>Datenschutz</span>
                        </div>
                        <div className={`flex items-center gap-2 ${formData.balkonbrief ? 'text-green-400' : 'text-red-400'}`}>
                          <CheckCircle className="w-4 h-4" />
                          <span>Balkonbrief</span>
                        </div>
                        <div className={`flex items-center gap-2 ${formData.haftungsausschluss ? 'text-green-400' : 'text-red-400'}`}>
                          <CheckCircle className="w-4 h-4" />
                          <span>Haftungsausschluss</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-600">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-2 px-6 py-3 text-gray-300 font-semibold hover:text-white transition-colors"
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
                href="mailto:post@balkonfuchs.de"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                post@balkonfuchs.de
              </a>
            </div>
          </div>
        </section>
          </>
        )}

        <Footer />
        <ZohoSalesIQ />
      </div>

      <style jsx global>{`
        /* Placeholder-Text Kontrast verbessern */
        input::placeholder,
        textarea::placeholder {
          color: white !important;
          opacity: 0.7 !important;
        }
      `}</style>
    </>
  );
}

