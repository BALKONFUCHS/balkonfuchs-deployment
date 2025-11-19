import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ZohoSalesIQ from '../../components/ZohoSalesIQ.js';
import { Check } from 'lucide-react';

interface OfferPreferences {
  count: string;
  region: string;
}

export default function KonfiguratorAngebotsPraefenzen() {
  const router = useRouter();
  const [offerPreferences, setOfferPreferences] = useState<OfferPreferences>({
    count: '',
    region: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Prüfen ob Projekt-Details vorhanden sind
    const savedProjectDetails = localStorage.getItem('balkonkonfigurator_project_details');
    if (!savedProjectDetails) {
      router.push('/balkon-konfigurator/projekt-details');
      return;
    }

    // Prüfen ob Angebote gewünscht werden
    const projectDetails = JSON.parse(savedProjectDetails);
    const wantsOffer = projectDetails.projectStatus === 'seeking' || projectDetails.projectStatus === 'approved';
    
    if (!wantsOffer) {
      // Keine Angebote gewünscht, direkt zur Zusammenfassung
      router.push('/balkon-konfigurator/zusammenfassung');
      return;
    }

    // Gespeicherte Angebots-Präferenzen laden falls vorhanden
    const savedPreferences = localStorage.getItem('balkonkonfigurator_offer_preferences');
    if (savedPreferences) {
      setOfferPreferences(JSON.parse(savedPreferences));
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!offerPreferences.count) {
      setError('Bitte wählen Sie die Anzahl der gewünschten Angebote aus.');
      return;
    }

    if (!offerPreferences.region) {
      setError('Bitte wählen Sie den geografischen Bereich aus.');
      return;
    }

    // Angebots-Präferenzen in localStorage speichern
    localStorage.setItem('balkonkonfigurator_offer_preferences', JSON.stringify(offerPreferences));

    // Weiterleitung zur Zusammenfassung
    router.push('/balkon-konfigurator/zusammenfassung');
  };

  return (
    <>
      <Head>
        <title>Angebots-Präferenzen - Balkon-Konfigurator | BALKONFUCHS</title>
        <meta name="description" content="Wählen Sie die Anzahl und den geografischen Bereich Ihrer Angebote." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />
        
        <main className="max-w-3xl mx-auto px-4 py-8">
          {/* Progress Bar - Gesamtfortschritt */}
          <div className="mb-6">
            <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
              <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: '66.67%' }}></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>Angebots-Präferenzen</span>
              <span>Schritt 4 von 6</span>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">📋 Wie viele Angebote möchten Sie erhalten?</h1>
              <p className="text-lg text-gray-300">
                Wählen Sie die Anzahl und den geografischen Bereich Ihrer Angebote!
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Anzahl Angebote */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Anzahl der Angebote</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['3', '4', '5', 'mehr'].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setOfferPreferences(prev => ({ ...prev, count }))}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        offerPreferences.count === count
                          ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                          : 'border-gray-700 bg-gray-800/50 hover:border-orange-500/50'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-2">
                          {count === 'mehr' ? '5+' : count}
                        </div>
                        <div className="text-sm text-gray-400">
                          {count === 'mehr' ? '5 oder mehr' : `${count} Angebote`}
                        </div>
                      </div>
                      {offerPreferences.count === count && (
                        <Check className="w-5 h-5 text-orange-500 mx-auto mt-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Geografischer Bereich</h3>
                <div className="grid gap-4">
                  {[
                    { value: 'regional', title: 'Regional', subtitle: 'Nur regionale Partner' },
                    { value: 'overregional', title: 'Überregional', subtitle: 'Landesweit verfügbar' },
                    { value: 'bundesweit', title: 'Bundesweit', subtitle: 'Deutschlandweit' }
                  ].map((region) => (
                    <button
                      key={region.value}
                      type="button"
                      onClick={() => setOfferPreferences(prev => ({ ...prev, region: region.value }))}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 text-left ${
                        offerPreferences.region === region.value
                          ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                          : 'border-gray-700 bg-gray-800/50 hover:border-orange-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">📍</div>
                        <div className="text-left flex-1">
                          <h4 className="text-xl font-semibold text-white">{region.title}</h4>
                          <p className="text-gray-400">{region.subtitle}</p>
                        </div>
                        {offerPreferences.region === region.value && (
                          <Check className="w-6 h-6 text-orange-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => router.push('/balkon-konfigurator/projekt-details')}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  ← Zurück
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors"
                >
                  Zur Zusammenfassung →
                </button>
              </div>
            </form>
          </div>
        </main>

        <Footer />
        <ZohoSalesIQ />
      </div>
    </>
  );
}

