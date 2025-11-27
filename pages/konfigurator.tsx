import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Konfigurator() {
  const router = useRouter();

  useEffect(() => {
    // Automatischer Redirect zur neuen URL nach kurzer Verzögerung
    const timer = setTimeout(() => {
      router.replace('/balkon-konfigurator/');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>3D-Balkon-Konfigurator | Kostenlos planen & Angebote vergleichen</title>
        <meta 
          name="description" 
          content="Balkon in 3D selbst gestalten: Material wählen, Größe anpassen, Preis kalkulieren. Unabhängige Angebote von mehreren geprüften Fachbetrieben vergleichen – kostenlos & unverbindlich." 
        />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://balkonfuchs.de/konfigurator" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/konfigurator" />
        <meta property="og:title" content="Balkon in 3D planen – Kostenloser Konfigurator | BalkonFuchs" />
        <meta property="og:description" content="Traumbalkon online gestalten mit Echtzeit-Vorschau. Kostenlose Angebote von geprüften Fachbetrieben vergleichen." />
        <meta property="og:image" content="https://balkonfuchs.de/images/og-konfigurator.jpg" />
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="3D-Balkon-Konfigurator | BalkonFuchs" />
        <meta property="twitter:description" content="Balkon in 3 Minuten planen: Material, Größe & Preis kalkulieren." />
        <meta property="twitter:image" content="https://balkonfuchs.de/images/og-konfigurator.jpg" />
        
        {/* Structured Data für Voice Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "BalkonFuchs 3D-Konfigurator",
              "description": "Kostenloser 3D-Balkon-Konfigurator mit Angebotsvergleich von geprüften Fachbetrieben",
              "url": "https://balkonfuchs.de/konfigurator",
              "applicationCategory": "DesignApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "127",
                "bestRating": "5",
                "worstRating": "1"
              },
              "featureList": [
                "3D-Echtzeit-Vorschau",
                "Kostenlose Nutzung",
                "Mehrere Angebote vergleichen",
                "Keine Anmeldung erforderlich",
                "Geprüfte Fachbetriebe",
                "Material-Auswahl",
                "Größen-Konfiguration"
              ],
              "provider": {
                "@type": "Organization",
                "name": "BalkonFuchs",
                "url": "https://balkonfuchs.de"
              }
            })
          }}
        />
      </Head>
      
      <main className="min-h-screen bg-gray-900">
        <section className="hero-section bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4">
          {/* H1 + Subheadline */}
          <div className="hero-content max-w-4xl mx-auto text-center mb-12">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Balkon-Konfigurator: Selber in 3D planen & beste Angebote vergleichen
            </h1>
            
            <p className="hero-subtitle text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Konfigurieren Sie Ihren Traumbalkon selbst: Material wählen, Größe anpassen, 
              Echtzeit-Vorschau sehen. Danach erhalten Sie unabhängige Angebote von 
              mehreren geprüften Fachbetrieben – und entscheiden in Ruhe, welches am 
              besten passt.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 px-4">
            <div className="badge flex items-center gap-3 bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <svg className="badge-icon w-6 h-6 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">Kostenlos & unverbindlich</span>
            </div>
            
            <div className="badge flex items-center gap-3 bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <svg className="badge-icon w-6 h-6 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-gray-300">Sofort-Vorschau in 3D</span>
            </div>
            
            <div className="badge flex items-center gap-3 bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <svg className="badge-icon w-6 h-6 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-gray-300">Mehrere Angebote vergleichen</span>
            </div>
            
            <div className="badge flex items-center gap-3 bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <svg className="badge-icon w-6 h-6 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-gray-300">Keine Anmeldung nötig</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hero-cta max-w-2xl mx-auto text-center">
            <a href="/balkon-konfigurator/" className="cta-button inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Jetzt Balkon in 3D planen
              <svg className="cta-arrow w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
            <p className="cta-subtext text-gray-400 mt-4 text-sm">
              ⏱️ Dauert nur 3 Minuten • Keine Verpflichtung
            </p>
          </div>
        </section>
        
        {/* Hier kommt der eigentliche 3D-Konfigurator */}
        <div id="konfigurator" className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white text-xl mb-4">Weiterleitung zum Balkon-Konfigurator...</p>
            <p className="text-gray-400">
              Falls die Weiterleitung nicht automatisch funktioniert,{' '}
              <a href="/balkon-konfigurator/" className="text-orange-400 hover:underline">
                klicken Sie hier
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <style jsx>{`
        .hero-section {
          background: linear-gradient(180deg, #111827 0%, #1f2937 100%);
        }
        
        .hero-title {
          line-height: 1.2;
        }
        
        .hero-subtitle {
          line-height: 1.7;
        }
        
        .badge {
          transition: all 0.3s ease;
        }
        
        .badge:hover {
          background: rgba(31, 41, 55, 0.8);
          border-color: rgba(249, 115, 22, 0.5);
          transform: translateY(-2px);
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .cta-button:hover {
          box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.3), 0 10px 10px -5px rgba(249, 115, 22, 0.2);
        }
      `}</style>
    </>
  );
}
