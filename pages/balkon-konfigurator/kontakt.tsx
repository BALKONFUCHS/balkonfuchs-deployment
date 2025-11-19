import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ZohoSalesIQ from '../../components/ZohoSalesIQ.js';
import PhoneInput from '../../components/PhoneInput';

interface BalconyConfig {
  type: 'anbau' | 'vorstell' | 'winkel' | 'lisenen' | 'haenge';
  width: number;
  depth: number;
  count: number;
  firstHeight: number;
  floorHeight: number;
  supportPosition: 'inside' | 'outside';
  supportMaterial: 'steel' | 'aluminum' | 'wood' | 'any';
  supportShape: 'round' | 'square';
  supportSurface: 'verzinkt' | 'pulver';
  supportColor: string;
  railingSurface: 'verzinkt' | 'pulver' | 'edelstahl';
  railingColor: string;
  railingFill: 'stab-rund' | 'stab-flach' | 'glas-klar' | 'glas-matt' | 'geschlossen' | 'strukturblech' | 'hpl';
  hplColor: string;
  floorType: string;
  hasRoof: boolean;
  roofHeight: number;
  roofMaterial: 'geschlossen' | 'glas-klar' | 'glas-matt';
  privacyLeft: boolean;
  privacyRight: boolean;
}

interface ContactData {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  address: string;
  city: string;
  contactPreference: string;
  newsletter: boolean;
  privacy: boolean;
  balkonbrief: boolean;
}

export default function KonfiguratorKontakt() {
  const router = useRouter();
  const [config, setConfig] = useState<BalconyConfig | null>(null);
  const [contactData, setContactData] = useState<ContactData>({
    salutation: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    address: '',
    city: '',
    contactPreference: 'email',
    newsletter: false,
    privacy: false,
    balkonbrief: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Konfiguration aus localStorage laden
    const savedConfig = localStorage.getItem('balkonkonfigurator_data');
    if (!savedConfig) {
      // Keine Konfiguration gefunden, zurück zum Konfigurator
      router.push('/balkon-konfigurator');
      return;
    }
    setConfig(JSON.parse(savedConfig));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validierung
    if (!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.zipCode) {
      setError('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    if (!contactData.privacy) {
      setError('Bitte stimmen Sie der Datenschutzerklärung zu.');
      return;
    }

    // Kontaktdaten in localStorage speichern
    localStorage.setItem('balkonkonfigurator_contact', JSON.stringify(contactData));

    // Weiterleitung zur Projekt-Details-Seite
    router.push('/balkon-konfigurator/projekt-details');
  };

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Konfiguration...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Kontaktdaten - Balkon-Konfigurator | BALKONFUCHS</title>
        <meta name="description" content="Geben Sie Ihre Kontaktdaten ein, um Ihr individuelles Balkon-Angebot zu erhalten." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />
        
        <main className="max-w-2xl mx-auto px-4 py-8">
          {/* Progress Bar - Gesamtfortschritt */}
          <div className="mb-6">
            <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
              <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: '33.33%' }}></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>Kontaktdaten</span>
              <span>Schritt 2 von 6</span>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">🦊 Ihre Kontaktdaten</h1>
              <p className="text-lg text-gray-300">
                Fast geschafft! Geben Sie Ihre Kontaktdaten ein, um Ihr individuelles Balkon-Angebot zu erhalten.
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Anrede */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Anrede *</label>
                <select
                  value={contactData.salutation}
                  onChange={(e) => setContactData(prev => ({ ...prev, salutation: e.target.value }))}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="">Bitte wählen</option>
                  <option value="Herr">Herr</option>
                  <option value="Frau">Frau</option>
                  <option value="Divers">Divers</option>
                </select>
              </div>

              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Vorname *</label>
                  <input
                    type="text"
                    value={contactData.firstName}
                    onChange={(e) => setContactData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Nachname *</label>
                  <input
                    type="text"
                    value={contactData.lastName}
                    onChange={(e) => setContactData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              {/* E-Mail */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">E-Mail-Adresse *</label>
                <input
                  type="email"
                  value={contactData.email}
                  onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              {/* Telefon */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Telefon</label>
                <PhoneInput
                  value={contactData.phone}
                  onChange={(value) => setContactData(prev => ({ ...prev, phone: value }))}
                  placeholder="123 456789"
                  className="w-full"
                />
              </div>

              {/* PLZ */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Postleitzahl *</label>
                <input
                  type="text"
                  maxLength={5}
                  value={contactData.zipCode}
                  onChange={(e) => setContactData(prev => ({ ...prev, zipCode: e.target.value.replace(/\D/g, '') }))}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              {/* Adresse */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Straße & Hausnummer</label>
                <input
                  type="text"
                  value={contactData.address}
                  onChange={(e) => setContactData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Stadt */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Stadt</label>
                <input
                  type="text"
                  value={contactData.city}
                  onChange={(e) => setContactData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Kontaktpräferenz */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Kontaktpräferenz</label>
                <select
                  value={contactData.contactPreference}
                  onChange={(e) => setContactData(prev => ({ ...prev, contactPreference: e.target.value }))}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="email">E-Mail</option>
                  <option value="phone">Telefon</option>
                  <option value="both">Beides</option>
                </select>
              </div>

              {/* Checkboxen */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={contactData.newsletter}
                    onChange={(e) => setContactData(prev => ({ ...prev, newsletter: e.target.checked, balkonbrief: e.target.checked }))}
                    className="mt-1 w-5 h-5 text-orange-500 bg-gray-800 border-gray-700 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-300">
                    📧 Ja, ich möchte den kostenlosen Balkonbrief mit Tipps und Inspirationen erhalten
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={contactData.privacy}
                    onChange={(e) => setContactData(prev => ({ ...prev, privacy: e.target.checked }))}
                    className="mt-1 w-5 h-5 text-orange-500 bg-gray-800 border-gray-700 rounded focus:ring-orange-500 focus:ring-2"
                    required
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-300">
                    ✅ Ich stimme der Verarbeitung meiner Daten gemäß{' '}
                    <a href="/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
                      Datenschutzerklärung
                    </a>{' '}
                    und{' '}
                    <a href="/disclaimer/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
                      Haftungsausschluss
                    </a>{' '}
                    zu *
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Weiter zur Zusammenfassung'}
              </button>
            </form>
          </div>
        </main>

        <Footer />
        <ZohoSalesIQ />
      </div>
    </>
  );
}

