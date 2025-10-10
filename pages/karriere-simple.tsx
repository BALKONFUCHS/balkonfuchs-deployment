import React from 'react';
import Head from 'next/head';

const KarriereSimple = () => {
  return (
    <>
      <Head>
        <title>Karriere bei BALKONFUCHS - Offene Stellen und Entwicklungsmöglichkeiten</title>
        <meta name="description" content="Entdecken Sie Karrieremöglichkeiten bei BALKONFUCHS. Aktuell haben wir keine offenen Positionen, aber wir freuen uns über Initiativbewerbungen von talentierten Fachkräften." />
        <meta name="keywords" content="karriere, jobs, stellenangebote, BALKONFUCHS, bewerbung, arbeiten" />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Karriere bei BALKONFUCHS - Offene Stellen und Entwicklungsmöglichkeiten" />
        <meta property="og:description" content="Entdecken Sie Karrieremöglichkeiten bei BALKONFUCHS. Aktuell haben wir keine offenen Positionen, aber wir freuen uns über Initiativbewerbungen." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/karriere" />
        <link rel="canonical" href="https://balkonfuchs.de/karriere" />
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
                  🏠
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
                ← Zurück zur Startseite
              </a>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Karriere bei BALKONFUCHS
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Werden Sie Teil unseres innovativen Teams und gestalten Sie die Zukunft des Balkonbaus mit.
              </p>
            </div>

            {/* Current Openings */}
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Aktuelle Stellenausschreibungen</h2>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-white mb-4">Aktuell keine offenen Positionen</h3>
                <p className="text-gray-300 mb-6">
                  Wir haben derzeit keine offenen Stellen, freuen uns aber über Initiativbewerbungen von talentierten Fachkräften.
                </p>
                <a 
                  href="mailto:karriere@balkonfuchs.de" 
                  className="inline-flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  📧 Initiativbewerbung senden
                </a>
              </div>
            </div>

            {/* Why Work With Us */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Warum BALKONFUCHS?</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">✓</span>
                    Innovatives Arbeitsumfeld
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">✓</span>
                    Flexible Arbeitszeiten
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">✓</span>
                    Weiterbildungsmöglichkeiten
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">✓</span>
                    Flache Hierarchien
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Was wir suchen</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    Leidenschaft für Innovation
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    Teamfähigkeit
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    Lernbereitschaft
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    Eigeninitiative
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Interesse geweckt?</h3>
              <p className="text-gray-300 mb-6">
                Senden Sie uns Ihre Initiativbewerbung und werden Sie Teil unseres Teams.
              </p>
              <a 
                href="mailto:karriere@balkonfuchs.de" 
                className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                📧 Jetzt bewerben
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm">© 2025 BALKONFUCHS GmbH. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default KarriereSimple;
