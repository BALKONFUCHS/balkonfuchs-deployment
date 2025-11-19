import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ZohoSalesIQ from '../../components/ZohoSalesIQ.js';
import { Check } from 'lucide-react';

interface ProjectDetails {
  projectStatus: string;
  timeframe: string;
  insulation: string;
  basement: string;
  accessibility: string;
}

export default function KonfiguratorProjektDetails() {
  const router = useRouter();
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    projectStatus: '',
    timeframe: '',
    insulation: '',
    basement: '',
    accessibility: '',
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    // Prüfen ob Kontaktdaten vorhanden sind
    const savedContact = localStorage.getItem('balkonkonfigurator_contact');
    if (!savedContact) {
      router.push('/balkon-konfigurator/kontakt');
      return;
    }

    // Gespeicherte Projekt-Details laden falls vorhanden
    const savedDetails = localStorage.getItem('balkonkonfigurator_project_details');
    if (savedDetails) {
      setProjectDetails(JSON.parse(savedDetails));
    }
  }, [router]);

  const handleNext = () => {
    if (currentStep === 0 && !projectDetails.projectStatus) {
      setError('Bitte wählen Sie einen Projektstatus aus.');
      return;
    }
    if (currentStep === 1 && !projectDetails.timeframe) {
      setError('Bitte wählen Sie einen Zeitrahmen aus.');
      return;
    }
    if (currentStep === 2 && !projectDetails.insulation) {
      setError('Bitte wählen Sie eine Option zur Wärmedämmung aus.');
      return;
    }
    if (currentStep === 3 && !projectDetails.basement) {
      setError('Bitte wählen Sie eine Option zur Unterkellerung aus.');
      return;
    }
    if (currentStep === 4 && !projectDetails.accessibility) {
      setError('Bitte wählen Sie eine Option zur Erreichbarkeit aus.');
      return;
    }

    setError('');
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Alle Fragen beantwortet, speichern
      localStorage.setItem('balkonkonfigurator_project_details', JSON.stringify(projectDetails));
      
      // Prüfen ob Angebote gewünscht werden
      const wantsOffer = projectDetails.projectStatus === 'seeking' || projectDetails.projectStatus === 'approved';
      
      if (wantsOffer) {
        // Weiterleitung zur Angebots-Präferenzen-Seite
        router.push('/balkon-konfigurator/angebots-praeferenzen');
      } else {
        // Direkt zur Zusammenfassung
        router.push('/balkon-konfigurator/zusammenfassung');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError('');
    } else {
      router.push('/balkon-konfigurator/kontakt');
    }
  };

  const handleSelect = (field: keyof ProjectDetails, value: string) => {
    setProjectDetails(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const renderProjectStatus = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-2">Wie ist der aktuelle Status Ihres Projekts?</h2>
      <p className="text-gray-400 mb-6">📋 Das hilft uns, Sie optimal auf Ihr Projekt vorzubereiten!</p>
      
      <div className="grid gap-4">
        {[
          { icon: '💡', title: 'Habe noch keine konkrete Idee', subtitle: 'Erste Orientierung gewünscht', value: 'idea' },
          { icon: '🔍', title: 'Möchte Machbarkeit prüfen', subtitle: 'Technische Umsetzbarkeit klären', value: 'feasibility' },
          { icon: '📄', title: 'Bauantrag ist eingereicht', subtitle: 'Warte auf Genehmigung', value: 'submitted' },
          { icon: '✅', title: 'Ich habe bereits eine Genehmigung', subtitle: 'Kann sofort starten', value: 'approved' },
          { icon: '🔍', title: 'Suche jetzt nach passender Firma', subtitle: 'Bereit für Angebote', value: 'seeking' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect('projectStatus', option.value)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              projectDetails.projectStatus === option.value
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-gray-700 bg-gray-800/50 hover:border-orange-500/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{option.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                <p className="text-sm text-gray-400">{option.subtitle}</p>
              </div>
              {projectDetails.projectStatus === option.value && (
                <Check className="w-6 h-6 text-orange-500" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderTimeframe = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-2">Wann soll es losgehen?</h2>
      <p className="text-gray-400 mb-6">⏰ Das beeinflusst unsere Planungsempfehlung!</p>
      
      <div className="grid gap-4">
        {[
          { icon: '⚡', title: 'So schnell wie möglich', subtitle: 'Hohe Priorität', value: 'asap' },
          { icon: '📅', title: 'In den nächsten 3 Monaten', subtitle: 'Konkrete Zeitplanung', value: '3months' },
          { icon: '📅', title: 'In den nächsten 6 Monaten', subtitle: 'Mittelfristige Planung', value: '6months' },
          { icon: '❓', title: 'Noch unklar', subtitle: 'Flexible Zeitplanung', value: 'unclear' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect('timeframe', option.value)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              projectDetails.timeframe === option.value
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-gray-700 bg-gray-800/50 hover:border-orange-500/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{option.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                <p className="text-sm text-gray-400">{option.subtitle}</p>
              </div>
              {projectDetails.timeframe === option.value && (
                <Check className="w-6 h-6 text-orange-500" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderInsulation = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-2">Gibt es eine Dämmung an der Außenwand?</h2>
      <p className="text-gray-400 mb-6">🛡️ Dies beeinflusst Befestigung und Aufbau des Balkons.</p>
      
      <div className="grid gap-4">
        {[
          { icon: '✅', title: 'Ja, vorhanden', subtitle: 'Die Wand ist bereits gedämmt', value: 'existing' },
          { icon: '🛠️', title: 'In Planung', subtitle: 'Die Dämmung wird noch angebracht', value: 'planned' },
          { icon: '🚫', title: 'Keine Dämmung', subtitle: 'Weder vorhanden noch geplant', value: 'none' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect('insulation', option.value)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              projectDetails.insulation === option.value
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-gray-700 bg-gray-800/50 hover:border-orange-500/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{option.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                <p className="text-sm text-gray-400">{option.subtitle}</p>
              </div>
              {projectDetails.insulation === option.value && (
                <Check className="w-6 h-6 text-orange-500" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderBasement = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-2">Ist das Gebäude unterkellert?</h2>
      <p className="text-gray-400 mb-6">🏠 Das beeinflusst die Statik bei stehenden Balkonen!</p>
      
      <div className="grid gap-4">
        {[
          { icon: '✅', title: 'Ja, unterkellert', subtitle: 'Stabile Basis vorhanden', value: 'yes' },
          { icon: '❌', title: 'Nein, nicht unterkellert', subtitle: 'Bodenplatte/Streifenfundament', value: 'no' },
          { icon: '❓', title: 'Weiß ich nicht', subtitle: 'Prüfung vor Ort nötig', value: 'unknown' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect('basement', option.value)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              projectDetails.basement === option.value
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-gray-700 bg-gray-800/50 hover:border-orange-500/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{option.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                <p className="text-sm text-gray-400">{option.subtitle}</p>
              </div>
              {projectDetails.basement === option.value && (
                <Check className="w-6 h-6 text-orange-500" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderAccessibility = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-2">Wie ist die Zufahrt zur Baustelle?</h2>
      <p className="text-gray-400 mb-6">🚚 Das beeinflusst die Logistikkosten!</p>
      
      <div className="grid gap-4">
        {[
          { icon: '✅', title: 'Gut erreichbar', subtitle: 'LKW kann direkt anfahren', value: 'good' },
          { icon: '⚠️', title: 'Eingeschränkt erreichbar', subtitle: 'Kleinere Zufahrt verfügbar', value: 'limited' },
          { icon: '❌', title: 'Schwer erreichbar', subtitle: 'Längere Transportwege', value: 'difficult' },
          { icon: '🚫', title: 'Nicht erreichbar', subtitle: 'Handtransport erforderlich', value: 'impossible' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect('accessibility', option.value)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              projectDetails.accessibility === option.value
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-gray-700 bg-gray-800/50 hover:border-orange-500/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{option.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                <p className="text-sm text-gray-400">{option.subtitle}</p>
              </div>
              {projectDetails.accessibility === option.value && (
                <Check className="w-6 h-6 text-orange-500" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const steps = [
    { title: 'Projektstatus', render: renderProjectStatus },
    { title: 'Zeitrahmen', render: renderTimeframe },
    { title: 'Wärmedämmung', render: renderInsulation },
    { title: 'Unterkellerung', render: renderBasement },
    { title: 'Erreichbarkeit', render: renderAccessibility },
  ];

  return (
    <>
      <Head>
        <title>Projekt-Details - Balkon-Konfigurator | BALKONFUCHS</title>
        <meta name="description" content="Geben Sie weitere Details zu Ihrem Balkon-Projekt an." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />
        
        <main className="max-w-3xl mx-auto px-4 py-8">
          {/* Progress Bar - Gesamtfortschritt im Funnel */}
          <div className="mb-6">
            <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
              <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: '50%' }}></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>Projekt-Details</span>
              <span>Schritt 3 von 6</span>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
            {/* Progress Bar - Fortschritt innerhalb der Projekt-Details */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Frage {currentStep + 1} von {steps.length}</span>
                <span className="text-sm text-gray-400">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Current Step Content */}
            <div className="mb-8">
              {steps[currentStep].render()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                ← Zurück
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors"
              >
                {currentStep === steps.length - 1 ? 'Zur Zusammenfassung →' : 'Weiter →'}
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

