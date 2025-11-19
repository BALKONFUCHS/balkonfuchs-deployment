import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Calculator, Calendar, FileText, CheckCircle, Clock, Users, ArrowRight, Star, Zap, Target, Award, Crown, Shield, FileCheck, Rocket, Box } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';
const ZohoSalesIQ = dynamic(() => import('../components/ZohoSalesIQ.js'), { ssr: false });

const StartseiteFarbtest = () => {
  const [qualificationStep, setQualificationStep] = useState(1);
  const [selectedMainOption, setSelectedMainOption] = useState<string | null>(null);

  // Options for Step 2 based on main selection
  const step2Options = {
    anbauen: [
      {
        icon: '💰',
        title: 'Kosten berechnen',
        subtitle: 'Erste Kostenschätzung in 2 Min.',
        url: '/kalkulator/',
        gradient: 'from-orange-500 to-red-500'
      },
      {
        icon: '✅',
        title: 'Genehmigung prüfen',
        subtitle: 'Brauche ich eine Genehmigung?',
        url: '/genehmigung/',
        gradient: 'from-red-500 to-pink-500'
      },
      {
        icon: '⏱️',
        title: 'Bauzeit planen',
        subtitle: 'Wie lange dauert mein Projekt?',
        url: '/bauzeit-planung/',
        gradient: 'from-purple-500 to-indigo-500'
      },
      {
        icon: '💼',
        title: 'Planung & Angebot',
        subtitle: 'Detaillierte Planung + Angebot',
        subtitleSmall: 'Für fortgeschrittene Projekte',
        url: '/planer/',
        gradient: 'from-blue-500 to-cyan-500',
        special: true
      }
    ],
    sanieren: [
      {
        icon: '💰',
        title: 'Sanierungskosten',
        subtitle: 'Was kostet meine Sanierung?',
        url: '/kalkulator/?type=sanierung&source=qualification',
        gradient: 'from-orange-500 to-red-500'
      },
      {
        icon: '✅',
        title: 'Genehmigung prüfen',
        subtitle: 'Brauche ich eine Genehmigung?',
        url: '/genehmigung/?type=sanierung&source=qualification',
        gradient: 'from-red-500 to-pink-500'
      },
      {
        icon: '⏱️',
        title: 'Bauzeit Sanierung',
        subtitle: 'Zeitplanung für Sanierung',
        url: '/bauzeit-planung/?type=sanierung&source=qualification',
        gradient: 'from-purple-500 to-indigo-500'
      },
      {
        icon: '💼',
        title: 'Planung & Angebot',
        subtitle: 'Detaillierte Planung + Angebot',
        subtitleSmall: 'Für fortgeschrittene Projekte',
        url: '/planer/?type=sanierung&source=qualification&intent=angebot',
        gradient: 'from-blue-500 to-cyan-500',
        special: true
      }
    ]
  };

  // Render Step 2 Options
  const renderStep2Options = (option: string | null) => {
    if (!option || !step2Options[option as keyof typeof step2Options]) return null;
    
    const options = step2Options[option as keyof typeof step2Options];
    
    return options.map((opt, index) => (
      <a
        key={index}
        href={opt.url}
        onClick={() => {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'qualification_step_2', {
              event_category: 'qualification_wizard',
              event_label: opt.title.toLowerCase().replace(/\s+/g, '_')
            });
          }
        }}
        className={`bg-gray-800/50 backdrop-blur-sm border-2 ${opt.special ? 'border-orange-500/50' : 'border-gray-700'} rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 cursor-pointer group`}
      >
        <div className={`w-16 h-16 bg-gradient-to-r ${opt.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-white text-2xl">{opt.icon}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
          {opt.title}
        </h3>
        <p className="text-gray-400 mb-2 leading-relaxed text-sm">
          {opt.subtitle}
        </p>
        {opt.subtitleSmall && (
          <p className="text-gray-500 text-xs italic">
            {opt.subtitleSmall}
          </p>
        )}
        <div className="mt-4 flex justify-end">
          <ArrowRight className="text-orange-400 w-5 h-5 group-hover:text-orange-300 transition-colors" />
        </div>
      </a>
    ));
  };

  // Zoho SalesIQ Integration
  const openChatWithContext = (context: string) => {
    if (typeof window !== 'undefined' && (window as any).$zoho && (window as any).$zoho.salesiq) {
      try {
        (window as any).$zoho.salesiq.floatwindow.visible('show');
        // Optional: Vordefinierte Nachricht setzen
        if ((window as any).$zoho.salesiq.visitor && (window as any).$zoho.salesiq.visitor.question) {
          (window as any).$zoho.salesiq.visitor.question(context);
        }
        
        // Track event
        if ((window as any).gtag) {
          (window as any).gtag('event', 'chat_opened', {
            event_category: 'qualification_wizard',
            event_label: context
          });
        }
      } catch (error) {
        console.warn('Error opening Zoho SalesIQ:', error);
        // Fallback: Email-Kontakt
        window.location.href = `mailto:post@balkonfuchs.de?subject=${encodeURIComponent(context)}`;
      }
    } else {
      // Fallback: Email-Kontakt
      console.warn('Zoho SalesIQ not available');
      window.location.href = `mailto:post@balkonfuchs.de?subject=${encodeURIComponent(context)}`;
    }
  };

  useEffect(() => {
    // Rotating text animation
    const rotatingTexts = [
      { text: 'kalkulieren', color: 'text-orange-400' },
      { text: 'planen', color: 'text-green-400' },
      { text: 'anbauen', color: 'text-blue-400' },
      { text: 'Partner finden', color: 'text-purple-400' },
      { text: 'realisieren', color: 'text-red-400' },
      { text: 'bauen', color: 'text-yellow-400' },
      { text: 'sanieren', color: 'text-pink-400' },
      { text: 'genießen', color: 'text-cyan-400' }
    ];
    
    let currentIndex = 0;
    const rotatingElement = document.getElementById('rotating-text');
    
    function updateRotatingText() {
      if (rotatingElement) {
        const current = rotatingTexts[currentIndex];
        rotatingElement.textContent = current.text;
        rotatingElement.className = `rotating-text ${current.color}`;
        currentIndex = (currentIndex + 1) % rotatingTexts.length;
      }
    }
    
    // Start rotation
    const interval = setInterval(updateRotatingText, 2000);
    
    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>BALKONFUCHS - Alle Services im Überblick</title>
        <meta name="description" content="Entdecken Sie alle BALKONFUCHS Services: Kalkulator, Planer, Express-Angebot, Genehmigungscheck und mehr. Finden Sie den perfekten Weg zu Ihrem Balkon-Projekt." />
        <meta name="keywords" content="balkon kalkulator, balkon planer, balkon genehmigung, balkon bauzeit, balkon express angebot, balkon partner, balkon kalkulation, balkon planung, balkon genehmigungscheck, balkon baustart rechner" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://balkonfuchs.de/" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="BALKONFUCHS - Alle Services im Überblick" />
        <meta property="og:description" content="Entdecken Sie alle BALKONFUCHS Services: Kalkulator, Planer, Express-Angebot, Genehmigungscheck und mehr. Finden Sie den perfekten Weg zu Ihrem Balkon-Projekt." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/" />
        <meta property="og:image" content="https://balkonfuchs.de/images/balkonfuchs-og-image.jpg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BALKONFUCHS - Alle Services im Überblick" />
        <meta name="twitter:description" content="Entdecken Sie alle BALKONFUCHS Services: Kalkulator, Planer, Express-Angebot, Genehmigungscheck und mehr." />
        <meta name="twitter:image" content="https://balkonfuchs.de/images/balkonfuchs-og-image.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BALKONFUCHS",
              "url": "https://balkonfuchs.de",
              "logo": "https://balkonfuchs.de/images/Balkonfuchs-Logo_white.png",
              "description": "Deutschlands führende Plattform für Balkon-Projekte",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+49-XXX-XXXXXXX",
                "contactType": "customer service",
                "availableLanguage": "German"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "850"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Dynamic Headline - Top Priority */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Balkon <span id="rotating-text" className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Partner finden</span>
            </h1>
            
            <div className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 space-y-2">
              <p>
                Bis zu <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 font-bold">35% sparen</span> bei deinem Balkon-Projekt
              </p>
              <p>
                Über <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold">850 Haushalte</span> haben bereits den <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 font-bold">perfekten Partner</span> gefunden
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="flex items-center text-gray-400">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-lg">Geprüfte Partner</span>
              </div>
              <div className="flex items-center text-gray-400">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-lg">DSGVO konform</span>
              </div>
              <div className="flex items-center text-gray-400">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                  <Star className="w-6 h-6 text-yellow-400" />
                </div>
                <span className="text-lg">4.8/5 Sterne von über 850 Kunden</span>
              </div>
            </div>

          </div>
        </section>

        {/* Carousel Section - Early Position */}
        <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ausgewählte <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Balkon-Referenzen</span>
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Entdecken Sie die Vielfalt der Balkon-Projekte unserer Partner
              </p>
              </div>
              
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-lg">
              <div className="flex animate-scroll gap-4" style={{ width: 'calc(200% + 3rem)' }}>
                <img
                  src="/images/carousel/01-anlehnbalkon-stabgelaender.jpg"
                  alt="Anlehnbalkon mit Stabgeländer"
                  className="w-[14.285%] h-64 object-cover flex-shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/carousel/02-fluchtleiter.jpg"
                  alt="Balkon mit Fluchtleiter"
                  className="w-[14.285%] h-64 object-cover flex-shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/carousel/03-geschwungenes-gelaender.jpg"
                  alt="Geschwungenes Balkongeländer"
                  className="w-[14.285%] h-64 object-cover flex-shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/carousel/04-haengebalkon.jpg"
                  alt="Hängebalkon"
                  className="w-[14.285%] h-64 object-cover flex-shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/carousel/05-vorstellbalkon-denkmalschutz.jpg"
                  alt="Vorstellbalkon im Denkmalschutz"
                  className="w-[14.285%] h-64 object-cover flex-shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/carousel/06-vorstellbalkon-balkonraum-1.jpg"
                  alt="Vorstellbalkon Balkonraum"
                  className="w-[14.285%] h-64 object-cover flex-shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/carousel/07-vorstellbalkon-lisenen.jpg"
                  alt="Vorstellbalkon mit Lisenen"
                  className="w-[14.285%] h-64 object-cover flex-shrink-0 rounded-lg shadow-lg"
                />
                {/* Duplicate images for seamless loop */}
                <img
                  src="/images/carousel/01-anlehnbalkon-stabgelaender.jpg"
                  alt="Anlehnbalkon mit Stabgeländer"
                  className="w-[14.285%] h-64 object-cover flex-shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/carousel/02-fluchtleiter.jpg"
                  alt="Balkon mit Fluchtleiter"
                  className="w-[14.285%] h-64 object-cover flex-shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/carousel/03-geschwungenes-gelaender.jpg"
                  alt="Geschwungenes Balkongeländer"
                  className="w-[14.285%] h-64 object-cover flex-shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/carousel/04-haengebalkon.jpg"
                  alt="Hängebalkon"
                  className="w-[14.285%] h-64 object-cover flex-shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/carousel/05-vorstellbalkon-denkmalschutz.jpg"
                  alt="Vorstellbalkon im Denkmalschutz"
                  className="w-[14.285%] h-64 object-cover flex-shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/carousel/06-vorstellbalkon-balkonraum-1.jpg"
                  alt="Vorstellbalkon Balkonraum"
                  className="w-[14.285%] h-64 object-cover flex-shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/carousel/07-vorstellbalkon-lisenen.jpg"
                  alt="Vorstellbalkon mit Lisenen"
                  className="w-[14.285%] h-64 object-cover flex-shrink-0 rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Start Your Project Section */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <span className="text-4xl mr-4">🚀</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  Starten Sie Ihr <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Balkon-Projekt</span>
                </h2>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                Wählen Sie das passende Tool für Ihren nächsten Schritt von der ersten Kostenschätzung bis zur finalen Umsetzung
              </p>
              
              {/* Why BALKONFUCHS Subsection */}
              <div className="mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Warum <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">BALKONFUCHS</span>?
                </h3>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                  Deutschlands führende Plattform für Balkon-Projekte
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">Präzise Kalkulation</h4>
                    <p className="text-gray-300">Berechnungen auf Basis aktueller Marktpreise und regionaler Besonderheiten.</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">Geprüfte Partner</h4>
                    <p className="text-gray-300">Nur qualifizierte und zertifizierte Partner in unserem Netzwerk.</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">Schnelle Umsetzung</h4>
                    <p className="text-gray-300">Von der Idee bis zur Umsetzung in nur wenigen Wochen.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Qualification Wizard */}
        <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Hero Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  Finde <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">deinen Weg</span> zum perfekten Balkon
                </h2>
              </div>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6">
                Nutze unsere interaktive Navigation, um schnell zum passenden Service für dein Projekt zu gelangen
              </p>
              
              {/* Progress Indicator */}
              <div className="inline-block">
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 rounded-full px-6 py-2 shadow-lg">
                  <span className="text-orange-300 font-semibold text-sm">Schritt {qualificationStep} von 2</span>
                </div>
              </div>
            </div>

            {/* Stufe 1: Hauptentscheidung */}
            {qualificationStep === 1 && (
              <div className="wizard-step">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Was möchtest du tun?
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
                  {/* Balkon anbauen */}
                  <button 
                    onClick={() => {
                      setSelectedMainOption('anbauen');
                      setQualificationStep(2);
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'qualification_step_1', {
                          event_category: 'qualification_wizard',
                          event_label: 'anbauen'
                        });
                      }
                    }}
                    className="bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300 cursor-pointer group text-left"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-3xl">🏗️</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                      Balkon anbauen
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      Für Neubauprojekte und neue Balkone
                    </p>
                  </button>

                  {/* Balkon sanieren */}
                  <button 
                    onClick={() => {
                      setSelectedMainOption('sanieren');
                      setQualificationStep(2);
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'qualification_step_1', {
                          event_category: 'qualification_wizard',
                          event_label: 'sanieren'
                        });
                      }
                    }}
                    className="bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300 cursor-pointer group text-left"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-3xl">🔧</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                      Balkon sanieren
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      Für Renovierung und Modernisierung
                    </p>
                  </button>
                </div>

                {/* Chat Alternative */}
                <div className="text-center mb-4">
                  <p className="text-gray-400 text-sm mb-3">Nicht sicher oder andere Frage?</p>
                  <button 
                    onClick={() => {
                      openChatWithContext('Ich bin mir unsicher, ob ich bauen oder sanieren soll');
                    }}
                    className="inline-flex items-center gap-2 border border-gray-600 text-gray-300 hover:border-orange-500 hover:text-orange-400 px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    <span className="text-xl">💬</span>
                    Chat mit uns
                  </button>
                  <p className="text-gray-500 text-xs mt-3">Oder scrolle runter für alle Optionen</p>
                </div>
              </div>
            )}

            {/* Stufe 2: Bedarfsermittlung */}
            {qualificationStep === 2 && (
              <div className="wizard-step">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Was ist dein nächster Schritt?
                  </h2>
                  <button 
                    onClick={() => {
                      setQualificationStep(1);
                      setSelectedMainOption(null);
                    }}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm mb-4 inline-flex items-center gap-1"
                  >
                    ← Zurück
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                  {renderStep2Options(selectedMainOption)}
                </div>

                {/* Chat Alternative for Step 2 */}
                <div className="text-center mb-4">
                  <p className="text-gray-400 text-sm mb-3">
                    {selectedMainOption === 'anbauen' ? 'Andere Frage zum Balkonbau?' : 'Andere Frage zur Balkonsanierung?'}
                  </p>
                  <button 
                    onClick={() => {
                      const context = selectedMainOption === 'anbauen' 
                        ? 'Ich habe eine Frage zum Balkonanbau'
                        : 'Ich habe eine Frage zur Balkonsanierung';
                      openChatWithContext(context);
                    }}
                    className="inline-flex items-center gap-2 border border-gray-600 text-gray-300 hover:border-orange-500 hover:text-orange-400 px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    <span className="text-xl">💬</span>
                    Frag uns direkt
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Unsere <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Services im Überblick</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Wählen Sie den passenden Service für Ihr Balkon-Projekt
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Kalkulator */}
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Balkon Kalkulator</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  Berechnen Sie die Kosten für Ihr Balkon-Projekt in nur 2 Minuten. Schnell, unverbindlich und präzise.
                </p>
                <div className="text-center">
                  <a 
                    href="/kalkulator/" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Kostenlos berechnen
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Planer */}
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Balkon Planer</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  Planen Sie Ihr Balkon-Projekt detailliert. Von der Idee bis zur Umsetzung - alles in einem Tool.
                </p>
                <div className="text-center">
                  <a 
                    href="/planer/" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Projekt planen
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Genehmigungscheck */}
              <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-2 border-red-500/30 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Genehmigungscheck</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  Prüfen Sie in nur 1 Minute, ob Sie eine Genehmigung für Ihr Balkon-Projekt benötigen.
                </p>
                <div className="text-center">
                  <a 
                    href="/genehmigung/" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Genehmigung prüfen
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Baustart Rechner */}
              <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-2 border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Baustart Rechner</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  Berechnen Sie den optimalen Baustart für Ihr Balkon-Projekt. Berücksichtigt alle Faktoren.
                </p>
                <div className="text-center">
                  <a 
                    href="/bauzeit-planung/" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Baustart planen
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Erfahrungen */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Erfahrungen</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  Lesen Sie echte Erfahrungsberichte unserer Kunden und lassen Sie sich inspirieren.
                </p>
                <div className="text-center">
                  <a 
                    href="/erfahrungen/" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Erfahrungen lesen
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 3D Konfigurator */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Box className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">3D Konfigurator</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  Erlebe deinen zukünftigen Balkon in 3D. Visualisiere verschiedene Varianten und finde deine Wunschlösung.
                </p>
                <div className="text-center">
                  <a 
                    href="/balkon-konfigurator/" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    3D-Erlebnis starten
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8 text-orange-400 mr-3" />
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  So einfach geht's
                </h2>
              </div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                In nur 4 Schritten zu deinem Traum-Balkon
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Service wählen</h3>
                <p className="text-gray-300 text-sm">Wähle den passenden Service für dein Projekt</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Projekt definieren</h3>
                <p className="text-gray-300 text-sm">Gib deine Projekt-Details ein</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Kontaktdaten eingeben</h3>
                <p className="text-gray-300 text-sm">Teile uns deine Kontaktdaten mit</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Partner erhalten</h3>
                <p className="text-gray-300 text-sm">Erhalte Kontakt zu qualifizierten Partnern</p>
              </div>
            </div>

            <div className="text-center">
              <a 
                href="/kalkulator/" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Kostenlos Partner finden
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Why Customers Trust Section - with visual container */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Warum Kunden <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">BALKONFUCHS vertrauen</span>
              </h2>
            </div>

            {/* Visual Container with Gradient Background */}
            <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-3xl p-12 border border-gray-600/30 shadow-2xl">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">4.8/5 Sterne</h3>
                  <p className="text-gray-300">von über 850 Kunden</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Geprüfte Partner</h3>
                  <p className="text-gray-300">Qualitätsstandards garantiert</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">DSGVO konform</h3>
                  <p className="text-gray-300">Datenschutz gewährleistet</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">85+ Partner</h3>
                  <p className="text-gray-300">bundesweit verfügbar</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Testimonials Section */}
        <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Was unsere <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Kunden sagen</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Über 850 zufriedene Haushalte vertrauen BALKONFUCHS
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "Endlich eine Plattform, die wirklich funktioniert! Von der Kalkulation bis zur Umsetzung - alles perfekt organisiert."
                </p>
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-white font-semibold">Michael Schmidt</p>
                  <p className="text-gray-400 text-sm">München, Bayern</p>
                  <p className="text-gray-500 text-xs mt-1">Verstellbalkon 3.2 x 2.1m • November 2024</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "Durch BALKONFUCHS haben wir den perfekten Partner gefunden. Professionalität und Qualität auf höchstem Niveau."
                </p>
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-white font-semibold">Sabine Wagner</p>
                  <p className="text-gray-400 text-sm">Hamburg, Norddeutschland</p>
                  <p className="text-gray-500 text-xs mt-1">Hängegalerie 2.6 x 1.8m • Januar 2025</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "Unkompliziert, schnell und transparent. Genau das, was wir für unser Balkon-Projekt gesucht haben!"
                </p>
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-white font-semibold">Klaus Lang</p>
                  <p className="text-gray-400 text-sm">Berlin, Brandenburg</p>
                  <p className="text-gray-500 text-xs mt-1">Anbaubalkon 4.5 x 2.2m • Februar 2025</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Häufige Fragen zu <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Balkon-Projekten</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Hier findest du die wichtigsten Antworten auf die häufigsten Fragen rund um dein Balkonprojekt
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">❓ Wie viel kostet ein Balkon?</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Ein Balkon kostet je nach Größe und Ausstattung zwischen <strong className="text-orange-400">3.000€ und 15.000€</strong>. 
                  Nutzen Sie unseren <a href="/kalkulator/" className="text-orange-400 hover:text-orange-300 underline">BalkonKalkulator</a> für eine genaue Kostenschätzung in nur 2 Minuten.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">❓ Wie lange dauert der Balkonbau?</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Ein Balkon-Projekt dauert in der Regel <strong className="text-orange-400">4-8 Wochen</strong>. Nutzen Sie unseren <a href="/planer/" className="text-orange-400 hover:text-orange-300 underline">BalkonPlaner</a> für einen detaillierten Zeitplan.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">❓ Brauche ich eine Genehmigung für meinen Balkon?</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Das hängt von Ihrem Bundesland und der Art des Balkons ab. Nutzen Sie unseren <a href="/genehmigung/" className="text-orange-400 hover:text-orange-300 underline">Genehmigungscheck</a> für eine schnelle Antwort in 1 Minute.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">❓ Wie finde ich den richtigen Partner?</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Wir vermitteln Ihnen <strong className="text-orange-400">geprüfte Partner</strong> aus Ihrer Region. Nutzen Sie unseren <a href="/planer/" className="text-orange-400 hover:text-orange-300 underline">BalkonPlaner</a> für eine detaillierte Projektplanung.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 rounded-2xl p-8">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-orange-400 mb-2">4.8/5</div>
                  <div className="text-gray-300">Kundenbewertung</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-400 mb-2">850+</div>
                  <div className="text-gray-300">Projekte realisiert</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-400 mb-2">98%</div>
                  <div className="text-gray-300">Weiterempfehlung</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-400 mb-2">85+</div>
                  <div className="text-gray-300">Partner in Planung</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        
        {/* ZOHO Sales IQ Widget */}
        <ZohoSalesIQ />
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: 200% !important;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};

export default StartseiteFarbtest;