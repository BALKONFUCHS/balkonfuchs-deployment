import React, { useState } from 'react';
import Head from 'next/head';
import { Settings, Wrench, Clock, ArrowRight, Menu } from 'lucide-react';
import ZohoSalesIQ from '../components/ZohoSalesIQ.js';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function KonfiguratorComingSoon() {


  return (
    <>
      <Head>
        <title>Balkon-Konfigurator - In Kürze verfügbar | BALKONFUCHS</title>
        <meta name="description" content="Unser interaktiver Balkon-Konfigurator wird aktuell überarbeitet und steht Ihnen in Kürze wieder zur Verfügung." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://balkonfuchs.de/balkon-konfigurator/" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />
        
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Coming Soon Hero */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6 border border-blue-500/30">
                <Settings className="w-12 h-12 text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Balkon-Konfigurator
              </h1>
              
              <div className="inline-block bg-orange-500/10 border border-orange-500/30 px-4 py-2 rounded-full mb-6">
                <div className="flex items-center gap-2 text-orange-400">
                  <Wrench className="w-4 h-4" />
                  <span className="font-semibold">Wird gerade aktualisiert</span>
                </div>
              </div>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
                Im Rahmen der Optimierung unserer Webseite haben wir einige Anpassungen vorgenommen. 
                Unser <span className="text-orange-400 font-semibold">interaktiver Balkon-Konfigurator</span> wird 
                aktuell überarbeitet und an die neue Struktur angepasst.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Bald wieder verfügbar</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Wir arbeiten mit Hochdruck daran, den Konfigurator in den nächsten Tagen wieder online zu stellen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Verbesserte Funktionen</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Die neue Version wird noch benutzerfreundlicher und bietet erweiterte Konfigurationsmöglichkeiten.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Options */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                In der Zwischenzeit können Sie:
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <a href="/kalkulator/" className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all group">
                  <div className="text-3xl mb-3">🧮</div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    Kalkulator nutzen
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Kosten in 3 Minuten berechnen
                  </p>
                  <div className="mt-4 flex items-center text-orange-400 text-sm font-medium">
                    Jetzt starten <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </a>

                <a href="/planer/" className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all group">
                  <div className="text-3xl mb-3">📐</div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    Planer verwenden
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Detaillierte Projektplanung
                  </p>
                  <div className="mt-4 flex items-center text-orange-400 text-sm font-medium">
                    Jetzt planen <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </a>

              </div>
            </div>

            {/* Contact Option */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-3">
                In der Zwischenzeit: Nutzen Sie unseren Planer
              </h3>
              <p className="text-gray-400 mb-6">
                Planen Sie Ihr Balkon-Projekt detailliert mit unserem Planer-Tool – während wir den Konfigurator für Sie fertigstellen!
              </p>
              <a 
                href="/planer/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <span className="text-2xl">📐</span>
                Jetzt Planer nutzen
                <ArrowRight className="w-5 h-5 ml-1" />
              </a>
            </div>
          </div>
        </main>

        <Footer />
        
        {/* ZOHO Sales IQ Chat Widget */}
        <ZohoSalesIQ />
      </div>
    </>
  );
}

