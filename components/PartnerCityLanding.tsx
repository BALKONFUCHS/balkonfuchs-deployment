import React from 'react';
import Head from 'next/head';
import { ArrowLeft, MapPin, CheckCircle, Building, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Header from './Header';
import Footer from './Footer';
const ZohoSalesIQ = dynamic(() => import('./ZohoSalesIQ.js'), { ssr: false });

interface PartnerCityLandingProps {
  cityName: string;
  citySlug: string;
  title: string;
  metaDescription: string;
  h1: string;
  lead: string;
  regionText: string;
  nutzenItems: string[];
  betriebeItems: string[];
  ablaufSteps: Array<{ title: string; description: string }>;
  faqItems: Array<{ question: string; answer: string }>;
}

const PartnerCityLanding: React.FC<PartnerCityLandingProps> = ({
  cityName,
  citySlug,
  title,
  metaDescription,
  h1,
  lead,
  regionText,
  nutzenItems,
  betriebeItems,
  ablaufSteps,
  faqItems,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`BALKONFUCHS Partner, Balkonbau Partner ${cityName}, Handwerker Partner, Balkonbau Partner werden`} />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://balkonfuchs.de/partner/${citySlug}`} />
        <link rel="canonical" href={`https://balkonfuchs.de/partner/${citySlug}`} />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />

        <main className="py-16 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="mb-8">
              <a href="/" className="inline-flex items-center text-gray-400 hover:text-orange-400 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zur Startseite
              </a>
            </div>

            {/* City Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 px-6 py-3 rounded-full">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span className="text-orange-400 font-bold text-lg">{cityName.toUpperCase()}</span>
              </div>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {h1}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                {lead}
              </p>
              
              {/* CTAs */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <a 
                  href="/partner-werden/#partneranfrage" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Partneranfrage stellen
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="/partner-werden/" 
                  className="inline-flex items-center gap-2 border-2 border-gray-600 text-gray-300 hover:border-orange-500 hover:text-orange-400 px-6 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  Mehr erfahren
                </a>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">
              
              {/* Section: Region */}
              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Region</h2>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-6">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {regionText}
                  </p>
                </div>
              </section>

              {/* Section: Was Sie erhalten */}
              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Was Sie erhalten</h2>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-6">
                  <ul className="space-y-3 text-gray-300">
                    {nutzenItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Section: Welche Betriebe */}
              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Welche Betriebe</h2>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-6">
                  <ul className="space-y-3 text-gray-300">
                    {betriebeItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Building className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Section: So geht es weiter */}
              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">So geht es weiter</h2>
                <div className="space-y-6 max-w-3xl">
                  {ablaufSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold text-white">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section: FAQ */}
              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">FAQ</h2>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <details key={index} className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-6 ${index === 0 ? 'open' : ''}`}>
                      <summary className="text-lg font-bold text-white cursor-pointer">{item.question}</summary>
                      <p className="text-gray-300 mt-4 leading-relaxed">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* Section: Abschluss-CTA */}
              <section className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Partner werden in {cityName}
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Starten Sie Ihre Partneranfrage und erhalten Sie eine strukturierte Bearbeitung Ihrer Angaben.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="/partner-werden/#partneranfrage" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Partneranfrage stellen
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a 
                    href="/partner-werden/" 
                    className="inline-flex items-center gap-2 border-2 border-gray-600 text-gray-300 hover:border-orange-500 hover:text-orange-400 px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    Mehr erfahren
                  </a>
                </div>
              </section>

            </div>
          </div>
        </main>

        <Footer />
        <ZohoSalesIQ />
      </div>
    </>
  );
};

export default PartnerCityLanding;
