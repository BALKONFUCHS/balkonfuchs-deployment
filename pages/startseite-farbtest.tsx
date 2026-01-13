import React, { useState } from 'react';
import Head from 'next/head';
import { CheckCircle, Shield, Star, ArrowRight, FileCheck, Calculator, Box } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';
const ZohoSalesIQ = dynamic(() => import('../components/ZohoSalesIQ.js'), { ssr: false });

const StartseiteFarbtest = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'Wie viel kostet ein Balkon?',
      answer: (
        <>
          Ein Balkon kostet je nach Größe und Ausstattung zwischen <strong className="text-orange-400">3.000€ und 15.000€</strong>. Nutzen Sie unseren <a href="/kalkulator/" className="text-orange-400 hover:text-orange-300 underline">BalkonKalkulator</a> für eine genaue Kostenschätzung in nur 2 Minuten.
        </>
      )
    },
    {
      question: 'Wie lange dauert der Balkonbau?',
      answer: (
        <>
          Ein Balkon-Projekt dauert in der Regel <strong className="text-orange-400">4-8 Wochen</strong>. Nutzen Sie unseren <a href="/planer/" className="text-orange-400 hover:text-orange-300 underline">BalkonPlaner</a> für einen detaillierten Zeitplan.
        </>
      )
    },
    {
      question: 'Brauche ich eine Genehmigung für meinen Balkon?',
      answer: (
        <>
          Das hängt von Ihrem Bundesland und der Art des Balkons ab. Nutzen Sie unseren <a href="/genehmigung/" className="text-orange-400 hover:text-orange-300 underline">Genehmigungscheck</a> für eine schnelle Antwort in 1 Minute.
        </>
      )
    },
    {
      question: 'Wie finde ich den richtigen Partner?',
      answer: (
        <>
          Wir vermitteln Ihnen <strong className="text-orange-400">geprüfte Partner</strong> aus Ihrer Region. Nutzen Sie unseren <a href="/planer/" className="text-orange-400 hover:text-orange-300 underline">BalkonPlaner</a> für eine detaillierte Projektplanung.
        </>
      )
    },
    {
      question: 'Welche Balkontypen gibt es?',
      answer: 'Die häufigsten Balkontypen sind Anlehnbalkon, Vorstellbalkon und Hängebalkon. Jeder Typ hat unterschiedliche Anforderungen an Genehmigung und Statik.'
    },
    {
      question: 'Gibt es Fördermöglichkeiten für Balkone?',
      answer: (
        <>
          In einigen Bundesländern gibt es Fördermöglichkeiten für energetische Sanierungen, die auch Balkone umfassen können. Informieren Sie sich über unsere <a href="/foerderung/" className="text-orange-400 hover:text-orange-300 underline">Förderseite</a>.
        </>
      )
    }
  ];

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
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />

        {/* A) HERO SECTION */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Balkon <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Partner finden</span>
            </h1>
            
            <div className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 space-y-2">
              <p>
                Bis zu <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 font-bold">35% sparen</span> bei Ihrem Balkon-Projekt
              </p>
              <p>
                Über <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold">850 Haushalte</span> haben bereits den <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 font-bold">perfekten Partner</span> gefunden
              </p>
            </div>

            {/* Primary CTA */}
            <div className="mb-8">
              <a 
                href="/balkon-konfigurator/" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-lg"
              >
                Projekt starten
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Secondary Quick Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a 
                href="/genehmigung/" 
                className="inline-flex items-center gap-2 border-2 border-gray-600 text-gray-300 hover:border-orange-500 hover:text-orange-400 px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Genehmigung prüfen
              </a>
              <a 
                href="/kalkulator/" 
                className="inline-flex items-center gap-2 border-2 border-gray-600 text-gray-300 hover:border-orange-500 hover:text-orange-400 px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Kosten berechnen
              </a>
            </div>

            {/* Trust Sentence */}
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Geprüfte Partner • DSGVO konform • Über 850 zufriedene Kunden
            </p>
          </div>
        </section>

        {/* B) SECTION: Was möchten Sie tun? */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Was möchten Sie tun?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Balkon anbauen */}
              <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Balkon anbauen
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Für Neubauprojekte und neue Balkone
                </p>
                <a 
                  href="/balkon-konfigurator/" 
                  className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium transition-colors"
                >
                  Projekt starten
                    <ArrowRight className="w-4 h-4" />
                  </a>
              </div>

              {/* Balkon sanieren */}
              <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Balkon sanieren
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Für Renovierung und Modernisierung
                </p>
                <a 
                  href="/kalkulator/?type=sanierung" 
                  className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium transition-colors"
                >
                  Kosten berechnen
                    <ArrowRight className="w-4 h-4" />
                  </a>
              </div>
            </div>
          </div>
        </section>

        {/* C) SECTION: In 3 Schritten zum Balkon */}
        <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                In 3 Schritten zum Balkon
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Genehmigung einschätzen</h3>
                <p className="text-gray-300 text-sm mb-4">Prüfen Sie, ob Sie eine Genehmigung benötigen</p>
                <a 
                  href="/genehmigung/" 
                  className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
                >
                  Genehmigung prüfen
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Kostenrahmen berechnen</h3>
                <p className="text-gray-300 text-sm mb-4">Erhalten Sie eine erste Kostenschätzung</p>
                <a 
                  href="/kalkulator/" 
                  className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
                >
                  Kosten berechnen
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Anbieter finden</h3>
                <p className="text-gray-300 text-sm mb-4">Finden Sie qualifizierte Partner in Ihrer Region</p>
                <a 
                  href="/balkon-konfigurator/" 
                  className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
                >
                  Partner finden
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* D) SECTION: Top-Themen */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Top-Themen
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Wissenswertes rund um Ihren Balkon
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              <a href="/genehmigung/" className="text-gray-300 hover:text-orange-400 transition-colors py-2">
                Genehmigung prüfen
              </a>
              <a href="/kalkulator/" className="text-gray-300 hover:text-orange-400 transition-colors py-2">
                Kosten berechnen
              </a>
              <a href="/foerderung/" className="text-gray-300 hover:text-orange-400 transition-colors py-2">
                Förderung beantragen
              </a>
              <a href="/baurecht-balkon/" className="text-gray-300 hover:text-orange-400 transition-colors py-2">
                Baurecht & Vorschriften
              </a>
              <a href="/bauzeit-planung/" className="text-gray-300 hover:text-orange-400 transition-colors py-2">
                Bauzeit planen
              </a>
              <a href="/ratgeber/" className="text-gray-300 hover:text-orange-400 transition-colors py-2">
                Balkon-Ratgeber
              </a>
              <a href="/lexikon/" className="text-gray-300 hover:text-orange-400 transition-colors py-2">
                Balkon-Lexikon
              </a>
              <a href="/blogs/post/balkonanbau-genehmigung-baurecht-2025" className="text-gray-300 hover:text-orange-400 transition-colors py-2">
                Genehmigung Leitfaden
              </a>
              <a href="/blogs/post/balkon-groesse-ohne-genehmigung" className="text-gray-300 hover:text-orange-400 transition-colors py-2">
                Balkongröße ohne Genehmigung
              </a>
            </div>
          </div>
        </section>

        {/* E) SECTION: Tools & Rechner */}
        <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Tools & Rechner
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Genehmigungscheck */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Genehmigungscheck</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  Prüfen Sie in nur 1 Minute, ob Sie eine Genehmigung für Ihr Balkon-Projekt benötigen.
                </p>
                <a 
                  href="/genehmigung/" 
                  className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
                >
                  Genehmigung prüfen
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* Kalkulator */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Balkon Kalkulator</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  Berechnen Sie die Kosten für Ihr Balkon-Projekt in nur 2 Minuten. Schnell, unverbindlich und präzise.
                </p>
                <a 
                  href="/kalkulator/" 
                  className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
                >
                  Kosten berechnen
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* 3D Konfigurator */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">3D Konfigurator</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  Erleben Sie Ihren zukünftigen Balkon in 3D. Visualisieren Sie verschiedene Varianten und finden Sie Ihre Wunschlösung.
                </p>
                <a 
                  href="/balkon-konfigurator/" 
                  className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
                >
                  In 3D planen
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* F) SECTION: Warum BalkonFuchs? */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Warum <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">BALKONFUCHS</span>?
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300">
                    <strong className="text-white">Geprüfte Partner:</strong> Nur qualifizierte und zertifizierte Partner in unserem Netzwerk
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300">
                    <strong className="text-white">Präzise Kalkulation:</strong> Berechnungen auf Basis aktueller Marktpreise und regionaler Besonderheiten
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300">
                    <strong className="text-white">Schnelle Umsetzung:</strong> Von der Idee bis zur Umsetzung in nur wenigen Wochen
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300">
                    <strong className="text-white">DSGVO konform:</strong> Ihre Daten sind sicher und geschützt
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300">
                    <strong className="text-white">Über 850 zufriedene Kunden:</strong> Vertrauen Sie auf unsere Erfahrung
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* G) FAQ SECTION */}
        <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Häufige Fragen zu <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Balkon-Projekten</span>
              </h2>
                </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-800 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-white pr-4">{faq.question}</h3>
                    <span className="text-orange-400 flex-shrink-0">
                      {openFaqIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 pb-4">
                      <div className="text-gray-300 leading-relaxed">
                        {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        
        {/* ZOHO Sales IQ Widget */}
        <ZohoSalesIQ />
      </div>
    </>
  );
};

export default StartseiteFarbtest;
