import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ZohoSalesIQ from '../components/ZohoSalesIQ.js';

export default function VorteilePartner() {
  return (
    <>
      <Head>
        <title>Balkonbau Partner Vorteile 2025 | 5-8x ROI | Qualifizierte Leads | BALKONFUCHS</title>
        <meta name="description" content="✅ Werden Sie Balkonbau Partner ✅ 5-8x ROI garantiert ✅ Qualifizierte Leads ab 599€/Monat ✅ Regional optimiert ✅ Jetzt kostenlos testen bis Jahresende!" />
        <meta name="keywords" content="balkonbau partner werden, balkonbau leads, handwerker partner, balkonbau partner 2025, balkonbau leads deutschland" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://balkonfuchs.de/vorteile-partner" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white funnel-partner">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <div className="text-2xl font-bold text-orange-500">🦊 BALKONFUCHS</div>
                </Link>
              </div>
              
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Startseite</Link>
                <Link href="/kalkulator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Kalkulator</Link>
                <Link href="/planer/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Planer</Link>
                <Link href="/express-angebot/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Express-Angebot</Link>
                <Link href="/genehmigung/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Genehmigungscheck</Link>
                <Link href="/bauzeit-planung/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Bauzeit-Planung</Link>
              </nav>
              
              <div className="hidden md:flex items-center space-x-4">
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb Navigation */}
        <section className="bg-gray-800 border-b border-gray-700 py-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-orange-400 transition-colors">Startseite</Link>
              <span>→</span>
              <span className="text-orange-400">Balkonbau Partner werden</span>
            </nav>
          </div>
        </section>

        {/* Main Content */}
        <main className="py-16 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back to Home */}
            <div className="mb-8">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Zur Startseite
              </Link>
            </div>

            {/* Hero Section */}
            <section className="text-center mb-16">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-8 inline-block">
                <p className="text-orange-400 font-semibold">⭐ >850 glückliche Balkonkunden</p>
              </div>
              <h1 className="text-5xl font-bold text-white mb-6">
                <span className="text-orange-400">Balkonbau Partner</span> werden
              </h1>
              <div className="text-xl text-gray-200 max-w-4xl mx-auto mb-8 space-y-2">
                <p>Verdienen Sie das <span className="text-orange-400 font-bold">5-8 fache</span> Ihres Investments</p>
                <p>Qualifizierte <span className="text-orange-400 font-bold">Balkonbau-Leads</span> ab <span className="text-orange-400 font-bold">599€/Monat</span> - regional angepasst</p>
                <p><span className="text-green-400 font-bold">Jetzt kostenfrei bis Jahresende testen</span></p>
              </div>
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="flex items-center text-gray-200">
                  <span className="text-orange-400 mr-2">🛡️</span>
                  <span>Geprüfte Balkonbau Partner</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <span className="text-orange-400 mr-2">✅</span>
                  <span>DSGVO konform</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <span className="text-orange-400 mr-2">⏱️</span>
                  <span>In 2 Min. fertig</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <span className="text-orange-400 mr-2">👥</span>
                  <span>85+ Balkonbau Partner</span>
                </div>
              </div>
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                📧 Kostenlosen Balkonbau Partner Erfolgs-Leitfaden erhalten
              </button>
            </section>

            {/* Benefits Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Warum Balkonbau Partner werden?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 hover:border-teal-500/50 transition-all duration-300 cursor-pointer group h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">Nachgewiesene ROI-Rendite von 500-750%</h3>
                  <p className="text-gray-200 mb-6 leading-relaxed">Jeder Euro wird zu <span className="text-orange-400 font-semibold">5-8 Euro Gewinn</span>. Bereits nach dem ersten Projekt sind Sie im Plus.</p>
                  <div className="flex justify-between items-center">
                    <div className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-sm font-medium border border-orange-500/20">⚡ Nachgewiesen</div>
                    <div className="text-orange-400 font-semibold group-hover:text-orange-300 transition-colors">→</div>
                  </div>
                </div>
                
                <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 hover:border-teal-500/50 transition-all duration-300 cursor-pointer group h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">📍</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">Regional optimierte Preise</h3>
                  <p className="text-gray-200 mb-6 leading-relaxed">Faire Preise basierend auf Ihren lokalen Marktbedingungen - von <span className="text-orange-400 font-semibold">479€ bis 2.749€/Monat</span>.</p>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-sm font-medium border border-orange-500/20">⚡ Optimiert</div>
                    <div className="text-orange-400 font-semibold group-hover:text-orange-300 transition-colors">→</div>
                  </div>
                </div>
                
                <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 hover:border-teal-500/50 transition-all duration-300 cursor-pointer group h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">100% Balkonbau-spezialisierte Leads</h3>
                  <p className="text-gray-200 mb-6 leading-relaxed">Keine Zeitverschwender. Jeder Lead will wirklich einen Balkonbau - <span className="text-orange-400 font-semibold">konkrete Kaufabsicht versprochen</span>.</p>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-sm font-medium border border-orange-500/20">⚡ Qualifiziert</div>
                    <div className="text-orange-400 font-semibold group-hover:text-orange-300 transition-colors">→</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Projekt des Monats Section */}
            <section className="mb-16">
              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white text-center mb-8">🏆 Projekt des Monats - Auszeichnung</h2>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🏗️</span>
                  </div>
                  <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                    Besondere Balkonbau-Projekte werden als <span className="text-yellow-400 font-semibold">"Projekt des Monats"</span> ausgezeichnet und 
                    auf unserer Plattform präsentiert. Ihr Partner wird dabei als Umsetzungspartner erwähnt - 
                    <span className="text-green-400 font-semibold">ohne direkte Konkurrenz</span> zu anderen Partnern.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">✅ Vorteile für Partner:</h3>
                      <ul className="text-gray-200 text-sm space-y-2">
                        <li>• Erwähnung als Umsetzungspartner</li>
                        <li>• Professionelle Projektpräsentation</li>
                        <li>• Keine direkte Konkurrenz</li>
                        <li>• Fokus auf Projektergebnisse</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">🎯 Vorteile für Kunden:</h3>
                      <ul className="text-gray-200 text-sm space-y-2">
                        <li>• Echte Projektreferenzen</li>
                        <li>• Konkrete Lösungsbeispiele</li>
                        <li>• Regionale Vielfalt</li>
                        <li>• Objektive Bewertungen</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/20 inline-block mt-6">
                    ⚡ Win-Win für Partner und Kunden
                  </div>
                </div>
              </div>
            </section>

            {/* Partner-spezifische Informationen */}
            <section className="mb-16">
              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white text-center mb-8">🤝 Partner werden</h2>
                <div className="text-center">
                  <p className="text-gray-300 text-lg mb-6">
                    Werden Sie Teil des BALKONFUCHS Netzwerks und profitieren Sie von unserem bewährten System.
                  </p>
                  <Link href="/partner-info-berlin/" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all hover:scale-105">
                    🚀 Jetzt Partner werden
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-2xl font-bold mb-4 text-orange-500">🦊 BALKONFUCHS</div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Deutschlands führende Plattform für Balkonbau-Projekte. Über 850 zufriedene Balkonbau-Kunden vertrauen uns.
                </p>
                <div className="flex space-x-4">
                  <a href="mailto:post@balkonfuchs.de" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                    <span className="text-white">📧</span>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Service</h4>
                <ul className="space-y-2">
                  <li><Link href="/kalkulator/" className="text-gray-300 hover:text-orange-400 transition-colors">Kalkulator</Link></li>
                  <li><Link href="/planer/" className="text-gray-300 hover:text-orange-400 transition-colors">Planer</Link></li>
                  <li><Link href="/express-angebot/" className="text-gray-300 hover:text-orange-400 transition-colors">Express-Angebot</Link></li>
                  <li><Link href="/genehmigung/" className="text-gray-300 hover:text-orange-400 transition-colors">Genehmigungscheck</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Wissen</h4>
                <ul className="space-y-2">
                  <li><Link href="/ratgeber/" className="text-gray-300 hover:text-orange-400 transition-colors">Ratgeber</Link></li>
                  <li><Link href="/lexikon/" className="text-gray-300 hover:text-orange-400 transition-colors">Lexikon</Link></li>
                  <li><Link href="/foerderung/" className="text-gray-300 hover:text-orange-400 transition-colors">Förderung</Link></li>
                  <li><Link href="/baurecht-balkon/" className="text-gray-300 hover:text-orange-400 transition-colors">Baurecht & Genehmigungen</Link></li>
                  <li><Link href="/feedback/" className="text-gray-300 hover:text-orange-400 transition-colors">Feedback geben</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Unternehmen</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-300 hover:text-orange-400 transition-colors">Über uns</Link></li>
                  <li><Link href="/karriere" className="text-gray-300 hover:text-orange-400 transition-colors">Karriere</Link></li>
                  <li><Link href="partner-werden" className="text-gray-300 hover:text-orange-400 transition-colors">Partnerbewerbung</Link></li>
                  <li><Link href="/vorteile-partner" className="text-orange-400 transition-colors">Vorteile Balkonpartner</Link></li>
                  <li><Link href="/kontakt/" className="text-gray-300 hover:text-orange-400 transition-colors">Kontakt</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-300 text-sm">
                  © 2025 BALKONFUCHS GmbH. Alle Rechte vorbehalten.
                </p>
                <div className="flex space-x-6 text-sm text-gray-300">
                  <div className="flex items-center">
                    <span className="text-orange-400 mr-2">🛡️</span>
                    <span>Geprüfte Balkonbau Partner</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-orange-400 mr-2">✅</span>
                    <span>DSGVO konform</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-orange-400 mr-2">⭐</span>
                    <span>>850 glückliche Balkonkunden</span>
                  </div>
                  <div className="flex space-x-4">
                    <Link href="/impressum" className="hover:text-orange-400 transition-colors">Impressum</Link>
                    <Link href="/datenschutz/" className="hover:text-orange-400 transition-colors">Datenschutz</Link>
                    <Link href="/agb" className="hover:text-orange-400 transition-colors">AGB</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      
      {/* ZOHO Sales IQ Widget */}
      <ZohoSalesIQ />
    </>
  );
}
