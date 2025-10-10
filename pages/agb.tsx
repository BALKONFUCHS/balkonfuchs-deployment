import React from 'react';
import Head from 'next/head';
import { Home } from 'lucide-react';

export default function AGB() {
  return (
    <>
      <Head>
        <title>AGB - BALKONFUCHS GmbH</title>
        <meta name="description" content="Allgemeine Geschäftsbedingungen (AGB) für die Nutzung von balkonfuchs.de durch Endkunden - Transparente Nutzungsbedingungen und rechtliche Hinweise" />
        <meta name="keywords" content="agb, allgemeine geschäftsbedingungen, BALKONFUCHS, nutzungsbedingungen, rechtliche hinweise" />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="AGB - BALKONFUCHS GmbH" />
        <meta property="og:description" content="Allgemeine Geschäftsbedingungen (AGB) für die Nutzung von balkonfuchs.de durch Endkunden" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/agb" />
        <link rel="canonical" href="https://balkonfuchs.de/agb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fig+Tree:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-gray-900" style={{ fontFamily: 'Fig Tree, sans-serif' }}>
        {/* Header */}
        <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-600">
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
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <a href="/" className="text-orange-400 hover:text-orange-300 transition-colors">
              ← Zurück zur Startseite
            </a>
          </div>

          {/* Content */}
          <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8">
            <h1 className="text-4xl font-bold text-white mb-8">Allgemeine Geschäftsbedingungen (AGB) für die Nutzung von balkonfuchs.de durch Endkunden</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Geltungsbereich</h2>
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <p className="text-gray-200 leading-relaxed">
                  Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Plattform <strong className="text-white">BALKONFUCHS.de</strong> durch Endkunden, 
                  die sich für eine Balkonerweiterung oder -sanierung interessieren. Betreiber der Plattform ist <strong className="text-white">BALKONFUCHS</strong>, 
                  vertreten durch die BALKONFUCHS GmbH, Adelberostraße 16, 36100 Petersberg.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. Leistungen von BALKONFUCHS</h2>
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <ul className="list-disc list-inside space-y-3 text-gray-200">
                  <li>BALKONFUCHS fungiert als <strong className="text-white">reiner Vermittlungsdienstleister (Lead-Provider)</strong>.</li>
                  <li>Wir bringen interessierte Endkunden mit geeigneten Partnerunternehmen (z. B. Balkonbauunternehmen, Handwerksbetrieben) aus der jeweiligen Region in Kontakt.</li>
                  <li>Die Nutzung der Plattform und die Kontaktvermittlung sind <strong className="text-white">für Endkunden kostenlos</strong>.</li>
                  <li>BALKONFUCHS bietet <strong className="text-white">selbst keine Waren oder Bauleistungen an</strong>, sondern stellt ausschließlich den Kontakt zwischen den Parteien her.</li>
                  <li>Die Kommunikation und ein etwaiger Vertragsschluss erfolgen <strong className="text-white">ausschließlich zwischen dem Endkunden und dem ausgewählten Partnerunternehmen</strong>.</li>
                  <li>Eine <strong className="text-white">Erfolgsgarantie für den Vertragsabschluss</strong> oder die Umsetzung des jeweiligen Projekts besteht nicht.</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. Inhalte und Haftungsausschluss</h2>
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <ul className="list-disc list-inside space-y-3 text-gray-200">
                  <li>Die auf der Plattform dargestellten Informationen, Bilder, Produkte oder Referenzen stammen in der Regel von Partnerunternehmen und dienen <strong className="text-white">ausschließlich der Illustration</strong>.</li>
                  <li>BALKONFUCHS übernimmt <strong className="text-white">keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität</strong> dieser Inhalte.</li>
                  <li><strong className="text-white">Produktabbildungen und -informationen</strong> unterliegen dem Eigentum bzw. der Verantwortung der jeweiligen Anbieter. Eine Haftung seitens BALKONFUCHS ist ausgeschlossen.</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Angaben zu Preisen und Referenzwerten</h2>
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <ul className="list-disc list-inside space-y-3 text-gray-200">
                  <li>Auf der Plattform veröffentlichte <strong className="text-white">Preisangaben, Richtwerte oder Erfahrungswerte</strong> beruhen auf regionalen Durchschnittswerten, Erfahrungsberichten oder öffentlich zugänglichen Quellen.</li>
                  <li>Sie dienen <strong className="text-white">ausschließlich der groben Orientierung</strong> und stellen <strong className="text-white">kein verbindliches Angebot</strong> dar.</li>
                  <li><strong className="text-white">Ein Anspruch auf Abschluss eines Vertrages</strong> zu den genannten Referenzwerten besteht nicht.</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Keine rechtliche oder baurechtliche Beratung</h2>
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <p className="text-gray-200 leading-relaxed">
                  BALKONFUCHS bietet <strong className="text-white">keine rechtliche, planerische oder baurechtliche Beratung</strong> an. 
                  Kunden sind selbst dafür verantwortlich, sich über <strong className="text-white">etwaige Genehmigungspflichten</strong>, 
                  statische Anforderungen und sonstige baurechtliche Vorgaben bei zuständigen Behörden oder Fachplanern zu informieren.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Datenschutz</h2>
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <p className="text-gray-200 leading-relaxed">
                  Die Erhebung, Verarbeitung und Nutzung personenbezogener Daten erfolgt gemäß unserer 
                  <a href="/datenschutz/" className="text-orange-400 hover:text-orange-300 underline ml-1">Datenschutzerklärung</a>.<br />
                  Eine Weitergabe von Kundendaten an Partnerunternehmen erfolgt <strong className="text-white">ausschließlich nach ausdrücklicher Zustimmung</strong> des Kunden im Rahmen der Anfrage.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Schlussbestimmungen</h2>
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <p className="text-gray-200 leading-relaxed">
                  Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein, bleibt die Gültigkeit der übrigen Bestimmungen unberührt. 
                  Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.
                </p>
              </div>
            </section>
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
                    <a href="/disclaimer/" className="hover:text-orange-400 transition-colors">Haftungsausschluss</a>
                    <a href="/faq" className="hover:text-orange-400 transition-colors">FAQ</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
