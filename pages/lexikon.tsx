import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Home, BookOpen, Calculator, Calendar, Shield, Building, Users } from 'lucide-react';

const Lexikon = () => {
  return (
    <>
      <Head>
        <title>Balkon Lexikon - Alle Begriffe & Normen erklärt | BALKONFUCHS</title>
        <meta name="description" content="Verstehen Sie alle wichtigen Balkon-Begriffe, Normen und Anforderungen. Unser umfassendes Lexikon erklärt Ihnen alles rund um den Balkonbau verständlich und praxisnah." />
        <meta name="keywords" content="balkon lexikon, balkon begriffe, balkon normen, anlehnbalkon, vorstellbalkon, hängebalkon, balkon genehmigung, balkon statik" />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Balkon Lexikon - Alle Begriffe & Normen erklärt | BALKONFUCHS" />
        <meta property="og:description" content="Verstehen Sie alle wichtigen Balkon-Begriffe, Normen und Anforderungen. Unser umfassendes Lexikon erklärt Ihnen alles rund um den Balkonbau." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/lexikon" />
        <link rel="canonical" href="https://balkonfuchs.de/lexikon" />
        
        {/* Strukturierte Daten für SEO-KI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "BALKONFUCHS Balkon Lexikon",
              "description": "Umfassendes Lexikon mit allen wichtigen Balkon-Begriffen, Normen und Anforderungen",
              "url": "https://balkonfuchs.de/lexikon",
              "mainEntity": {
                "@type": "ItemList",
                "name": "Balkon-Begriffe von A bis Z",
                "description": "Alle wichtigen Begriffe rund um den Balkonbau"
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
                  "name": "Was ist ein Anlehnbalkon?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ein Anlehnbalkon ist die klassischste Form des Balkons. Er wird direkt an die bestehende Hauswand angebaut und von unten durch Stützen getragen. Diese Bauweise eignet sich besonders gut für Nachrüstungen."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Welche Balkontypen gibt es?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Es gibt verschiedene Balkontypen: Anlehnbalkon, Vorstellbalkon, Hängebalkon, Loggia und Hochterrasse. Jeder Typ hat spezifische Eigenschaften und Anforderungen."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Brauche ich eine Genehmigung für meinen Balkon?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Das hängt von Ihrem Bundesland und der Art des Balkons ab. Nutzen Sie unseren Genehmigungscheck für eine schnelle Antwort zu Ihrem spezifischen Fall."
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

            {/* Content */}
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                  <BookOpen className="w-16 h-16 text-orange-400" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">Balkon Lexikon</h1>
                <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
                  <strong className="text-orange-400">Wie geht Balkon?</strong> Hier erklären wir Ihnen alle einschlägigen Begriffe, 
                  Normen und Anforderungen rund um den Balkonbau, damit Sie die Fachsprache verstehen und 
                  Ihr Projekt optimal planen können.
                </p>
              </div>

              {/* Einführung */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Warum ein Balkon-Lexikon?</h2>
                  <p className="text-gray-200 leading-relaxed">
                    Der Balkonbau ist ein komplexes Thema mit vielen Fachbegriffen, Normen und rechtlichen Anforderungen. 
                    Unser Lexikon hilft Ihnen dabei, die wichtigsten Begriffe zu verstehen und Ihr Balkon-Projekt 
                    von Anfang an richtig zu planen. Nutzen Sie auch unsere praktischen Tools wie den{' '}
                    <a href="/kalkulator/" className="text-orange-400 hover:text-orange-300 underline">Balkon-Kalkulator</a>{' '}
                    oder den{' '}
                    <a href="/genehmigung/" className="text-orange-400 hover:text-orange-300 underline">Genehmigungscheck</a>{' '}
                    für eine erste Einschätzung Ihres Projekts.
                  </p>
                </div>
              </section>

              {/* Lexikon-Einträge */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-8">Alle Balkon-Begriffe von A bis Z</h2>
                
                <div className="space-y-8">
                  {/* Anlehnbalkon */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-orange-400">
                    <h3 className="text-2xl font-bold text-white mb-4">Anlehnbalkon</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Ein <strong className="text-orange-400">Anlehnbalkon</strong> ist die klassischste und häufigste Form des Balkons. 
                      Er wird direkt an die bestehende Hauswand angebaut und von unten durch Stützen getragen. 
                      Diese Bauweise eignet sich besonders gut für Nachrüstungen und ist oft genehmigungsfrei, 
                      da sie die bestehende Gebäudestruktur nicht wesentlich verändert.
                    </p>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                      <p className="text-blue-400 font-semibold mb-2">💡 Wussten Sie schon?</p>
                      <p className="text-gray-300 text-sm">
                        Anlehnbalkone sind in der Regel genehmigungsfrei, wenn sie bestimmte Abstände zur Grundstücksgrenze einhalten. 
                        Nutzen Sie unseren{' '}
                        <a href="/genehmigung/" className="text-blue-400 hover:text-blue-300 underline">Genehmigungscheck</a>{' '}
                        um zu prüfen, ob Sie für Ihren Anlehnbalkon eine Baugenehmigung benötigen.
                      </p>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Vorteile:</strong> Günstig in der Herstellung, einfach zu montieren, 
                      oft genehmigungsfrei. <strong className="text-orange-400">Nachteile:</strong> Kann die Fassade beeinträchtigen 
                      und benötigt ausreichend Platz vor dem Haus.
                    </p>
                  </div>

                  {/* Anstellbalkon */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-green-400">
                    <h3 className="text-2xl font-bold text-white mb-4">Anstellbalkon</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Ein <strong className="text-orange-400">Anstellbalkon</strong> wird vor die bestehende Fassade gestellt und 
                      mit speziellen Konsolen oder Ankerplatten an der Wand befestigt. Diese Bauweise ist besonders 
                      bei Denkmalschutz oder bei Fassaden mit empfindlichen Materialien geeignet.
                    </p>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
                      <p className="text-green-400 font-semibold mb-2">🏛️ Denkmalschutz-schonend</p>
                      <p className="text-gray-300 text-sm">
                        Anstellbalkone sind ideal für denkmalgeschützte Gebäude, da sie die ursprüngliche Fassade 
                        nicht beschädigen. Bei solchen Projekten ist eine sorgfältige Planung besonders wichtig.
                      </p>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Vorteile:</strong> Schont die bestehende Fassade, geeignet für Denkmalschutz, 
                      flexible Gestaltungsmöglichkeiten. <strong className="text-orange-400">Nachteile:</strong> Höhere Kosten, 
                      aufwendigere Montage, oft genehmigungspflichtig.
                    </p>
                  </div>

                  {/* Balkon Bausatz */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-purple-400">
                    <h3 className="text-2xl font-bold text-white mb-4">Balkon Bausatz</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Ein <strong className="text-orange-400">Balkon Bausatz</strong> ist eine vorgefertigte Lösung, die alle 
                      notwendigen Komponenten für den Balkonbau enthält. Diese Systeme sind standardisiert, 
                      qualitätsgesichert und ermöglichen eine schnelle Montage vor Ort.
                    </p>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-4">
                      <p className="text-purple-400 font-semibold mb-2">⚡ Schnelle Montage</p>
                      <p className="text-gray-300 text-sm">
                        Balkon Bausätze reduzieren die Bauzeit erheblich und bieten eine hohe Qualität durch 
                        industrielle Vorfertigung. Ideal für Bauherren, die Wert auf Zeitersparnis legen.
                      </p>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Vorteile:</strong> Schnelle Montage, hohe Qualität, 
                      standardisierte Komponenten. <strong className="text-orange-400">Nachteile:</strong> Weniger 
                      individuelle Gestaltungsmöglichkeiten, höhere Kosten als Eigenbau.
                    </p>
                  </div>

                  {/* Balkonentwässerung */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-cyan-400">
                    <h3 className="text-2xl font-bold text-white mb-4">Balkonentwässerung</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Die <strong className="text-orange-400">Balkonentwässerung</strong> ist ein entscheidender Aspekt der 
                      Balkonkonstruktion. Sie verhindert, dass sich Wasser auf dem Balkon staut und 
                      Schäden an der Konstruktion oder dem Gebäude verursacht.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Wichtige Aspekte:</strong> Gefälle zum Ablauf hin, 
                      ausreichende Anzahl von Abläufen, frostsichere Entwässerung, regelmäßige Wartung. 
                      Eine schlechte Entwässerung kann zu teuren Schäden führen.
                    </p>
                  </div>

                  {/* Balkondach */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-yellow-400">
                    <h3 className="text-2xl font-bold text-white mb-4">Balkondach</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Ein <strong className="text-orange-400">Balkondach</strong> schützt vor Witterungseinflüssen und 
                      ermöglicht die Nutzung des Balkons auch bei Regen. Es kann als festes Dach, 
                      als Markise oder als Glasdach ausgeführt werden.
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
                      <p className="text-yellow-400 font-semibold mb-2">🌧️ Witterungsschutz</p>
                      <p className="text-gray-300 text-sm">
                        Ein Balkondach verlängert die Nutzungszeit Ihres Balkons erheblich und schützt 
                        vor Regen, Schnee und starker Sonneneinstrahlung.
                      </p>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Varianten:</strong> Festes Dach, Markise, Glasdach, 
                      Pergola. <strong className="text-orange-400">Beachtung:</strong> Statische Anforderungen, 
                      Brandschutz, Nachbarrecht.
                    </p>
                  </div>

                  {/* Balkon mit Fluchtleiter */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-red-400">
                    <h3 className="text-2xl font-bold text-white mb-4">Balkon mit Fluchtleiter</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Ein <strong className="text-orange-400">Balkon mit Fluchtleiter</strong> dient als 
                      zusätzlicher Fluchtweg im Brandfall. Diese Konstruktion ist besonders wichtig bei 
                      Balkonen in höheren Stockwerken und muss bestimmte Sicherheitsstandards erfüllen.
                    </p>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                      <p className="text-red-400 font-semibold mb-2">🚨 Sicherheitsaspekt</p>
                      <p className="text-gray-300 text-sm">
                        Fluchtleitern sind ein wichtiger Sicherheitsaspekt und unterliegen strengen 
                        Vorschriften. Bei der Planung müssen Brandschutzrichtlinien beachtet werden.
                      </p>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Anforderungen:</strong> Brandschutzrichtlinien, 
                      Zugänglichkeit, regelmäßige Wartung. <strong className="text-orange-400">Einsatz:</strong> 
                      Höhere Stockwerke, öffentliche Gebäude, Hotels.
                    </p>
                  </div>

                  {/* Balkon und Brandschutz */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-red-500">
                    <h3 className="text-2xl font-bold text-white mb-4">Balkon und Brandschutz</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Der <strong className="text-orange-400">Brandschutz</strong> bei Balkonen ist ein 
                      entscheidender Sicherheitsaspekt. Balkone können als Fluchtwege dienen und müssen 
                      daher bestimmte Brandschutzanforderungen erfüllen.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Wichtige Aspekte:</strong> Feuerwiderstand der Materialien, 
                      Fluchtwegsicherheit, Brandübertragung zwischen Gebäuden, Rauchableitung. 
                      Diese Anforderungen sind besonders bei Mehrfamilienhäusern und öffentlichen Gebäuden wichtig.
                    </p>
                  </div>

                  {/* Balkon und Denkmalschutz */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-amber-400">
                    <h3 className="text-2xl font-bold text-white mb-4">Balkon und Denkmalschutz</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Bei <strong className="text-orange-400">denkmalgeschützten Gebäuden</strong> müssen 
                      Balkon-Projekte besonders sorgfältig geplant werden. Die historische Substanz 
                      darf nicht beeinträchtigt werden, und die Gestaltung muss sich harmonisch einfügen.
                    </p>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-4">
                      <p className="text-amber-400 font-semibold mb-2">🏛️ Denkmalschutz beachten</p>
                      <p className="text-gray-300 text-sm">
                        Bei Denkmalschutz-Projekten ist eine enge Abstimmung mit der Denkmalschutzbehörde 
                        erforderlich. Anstellbalkone sind hier oft die beste Lösung.
                      </p>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Besonderheiten:</strong> Abstimmung mit Denkmalschutzbehörde, 
                      historische Materialien, gestalterische Anpassung. <strong className="text-orange-400">Lösungen:</strong> 
                      Anstellbalkone, reversible Konstruktionen, traditionelle Materialien.
                    </p>
                  </div>

                  {/* Balkonstatik */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-blue-500">
                    <h3 className="text-2xl font-bold text-white mb-4">Balkonstatik</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Die <strong className="text-orange-400">Balkonstatik</strong> ist die Grundlage für 
                      eine sichere und dauerhafte Balkonkonstruktion. Sie umfasst die Berechnung aller 
                      Kräfte und Verformungen, die auf den Balkon einwirken.
                    </p>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                      <p className="text-blue-400 font-semibold mb-2">📐 Statische Berechnung</p>
                      <p className="text-gray-300 text-sm">
                        Eine professionelle statische Berechnung ist bei jedem Balkon-Projekt erforderlich. 
                        Sie garantiert die Sicherheit und Standfestigkeit der Konstruktion.
                      </p>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Berechnungsgrundlagen:</strong> Eigengewicht, 
                      Verkehrslasten, Windlasten, Schneelasten. <strong className="text-orange-400">Wichtig:</strong> 
                      Professionelle Berechnung durch Statiker, Berücksichtigung aller Lastfälle.
                    </p>
                  </div>

                  {/* Balkontreppe */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-green-500">
                    <h3 className="text-2xl font-bold text-white mb-4">Balkontreppe</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Eine <strong className="text-orange-400">Balkontreppe</strong> verbindet den Balkon 
                      mit dem Garten oder der Terrasse. Sie kann als feste Treppe, als Klapptreppe oder 
                      als ausziehbare Treppe ausgeführt werden.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Varianten:</strong> Feste Treppe, Klapptreppe, 
                      ausziehbare Treppe. <strong className="text-orange-400">Beachtung:</strong> 
                      Sicherheitsanforderungen, Geländer, Rutschfestigkeit, Wartung.
                    </p>
                  </div>

                  {/* Balkonturm */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-purple-500">
                    <h3 className="text-2xl font-bold text-white mb-4">Balkonturm</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Ein <strong className="text-orange-400">Balkonturm</strong> ist eine vertikale 
                      Balkonkonstruktion, die mehrere Stockwerke umfasst. Diese Bauweise wird oft bei 
                      modernen Wohngebäuden eingesetzt und bietet eine effiziente Raumausnutzung.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Einsatzbereiche:</strong> Moderne Wohngebäude, 
                      Hochhäuser, Bürogebäude. <strong className="text-orange-400">Besonderheiten:</strong> 
                      Komplexe Statik, Brandschutzanforderungen, Wartungszugänglichkeit.
                    </p>
                  </div>

                  {/* Eckbalkon */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-indigo-400">
                    <h3 className="text-2xl font-bold text-white mb-4">Eckbalkon</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Ein <strong className="text-orange-400">Eckbalkon</strong> befindet sich an der 
                      Ecke eines Gebäudes und bietet oft eine besonders schöne Aussicht in zwei Richtungen. 
                      Diese Position erfordert eine spezielle statische Konstruktion.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Vorteile:</strong> Schöne Aussicht, mehr Privatsphäre, 
                      optimale Belichtung. <strong className="text-orange-400">Herausforderungen:</strong> 
                      Komplexere Statik, höhere Kosten, oft genehmigungspflichtig.
                    </p>
                  </div>

                  {/* Hängebalkon */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-teal-400">
                    <h3 className="text-2xl font-bold text-white mb-4">Hängebalkon</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Ein <strong className="text-orange-400">Hängebalkon</strong> wird von oben an der 
                      Decke oder Wand aufgehängt und benötigt keine Stützen von unten. Diese Bauweise 
                      ist besonders bei beengten Platzverhältnissen oder bei Gebäuden mit Sockelgeschoss geeignet.
                    </p>
                    <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4 mb-4">
                      <p className="text-teal-400 font-semibold mb-2">🏗️ Platzsparende Lösung</p>
                      <p className="text-gray-300 text-sm">
                        Hängebalkone sind ideal, wenn der Platz unter dem Balkon genutzt werden soll 
                        oder wenn Stützen von unten nicht möglich sind.
                      </p>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Vorteile:</strong> Platzsparend, keine Stützen, 
                      moderne Optik. <strong className="text-orange-400">Nachteile:</strong> Höhere Kosten, 
                      aufwendigere Montage, oft genehmigungspflichtig.
                    </p>
                  </div>

                  {/* Modulbalkon */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-pink-400">
                    <h3 className="text-2xl font-bold text-white mb-4">Modulbalkon</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Ein <strong className="text-orange-400">Modulbalkon</strong> besteht aus vorgefertigten 
                      Modulen, die vor Ort zusammengesetzt werden. Diese Bauweise ermöglicht eine schnelle 
                      Montage und eine hohe Qualität durch industrielle Vorfertigung.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Vorteile:</strong> Schnelle Montage, hohe Qualität, 
                      standardisierte Komponenten. <strong className="text-orange-400">Einsatz:</strong> 
                      Neubauten, Sanierungen, serielle Fertigung.
                    </p>
                  </div>

                  {/* Nischenbalkon */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-orange-400">
                    <h3 className="text-2xl font-bold text-white mb-4">Nischenbalkon</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Ein <strong className="text-orange-400">Nischenbalkon</strong> ist in eine Aussparung 
                      der Fassade eingelassen und bietet dadurch einen zusätzlichen Schutz vor Wind und Wetter. 
                      Diese Bauweise ist besonders bei exponierten Lagen vorteilhaft.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Vorteile:</strong> Windschutz, Witterungsschutz, 
                      integrierte Optik. <strong className="text-orange-400">Einsatz:</strong> 
                      Exponierte Lagen, windige Standorte, moderne Architektur.
                    </p>
                  </div>

                  {/* Stapelbalkon */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-cyan-500">
                    <h3 className="text-2xl font-bold text-white mb-4">Stapelbalkon</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Ein <strong className="text-orange-400">Stapelbalkon</strong> wird übereinander 
                      angeordnet und nutzt die gleichen Stützen für mehrere Stockwerke. Diese Bauweise 
                      ist besonders effizient bei Mehrfamilienhäusern.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Vorteile:</strong> Kosteneffizient, einheitliche Optik, 
                      einfache Wartung. <strong className="text-orange-400">Einsatz:</strong> 
                      Mehrfamilienhäuser, Hotels, Bürogebäude.
                    </p>
                  </div>

                  {/* Vorstellbalkon */}
                  <div className="bg-gray-700/30 rounded-lg p-6 border-l-4 border-emerald-400">
                    <h3 className="text-2xl font-bold text-white mb-4">Vorstellbalkon</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Ein <strong className="text-orange-400">Vorstellbalkon</strong> wird vor die bestehende 
                      Fassade gestellt und ist eine der häufigsten Bauweisen bei Nachrüstungen. 
                      Er kann als Anlehnbalkon oder als Hängebalkon ausgeführt werden.
                    </p>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-4">
                      <p className="text-emerald-400 font-semibold mb-2">🏠 Nachrüstung ideal</p>
                      <p className="text-gray-300 text-sm">
                        Vorstellbalkone sind die beste Lösung für die Nachrüstung bestehender Gebäude. 
                        Nutzen Sie unseren{' '}
                        <a href="/planer/" className="text-emerald-400 hover:text-emerald-300 underline">Balkon-Planer</a>{' '}
                        für eine detaillierte Projektplanung.
                      </p>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-orange-400">Vorteile:</strong> Geeignet für Nachrüstungen, 
                      flexible Gestaltung, oft genehmigungsfrei. <strong className="text-orange-400">Einsatz:</strong> 
                      Bestandsgebäude, Sanierungen, individuelle Wünsche.
                    </p>
                  </div>
                </div>
              </section>

              {/* Call-to-Action */}
              <section className="mb-8">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Bereit für Ihr Balkon-Projekt?</h2>
                  <p className="text-white mb-6 text-lg">
                    Nutzen Sie unsere praktischen Tools für eine erste Einschätzung Ihres Projekts
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
                  <li><a href="partner-info" className="text-gray-400 hover:text-orange-400 transition-colors">Partner Vorabinfos</a></li>
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

export default Lexikon;
