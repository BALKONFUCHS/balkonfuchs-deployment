import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CheckCircle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ZohoSalesIQ from '../../components/ZohoSalesIQ.js';

export default function KonfiguratorDanke() {
  const router = useRouter();
  const [contactName, setContactName] = useState('');
  const [totalSteps, setTotalSteps] = useState(6);

  useEffect(() => {
    // Kontaktdaten aus localStorage laden für personalisierte Ansprache
    const savedContact = localStorage.getItem('balkonkonfigurator_contact');
    if (savedContact) {
      try {
        const contact = JSON.parse(savedContact);
        if (contact.firstName) {
          setContactName(contact.firstName);
        }
      } catch (e) {
        console.error('Error parsing contact data:', e);
      }
    }

    // Prüfen ob Angebots-Präferenzen vorhanden sind, um die Gesamtanzahl zu bestimmen
    const savedProjectDetails = localStorage.getItem('balkonkonfigurator_project_details');
    const savedOfferPreferences = localStorage.getItem('balkonkonfigurator_offer_preferences');
    
    if (savedProjectDetails) {
      const details = JSON.parse(savedProjectDetails);
      const wantsOffer = details.projectStatus === 'seeking' || details.projectStatus === 'approved';
      // Wenn Angebote gewünscht, aber keine Präferenzen vorhanden, dann wurden sie übersprungen
      setTotalSteps((wantsOffer && savedOfferPreferences) ? 6 : 5);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Vielen Dank - Balkon-Konfigurator | BALKONFUCHS</title>
        <meta name="description" content="Vielen Dank für Ihre Anfrage. Wir melden uns in Kürze bei Ihnen." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />
        
        <main className="max-w-3xl mx-auto px-4 py-16">
          {/* Progress Bar - Gesamtfortschritt */}
          <div className="mb-6">
            <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
              <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: '100%' }}></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>Abgeschlossen</span>
              <span>Schritt {totalSteps} von {totalSteps}</span>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-12 text-center">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              🎉 Vielen Dank{contactName ? `, ${contactName}` : ''}!
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Ihre Balkon-Konfiguration wurde erfolgreich übermittelt.
            </p>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold text-blue-400 mb-4">📧 Was passiert jetzt?</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">1.</span>
                  <span>Wir haben Ihre Konfiguration erhalten und werden sie von unserem Experten-Team prüfen.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">2.</span>
                  <span>Sie erhalten in Kürze eine E-Mail-Bestätigung mit allen Details Ihrer Konfiguration.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">3.</span>
                  <span>Unser Team meldet sich innerhalb der nächsten 24 Stunden bei Ihnen, um das weitere Vorgehen zu besprechen.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">4.</span>
                  <span>Sie erhalten ein individuelles Angebot basierend auf Ihrer Konfiguration.</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">💡 Nützliche Links</h3>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a href="/kalkulator/" className="text-orange-400 hover:text-orange-300 hover:underline">
                  💰 Kostenrechner
                </a>
                <a href="/planer/" className="text-orange-400 hover:text-orange-300 hover:underline">
                  📐 Detaillierter Planer
                </a>
                <a href="/genehmigung/" className="text-orange-400 hover:text-orange-300 hover:underline">
                  📋 Genehmigungscheck
                </a>
                <a href="/blog/" className="text-orange-400 hover:text-orange-300 hover:underline">
                  📰 Blog & Ratgeber
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => router.push('/balkon-konfigurator')}
                className="w-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors"
              >
                🏠 Zur Startseite
              </button>
              
              <button
                onClick={() => router.push('/balkon-konfigurator')}
                className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                🔄 Neue Konfiguration erstellen
              </button>
            </div>
          </div>
        </main>

        <Footer />
        <ZohoSalesIQ />
      </div>
    </>
  );
}

