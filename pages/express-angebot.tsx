import React, { useState } from 'react';
import Head from 'next/head';
import { ArrowLeft, ArrowRight, Mail, Menu, Check } from 'lucide-react';
import { LEAD_SCORING_FUNCTIONS } from '../utils/balkon-lead-scoring';
import ZohoSalesIQ from '../components/ZohoSalesIQ.js';
import PhoneInput from '../components/PhoneInput';
import { captureHtmlToPng, escapeHtml, SummaryRow, buildSectionHtml } from '../utils/summary-capture';

interface ExpressSummaryContext {
  timestamp: string;
  contactRows: SummaryRow[];
  projectRows: SummaryRow[];
  preferenceRows: SummaryRow[];
  scoringRows: SummaryRow[];
  statusLabel: string;
  statusColor: string;
  leadScoreValue: string;
}

const createExpressSummaryHtml = (context: ExpressSummaryContext): string => {
  const { timestamp, contactRows, projectRows, preferenceRows, scoringRows, statusLabel, statusColor, leadScoreValue } =
    context;

  return `
    <div style="font-family: 'Inter', sans-serif; background: #111827; color: #F9FAFB; padding: 32px; border-radius: 20px; width: 100%; box-shadow: 0 25px 50px rgba(15,23,42,0.55);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:24px; margin-bottom:28px;">
        <div>
          <div style="font-size:14px; letter-spacing:0.08em; text-transform:uppercase; color:#34D399; margin-bottom:8px;">Balkonfuchs Express-Angebot</div>
          <h1 style="margin:0 0 6px; font-size:28px;">Projektzusammenfassung</h1>
          <p style="margin:0; color:#9CA3AF; font-size:14px;">Erstellt am ${escapeHtml(timestamp)}</p>
        </div>
        <div style="text-align:right;">
          <div style="font-size:13px; color:#9CA3AF; text-transform:uppercase; letter-spacing:0.08em;">Lead-Kategorie</div>
          <div style="margin-top:6px; font-size:20px; font-weight:700; color:${statusColor}; text-transform:capitalize;">
            ${escapeHtml(statusLabel)}
          </div>
          <div style="margin-top:6px; font-size:12px; color:#9CA3AF;">Lead Score: ${escapeHtml(leadScoreValue)}</div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px;">
        ${buildSectionHtml('Kontakt', contactRows)}
        ${buildSectionHtml('Projektübersicht', projectRows)}
      </div>

      <div style="margin-top:24px; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px;">
        ${buildSectionHtml('Angebotspräferenzen', preferenceRows)}
        ${buildSectionHtml('Lead Bewertung', scoringRows)}
      </div>
    </div>
  `;
};

const BALKONFUCHSExpressAngebotFunnel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [urgencyLevel, setUrgencyLevel] = useState('standard');

  const [formData, setFormData] = useState({
    approvalStatus: '',
    timeframe: '',
    projectData: '',
    budget: '',
    execution: [],
    balconyDetails: {
      type: '',
      size: { width: '', depth: '' },
      count: 1
    },
    additionalInfo: '',
    offerPreferences: {
      count: '',
      region: ''
    },
    contactPreference: '',
    contact: {
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: ''
    }
  });

  const steps = [
    'Genehmigungsstatus',
    'Zeitplan',
    'Projektdaten',
    'Budget',
    'Balkon-Details',
    'Ausführung',
    'Zusätzliche Informationen',
    'Angebotspräferenzen',
    'Kontaktpräferenz'
  ];

  const questions = [
    {
      id: 'approval_status',
      type: 'approval_status',
      title: 'Genehmigungsstatus',
      subtitle: 'Haben Sie bereits eine Baugenehmigung für Ihren Balkon?',
      options: [
        { id: 'approved', title: 'Genehmigung liegt vor', subtitle: 'Baugenehmigung ist bereits vorhanden', icon: '✅' },
        { id: 'pending', title: 'Genehmigung beantragt', subtitle: 'Antrag läuft bereits', icon: '⏳' },
        { id: 'not_applied', title: 'Noch nicht beantragt', subtitle: 'Genehmigung muss noch beantragt werden', icon: '📝' }
      ]
    },
    {
      id: 'timeframe',
      type: 'timeframe',
      title: 'Zeitplan',
      subtitle: 'Wann soll der Balkon fertiggestellt sein?',
      options: [
        { id: 'urgent', title: 'Sehr dringend (2-4 Wochen)', subtitle: 'Sofortige Umsetzung erforderlich', icon: '🚨' },
        { id: 'medium', title: 'Mittlere Dringlichkeit (1-3 Monate)', subtitle: 'Planung und Umsetzung in den nächsten Monaten', icon: '📅' },
        { id: 'flexible', title: 'Flexibel (3-6 Monate)', subtitle: 'Zeit für sorgfältige Planung', icon: '🕐' }
      ]
    },
    {
      id: 'project_data',
      type: 'project_data',
      title: 'Projektdaten',
      subtitle: 'Welche Art von Balkon-Projekt planen Sie?',
      options: [
        { id: 'new_building', title: 'Neubau', subtitle: 'Balkon wird in ein neues Gebäude integriert', icon: '🏗️' },
        { id: 'renovation', title: 'Renovierung', subtitle: 'Bestehender Balkon wird saniert/erweitert', icon: '🔨' },
        { id: 'extension', title: 'Anbau', subtitle: 'Neuer Balkon an bestehendem Gebäude', icon: '➕' }
      ]
    },
    {
      id: 'budget',
      type: 'budget',
      title: 'Budget',
      subtitle: 'Welches Budget steht für das Projekt zur Verfügung?',
      options: [
        { id: 'high', title: 'Höheres Budget (15.000€+)', subtitle: 'Premium-Materialien und -Ausführung', icon: '💎' },
        { id: 'medium', title: 'Mittleres Budget (8.000€-15.000€)', subtitle: 'Gute Qualität zu fairem Preis', icon: '💰' },
        { id: 'standard', title: 'Standard-Budget (5.000€-8.000€)', subtitle: 'Solide Ausführung im Standard-Bereich', icon: '💵' }
      ]
    },
    {
      id: 'balcony_details',
      type: 'balcony_details',
      title: 'Balkon-Details',
      subtitle: 'Geben Sie die gewünschten Maße ein'
    },
    {
      id: 'execution',
      type: 'execution',
      title: 'Ausführung',
      subtitle: 'Welche Ausführungsdetails wünschen Sie?'
    },
    {
      id: 'additional_info',
      type: 'additional_info',
      title: 'Zusätzliche Informationen',
      subtitle: 'Haben Sie besondere Wünsche oder Anforderungen?'
    },
    {
      id: 'offer_preferences',
      type: 'offer_preferences',
      title: 'Angebotspräferenzen',
      subtitle: 'Wie viele Angebote möchten Sie erhalten und aus welchem Einzugsgebiet?'
    },
    {
      id: 'contact_preference',
      type: 'contact_preference',
      title: 'Kontaktpräferenz',
      subtitle: 'Wie möchten Sie kontaktiert werden?',
      options: [
        { id: 'email', title: 'E-Mail', subtitle: 'Schnell und unkompliziert', icon: '📧' },
        { id: 'phone', title: 'Telefon', subtitle: 'Persönliches Gespräch', icon: '📞' },
        { id: 'visit', title: 'Vor-Ort-Termin', subtitle: 'Beratung vor Ort', icon: '🏠' }
      ]
    }
  ];

  // Calculate urgency level based on answers
  const calculateUrgencyLevel = () => {
    // Simplified urgency calculation
    if (formData.timeframe === 'urgent') return 'high';
    if (formData.budget === 'high') return 'high';
    if (formData.approvalStatus === 'approved') return 'medium';
    return 'standard';
  };

  React.useEffect(() => {
    setUrgencyLevel(calculateUrgencyLevel());
  }, [formData.approvalStatus, formData.timeframe, formData.projectData, formData.budget]);

  // Handle answer selection
  const handleAnswerSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-advance for certain fields
    if (['approvalStatus', 'timeframe', 'projectData', 'budget', 'contactPreference'].includes(field)) {
      setTimeout(() => nextStep(), 500);
    }
  };

  // Navigation functions
  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.approvalStatus;
      case 1: return formData.timeframe;
      case 2: return formData.projectData;
      case 3: return formData.budget;
      case 4: return formData.balconyDetails.type && formData.balconyDetails.size.width && formData.balconyDetails.size.depth;
      case 5: return true; // Ausführung optional
      case 6: return true; // Additional info optional
      case 7: return formData.offerPreferences.count && formData.offerPreferences.region;
      case 8: return formData.contactPreference;
      default: return true;
    }
  };

  // Render current step
  const renderCurrentStep = () => {
    if (currentStep === questions.length) {
      return renderContactForm();
    } else if (currentStep > questions.length) {
      return renderSuccessPage();
    }

    const question = questions[currentStep];
    
    // Safety check to prevent undefined errors
    if (!question) {
      console.error('Question not found for step:', currentStep);
      return <div className="text-center text-red-400">Fehler: Schritt nicht gefunden</div>;
    }

    switch (question.type) {
      case 'approval_status':
      case 'timeframe':
      case 'project_data':
      case 'budget':
      case 'contact_preference':
        return renderOptionsStep(question);
      case 'balcony_details':
        return renderBalconyDetailsStep();
      case 'execution':
        return renderExecutionStep();
      case 'additional_info':
        return renderAdditionalInfoStep();
      case 'offer_preferences':
        return renderOfferPreferencesStep();
      default:
        return null;
    }
  };

  // Render options step
  const renderOptionsStep = (question) => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">{question.title}</h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        {question.subtitle}
      </p>
      
      <div className="grid gap-4 max-w-2xl mx-auto">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswerSelect(
              question.type === 'approval_status' ? 'approvalStatus' :
              question.type === 'timeframe' ? 'timeframe' :
              question.type === 'project_data' ? 'projectData' :
              question.type === 'budget' ? 'budget' :
              'contactPreference'
            , option.id)}
            className={`p-6 text-left rounded-xl border-2 transition-all duration-300 ${
              formData[question.type === 'approval_status' ? 'approvalStatus' :
                      question.type === 'timeframe' ? 'timeframe' :
                      question.type === 'project_data' ? 'projectData' :
                      question.type === 'budget' ? 'budget' :
                      'contactPreference'] === option.id
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-600/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{option.icon}</div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-semibold text-white mb-2">{option.title}</h3>
                <p className="text-gray-300">{option.subtitle}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // Render execution step (Ausführung)
  const renderExecutionStep = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Ausführung</h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        Welche Ausführungsdetails wünschen Sie?
      </p>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
        {[ 
          { id: 'standard_gelaender', label: 'Standard-Geländer', desc: 'Robust und wirtschaftlich – ideal für Standardausführung.', impact: 'ca. +0–500€' },
          { id: 'premium_gelaender', label: 'Premium-Geländer', desc: 'Hochwertige Optik (z. B. Glas/Design) und Langlebigkeit.', impact: 'ca. +1.000–2.500€' },
          { id: 'seitenschutz', label: 'Seitlicher Windschutz', desc: 'Besserer Schutz bei Wind & Einsicht; erhöht den Komfort.', impact: 'ca. +600–1.200€' },
          { id: 'bodenbelag', label: 'Bodenbelag', desc: 'Fertiger Balkonbelag (z. B. WPC/Fliese) – nutzfertig.', impact: 'ca. +800–1.800€' },
          { id: 'ueberdachung', label: 'Überdachung', desc: 'Schützt vor Regen & Schnee – ganzjährige Nutzbarkeit.', impact: 'ca. +2.500–6.000€' }
        ].map(opt => (
          <label key={opt.id} className="p-4 bg-gray-700/50 border border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={(formData.execution || []).includes(opt.id)}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  execution: e.target.checked
                    ? Array.from(new Set([...(prev.execution || []), opt.id]))
                    : (prev.execution || []).filter(x => x !== opt.id)
                }))}
                className="mt-1 w-5 h-5 text-orange-500 bg-gray-700 border-gray-600 rounded"
              />
              <div>
                <div className="text-white font-medium">{opt.label}</div>
                <div className="text-gray-300 text-sm mt-1">{opt.desc}</div>
                <div className="text-gray-400 text-xs mt-1">Preisindikator: {opt.impact}</div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  // Render balcony details step
  const renderBalconyDetailsStep = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Balkon-Details</h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        Geben Sie die gewünschten Maße ein
      </p>
      
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Balkon-Typ */}
        <div className="text-left">
          <label className="block text-white font-medium mb-3">Balkon-Typ</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { id: 'hanging', title: 'Hängebalkon', icon: '🏗️' },
              { id: 'standing', title: 'Vorstellbalkon', icon: '🏠' },
              { id: 'leaning', title: 'Anlehnbalkon', icon: '🔗' },
              { id: 'loggia', title: 'Loggia', icon: '🏛️' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setFormData(prev => ({
                  ...prev,
                  balconyDetails: { ...prev.balconyDetails, type: type.id }
                }))}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.balconyDetails.type === type.id
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                }`}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <div className="text-white font-medium">{type.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Anzahl der Balkone */}
        <div className="text-left">
          <label className="block text-white font-medium mb-3">Anzahl der Balkone</label>
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
            {[1, 2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => setFormData(prev => ({
                  ...prev,
                  balconyDetails: { ...prev.balconyDetails, count: count }
                }))}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.balconyDetails.count === count
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                }`}
              >
                <div className="text-white font-medium">{count}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Maße */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="text-left">
            <label className="block text-white font-medium mb-2">Breite (m)</label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="10"
              value={formData.balconyDetails.size.width}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                balconyDetails: {
                  ...prev.balconyDetails,
                  size: { ...prev.balconyDetails.size, width: e.target.value }
                }
              }))}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="z.B. 3.0"
            />
          </div>
          
          <div className="text-left">
            <label className="block text-white font-medium mb-2">Tiefe (m)</label>
            <input
              type="number"
              step="0.1"
              min="0.8"
              max="3"
              value={formData.balconyDetails.size.depth}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                balconyDetails: {
                  ...prev.balconyDetails,
                  size: { ...prev.balconyDetails.size, depth: e.target.value }
                }
              }))}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="z.B. 1.5"
            />
          </div>
        </div>

        {/* Flächenberechnung */}
        {formData.balconyDetails.size.width && formData.balconyDetails.size.depth && (
          <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
            <p className="text-white">
              <span className="font-medium">Berechnete Fläche:</span> {' '}
              <span className="text-orange-400 font-bold">
                {(parseFloat(formData.balconyDetails.size.width) * parseFloat(formData.balconyDetails.size.depth)).toFixed(1)} m²
              </span>
            </p>
            {formData.balconyDetails.type === 'hanging' && (parseFloat(formData.balconyDetails.size.width || '0') * parseFloat(formData.balconyDetails.size.depth || '0') > 4.5) && (
              <p className="text-red-400 mt-2">
                Hinweis: Hängebalkone sind aus statischen Gründen in der Regel auf maximal 4,5 m² begrenzt.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Render additional info step
  const renderAdditionalInfoStep = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Zusätzliche Informationen</h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        Haben Sie besondere Wünsche oder Anforderungen?
      </p>
      
      <div className="max-w-2xl mx-auto">
        <textarea
          value={formData.additionalInfo}
          onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
          rows={6}
          className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          placeholder="Beschreiben Sie hier Ihre besonderen Wünsche, Anforderungen oder Fragen..."
        />
        <p className="text-sm text-gray-400 mt-2 text-left">
          Dieses Feld ist optional. Sie können es leer lassen, wenn Sie keine besonderen Anforderungen haben.
        </p>
      </div>
    </div>
  );

  // Render offer preferences step
  const renderOfferPreferencesStep = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Angebotspräferenzen</h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        📋 Wie viele Angebote möchten Sie erhalten und aus welchem Einzugsgebiet?
      </p>
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Anzahl der Angebote */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Anzahl der Angebote</h3>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { value: '3', label: '3 Angebote', icon: '📋' },
              { value: '4', label: '4 Angebote', icon: '📋' },
              { value: '5', label: '5 Angebote', icon: '📋' }
            ].map((option) => (
              <div
                key={option.value}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  formData.offerPreferences.count === option.value
                    ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                    : 'border-gray-700 bg-gray-800/50 hover:border-red-500/50'
                }`}
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  offerPreferences: { ...prev.offerPreferences, count: option.value }
                }))}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <div className="font-semibold text-white">{option.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Einzugsgebiet */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Einzugsgebiet der Partner</h3>
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { 
                value: 'regional', 
                label: 'Regional', 
                subtitle: 'Nur Partner aus Ihrer Region',
                icon: '🏠'
              },
              { 
                value: 'overregional', 
                label: 'Überregional', 
                subtitle: 'Partner aus benachbarten Regionen',
                icon: '🚗'
              },
              { 
                value: 'bundesweit', 
                label: 'Bundesweit', 
                subtitle: 'Partner aus ganz Deutschland',
                icon: '🇩🇪'
              }
            ].map((option) => (
              <div
                key={option.value}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  formData.offerPreferences.region === option.value
                    ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                    : 'border-gray-700 bg-gray-800/50 hover:border-red-500/50'
                }`}
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  offerPreferences: { ...prev.offerPreferences, region: option.value }
                }))}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{option.icon}</div>
                  <div className="font-semibold text-white text-lg mb-2">{option.label}</div>
                  <div className="text-gray-400 text-sm">{option.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bundesweit-Hinweis */}
        {formData.offerPreferences.region === 'bundesweit' && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mt-6">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">ℹ️</div>
              <div className="text-left">
                <h4 className="font-semibold text-blue-400 mb-3">Bundesweiter Service - Wichtiger Hinweis</h4>
                <div className="text-blue-300 space-y-2">
                  <p>
                    <strong>Ab Anfang 2026</strong> können wir Ihnen eine größere Auswahl an Angeboten sowohl von regionalen als auch überregionalen Partnern anbieten.
                  </p>
                  <p>
                    Wir sind derzeit dabei, Partner in anderen Regionen Deutschlands zu qualifizieren und aufzubauen, um Ihnen den bestmöglichen Service zu bieten.
                  </p>
                  <p className="font-medium">
                    💡 Bis dahin empfehlen wir Ihnen, mit regionalen und überregionalen Partnern zu beginnen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render contact form
  const renderContactForm = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Kontaktdaten</h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        Geben Sie Ihre Kontaktdaten ein, um Ihr Express-Angebot zu erhalten
      </p>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-left">
          <label className="block text-white font-medium mb-2">Anrede *</label>
          <select
            value={formData.contact.salutation}
            onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, salutation: e.target.value } }))}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">Bitte wählen</option>
            <option value="Herr">Herr</option>
            <option value="Frau">Frau</option>
            <option value="Divers">Divers</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-left">
            <label className="block text-white font-medium mb-2">Vorname *</label>
            <input
              type="text"
              value={formData.contact.firstName}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                contact: { ...prev.contact, firstName: e.target.value }
              }))}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          
          <div className="text-left">
            <label className="block text-white font-medium mb-2">Nachname *</label>
            <input
              type="text"
              value={formData.contact.lastName}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                contact: { ...prev.contact, lastName: e.target.value }
              }))}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-left">
            <label className="block text-white font-medium mb-2">E-Mail *</label>
            <input
              type="email"
              value={formData.contact.email}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                contact: { ...prev.contact, email: e.target.value }
              }))}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          
          <PhoneInput
            value={formData.contact.phone}
            onChange={(value) => setFormData(prev => ({
              ...prev,
              contact: { ...prev.contact, phone: value }
            }))}
            required={false}
            placeholder="123 456789"
            label="Telefon"
            className="text-left"
          />
        </div>

        <div className="text-left">
          <label className="block text-white font-medium mb-2">Straße & Hausnummer</label>
          <input
            type="text"
            value={formData.contact.address}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              contact: { ...prev.contact, address: e.target.value }
            }))}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-left">
            <label className="block text-white font-medium mb-2">PLZ</label>
            <input
              type="text"
              value={formData.contact.zipCode}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                contact: { ...prev.contact, zipCode: e.target.value }
              }))}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          <div className="text-left">
            <label className="block text-white font-medium mb-2">Stadt</label>
            <input
              type="text"
              value={formData.contact.city}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                contact: { ...prev.contact, city: e.target.value }
              }))}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Render success page
  const renderSuccessPage = () => (
    <div className="text-center">
      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-12 h-12 text-white" />
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4">
        🎉 Vielen Dank{formData.contact.firstName ? `, ${formData.contact.firstName}` : ''}!
      </h2>
      
      <p className="text-xl text-gray-300 mb-8">
        Ihr Express-Angebot wird in wenigen Minuten per E-Mail zugesendet.
      </p>
      
      {/* Project Summary */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8 max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-white mb-4">Ihr Projekt-Überblick</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div>
            <p className="text-gray-400">Genehmigungsstatus: <span className="text-white">{formData.approvalStatus === 'approved' ? 'Genehmigung liegt vor' : formData.approvalStatus === 'pending' ? 'Genehmigung beantragt' : 'Noch nicht beantragt'}</span></p>
            <p className="text-gray-400">Zeitplan: <span className="text-white">{formData.timeframe === 'urgent' ? 'Sehr dringend (2-4 Wochen)' : formData.timeframe === 'medium' ? 'Mittlere Dringlichkeit (1-3 Monate)' : 'Flexibel (3-6 Monate)'}</span></p>
            <p className="text-gray-400">Projekttyp: <span className="text-white">{formData.projectData === 'new_building' ? 'Neubau' : formData.projectData === 'renovation' ? 'Renovierung' : 'Anbau'}</span></p>
            {formData.additionalInfo && (
              <p className="text-gray-400">Zusätzliche Infos: <span className="text-white">{formData.additionalInfo}</span></p>
            )}
          </div>
          <div>
            <p className="text-gray-400">Budget: <span className="text-white">{formData.budget === 'high' ? 'Höheres Budget (15.000€+)' : formData.budget === 'medium' ? 'Mittleres Budget (8.000€-15.000€)' : 'Standard-Budget (5.000€-8.000€)'}</span></p>
            <p className="text-gray-400">Balkon-Typ: <span className="text-white">{
              formData.balconyDetails.type === 'hanging' ? 'Hängebalkon' : 
              formData.balconyDetails.type === 'standing' ? 'Vorstellbalkon' : 
              formData.balconyDetails.type === 'leaning' ? 'Anlehnbalkon' : 
              'Loggia'
            }</span></p>
            <p className="text-gray-400">Anzahl: <span className="text-white">{formData.balconyDetails.count} Balkon{formData.balconyDetails.count > 1 ? 'e' : ''}</span></p>
            {formData.balconyDetails.size.width && formData.balconyDetails.size.depth && (
              <p className="text-gray-400">Fläche pro Balkon: <span className="text-white">{(parseFloat(formData.balconyDetails.size.width) * parseFloat(formData.balconyDetails.size.depth)).toFixed(1)} m²</span></p>
            )}
            {(formData.execution && formData.execution.length > 0) && (
              <p className="text-gray-400">Ausführung/Extras: <span className="text-white">{
                formData.execution.map(k => (
                  k === 'standard_gelaender' ? 'Standard-Geländer' :
                  k === 'premium_gelaender' ? 'Premium-Geländer' :
                  k === 'seitenschutz' ? 'Seitlicher Windschutz' :
                  k === 'bodenbelag' ? 'Bodenbelag' :
                  k === 'ueberdachung' ? 'Überdachung' : k
                )).join(', ')
              }</span></p>
            )}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8 max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">Nächste Schritte</h3>
        <div className="text-left space-y-2 text-gray-300">
          <p>1. Sie erhalten in wenigen Minuten eine E-Mail mit Ihrem Express-Angebot</p>
          <p>2. Unser Team prüft die technische Machbarkeit</p>
          <p>3. Bei Fragen kontaktieren wir Sie innerhalb von 24 Stunden</p>
          <p>4. Terminvereinbarung für die detaillierte Planung</p>
        </div>
      </div>

      {/* Intelligente Cross-Verlinkungen */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Was möchten Sie als nächstes tun?</h3>
        <p className="text-gray-400">Wir haben diese nächsten Schritte für Sie zusammengestellt:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Balkon-Planer */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">🎨 Balkon-Planer nutzen</h4>
            <p className="text-gray-400 mb-4">
              Visualisieren Sie Ihren Traum-Balkon mit unserem interaktiven Planer
            </p>
            <a href="/planer" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all w-full text-center">
              Jetzt planen →
            </a>
          </div>
          
          {/* Empfehlungen ansehen */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">⭐ Empfehlungen ansehen</h4>
            <p className="text-gray-400 mb-4">
              Lassen Sie sich von erfolgreichen Balkonprojekten inspirieren
            </p>
            <a href="/empfehlungen" className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all w-full text-center">
              Empfehlungen ansehen →
            </a>
          </div>
          
          {/* Partner werden */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2.01.99L12 11l-1.99-2.01A2.5 2.5 0 0 0 8 8H5.46c-.8 0-1.54.37-2.01.99L1 12.5V22h2v-6h2.5l2.54 7.63A1.5 1.5 0 0 0 9.46 24H12c.8 0 1.54-.37 2.01-.99L16 21l1.99 2.01A2.5 2.5 0 0 0 20 24h2.54c.8 0 1.54-.37 2.01-.99L27 16.5V22h2z"/>
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">🤝 Partner werden</h4>
            <p className="text-gray-400 mb-4">
              Werden Sie Teil unseres Balkonbau-Partnernetzwerks
            </p>
            <a href="/partner-werden" className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all w-full text-center">
              Partner werden →
            </a>
          </div>
        </div>
      </div>

    </div>
  );

  // Form validation
  const isFormComplete = () => {
    const emailOk = !!formData.contact.email; // E-Mail immer Pflicht
    const phoneRequired = formData.contactPreference === 'phone';
    const phoneOk = phoneRequired ? !!formData.contact.phone : true;
    const salutationOk = !!formData.contact.salutation;
    return salutationOk && emailOk && phoneOk && formData.contact.firstName && formData.contact.lastName;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!isFormComplete()) return;

    // Show loading state
    setCurrentStep(questions.length + 0.5);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Calculate Lead Score (dynamisch, basierend auf Eingaben)
      const base = 50;
      const timeframeScore = formData.timeframe === 'urgent' ? 30 : formData.timeframe === 'medium' ? 15 : 0;
      const approvalScore = formData.approvalStatus === 'approved' ? 20 : formData.approvalStatus === 'pending' ? 10 : 0;
      const budgetScore = formData.budget === 'high' ? 10 : formData.budget === 'medium' ? 5 : 0;
      const offers = String(formData.offerPreferences?.count || '');
      const offerScore = offers === '5' ? 5 : offers === '4' ? 3 : offers === '3' ? 1 : 0;
      const totalScore = Math.min(100, base + timeframeScore + approvalScore + budgetScore + offerScore);
      const category = totalScore >= 80 ? 'hot' : totalScore >= 60 ? 'warm' : 'cold';
      const priority = totalScore >= 80 ? 'P1' : totalScore >= 60 ? 'P2' : 'P3';
      const leadScore = {
        totalScore,
        category,
        priority,
        urgency: formData.timeframe === 'urgent' ? 'high' : formData.timeframe === 'medium' ? 'medium' : 'low',
        complexity: 'simple',
        budget: formData.budget,
        timeline: formData.timeframe,
        followUpHours: totalScore >= 80 ? 4 : totalScore >= 60 ? 12 : 24
      };

      const approvalLabels: Record<string, string> = {
        approved: 'Genehmigung liegt vor',
        pending: 'Genehmigung beantragt',
        not_applied: 'Noch nicht beantragt',
      };
      const timeframeLabels: Record<string, string> = {
        urgent: 'Sehr dringend (2-4 Wochen)',
        medium: 'Mittlere Dringlichkeit (1-3 Monate)',
        flexible: 'Flexibel (3-6 Monate)',
      };
      const projectLabels: Record<string, string> = {
        new_building: 'Neubau',
        renovation: 'Renovierung',
        extension: 'Anbau',
      };
      const budgetLabels: Record<string, string> = {
        high: 'Höheres Budget (15.000€+)',
        medium: 'Mittleres Budget (8.000€-15.000€)',
        standard: 'Standard-Budget (5.000€-8.000€)',
      };
      const balconyTypeLabels: Record<string, string> = {
        vorstellbalkon: 'Vorstellbalkon',
        haengebalkon: 'Hängebalkon',
        anbaubalkon: 'Anbaubalkon',
        loggia: 'Loggia',
        terrasse: 'Terrasse',
      };
      const offerRegionLabels: Record<string, string> = {
        local: 'Lokal (bis 25 km)',
        regional: 'Regional (bis 50 km)',
        national: 'Deutschlandweit',
      };
      const offerCountLabels: Record<string, string> = {
        '1': '1 Angebot',
        '2': '2 Angebote',
        '3': '3 Angebote',
        mehr: 'Mehr als 3',
      };
      const contactPreferenceLabels: Record<string, string> = {
        email: 'E-Mail',
        phone: 'Telefon',
        both: 'E-Mail & Telefon',
      };
      const urgencyLabels: Record<string, string> = {
        premium: 'Express',
        priority: 'Express',
        standard: 'Standard',
      };
      const leadCategoryColors: Record<string, string> = {
        hot: '#F97316',
        warm: '#FBBF24',
        cold: '#60A5FA',
      };

      const executionList = Array.isArray(formData.execution) ? formData.execution : [];
      const executionText = executionList.length ? executionList.join(', ') : 'Keine Angaben';

      const balconySize =
        formData.balconyDetails?.size?.width && formData.balconyDetails?.size?.depth
          ? `${formData.balconyDetails.size.width} × ${formData.balconyDetails.size.depth} m`
          : '-';

      const contactRows: SummaryRow[] = [
        { label: 'Anrede', value: formData.contact.salutation || '-' },
        { label: 'Vorname', value: formData.contact.firstName || '-' },
        { label: 'Nachname', value: formData.contact.lastName || '-' },
        { label: 'E-Mail', value: formData.contact.email || '-' },
        { label: 'Telefon', value: formData.contact.phone || '-' },
        { label: 'Adresse', value: formData.contact.address || '-' },
        { label: 'Ort', value: formData.contact.city || '-' },
        { label: 'PLZ', value: formData.contact.zipCode || '-' },
        {
          label: 'Kontaktpräferenz',
          value: contactPreferenceLabels[formData.contactPreference] || formData.contactPreference || '-',
        },
      ];

      const projectRows: SummaryRow[] = [
        { label: 'Genehmigungsstatus', value: approvalLabels[formData.approvalStatus] || formData.approvalStatus || '-' },
        { label: 'Zeitplan', value: timeframeLabels[formData.timeframe] || formData.timeframe || '-' },
        { label: 'Projekttyp', value: projectLabels[formData.projectData] || formData.projectData || '-' },
        { label: 'Budget', value: budgetLabels[formData.budget] || formData.budget || '-' },
        {
          label: 'Balkontyp',
          value:
            balconyTypeLabels[formData.balconyDetails?.type] || formData.balconyDetails?.type || 'Nicht angegeben',
        },
        { label: 'Maße', value: balconySize },
        {
          label: 'Anzahl Balkone',
          value: formData.balconyDetails?.count != null ? String(formData.balconyDetails.count) : '-',
        },
        { label: 'Ausführung', value: executionText },
        {
          label: 'Zusätzliche Informationen',
          value: formData.additionalInfo || 'Keine Angaben',
        },
      ];

      const preferenceRows: SummaryRow[] = [
        {
          label: 'Angebotsregion',
          value: offerRegionLabels[formData.offerPreferences?.region] || formData.offerPreferences?.region || '-',
        },
        {
          label: 'Anzahl Angebote',
          value: offerCountLabels[formData.offerPreferences?.count] || formData.offerPreferences?.count || '-',
        },
        {
          label: 'Service-Level',
          value: urgencyLabels[urgencyLevel] || urgencyLevel,
        },
      ];

      const scoringRows: SummaryRow[] = [
        { label: 'Lead Score', value: leadScore.totalScore ?? '-' },
        { label: 'Kategorie', value: leadScore.category ?? '-' },
        { label: 'Priorität', value: leadScore.priority ?? '-' },
        { label: 'Dringlichkeit', value: leadScore.urgency ?? '-' },
        { label: 'Komplexität', value: leadScore.complexity ?? '-' },
        { label: 'Budget', value: leadScore.budget ?? '-' },
        { label: 'Zeitleiste', value: leadScore.timeline ?? '-' },
        {
          label: 'Follow-up (Std.)',
          value: leadScore.followUpHours != null ? `${leadScore.followUpHours} Stunden` : '-',
        },
      ];

      const statusLabel =
        leadScore.category && typeof leadScore.category === 'string'
          ? leadScore.category.charAt(0).toUpperCase() + leadScore.category.slice(1)
          : 'Unbekannt';
      const statusColor = leadCategoryColors[leadScore.category ?? ''] ?? '#34D399';

      const summaryContext: ExpressSummaryContext = {
        timestamp: new Date().toLocaleString('de-DE'),
        contactRows,
        projectRows,
        preferenceRows,
        scoringRows,
        statusLabel,
        statusColor,
        leadScoreValue: leadScore.totalScore != null ? String(leadScore.totalScore) : '-',
      };

      const expressSummaryHtml = createExpressSummaryHtml(summaryContext);
      const expressAttachment = await captureHtmlToPng(expressSummaryHtml, {
        fileNamePrefix: 'balkonfuchs-express',
        width: 900,
        backgroundColor: '#111827',
      });

      // Export to Zoho
      const payload: any = {
        funnel: 'express-angebot',
        data: formData,
        urgencyLevel,
        funnelType: 'Express-Angebot',
        _internalScoring: {
          leadScore: leadScore.totalScore,
          category: leadScore.category,
          priority: leadScore.priority,
          urgency: leadScore.urgency,
          complexity: leadScore.complexity,
          budget: leadScore.budget,
          timeline: leadScore.timeline,
          followUpHours: leadScore.followUpHours,
        },
      };

      if (expressAttachment?.base64) {
        payload.pdfAttachment = expressAttachment;
      }

      const response = await fetch('/.netlify/functions/submit-to-zoho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setCurrentStep(questions.length + 1);
      } else {
        throw new Error('Export failed');
      }
    } catch (error) {
      console.error('Error:', error);
      // Fallback to success page
      setCurrentStep(questions.length + 1);
    }
  };

  // Header Component
  const Header = () => (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
                    src="/images/Balkonfuchs-Logo_white.png"
              alt="BALKONFUCHS Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          {/* Desktop Navigation */}
                           <nav className="hidden md:flex space-x-8">
           <a href="/kalkulator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Kalkulator</a>
           <a href="/planer/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Planer</a>
           <a href="/express-angebot/" className="text-orange-500 font-medium transition-colors border-b-2 border-orange-500 pb-1 hover:text-orange-500 font-medium transition-colors">Angebot</a>
           <a href="/genehmigung/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Genehmigungscheck</a>
           <a href="/balkon-konfigurator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Konfigurator</a>
         </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="/partner-werden/" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              Partner werden
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-3 space-y-3">
            <a href="/balkon-kosten-rechner-2026/" className="block text-gray-300 font-medium">Kalkulator</a>
            <a href="/balkon-planer/" className="block text-gray-300 font-medium">Planer</a>
            <a href="/balkon-konfigurator/" className="block text-gray-300 font-medium">Konfigurator</a>
            <a href="/angebot/" className="block text-orange-500 font-medium border-l-4 border-orange-500 pl-3">Express-Angebot</a>
            <a href="/balkon-baugenehmigung-check/" className="block text-gray-300 font-medium">Genehmigungscheck</a>
            <a href="/balkon-baustart-rechner/" className="block text-gray-300 font-medium">Bauzeit-Planung</a>
            <a href="/erfahrungen/" className="block text-gray-300 font-medium">Erfahrungen</a>
            <a href="/partner-werden/" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm mt-3 block text-center">
              Partner werden
            </a>
          </div>
        </div>
      )}
    </header>
  );

  // Footer Component
  const Footer = () => (
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
              <li><a href="/express-angebot/" className="text-gray-400 hover:text-orange-400 transition-colors">Angebot</a></li>
              <li><a href="/genehmigung/" className="text-gray-400 hover:text-orange-400 transition-colors">Genehmigungscheck</a></li>
              <li><a href="/bauzeit-planung/" className="text-gray-400 hover:text-orange-400 transition-colors">Baustart Rechner</a></li>
              <li><a href="/balkon-konfigurator/" className="text-gray-400 hover:text-orange-400 transition-colors">Konfigurator</a></li>
              <li><a href="/erfahrungen/" className="text-gray-400 hover:text-orange-400 transition-colors">Erfahrungen</a></li>
              <li><a href="/galerie/" className="text-gray-400 hover:text-orange-400 transition-colors">Galerie</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Wissen</h4>
            <ul className="space-y-2">
              <li><a href="/news/" className="text-gray-400 hover:text-orange-400 transition-colors">News</a></li>
              <li><a href="/foerderung/" className="text-gray-400 hover:text-orange-400 transition-colors">Förderung</a></li>
              <li><a href="/baurecht-balkon/" className="text-gray-400 hover:text-orange-400 transition-colors">Baurecht & Genehmigungen</a></li>
              <li><a href="/ratgeber/" className="text-gray-400 hover:text-orange-400 transition-colors">Ratgeber</a></li>
              <li><a href="/lexikon/" className="text-gray-400 hover:text-orange-400 transition-colors">Lexikon</a></li>
              <li><a href="/faq/" className="text-gray-400 hover:text-orange-400 transition-colors">FAQ</a></li>
              <li><a href="/feedback/" className="text-gray-400 hover:text-orange-400 transition-colors">Feedback</a></li>
            </ul>
              </div>
          
                              <div>
            <h4 className="text-lg font-semibold text-white mb-4">Unternehmen</h4>
            <ul className="space-y-2">
              <li><a href="/about/" className="text-gray-400 hover:text-orange-400 transition-colors">Über uns</a></li>
              <li><a href="/karriere/" className="text-gray-400 hover:text-orange-400 transition-colors">Karriere</a></li>
              <li><a href="/partner-werden/" className="text-gray-400 hover:text-orange-400 transition-colors">Partnerbewerbung</a></li>
              <li><a href="/partner-info-berlin/" className="text-gray-400 hover:text-orange-400 transition-colors">Partner Vorabinfos</a></li>
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
                <a href="/disclaimer/" className="hover:text-orange-400 transition-colors">Disclaimer</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-900 funnel-express">
      <Head>
        <title>Express-Angebot für entscheidungsbereite Bauherren - Für schnelle Umsetzung Ihres Balkonprojekts | BALKONFUCHS</title>
        <meta name="description" content="Perfekt für Bauherren, die bereits wissen was sie wollen! Unser Express-Service priorisiert Ihre Anfrage bei den besten Partner-Unternehmen für schnelle Umsetzung." />
        <meta name="keywords" content="balkon express angebot, balkon schnell bauen, balkonbau priorität, entscheidungsbereit balkon, balkon express service, balkonbau schnell, balkon angebot priorität" />
        <meta name="author" content="BALKONFUCHS" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Express-Angebot für entscheidungsbereite Bauherren - Für schnelle Umsetzung Ihres Balkonprojekts" />
        <meta property="og:description" content="Unser Express-Service priorisiert Ihre Anfrage bei den besten Partner-Unternehmen für schnelle Umsetzung." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/angebot/" />
        <link rel="canonical" href="https://balkonfuchs.de/angebot/" />
        <link rel="stylesheet" href="/styles/funnel-colors.css" />
        
        {/* Strukturierte Daten für SEO-KI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "BALKONFUCHS Express-Angebot Service",
              "description": "Express-Service für entscheidungsbereite Bauherren mit Priorisierung bei Partner-Unternehmen",
              "url": "https://balkonfuchs.de/angebot/",
              "provider": {
                "@type": "Organization",
                "name": "BALKONFUCHS"
              },
              "serviceType": "Express-Balkonbau",
              "areaServed": "Deutschland",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Express-Balkonbau Angebote"
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
                  "name": "Was ist der Express-Angebot Service?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Der Express-Service priorisiert Ihre Anfrage bei den besten Partner-Unternehmen für schnelle Umsetzung Ihres Balkonprojekts. Perfekt für entscheidungsbereite Bauherren."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Wie schnell erhalte ich ein Angebot?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Mit dem Express-Service erhalten Sie innerhalb von 24-48 Stunden erste Angebote von ausgewählten Partner-Unternehmen aus Ihrer Region."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Für wen ist der Express-Service geeignet?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Der Service ist ideal für Bauherren, die bereits wissen was sie wollen und eine schnelle Umsetzung ihres Balkonprojekts wünschen."
                  }
                }
              ]
            })
          }}
        />
      </Head>
      
      <Header />
      
      {/* SEO Content Section */}
      <section id="funnel-start" className="bg-gray-800 border-b border-gray-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            <span className="text-green-400">Express-Angebot</span>
            <span className="text-white"> für entscheidungsbereite Bauherren</span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 sm:mb-6">
            Für entscheidungsbereite Bauherren - Schnelle Umsetzung Ihres Balkonprojekts
          </h2>
          <h3 className="text-lg text-green-400 mb-4 font-semibold">
            Express-Angebot Balkon - Schnelle Vermittlung an spezialisierte Balkonbau-Experten
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            Sie haben bereits <span className="text-green-400 font-semibold">Beschluss</span>, <span className="text-green-400 font-semibold">Genehmigung</span> oder <span className="text-green-400 font-semibold">Finanzierung</span>? 
            Unser <span className="text-green-400 font-semibold">Express-Service</span> vermittelt Sie <span className="text-green-400 font-semibold">prioritär</span> an 
            <span className="text-green-400 font-semibold">3 spezialisierte Balkonbau-Experten</span> für schnelle Umsetzung.
          </p>
        </div>
      </section>
      
      {/* Progress Bar */}
      {currentStep <= questions.length && (
        <section className="bg-gray-800 border-b border-gray-700 py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full progress-fill rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / (questions.length + 2)) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-300">
                Schritt {currentStep + 1} von {questions.length + 2}
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-sm text-gray-400">
                {currentStep < questions.length ? steps[currentStep] : 'Kontaktdaten'}
              </span>
            </div>
          </div>
        </section>
      )}
      
      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              {renderCurrentStep()}
            </div>
          </div>
          
          {/* Navigation */}
          {currentStep < questions.length && (
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentStep === 0
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Zurück
              </button>
              
              {currentStep < questions.length - 1 ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    canProceed()
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Weiter
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : currentStep === questions.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(questions.length)}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    canProceed()
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                      : 'bg-gray-500 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Weiter zu Kontaktdaten
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : null}
            </div>
          )}

          {/* Submit Button für Kontaktformular */}
          {currentStep === questions.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSubmit}
                disabled={!isFormComplete()}
                className={`flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all ${
                  isFormComplete()
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Express-Angebot erhalten
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Loading State während Zoho-Export */}
          {currentStep === questions.length + 0.5 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-3 px-8 py-4 bg-gray-700 text-gray-300 rounded-lg">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                <span>Wird verarbeitet...</span>
              </div>
            </div>
          )}
        </div>
      </main>
      

      </div>
      
      <Footer />
      
      {/* ZOHO Sales IQ Widget */}
      <ZohoSalesIQ />
      </>
    );
  };

export default BALKONFUCHSExpressAngebotFunnel;
