import React from 'react';
import Head from 'next/head';
import { ArrowLeft, Home, Shield, AlertTriangle, FileText, Mail } from 'lucide-react';
import Footer from '../components/Footer';

const Disclaimer = () => {
  return (
    <>
      <Head>
        <title>Haftungsausschluss - BALKONFUCHS GmbH | Rechtliche Hinweise</title>
        <meta name="description" content="Haftungsausschluss und rechtliche Hinweise von BALKONFUCHS. Informationen zu Haftungsbeschränkungen und Nutzungsbedingungen unserer Plattform." />
        <meta name="keywords" content="haftungsausschluss, rechtliche hinweise, BALKONFUCHS, haftung, nutzungsbedingungen" />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Haftungsausschluss - BALKONFUCHS GmbH | Rechtliche Hinweise" />
        <meta property="og:description" content="Haftungsausschluss und rechtliche Hinweise von BALKONFUCHS für unsere Plattform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/disclaimer" />
        <link rel="canonical" href="https://balkonfuchs.de/disclaimer" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <a href="/" className="flex items-center">
                  <img 
                    src="/logos/balkonfuchs-logo.png" 
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
              <h1 className="text-4xl font-bold text-white mb-8">Haftungsausschluss</h1>
              <p className="text-gray-300 mb-6">Stand: Januar 2025</p>

              {/* Wichtiger Hinweis */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6 mb-8">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-orange-400 mr-3" />
                    <h2 className="text-2xl font-bold text-white">Wichtiger Hinweis</h2>
                  </div>
                  <p className="text-gray-200 text-lg leading-relaxed">
                    Die folgenden Informationen dienen der rechtlichen Absicherung und dem Schutz aller Beteiligten. 
                    Bitte lesen Sie diese Hinweise sorgfältig durch, bevor Sie unsere Dienstleistungen nutzen.
                  </p>
                </div>
              </section>

              {/* Allgemeine Haftungsbeschränkung */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Allgemeine Haftungsbeschränkung</h2>
                <div className="space-y-6">
                  <div className="bg-gray-700/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Vermittlungsdienstleistung</h3>
                    <p className="text-gray-300 leading-relaxed">
                      BALKONFUCHS fungiert ausschließlich als Vermittlungsplattform zwischen Bauherren und qualifizierten Partnern. 
                      Wir übernehmen keine Haftung für die Ausführung der Bauarbeiten oder die Qualität der erbrachten Leistungen durch unsere Partner.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Keine Gewährleistung</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Alle auf unserer Plattform bereitgestellten Informationen, Kalkulationen und Empfehlungen erfolgen ohne Gewähr. 
                      Die tatsächlichen Kosten und Projektzeiten können von unseren Schätzungen abweichen.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Eigenverantwortung der Nutzer</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Bauherren sind selbst dafür verantwortlich, alle notwendigen Genehmigungen einzuholen und die rechtlichen 
                      Bestimmungen ihres Standorts zu beachten. Wir empfehlen dringend, sich vor Projektbeginn rechtlich beraten zu lassen.
                    </p>
                  </div>
                </div>
              </section>

              {/* Haftungsausschluss für Inhalte */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Haftungsausschluss für Inhalte</h2>
                <div className="space-y-6">
                  <div className="bg-gray-700/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Informationscharakter</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Alle auf unserer Website bereitgestellten Informationen haben rein informativen Charakter. 
                      Sie ersetzen keine fachliche Beratung durch qualifizierte Experten.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Aktualität der Informationen</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Wir bemühen uns um aktuelle und korrekte Informationen, können jedoch keine Gewähr für die 
                      Vollständigkeit, Richtigkeit und Aktualität aller Inhalte übernehmen.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Externe Links</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Für Inhalte externer Websites, auf die wir verlinken, übernehmen wir keine Verantwortung. 
                      Die Verantwortung liegt ausschließlich bei den jeweiligen Anbietern.
                    </p>
                  </div>
                </div>
              </section>

              {/* Haftungsausschluss für technische Störungen */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Technische Verfügbarkeit</h2>
                <div className="space-y-6">
                  <div className="bg-gray-700/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Systemverfügbarkeit</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Wir bemühen uns um eine hohe Verfügbarkeit unserer Plattform, können jedoch keine Gewähr für 
                      eine unterbrechungsfreie Nutzung geben. Technische Störungen sind möglich.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Datenverlust</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Wir empfehlen unseren Nutzern, wichtige Daten zusätzlich zu sichern. 
                      Für eventuelle Datenverluste übernehmen wir keine Haftung.
                    </p>
                  </div>
                </div>
              </section>

              {/* Besondere Hinweise */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Besondere Hinweise</h2>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">🏗️ Baurechtliche Bestimmungen</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Jedes Bundesland hat unterschiedliche baurechtliche Bestimmungen. 
                      Es liegt in der Verantwortung des Bauherrn, sich über die örtlichen Vorschriften zu informieren.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">📋 Genehmigungsverfahren</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Genehmigungsverfahren können sich ändern und sind standortabhängig. 
                      Unsere Informationen sind als Orientierungshilfe gedacht, ersetzen aber keine amtliche Auskunft.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">💰 Kostenschätzungen</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Unsere Kostenschätzungen basieren auf Durchschnittswerten und können je nach Standort, 
                      Materialauswahl und Projektkomplexität erheblich abweichen.
                    </p>
                  </div>
                </div>
              </section>

              {/* Kontakt */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Kontakt</h2>
                <div className="bg-gray-700/30 rounded-lg p-6">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Bei Fragen zu diesem Haftungsausschluss oder rechtlichen Angelegenheiten wenden Sie sich bitte an:
                  </p>
                  <div className="flex items-center text-orange-400">
                    <Mail className="w-5 h-5 mr-2" />
                    <a href="mailto:post@balkonfuchs.de" className="hover:text-orange-300 transition-colors">
                      post@balkonfuchs.de
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Disclaimer;










