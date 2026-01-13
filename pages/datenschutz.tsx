import React from 'react';
import Head from 'next/head';
import { ArrowLeft, Home, Phone, Mail, Globe, Building, Shield, CheckCircle, Star } from 'lucide-react';

const Datenschutz = () => {
  return (
    <>
      <Head>
        <title>Datenschutzerklärung - BALKONFUCHS GmbH</title>
        <meta name="description" content="Datenschutzerklärung der BALKONFUCHS GmbH - Informationen zur Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten gemäß DSGVO" />
        <meta name="keywords" content="datenschutz, dsgvo, BALKONFUCHS, datenschutzerklärung, personenbezogene daten" />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Datenschutzerklärung - BALKONFUCHS GmbH" />
        <meta property="og:description" content="Datenschutzerklärung der BALKONFUCHS GmbH - Informationen zur Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten gemäß DSGVO" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/datenschutz" />
        <link rel="canonical" href="https://balkonfuchs.de/datenschutz" />
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
              <h1 className="text-4xl font-bold text-white mb-8">Datenschutzerklärung</h1>
              
              <p className="text-gray-200 mb-8 leading-relaxed">
                Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. Im Folgenden informieren wir Sie gemäß der geltenden gesetzlichen Datenschutzbestimmungen, insbesondere der Datenschutz-Grundverordnung (DSGVO), über die Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten im Rahmen der Nutzung unserer Website <strong className="text-orange-400">balkonfuchs.de</strong>.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Verantwortlicher</h2>
                <div className="text-gray-200 leading-relaxed">
                  <p>
                    BalkonFuchs GmbH<br />
                    Adelberostraße 16<br />
                    36100 Petersberg<br />
                    E-Mail: <a href="mailto:post@balkonfuchs.de" className="text-orange-400 hover:text-orange-300 underline">post@balkonfuchs.de</a><br />
                    Tel.: +49 661 380 276 26
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Erhebung und Verwendung personenbezogener Daten</h2>
                <p className="text-gray-200 leading-relaxed">
                  Wir verarbeiten Ihre personenbezogenen Daten ausschließlich zu dem Zweck, Ihnen auf Ihre Anfrage hin geeignete Angebote für Ihr Balkonprojekt zu vermitteln und die Durchführung des jeweiligen Projekts zu ermöglichen.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. Weitergabe von Daten an Partnerunternehmen</h2>
                <div className="space-y-4 text-gray-200 leading-relaxed">
                  <p>
                    Mit Ihrer Anfrage erklären Sie sich einverstanden, dass wir Ihre Kontaktdaten – insbesondere <strong className="text-orange-400">Ihren Namen und Ihre E-Mail-Adresse</strong> – zur Angebotserstellung an <strong className="text-orange-400">drei bis zehn qualifizierte Partnerunternehmen</strong> weiterleiten. Die Auswahl der Partner erfolgt auf Grundlage Ihrer Projektangaben sowie der von Ihnen gewählten Kriterien. Es kann sich dabei sowohl um <strong className="text-orange-400">regionale als auch bundesweit tätige Unternehmen</strong> handeln.
                  </p>
                  <p>
                    <strong className="text-orange-400">Adressdaten und Fotos</strong> werden im ersten Schritt nicht weitergegeben. Diese stellen Sie ausschließlich freiwillig im direkten Kontakt mit einem Anbieter bereit.
                  </p>
                  <p>
                    Die Zusammenarbeit erfolgt <strong className="text-orange-400">nicht exklusiv mit einem bestimmten Unternehmen</strong>. Eine frühere Exklusivität mit der Firma Sandmeir GmbH besteht nicht mehr.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Speicherdauer</h2>
                <p className="text-gray-200 leading-relaxed">
                  Ihre Daten werden für einen Zeitraum von mindestens 24 Monaten gespeichert, da zwischen Anfrage und Realisierung eines Balkonprojekts erfahrungsgemäß ein längerer Zeitraum liegen kann.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Ihre Rechte</h2>
                <p className="text-gray-200 leading-relaxed">
                  Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten. Sie können sich hierzu unter <a href="mailto:datenschutz@balkonfuchs.de" className="text-orange-400 hover:text-orange-300 underline">datenschutz@balkonfuchs.de</a> an uns wenden.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Weitere Informationen</h2>
                <p className="text-gray-200 leading-relaxed">
                  Bitte beachten Sie auch unsere Hinweise zu Cookies, Server-Logfiles, Newsletter, Kontaktformularen und Drittanbietern wie Google, Zoho, Facebook oder YouTube, die Sie weiter unten auf dieser Seite finden oder auf Anfrage erhalten.
                </p>
                <p className="text-gray-200 leading-relaxed mt-4">
                  Vielen Dank für Ihr Vertrauen.<br />
                  <strong className="text-orange-400">Ihre BALKONFUCHS GmbH</strong>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Verwendung von Analyse-Tools und Drittanbieterdiensten</h2>
                <p className="text-gray-200 leading-relaxed mb-4">
                  Wir nutzen auf unserer Website verschiedene Dienste, um Ihre Nutzererfahrung zu verbessern und die Leistung der Website zu analysieren. Die dabei erhobenen Daten sind anonymisiert oder pseudonymisiert und lassen keine direkte Identifikation Ihrer Person zu.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">7.1 Google Analytics</h3>
                    <p className="text-gray-200 leading-relaxed">
                      Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Ireland Limited. Google Analytics verwendet sogenannte „Cookies". Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich gekürzter IP-Adresse) werden in der Regel an einen Server von Google übertragen und dort gespeichert. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Sie können der Analyse Ihres Nutzungsverhaltens jederzeit widersprechen.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">7.2 Zoho SalesIQ und Zoho PageSense</h3>
                    <p className="text-gray-200 leading-relaxed">
                      Wir verwenden die Dienste „SalesIQ" und „PageSense" von Zoho Corporation, um anonymisierte Informationen zur Website-Nutzung zu analysieren. Diese Tools helfen uns, besser zu verstehen, wie Besucher unsere Seiten nutzen und welche Inhalte besonders relevant sind.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">7.3 Einbindung von Plugins sozialer Netzwerke</h3>
                    <p className="text-gray-200 leading-relaxed mb-4">
                      Auf unserer Website sind Social Plugins folgender Anbieter eingebunden: Facebook, Instagram, YouTube, LinkedIn und weitere. Beim Besuch unserer Seiten kann über das Plugin eine direkte Verbindung zwischen Ihrem Browser und dem Server des jeweiligen Anbieters hergestellt werden. Dabei können Daten übertragen werden. Zweck und Umfang der Datenerhebung sowie Ihre Rechte und Einstellungsmöglichkeiten zum Schutz Ihrer Privatsphäre entnehmen Sie bitte den jeweiligen Datenschutzhinweisen der Anbieter.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-200 ml-4">
                      <li><a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">Datenschutzrichtlinie von Facebook</a></li>
                      <li><a href="https://twitter.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">Datenschutzrichtlinie von Twitter</a></li>
                      <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">Datenschutzrichtlinie von Google / YouTube</a></li>
                      <li><a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">Datenschutzrichtlinie von LinkedIn</a></li>
                      <li><a href="https://cielo.fi/en/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">Datenschutzrichtlinie von Cielo</a></li>
                      <li><a href="https://perspective.co/datenschutzerklaerung/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">Datenschutzrichtlinie von Perspective</a></li>
                    </ul>
                  </div>
                </div>

                <p className="text-gray-200 leading-relaxed mt-6">
                  Sie können das Setzen von Cookies durch entsprechende Einstellungen in Ihrem Browser verhindern. In diesem Fall stehen jedoch möglicherweise nicht alle Funktionen unserer Website zur Verfügung.
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
                    <span>{'>850 glückliche Balkonkunden'}</span>
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

export default Datenschutz;
