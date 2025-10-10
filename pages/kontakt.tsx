import React from 'react';
import Head from 'next/head';
import { ArrowLeft, Home, Mail, MessageCircle, Clock, MapPin, Users, Shield, CheckCircle, Star } from 'lucide-react';

const Kontakt = () => {
  return (
    <>
      <Head>
        <title>Kontakt - BALKONFUCHS GmbH | Sprechen Sie mit uns</title>
        <meta name="description" content="Kontaktieren Sie BALKONFUCHS für Fragen zu Ihrem Balkon-Projekt. Wir sind per E-Mail und Chat für Sie da und helfen Ihnen gerne weiter." />
        <meta name="keywords" content="kontakt, BALKONFUCHS, balkon projekte, beratung, e-mail, chat" />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Kontakt - BALKONFUCHS GmbH | Sprechen Sie mit uns" />
        <meta property="og:description" content="Kontaktieren Sie BALKONFUCHS für Fragen zu Ihrem Balkon-Projekt. Wir sind per E-Mail und Chat für Sie da." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/kontakt" />
        <link rel="canonical" href="https://balkonfuchs.de/kontakt" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <a href="/" className="flex items-center">
                  <img 
                    src="/images/Balkonfuchs-Logo_white.png" 
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
              <a href="/" className="inline-flex items-center text-gray-400 hover:text-orange-400 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zur Startseite
              </a>
            </div>

            {/* Content */}
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8">
              <h1 className="text-4xl font-bold text-white mb-8">Kontakt</h1>
              <p className="text-gray-300 mb-6">Stand: Januar 2025</p>

              {/* Hero Section */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6 mb-8">
                  <div className="flex items-center mb-4">
                    <MessageCircle className="w-8 h-8 text-orange-400 mr-3" />
                    <h2 className="text-2xl font-bold text-white">Sprechen Sie mit uns</h2>
                  </div>
                  <p className="text-gray-200 text-lg leading-relaxed">
                    Haben Sie Fragen zu Ihrem <strong className="text-orange-400">Balkon-Projekt</strong>? 
                    Wir sind für Sie da und helfen Ihnen gerne weiter. 
                    Kontaktieren Sie uns per <strong className="text-orange-400">E-Mail</strong> oder 
                    nutzen Sie unseren <strong className="text-orange-400">Chat</strong>.
                  </p>
                </div>
              </section>

              {/* Kontaktmöglichkeiten */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Wie können Sie uns erreichen?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-700/50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <Mail className="w-6 h-6 text-orange-400 mr-3" />
                      <h3 className="text-xl font-semibold text-white">E-Mail-Kontakt</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Für allgemeine Anfragen und Partner-Anfragen erreichen Sie uns per E-Mail.
                    </p>
                    <div className="space-y-2">
                      <p className="text-gray-200">
                        <strong className="text-orange-400">Allgemeine Anfragen:</strong><br />
                        <a href="mailto:post@balkonfuchs.de" className="text-blue-400 hover:text-blue-300 underline">
                          post@balkonfuchs.de
                        </a>
                      </p>
                      <p className="text-gray-200">
                        <strong className="text-orange-400">Partner werden:</strong><br />
                        <a href="mailto:partner@balkonfuchs.de" className="text-blue-400 hover:text-blue-300 underline">
                          partner@balkonfuchs.de
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <MessageCircle className="w-6 h-6 text-orange-400 mr-3" />
                      <h3 className="text-xl font-semibold text-white">Chat</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Chat-Anfragen können jederzeit gestellt werden und werden in der Regel 
                      innerhalb von 24 Stunden an Werktagen beantwortet.
                    </p>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-blue-400 font-semibold mb-2">💬 Chat verfügbar</p>
                      <p className="text-gray-300 text-sm">
                        Chat ist rund um die Uhr verfügbar, Antworten innerhalb von 24 Stunden an Werktagen.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Wichtiger Hinweis */}
              <section className="mb-8">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">ℹ️ Wichtiger Hinweis</h2>
                  <p className="text-gray-200 leading-relaxed">
                    <strong className="text-orange-400">BALKONFUCHS ist eine Vermittlungsplattform.</strong> 
                    Wir bieten keine individuelle telefonische oder E-Mail-Beratung für Balkon-Projekte an. 
                    Nutzen Sie stattdessen unsere digitalen Tools wie den Kalkulator, Planer oder Genehmigungscheck. 
                    Für Unternehmen, die Partner werden möchten, stehen wir gerne zur Verfügung.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer - Exakt aus HTML-Vorlage */}
        <footer className="bg-gray-900 border-t border-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-2xl font-bold text-orange-500 mb-4">🦊 BALKONFUCHS</div>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Deutschlands führende Plattform für Balkon-Projekte. Über 850 zufriedene Kunden vertrauen uns.
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
                  <li><a href="/kalkulator/" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Kalkulator</a></li>
                  <li><a href="/planer/" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Planer</a></li>
                  <li><a href="/express-angebot/" className="text-gray-400 hover:text-orange-400 transition-colors">Express-Angebot</a></li>
                  <li><a href="/genehmigung/" className="text-gray-400 hover:text-orange-400 transition-colors">Genehmigungscheck</a></li>
                  <li><a href="/bauzeit-planung/" className="text-gray-400 hover:text-orange-400 transition-colors">Baustart Rechner</a></li>
                  <li><a href="/erfahrungen/" className="text-gray-400 hover:text-orange-400 transition-colors">Erfahrungen</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Wissen</h4>
                <ul className="space-y-2">
                  <li><a href="/ratgeber/" className="text-gray-400 hover:text-orange-400 transition-colors">Ratgeber</a></li>
                  <li><a href="/lexikon/" className="text-gray-400 hover:text-orange-400 transition-colors">Lexikon</a></li>
                  <li><a href="/foerderung/" className="text-gray-400 hover:text-orange-400 transition-colors">Förderung</a></li>
                  <li><a href="/baurecht-balkon/" className="text-gray-400 hover:text-orange-400 transition-colors">Baurecht & Genehmigungen</a></li>
                  <li><a href="/feedback/" className="text-gray-400 hover:text-orange-400 transition-colors">Feedback geben</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Unternehmen</h4>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-gray-400 hover:text-orange-400 transition-colors">Über uns</a></li>
                  <li><a href="/karriere" className="text-gray-400 hover:text-orange-400 transition-colors">Karriere</a></li>
                  <li><a href="partner-werden" className="text-gray-400 hover:text-orange-400 transition-colors">Partnerbewerbung</a></li>
                  <li><a href="/partner-info-berlin/" className="text-gray-400 hover:text-orange-400 transition-colors">Partner Vorabinfos</a></li>
                  <li><a href="/kontakt/" className="text-gray-400 hover:text-orange-400 transition-colors">Kontakt</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-400 text-sm">© 2025 BALKONFUCHS GmbH. Alle Rechte vorbehalten.</p>
                <div className="flex space-x-6 text-sm text-gray-400">
                  <div className="flex items-center">
                    <span className="text-orange-400 mr-2">🛡️</span>
                    <span>Geprüfte Partner</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-orange-400 mr-2">✅</span>
                    <span>DSGVO konform</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-orange-400 mr-2">⭐</span>
                    <span>4.8/5 Sterne</span>
                  </div>
                  <div className="flex space-x-4">
                    <a href="/impressum" className="hover:text-orange-400 transition-colors">Impressum</a>
                    <a href="/datenschutz/" className="hover:text-orange-400 transition-colors">Datenschutz</a>
                    <a href="/agb" className="hover:text-orange-400 transition-colors">AGB</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Kontakt;
