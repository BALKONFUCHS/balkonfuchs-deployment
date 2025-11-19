import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ZohoSalesIQ from '../../components/ZohoSalesIQ.js';
import { captureHtmlToPng, escapeHtml, SummaryRow, buildSectionHtml, buildRowsHtml } from '../../utils/summary-capture';

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

// Labels für bessere Lesbarkeit
const balconyTypeLabels: Record<string, string> = {
  anbau: 'Anbaubalkon (2 Stützen vorne)',
  vorstell: 'Vorstellbalkon (4 Stützen)',
  winkel: 'Winkelprofil-System',
  lisenen: 'Lisenenbalkon (2 Stützen an Wand)',
  haenge: 'Hängebalkon (0 Stützen)',
};

const supportMaterialLabels: Record<string, string> = {
  steel: 'Stahl',
  aluminum: 'Aluminium',
  wood: 'Holz',
  any: 'Ist mir egal',
};

const supportShapeLabels: Record<string, string> = {
  round: 'Rundstütze',
  square: 'Quadratstütze',
};

const supportSurfaceLabels: Record<string, string> = {
  verzinkt: 'Verzinkt',
  pulver: 'Pulverbeschichtet',
};

const supportColorLabels: Record<string, string> = {
  anthrazit: 'Anthrazit (RAL 7016)',
  greige: 'Grau-Beige (RAL 7030)',
  braun: 'Dunkelbraun (RAL 8014)',
  gruen: 'Dunkelgrün (RAL 6005)',
  weiss: 'Weiß (RAL 9016)',
  weissalu: 'Weißaluminium (RAL 9006)',
};

const railingSurfaceLabels: Record<string, string> = {
  verzinkt: 'Verzinkt',
  pulver: 'Pulverbeschichtet',
  edelstahl: 'Edelstahl',
};

const railingFillLabels: Record<string, string> = {
  'stab-rund': 'Stabgeländer (Rundstäbe Ø10mm)',
  'stab-flach': 'Flachstahlgeländer (10×40mm)',
  'glas-klar': 'Klarglas',
  'glas-matt': 'Milchglas',
  geschlossen: 'Geschlossene Füllung',
  strukturblech: 'Strukturblech (florale Füllung)',
  hpl: 'HPL-Platte (Trespa Meteon)',
};

const floorTypeLabels: Record<string, string> = {
  'wood-larch': 'Sibirische Lärche',
  'wood-bangkirai': 'Bangkirai',
  wpc: 'WPC (Wood-Plastic-Composite)',
  'alu-yellow': 'Granit gelb',
  'alu-brown': 'Granit Braun',
  'alu-anthracite': 'Granit Dunkel',
  'alu-silver': 'Granit Hell',
  stone: 'Steinplattenbelag',
  balkoplan: 'Beschichtete Industrieplatte',
};

const roofMaterialLabels: Record<string, string> = {
  geschlossen: 'Geschlossen (weiß)',
  'glas-klar': 'Transparentes Glas',
  'glas-matt': 'Milchglas',
};

const contactPreferenceLabels: Record<string, string> = {
  email: 'E-Mail',
  phone: 'Telefon',
  both: 'Beides',
};

const projectStatusLabels: Record<string, string> = {
  idea: 'Habe noch keine konkrete Idee',
  feasibility: 'Möchte Machbarkeit prüfen',
  submitted: 'Bauantrag ist eingereicht',
  approved: 'Ich habe bereits eine Genehmigung',
  seeking: 'Suche jetzt nach passender Firma',
};

const timeframeLabels: Record<string, string> = {
  asap: 'So schnell wie möglich',
  '3months': 'In den nächsten 3 Monaten',
  '6months': 'In den nächsten 6 Monaten',
  unclear: 'Noch unklar',
};

const insulationLabels: Record<string, string> = {
  existing: 'Ja, vorhanden',
  planned: 'In Planung',
  none: 'Keine Dämmung',
};

const basementLabels: Record<string, string> = {
  yes: 'Ja, unterkellert',
  no: 'Nein, nicht unterkellert',
  unknown: 'Weiß ich nicht',
};

const accessibilityLabels: Record<string, string> = {
  good: 'Gut erreichbar',
  limited: 'Eingeschränkt erreichbar',
  difficult: 'Schwer erreichbar',
  impossible: 'Nicht erreichbar',
};

const offerRegionLabels: Record<string, string> = {
  regional: 'Regional',
  overregional: 'Überregional',
  bundesweit: 'Bundesweit',
};

const offerCountLabels: Record<string, string> = {
  '3': '3 Angebote',
  '4': '4 Angebote',
  '5': '5 Angebote',
  'mehr': '5 oder mehr',
};

const createKonfiguratorSummaryHtml = (
  config: BalconyConfig,
  contact: ContactData,
  projectDetails: any,
  offerPreferences: any,
  timestamp: string
): string => {
  const contactRows: SummaryRow[] = [
    { label: 'Anrede', value: contact.salutation || '-' },
    { label: 'Vorname', value: contact.firstName || '-' },
    { label: 'Nachname', value: contact.lastName || '-' },
    { label: 'E-Mail', value: contact.email || '-' },
    { label: 'Telefon', value: contact.phone || '-' },
    { label: 'PLZ', value: contact.zipCode || '-' },
    { label: 'Adresse', value: contact.address || '-' },
    { label: 'Ort', value: contact.city || '-' },
    { label: 'Kontaktpräferenz', value: contactPreferenceLabels[contact.contactPreference] || contact.contactPreference || '-' },
    { label: 'Newsletter', value: contact.newsletter ? 'Ja' : 'Nein' },
    { label: 'Balkonbrief', value: contact.balkonbrief ? 'Ja' : 'Nein' },
    { label: 'Datenschutz', value: contact.privacy ? 'Bestätigt' : 'Offen' },
  ];

  const balconyRows: SummaryRow[] = [
    { label: 'Balkontyp', value: balconyTypeLabels[config.type] || config.type },
    { label: 'Breite', value: `${config.width.toFixed(2)} m` },
    { label: 'Tiefe', value: `${config.depth.toFixed(2)} m` },
    { label: 'Anzahl Balkone', value: String(config.count) },
    { label: 'Höhe bis zum ersten Balkon', value: `${config.firstHeight.toFixed(1)} m` },
    { label: 'Geschosshöhe', value: `${config.floorHeight.toFixed(2)} m` },
    { label: 'Stützenposition', value: config.supportPosition === 'inside' ? 'Innen' : 'Außen' },
  ];

  const materialRows: SummaryRow[] = [
    { label: 'Tragkonstruktion Material', value: supportMaterialLabels[config.supportMaterial] || config.supportMaterial },
    { label: 'Stützenform', value: supportShapeLabels[config.supportShape] || config.supportShape },
    { label: 'Stützenoberfläche', value: supportSurfaceLabels[config.supportSurface] || config.supportSurface },
    { label: config.supportSurface === 'pulver' ? 'Stützenfarbe' : 'Stützenfarbe (Standard)', value: supportColorLabels[config.supportColor] || config.supportColor },
    { label: 'Geländeroberfläche', value: railingSurfaceLabels[config.railingSurface] || config.railingSurface },
    { label: config.railingSurface === 'pulver' ? 'Geländerfarbe' : 'Geländerfarbe (Standard)', value: railingColorLabels[config.railingColor] || config.railingColor },
    { label: 'Geländerfüllung', value: railingFillLabels[config.railingFill] || config.railingFill },
    { label: config.railingFill === 'hpl' ? 'HPL-Farbe' : '', value: config.railingFill === 'hpl' ? (config.hplColor || '-') : '' },
    { label: 'Balkonboden', value: floorTypeLabels[config.floorType] || config.floorType },
  ];

  const additionalRows: SummaryRow[] = [
    { label: 'Überdachung', value: config.hasRoof ? 'Ja' : 'Nein' },
    { label: config.hasRoof ? 'Überdachungshöhe' : '', value: config.hasRoof ? `${config.roofHeight.toFixed(2)} m` : '' },
    { label: config.hasRoof ? 'Überdachungsmaterial' : '', value: config.hasRoof ? roofMaterialLabels[config.roofMaterial] || config.roofMaterial : '' },
    { label: 'Sichtschutz links', value: config.privacyLeft ? 'Ja (+1,00m Höhe)' : 'Nein' },
    { label: 'Sichtschutz rechts', value: config.privacyRight ? 'Ja (+1,00m Höhe)' : 'Nein' },
  ].filter(row => row.label !== '');

  const projectRows: SummaryRow[] = projectDetails ? [
    { label: 'Projektstatus', value: projectStatusLabels[projectDetails.projectStatus] || projectDetails.projectStatus || '-' },
    { label: 'Zeitrahmen', value: timeframeLabels[projectDetails.timeframe] || projectDetails.timeframe || '-' },
    { label: 'Wärmedämmung', value: insulationLabels[projectDetails.insulation] || projectDetails.insulation || '-' },
    { label: 'Unterkellerung', value: basementLabels[projectDetails.basement] || projectDetails.basement || '-' },
    { label: 'Erreichbarkeit', value: accessibilityLabels[projectDetails.accessibility] || projectDetails.accessibility || '-' },
  ] : [];

  const offerRows: SummaryRow[] = offerPreferences ? [
    { label: 'Anzahl Angebote', value: offerCountLabels[offerPreferences.count] || offerPreferences.count || '-' },
    { label: 'Angebotsregion', value: offerRegionLabels[offerPreferences.region] || offerPreferences.region || '-' },
  ] : [];

  return `
    <div style="font-family: 'Inter', sans-serif; background: #111827; color: #F9FAFB; padding: 32px; border-radius: 20px; width: 100%; box-shadow: 0 25px 50px rgba(15,23,42,0.55);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:24px; margin-bottom:28px;">
        <div>
          <div style="font-size:14px; letter-spacing:0.08em; text-transform:uppercase; color:#F59E0B; margin-bottom:8px;">BalkonFuchs Konfigurator</div>
          <h1 style="margin:0 0 6px; font-size:28px;">Konfigurationszusammenfassung</h1>
          <p style="margin:0; color:#9CA3AF; font-size:14px;">Erstellt am ${escapeHtml(timestamp)}</p>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px;">
        ${buildSectionHtml('Kontaktdaten', contactRows)}
        ${buildSectionHtml('Balkon-Konfiguration', balconyRows)}
      </div>

      <div style="margin-top:24px; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px;">
        ${buildSectionHtml('Materialien & Ausstattung', materialRows)}
        ${buildSectionHtml('Zusatzausstattung', additionalRows)}
      </div>

      ${projectRows.length > 0 ? `
      <div style="margin-top:24px;">
        ${buildSectionHtml('Projekt-Details', projectRows)}
      </div>
      ` : ''}
      ${offerRows.length > 0 ? `
      <div style="margin-top:24px;">
        ${buildSectionHtml('Angebots-Präferenzen', offerRows)}
      </div>
      ` : ''}
    </div>
  `;
};

const railingColorLabels: Record<string, string> = {
  anthrazit: 'Anthrazit (RAL 7016)',
  greige: 'Grau-Beige (RAL 7030)',
  braun: 'Dunkelbraun (RAL 8014)',
  gruen: 'Dunkelgrün (RAL 6005)',
  weiss: 'Weiß (RAL 9016)',
  weissalu: 'Weißaluminium (RAL 9006)',
};

export default function KonfiguratorZusammenfassung() {
  const router = useRouter();
  const [config, setConfig] = useState<BalconyConfig | null>(null);
  const [contact, setContact] = useState<ContactData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const summaryRef = useRef<HTMLDivElement>(null);

  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [offerPreferences, setOfferPreferences] = useState<any>(null);

  const [totalSteps, setTotalSteps] = useState(6);

  useEffect(() => {
    // Konfiguration, Kontaktdaten, Projekt-Details und Angebots-Präferenzen aus localStorage laden
    const savedConfig = localStorage.getItem('balkonkonfigurator_data');
    const savedContact = localStorage.getItem('balkonkonfigurator_contact');
    const savedProjectDetails = localStorage.getItem('balkonkonfigurator_project_details');
    const savedOfferPreferences = localStorage.getItem('balkonkonfigurator_offer_preferences');

    if (!savedConfig || !savedContact) {
      // Daten fehlen, zurück zum Konfigurator
      router.push('/balkon-konfigurator');
      return;
    }

    setConfig(JSON.parse(savedConfig));
    setContact(JSON.parse(savedContact));
    if (savedProjectDetails) {
      const details = JSON.parse(savedProjectDetails);
      setProjectDetails(details);
      // Prüfen ob Angebots-Präferenzen benötigt werden
      const wantsOffer = details.projectStatus === 'seeking' || details.projectStatus === 'approved';
      setTotalSteps(wantsOffer ? 6 : 5);
    }
    if (savedOfferPreferences) {
      setOfferPreferences(JSON.parse(savedOfferPreferences));
    }
  }, [router]);

  const handleSubmit = async () => {
    if (!config || !contact) {
      setError('Daten fehlen. Bitte starten Sie den Konfigurator erneut.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Zusammenfassung als HTML erstellen
      const timestamp = new Date().toLocaleString('de-DE');
      const summaryHtml = createKonfiguratorSummaryHtml(config, contact, projectDetails, offerPreferences, timestamp);

      // Screenshot erstellen
      const summaryAttachment = await captureHtmlToPng(summaryHtml, {
        fileNamePrefix: 'balkonfuchs-konfigurator',
        width: 900,
        backgroundColor: '#111827',
      });

      // Daten für Zoho vorbereiten
      const exportData: any = {
        contact: {
          salutation: contact.salutation,
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          zipCode: contact.zipCode,
          address: contact.address,
          city: contact.city,
          contactPreference: contact.contactPreference,
          newsletter: contact.newsletter,
          privacy: contact.privacy,
          balkonbrief: contact.balkonbrief,
        },
        funnel: {
          type: 'konfigurator',
          name: 'Balkon-Konfigurator',
        },
          funnelData: {
            ...config,
            projectStatus: projectDetails?.projectStatus || '',
            timeframe: projectDetails?.timeframe || '',
            insulation: projectDetails?.insulation || '',
            basement: projectDetails?.basement || '',
            accessibility: projectDetails?.accessibility || '',
            offerPreferences: offerPreferences || null,
          },
        timestamp: new Date().toISOString(),
        source: 'BalkonFuchs Konfigurator',
        funnelType: 'Konfigurator',
      };

      if (summaryAttachment?.base64) {
        exportData.pdfAttachment = summaryAttachment;
      }

      // An Zoho senden
      console.log('Exporting to Zoho:', exportData);
      
      try {
        const zohoResult = await fetch('/.netlify/functions/submit-to-zoho', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(exportData),
        });
        
        const zohoData = await zohoResult.json();
        
        if (zohoData.success) {
          console.log('Successfully exported to Zoho:', zohoData);
          localStorage.setItem('zohoExport', JSON.stringify({
            deskTicketId: zohoData.deskTicket?.id,
            crmLeadId: zohoData.crmLead?.details?.id,
            timestamp: new Date().toISOString(),
          }));
        } else {
          console.error('Zoho export failed:', zohoData.error);
        }
      } catch (error) {
        console.error('Error calling Zoho API:', error);
      }

      // Weiterleitung zur Verabschiedungs-Seite
      router.push('/balkon-konfigurator/danke');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Fehler beim Senden. Bitte versuchen Sie es erneut.');
      setIsSubmitting(false);
    }
  };

  if (!config || !contact) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-300">Lade Daten...</p>
        </div>
      </div>
    );
  }

  const area = (config.width * config.depth * config.count).toFixed(1);

  return (
    <>
      <Head>
        <title>Zusammenfassung - Balkon-Konfigurator | BALKONFUCHS</title>
        <meta name="description" content="Überprüfen Sie Ihre Balkon-Konfiguration vor dem Absenden." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Progress Bar - Gesamtfortschritt */}
          <div className="mb-6">
            <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
              <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: `${((totalSteps - 1) / totalSteps) * 100}%` }}></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>Zusammenfassung</span>
              <span>Schritt {totalSteps - 1} von {totalSteps}</span>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">📋 Ihre Konfiguration im Überblick</h1>
              <p className="text-lg text-gray-300">
                Bitte überprüfen Sie Ihre Angaben. Sie können noch Änderungen vornehmen, bevor wir Ihr Angebot erstellen.
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <div ref={summaryRef} id="konfigurator-summary" className="space-y-6">
              {/* Kontaktdaten */}
              <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">👤 Kontaktdaten</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong className="text-orange-400">Anrede:</strong> <span className="text-gray-300">{contact.salutation || '-'}</span></div>
                  <div><strong className="text-orange-400">Vorname:</strong> <span className="text-gray-300">{contact.firstName}</span></div>
                  <div><strong className="text-orange-400">Nachname:</strong> <span className="text-gray-300">{contact.lastName}</span></div>
                  <div><strong className="text-orange-400">E-Mail:</strong> <span className="text-gray-300">{contact.email}</span></div>
                  <div><strong className="text-orange-400">Telefon:</strong> <span className="text-gray-300">{contact.phone || '-'}</span></div>
                  <div><strong className="text-orange-400">PLZ:</strong> <span className="text-gray-300">{contact.zipCode}</span></div>
                  {contact.address && <div><strong className="text-orange-400">Adresse:</strong> <span className="text-gray-300">{contact.address}</span></div>}
                  {contact.city && <div><strong className="text-orange-400">Stadt:</strong> <span className="text-gray-300">{contact.city}</span></div>}
                  <div><strong className="text-orange-400">Kontaktpräferenz:</strong> <span className="text-gray-300">{contactPreferenceLabels[contact.contactPreference] || contact.contactPreference}</span></div>
                  <div><strong className="text-orange-400">Newsletter:</strong> <span className="text-gray-300">{contact.newsletter ? 'Ja' : 'Nein'}</span></div>
                </div>
              </div>

              {/* Balkon-Konfiguration */}
              <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">🏗️ Balkon-Konfiguration</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong className="text-orange-400">Balkontyp:</strong> <span className="text-gray-300">{balconyTypeLabels[config.type] || config.type}</span></div>
                  <div><strong className="text-orange-400">Breite:</strong> <span className="text-gray-300">{config.width.toFixed(2)} m</span></div>
                  <div><strong className="text-orange-400">Tiefe:</strong> <span className="text-gray-300">{config.depth.toFixed(2)} m</span></div>
                  <div><strong className="text-orange-400">Anzahl Balkone:</strong> <span className="text-gray-300">{config.count}</span></div>
                  <div><strong className="text-orange-400">Gesamtfläche:</strong> <span className="text-gray-300">{area} m²</span></div>
                  <div><strong className="text-orange-400">Höhe bis zum ersten Balkon:</strong> <span className="text-gray-300">{config.firstHeight.toFixed(1)} m</span></div>
                  <div><strong className="text-orange-400">Geschosshöhe:</strong> <span className="text-gray-300">{config.floorHeight.toFixed(2)} m</span></div>
                  <div><strong className="text-orange-400">Stützenposition:</strong> <span className="text-gray-300">{config.supportPosition === 'inside' ? 'Innen' : 'Außen'}</span></div>
                </div>
              </div>

              {/* Materialien */}
              <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">🔧 Materialien & Ausstattung</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong className="text-orange-400">Tragkonstruktion:</strong> <span className="text-gray-300">{supportMaterialLabels[config.supportMaterial] || config.supportMaterial}</span></div>
                  <div><strong className="text-orange-400">Stützenform:</strong> <span className="text-gray-300">{supportShapeLabels[config.supportShape] || config.supportShape}</span></div>
                  <div><strong className="text-orange-400">Stützenoberfläche:</strong> <span className="text-gray-300">{supportSurfaceLabels[config.supportSurface] || config.supportSurface}</span></div>
                  {config.supportSurface === 'pulver' && (
                    <div><strong className="text-orange-400">Stützenfarbe:</strong> <span className="text-gray-300">{supportColorLabels[config.supportColor] || config.supportColor}</span></div>
                  )}
                  <div><strong className="text-orange-400">Geländeroberfläche:</strong> <span className="text-gray-300">{railingSurfaceLabels[config.railingSurface] || config.railingSurface}</span></div>
                  {config.railingSurface === 'pulver' && (
                    <div><strong className="text-orange-400">Geländerfarbe:</strong> <span className="text-gray-300">{railingColorLabels[config.railingColor] || config.railingColor}</span></div>
                  )}
                  <div><strong className="text-orange-400">Geländerfüllung:</strong> <span className="text-gray-300">{railingFillLabels[config.railingFill] || config.railingFill}</span></div>
                  {config.railingFill === 'hpl' && (
                    <div><strong className="text-orange-400">HPL-Farbe:</strong> <span className="text-gray-300">{config.hplColor || '-'}</span></div>
                  )}
                  <div><strong className="text-orange-400">Balkonboden:</strong> <span className="text-gray-300">{floorTypeLabels[config.floorType] || config.floorType}</span></div>
                </div>
              </div>

              {/* Zusatzausstattung */}
              <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">✨ Zusatzausstattung</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong className="text-orange-400">Überdachung:</strong> <span className="text-gray-300">{config.hasRoof ? 'Ja' : 'Nein'}</span></div>
                  {config.hasRoof && (
                    <>
                      <div><strong className="text-orange-400">Überdachungshöhe:</strong> <span className="text-gray-300">{config.roofHeight.toFixed(2)} m</span></div>
                      <div><strong className="text-orange-400">Überdachungsmaterial:</strong> <span className="text-gray-300">{roofMaterialLabels[config.roofMaterial] || config.roofMaterial}</span></div>
                    </>
                  )}
                  <div><strong className="text-orange-400">Sichtschutz links:</strong> <span className="text-gray-300">{config.privacyLeft ? 'Ja (+1,00m Höhe)' : 'Nein'}</span></div>
                  <div><strong className="text-orange-400">Sichtschutz rechts:</strong> <span className="text-gray-300">{config.privacyRight ? 'Ja (+1,00m Höhe)' : 'Nein'}</span></div>
                </div>
              </div>

              {/* Projekt-Details */}
              {projectDetails && (
                <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4">📋 Projekt-Details</h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong className="text-orange-400">Projektstatus:</strong> <span className="text-gray-300">{projectStatusLabels[projectDetails.projectStatus] || projectDetails.projectStatus || '-'}</span></div>
                    <div><strong className="text-orange-400">Zeitrahmen:</strong> <span className="text-gray-300">{timeframeLabels[projectDetails.timeframe] || projectDetails.timeframe || '-'}</span></div>
                    <div><strong className="text-orange-400">Wärmedämmung:</strong> <span className="text-gray-300">{insulationLabels[projectDetails.insulation] || projectDetails.insulation || '-'}</span></div>
                    <div><strong className="text-orange-400">Unterkellerung:</strong> <span className="text-gray-300">{basementLabels[projectDetails.basement] || projectDetails.basement || '-'}</span></div>
                    <div><strong className="text-orange-400">Erreichbarkeit:</strong> <span className="text-gray-300">{accessibilityLabels[projectDetails.accessibility] || projectDetails.accessibility || '-'}</span></div>
                  </div>
                </div>
              )}

              {/* Angebots-Präferenzen */}
              {offerPreferences && (
                <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4">📋 Angebots-Präferenzen</h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong className="text-orange-400">Anzahl Angebote:</strong> <span className="text-gray-300">{offerCountLabels[offerPreferences.count] || offerPreferences.count || '-'}</span></div>
                    <div><strong className="text-orange-400">Angebotsregion:</strong> <span className="text-gray-300">{offerRegionLabels[offerPreferences.region] || offerPreferences.region || '-'}</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => {
                  // Zurück zur richtigen Seite - prüfen ob Angebots-Präferenzen vorhanden
                  if (offerPreferences) {
                    router.push('/balkon-konfigurator/angebots-praeferenzen');
                  } else {
                    router.push('/balkon-konfigurator/projekt-details');
                  }
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                ← Zurück
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Wird gesendet...' : '✓ Jetzt absenden'}
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

