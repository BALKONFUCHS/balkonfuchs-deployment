import React from 'react';
import Head from 'next/head';
import { Calculator, Calendar, FileText, CheckCircle, Clock, Users, ArrowRight, Star, Zap, Target, Award, Crown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';
const ZohoSalesIQ = dynamic(() => import('../components/ZohoSalesIQ.js'), { ssr: false });

const StartseiteFarbtest = () => {
  return (
    <>
      <Head>
        <title>BALKONFUCHS - Alle Services im Überblick</title>
        <meta name="description" content="Entdecken Sie alle BALKONFUCHS Services: Kalkulator, Planer, Express-Angebot, Genehmigungscheck und mehr. Finden Sie den perfekten Weg zu Ihrem Balkon-Projekt." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 px-6 py-3 rounded-full">
                <Star className="w-5 h-5 text-orange-400" />
                <span className="text-orange-300 font-bold text-lg">ALLE SERVICES IM ÜBERBLICK</span>
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              BALKONFUCHS <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                Alle Services
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Entdecken Sie alle <span className="text-orange-400 font-bold">BALKONFUCHS Services</span> und finden Sie den perfekten Weg zu Ihrem Balkon-Projekt.
            </p>
          </div>
        </section>


        {/* Main Funnel Cards */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Kalkulator */}
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Balkon-Kalkulator</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  Berechnen Sie die Kosten für Ihr Balkon-Projekt in nur 2 Minuten. Schnell, unverbindlich und präzise.
                </p>
                <div className="text-center">
                  <a 
                    href="/kalkulator/" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Kosten berechnen
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Planer */}
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Balkon-Planer</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  Planen Sie Ihr Balkon-Projekt detailliert. Von der Idee bis zur Umsetzung - alles in einem Tool.
                </p>
                <div className="text-center">
                  <a 
                    href="/planer/" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Projekt planen
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Express-Angebot */}
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Express-Angebot</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  Erhalten Sie binnen 24h konkrete Angebote von unseren besten Partnern für eine schnelle Umsetzung.
                </p>
                <div className="text-center">
                  <a 
                    href="/express-angebot/" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Angebot anfordern
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Genehmigungscheck */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Genehmigungscheck</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  Prüfen Sie in nur 1 Minute, ob Sie eine Genehmigung für Ihr Balkon-Projekt benötigen.
                </p>
                <div className="text-center">
                  <a 
                    href="/genehmigung/" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Genehmigung prüfen
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Baustart Rechner */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border-2 border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Baustart Rechner</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  Berechnen Sie den optimalen Baustart für Ihr Balkon-Projekt. Berücksichtigt alle Faktoren.
                </p>
                <div className="text-center">
                  <a 
                    href="/bauzeit-planung/" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Baustart berechnen
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Partner werden */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Partner werden</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  Werden Sie Teil des BALKONFUCHS-Netzwerks und profitieren Sie von qualifizierten Leads.
                </p>
                <div className="text-center">
                  <a 
                    href="/partner-info-berlin/" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Partner werden
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Warum <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">BALKONFUCHS</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Deutschlands führende Plattform für Balkon-Projekte
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Präzise Kalkulation</h3>
                <p className="text-gray-300">Berechnungen auf Basis aktueller Marktpreise und regionaler Besonderheiten.</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Geprüfte Partner</h3>
                <p className="text-gray-300">Nur qualifizierte und zertifizierte Partner in unserem Netzwerk.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Schnelle Umsetzung</h3>
                <p className="text-gray-300">Von der Idee bis zur Umsetzung in nur wenigen Wochen.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Unsere <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Balkon-Projekte</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Lassen Sie sich von den erfolgreichen Balkon-Projekten unserer Partner inspirieren
              </p>
            </div>

            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-lg">
              <div className="flex animate-scroll" style={{ width: '200%' }}>
                <img
                  src="/images/carousel/01-anlehnbalkon-stabgelaender.jpg"
                  alt="Anlehnbalkon mit Stabgeländer"
                  className="w-[14.285%] h-48 object-cover flex-shrink-0"
                />
                <img
                  src="/images/carousel/02-kragbalkon-glasbrustung.jpg"
                  alt="Kragbalkon mit Glasbrüstung"
                  className="w-[14.285%] h-48 object-cover flex-shrink-0"
                />
                <img
                  src="/images/carousel/03-balkon-modern-glas.jpg"
                  alt="Moderner Balkon mit Glas"
                  className="w-[14.285%] h-48 object-cover flex-shrink-0"
                />
                <img
                  src="/images/carousel/04-balkon-traditionell-holz.jpg"
                  alt="Traditioneller Balkon mit Holz"
                  className="w-[14.285%] h-48 object-cover flex-shrink-0"
                />
                <img
                  src="/images/carousel/05-balkon-kompakt-stadt.jpg"
                  alt="Kompakter Stadtbalkon"
                  className="w-[14.285%] h-48 object-cover flex-shrink-0"
                />
                <img
                  src="/images/carousel/06-balkon-luxus-terrasse.jpg"
                  alt="Luxus-Balkon mit Terrasse"
                  className="w-[14.285%] h-48 object-cover flex-shrink-0"
                />
                <img
                  src="/images/carousel/07-balkon-familie-spielplatz.jpg"
                  alt="Familien-Balkon als Spielplatz"
                  className="w-[14.285%] h-48 object-cover flex-shrink-0"
                />
                {/* Duplicate images for seamless loop */}
                <img
                  src="/images/carousel/01-anlehnbalkon-stabgelaender.jpg"
                  alt="Anlehnbalkon mit Stabgeländer"
                  className="w-[14.285%] h-48 object-cover flex-shrink-0"
                />
                <img
                  src="/images/carousel/02-kragbalkon-glasbrustung.jpg"
                  alt="Kragbalkon mit Glasbrüstung"
                  className="w-[14.285%] h-48 object-cover flex-shrink-0"
                />
                <img
                  src="/images/carousel/03-balkon-modern-glas.jpg"
                  alt="Moderner Balkon mit Glas"
                  className="w-[14.285%] h-48 object-cover flex-shrink-0"
                />
                <img
                  src="/images/carousel/04-balkon-traditionell-holz.jpg"
                  alt="Traditioneller Balkon mit Holz"
                  className="w-[14.285%] h-48 object-cover flex-shrink-0"
                />
                <img
                  src="/images/carousel/05-balkon-kompakt-stadt.jpg"
                  alt="Kompakter Stadtbalkon"
                  className="w-[14.285%] h-48 object-cover flex-shrink-0"
                />
                <img
                  src="/images/carousel/06-balkon-luxus-terrasse.jpg"
                  alt="Luxus-Balkon mit Terrasse"
                  className="w-[14.285%] h-48 object-cover flex-shrink-0"
                />
                <img
                  src="/images/carousel/07-balkon-familie-spielplatz.jpg"
                  alt="Familien-Balkon als Spielplatz"
                  className="w-[14.285%] h-48 object-cover flex-shrink-0"
                />
              </div>
            </div>
          </div>
        </section>

      <Footer />
      
      {/* ZOHO Sales IQ Widget */}
      <ZohoSalesIQ />
    </div>

    <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: 200% !important;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};

export default StartseiteFarbtest;

