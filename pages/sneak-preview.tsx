import React from 'react';
import Head from 'next/head';
import { ArrowLeft, Home, CheckCircle2, Star, Zap, Shield, Clock, Users, Award, Rocket, Crown, AlertCircle } from 'lucide-react';
import ZohoSalesIQ from '../components/ZohoSalesIQ.js';

const SneakPreview = () => {
  return (
    <>
      <Head>
        <title>Sneak Preview - Exklusive Plattform-Testmöglichkeit | BALKONFUCHS</title>
        <meta name="description" content="Exklusive Testmöglichkeit: Erleben Sie alle BALKONFUCHS Premium-Services vor dem offiziellen Launch zu Sonderkonditionen." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="author" content="BALKONFUCHS GmbH" />
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="mb-8">
              <a href="/" className="inline-flex items-center text-gray-400 hover:text-orange-400 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zur Startseite
              </a>
            </div>

            {/* Exklusivitäts-Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 px-6 py-3 rounded-full">
                <Crown className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300 font-bold text-lg">EXKLUSIVE SNEAK PREVIEW</span>
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Sneak Preview <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  BALKONFUCHS Plattform
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                <span className="text-purple-400 font-bold">Einmalige Gelegenheit:</span> Testen Sie alle Premium-Services 
                vor dem offiziellen Launch zu <span className="text-orange-400 font-bold">Sonderkonditionen</span>.
              </p>
              
              {/* MAIN HIGHLIGHT - Sneak Preview Angebot */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-8 shadow-2xl">
                  <h3 className="text-3xl font-bold mb-4 flex items-center justify-center">
                    <Zap className="w-8 h-8 mr-3" />
                    ⚡ Risikofrei testen
                  </h3>
                  <p className="text-blue-100 text-xl mb-6 text-center">Nur 1 Monat, keine Bindung</p>
                  
                  <div className="bg-white/20 backdrop-blur rounded-xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xl font-semibold">Sneak Preview Paket</span>
                      <span className="text-4xl font-bold">€798</span>
                    </div>
                    <div className="text-blue-100 text-center">
                      5 qualifizierte Leads · 30 Tage Laufzeit
                    </div>
                  </div>
                  
                  <div className="bg-green-400/20 backdrop-blur rounded-xl p-4 mb-6">
                    <div className="text-lg font-semibold mb-2 flex items-center justify-center">
                      <span className="text-2xl mr-2">🎁</span>
                      Upgrade-Bonus:
                    </div>
                    <div className="text-center">Bei Abo-Abschluss: €100-150 Gutschrift</div>
                  </div>
                  
                  <a 
                    href="/sneak-preview-bestellung"
                    className="w-full bg-white text-blue-600 font-bold px-6 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg inline-block text-center"
                  >
                    Jetzt testen →
                  </a>
                </div>
              </div>
              
              {/* Urgency Banner */}
              <div className="max-w-2xl mx-auto bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-bold text-white">Exklusives Angebot</h3>
                </div>
                <p className="text-gray-300 text-lg mb-3">
                  Diese Seite ist <span className="text-red-400 font-bold">nicht öffentlich zugänglich</span> und wird nur 
                  an <span className="text-purple-400 font-bold">ausgewählte Interessenten</span> weitergegeben.
                </p>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-yellow-300 font-semibold text-center">
                    ⚠️ WICHTIG: Dieses Angebot kann pro Unternehmen nur <strong>einmal</strong> in Anspruch genommen werden.
                  </p>
                </div>
              </div>
            </div>

            {/* Was ist inklusive */}
            <section className="bg-gray-800/50 rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
                <Award className="w-8 h-8 text-purple-400 mr-3" />
                Was ist in der Sneak Preview enthalten?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Premium Lead-Zugang</h3>
                      <p className="text-gray-300">
                        Erhalten Sie Zugang zu qualifizierten Kundenanfragen aus Berlin - 
                        <strong className="text-purple-400"> vor allen anderen Partnern</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Vollständige Plattform</h3>
                      <p className="text-gray-300">
                        Testen Sie alle Features: Kalkulator, Planer, Genehmigungscheck, 
                        Terminplanung - <strong className="text-blue-400">komplett unbegrenzt</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Persönliche Betreuung</h3>
                      <p className="text-gray-300">
                        Direkter Ansprechpartner für alle Fragen und 
                        <strong className="text-green-400"> maßgeschneiderte Unterstützung</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Early Access</h3>
                      <p className="text-gray-300">
                        Seien Sie der Erste, der neue Features testet und 
                        <strong className="text-orange-400"> aktiv mitgestaltet</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Marketing-Support</h3>
                      <p className="text-gray-300">
                        Professionelle Vermarktung Ihrer Projekte und 
                        <strong className="text-indigo-400"> Premium-Platzierung</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Gründungspartner-Status</h3>
                      <p className="text-gray-300">
                        Sichern Sie sich <strong className="text-pink-400">lebenslang vergünstigte Konditionen</strong> 
                        ab dem offiziellen Launch.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Warum jetzt? */}
            <section className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center">
                <Clock className="w-8 h-8 text-purple-400 mr-3" />
                Warum jetzt zuschlagen?
              </h2>
              
              {/* Sneak Preview Philosophie */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center">
                    <span className="text-2xl mr-3">🤝</span>
                    Unsere Sneak Preview Philosophie
                  </h3>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    <strong className="text-blue-400">Testen Sie uns aus – wir wollen, dass Sie und unsere gemeinsamen Kunden glücklich werden.</strong><br/>
                    Gute Arbeit für gute Partner, gute Leistungen für gute Partner und gute Partner für gute Qualität. 
                    <strong className="text-purple-400"> Gute Qualität für gute Kunden.</strong>
                  </p>
                  <p className="text-gray-300 mt-4">
                    Wir suchen Partner, die mit uns wachsen wollen – nicht nur Kunden, die bezahlen.
                  </p>
                </div>
              </div>
              
              <div className="max-w-4xl mx-auto space-y-6 text-gray-300 text-lg leading-relaxed">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    First Mover Advantage
                  </h3>
                  <p>
                    Als Sneak Preview Teilnehmer sind Sie <strong className="text-purple-400">vor allen anderen</strong> dabei. 
                    Sie lernen die Plattform kennen, bauen sich eine Position auf und sind bereit, 
                    wenn der offizielle Launch kommt.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-3">💰</span>
                    Unschlagbare Konditionen
                  </h3>
                  <p>
                    <strong className="text-orange-400">€798 für 5 Leads</strong> - das sind nur €159,60 pro Lead! 
                    Nach dem offiziellen Launch werden diese Preise nie wieder angeboten. 
                    Zusätzlich erhalten Sie bei Abo-Abschluss <strong className="text-green-400">€100-150 Gutschrift</strong>.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-3">🛡️</span>
                    100% Risikofrei
                  </h3>
                  <p>
                    Nur 1 Monat Laufzeit, <strong className="text-green-400">keine Bindung</strong>. 
                    Testen Sie risikofrei und entscheiden Sie dann, ob Sie das Abo abschließen möchten.
                    Bei Abo-Abschluss erhalten Sie zusätzlich <strong className="text-green-400">€100-150 Gutschrift</strong>.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/40 rounded-2xl p-12 text-center mb-16">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/40 px-4 py-2 rounded-full mb-6">
                  <Crown className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-bold">Exklusives Angebot</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Sichern Sie sich Ihren Sneak Preview Zugang
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Testen Sie die BALKONFUCHS Plattform 30 Tage lang mit 5 qualifizierten Leads 
                  und sichern Sie sich €100-150 Gutschrift bei Abo-Abschluss.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <a 
                    href="/sneak-preview-bestellung"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Rocket className="w-6 h-6" />
                    Sneak Preview bestellen
                  </a>
                  
                  <a 
                    href="/partner/" 
                    className="inline-flex items-center justify-center gap-2 bg-gray-800 border-2 border-gray-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:border-purple-500 hover:bg-gray-700 transition-all duration-300"
                  >
                    <Rocket className="w-6 h-6" />
                    Direkt Partner werden
                  </a>
                </div>

                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 max-w-2xl mx-auto">
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-green-400">💬 Persönliche Beratung:</strong> Unser Team berät Sie gerne 
                    persönlich zu diesem exklusiven Angebot und beantwortet alle Ihre Fragen.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-gray-800/50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Häufige Fragen zur Sneak Preview
              </h2>
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="bg-gray-700/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">❓ Was passiert nach den 30 Tagen?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Nach den 30 Tagen Sneak Preview können Sie entscheiden, ob Sie ein Abo abschließen möchten. 
                    Bei Abo-Abschluss erhalten Sie <strong className="text-green-400">€100-150 Gutschrift</strong> 
                    und werden Gründungspartner mit <strong className="text-purple-400">lebenslang vergünstigten Konditionen</strong>.
                  </p>
                </div>

                <div className="bg-gray-700/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">❓ Kann ich jederzeit kündigen?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Ja, das Sneak Preview Paket läuft nur <strong className="text-green-400">30 Tage ohne Bindung</strong>. 
                    Nach 30 Tagen endet es automatisch. Sie entscheiden dann, ob Sie ein Abo abschließen möchten 
                    und erhalten dabei <strong className="text-green-400">€100-150 Gutschrift</strong>.
                  </p>
                </div>

                <div className="bg-gray-700/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">❓ Wie unterscheidet sich das von der normalen Partnerschaft?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Die Sneak Preview ist ein <strong className="text-purple-400">exklusives Testangebot</strong> mit 
                    nur 30 Tagen Laufzeit und 5 qualifizierten Leads. Sie erhalten den gleichen Zugang wie normale Partner, 
                    aber <strong className="text-orange-400">ohne Bindung</strong> und mit <strong className="text-green-400">€100-150 Gutschrift</strong> bei Abo-Abschluss.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">💰 Warum ist dieses Angebot so attraktiv?</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    <strong className="text-purple-400 text-lg">Wir suchen Feedback-Partner!</strong><br/>
                    Als Sneak Preview Teilnehmer helfen Sie uns, die Plattform zu perfektionieren. 
                    Ihr Feedback ist für uns wertvoller als der volle Preis.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-orange-400">Win-Win:</strong> Sie erhalten 5 qualifizierte Leads für €798 (nur €159,60 pro Lead) 
                    und zusätzlich €100-150 Gutschrift bei Abo-Abschluss. Wir erhalten wertvolles Feedback für den perfekten Launch.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                © 2025 BALKONFUCHS GmbH - Sneak Preview Angebot
              </p>
              <div className="flex justify-center space-x-6 text-sm">
                <a href="/impressum/" className="text-gray-400 hover:text-orange-400 transition-colors">Impressum</a>
                <a href="/datenschutz/" className="text-gray-400 hover:text-orange-400 transition-colors">Datenschutz</a>
                <a href="/agb/" className="text-gray-400 hover:text-orange-400 transition-colors">AGB</a>
              </div>
            </div>
          </div>
        </footer>
        
        {/* ZOHO Sales IQ Chat Widget */}
        <ZohoSalesIQ />
      </div>
    </>
  );
};

export default SneakPreview;
