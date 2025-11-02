import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ArrowRight, ArrowLeft, FileCheck, Home, MapPin, Ruler, Euro, CheckCircle, Star, Shield, Clock, Users, Phone, Mail, X, Play, ChevronDown, Menu, Building, TrendingUp, Award, Target, Zap, HeadphonesIcon, Rocket, Search, FileText, Check, AlertTriangle, Calendar, User, CheckSquare, Info, AlertCircle, ThumbsUp, Calculator } from 'lucide-react';
import { LEAD_SCORING_FUNCTIONS } from '../utils/balkon-lead-scoring';
import { calculateGenehmigungScore } from '../utils/genehmigung-scoring';
import ZohoSalesIQ from '../components/ZohoSalesIQ.js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';

const BALKONFUCHSGenehmigungscheckFunnel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [genehmigungScoring, setGenehmigungScoring] = useState(null);
  const [formData, setFormData] = useState({
    bundesland: '',
    projekttyp: '',
    groesse: '',
    tiefe: '',
    grenzabstand: '',
    contact: {
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      zipCode: '',
      newsletter: false,
      privacy: false
    }
  });

  // Mapping-Funktion für Genehmigungs-Check-Scoring
  const mapFormDataToGenehmigungScoring = () => {
    return {
      bundesland: formData.bundesland,
      projekttyp: formData.projekttyp,
      groesse: formData.groesse,
      tiefe: formData.tiefe,
      grenzabstand: formData.grenzabstand,
      genehmigungsstatus: getErgebnis()?.status || 'unbekannt'
    };
  };

  // Progress Bar Steps
  const steps = [
    { title: 'Bundesland', description: 'Wählen Sie Ihr Bundesland' },
    { title: 'Projekttyp', description: 'Art Ihres Gebäudes' },
    { title: 'Maße', description: 'Größe und Tiefe des Balkons' },
    { title: 'Grenzabstand', description: 'Abstand zur Grundstücksgrenze' },
    { title: 'Ergebnis', description: 'Ihr Genehmigungsstatus' },
    { title: 'Kontakt', description: 'Ihre Kontaktdaten' }
  ];

  // Berechne Lead Score automatisch wenn Ergebnis verfügbar ist
  useEffect(() => {
    if ((currentStep === 4 || currentStep >= steps.length) && !genehmigungScoring) {
      const ergebnis = getErgebnis();
      if (ergebnis) {
        const scoringData = mapFormDataToGenehmigungScoring();
        const score = calculateGenehmigungScore(scoringData);
        setGenehmigungScoring(score);
      }
    }
  }, [currentStep, formData.bundesland, formData.projekttyp, formData.groesse, formData.tiefe, formData.grenzabstand, genehmigungScoring]);

  // Bundesländer mit Genehmigungsregeln
  const bundeslaender = [
    { id: 'bw', name: 'Baden-Württemberg', liberalitaet: 'liberal', maxGroesse: '30m² + Genehmigungsfiktion', icon: '🏔️' },
    { id: 'bayern', name: 'Bayern', liberalitaet: 'konservativ', maxGroesse: 'Immer genehmigungspflichtig', icon: '🍺' },
    { id: 'berlin', name: 'Berlin', liberalitaet: 'liberal', maxGroesse: 'Balkone häufig verfahrensfrei', icon: '🏛️' },
    { id: 'brandenburg', name: 'Brandenburg', liberalitaet: 'liberal', maxGroesse: '30m² Terrassenüberdachungen', icon: '🌲' },
    { id: 'bremen', name: 'Bremen', liberalitaet: 'liberal', maxGroesse: '3m Tiefe verfahrensfrei', icon: '🏴' },
    { id: 'hamburg', name: 'Hamburg', liberalitaet: 'sehr-liberal', maxGroesse: 'Genehmigungsfreistellung ab 2026', icon: '⚓' },
    { id: 'hessen', name: 'Hessen', liberalitaet: 'liberal', maxGroesse: '30m² mit Mitteilungspflicht', icon: '🌳' },
    { id: 'mv', name: 'Mecklenburg-Vorpommern', liberalitaet: 'liberal', maxGroesse: '30m² verfahrensfrei', icon: '🌊' },
    { id: 'niedersachsen', name: 'Niedersachsen', liberalitaet: 'sehr-liberal', maxGroesse: '75m³ + Genehmigungsfiktion', icon: '🐎' },
    { id: 'nrw', name: 'Nordrhein-Westfalen', liberalitaet: 'liberal', maxGroesse: '30m² Terrassenüberdachungen', icon: '🏭' },
    { id: 'rlp', name: 'Rheinland-Pfalz', liberalitaet: 'liberal', maxGroesse: '50m³ verfahrensfrei', icon: '🍷' },
    { id: 'saarland', name: 'Saarland', liberalitaet: 'sehr-liberal', maxGroesse: '75m³ Gebäude verfahrensfrei', icon: '⛏️' },
    { id: 'sachsen', name: 'Sachsen', liberalitaet: 'sehr-liberal', maxGroesse: '75m³ Gebäude verfahrensfrei', icon: '🎨' },
    { id: 'sachsenanhalt', name: 'Sachsen-Anhalt', liberalitaet: 'konservativ', maxGroesse: 'Nur 10m² eingeschossig', icon: '🏰' },
    { id: 'sh', name: 'Schleswig-Holstein', liberalitaet: 'sehr-liberal', maxGroesse: '30m² + Genehmigungsfiktion', icon: '🌾' },
    { id: 'thueringen', name: 'Thüringen', liberalitaet: 'liberal', maxGroesse: 'Terrassen verfahrensfrei', icon: '🌿' }
  ];

  // Projekttypen
  const projekttypen = [
    { id: 'neubau', title: 'Neubau', subtitle: 'Gebäude nach 1990', icon: '🏗️', description: 'Moderne Bauweise, meist einfachere Genehmigung' },
    { id: 'nachkriegsbau', title: 'Nachkriegsbau', subtitle: 'Gebäude 1945-1990', icon: '🏢', description: 'Standardisierte Bauweise, mittlere Genehmigungsanforderungen' },
    { id: 'altbau', title: 'Altbau', subtitle: 'Gebäude vor 1945', icon: '🏛️', description: 'Historische Bausubstanz, oft Denkmalschutz relevant' }
  ];

  // Grenzabstände
  const grenzabstaende = [
    { id: 'unter2', title: 'Unter 2m', subtitle: 'Kritisch', icon: '🔴', description: 'Balkonbau meist nicht möglich' },
    { id: 'genau2', title: 'Genau 2m', subtitle: 'Grenzwertig', icon: '🟡', description: 'Nur kleine Vorbauten möglich' },
    { id: 'genau3', title: 'Genau 3m', subtitle: 'Gut', icon: '🟢', description: 'Verfahrensfreie Vorhaben möglich' },
    { id: 'ueber3', title: 'Über 3m', subtitle: 'Optimal', icon: '🟢', description: 'Alle Balkontypen möglich' }
  ];

  // Kontaktformular rendern
  const renderContactForm = () => {
    const isFormComplete = () => {
      return formData.contact.firstName && 
             formData.contact.lastName && 
             formData.contact.email && 
             formData.contact.zipCode && 
             formData.contact.privacy;
    };

    const handleContactChange = (field: string, value: any) => {
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [field]: value
        }
      }));
    };

    const handleSubmit = async () => {
      if (isFormComplete()) {
        try {
          // Calculate Genehmigungs-Check-Score (neues System)
          const genehmigungScoringData = mapFormDataToGenehmigungScoring();
          const genehmigungScore = calculateGenehmigungScore(genehmigungScoringData);

          // Calculate Legacy LeadScore (für Kompatibilität)
          const legacyLeadScore = LEAD_SCORING_FUNCTIONS.calculateScore('genehmigung', {
            bundesland: formData.bundesland,
            projekttyp: formData.projekttyp,
            grenzabstand: formData.grenzabstand,
            genehmigungsstatus: getErgebnis()?.status || 'unbekannt'
          });

          // Kombiniere beide Scoring-Systeme
          const leadScore = {
            ...legacyLeadScore,
            totalScore: genehmigungScore.totalScore,
            category: genehmigungScore.category.toLowerCase(),
            priority: genehmigungScore.priority === 'high' ? 'P1' : 
                      genehmigungScore.priority === 'medium' ? 'P2' : 'P3',
            genehmigungScore: genehmigungScore,
            estimatedValue: genehmigungScore.estimatedValue,
            genehmigungswahrscheinlichkeit: genehmigungScore.genehmigungswahrscheinlichkeit
          };

          // Prepare data for Zoho export
          const exportData = {
            // Kontaktdaten
            contact: {
              salutation: formData.contact.salutation,
              firstName: formData.contact.firstName,
              lastName: formData.contact.lastName,
              email: formData.contact.email,
              phone: formData.contact.phone,
              zipCode: formData.contact.zipCode,
              newsletter: formData.contact.newsletter,
              privacy: formData.contact.privacy
            },
            // Funnel-Informationen
            funnel: {
              type: 'genehmigung',
              name: 'Balkonbau Genehmigungscheck'
            },
            // Funnel-spezifische Daten
            funnelData: {
              bundesland: formData.bundesland,
              projekttyp: formData.projekttyp,
              groesse: formData.groesse,
              tiefe: formData.tiefe,
              grenzabstand: formData.grenzabstand,
              ergebnis: getErgebnis(),
              zipCode: formData.contact.zipCode
            },
            // Metadaten
            timestamp: new Date().toISOString(),
            source: 'BALKONFUCHS Genehmigungscheck',
            funnelType: 'Genehmigungscheck',
            // LeadScoring-Daten (Legacy)
            _internalScoring: {
              leadScore: leadScore.totalScore,
              category: leadScore.category,
              priority: leadScore.priority,
              urgency: leadScore.urgency,
              complexity: leadScore.complexity,
              budget: leadScore.budget,
              timeline: leadScore.timeline,
              followUpHours: leadScore.followUpHours
            },
            // Genehmigungs-Check-Scoring-Daten (neues System)
            _genehmigungScoring: {
              totalScore: genehmigungScore.totalScore,
              category: genehmigungScore.category,
              action: genehmigungScore.action,
              priority: genehmigungScore.priority,
              responseTime: genehmigungScore.responseTime,
              estimatedValue: genehmigungScore.estimatedValue,
              genehmigungswahrscheinlichkeit: genehmigungScore.genehmigungswahrscheinlichkeit,
              breakdown: genehmigungScore.breakdown,
              isComplete: genehmigungScore.isComplete,
              mappedData: genehmigungScoringData // Für Debugging
            }
          };

          // 1. Zoho-Integration
          let zohoResults = null;
          try {
            const zohoResponse = await fetch('/.netlify/functions/send-to-zoho', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(exportData)
            });

            if (zohoResponse.ok) {
              zohoResults = await zohoResponse.json();
              console.log('Zoho-Integration erfolgreich:', zohoResults);
            } else {
              console.error('Zoho-Integration fehlgeschlagen:', zohoResponse.status);
              zohoResults = { success: false, error: `HTTP ${zohoResponse.status}` };
            }
          } catch (zohoError) {
            console.error('Zoho-Integration Fehler:', zohoError);
            zohoResults = { success: false, error: zohoError.message };
          }

          // 2. E-Mail-Versand (immer ausführen, auch wenn Zoho fehlschlägt)
          try {
            const emailResponse = await fetch('/api/send-partner-emails', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                formData: exportData,
                genehmigungScoring: exportData._genehmigungScoring,
                zohoResults: zohoResults,
                funnelType: 'genehmigung'
              })
            });

            if (emailResponse.ok) {
              const emailResults = await emailResponse.json();
              console.log('E-Mail-Versand erfolgreich:', emailResults);
            } else {
              console.error('E-Mail-Versand fehlgeschlagen:', emailResponse.status);
            }
          } catch (emailError) {
            console.error('E-Mail-Versand Fehler:', emailError);
          }
          
          // Success - proceed to thank you page
          setCurrentStep(steps.length);
          
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      }
    };

    return (
      <div className="text-center">
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Kontaktdaten für detaillierte Beratung
          </h2>
          <p className="text-gray-300 text-lg">
            Wir senden Ihnen eine detaillierte Analyse Ihres Genehmigungsstatus zu.
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <select
              value={formData.contact.salutation}
              onChange={(e) => handleContactChange('salutation', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Anrede</option>
              <option value="herr">Herr</option>
              <option value="frau">Frau</option>
              <option value="divers">Divers</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Vorname *"
              value={formData.contact.firstName}
              onChange={(e) => handleContactChange('firstName', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Nachname *"
              value={formData.contact.lastName}
              onChange={(e) => handleContactChange('lastName', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <input
            type="email"
            placeholder="E-Mail-Adresse *"
            value={formData.contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />

          <PhoneInput
            value={formData.contact.phone}
            onChange={(value) => handleContactChange('phone', value)}
            required={false}
            placeholder="123 456789"
            className="w-full"
          />

          <input
            type="text"
            placeholder="PLZ *"
            value={formData.contact.zipCode}
            onChange={(e) => handleContactChange('zipCode', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="newsletter"
              checked={formData.contact.newsletter}
              onChange={(e) => handleContactChange('newsletter', e.target.checked)}
              className="mt-1 w-4 h-4 text-orange-500 bg-gray-800 border-gray-700 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
            />
            <label htmlFor="newsletter" className="text-gray-300 text-sm">
              Ich möchte den Balkonbrief erhalten
            </label>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="privacy"
              checked={formData.contact.privacy}
              onChange={(e) => handleContactChange('privacy', e.target.checked)}
              className="mt-1 w-4 h-4 text-orange-500 bg-gray-800 border-gray-700 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
              required
            />
            <label htmlFor="privacy" className="text-gray-300 text-sm">
              Ich habe die <a href="/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 underline">Datenschutzerklärung</a> und die Informationen zum <a href="/disclaimer/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 underline">Haftungsausschluss</a> gelesen und zur Kenntnis genommen. *
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormComplete()}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
              isFormComplete()
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            Genehmigungsstatus erhalten
          </button>
        </div>
      </div>
    );
  };

  // Erfolgsseite rendern
  const renderSuccessPage = () => {
    return (
      <div className="text-center">
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Vielen Dank für Ihre Anfrage!
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            Wir haben Ihre Anfrage erhalten und werden uns innerhalb der nächsten 24 Stunden bei Ihnen melden.
          </p>
        </div>

        <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Ihr Genehmigungsstatus</h3>
          <div className="text-left space-y-3">
            <p><span className="font-semibold text-gray-300">Status:</span> <span className="text-white">{getErgebnis()?.verfahrenstyp}</span></p>
            <p><span className="font-semibold text-gray-300">Grund:</span> <span className="text-white">{getErgebnis()?.grund}</span></p>
            <p><span className="font-semibold text-gray-300">Nächste Schritte:</span></p>
            <ul className="list-disc list-inside text-white ml-4">
              {getErgebnis()?.naechsteSchritte.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Intelligente Cross-Verlinkungen */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Was möchten Sie als nächstes tun?</h3>
          <p className="text-gray-400">Wir haben diese nächsten Schritte für Sie zusammengestellt:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Balkon planen */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">🎨 Deinen Balkon planen</h4>
              <p className="text-gray-400 mb-4">
                Visualisieren Sie Ihren Traum-Balkon mit unserem Planer
              </p>
              <a href="/planer" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all w-full text-center">
                Jetzt planen →
              </a>
            </div>
            
            {/* Kalkulator nutzen */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">💰 Kosten kalkulieren</h4>
              <p className="text-gray-400 mb-4">
                Berechnen Sie die Kosten für Ihren Balkon
              </p>
              <a href="/balkonfuchs-kalkulator-funnel" className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all w-full text-center">
                Jetzt kalkulieren →
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Berechne Genehmigungsstatus
  const getErgebnis = () => {
    const bl = bundeslaender.find(b => b.id === formData.bundesland);
    if (!bl) return null;

    const groesse = parseInt(formData.groesse) || 0;
    const tiefe = parseFloat(formData.tiefe) || 0;
    const istAltbau = formData.projekttyp === 'altbau';
    const grenzabstand = formData.grenzabstand;

    // Grenzabstand kritisch - Balkonbau vermutlich nicht realisierbar
    if (grenzabstand === 'unter2') {
      return {
        status: 'nicht_realisierbar',
        verfahrenstyp: 'Balkonbau vermutlich nicht realisierbar',
        grund: 'Grenzabstand unter 2m unterschreitet Mindestgrenzabstand',
        naechsteSchritte: [
          'Nachbareinverständnis prüfen (meist aussichtslos)',
          'Alternative Lösungen erwägen (z.B. Französischer Balkon)',
          'Rechtsberatung bei Anwalt für Baurecht einholen'
        ],
        kosten: 'Realisierung meist nicht möglich',
        dauer: 'Nicht umsetzbar',
        farbe: 'red'
      };
    }

    // Denkmalschutz kann Genehmigung erforderlich machen
    if (istAltbau && grenzabstand !== 'unter2') {
      return {
        status: 'genehmigungspflichtig',
        verfahrenstyp: 'Achtung: Möglicherweise Denkmalschutz relevant',
        grund: 'Schutzziele können sein: Denkmalschutz, Fassadenschutz, Ensembleschutz, Quartiersschutz',
        naechsteSchritte: [
          'Denkmalschutzstatus beim Bauamt prüfen lassen',
          'Vorabstimmung mit Denkmalschutzbehörde',
          'Bauantrag mit denkmalschutzrechtlicher Erlaubnis stellen'
        ],
        kosten: '500-3.000€ (inkl. Denkmalschutzverfahren)',
        dauer: '8-16 Wochen (längere Prüfzeit)',
        farbe: 'orange'
      };
    }

    // Bayern: Immer genehmigungspflichtig
    if (formData.bundesland === 'bayern') {
      return {
        status: 'genehmigungspflichtig',
        verfahrenstyp: 'Vollständiges Baugenehmigungsverfahren',
        grund: 'In Bayern sind Balkone grundsätzlich genehmigungspflichtig',
        naechsteSchritte: ['Bauantrag stellen', 'Architekt beauftragen', 'Statiker einbeziehen'],
        kosten: '500-2.000€ Genehmigungskosten',
        dauer: '6-12 Wochen',
        farbe: 'orange'
      };
    }

    // Sehr liberale Bundesländer (75m³-Regel)
    if (['sachsen', 'saarland', 'niedersachsen'].includes(formData.bundesland)) {
      if (groesse <= 30 && tiefe <= 4 && (grenzabstand === 'genau3' || grenzabstand === 'ueber3')) {
        return {
          status: 'verfahrensfrei',
          verfahrenstyp: 'Verfahrensfreies Bauvorhaben',
          grund: bl.name + ': 75m³-Regel - sehr liberale Gesetzgebung',
          naechsteSchritte: ['Eigenverantwortliche Prüfung', 'Grenzabstände einhalten', 'Sofortiger Baubeginn'],
          kosten: '0€ Genehmigungskosten',
          dauer: 'Sofortiger Baubeginn',
          farbe: 'green'
        };
      }
    }

    // Standard: Verfahrensfrei bei guten Bedingungen
    if (groesse <= 30 && tiefe <= 4 && (grenzabstand === 'genau3' || grenzabstand === 'ueber3')) {
      return {
        status: 'verfahrensfrei',
        verfahrenstyp: 'Verfahrensfreies Bauvorhaben',
        grund: 'In ' + bl.name + ' sind Balkone bis ' + bl.maxGroesse + ' verfahrensfrei',
        naechsteSchritte: ['Eigenverantwortliche Prüfung', 'Grenzabstände kontrollieren', 'Baubeginn möglich'],
        kosten: '0€ Genehmigungskosten',
        dauer: 'Sofortiger Baubeginn nach Prüfung',
        farbe: 'green'
      };
    }

    // Standard: Genehmigungspflichtig
    return {
      status: 'genehmigungspflichtig',
      verfahrenstyp: 'Vollständiges Baugenehmigungsverfahren',
      grund: 'Größe oder Grenzabstand erfordern Genehmigung',
      naechsteSchritte: ['Bauantrag stellen', 'Fachplaner beauftragen'],
      kosten: '300-1.500€ Genehmigungskosten',
      dauer: '4-10 Wochen',
      farbe: 'orange'
    };
  };

  // Navigation functions
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
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
      case 0: return formData.bundesland;
      case 1: return formData.projekttyp;
      case 2: return formData.groesse && formData.tiefe;
      case 3: return formData.grenzabstand;
      case 4: return true; // Ergebnis-Seite kann immer weiter
      default: return true;
    }
  };

  // Render current step
  const renderCurrentStep = () => {
    if (currentStep === steps.length) {
      return renderSuccessPage();
    }
    
    switch (currentStep) {
      case 0:
        return renderBundeslandStep();
      case 1:
        return renderProjekttypStep();
      case 2:
        return renderMaesseStep();
      case 3:
        return renderGrenzabstandStep();
      case 4:
        return renderErgebnisStep();
      case 5:
        return renderContactForm();
      default:
        return null;
    }
  };

  // Render Bundesland step
  const renderBundeslandStep = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">In welchem Bundesland befindet sich Ihr Projekt?</h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        🏛️ Die Genehmigungsregeln unterscheiden sich erheblich zwischen den Bundesländern!
      </p>
      
      <div className="grid gap-4 max-w-4xl mx-auto">
        {bundeslaender.map((bundesland) => (
          <div
            key={bundesland.id}
            className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
              formData.bundesland === bundesland.id
                ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                : 'border-gray-700 bg-gray-800/50 hover:border-blue-500/50'
            }`}
            onClick={() => {
              setFormData(prev => ({ ...prev, bundesland: bundesland.id }));
              // Auto-advance after selection
              setTimeout(() => nextStep(), 500);
            }}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{bundesland.icon}</div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-semibold text-white">{bundesland.name}</h3>
                <p className="text-gray-400 mb-2">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    bundesland.liberalitaet === 'sehr-liberal' ? 'bg-green-500/20 text-green-400' :
                    bundesland.liberalitaet === 'liberal' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {bundesland.liberalitaet === 'sehr-liberal' ? 'Sehr liberal' :
                     bundesland.liberalitaet === 'liberal' ? 'Liberal' : 'Konservativ'}
                  </span>
                </p>
                <p className="text-gray-300 text-sm">{bundesland.maxGroesse}</p>
              </div>
              {formData.bundesland === bundesland.id && (
                <Check className="w-6 h-6 text-orange-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Projekttyp step
  const renderProjekttypStep = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Welcher Gebäudetyp liegt vor?</h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        🏗️ Der Gebäudetyp beeinflusst die Genehmigungsanforderungen erheblich!
      </p>
      
      <div className="grid gap-4 max-w-2xl mx-auto">
        {projekttypen.map((typ) => (
          <div
            key={typ.id}
            className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
              formData.projekttyp === typ.id
                ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                : 'border-gray-700 bg-gray-800/50 hover:border-blue-500/50'
            }`}
            onClick={() => {
              setFormData(prev => ({ ...prev, projekttyp: typ.id }));
              // Auto-advance after selection
              setTimeout(() => nextStep(), 500);
            }}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{typ.icon}</div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-semibold text-white">{typ.title}</h3>
                <p className="text-gray-400">{typ.subtitle}</p>
                <p className="text-gray-300 text-sm mt-2">{typ.description}</p>
              </div>
              {formData.projekttyp === typ.id && (
                <Check className="w-6 h-6 text-orange-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Maße step
  const renderMaesseStep = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Wie groß soll Ihr Balkon werden?</h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        📏 Die Maße sind entscheidend für die Genehmigungsfreiheit!
      </p>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-semibold mb-3">Fläche (m²) *</label>
            <input
              type="number"
              min="1"
              max="100"
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none text-center text-2xl"
              placeholder="z.B. 6"
              value={formData.groesse}
              onChange={(e) => setFormData(prev => ({ ...prev, groesse: e.target.value }))}
            />
            <p className="text-sm text-gray-400 mt-2">Typisch: 6-30m²</p>
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-3">Tiefe (m) *</label>
            <input
              type="number"
              step="0.1"
              min="0.5"
              max="6"
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none text-center text-2xl"
              placeholder="z.B. 1.5"
              value={formData.tiefe}
              onChange={(e) => setFormData(prev => ({ ...prev, tiefe: e.target.value }))}
            />
            <p className="text-sm text-gray-400 mt-2">Typisch: 1.0-4.0m</p>
          </div>
        </div>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
            <div className="text-left">
              <h4 className="font-semibold text-blue-400 mb-2">💡 Genehmigungsfreiheit</h4>
              <p className="text-blue-300 text-sm">
                Balkone bis 30m² und 4m Tiefe sind in vielen Bundesländern verfahrensfrei, 
                sofern der Grenzabstand stimmt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Grenzabstand step
  const renderGrenzabstandStep = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Wie groß ist der Abstand zur Grundstücksgrenze?</h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        📐 Der Grenzabstand ist der wichtigste Faktor für die Genehmigungsfreiheit!
      </p>
      
      <div className="grid gap-4 max-w-2xl mx-auto">
        {grenzabstaende.map((abstand) => (
          <div
            key={abstand.id}
            className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
              formData.grenzabstand === abstand.id
                ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                : 'border-gray-700 bg-gray-800/50 hover:border-blue-500/50'
            }`}
            onClick={() => {
              setFormData(prev => ({ ...prev, grenzabstand: abstand.id }));
              // Auto-advance after selection
              setTimeout(() => nextStep(), 500);
            }}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{abstand.icon}</div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-semibold text-white">{abstand.title}</h3>
                <p className="text-gray-400">{abstand.subtitle}</p>
                <p className="text-gray-300 text-sm mt-2">{abstand.description}</p>
              </div>
              {formData.grenzabstand === abstand.id && (
                <Check className="w-6 h-6 text-orange-500" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 max-w-2xl mx-auto">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
          <div className="text-left">
            <h4 className="font-semibold text-yellow-400 mb-2">⚠️ Wichtiger Hinweis</h4>
            <p className="text-yellow-300 text-sm">
              Der Grenzabstand wird von der Außenkante des Balkons zur Grundstücksgrenze gemessen. 
              Bei Balkonen mit Überdachung gilt die Überdachung als maßgebend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Ergebnis step
  const renderErgebnisStep = () => {
    const ergebnis = getErgebnis();
    if (!ergebnis) return null;

    const statusColors = {
      'verfahrensfrei': 'bg-green-500/10 border-green-500/20 text-green-400',
      'genehmigungspflichtig': 'bg-orange-500/10 border-orange-500/20 text-orange-400',
      'nicht_realisierbar': 'bg-red-500/10 border-red-500/20 text-red-400'
    };

    const statusIcons = {
      'verfahrensfrei': '✅',
      'genehmigungspflichtig': '⚠️',
      'nicht_realisierbar': '❌'
    };

    return (
      <div className="text-center">
        {/* Plakative Überschrift oberhalb des Ergebnis-Banners */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Hier ist das Ergebnis deines Genehmigungschecks
        </h2>
        
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-xl font-semibold mb-8 ${statusColors[ergebnis.status]}`}>
          <span className="text-2xl">{statusIcons[ergebnis.status]}</span>
          {ergebnis.verfahrenstyp}
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8 max-w-4xl mx-auto text-left">
          <h3 className="text-xl font-bold text-white mb-4">📋 Ihr Genehmigungsstatus im Detail</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-orange-400 mb-2">Grund der Entscheidung</h4>
                <p className="text-gray-300">{ergebnis.grund}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-orange-400 mb-2">Geschätzte Kosten</h4>
                <p className="text-gray-300">{ergebnis.kosten}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-orange-400 mb-2">Verfahrensdauer</h4>
                <p className="text-gray-300">{ergebnis.dauer}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-orange-400 mb-2">Nächste Schritte</h4>
              <ul className="space-y-2">
                {ergebnis.naechsteSchritte.map((schritt, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-400 font-semibold">{index + 1}.</span>
                    <span className="text-gray-300">{schritt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        
        <div className="border-t border-gray-700 pt-6">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            Zur Startseite
          </a>
        </div>
      </div>
    );
  };



  // Header Component
  const Header = () => (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src="/images/Balkonfuchs-Logo_white.png" 
                alt="BALKONFUCHS Logo" 
                className="h-10 w-auto"
              />
            </a>
          </div>
          
          {/* Desktop Navigation */}
                           <nav className="hidden md:flex space-x-8">
           <a href="/kalkulator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Kalkulator</a>
           <a href="/planer/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Planer</a>
           <a href="/genehmigung/" className="text-orange-500 font-medium transition-colors border-b-2 border-orange-500 pb-1 hover:text-orange-500 font-medium transition-colors">Genehmigungscheck</a>
           <a href="/konfigurator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Konfigurator</a>
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
            <a href="/konfigurator/" className="block text-gray-300 font-medium">Konfigurator</a>
            <a href="/balkon-baugenehmigung-check/" className="block text-orange-500 font-medium border-l-4 border-orange-500 pl-3">Genehmigungscheck</a>
            <a href="/balkon-baustart-rechner/" className="block text-gray-300 font-medium">Bauzeit-Planung</a>
            <a href="/erfahrungen/" className="block text-gray-300 font-medium">Erfahrungen</a>
            <a href="/partner-info-berlin/" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm mt-3 block text-center">
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
              <li><a href="/genehmigung/" className="text-gray-400 hover:text-orange-400 transition-colors">Genehmigungscheck</a></li>
              <li><a href="/bauzeit-planung/" className="text-gray-400 hover:text-orange-400 transition-colors">Baustart Rechner</a></li>
              <li><a href="/konfigurator/" className="text-gray-400 hover:text-orange-400 transition-colors">Konfigurator</a></li>
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
                <a href="/disclaimer/" className="hover:text-orange-400 transition-colors">Haftungsausschluss</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <>
      <Head>
        <title>Balkon Genehmigungscheck - Benötigen Sie eine Baugenehmigung für Ihren Balkon? | BALKONFUCHS</title>
        <meta name="description" content="Rechtssicherheit von Anfang an! Unser Genehmigungscheck analysiert anhand Ihres Standorts und Projektdetails, ob Sie eine Baugenehmigung benötigen." />
        <meta name="keywords" content="balkon genehmigung bundesland, balkonbau genehmigungsfrei, baugenehmigung balkon, balkon verfahrensfrei" />
        <meta name="author" content="BALKONFUCHS" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Balkon Genehmigungscheck - Benötigen Sie eine Baugenehmigung für Ihren Balkon?" />
        <meta property="og:description" content="Rechtssicherheit von Anfang an! Unser Genehmigungscheck analysiert anhand Ihres Standorts und Projektdetails, ob Sie eine Baugenehmigung benötigen." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/genehmigungscheck/" />
        <link rel="canonical" href="https://balkonfuchs.de/genehmigungscheck/" />
        <link rel="stylesheet" href="/styles/funnel-colors.css" />
      </Head>
      
      <div className="min-h-screen bg-gray-900 funnel-genehmigung">
        <Header />
      
      {/* SEO Content Section */}
      <section id="funnel-start" className="bg-gray-800 border-b border-gray-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            <span className="text-purple-400">Genehmigungspflicht prüfen</span>
            <span className="text-white"> in 1 Minute</span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 sm:mb-6">
            Bundesweite Übersicht: Benötigen Sie eine Baugenehmigung für Ihren Balkon?
          </h2>
          <h3 className="text-lg text-purple-400 mb-4 font-semibold">
            Balkon Genehmigungscheck - Rechtssichere Prüfung für alle Bundesländer
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            <span className="text-purple-400 font-semibold">Rechtssicherheit von Anfang an!</span> Unser <span className="text-purple-400 font-semibold">Genehmigungscheck</span> analysiert anhand Ihres <span className="text-purple-400 font-semibold">Standorts</span> 
            und <span className="text-purple-400 font-semibold">Projektdetails</span>, ob Sie eine <span className="text-purple-400 font-semibold">Baugenehmigung</span> benötigen.
          </p>
        </div>
      </section>
      
      {/* Progress Bar */}
      {currentStep < steps.length && (
        <section className="bg-gray-800 border-b border-gray-700 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full progress-fill rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-300">
                Schritt {currentStep + 1} von {steps.length}
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-sm text-gray-400">{steps[currentStep]?.title}</span>
            </div>
          </div>
        </section>
      )}
      
      {/* Main Content */}
      <main className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 md:p-8">
              {renderCurrentStep()}
            </div>
          </div>
          
          {/* Navigation */}
          {currentStep < steps.length - 1 && (
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
              
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  canProceed()
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Weiter
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* ZOHO Sales IQ Widget */}
      <ZohoSalesIQ />
      </div>
      </>
    );
  };

export default BALKONFUCHSGenehmigungscheckFunnel;
