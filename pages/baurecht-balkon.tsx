import React from 'react';
import Head from 'next/head';
import { ArrowRight, CheckCircle, AlertTriangle, MapPin, FileText, Calculator, Calendar, Shield, Building, Euro, Users, ExternalLink } from 'lucide-react';

const BaurechtBalkonPage = () => {
  return (
    <>
      <Head>
        <title>Balkon und Baurecht 2026 - Genehmigungen in allen Bundesländern | BALKONFUCHS</title>
        <meta name="description" content="Aktuelle Informationen zu Balkon-Genehmigungen 2026: Baurecht, Anforderungen in allen Bundesländern, Kosten und Genehmigungsverfahren. Mit unserem Genehmigungscheck schnell prüfen!" />
        <meta name="keywords" content="balkon baurecht 2026, balkon genehmigung bundesländer, balkon anbauen genehmigung, balkon baurecht deutschland, balkon genehmigungsverfahren, balkon nachträglich anbauen genehmigung" />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Balkon und Baurecht 2026 - Genehmigungen in allen Bundesländern" />
        <meta property="og:description" content="Aktuelle Informationen zu Balkon-Genehmigungen 2026: Baurecht, Anforderungen in allen Bundesländern und Genehmigungsverfahren." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://balkonfuchs.de/baurecht-balkon" />
        <link rel="canonical" href="https://balkonfuchs.de/baurecht-balkon" />
        
        {/* Strukturierte Daten für SEO-KI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Balkon und Baurecht 2025 - Genehmigungen in allen Bundesländern",
              "description": "Aktuelle Informationen zu Balkon-Genehmigungen 2025: Baurecht, Anforderungen in allen Bundesländern, Kosten und Genehmigungsverfahren.",
              "image": "https://balkonfuchs.de/Bilddaten/Balkonfuchs-Logo_white.png",
              "author": {
                "@type": "Organization",
                "name": "BALKONFUCHS"
              },
              "publisher": {
                "@type": "Organization",
                "name": "BALKONFUCHS",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://balkonfuchs.de/Bilddaten/Balkonfuchs-Logo_white.png"
                }
              },
              "datePublished": "2025-01-27",
              "dateModified": "2025-01-27",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://balkonfuchs.de/baurecht-balkon"
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
                  "name": "Brauche ich eine Genehmigung für meinen Balkon?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "In den meisten Fällen ja. Ein nachträglich angebauter Balkon verändert das äußere Erscheinungsbild des Gebäudes und erfordert daher eine Baugenehmigung. Die genauen Anforderungen variieren je nach Bundesland."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Welche Unterlagen brauche ich für die Genehmigung?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sie benötigen: Bauantrag, Grundriss, Ansicht, Lageplan, statische Berechnung, Baubeschreibung und bei Eigentümergemeinschaften die Zustimmung der anderen Eigentümer."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Wie lange dauert das Genehmigungsverfahren?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Das Genehmigungsverfahren dauert in der Regel 4-8 Wochen, kann aber je nach Bundesland und Komplexität des Projekts variieren."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Kann ich einen Balkon ohne Genehmigung bauen?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nein, das ist nicht empfehlenswert. Ein Verstoß gegen das Baurecht kann teure Nachrüstungen oder gar den Rückbau zur Folge haben. Nutzen Sie unseren Genehmigungscheck für eine sichere Einschätzung."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <img 
                  src="/logos/balkonfuchs-logo.png" 
                  alt="BALKONFUCHS Logo" 
                  className="h-10 w-auto"
                />
              </div>
              
              {/* Desktop Navigation */}
                                <nav className="hidden md:flex space-x-8">
           <a href="/kalkulator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Kalkulator</a>
           <a href="/planer/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Planer</a>
           <a href="/express-angebot/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Angebot</a>
           <a href="/genehmigung/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Genehmigungscheck</a>
           <a href="/konfigurator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Konfigurator</a>
         </nav>

              <div className="hidden md:flex items-center space-x-4">
                <a href="/partner-info/" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                  Partner werden
                </a>
              </div>

              {/* Mobile menu button */}
              <button className="md:hidden text-gray-300">
                <span className="sr-only">Menü öffnen</span>
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <div className="w-6 h-1 bg-gray-300 rounded mb-1"></div>
                  <div className="w-6 h-1 bg-gray-300 rounded mb-1"></div>
                  <div className="w-6 h-1 bg-gray-300 rounded"></div>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Balkon und <span className="text-orange-400">Baurecht 2025</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Aktuelle Informationen zu Genehmigungen, Anforderungen in allen Bundesländern und 
                dem sicheren Weg zu Ihrem Balkon-Projekt. Mit unserem <strong className="text-orange-400">Genehmigungscheck</strong> 
                prüfen Sie in nur 2 Minuten, ob Sie eine Genehmigung brauchen.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/balkon-genehmigung-check/" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Shield className="w-5 h-5" />
                  Genehmigung jetzt prüfen
                  <ArrowRight className="w-5 h-5" />
                </a>
                
                <a 
                  href="/kalkulator/" 
                  className="bg-gray-700 text-white px-6 py-4 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Kosten kalkulieren
                </a>
              </div>
            </div>

            {/* Wichtige Hinweise */}
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8 mb-16">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-8 h-8 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    ⚠️ Wichtiger Hinweis: Baurecht ändert sich!
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Die Informationen in diesem Artikel basieren auf dem aktuellen Baurecht 2025. 
                    Da sich Gesetze und Verordnungen ändern können, empfehlen wir dringend, 
                    vor jedem Balkon-Projekt unseren <strong className="text-orange-400">Genehmigungscheck</strong> zu nutzen.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Unser Tipp:</strong> Nutzen Sie unseren kostenlosen Genehmigungscheck - 
                    er berücksichtigt automatisch die aktuellsten Vorschriften für Ihr Bundesland.
                  </p>
                </div>
              </div>
            </div>

            {/* Grundlagen Balkon und Baurecht */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Grundlagen: Wann brauchen Sie eine Genehmigung?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl mb-4">✅</div>
                  <h3 className="text-xl font-semibold text-white mb-4">Genehmigung erforderlich bei:</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Nachträglicher Balkonanbau an bestehende Gebäude</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Veränderung des äußeren Erscheinungsbildes</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Überschreitung bestimmter Größen-Grenzen</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Balkone in Denkmalschutz-Gebieten</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Balkone in bestimmten Bebauungsplänen</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl mb-4">❌</div>
                  <h3 className="text-xl font-semibold text-white mb-4">Keine Genehmigung bei:</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Balkone in Neubauten (bereits genehmigt)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Kleine Terrassen unter bestimmten Bedingungen</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Balkone in genehmigten Bebauungsplänen</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Bestimmte Loggia-Formen (je nach Bundesland)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Bundesland-spezifische Anforderungen */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Bundesland-spezifische Anforderungen 2025
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Bayern */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-6 h-6 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Bayern</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Genehmigung meist erforderlich</li>
                    <li>• Strenge Vorgaben bei Denkmalschutz</li>
                    <li>• Statische Nachweise obligatorisch</li>
                    <li>• Bearbeitungszeit: 6-8 Wochen</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <span className="text-xs text-orange-400 font-semibold">Hinweis:</span>
                    <p className="text-xs text-gray-400 mt-1">Bayern hat die strengsten Vorgaben für nachträgliche Balkonanbauten.</p>
                  </div>
                </div>

                {/* Baden-Württemberg */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-lg font-semibold text-white">Baden-Württemberg</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Genehmigung erforderlich</li>
                    <li>• Umweltverträglichkeitsprüfung möglich</li>
                    <li>• Städtebauliche Verträge üblich</li>
                    <li>• Bearbeitungszeit: 4-6 Wochen</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <span className="text-xs text-orange-400 font-semibold">Hinweis:</span>
                    <p className="text-xs text-gray-400 mt-1">Besonders bei historischen Gebäuden strenge Auflagen.</p>
                  </div>
                </div>

                {/* Nordrhein-Westfalen */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-6 h-6 text-green-400" />
                    <h3 className="text-lg font-semibold text-white">Nordrhein-Westfalen</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Genehmigung erforderlich</li>
                    <li>• Bebauungsplan-Überprüfung</li>
                    <li>• Nachbarschaftsrecht beachten</li>
                    <li>• Bearbeitungszeit: 4-8 Wochen</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <span className="text-xs text-orange-400 font-semibold">Hinweis:</span>
                    <p className="text-xs text-gray-400 mt-1">Städtische Gebiete haben oft eigene Vorschriften.</p>
                  </div>
                </div>

                {/* Hessen */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-6 h-6 text-red-400" />
                    <h3 className="text-lg font-semibold text-white">Hessen</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Genehmigung erforderlich</li>
                    <li>• Hessische Bauordnung beachten</li>
                    <li>• Brandschutz-Vorgaben</li>
                    <li>• Bearbeitungszeit: 5-7 Wochen</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <span className="text-xs text-orange-400 font-semibold">Hinweis:</span>
                    <p className="text-xs text-gray-400 mt-1">Brandschutz spielt eine wichtige Rolle.</p>
                  </div>
                </div>

                {/* Niedersachsen */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-6 h-6 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Niedersachsen</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Genehmigung erforderlich</li>
                    <li>• Niedersächsische Bauordnung</li>
                    <li>• Ländliche Gebiete: weniger streng</li>
                    <li>• Bearbeitungszeit: 4-6 Wochen</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <span className="text-xs text-orange-400 font-semibold">Hinweis:</span>
                    <p className="text-xs text-gray-400 mt-1">Ländliche Gebiete haben oft lockerere Vorgaben.</p>
                  </div>
                </div>

                {/* Weitere Bundesländer */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-6 h-6 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">Weitere Bundesländer</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Brandenburg: 4-6 Wochen</li>
                    <li>• Sachsen: 5-7 Wochen</li>
                    <li>• Thüringen: 4-6 Wochen</li>
                    <li>• Mecklenburg-Vorpommern: 4-6 Wochen</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <span className="text-xs text-orange-400 font-semibold">Hinweis:</span>
                    <p className="text-xs text-gray-400 mt-1">Jedes Bundesland hat eigene Besonderheiten.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Genehmigungsverfahren */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Genehmigungsverfahren Schritt für Schritt
              </h2>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6">📋 Benötigte Unterlagen:</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>Bauantrag (Formular der Gemeinde)</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>Grundriss des Balkons (Maßstab 1:50)</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>Ansicht von außen (Maßstab 1:50)</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>Lageplan (Maßstab 1:500)</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>Statische Berechnung (Ingenieur)</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>Baubeschreibung</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>Zustimmung der Eigentümergemeinschaft</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6">⏱️ Zeitplan:</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                        <div>
                          <p className="text-white font-medium">Antrag einreichen</p>
                          <p className="text-gray-400 text-sm">Alle Unterlagen vollständig einreichen</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                        <div>
                          <p className="text-white font-medium">Prüfung durch Behörde</p>
                          <p className="text-gray-400 text-sm">4-8 Wochen Bearbeitungszeit</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                        <div>
                          <p className="text-white font-medium">Genehmigung erhalten</p>
                          <p className="text-gray-400 text-sm">Bau kann beginnen</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                        <div>
                          <p className="text-white font-medium">Bauausführung</p>
                          <p className="text-gray-400 text-sm">Nach genehmigten Plänen</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Kosten und Kalkulation */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Kosten und Kalkulation für Balkon-Genehmigungen
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl mb-4">💰</div>
                  <h3 className="text-xl font-semibold text-white mb-4">Genehmigungskosten:</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center justify-between">
                      <span>Bauantragsgebühr:</span>
                      <span className="text-orange-400 font-semibold">200€ - 800€</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Statische Berechnung:</span>
                      <span className="text-orange-400 font-semibold">500€ - 1.500€</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Architektenleistungen:</span>
                      <span className="text-orange-400 font-semibold">1.000€ - 3.000€</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Grundbuchauszug:</span>
                      <span className="text-orange-400 font-semibold">20€ - 50€</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Gesamtkosten:</span>
                      <span className="text-orange-400 font-bold text-lg">1.720€ - 5.350€</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 pt-4 border-t border-gray-600">
                    <a 
                      href="/kalkulator/" 
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Calculator className="w-4 h-4" />
                      Kosten jetzt kalkulieren
                    </a>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold text-white mb-4">Schnell-Check:</h3>
                  <p className="text-gray-300 mb-4">
                    Nutzen Sie unseren kostenlosen <strong className="text-orange-400">Genehmigungscheck</strong> 
                    für eine erste Einschätzung in nur 2 Minuten:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Genehmigung erforderlich?</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Benötigte Unterlagen</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Geschätzte Bearbeitungszeit</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Kosten-Einschätzung</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-600">
                    <a 
                      href="/balkon-genehmigung-check/" 
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Shield className="w-4 h-4" />
                      Genehmigung jetzt prüfen
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Häufige Fragen zu Balkon und Baurecht
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">❓ Brauche ich eine Genehmigung für meinen Balkon?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    In den meisten Fällen ja. Ein nachträglich angebauter Balkon verändert das äußere Erscheinungsbild des Gebäudes und erfordert daher eine Baugenehmigung. Die genauen Anforderungen variieren je nach Bundesland.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">❓ Welche Unterlagen brauche ich für die Genehmigung?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Sie benötigen: Bauantrag, Grundriss, Ansicht, Lageplan, statische Berechnung, Baubeschreibung und bei Eigentümergemeinschaften die Zustimmung der anderen Eigentümer.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">❓ Wie lange dauert das Genehmigungsverfahren?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Das Genehmigungsverfahren dauert in der Regel 4-8 Wochen, kann aber je nach Bundesland und Komplexität des Projekts variieren.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">❓ Kann ich einen Balkon ohne Genehmigung bauen?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Nein, das ist nicht empfehlenswert. Ein Verstoß gegen das Baurecht kann teure Nachrüstungen oder gar den Rückbau zur Folge haben. Nutzen Sie unseren Genehmigungscheck für eine sichere Einschätzung.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">❓ Was passiert, wenn ich ohne Genehmigung baue?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Ein Verstoß gegen das Baurecht kann teure Folgen haben: Nachrüstungsauflagen, Rückbau-Anordnung, Bußgelder und Probleme beim Verkauf der Immobilie.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">❓ Gibt es Ausnahmen von der Genehmigungspflicht?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Ja, aber diese sind sehr begrenzt und gelten meist nur für sehr kleine Balkone oder Terrassen unter bestimmten Bedingungen. Im Zweifelsfall immer den Genehmigungscheck nutzen.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Bereit für Ihren Balkon? Lassen Sie uns das klären!
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Nutzen Sie unsere Tools für eine sichere und kostengünstige Umsetzung Ihres Balkon-Projekts. 
                Von der Genehmigung bis zur Kalkulation - wir begleiten Sie durch den gesamten Prozess.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <a 
                  href="/balkon-genehmigung-check/" 
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Genehmigung prüfen
                </a>
                
                <a 
                  href="/kalkulator/" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  Kosten kalkulieren
                </a>
                
                <a 
                  href="/planer/" 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Building className="w-4 h-4" />
                  Projekt planen
                </a>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-2xl font-bold text-orange-500 mb-4">🦊 BALKONFUCHS</div>
                <p className="text-gray-400 mb-4 leading-relaxed">Deutschlands führende Plattform für Balkon-Projekte. Über 850 zufriedene Kunden vertrauen uns.</p>
                <div className="flex space-x-4">
                  <a href="mailto:office@balkonfuchs.de" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                    <span className="text-white">📧</span>
                  </a>
                </div>
              </div>
                                  <div>
            <h4 className="text-lg font-semibold text-white mb-4">Service</h4>
            <ul className="space-y-2">
              <li><a href="/kalkulator/" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Kalkulator</a></li>
              <li><a href="/planer/" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Planer</a></li>
              <li><a href="/express-angebot/" className="text-gray-400 hover:text-orange-400 transition-colors">Angebot</a></li>
              <li><a href="/genehmigung/" className="text-gray-400 hover:text-orange-400 transition-colors">Genehmigungscheck</a></li>
              <li><a href="/bauzeit-planung/" className="text-gray-400 hover:text-orange-400 transition-colors">Baustart Rechner</a></li>
              <li><a href="/konfigurator/" className="text-gray-400 hover:text-orange-400 transition-colors">Konfigurator</a></li>
              <li><a href="/erfahrungen/" className="text-gray-400 hover:text-orange-400 transition-colors">Erfahrungen</a></li>
              <li><a href="/galerie/" className="text-gray-400 hover:text-orange-400 transition-colors">Galerie</a></li>
            </ul>
          </div>
              <div>
            <h4 className="text-lg font-semibold text-white mb-4">Wissen</h4>
            <ul className="space-y-2">
              <li><a href="/news/" className="text-gray-400 hover:text-orange-400 transition-colors">News</a></li>
              <li><a href="/foerderung/" className="text-gray-400 hover:text-orange-400 transition-colors">Förderung</a></li>
              <li><a href="/baurecht-balkon/" className="text-gray-400 hover:text-orange-400 transition-colors">Baurecht & Genehmigungen</a></li>
              <li><a href="/ratgeber/" className="text-gray-400 hover:text-orange-400 transition-colors">Ratgeber</a></li>
              <li><a href="/lexikon/" className="text-gray-400 hover:text-orange-400 transition-colors">Lexikon</a></li>
              <li><a href="/faq/" className="text-gray-400 hover:text-orange-400 transition-colors">FAQ</a></li>
              <li><a href="/feedback/" className="text-gray-400 hover:text-orange-400 transition-colors">Feedback</a></li>
            </ul>
              </div>
                                  <div>
            <h4 className="text-lg font-semibold text-white mb-4">Unternehmen</h4>
            <ul className="space-y-2">
              <li><a href="/about/" className="text-gray-400 hover:text-orange-400 transition-colors">Über uns</a></li>
              <li><a href="/karriere/" className="text-gray-400 hover:text-orange-400 transition-colors">Karriere</a></li>
              <li><a href="/partner-werden/" className="text-gray-400 hover:text-orange-400 transition-colors">Partnerbewerbung</a></li>
              <li><a href="/partner-info/" className="text-gray-400 hover:text-orange-400 transition-colors">Partner Vorabinfos</a></li>
              <li><a href="/kontakt/" className="text-gray-400 hover:text-orange-400 transition-colors">Kontakt</a></li>
            </ul>
          </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm mb-4 md:mb-0">
                  © 2024 BALKONFUCHS. Alle Rechte vorbehalten.
                </p>
                <div className="flex space-x-6">
                  <a href="/impressum" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">Impressum</a>
                  <a href="/datenschutz/" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">Datenschutzhinweise</a>
                  <a href="/agb" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">AGB</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default BaurechtBalkonPage;

