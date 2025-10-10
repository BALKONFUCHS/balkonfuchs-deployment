import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Building, Users, Globe, Award, Heart, Lightbulb, Target, CheckCircle, Star, Shield, Mail } from 'lucide-react';
import dynamic from 'next/dynamic';
const ZohoSalesIQ = dynamic(() => import('../components/ZohoSalesIQ.js'), { ssr: false });

const About = () => {
  return (
    <>
      <Head>
        <title>Über uns - BALKONFUCHS GmbH | Deutschlands führende Balkon-Plattform</title>
        <meta name="description" content="Lernen Sie BALKONFUCHS kennen - Deutschlands führende Plattform für Balkon-Projekte. Über 850 zufriedene Kunden vertrauen uns bei der Realisierung ihrer Balkon-Träume." />
        <meta name="keywords" content="BALKONFUCHS, über uns, unternehmen, mission, balkon plattform, deutschland" />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Über uns - BALKONFUCHS GmbH | Deutschlands führende Balkon-Plattform" />
        <meta property="og:description" content="Lernen Sie BALKONFUCHS kennen - Deutschlands führende Plattform für Balkon-Projekte mit über 850 zufriedenen Kunden." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/about" />
        <link rel="canonical" href="https://balkonfuchs.de/about" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <a href="/" className="flex items-center">
                  <img 
                    src="/images/Balkonfuchs-Logo_white.png" 
                    alt="BALKONFUCHS Logo" 
                    className="h-10 w-auto"
                  />
                </a>
              </div>
              
              <nav className="hidden md:flex space-x-8">
                <a href="/kalkulator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Kalkulator</a>
                <a href="/planer/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Planer</a>
                <a href="/bauzeit-planung/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Bauzeit-Planung</a>
                <a href="/express-angebot/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Express-Angebot</a>
                <a href="/genehmigung/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Genehmigungscheck</a>
              </nav>

              <div className="hidden md:flex items-center space-x-4">
                <a href="/kalkulator/" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                  Jetzt kalkulieren
                </a>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button id="mobile-menu-button" className="text-gray-300 hover:text-orange-500 focus:outline-none focus:text-orange-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            <div id="mobile-menu" className="md:hidden bg-gray-900 border-t border-gray-800 hidden">
              <div className="px-4 py-3 space-y-3">
                <a href="/kalkulator/" className="block text-gray-300 font-medium">Kalkulator</a>
                <a href="/planer/" className="block text-gray-300 font-medium">Planer</a>
                <a href="/bauzeit-planung/" className="block text-gray-300 font-medium">Bauzeit-Planung</a>
                <a href="/express-angebot/" className="block text-gray-300 font-medium">Express-Angebot</a>
                <a href="/genehmigung/" className="block text-gray-300 font-medium">Genehmigungscheck</a>
                <a href="/kalkulator/" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm mt-3 block text-center">
                  Jetzt kalkulieren
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
              <h1 className="text-4xl font-bold text-white mb-8">Über BALKONFUCHS</h1>
              <p className="text-gray-300 mb-6">Stand: Januar 2025</p>

              {/* Hero Section */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6 mb-8">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">🎯</span>
                    <h2 className="text-2xl font-bold text-white">Unsere Mission</h2>
                  </div>
                  <p className="text-gray-200 text-lg leading-relaxed">
                    <strong className="text-orange-400">BALKONFUCHS</strong> ist eine innovative Plattform für Balkon-Projekte. 
                    Wir verbinden Bauherren mit qualifizierten Partnern und helfen dabei, 
                    <strong className="text-orange-400"> Balkon-Träume in die Realität umzusetzen</strong>.
                  </p>
                </div>
              </section>

              {/* Persönliches Storytelling */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">BALKONFUCHS - Neue Plattform, bewährte Expertise</h2>
                
                {/* Foto von Martin Beyer */}
                <div className="mb-8 text-center">
                  <div className="inline-block bg-gray-700/50 rounded-xl p-6">
                    <img 
                      src="/images/Martin Beyer (1).png" 
                      alt="Martin Beyer - Gründer von BALKONFUCHS" 
                      className="w-48 h-48 object-cover rounded-full mx-auto mb-4 border-4 border-orange-400"
                    />
                    <h3 className="text-xl font-semibold text-white mb-2">Dipl.-Ing. (FH) Martin Beyer</h3>
                    <p className="text-gray-300">Gründer und Geschäftsführer von BALKONFUCHS</p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-xl p-8 mb-8">
                  <p className="text-gray-200 text-lg leading-relaxed mb-6">
                    Ich bin <strong className="text-orange-400">Martin Beyer</strong>, Diplom-Ingenieur mit über 30 Jahren Erfahrung im Bauwesen – von der Planung bis zur Qualitätssicherung. Mit BALKONFUCHS habe ich eine Plattform geschaffen, die Menschen mit Balkonprojekten und qualifizierte Handwerksbetriebe aus ihrer Region zusammenbringt.
                  </p>
                  
                  <p className="text-gray-200 text-lg leading-relaxed mb-6">
                    Unser Ziel: regionale Handwerksstrukturen stärken, gute Arbeit sichtbar machen und die Zusammenarbeit zwischen Kunden und Betrieben einfacher und transparenter gestalten.
                  </p>
                  
                  <p className="text-gray-200 text-lg leading-relaxed mb-6">
                    Meine Mission: <strong className="text-orange-400">Schluss mit abenteuerlichen Preisen.</strong> Hier gibt's ehrliche Kalkulationen und geprüfte Betriebe – nicht mehr, nicht weniger.
                  </p>
                </div>
              </section>

              {/* Unsere Geschichte */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">📖 Unsere Geschichte: Ehrlichkeit im Balkonbau</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-700/30 rounded-lg p-6">
                    <p className="text-gray-200 leading-relaxed">
                      Meine Reise im Bausektor begann <strong className="text-orange-400">1992</strong>. Über viele Stationen – mit eigenen Planungsbüros, als Gutachter für die Qualitätssicherung am Bau und im Bereich modulares Bauen – habe ich gelernt, wie wichtig fundierte Grundlagen sind. Sie sind neben dem Preis ein entscheidendes Kriterium für eine so wichtige Entscheidung wie ein Bauprojekt.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-6">
                    <p className="text-gray-200 leading-relaxed">
                      <strong className="text-orange-400">2018</strong> habe ich BALKONFUCHS mitgegründet, um Vertrieb, Marketing, Digitalisierung und modulare Bauelemente miteinander zu verbinden. Anfangs haben wir Produkte komplett neu entwickelt, oft mit der Herausforderung und der Aussage im Hintergrund: "Das klappt doch nie." Doch unterm Strich: tatsächlich ja.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-6">
                    <p className="text-gray-200 leading-relaxed">
                      Corona und ein persönlicher Schicksalsschlag haben vieles verändert und mich dazu gebracht, viele Dinge zu hinterfragen. BALKONFUCHS kam für eine Zeit zur Ruhe. Doch die vielen, vielen Nachfragen von Besuchern haben mich überzeugt, mein Wissen nicht für mich zu behalten, sondern allen Interessierten die bestmögliche Lösung für ihr neues Balkonbau-Projekt zu liefern.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
                    <p className="text-gray-200 leading-relaxed mb-4">
                      Was mich persönlich immer abschreckt, sind die zum Teil sehr abenteuerlichen Zahlen, die man bezüglich Preise im Internet aufrufen kann. Da werden Balkone für <strong className="text-orange-400">650 bis 700 Euro pro Quadratmeter</strong> als "Alles-Draußen-Preis" angeboten. Die Wahrheit sieht für den Kunden final oft ganz anders aus, und für ein solches Projekt wird ab und an auch eine Finanzierung benötigt. Das hat mich dazu bewogen, einmal Klartext zu reden.
                    </p>
                    
                    <p className="text-gray-200 leading-relaxed mb-4">
                      So ist auch der <strong className="text-orange-400">Balkonbau-Kalkulator</strong> entstanden. Vielleicht werden Sie sich wundern, wie hoch die Zahlen doch vielleicht auch sind. Aber das ist das, womit Sie rechnen können. Leider, aber auch ehrlich. Ich habe lange an einem regionalen Faktor gebrütet, mit dem wir die unterschiedliche Belastung zwischen ländlichen Gebieten in Mecklenburg-Vorpommern und absolut städtischen Zonen mitten in München integrieren können. Das Ergebnis kann sich sehen lassen.
                    </p>
                    
                    <p className="text-gray-200 leading-relaxed">
                      Insofern bieten wir Ihnen hier einen tollen Service mit ganz vielen Tools und haben es uns zur Aufgabe gemacht, Ihnen geprüfte Handwerker für Ihr Balkonbau-Projekt an die Hand zu geben. Das ist, was wir tun. Und wenn das für Sie eine vertrauensvolle Lösung darstellt, dann freuen wir uns über Ihre Anfrage.
                    </p>
                  </div>
                  
                  <div className="text-center bg-gray-700/50 rounded-lg p-6">
                    <p className="text-gray-200 text-lg font-medium">
                      Ihr Martin Beyer
                    </p>
                    <p className="text-orange-400 font-semibold">
                      Dipl.-Ing. (FH)
                    </p>
                  </div>
                </div>
              </section>


              {/* Unsere Werte */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Unsere Werte</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-700/30 rounded-lg p-4 border-l-4 border-orange-400">
                    <h3 className="text-lg font-semibold text-white mb-2">🤝 Vertrauen & Transparenz</h3>
                    <p className="text-gray-300">
                      Wir bauen auf ehrliche Kommunikation und transparente Prozesse. 
                      Unsere Kunden wissen immer, was sie erwartet.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-4 border-l-4 border-orange-400">
                    <h3 className="text-lg font-semibold text-white mb-2">⭐ Qualität & Zuverlässigkeit</h3>
                    <p className="text-gray-300">
                      Nur die besten Partner gehören zu unserem Netzwerk. 
                      Wir garantieren höchste Qualitätsstandards.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-4 border-l-4 border-orange-400">
                    <h3 className="text-lg font-semibold text-white mb-2">💡 Innovation & Fortschritt</h3>
                    <p className="text-gray-300">
                      Wir setzen auf moderne Technologien und innovative Lösungen 
                      für die besten Ergebnisse.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-4 border-l-4 border-orange-400">
                    <h3 className="text-lg font-semibold text-white mb-2">❤️ Kundenzufriedenheit</h3>
                    <p className="text-gray-300">
                      Die Zufriedenheit unserer Kunden steht an erster Stelle. 
                      Wir gehen den extra Weg für perfekte Ergebnisse.
                    </p>
                  </div>
                </div>
              </section>

              {/* Was macht uns einzigartig */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Was macht uns einzigartig?</h2>
                <div className="space-y-4">
                  <div className="bg-gray-700/30 rounded-lg p-4 border-l-4 border-blue-400">
                    <h3 className="text-lg font-semibold text-white mb-2">🔍 Intelligente Partnervermittlung</h3>
                    <p className="text-gray-300">
                      Unser Algorithmus wählt basierend auf Projektanforderungen, Standort und Budget 
                      die optimalen Partner aus.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-4 border-l-4 border-blue-400">
                    <h3 className="text-lg font-semibold text-white mb-2">📊 Umfassende Qualitätskontrolle</h3>
                    <p className="text-gray-300">
                      Alle Partner durchlaufen ein strenges Auswahlverfahren und werden 
                      kontinuierlich bewertet.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-4 border-l-4 border-blue-400">
                    <h3 className="text-lg font-semibold text-white mb-2">💰 Kostenlose Vermittlung</h3>
                    <p className="text-gray-300">
                      Für Kunden ist unsere Dienstleistung komplett kostenlos. 
                      Wir verdienen nur über unsere Partner.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-4 border-l-4 border-blue-400">
                    <h3 className="text-lg font-semibold text-white mb-2">📱 Moderne digitale Tools</h3>
                    <p className="text-gray-300">
                      Von Kalkulatoren bis zur Projektplanung - wir bieten innovative 
                      digitale Lösungen für alle Projektphasen.
                    </p>
                  </div>
                </div>
              </section>

              {/* Zahlen & Fakten */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Zahlen & Fakten</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center bg-gray-700/50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-orange-400 mb-2">850+</div>
                    <div className="text-gray-300">Zufriedene Kunden</div>
                  </div>
                  
                  <div className="text-center bg-gray-700/50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-orange-400 mb-2">85+</div>
                    <div className="text-gray-300">Qualifizierte Partner</div>
                  </div>
                  
                  <div className="text-center bg-gray-700/50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-orange-400 mb-2">4.8/5</div>
                    <div className="text-gray-300">Kundenbewertung</div>
                  </div>
                  
                  <div className="text-center bg-gray-700/50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-orange-400 mb-2">98%</div>
                    <div className="text-gray-300">Weiterempfehlung</div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-2xl font-bold text-orange-500 mb-4">🦊 BALKONFUCHS</div>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Eine innovative Plattform für Balkon-Projekte. Über 850 zufriedene Kunden vertrauen uns.
                </p>
                <div className="flex space-x-4">
                  <a href="mailto:post@balkonfuchs.de" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                    <Mail className="w-5 h-5 text-white" />
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
                  <li><a href="/bauzeit-planung/" className="text-gray-400 hover:text-orange-400 transition-colors">Bauzeit-Planung</a></li>
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
                    <Shield className="w-4 h-4 mr-2 text-orange-400" />
                    <span>Geprüfte Partner</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-orange-400" />
                    <span>DSGVO konform</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-orange-400 fill-current" />
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

      {/* Mobile menu JavaScript */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (mobileMenuButton && mobileMenu) {
              mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
              });
            }
          });
        `
      }} />
      
      {/* ZOHO Sales IQ Widget */}
      <ZohoSalesIQ />
    </>
  );
};

export default About;