import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Home, Euro, Calculator, Shield, Building, Users, CheckCircle, Clock, AlertTriangle, Lightbulb, Target, ArrowRight, ExternalLink, Award, TrendingUp, Calendar } from 'lucide-react';

const Foerderung = () => {
  return (
    <>
      <Head>
        <title>Balkon Förderung - KfW & Zuschüsse für Balkon-Projekte | BALKONFUCHS</title>
        <meta name="description" content="Entdecken Sie alle Fördermöglichkeiten für Ihr Balkon-Projekt: KfW-Zuschüsse, energetische Sanierung, Denkmalschutz-Förderung und mehr. Jetzt informieren und sparen!" />
        <meta name="keywords" content="balkon förderung, kfw balkon, balkon zuschuss, energetische sanierung, denkmalschutz förderung, balkon kredit, balkonbau förderung, balkon zuschuss 2025, kfw energetische sanierung balkon, denkmalschutz balkon förderung" />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Balkon Förderung - KfW & Zuschüsse für Balkon-Projekte | BALKONFUCHS" />
        <meta property="og:description" content="Entdecken Sie alle Fördermöglichkeiten für Ihr Balkon-Projekt: KfW-Zuschüsse, energetische Sanierung und mehr." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/foerderung" />
        <link rel="canonical" href="https://balkonfuchs.de/foerderung" />
        
        {/* Strukturierte Daten für SEO-KI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Welche Förderung gibt es für meinen Balkon?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Für Balkon-Projekte gibt es verschiedene KfW-Programme: KfW 261 (energetische Sanierung), KfW 124 (Wohnraum modernisieren), KfW 159 (Denkmalschutz) und KfW 300 (energieeffizient bauen). Zusätzlich können kommunale Förderungen und steuerliche Abschreibungen genutzt werden."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Wie bekomme ich eine KfW-Förderung für meinen Balkon?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Für eine KfW-Förderung benötigen Sie: einen Antrag vor Baubeginn, einen Fachplaner, einen Fachunternehmer und ein Gebäude, das vor 2002 errichtet wurde (bei energetischer Sanierung). Die Förderung kann bis zu 20% der Kosten betragen."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Welche Kosten werden bei der Balkon-Förderung übernommen?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Gefördert werden die förderfähigen Kosten für Material, Handwerker, Planung und energetische Verbesserungen. Die Förderung beträgt je nach Programm 20-30% der Kosten, bei Krediten bis zu 50.000€ pro Wohneinheit."
                  }
                }
              ]
            })
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BALKONFUCHS",
              "url": "https://balkonfuchs.de",
              "logo": "https://balkonfuchs.de/logos/balkonfuchs-logo.png",
              "description": "Deutschlands führende Plattform für Balkon-Projekte",
              "sameAs": [
                "https://balkonfuchs.de/foerderung",
                "https://balkonfuchs.de/kalkulator",
                "https://balkonfuchs.de/planer"
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />

        {/* Main Content */}
        <main className="py-16 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <a href="/" className="inline-flex items-center text-gray-400 hover:text-orange-400 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zur Startseite
              </a>
            </nav>

            {/* Content */}
            <article className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                  <Euro className="w-16 h-16 text-orange-400" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">Balkon Förderung</h1>
                <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
                  <strong className="text-orange-400">Sparen Sie Geld</strong> mit den richtigen Fördermöglichkeiten für Ihr Balkon-Projekt. 
                  Entdecken Sie KfW-Zuschüsse, energetische Sanierung und weitere Förderprogramme.
                </p>
              </div>

              {/* Einführung */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Warum Balkon-Förderung?</h2>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    Ein Balkon-Projekt kann teuer werden, aber es gibt zahlreiche <strong className="text-orange-400">Fördermöglichkeiten</strong>, 
                    die Ihnen helfen können, die Kosten erheblich zu reduzieren. Von KfW-Zuschüssen bis hin zu 
                    energetischen Sanierungsprogrammen - wir zeigen Ihnen alle Optionen auf.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-gray-700/20 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-orange-400 mb-2">💰 Kosten sparen</h3>
                      <p className="text-gray-300 text-sm">
                        Mit der richtigen Förderung können Sie <strong className="text-green-400">20-30% der Kosten</strong> sparen. 
                        Das macht den Unterschied zwischen "machbar" und "zu teuer".
                      </p>
                    </div>
                    
                    <div className="bg-gray-700/20 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-orange-400 mb-2">🏠 Wertsteigerung</h3>
                      <p className="text-gray-300 text-sm">
                        Ein geförderter Balkon steigert den <strong className="text-blue-400">Immobilienwert</strong> und verbessert 
                        die <strong className="text-blue-400">Wohnqualität</strong> nachhaltig.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Hauptfrage */}
              <section className="mb-12">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Lightbulb className="w-8 h-8 text-blue-400 mr-3" />
                    "Welche Förderung gibt es für meinen Balkon?"
                  </h2>
                  <p className="text-gray-200 leading-relaxed">
                    Diese Frage stellen sich viele Bauherren. Die Antwort hängt von verschiedenen Faktoren ab: 
                    Art des Balkons, energetische Verbesserungen, Denkmalschutz und mehr. 
                    Hier finden Sie eine Übersicht aller relevanten Fördermöglichkeiten.
                  </p>
                </div>
              </section>

              {/* KfW-Fördermöglichkeiten */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                  <Award className="w-8 h-8 text-orange-400 mr-3" />
                  KfW-Fördermöglichkeiten für Balkon-Projekte
                </h2>
                
                <div className="space-y-6">
                  {/* KfW 261 - Energetische Sanierung */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-green-400">
                    <h3 className="text-2xl font-bold text-white mb-4">🏠 KfW 261: Energetische Sanierung</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      <strong className="text-orange-400">Förderung für energetische Verbesserungen</strong> bei bestehenden Gebäuden, 
                      die auch Balkon-Projekte umfassen kann.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-green-400 mb-3">Förderung:</h4>
                        <div className="space-y-2 text-gray-200">
                          <p><strong className="text-orange-400">Zuschuss:</strong> Bis zu 20% der förderfähigen Kosten</p>
                          <p><strong className="text-orange-400">Kredit:</strong> Bis zu 50.000€ pro Wohneinheit</p>
                          <p><strong className="text-orange-400">Tilgungszuschuss:</strong> Bis zu 27,5%</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-green-400 mb-3">Voraussetzungen:</h4>
                        <div className="space-y-2 text-gray-200">
                          <p>• Gebäude vor 2002 errichtet</p>
                          <p>• Energetische Verbesserungen</p>
                          <p>• Fachplaner und Fachunternehmer</p>
                          <p>• Antrag vor Baubeginn</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <p className="text-green-400 font-semibold mb-2">💡 Wichtig:</p>
                      <p className="text-gray-300 text-sm">
                        Balkon-Projekte können gefördert werden, wenn sie energetische Verbesserungen mit sich bringen, 
                        z.B. durch bessere Dämmung oder moderne Materialien.
                      </p>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-blue-400 text-sm">
                        <strong>🔗 Mehr Infos:</strong> Besuchen Sie die{' '}
                        <a href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestandsimmobilie/Energetische-Sanierung/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">
                          KfW-Seite zur energetischen Sanierung <ExternalLink className="w-3 h-3 inline ml-1" />
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* KfW 124 - Wohnraum modernisieren */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-blue-400">
                    <h3 className="text-2xl font-bold text-white mb-4">🏡 KfW 124: Wohnraum modernisieren</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      <strong className="text-orange-400">Kredit für Modernisierungsmaßnahmen</strong> in bestehenden Wohngebäuden, 
                      einschließlich Balkon-Anbauten und -Sanierungen.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">Förderung:</h4>
                        <div className="space-y-2 text-gray-200">
                          <p><strong className="text-orange-400">Kredit:</strong> Bis zu 50.000€ pro Wohneinheit</p>
                          <p><strong className="text-orange-400">Zinssatz:</strong> Sehr günstig (aktuell ca. 1,5%)</p>
                          <p><strong className="text-orange-400">Laufzeit:</strong> Bis zu 10 Jahre</p>
                          <p><strong className="text-orange-400">Tilgungsfreie Zeit:</strong> Bis zu 2 Jahre</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">Einsatzbereiche:</h4>
                        <div className="space-y-2 text-gray-200">
                          <p>• Balkon-Anbau und -Sanierung</p>
                          <p>• Modernisierung der Fassade</p>
                          <p>• Verbesserung der Wohnqualität</p>
                          <p>• Barrierefreie Gestaltung</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-blue-400 font-semibold mb-2">💡 Ideal für:</p>
                      <p className="text-gray-300 text-sm">
                        Balkon-Projekte, die die Wohnqualität verbessern und das Gebäude modernisieren. 
                        Besonders geeignet für ältere Gebäude ohne energetische Anforderungen.
                      </p>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-blue-400 text-sm">
                        <strong>🔗 Mehr Infos:</strong> Besuchen Sie die{' '}
                        <a href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestandsimmobilie/Wohnraum-modernisieren/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">
                          KfW-Seite zu Wohnraum modernisieren <ExternalLink className="w-3 h-3 inline ml-1" />
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* KfW 159 - Denkmalschutz */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-amber-400">
                    <h3 className="text-2xl font-bold text-white mb-4">🏛️ KfW 159: Denkmalschutz</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      <strong className="text-orange-400">Spezielle Förderung für denkmalgeschützte Gebäude</strong>, 
                      die auch Balkon-Projekte umfassen kann, wenn sie den Denkmalschutz berücksichtigen.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-amber-400 mb-3">Förderung:</h4>
                        <div className="space-y-2 text-gray-200">
                          <p><strong className="text-orange-400">Zuschuss:</strong> Bis zu 25% der förderfähigen Kosten</p>
                          <p><strong className="text-orange-400">Kredit:</strong> Bis zu 100.000€ pro Wohneinheit</p>
                          <p><strong className="text-orange-400">Tilgungszuschuss:</strong> Bis zu 25%</p>
                          <p><strong className="text-orange-400">Zinssatz:</strong> Sehr günstig</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-amber-400 mb-3">Besonderheiten:</h4>
                        <div className="space-y-2 text-gray-200">
                          <p>• Nur für denkmalgeschützte Gebäude</p>
                          <p>• Abstimmung mit Denkmalschutzbehörde</p>
                          <p>• Historische Materialien bevorzugt</p>
                          <p>• Reversible Konstruktionen</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                      <p className="text-amber-400 font-semibold mb-2">💡 Wichtig:</p>
                      <p className="text-gray-300 text-sm">
                        Bei Denkmalschutz-Projekten ist eine enge Abstimmung mit der Denkmalschutzbehörde erforderlich. 
                        Anstellbalkone sind hier oft die beste Lösung.
                      </p>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-blue-400 text-sm">
                        <strong>🔗 Mehr Infos:</strong> Besuchen Sie die{' '}
                        <a href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestandsimmobilie/Denkmalschutz/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">
                          KfW-Seite zum Denkmalschutz <ExternalLink className="w-3 h-3 inline ml-1" />
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* KfW 300 - Energieeffizient bauen */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-purple-400">
                    <h3 className="text-2xl font-bold text-white mb-4">🌱 KfW 300: Energieeffizient bauen</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      <strong className="text-orange-400">Förderung für energieeffiziente Neubauten</strong>, 
                      die auch Balkon-Projekte in Neubauten umfassen kann.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-3">Förderung:</h4>
                        <div className="space-y-2 text-gray-200">
                          <p><strong className="text-orange-400">Kredit:</strong> Bis zu 150.000€ pro Wohneinheit</p>
                          <p><strong className="text-orange-400">Tilgungszuschuss:</strong> Bis zu 30%</p>
                          <p><strong className="text-orange-400">Zinssatz:</strong> Sehr günstig</p>
                          <p><strong className="text-orange-400">Laufzeit:</strong> Bis zu 35 Jahre</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-3">Einsatzbereiche:</h4>
                        <div className="space-y-2 text-gray-200">
                          <p>• Neubauten mit hohen Energiestandards</p>
                          <p>• Balkon-Integration in Neubau</p>
                          <p>• Nachhaltige Materialien</p>
                          <p>• Innovative Bauweisen</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                      <p className="text-purple-400 font-semibold mb-2">💡 Ideal für:</p>
                      <p className="text-gray-300 text-sm">
                        Neubauprojekte mit integrierten Balkonen, die hohe Energiestandards erfüllen. 
                        Besonders geeignet für moderne, nachhaltige Bauweisen.
                      </p>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-blue-400 text-sm">
                        <strong>🔗 Mehr Infos:</strong> Besuchen Sie die{' '}
                        <a href="https://www.kfw.de/inlandsfoerderung/Privatpersonen/Neubau/Energieeffizient-bauen/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">
                          KfW-Seite zu energieeffizientem Bauen <ExternalLink className="w-3 h-3 inline ml-1" />
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Weitere Fördermöglichkeiten */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                  <TrendingUp className="w-8 h-8 text-orange-400 mr-3" />
                  Weitere Fördermöglichkeiten
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Kommunale Förderung */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-teal-400">
                    <h3 className="text-xl font-bold text-white mb-3">🏘️ Kommunale Förderung</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Viele Städte und Gemeinden bieten eigene Förderprogramme für Balkon-Projekte an.
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-teal-400">Mögliche Förderungen:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Zuschüsse für Begrünung</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Förderung für Barrierefreiheit</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Stadtklima-Verbesserung</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Soziale Wohnraumförderung</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                      <p className="text-teal-400 text-sm">
                        <strong>💡 Tipp:</strong> Informieren Sie sich bei Ihrer Stadtverwaltung über lokale Förderprogramme!
                      </p>
                    </div>
                  </div>

                  {/* Steuerliche Abschreibung */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-pink-400">
                    <h3 className="text-xl font-bold text-white mb-3">📊 Steuerliche Abschreibung</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Balkon-Projekte können steuerlich abgesetzt werden, wenn sie die Immobilie aufwerten.
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-pink-400">Abschreibungsmöglichkeiten:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Wertsteigerung der Immobilie</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Energetische Verbesserungen</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Barrierefreie Gestaltung</span>
                        </div>
                        <div className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">Denkmalschutz-Maßnahmen</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                      <p className="text-pink-400 text-sm">
                        <strong>💡 Wichtig:</strong> Lassen Sie sich von einem Steuerberater beraten!
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Checkliste für Förderung */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                  <CheckCircle className="w-8 h-8 text-orange-400 mr-3" />
                  Checkliste: So bekommen Sie Ihre Förderung
                </h2>
                
                <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-orange-400">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-orange-400 mb-3">Vor der Planung:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">Förderprogramme recherchieren</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">Eigenanteil kalkulieren</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">Zeitplan berücksichtigen</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">Beratung einholen</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-orange-400 mb-3">Während der Umsetzung:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">Fachplaner beauftragen</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">Fachunternehmer wählen</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">Dokumentation führen</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">Förderstelle informieren</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ-Sektion für Voice Search */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                  <Lightbulb className="w-8 h-8 text-orange-400 mr-3" />
                  Häufige Fragen zur Balkon-Förderung
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-orange-400">
                    <h3 className="text-xl font-bold text-white mb-3">❓ Welche Förderung gibt es für meinen Balkon?</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Für Balkon-Projekte stehen verschiedene <strong className="text-orange-400">KfW-Programme</strong> zur Verfügung. 
                      Die wichtigsten sind: <strong className="text-orange-400">KfW 261</strong> für energetische Sanierung, 
                      <strong className="text-orange-400"> KfW 124</strong> für Wohnraum modernisieren, 
                      <strong className="text-orange-400"> KfW 159</strong> für Denkmalschutz und 
                      <strong className="text-orange-400"> KfW 300</strong> für energieeffizientes Bauen. 
                      Zusätzlich können Sie kommunale Förderungen und steuerliche Abschreibungen nutzen.
                    </p>
                  </div>

                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-orange-400">
                    <h3 className="text-xl font-bold text-white mb-3">❓ Wie bekomme ich eine KfW-Förderung für meinen Balkon?</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Für eine <strong className="text-orange-400">KfW-Förderung</strong> benötigen Sie: einen Antrag <strong className="text-orange-400">vor Baubeginn</strong>, 
                      einen <strong className="text-orange-400">Fachplaner</strong>, einen <strong className="text-orange-400">Fachunternehmer</strong> und ein Gebäude, 
                      das vor 2002 errichtet wurde (bei energetischer Sanierung). Die Förderung kann bis zu <strong className="text-orange-400">20% der Kosten</strong> betragen.
                    </p>
                  </div>

                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-orange-400">
                    <h3 className="text-xl font-bold text-white mb-3">❓ Welche Kosten werden bei der Balkon-Förderung übernommen?</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Gefördert werden die <strong className="text-orange-400">förderfähigen Kosten</strong> für Material, Handwerker, Planung und energetische Verbesserungen. 
                      Die Förderung beträgt je nach Programm <strong className="text-orange-400">20-30% der Kosten</strong>, 
                      bei Krediten bis zu <strong className="text-orange-400">50.000€ pro Wohneinheit</strong>.
                    </p>
                  </div>

                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-orange-400">
                    <h3 className="text-xl font-bold text-white mb-3">❓ Wann ist der beste Zeitpunkt für einen Förderantrag?</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Der <strong className="text-orange-400">beste Zeitpunkt</strong> für einen Förderantrag ist <strong className="text-orange-400">vor Baubeginn</strong>. 
                      KfW-Programme erfordern eine Antragstellung vor dem Start der Arbeiten. Planen Sie daher <strong className="text-orange-400">mindestens 4-6 Wochen</strong> 
                      für die Antragsbearbeitung ein. Bei kommunalen Förderungen können die Fristen variieren.
                    </p>
                  </div>

                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-orange-400">
                    <h3 className="text-xl font-bold text-white mb-3">❓ Kann ich mehrere Förderungen kombinieren?</h3>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">KfW-Programme</strong> können in der Regel <strong className="text-orange-400">nicht kombiniert</strong> werden. 
                      Sie müssen sich für ein Programm entscheiden. Allerdings können Sie <strong className="text-orange-400">KfW-Förderung</strong> mit 
                      <strong className="text-orange-400"> kommunalen Zuschüssen</strong> und <strong className="text-orange-400">steuerlichen Abschreibungen</strong> kombinieren.
                    </p>
                  </div>
                </div>
              </section>

              {/* Call-to-Action */}
              <section className="mb-8">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Bereit für Ihr gefördertes Balkon-Projekt?</h2>
                  <p className="text-white mb-6 text-lg">
                    Nutzen Sie unsere Tools für eine erste Einschätzung und starten Sie mit der Planung
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
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Foerderung;
