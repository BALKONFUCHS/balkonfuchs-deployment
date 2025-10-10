import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, Star, MessageCircle, CheckCircle, Users, Calculator, Calendar, Shield, Building, TrendingUp } from 'lucide-react';

const FeedbackPage = () => {
  return (
    <>
      <Head>
        <title>Feedback geben - Bewerten Sie unsere Balkon-Tools | BALKONFUCHS</title>
        <meta name="description" content="Geben Sie uns Feedback zu unseren Balkon-Tools: Kalkulator, Planer, Genehmigungscheck und mehr. Ihre Meinung hilft uns, unsere Hilfsmittel für Bauherren zu verbessern." />
        <meta name="keywords" content="balkon feedback, balkon tools bewerten, balkon kalkulator feedback, balkon planer feedback, balkonfuchs bewertung, balkonbau tools feedback" />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Feedback geben - Bewerten Sie unsere Balkon-Tools" />
        <meta property="og:description" content="Geben Sie uns Feedback zu unseren Balkon-Tools und helfen Sie uns, unsere Hilfsmittel für Bauherren zu verbessern." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/feedback" />
        <link rel="canonical" href="https://balkonfuchs.de/feedback" />
        
        {/* Strukturierte Daten für SEO-KI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "BALKONFUCHS Feedback Seite",
              "description": "Feedback-Seite für BALKONFUCHS Balkon-Tools und Hilfsmittel",
              "url": "https://balkonfuchs.de/feedback",
              "mainEntity": {
                "@type": "Organization",
                "name": "BALKONFUCHS",
                "description": "Deutschlands führende Plattform für Balkon-Projekte"
              }
            })
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Wie kann ich Feedback zu den BALKONFUCHS Tools geben?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nutzen Sie unseren Empfehlungsfunnel, um detailliertes Feedback zu unseren Balkon-Tools zu geben. Bewerten Sie Kalkulator, Planer, Genehmigungscheck und weitere Hilfsmittel."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Welche Tools kann ich bewerten?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sie können alle unsere Tools bewerten: Balkon-Kalkulator, Balkon-Planer, Genehmigungscheck, Express-Angebot, Terminplanung und Partner-Funnel."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Warum ist Ihr Feedback wichtig?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ihr Feedback hilft uns, unsere Tools kontinuierlich zu verbessern und neue Funktionen zu entwickeln, die Bauherren wirklich brauchen."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />

        {/* Main Content */}
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ihr Feedback hilft uns, <span className="text-orange-400">besser zu werden</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Bewerten Sie unsere Balkon-Tools und Hilfsmittel für Bauherren. 
                Ihre Meinung ist wertvoll für uns und hilft uns, unsere Services kontinuierlich zu verbessern.
              </p>
            </div>

            {/* Tools Overview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="text-3xl mb-3">🧮</div>
                <h3 className="text-lg font-semibold text-white mb-2">Balkon-Kalkulator</h3>
                <p className="text-gray-400 text-sm mb-4">Kostenlose Preisberechnung mit regionalen Faktoren</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>Bewerten Sie die Genauigkeit</span>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="text-lg font-semibold text-white mb-2">Balkon-Planer</h3>
                <p className="text-gray-400 text-sm mb-4">Schritt-für-Schritt Projektplanung in 16 Schritten</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>Bewerten Sie die Benutzerfreundlichkeit</span>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="text-3xl mb-3">✅</div>
                <h3 className="text-lg font-semibold text-white mb-2">Genehmigungscheck</h3>
                <p className="text-gray-400 text-sm mb-4">Schnelle Antworten zu Baugenehmigungen</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>Bewerten Sie die Hilfestellung</span>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-lg font-semibold text-white mb-2">Express-Angebot</h3>
                <p className="text-gray-400 text-sm mb-4">Priorisierte Anfragen für entscheidungsbereite Bauherren</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>Bewerten Sie den Service</span>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="text-3xl mb-3">📅</div>
                <h3 className="text-lg font-semibold text-white mb-2">Terminplanung</h3>
                <p className="text-gray-400 text-sm mb-4">Detaillierte Zeitpläne für Balkon-Projekte</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>Bewerten Sie die Planungsgenauigkeit</span>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="text-lg font-semibold text-white mb-2">Partner-Funnel</h3>
                <p className="text-gray-400 text-sm mb-4">Vermittlung an geprüfte Partner-Unternehmen</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>Bewerten Sie die Vermittlung</span>
                </div>
              </div>
            </div>

            {/* Feedback CTA */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Geben Sie uns detailliertes Feedback
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Nutzen Sie unseren <strong className="text-orange-400">Empfehlungsfunnel</strong>, um uns detailliertes Feedback zu allen unseren Tools zu geben. 
                Bewerten Sie die Benutzerfreundlichkeit, Genauigkeit und den Nutzen unserer Hilfsmittel für Bauherren.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="/erfahrungen/" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Feedback geben & bewerten
                  <ArrowRight className="w-5 h-5" />
                </a>
                
                <a 
                  href="/" 
                  className="bg-gray-700 text-white px-6 py-4 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
                >
                  Zurück zur Startseite
                </a>
              </div>
              
              <p className="text-sm text-gray-400 mt-6">
                💡 <strong>Ihr Feedback ist wertvoll:</strong> Es hilft uns, unsere Tools kontinuierlich zu verbessern und neue Funktionen zu entwickeln, 
                die Bauherren wirklich brauchen.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                Häufige Fragen zum Feedback
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">❓ Wie lange dauert das Feedback?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Das Feedback über unseren Empfehlungsfunnel dauert nur wenige Minuten. Sie können alle Tools bewerten und uns Ihre Meinung mitteilen.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">❓ Bleibt mein Feedback anonym?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Ja, Ihr Feedback wird anonym behandelt. Wir verwenden es ausschließlich zur Verbesserung unserer Tools und Services.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">❓ Welche Art von Feedback ist hilfreich?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Konstruktive Kritik, Verbesserungsvorschläge und positive Rückmeldungen sind gleichermaßen wertvoll für uns.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">❓ Werde ich über Verbesserungen informiert?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Ja, wir informieren unsere Nutzer regelmäßig über neue Features und Verbesserungen, die auf Basis von Feedback entwickelt wurden.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FeedbackPage;
