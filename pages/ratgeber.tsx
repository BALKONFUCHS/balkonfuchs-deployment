import React from 'react';
import Head from 'next/head';
import { ArrowLeft, Home, BookOpen, Calculator, Calendar, Shield, Building, Users, CheckCircle, Clock, AlertTriangle, Lightbulb, Target, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Ratgeber = () => {
  return (
    <>
      <Head>
        <title>Balkon Ratgeber - Projekt-Guides & Lösungsfinder | BALKONFUCHS</title>
        <meta name="description" content="Entdecken Sie praktische Projekt-Guides und finden Sie Lösungen für Ihre Balkon-Herausforderungen. Schritt-für-Schritt Anleitungen und problemorientierte Beratung für Ihren Balkonbau." />
        <meta name="keywords" content="balkon ratgeber, balkon projekt guide, balkon probleme lösen, balkon planung, balkon genehmigung, balkon kosten" />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Balkon Ratgeber - Projekt-Guides & Lösungsfinder | BALKONFUCHS" />
        <meta property="og:description" content="Entdecken Sie praktische Projekt-Guides und finden Sie Lösungen für Ihre Balkon-Herausforderungen." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/ratgeber" />
        <link rel="canonical" href="https://balkonfuchs.de/ratgeber" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />

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

            {/* Content */}
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                  <BookOpen className="w-16 h-16 text-orange-400" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">Balkon Ratgeber</h1>
                <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
                  <strong className="text-orange-400">Projekt-Guides & Lösungsfinder</strong> - Hier finden Sie praktische 
                  Schritt-für-Schritt Anleitungen und Lösungen für Ihre spezifischen Balkon-Herausforderungen.
                </p>
              </div>

              {/* Einführung */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Warum dieser Ratgeber?</h2>
                  <p className="text-gray-200 leading-relaxed">
                    Während unsere Tools Ihnen bei der konkreten Umsetzung helfen, bietet dieser Ratgeber 
                    <strong className="text-orange-400"> praktische Anleitungen</strong> und 
                    <strong className="text-orange-400"> Problemlösungen</strong>. Hier lernen Sie, 
                    wie Sie Ihr Balkon-Projekt strukturiert angehen und häufige Herausforderungen meistern können.
                  </p>
                </div>
              </section>

              {/* Projekt-Guides */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                  <Target className="w-8 h-8 text-orange-400 mr-3" />
                  Projekt-Guides: Balkon-Projekt von A bis Z
                </h2>
                
                <div className="space-y-6">
                  {/* Guide 1: Kompletter Projektablauf */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-orange-400">
                    <h3 className="text-2xl font-bold text-white mb-4">1. Kompletter Projektablauf</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Von der ersten Idee bis zur fertigen Balkon-Terrasse - hier erfahren Sie alle Schritte.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-orange-400 mb-3">Phase 1: Vorbereitung</h4>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">Bedarf definieren und Wünsche sammeln</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">Grundstück und Gebäude analysieren</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">Budget festlegen</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">Zeitplan erstellen</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-orange-400 mb-3">Phase 2: Planung</h4>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">Genehmigungsbedarf prüfen</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">Statische Berechnung beauftragen</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">Partner auswählen</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">Detaillierte Planung</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-blue-400 font-semibold mb-2">💡 Nutzen Sie unsere Tools:</p>
                      <div className="flex flex-wrap gap-2">
                        <a href="/kalkulator/" className="text-blue-300 hover:text-blue-200 underline">Kalkulator</a>
                        <span className="text-gray-400">•</span>
                        <a href="/genehmigung/" className="text-blue-300 hover:text-blue-200 underline">Genehmigungscheck</a>
                        <span className="text-gray-400">•</span>
                        <a href="/planer/" className="text-blue-300 hover:text-blue-200 underline">Planer</a>
                        <span className="text-gray-400">•</span>
                        <a href="/express-angebot/" className="text-blue-300 hover:text-blue-200 underline">Express-Angebot</a>
                      </div>
                    </div>
                  </div>

                  {/* Guide 2: Dokumenten-Checkliste */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-blue-400">
                    <h3 className="text-2xl font-bold text-white mb-4">2. Dokumenten-Checkliste</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Welche Unterlagen Sie wann brauchen - eine praktische Übersicht.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">Vor der Planung</h4>
                        <ul className="space-y-2 text-gray-300">
                          <li>• Grundbuchauszug</li>
                          <li>• Flurkarte</li>
                          <li>• Fotos des Gebäudes</li>
                          <li>• Bestehende Baupläne</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">Für die Genehmigung</h4>
                        <ul className="space-y-2 text-gray-300">
                          <li>• Bauantrag</li>
                          <li>• Statische Berechnung</li>
                          <li>• Lageplan</li>
                          <li>• Baubeschreibung</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">Für die Umsetzung</h4>
                        <ul className="space-y-2 text-gray-300">
                          <li>• Bauvertrag</li>
                          <li>• Gewährleistungsbürgschaft</li>
                          <li>• Bauzeitplan</li>
                          <li>• Zahlungsplan</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Guide 3: Zeitplan & Meilensteine */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-green-400">
                    <h3 className="text-2xl font-bold text-white mb-4">3. Zeitplan & Meilensteine</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Realistische Zeitplanung für Ihr Balkon-Projekt basierend auf unserem Terminplanungs-Funnel.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-gray-600/30 rounded-lg">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">1</div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-white">Erste Idee & Grundplanung</h5>
                          <p className="text-gray-300 text-sm">28-36 Wochen Vorlauf</p>
                        </div>
                        <Clock className="w-5 h-5 text-gray-400" />
                      </div>
                      
                      <div className="flex items-center p-3 bg-gray-600/30 rounded-lg">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">2</div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-white">Detaillierte Planung & Genehmigung</h5>
                          <p className="text-gray-300 text-sm">12-30 Wochen Vorlauf</p>
                        </div>
                        <Shield className="w-5 h-5 text-gray-400" />
                      </div>
                      
                      <div className="flex items-center p-3 bg-gray-600/30 rounded-lg">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">3</div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-white">Mit Genehmigung - Vorbereitung</h5>
                          <p className="text-gray-300 text-sm">8-16 Wochen Vorlauf</p>
                        </div>
                        <Building className="w-5 h-5 text-gray-400" />
                      </div>
                      
                      <div className="flex items-center p-3 bg-gray-600/30 rounded-lg">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">4</div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-white">Nur Umsetzung - Bauausführung</h5>
                          <p className="text-gray-300 text-sm">8-12 Wochen Vorlauf</p>
                        </div>
                        <Users className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-green-400 text-sm">
                        <strong>Gesamtzeit:</strong> 8-36 Wochen (abhängig von Ihrem aktuellen Projektstand)
                      </p>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-blue-400 text-sm">
                        <strong>💡 Tipp:</strong> Nutzen Sie unseren{' '}
                        <a href="/bauzeit-planung/" className="text-blue-300 hover:text-blue-200 underline">Terminplanungs-Funnel</a>{' '}
                        für eine präzise Zeitplanung basierend auf Ihrem aktuellen Projektstand!
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Lösungsfinder */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                  <Lightbulb className="w-8 h-8 text-orange-400 mr-3" />
                  Lösungsfinder: Häufige Herausforderungen meistern
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Problem 1: Zu wenig Platz */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-red-400">
                    <h3 className="text-xl font-bold text-white mb-3">🚨 "Mein Balkon ist zu klein!"</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Sie haben nur wenig Platz, möchten aber trotzdem einen Balkon nutzen?
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-red-400">Lösungsansätze:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Klapptisch und -stühle für flexible Nutzung</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Vertikale Begrünung statt horizontaler Pflanzen</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Multifunktionale Möbel (Sitzbank mit Stauraum)</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Hängende Pflanzgefäße an der Brüstung</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Problem 2: Zu wenig Licht */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-yellow-400">
                    <h3 className="text-xl font-bold text-white mb-3">🌑 "Mein Balkon ist zu dunkel!"</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Schattige Balkone können trotzdem gemütlich und funktional sein.
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-yellow-400">Lösungsansätze:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Schattenliebende Pflanzen (Farn, Efeu, Funkien)</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Helle Möbel und Accessoires für mehr Helligkeit</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">LED-Beleuchtung für abendliche Atmosphäre</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Spiegel oder reflektierende Oberflächen</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Problem 3: Zu laut */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-purple-400">
                    <h3 className="text-xl font-bold text-white mb-3">🔊 "Mein Balkon ist zu laut!"</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Lärmbelästigung kann die Balkon-Nutzung erheblich einschränken.
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-purple-400">Lösungsansätze:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Lärmschutzwände oder -matten an der Brüstung</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Dichte Hecken oder Sträucher als natürlicher Schallschutz</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Wasserfontäne für beruhigende Geräusche</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Balkonüberdachung zur Schallreflexion</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Problem 4: Zu wenig Privatsphäre */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-green-400">
                    <h3 className="text-xl font-bold text-white mb-3">👁️ "Ich habe keine Privatsphäre!"</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Nachbarn können direkt auf Ihren Balkon schauen?
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-400">Lösungsansätze:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Bambusmatten oder Sichtschutzfolien</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Hochwachsende Pflanzen (Bambus, Schilf)</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Sichtschutzwände aus Holz oder Kunststoff</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Balkonüberdachung mit seitlichen Wänden</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Problem 5: Zu teuer */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-cyan-400">
                    <h3 className="text-xl font-bold text-white mb-3">💰 "Ein Balkon ist zu teuer!"</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Kosten können durch geschickte Planung erheblich reduziert werden.
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-cyan-400">Lösungsansätze:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Einfache Bauweise (Anlehnbalkon statt Hängebalkon)</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Standardmaterialien statt Premium-Produkte</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Schrittweise Umsetzung (erst Grundkonstruktion)</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Mehrere Angebote einholen und vergleichen</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                      <p className="text-cyan-400 text-sm">
                        <strong>💡 Kostencheck:</strong> Nutzen Sie unseren{' '}
                        <a href="/kalkulator/" className="text-cyan-300 hover:text-cyan-200 underline">Balkon-Kalkulator</a>{' '}
                        für eine erste Kostenschätzung!
                      </p>
                    </div>
                  </div>

                  {/* Problem 6: Genehmigungsprobleme */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-red-500">
                    <h3 className="text-xl font-bold text-white mb-3">📋 "Ich bekomme keine Genehmigung!"</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Genehmigungsprobleme können gelöst werden.
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-red-500">Lösungsansätze:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-400 text-sm">Kleinere Dimensionen wählen</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-400 text-sm">Abstände zur Grundstücksgrenze vergrößern</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-400 text-sm">Alternative Bauweisen prüfen</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-400 text-sm">Professionelle Beratung einholen</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-red-400 text-sm">
                        <strong>Tipp:</strong> Nutzen Sie unseren{' '}
                        <a href="/genehmigung/" className="text-red-300 hover:text-red-200 underline">Genehmigungscheck</a>{' '}
                        für eine erste Einschätzung!
                      </p>
                    </div>
                  </div>

                  {/* Problem 7: Balkon planen */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-indigo-400">
                    <h3 className="text-xl font-bold text-white mb-3">📐 "Wie plane ich einen Balkon?"</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Eine gute Planung ist die Grundlage für ein erfolgreiches Balkon-Projekt.
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-indigo-400">Planungsschritte:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Grundstück und Gebäude analysieren</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Genehmigungsbedarf prüfen</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Statische Anforderungen klären</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Budget und Zeitplan festlegen</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                      <p className="text-indigo-400 text-sm">
                        <strong>💡 Nutzen Sie:</strong> Unseren{' '}
                        <a href="/planer/" className="text-indigo-300 hover:text-indigo-200 underline">Balkon-Planer</a>{' '}
                        für eine strukturierte Projektplanung!
                      </p>
                    </div>
                  </div>

                  {/* Problem 8: Balkon-Typen */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-violet-400">
                    <h3 className="text-xl font-bold text-white mb-3">🏗️ "Welche Balkon-Typen gibt es?"</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Verschiedene Bauweisen für unterschiedliche Anforderungen und Standorte.
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-violet-400">Balkon-Arten:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Anlehnbalkon - Klassisch und günstig</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Hängebalkon - Platzsparend, moderne Optik</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Anstellbalkon - Denkmalschutz-schonend</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Modulbalkon - Schnell und standardisiert</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                      <p className="text-violet-400 text-sm">
                        <strong>📚 Mehr Details:</strong> Schauen Sie in unser{' '}
                        <a href="/lexikon/" className="text-violet-300 hover:text-violet-200 underline">Balkon-Lexikon</a>{' '}
                        für detaillierte Erklärungen aller Bauweisen!
                      </p>
                    </div>
                  </div>

                  {/* Problem 9: Selber bauen oder Handwerker */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-emerald-400">
                    <h3 className="text-xl font-bold text-white mb-3">🔨 "Balkon selber bauen oder Handwerker?"</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Die Entscheidung zwischen Eigenleistung und professioneller Ausführung.
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-emerald-400">Abwägung:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Selber bauen: Günstiger, aber hoher Zeitaufwand</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Handwerker: Professionell, aber höhere Kosten</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Mischform: Grundkonstruktion vom Profi, Ausbau selbst</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Beratung: Lassen Sie sich von Experten beraten</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                      <p className="text-emerald-400 text-sm">
                        <strong>🤝 Partner finden:</strong> Nutzen Sie unsere{' '}
                        <a href="partner-werden" className="text-emerald-300 hover:text-emerald-200 underline">Partnerbewerbung</a>{' '}
                        für qualifizierte Handwerker!
                      </p>
                    </div>
                  </div>

                  {/* Problem 10: Beste Zeit für Balkonbau */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-amber-400">
                    <h3 className="text-xl font-bold text-white mb-3">🌱 "Wann ist die beste Zeit für Balkonbau?"</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Die Jahreszeit kann den Erfolg Ihres Balkon-Projekts beeinflussen.
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-amber-400">Jahreszeiten-Empfehlung:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Winter: Perfekt für Planung und Genehmigungen</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Frühjahr: Ideale Bauzeit, aber hohe Nachfrage</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Sommer: Gute Bauzeit, aber heiß und teuer</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Herbst: Entspannte Planung, moderate Preise</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <p className="text-amber-400 text-sm">
                        <strong>📅 Zeitplanung:</strong> Nutzen Sie unseren{' '}
                        <a href="/bauzeit-planung/" className="text-amber-300 hover:text-amber-200 underline">Terminplanungs-Funnel</a>{' '}
                        für die optimale Projektplanung!
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Weitere hilfreiche Ressourcen */}
              <section className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">📚 Weitere hilfreiche Ressourcen</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <a href="/balkonanbau-kosten" className="bg-gray-700/30 border border-gray-600 rounded-xl p-6 hover:bg-gray-700 transition-all group">
                    <div className="text-4xl mb-4">💰</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Balkonanbau Kosten</h3>
                    <p className="text-gray-400 text-sm">Detaillierte Kostenübersicht für alle Balkontypen</p>
                  </a>
                  
                  <a href="/balkontypen-vergleich" className="bg-gray-700/30 border border-gray-600 rounded-xl p-6 hover:bg-gray-700 transition-all group">
                    <div className="text-4xl mb-4">🏗️</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Balkontypen Vergleich</h3>
                    <p className="text-gray-400 text-sm">Hänge- vs Vorstellbalkon - alle Unterschiede</p>
                  </a>
                  
                  <a href="/materialien" className="bg-gray-700/30 border border-gray-600 rounded-xl p-6 hover:bg-gray-700 transition-all group">
                    <div className="text-4xl mb-4">🔧</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Material-Guide</h3>
                    <p className="text-gray-400 text-sm">Holz, Stahl, Aluminium - Materialien im Vergleich</p>
                  </a>
                  
                  <a href="/altbau-vs-neubau" className="bg-gray-700/30 border border-gray-600 rounded-xl p-6 hover:bg-gray-700 transition-all group">
                    <div className="text-4xl mb-4">🏠</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Altbau vs Neubau</h3>
                    <p className="text-gray-400 text-sm">Unterschiede beim Balkonanbau</p>
                  </a>
                  
                  <a href="/balkonbau-berlin" className="bg-gray-700/30 border border-gray-600 rounded-xl p-6 hover:bg-gray-700 transition-all group">
                    <div className="text-4xl mb-4">🏙️</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Balkonbau Berlin</h3>
                    <p className="text-gray-400 text-sm">Firmen, Kosten und Genehmigung in Berlin</p>
                  </a>
                  
                  <a href="/balkonbau-muenchen" className="bg-gray-700/30 border border-gray-600 rounded-xl p-6 hover:bg-gray-700 transition-all group">
                    <div className="text-4xl mb-4">🏔️</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Balkonbau München</h3>
                    <p className="text-gray-400 text-sm">Anbieter und Preise in München</p>
                  </a>
                </div>
              </section>

              {/* Call-to-Action */}
              <section className="mb-8">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Bereit für die Umsetzung?</h2>
                  <p className="text-white mb-6 text-lg">
                    Nutzen Sie unsere praktischen Tools für die konkrete Umsetzung Ihres Projekts
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <a href="/kalkulator/" className="bg-white text-orange-600 p-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      <Calculator className="w-6 h-6 mx-auto mb-2" />
                      Kosten kalkulieren
                    </a>
                    <a href="/genehmigung/" className="bg-white text-orange-600 p-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      <Shield className="w-6 h-6 mx-auto mb-2" />
                      Genehmigung prüfen
                    </a>
                    <a href="/planer/" className="bg-white text-orange-600 p-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      <Calendar className="w-6 h-6 mx-auto mb-2" />
                      Projekt planen
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

export default Ratgeber;
