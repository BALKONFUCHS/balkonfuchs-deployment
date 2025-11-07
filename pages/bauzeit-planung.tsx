import React, { useState } from 'react'; 
import Head from 'next/head';
import { ArrowRight, ArrowLeft, Calendar, Clock, Home, MapPin, Ruler, Euro, CheckCircle, Star, Shield, Users, Phone, Mail, X, Play, ChevronDown, Menu, Building, TrendingUp, Award, Target, Zap, HeadphonesIcon, Rocket, Search, FileText, Check, AlertTriangle, Calculator } from 'lucide-react';
import { LEAD_SCORING_FUNCTIONS } from '../utils/balkon-lead-scoring';
import { calculateBauzeitScore } from '../utils/bauzeit-scoring';
import ZohoSalesIQ from '../components/ZohoSalesIQ.js';
import PhoneInput from '../components/PhoneInput';

const BALKONFUCHSBauzeitPlanungFunnel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    targetMonth: '',
    targetYear: '',
    projectPhase: '',
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

  // Mapping-Funktion für Bauzeitplaner-Scoring
  const mapFormDataToBauzeitScoring = () => {
    return {
      targetMonth: formData.targetMonth,
      targetYear: formData.targetYear,
      projectPhase: formData.projectPhase
    };
  };

  // Progress Bar Steps
  const steps = [
    { title: 'Wunschtermin', description: 'Wann möchten Sie auf dem Balkon sitzen?' },
    { title: 'Projektstand', description: 'In welcher Phase befinden Sie sich?' },
    { title: 'Ergebnis', description: 'Ihr persönlicher Starttermin' },
    { title: 'Kontakt', description: 'Ihre Kontaktdaten' }
  ];

  // Projektphasen mit Wochen-Vorlauf
  const projectPhases = [
    {
      id: 'idea',
      title: 'Erste Idee',
      subtitle: 'Ich überlege noch, ob ein Balkon möglich ist',
      icon: '💡',
      weeksMin: 28,
      weeksMax: 36,
      description: '28-36 Wochen Vorlauf'
    },
    {
      id: 'planning',
      title: 'Planungsphase',
      subtitle: 'Ich habe bereits konkrete Pläne oder Vorstellungen',
      icon: '📋',
      weeksMin: 12,
      weeksMax: 30,
      description: '12-30 Wochen Vorlauf'
    },
    {
      id: 'permit',
      title: 'Mit Genehmigung',
      subtitle: 'Genehmigung liegt vor oder ist sicher',
      icon: '✅',
      weeksMin: 8,
      weeksMax: 16,
      description: '8-16 Wochen Vorlauf'
    },
    {
      id: 'execution',
      title: 'Nur Umsetzung',
      subtitle: 'Alles geplant, suche nur noch Handwerker',
      icon: '🔨',
      weeksMin: 8,
      weeksMax: 12,
      description: '8-12 Wochen Vorlauf'
    }
  ];

  // Monate
  const months = [
    { value: '1', label: 'Januar' },
    { value: '2', label: 'Februar' },
    { value: '3', label: 'März' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mai' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Dezember' }
  ];

  // Jahre
  const years = ['2026', '2027', '2028', '2029'];

  // Berechne Starttermin
  const calculateStartDate = () => {
    if (!formData.targetMonth || !formData.targetYear || !formData.projectPhase) return null;

    const phase = projectPhases.find(p => p.id === formData.projectPhase);
    if (!phase) return null;

    const targetDate = new Date(parseInt(formData.targetYear), parseInt(formData.targetMonth) - 1, 15);
    const avgWeeks = Math.round((phase.weeksMin + phase.weeksMax) / 2);
    const startDate = new Date(targetDate);
    startDate.setDate(startDate.getDate() - (avgWeeks * 7));

    return {
      startDate,
      targetDate,
      avgWeeks,
      phase
    };
  };

  // Kalenderwoche berechnen
  const getWeekNumber = (date: Date) => {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(tempDate.getDate() + 3 - (tempDate.getDay() + 6) % 7);
    const week1 = new Date(tempDate.getFullYear(), 0, 4);
    return 1 + Math.round(((tempDate.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  // Saisonale Tipps
  const getSeasonalTip = (month: number) => {
    const seasonalTips = {
      winter: {
        title: "❄️ Winter-Zieltermin gewählt",
        text: "Ein Winterstart ist perfekt für die Planung! Nutzen Sie die kalte Jahreszeit für Genehmigungen und Detailplanung, damit der Bau im Frühjahr starten kann."
      },
      spring: {
        title: "🌸 Frühlings-Zieltermin gewählt",
        text: "Frühjahr ist Balkon-Hauptsaison! Starten Sie jetzt mit der Planung, um einen der begehrten Bauplätze zu sichern."
      },
      summer: {
        title: "☀️ Sommer-Zieltermin gewählt",
        text: "Der perfekte Zeitpunkt für Balkongenuss! Beachten Sie: Sommer ist Hochsaison - frühe Planung sichert bessere Termine."
      },
      autumn: {
        title: "🍂 Herbst-Zieltermin gewählt",
        text: "Herbstbalkon mit goldener Aussicht! Ideal für entspannte Planung außerhalb der Hauptsaison."
      }
    };

    let season = 'winter';
    if (month >= 2 && month <= 4) season = 'spring';
    else if (month >= 5 && month <= 7) season = 'summer';
    else if (month >= 8 && month <= 10) season = 'autumn';

    return seasonalTips[season as keyof typeof seasonalTips];
  };

  // Dringlichkeits-Nachricht
  const getUrgencyMessage = (daysUntilStart: number, avgWeeks: number) => {
    if (daysUntilStart <= 0) {
      return {
        type: 'critical',
        title: '⚠️ Kritisch: Starttermin bereits verpasst!',
        message: `Für Ihren Wunschtermin sollten Sie bereits vor ${Math.abs(daysUntilStart)} Tagen gestartet haben. Wählen Sie einen späteren Termin oder starten Sie sofort mit Express-Planung.`
      };
    } else if (daysUntilStart <= 30) {
      return {
        type: 'urgent',
        title: `🚨 Sehr dringend: Nur noch ${daysUntilStart} Tage bis Projektstart!`,
        message: 'Handeln Sie jetzt! Für eine entspannte Planung sollten Sie sofort beginnen.'
      };
    } else if (daysUntilStart <= 90) {
      return {
        type: 'warning',
        title: `⏰ Zeitdruck: Noch ${Math.round(daysUntilStart/7)} Wochen bis Projektstart`,
        message: 'Zeit wird knapp! Beginnen Sie zeitnah mit der konkreten Planung.'
      };
    } else {
      return {
        type: 'success',
        title: `✅ Perfekt: Ausreichend Zeit für entspannte Planung`,
        message: `Sie haben noch ${Math.round(daysUntilStart/7)} Wochen Zeit. Nutzen Sie diese für eine durchdachte Planung!`
      };
    }
  };

  // Kontaktformular validieren
  const isContactFormComplete = () => {
    return formData.contact.firstName && 
           formData.contact.lastName && 
           formData.contact.email && 
           formData.contact.zipCode && 
           formData.contact.privacy;
  };

  // Kontaktdaten ändern
  const handleContactChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  // Formular absenden
  const handleSubmit = async () => {
    if (!isContactFormComplete()) {
      setSubmitError('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Show loading state
      setIsLoading(true);
      
      // Calculate Bauzeitplaner-Score (neues System)
      const bauzeitScoringData = mapFormDataToBauzeitScoring();
      const bauzeitScore = calculateBauzeitScore(bauzeitScoringData);

      // Calculate Legacy LeadScore (für Kompatibilität)
      const legacyLeadScore = LEAD_SCORING_FUNCTIONS.calculateScore('bauzeit-planung', {
        zeitplan: formData.projectPhase === 'idea' ? 'flexibel' : 
                 formData.projectPhase === 'planning' ? 'diesen_sommer' :
                 formData.projectPhase === 'permit' ? 'diesen_fruehling' : 'sofort',
        projektstatus: formData.projectPhase,
        erfahrung: 'keine'
      });

      // Kombiniere beide Scoring-Systeme
      const leadScore = {
        ...legacyLeadScore,
        totalScore: bauzeitScore.totalScore,
        category: bauzeitScore.category.toLowerCase(),
        priority: bauzeitScore.priority === 'high' ? 'P1' : 
                  bauzeitScore.priority === 'medium' ? 'P2' : 'P3',
        bauzeitScore: bauzeitScore,
        estimatedValue: bauzeitScore.estimatedValue,
        geschaetzteBauzeit: bauzeitScore.geschaetzteBauzeit
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
          type: 'bauzeit-planung',
          name: 'Balkonbau Bauzeit-Planung'
        },
        // Funnel-spezifische Daten
        funnelData: {
          targetMonth: formData.targetMonth,
          targetYear: formData.targetYear,
          projectPhase: formData.projectPhase,
          calculation: calculateStartDate(),
          zipCode: formData.contact.zipCode
        },
        // Metadaten
        timestamp: new Date().toISOString(),
        source: 'BALKONFUCHS Bauzeit-Planung',
        funnelType: 'Bauzeit-Planung',
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
        // Bauzeitplaner-Scoring-Daten (neues System)
        _bauzeitScoring: {
          totalScore: bauzeitScore.totalScore,
          category: bauzeitScore.category,
          action: bauzeitScore.action,
          priority: bauzeitScore.priority,
          responseTime: bauzeitScore.responseTime,
          estimatedValue: bauzeitScore.estimatedValue,
          geschaetzteBauzeit: bauzeitScore.geschaetzteBauzeit,
          breakdown: bauzeitScore.breakdown,
          isComplete: bauzeitScore.isComplete,
          mappedData: bauzeitScoringData // Für Debugging
        }
      };

      // 1. Zoho-Integration
      let zohoResults = null;
      try {
        const zohoResponse = await fetch('/.netlify/functions/submit-to-zoho', {
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
            bauzeitScoring: exportData._bauzeitScoring,
            zohoResults: zohoResults,
            funnelType: 'bauzeit-planung'
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
      setSubmitError('Verbindungsfehler. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  // Nächster Schritt
  const nextStep = () => {
    if (currentStep === 0 && formData.targetMonth && formData.targetYear) {
      setCurrentStep(1);
    } else if (currentStep === 1 && formData.projectPhase) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  // Vorheriger Schritt
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Kann weitergehen
  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.targetMonth && formData.targetYear;
      case 1: return formData.projectPhase;
      case 2: return true;
      default: return true;
    }
  };

  // Header Component
  const Header = () => (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="/logos/balkonfuchs-logo.png" 
              alt="BALKONFUCHS Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          {/* Desktop Navigation */}
                           <nav className="hidden md:flex space-x-8">
           <a href="/kalkulator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Kalkulator</a>
           <a href="/planer/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Planer</a>
           <a href="/genehmigung/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Genehmigungscheck</a>
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
            <a href="/balkon-baustart-rechner/" className="block text-orange-500 font-medium border-l-4 border-orange-500 pl-3">Bauzeit-Planung</a>
            <a href="/angebot/" className="block text-gray-300 font-medium">Express-Angebot</a>
            <a href="/balkon-baugenehmigung-check/" className="block text-gray-300 font-medium">Genehmigungscheck</a>
            <a href="/balkon-kosten-rechner-2026/" className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm mt-3 block text-center">
              Jetzt kalkulieren
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
                <a href="/disclaimer/" className="hover:text-orange-400 transition-colors">Disclaimer</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  // Schritt 1: Wunschtermin
  const renderWunschterminStep = () => {
    const seasonalTip = formData.targetMonth && formData.targetYear ? 
      getSeasonalTip(parseInt(formData.targetMonth)) : null;

    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ab wann möchten Sie auf Ihrem neuen Balkon sitzen? ☕
        </h2>
        <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
          🎯 Wählen Sie Ihren Wunschtermin und wir rechnen zurück!
        </p>

        <div className="max-w-md mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Ihr Wunsch-Balkongenuss-Termin:
            </label>
            <div className="grid grid-cols-2 gap-4">
              <select
                value={formData.targetMonth}
                onChange={(e) => setFormData(prev => ({ ...prev, targetMonth: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Monat wählen...</option>
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>

              <select
                value={formData.targetYear}
                onChange={(e) => setFormData(prev => ({ ...prev, targetYear: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Jahr...</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Wählen Sie Monat und Jahr für Ihren gewünschten Balkon-Start
            </p>
          </div>

          {seasonalTip && (
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-blue-400 mb-2">{seasonalTip.title}</h4>
              <p className="text-blue-300 text-sm">{seasonalTip.text}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Schritt 2: Projektstand
  const renderProjektstandStep = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">
        In welcher Phase befinden Sie sich aktuell?
      </h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        📍 Je nach Startpunkt variiert der nötige Vorlauf
      </p>

      <div className="grid gap-4 max-w-4xl mx-auto">
        {projectPhases.map((phase) => (
          <div
            key={phase.id}
            className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
              formData.projectPhase === phase.id
                ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                : 'border-gray-700 bg-gray-800/50 hover:border-yellow-500/50'
            }`}
            onClick={() => {
              setFormData(prev => ({ ...prev, projectPhase: phase.id }));
              // Auto-advance after selection
              setTimeout(() => nextStep(), 500);
            }}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{phase.icon}</div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-semibold text-white">{phase.title}</h3>
                <p className="text-gray-400 mb-2">{phase.subtitle}</p>
                <div className="text-orange-400 font-semibold">{phase.description}</div>
                {phase.id === 'idea' && (
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mt-3">
                    <strong className="text-yellow-400">ℹ️ Hinweis WEG-Projekte:</strong>
                    <p className="text-yellow-300 text-sm mt-1">
                      Bei Eigentümergemeinschaften können Beschlüsse und Abstimmungen die Projektdauer um 2-3 Jahre verlängern.
                    </p>
                  </div>
                )}
              </div>
              {formData.projectPhase === phase.id && (
                <Check className="w-6 h-6 text-orange-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Schritt 3: Ergebnis
  const renderErgebnisStep = () => {
    const calculation = calculateStartDate();
    if (!calculation) return null;

    const { startDate, targetDate, avgWeeks, phase } = calculation;
    const today = new Date();
    const daysUntilStart = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const urgencyMessage = getUrgencyMessage(daysUntilStart, avgWeeks);
    const startWeek = getWeekNumber(startDate);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          📅 Ihr persönlicher Starttermin
        </h2>

        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-3">🚀 Sie sollten spätestens starten:</h3>
          <div className="text-4xl font-bold text-blue-300 mb-2">
            KW {startWeek} {startDate.getFullYear()}
          </div>
          <div className="text-lg text-blue-200">
            Das ist der {formatDate(startDate)}
          </div>
        </div>

        <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6 mb-6">
          <h4 className="text-lg font-semibold text-white mb-4">📊 Ihr Projektfahrplan</h4>
          <div className="bg-gray-600 h-5 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>
          </div>
          <div className="flex justify-between text-sm text-gray-300">
            <span>Start</span>
            <span>Heute</span>
            <span>Balkon-Genuss</span>
          </div>
        </div>

                 <div className={`rounded-xl p-4 mb-6 ${
           urgencyMessage.type === 'critical' ? 'bg-red-500/20 border border-red-500/30' :
           urgencyMessage.type === 'urgent' ? 'bg-orange-500/20 border border-orange-500/30' :
           urgencyMessage.type === 'warning' ? 'bg-yellow-500/20 border border-yellow-500/30' :
           'bg-green-500/20 border border-green-500/30'
         }`}>
           <h4 className={`text-lg font-semibold mb-2 ${
             urgencyMessage.type === 'critical' ? 'text-red-400' :
             urgencyMessage.type === 'urgent' ? 'text-orange-400' :
             urgencyMessage.type === 'warning' ? 'text-yellow-400' :
             'text-green-400'
           }`}>
             {urgencyMessage.title}
           </h4>
           <p className={`text-sm ${
             urgencyMessage.type === 'critical' ? 'text-red-300' :
             urgencyMessage.type === 'urgent' ? 'text-orange-300' :
             urgencyMessage.type === 'warning' ? 'text-yellow-300' :
             'text-green-300'
           }`}>
             {urgencyMessage.message}
           </p>
         </div>

      </div>
    );
  };

  // Schritt 4: Kontaktformular
  const renderContactForm = () => (
    <div className="text-center">
      <div className="mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">
          📧 Detaillierte Terminplanung per E-Mail erhalten
        </h2>
        <p className="text-gray-300 text-lg">
          🎯 Wir senden Ihnen eine übersichtliche Meilenstein-Planung für Ihr Balkonprojekt zu!
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

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="newsletter"
            checked={formData.contact.newsletter}
            onChange={(e) => handleContactChange('newsletter', e.target.checked)}
            className="w-6 h-6 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
          />
                        <label htmlFor="newsletter" className="text-gray-500 text-sm">
                Ich möchte den Balkonbrief erhalten
              </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="privacy"
            checked={formData.contact.privacy}
            onChange={(e) => handleContactChange('privacy', e.target.checked)}
            className="w-6 h-6 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
          />
          <label htmlFor="privacy" className="text-gray-300 text-sm">
            Ich habe die <a href="/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 underline">Datenschutzerklärung</a> und die Informationen zum <a href="/disclaimer/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 underline">Disclaimer</a> gelesen und zur Kenntnis genommen. *
          </label>
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-red-300">{submitError}</span>
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!isContactFormComplete() || isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
            isContactFormComplete() && !isSubmitting
              ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
              Wird gesendet...
            </>
          ) : (
            '📧 Terminplanung per E-Mail senden'
          )}
        </button>
      </div>
    </div>
  );

  // Erfolgsseite
  const renderSuccessPage = () => {
    const calculation = calculateStartDate();
    
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

        {calculation && (
          <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Ihre Terminplanung</h3>
            <div className="text-left space-y-3">
              <p><span className="font-semibold text-gray-300">Wunschtermin:</span> <span className="text-white">
                {calculation.targetDate.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
              </span></p>
              <p><span className="font-semibold text-gray-300">Projektphase:</span> <span className="text-white">
                {projectPhases.find(p => p.id === formData.projectPhase)?.title}
              </span></p>
              <p><span className="font-semibold text-gray-300">Empfohlener Start:</span> <span className="text-white">
                {calculation.startDate.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span></p>
              <p><span className="font-semibold text-gray-300">Vorlaufzeit:</span> <span className="text-white">
                {calculation.avgWeeks} Wochen
              </span></p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button onClick={() => setCurrentStep(0)} className="bg-gray-700/50 border border-gray-600 rounded-xl p-6 hover:bg-gray-700 transition-all group">
            <Calculator className="w-12 h-12 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-lg font-semibold text-white mb-2">Balkon-Kalkulator</h4>
            <p className="text-gray-400 text-sm">Kosten für Ihren Balkon berechnen</p>
          </button>
          
          <a href="/balkon-planer/" className="bg-gray-700/50 border border-gray-600 rounded-xl p-6 hover:bg-gray-700 transition-all group">
            <Search className="w-12 h-12 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-lg font-semibold text-white mb-2">Balkon-Planer</h4>
            <p className="text-gray-400 text-sm">Detaillierte Planung Ihres Projekts</p>
          </a>
          
          <a href="/angebot/" className="bg-gray-700/50 border border-gray-600 rounded-xl p-6 hover:bg-gray-700 transition-all group">
            <Zap className="w-12 h-12 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-lg font-semibold text-white mb-2">Express-Angebot</h4>
            <p className="text-gray-400 text-sm">Schnelles Angebot für Ihr Projekt</p>
          </a>
        </div>

      </div>
    );
  };

  // Aktuellen Schritt rendern
  const renderCurrentStep = () => {
    if (currentStep === steps.length) {
      return renderSuccessPage();
    }
    
    switch (currentStep) {
      case 0:
        return renderWunschterminStep();
      case 1:
        return renderProjektstandStep();
      case 2:
        return renderErgebnisStep();
      case 3:
        return renderContactForm();
      default:
        return null;
    }
  };

  return (
      <div className="min-h-screen bg-gray-900 funnel-bauzeit">
      <Head>
        <title>Balkon Terminplanung - Finden Sie den optimalen Startzeitpunkt für Ihr Projekt | BALKONFUCHS</title>
        <meta name="description" content="Timing ist beim Balkonbau entscheidend! Unser Terminplaner hilft Ihnen dabei, den idealen Startzeitpunkt für Ihr Balkonprojekt zu ermitteln." />
        <meta name="keywords" content="balkon beste bauzeit, balkonbau optimaler zeitpunkt, wann balkon bauen, balkonbau terminplanung" />
        <meta name="author" content="BALKONFUCHS" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Balkon Terminplanung - Finden Sie den optimalen Startzeitpunkt für Ihr Projekt" />
        <meta property="og:description" content="Timing ist beim Balkonbau entscheidend! Unser Terminplaner hilft Ihnen dabei, den idealen Startzeitpunkt für Ihr Balkonprojekt zu ermitteln." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/terminplanung/" />
        <link rel="canonical" href="https://balkonfuchs.de/terminplanung/" />
        <link rel="stylesheet" href="/styles/funnel-colors.css" />
      </Head>
      
      <Header />
      
      {/* SEO Content Section */}
      <section id="funnel-start" className="bg-gray-800 border-b border-gray-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            <span className="text-indigo-400">Optimaler Starttermin</span>
            <span className="text-white"> für Ihren Balkon</span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 sm:mb-6">
            Finden Sie den perfekten Zeitpunkt für Ihr Balkonprojekt
          </h2>
          <h3 className="text-lg text-indigo-400 mb-4 font-semibold">
            Balkon Terminplanung - Optimaler Startzeitpunkt für erfolgreichen Balkonbau
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            <span className="text-indigo-400 font-semibold">Timing ist beim Balkonbau entscheidend!</span> Unser <span className="text-indigo-400 font-semibold">Terminplaner</span> ermittelt den <span className="text-indigo-400 font-semibold">idealen Startzeitpunkt</span> für Ihr Projekt. 
            Berücksichtigt werden <span className="text-indigo-400 font-semibold">Genehmigungszeiten</span> und <span className="text-indigo-400 font-semibold">Projektzeiten</span>.
          </p>
        </div>
      </section>
      
      {/* Progress Bar */}
      <section className="bg-gray-800 border-b border-gray-700 py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Schritt {currentStep + 1} von {steps.length}</span>
                  <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isLoading 
                        ? 'progress-fill animate-pulse' 
                        : 'progress-fill'
                    }`}
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-300">
                {isLoading ? 'Wird verarbeitet...' : `Schritt ${currentStep + 1} von ${steps.length}`}
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-sm text-gray-400">
                {isLoading ? 'Bitte warten Sie einen Moment' : steps[currentStep]?.title}
              </span>
            </div>
          </div>
        </section>
      
      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
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
                disabled={!canProceed() || isLoading}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  canProceed() && !isLoading
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Wird verarbeitet...
                  </>
                ) : (
                  <>
                    Weiter
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </main>
      
      
      <Footer />
      
    </div>
  );
};

export default BALKONFUCHSBauzeitPlanungFunnel;
