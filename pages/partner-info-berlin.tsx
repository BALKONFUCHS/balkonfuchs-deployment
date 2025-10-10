import React from 'react';
import Head from 'next/head';
import { ArrowLeft, Home, Building, Users, Award, TrendingUp, CheckCircle2, Shield, Star, Phone, Mail, MapPin, AlertCircle, Zap, Target, Rocket, Crown } from 'lucide-react';
import dynamic from 'next/dynamic';
const ZohoSalesIQ = dynamic(() => import('../components/ZohoSalesIQ.js'), { ssr: false });

const PartnerInfoBerlin = () => {
  return (
    <>
      <Head>
        <title>Partner werden - Exklusiver Berlin-Launch mit 10 Partnern | BALKONFUCHS</title>
        <meta name="description" content="Exklusiver BALKONFUCHS Launch in Berlin! Nur 10 Partner-Plätze für den Start. Werden Sie einer der ersten Partner. Gratis bis Ende 2025, lebenslang -30% ab 2026." />
        <meta name="keywords" content="BALKONFUCHS Partner, Balkonbau Partner Berlin, Handwerker Partner, Balkonbau Partner werden, Gründungspartner" />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Partner werden - Exklusiver Berlin-Launch | BALKONFUCHS" />
        <meta property="og:description" content="Exklusiver BALKONFUCHS Launch in Berlin! Nur 10 Partner-Plätze. Gratis bis Ende 2025, lebenslang -30% ab 2026." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/partner-info-berlin" />
        <link rel="canonical" href="https://balkonfuchs.de/partner-info-berlin" />
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

            {/* Berlin Launch Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/50 px-6 py-3 rounded-full">
                <MapPin className="w-5 h-5 text-indigo-400" />
                <span className="text-indigo-300 font-bold text-lg">EXKLUSIVER BERLIN-LAUNCH</span>
                <Crown className="w-5 h-5 text-yellow-400" />
              </div>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                BALKONFUCHS Partner werden <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Berlin Edition
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Seien Sie von Anfang an dabei! Wir starten in Berlin mit <span className="text-indigo-400 font-bold">nur 10 ausgewählten Partnern</span>.
              </p>
              
              {/* CTA Button 1 - Oben */}
              <div className="mb-8">
                <a 
                  href="/partner-werden" 
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Rocket className="w-7 h-7" />
                  Jetzt als Gründungspartner bewerben
                </a>
                <p className="text-gray-400 text-sm mt-3">
                  ⚡ Nur 10 Plätze verfügbar • 🎁 Gratis bis Ende 2025 • ♾️ Lebenslang -30%
                </p>
              </div>
              
              {/* MAIN HIGHLIGHT - Gründungspartner Konditionen */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Crown className="w-8 h-8 text-yellow-400" />
                    <h3 className="text-2xl md:text-3xl font-bold text-white">Gründungspartner-Konditionen</h3>
                    <Crown className="w-8 h-8 text-yellow-400" />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-900/50 rounded-xl p-4 border border-green-500/30">
                      <div className="text-3xl font-bold text-green-400 mb-2">100% GRATIS</div>
                      <div className="text-gray-300">Bis Ende 2025</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4 border border-indigo-500/30">
                      <div className="text-3xl font-bold text-indigo-400 mb-2">∞ Lebenslang</div>
                      <div className="text-gray-300">Vergünstigte Konditionen</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4 border border-purple-500/30">
                      <div className="text-3xl font-bold text-purple-400 mb-2">Ab 2026</div>
                      <div className="text-gray-300">Offizieller Start</div>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-200 leading-relaxed">
                    <strong className="text-green-400">Jetzt einsteigen, kostenlos testen!</strong> Als Gründungspartner nutzen Sie 
                    die Plattform bis Ende 2025 <strong className="text-green-400">komplett kostenfrei</strong> und sichern sich 
                    <strong className="text-indigo-400"> lebenslang vergünstigte Konditionen</strong> ab 2026.
                  </p>
                </div>
              </div>
              
              {/* Urgency Banner */}
              <div className="max-w-2xl mx-auto bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl font-bold text-white">Limitierte Plätze verfügbar</h3>
                </div>
                <p className="text-gray-300 text-lg">
                  Aktuell sind <span className="text-orange-400 font-bold">nur noch wenige der 10 Partner-Plätze</span> für den Berlin-Launch verfügbar.
                </p>
              </div>
            </div>

            {/* Quick Overview - Berlin Edition */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Nur 10 Partner</h3>
                <p className="text-gray-300">Exklusive Startgruppe für Berlin</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">First Mover</h3>
                <p className="text-gray-300">Profitieren Sie vom Markteintritt</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">850+ Know-how</h3>
                <p className="text-gray-300">Erprobtes System, neue Plattform</p>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">
              
              {/* Timeline & Konditionen Highlight */}
              <section className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-8 mb-8">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-green-400 mr-3" />
                  Ihr Weg zum Gründungspartner
                </h2>
                <div className="max-w-4xl mx-auto">
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-900/80 rounded-xl p-6 text-center border border-green-500/30">
                      <div className="text-5xl mb-3">🎁</div>
                      <h3 className="text-2xl font-bold text-green-400 mb-2">Jetzt - Ende 2025</h3>
                      <p className="text-xl font-bold text-white mb-2">100% GRATIS</p>
                      <p className="text-gray-300 text-sm">
                        Kompletter Plattform-Zugang ohne Kosten während der Launch-Phase
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/80 rounded-xl p-6 text-center border border-indigo-500/30">
                      <div className="text-5xl mb-3">🚀</div>
                      <h3 className="text-2xl font-bold text-indigo-400 mb-2">Ab 2026</h3>
                      <p className="text-xl font-bold text-white mb-2">Offizieller Start</p>
                      <p className="text-gray-300 text-sm">
                        Plattform geht live mit Ihnen als etabliertem Partner
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/80 rounded-xl p-6 text-center border border-purple-500/30">
                      <div className="text-5xl mb-3">♾️</div>
                      <h3 className="text-2xl font-bold text-purple-400 mb-2">Für immer</h3>
                      <p className="text-xl font-bold text-white mb-2">Lebenslang -30%</p>
                      <p className="text-gray-300 text-sm">
                        Permanent vergünstigte Konditionen als Gründungspartner
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
                    <p className="text-xl text-gray-200 leading-relaxed">
                      <strong className="text-yellow-400 text-2xl">⭐ Gründungspartner-Garantie:</strong><br/>
                      <span className="text-lg">
                        Starten Sie jetzt <strong className="text-green-400">kostenlos</strong>, bauen Sie sich eine Position auf, 
                        und zahlen erst ab 2026 – dann aber <strong className="text-purple-400">lebenslang 30% weniger</strong> als alle späteren Partner!
                      </span>
                    </p>
                  </div>
                </div>
              </section>

              {/* CTA Button 2 - Mitte */}
              <section className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/30 rounded-2xl p-8 text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  <span className="text-indigo-400">🚀</span> Bereit für den nächsten Schritt?
                </h3>
                <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                  Werden Sie einer der ersten 10 Gründungspartner in Berlin und sichern Sie sich 
                  <span className="text-green-400 font-semibold"> lebenslang vergünstigte Konditionen</span>.
                </p>
                <a 
                  href="/partner-werden" 
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Rocket className="w-6 h-6" />
                  Jetzt bewerben & Gründungspartner werden
                </a>
              </section>

              {/* Berlin Launch Story */}
              <section className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-indigo-400 mr-3" />
                  Warum Berlin? Warum jetzt?
                </h2>
                <div className="max-w-4xl mx-auto space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    Berlin ist der <span className="text-indigo-400 font-semibold">strategische Startpunkt</span> für die BALKONFUCHS-Plattform 2025. 
                    Als dynamischste Stadt Deutschlands mit hohem Modernisierungsbedarf bietet Berlin ideale Voraussetzungen für innovative Balkonbau-Lösungen.
                  </p>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Zap className="w-6 h-6 text-yellow-400 mr-2" />
                      Der Launch-Plan
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                        <span><strong className="text-white">Jetzt - Ende 2025 (Launch-Phase):</strong> 10 Gründungspartner starten kostenlos in Berlin</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                        <span><strong className="text-white">Ab 2026 (Offizieller Start):</strong> Plattform geht live, Expansion auf weitere Bezirke</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                        <span><strong className="text-white">2026+ (Wachstum):</strong> Bundesweiter Rollout basierend auf Berliner Erfolgen</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Die 850 Kunden - Erklärung */}
              <section className="bg-gray-800/50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <Users className="w-8 h-8 text-orange-400 mr-3" />
                  Unser Erfahrungsschatz: 850+ zufriedene Kunden
                </h2>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    Sie fragen sich vielleicht: <span className="text-orange-400 font-semibold">"Wie kommen über 850 zufriedene Kunden zustande, 
                    wenn die Plattform gerade erst startet?"</span>
                  </p>
                  <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Die Antwort:</h3>
                    <p className="mb-4">
                      Das gesamte <span className="text-orange-400 font-semibold">BALKONFUCHS-Team</span> bringt jahrelange Erfahrung aus 
                      der Balkonbau-Branche mit. Die 850+ zufriedenen Kunden stammen aus unserer bisherigen Arbeit und bilden die Grundlage 
                      für diese neue, optimierte Plattform.
                    </p>
                    <p>
                      Dieses <span className="text-orange-400 font-semibold">bewährte Know-how</span> – von Kundenkommunikation über 
                      Qualitätsstandards bis hin zu Prozessoptimierung – fließt jetzt in die BALKONFUCHS-Plattform ein. 
                      Sie profitieren von <span className="text-orange-400 font-semibold">erprobten Methoden</span>, nicht von einem Experiment.
                    </p>
                  </div>
                </div>
              </section>

              {/* Warum als einer der ersten 10 Partner starten? */}
              <section className="bg-gray-800/50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <Crown className="w-8 h-8 text-yellow-400 mr-3" />
                  Ihre Vorteile als Gründungspartner Berlin
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🎁</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">Gratis bis Ende 2025</h3>
                        <p className="text-gray-300 leading-relaxed">
                          <strong className="text-green-400">100% kostenfrei</strong> während der gesamten Launch-Phase. 
                          Testen Sie die Plattform ohne jedes Risiko.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">♾️</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">Lebenslang -30% Rabatt</h3>
                        <p className="text-gray-300 leading-relaxed">
                          Als Gründungspartner zahlen Sie ab 2026 <strong className="text-purple-400">für immer 30% weniger</strong> 
                          als alle späteren Partner – ein Leben lang!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/20 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">First Mover Advantage</h3>
                        <p className="text-gray-300 leading-relaxed">
                          Als einer der ersten 10 Partner profitieren Sie vom gesamten Berliner Markt ohne Konkurrenz auf der Plattform.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-orange-500/20 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Star className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">Premiumplatzierung</h3>
                        <p className="text-gray-300 leading-relaxed">
                          Gründungspartner erhalten bevorzugte Platzierung und Sichtbarkeit auf der Plattform – dauerhaft.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">Erprobtes System</h3>
                        <p className="text-gray-300 leading-relaxed">
                          Nutzen Sie unsere Erfahrung aus 850+ erfolgreich abgeschlossenen Projekten.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border border-yellow-500/20 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">Mitgestaltung</h3>
                        <p className="text-gray-300 leading-relaxed">
                          Entwickeln Sie die Plattform aktiv mit – Ihr Feedback prägt das finale Produkt.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Berlin Launch Story */}
              <section className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-indigo-400 mr-3" />
                  Die Berlin-Story
                </h2>
                <div className="max-w-4xl mx-auto space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    <strong className="text-white">Wir befinden uns aktuell in der Launch-Phase.</strong> Berlin ist der 
                    <span className="text-indigo-400 font-semibold"> strategische Startpunkt</span> für die BALKONFUCHS-Plattform. 
                    Als dynamischste Stadt Deutschlands mit hohem Modernisierungsbedarf bietet Berlin ideale Voraussetzungen.
                  </p>
                  <p>
                    <strong className="text-green-400">Bis Ende 2025</strong> perfektionieren wir gemeinsam mit unseren Gründungspartnern 
                    alle Prozesse. <strong className="text-indigo-400">Ab 2026</strong> startet die Plattform offiziell – und Sie sind 
                    bereits etabliert, bekannt und profitieren von vergünstigten Konditionen.
                  </p>
                </div>
              </section>

              {/* Timeline */}
              <section className="bg-gray-800/50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  Der Weg zum Partner
                </h2>
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">Jetzt bewerben</h3>
                      <p className="text-gray-300">
                        Füllen Sie das Bewerbungsformular aus und sichern Sie sich einen der limitierten 10 Plätze.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">Persönliches Kennenlernen</h3>
                      <p className="text-gray-300">
                        Video-Call oder Treffen in Berlin – wir lernen uns kennen und klären alle Details.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">Onboarding & Launch</h3>
                      <p className="text-gray-300">
                        Profil-Erstellung, Schulung und gemeinsamer Launch – Sie sind startklar!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">Erste Leads erhalten</h3>
                      <p className="text-gray-300">
                        Qualifizierte Kundenanfragen aus Berlin – von Anfang an mit voller Unterstützung.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Was Sie erwarten können */}
              <section className="bg-gray-800/50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <CheckCircle2 className="w-8 h-8 text-green-400 mr-3" />
                  Was Sie als Berlin-Partner erwarten können
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Vorqualifizierte Leads</h3>
                      <p className="text-gray-300">
                        Nur ernsthafte Interessenten mit konkretem Projektvorhaben in Berlin
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Exklusivität</h3>
                      <p className="text-gray-300">
                        Maximale Sichtbarkeit durch limitierte Partnerzahl in der Startphase
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Marketing-Support</h3>
                      <p className="text-gray-300">
                        Professionelle Vermarktung Ihrer Projekte und Expertise
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Persönliche Betreuung</h3>
                      <p className="text-gray-300">
                        Direkter Ansprechpartner während der gesamten Launch-Phase
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Faire Konditionen</h3>
                      <p className="text-gray-300">
                        Transparente, erfolgsbasierte Vergütung ohne versteckte Kosten
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Gemeinsames Wachstum</h3>
                      <p className="text-gray-300">
                        Gestalten Sie die Plattform aktiv mit – Ihr Feedback zählt!
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Anforderungen */}
              <section className="bg-gray-800/50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <Shield className="w-8 h-8 text-blue-400 mr-3" />
                  Voraussetzungen für Berlin-Partner
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 text-lg">
                      <strong className="text-white">Standort:</strong> Firmensitz in Berlin oder Brandenburg mit Fokus auf Berlin
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 text-lg">
                      <strong className="text-white">Erfahrung:</strong> Nachweisbare Expertise im Balkonbau (mind. 3 Referenzprojekte)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 text-lg">
                      <strong className="text-white">Qualität:</strong> Bereitschaft zu hohen Qualitätsstandards und regelmäßigen Feedbackrunden
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 text-lg">
                      <strong className="text-white">Kapazität:</strong> Freie Kapazitäten für mindestens 2-3 neue Projekte pro Monat
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 text-lg">
                      <strong className="text-white">Versicherung:</strong> Gültige Betriebshaftpflichtversicherung
                    </p>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/40 rounded-2xl p-12 text-center">
                <div className="max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 px-4 py-2 rounded-full mb-6">
                    <AlertCircle className="w-5 h-5 text-orange-400" />
                    <span className="text-orange-400 font-bold">Nur noch wenige Plätze verfügbar</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Werden Sie einer der 10 Gründungspartner in Berlin
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Sichern Sie sich jetzt Ihren Platz und profitieren Sie von Anfang an 
                    von qualifizierten Leads und exklusiven Vorteilen.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="/partner-werden" 
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Rocket className="w-6 h-6" />
                      Jetzt Partner werden
                    </a>
                    
                    <button 
                      onClick={() => {
                        if (window.$zoho && window.$zoho.salesiq) {
                          window.$zoho.salesiq.floatwindow.visible('show');
                        }
                      }}
                      className="inline-flex items-center justify-center gap-2 bg-gray-800 border-2 border-gray-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:border-green-500 hover:bg-gray-700 transition-all duration-300"
                    >
                      <span className="text-2xl">💬</span>
                      Erst Rückfragen
                    </button>
                  </div>
                </div>
              </section>

              {/* FAQ Berlin Launch */}
              <section className="bg-gray-800/50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  Häufige Fragen zum Berlin-Launch
                </h2>
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="bg-gray-700/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">❓ Warum startet BALKONFUCHS nur mit 10 Partnern?</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Wir legen Wert auf <strong className="text-orange-400">Qualität statt Quantität</strong>. 
                      Mit 10 ausgewählten Partnern können wir intensive Betreuung bieten, Prozesse optimieren und 
                      gemeinsam die beste Plattform für Berlin aufbauen.
                    </p>
                  </div>

                  <div className="bg-gray-700/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">❓ Was passiert nach den ersten 10 Partnern?</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Nach erfolgreicher Bewährungsphase erweitern wir auf weitere Berliner Bezirke. 
                      Die Gründungspartner behalten dabei ihre <strong className="text-orange-400">Premiumstellung</strong> und Sonderkonditionen.
                    </p>
                  </div>

                  <div className="bg-gray-700/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">❓ Woher kommen die 850 zufriedenen Kunden?</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Das BALKONFUCHS-Team bringt <strong className="text-orange-400">jahrelange Branchenerfahrung</strong> mit. 
                      Die 850+ Kunden stammen aus unserer bisherigen Arbeit im Balkonbau. Dieses bewährte Know-how fließt 
                      nun in die neue Plattform ein – Sie profitieren von erprobten Prozessen, nicht von einem Experiment.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">💰 Welche Kosten kommen auf mich zu?</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      <strong className="text-green-400 text-lg">Bis Ende 2025: 100% GRATIS!</strong><br/>
                      Sie nutzen die komplette Plattform kostenfrei während der Launch-Phase.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-purple-400 text-lg">Ab 2026: Lebenslang -30%!</strong><br/>
                      Als Gründungspartner zahlen Sie für immer 30% weniger als alle Partner, die später dazukommen. 
                      Diese Vergünstigung gilt ein Leben lang – ohne zeitliche Begrenzung.
                    </p>
                  </div>

                  <div className="bg-gray-700/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">❓ Wie schnell kann ich starten?</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Nach erfolgreicher Bewerbung und Onboarding können Sie innerhalb von <strong className="text-orange-400">1-2 Wochen</strong> 
                      die ersten Leads erhalten.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="bg-gray-800/50 rounded-2xl p-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Noch Fragen zum Berlin-Launch?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Sprechen Sie direkt mit uns – schnell, unkompliziert und persönlich!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <button 
                    onClick={() => {
                      if (window.$zoho && window.$zoho.salesiq) {
                        window.$zoho.salesiq.floatwindow.visible('show');
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
                  >
                    <span className="text-2xl">💬</span>
                    Jetzt Live-Chat starten
                  </button>
                  
                  <a 
                    href="/partner-werden" 
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
                  >
                    <Rocket className="w-6 h-6" />
                    Direkt bewerben
                  </a>
                </div>
                
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 max-w-2xl mx-auto">
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-green-400">💬 Sofortige Antworten:</strong> Unser Chat-Team beantwortet Ihre Fragen 
                    in Echtzeit – persönlicher und schneller als E-Mail.
                  </p>
                  <p className="text-gray-400 text-sm mt-3">
                    Alternativ: <span 
                      className="text-indigo-400 cursor-pointer hover:text-indigo-300"
                      onClick={(e) => { 
                        e.preventDefault(); 
                        const email = 'partnerbewerbung' + '@' + 'balkonfuchs.de';
                        navigator.clipboard.writeText(email);
                        alert('E-Mail-Adresse kopiert: ' + email);
                      }}
                    >
                      E-Mail-Adresse kopieren
                    </span>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                © 2025 BALKONFUCHS GmbH - Partner Informationen Berlin
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

export default PartnerInfoBerlin;
