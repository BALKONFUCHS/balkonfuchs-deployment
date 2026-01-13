import React from 'react';
import Head from 'next/head';
import { ArrowLeft, Home, Phone, Mail, Globe, Building, Shield, CheckCircle, Star } from 'lucide-react';

const Impressum = () => {
  return (
    <>
      <Head>
        <title>Impressum - BALKONFUCHS GmbH</title>
        <meta name="description" content="Impressum der BALKONFUCHS GmbH - Angaben gemäß § 5 TMG, Kontaktdaten, Geschäftsführer und rechtliche Hinweise" />
        <meta name="keywords" content="impressum, BALKONFUCHS, rechtliche hinweise, kontakt, geschäftsführer" />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Impressum - BALKONFUCHS GmbH" />
        <meta property="og:description" content="Impressum der BALKONFUCHS GmbH - Angaben gemäß § 5 TMG, Kontaktdaten, Geschäftsführer und rechtliche Hinweise" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/impressum" />
        <link rel="canonical" href="https://balkonfuchs.de/impressum" />
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
              <h1 className="text-4xl font-bold text-white mb-8">Impressum – BALKONFUCHS GmbH</h1>
              <p className="text-gray-300 mb-6">Stand: August 2025</p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Angaben gemäß § 5 TMG</h2>
                <div className="space-y-4 text-gray-200">
                  <div>
                    <strong className="text-orange-400">Herausgeber:</strong><br />
                    BALKONFUCHS GmbH (Beratungs‑, Handels‑ und Vertriebsgesellschaft für Balkon‑ und Terrassenprodukte)<br />
                    Adelberostraße 16, 36100 Petersberg<br />
                    Telefon: +49 (661) 380 276 26 · E‑Mail: post(at)balkonfuchs.de<br />
                    Website: <a href="https://www.balkonfuchs.de" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">https://www.balkonfuchs.de</a>
                  </div>
                  
                  <div>
                    <strong className="text-orange-400">Registereintrag:</strong><br />
                    Handelsregister Fulda HRB 7335<br />
                    Geschäftsführer: Dipl.-Ing. (FH) Martin Beyer
                  </div>
                  
                  <div>
                    <strong className="text-orange-400">Steuern:</strong><br />
                    Finanzamt Fulda · Steuernummer: 018 229 04286 · USt‑IdNr: DE 319233966
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Verantwortlich für Hosting & Programmierung</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                  <li><strong className="text-orange-400">Hosting:</strong> BALKONFUCHS GmbH</li>
                  <li><strong className="text-orange-400">Webseitengestaltung:</strong> erstellt mit Zoho Sites</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Rechtliche Hinweise</h2>
                <p className="text-gray-200 leading-relaxed">
                  Die BALKONFUCHS GmbH bemüht sich um Aktualität der Inhalte, übernimmt jedoch keine Haftung für Vollständigkeit oder Richtigkeit. 
                  Sie behält sich Änderungen vor und ist nicht verantwortlich für verlinkte fremde Inhalte. Urheberrechtlich geschützte Inhalte (Texte, Bilder, Grafiken) dürfen nur mit Zustimmung genutzt werden.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Geschäftsbereich & Dienstleistungen</h2>
                <p className="text-gray-200 leading-relaxed">
                  Die BALKONFUCHS GmbH bietet unabhängige Beratung und Vermittlung im Bereich Balkon- und Terrassenlösungen. 
                  Sie begleitet Kunden von der Bestandsaufnahme über die Vermittlung geeigneter Partner für Planung und Umsetzung und ergänzt diese Leistungen durch ein qualifiziertes Partnernetzwerk über <strong className="text-orange-400">balkonscout24</strong>.<br />
                  <strong className="text-orange-400">Planungsleistungen werden nicht durch die BALKONFUCHS GmbH selbst durchgeführt, sondern ausschließlich durch entsprechende Partnerunternehmen erbracht.</strong><br />
                  Richtpreise (z. B. aus Konfiguratoren) sind unverbindlich.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Bildrechte & Visualisierungen</h2>
                <div className="space-y-3 text-gray-200">
                  <p>Bilder ohne expliziten Credit sind Eigentum der BALKONFUCHS GmbH. Eine kommerzielle Nutzung oder Weitergabe ist untersagt.</p>
                  
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Spezifische Bildrechte</h2>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                      <ul className="list-disc list-inside space-y-3 text-gray-200">
                        <li><strong className="text-white">Balkonraum:</strong> Die Bildrechte zum Thema Balkonraum liegen bei © JG Schnabel.</li>
                        <li><strong className="text-white">balkonRAUM:</strong> Die Bildrechte und Marken für balkonRAUM liegen bei Knopp Wassmer Architekten aus München.</li>
                        <li><strong className="text-white">Terrassenhaus Menterschwaige:</strong> Die Bildrechte "Terrassenhaus Menterschwaige" u.a. zu sehen auf den Seiten "urban freedom" und "Kundenregistrierung" liegen bei der Fa. Klaus-Wohnbau www.klaus-gruppe.de. Wir bedanken uns außerdem für außergewöhnlich schöne Architektur bei blaumoser-Architekten.de.</li>
                        <li><strong className="text-white">Architektur:</strong> Einzelne Bildrechte liegen bei unserem Partnerunternehmen Sandmeir – exclusiv Stahlbau GmbH und werden mit freundlicher Genehmigung zur Verfügung gestellt.</li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Referenzprojekte & Partner des Monats</h2>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                      <p className="text-gray-200 leading-relaxed">
                        Die Bildrechte von Referenzprojekten oder auch die Bilder, die im Zuge des Partners des Monats präsentiert werden, liegen beim Unternehmen selbst. 
                        Diese werden BALKONFUCHS zur werblichen Nutzung für die Unternehmen zur Verfügung gestellt.
                      </p>
                    </div>
                  </section>
                  
                  <p>Einzelne Bildrechte liegen bei unserem Partnerunternehmen <strong className="text-orange-400">Sandmeir – exclusiv Stahlbau GmbH</strong> und wurden freundlicherweise zur Nutzung durch die BALKONFUCHS GmbH zur Verfügung gestellt.</p>
                  <p>Verwendetes Bildmaterial stammt zudem u. a. von iStockphoto, Fotolia, Twenty20, rawpixel.com und pixabay.com (siehe Credits).</p>
                  <p>Alle visualisierten Balkonszenarien sind unverbindlich. Vertragsleistungen richten sich ausschließlich nach schriftlicher Auftragsbestätigung.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Blog & Beiträge externer Autoren</h2>
                <p className="text-gray-200 leading-relaxed">
                  Externe Beiträge zu Personen, Firmen oder Produkten werden vor Veröffentlichung geprüft, aber die Verantwortung für den Inhalt liegt bei den Autor*innen.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Datenschutz & Ansprechpartner</h2>
                <p className="text-gray-200 leading-relaxed">
                  Der Datenschutzbereich (DSGVO, Kontaktmöglichkeiten etc.) ist separat aufgeführt und kann über die entsprechende Seite aufgerufen werden.
                </p>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-2xl font-bold text-orange-500 mb-4">�� BALKONFUCHS</div>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  BALKONFUCHS, Deutschlands führende Plattform für Balkon-Projekte. Über 850 zufriedene Kunden vertrauen uns.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                    <span className="text-white">📧</span>
                  </div>
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                    <span className="text-white">🏗️</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Service</h4>
                <ul className="space-y-2">
                  <li><a href="/kalkulator/" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Kalkulator</a></li>
                  <li><a href="/planer/" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Planer</a></li>
                  <li><a href="/express-angebot/" className="text-gray-400 hover:text-orange-400 transition-colors">Express-Angebot</a></li>
                  <li><a href="/genehmigung/" className="text-gray-400 hover:text-orange-400 transition-colors">Genehmigungscheck</a></li>
                  <li><a href="/bauzeit-planung/" className="text-gray-400 hover:text-orange-400 transition-colors">Terminplanung</a></li>
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
                    <span>>850 glückliche Balkonkunden</span>
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

export default Impressum;
