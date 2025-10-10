import React, { useState } from 'react';
import Head from 'next/head';
import { Newspaper, Sparkles, Clock, ArrowRight, Menu } from 'lucide-react';
import ZohoSalesIQ from '../components/ZohoSalesIQ.js';

export default function NewsComingSoon() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Header Component
  const Header = () => (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="/logos/balkonfuchs-logo.png" 
              alt="BALKONFUCHS Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          {/* Desktop Navigation */}
         <nav className="hidden md:flex space-x-8">
           <a href="/kalkulator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Kalkulator</a>
           <a href="/planer/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Planer</a>
           <a href="/express-angebot/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Angebot</a>
           <a href="/genehmigung/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Genehmigungscheck</a>
           <a href="/balkon-konfigurator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Konfigurator</a>
         </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="/partner-info-berlin/" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              Partner werden
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-3 space-y-3">
            <a href="/kalkulator/" className="block text-gray-300 font-medium">Kalkulator</a>
            <a href="/planer/" className="block text-gray-300 font-medium">Planer</a>
            <a href="/express-angebot/" className="block text-gray-300 font-medium">Angebot</a>
            <a href="/genehmigung/" className="block text-gray-300 font-medium">Genehmigungscheck</a>
            <a href="/balkon-konfigurator/" className="block text-gray-300 font-medium">Konfigurator</a>
            <a href="/partner-info-berlin/" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm mt-3 block text-center">
              Partner werden
            </a>
          </div>
        </div>
      )}
    </header>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 border-t border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <div>
            <div className="text-2xl font-bold text-orange-500 mb-4">🦊 BALKONFUCHS</div>
            <p className="text-gray-400 mb-4 leading-relaxed">Deutschlands führende Plattform für Balkon-Projekte. Über 850 zufriedene Kunden vertrauen uns.</p>
            <div className="flex space-x-4">
              <a href="mailto:post@balkonfuchs.de" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                <span className="text-white">📧</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Service</h4>
            <ul className="space-y-2">
              <li><a href="/kalkulator/" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Kalkulator</a></li>
              <li><a href="/planer/" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Planer</a></li>
              <li><a href="/express-angebot/" className="text-gray-400 hover:text-orange-400 transition-colors">Angebot</a></li>
              <li><a href="/genehmigung/" className="text-gray-400 hover:text-orange-400 transition-colors">Genehmigungscheck</a></li>
              <li><a href="/bauzeit-planung/" className="text-gray-400 hover:text-orange-400 transition-colors">Baustart Rechner</a></li>
              <li><a href="/balkon-konfigurator/" className="text-gray-400 hover:text-orange-400 transition-colors">Konfigurator</a></li>
              <li><a href="/erfahrungen/" className="text-gray-400 hover:text-orange-400 transition-colors">Erfahrungen</a></li>
              <li><a href="/galerie/" className="text-gray-400 hover:text-orange-400 transition-colors">Galerie</a></li>
            </ul>
          </div>
                        <div>
            <h4 className="text-lg font-semibold text-white mb-4">Wissen</h4>
            <ul className="space-y-2">
              <li><a href="/news/" className="text-gray-400 hover:text-orange-400 transition-colors">News</a></li>
              <li><a href="/foerderung/" className="text-gray-400 hover:text-orange-400 transition-colors">Förderung</a></li>
              <li><a href="/baurecht-balkon/" className="text-gray-400 hover:text-orange-400 transition-colors">Baurecht & Genehmigungen</a></li>
              <li><a href="/ratgeber/" className="text-gray-400 hover:text-orange-400 transition-colors">Ratgeber</a></li>
              <li><a href="/lexikon/" className="text-gray-400 hover:text-orange-400 transition-colors">Lexikon</a></li>
              <li><a href="/faq/" className="text-gray-400 hover:text-orange-400 transition-colors">FAQ</a></li>
              <li><a href="/feedback/" className="text-gray-400 hover:text-orange-400 transition-colors">Feedback</a></li>
            </ul>
              </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Unternehmen</h4>
            <ul className="space-y-2">
              <li><a href="/about/" className="text-gray-400 hover:text-orange-400 transition-colors">Über uns</a></li>
              <li><a href="/karriere/" className="text-gray-400 hover:text-orange-400 transition-colors">Karriere</a></li>
              <li><a href="/partner-werden/" className="text-gray-400 hover:text-orange-400 transition-colors">Partnerbewerbung</a></li>
              <li><a href="/partner-info-berlin/" className="text-gray-400 hover:text-orange-400 transition-colors">Partner Vorabinfos</a></li>
              <li><a href="/kontakt/" className="text-gray-400 hover:text-orange-400 transition-colors">Kontakt</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">© 2025 BALKONFUCHS GmbH. Alle Rechte vorbehalten.</p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <div className="flex items-center"><span className="text-orange-400 mr-2">🛡️</span><span>Geprüfte Partner</span></div>
              <div className="flex items-center"><span className="text-orange-400 mr-2">✅</span><span>DSGVO konform</span></div>
              <div className="flex items-center"><span className="text-orange-400 mr-2">⭐</span><span>4.8/5 Sterne</span></div>
                  <div className="flex space-x-4">
                    <a href="/impressum/" className="hover:text-orange-400 transition-colors">Impressum</a>
                    <a href="/datenschutz/" className="hover:text-orange-400 transition-colors">Datenschutz</a>
                    <a href="/agb/" className="hover:text-orange-400 transition-colors">AGB</a>
                    <a href="/disclaimer/" className="hover:text-orange-400 transition-colors">Disclaimer</a>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <>
      <Head>
        <title>Balkon-News - In Kürze verfügbar | BALKONFUCHS</title>
        <meta name="description" content="Unser News-Bereich wird aktuell aufgebaut und steht Ihnen in Kürze mit aktuellen Neuigkeiten rund um Balkonbau zur Verfügung." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://balkonfuchs.de/news/" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />
        
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Coming Soon Hero */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full mb-6 border border-green-500/30">
                <Newspaper className="w-12 h-12 text-green-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Balkon-News
              </h1>
              
              <div className="inline-block bg-orange-500/10 border border-orange-500/30 px-4 py-2 rounded-full mb-6">
                <div className="flex items-center gap-2 text-orange-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-semibold">Bald verfügbar</span>
                </div>
              </div>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
                Wir bauen aktuell unseren <span className="text-orange-400 font-semibold">News-Bereich</span> auf, 
                um Sie regelmäßig über Neuigkeiten rund um Balkonbau, Trends, Förderungen und gesetzliche 
                Änderungen zu informieren. Der News-Bereich wird in den kommenden Wochen online gehen.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Kurzfristig geplant</h3>
                    <p className="text-gray-400 leading-relaxed">
                      In den nächsten Wochen starten wir mit regelmäßigen Updates zu Balkonbau-Themen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Newspaper className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Aktuelle Themen</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Trends, Förderungen, Rechtsänderungen und Expertentipps rund um Ihren Balkon.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Options */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                Nutzen Sie in der Zwischenzeit:
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <a href="/ratgeber/" className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all group">
                  <div className="text-3xl mb-3">📖</div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    Balkon-Ratgeber
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Umfassende Informationen
                  </p>
                  <div className="mt-4 flex items-center text-orange-400 text-sm font-medium">
                    Mehr erfahren <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </a>

                <a href="/faq/" className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all group">
                  <div className="text-3xl mb-3">❓</div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    FAQ
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Häufige Fragen & Antworten
                  </p>
                  <div className="mt-4 flex items-center text-orange-400 text-sm font-medium">
                    FAQ lesen <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </a>

                <a href="/erfahrungen/" className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all group">
                  <div className="text-3xl mb-3">⭐</div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    Erfahrungen
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Echte Kundenmeinungen
                  </p>
                  <div className="mt-4 flex items-center text-orange-400 text-sm font-medium">
                    Bewertungen lesen <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Option */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-3">
                Bleiben Sie auf dem Laufenden
              </h3>
              <p className="text-gray-400 mb-6">
                Chatten Sie mit uns – wir informieren Sie gerne, sobald der News-Bereich startet!
              </p>
              <button 
                onClick={() => {
                  if (window.$zoho && window.$zoho.salesiq) {
                    window.$zoho.salesiq.floatwindow.visible('show');
                  }
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <span className="text-2xl">💬</span>
                Jetzt Live-Chat starten
              </button>
            </div>
          </div>
        </main>

        <Footer />
        
        {/* ZOHO Sales IQ Chat Widget */}
        <ZohoSalesIQ />
      </div>
    </>
  );
}

