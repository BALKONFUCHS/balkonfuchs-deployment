import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { ArrowRight, ArrowLeft, Handshake, CheckCircle, Shield, Users, X, Building, Star, Phone } from 'lucide-react';
import { calculatePartnerScore } from '../utils/balkon-lead-scoring';
import ZohoSalesIQ from '../components/ZohoSalesIQ.js';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PartnerFunnel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    partnerType: '',
    companyName: '',
    legalForm: '',
    foundedYear: '',
    employeeCount: '',
    city: '',
    zipCode: '',
    address: '',
    website: '',
    contactPerson: {
      firstName: '',
      lastName: '',
      function: '',
      mobile: ''
    },
    experience: '',
    specialties: [],
    workingArea: '',
    insuranceStatus: '',
    references: [
      { description: '', location: '', year: '', value: '' },
      { description: '', location: '', year: '', value: '' },
      { description: '', location: '', year: '', value: '' }
    ],
    lighthouseProject: {
      description: '',
      location: '',
      year: '',
      value: '',
      special: ''
    },
    documents: {
      businessLicense: false,
      insurance: false,
      masterCertificate: false,
      diploma: false,
      instructorLicense: false,
      references: false,
      portfolio: false
    },
    contact: {
      salutation: '',
      firstName: '',
      lastName: '',
      position: '',
      email: '',
      phone: '',
      mobile: '',
      preferredContact: '',
      privacy: false
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 8;

  const questions = [
    {
      id: 'companyProfile',
      title: 'Erzählen Sie uns von Ihrem Unternehmen',
      subtitle: '🏢 Diese Informationen helfen uns, Sie optimal zu unterstützen',
      type: 'company_profile'
    },
    {
      id: 'experience',
      title: 'Wie viel Erfahrung haben Sie im Balkonbau?',
      subtitle: '⭐ Ihre Expertise hilft uns bei der optimalen Zusammenarbeit',
      type: 'selection',
      options: [
        { icon: '🌱', title: 'Einsteiger (0-2 Jahre)', value: 'beginner' },
        { icon: '🔨', title: 'Erfahren (3-5 Jahre)', value: 'experienced' },
        { icon: '👷', title: 'Profi (6-10 Jahre)', value: 'professional' },
        { icon: '🏆', title: 'Experte (10+ Jahre)', value: 'expert' }
      ]
    },
    {
      id: 'specialties',
      title: 'In welchen Balkonbau-Bereichen sind Sie spezialisiert?',
      subtitle: '🎯 Wählen Sie alle zutreffenden Balkonbau-Spezialisierungen',
      type: 'multi_selection',
      options: [
        { icon: '🏗️', title: 'Vorstellbalkone', value: 'vorstellbalkone' },
        { icon: '🔗', title: 'Anlehn-Balkone', value: 'anlehn_balkone' },
        { icon: '🏠', title: 'Hänge-Balkone', value: 'haenge_balkone' },
        { icon: '🏢', title: 'Balkontürme', value: 'balkontuerme' },
        { icon: '🔧', title: 'Balkonsanierung', value: 'renovation' },
        { icon: '🪜', title: 'Balkontreppen', value: 'balkontreppen' },
        { icon: '🪟', title: 'Geländer & Absturzsicherung', value: 'railings' },
        { icon: '🔳', title: 'Rahmenlose Ganzglasgeländer', value: 'ganzglasgelaender' },
        { icon: '☂️', title: 'Glasüberdachungen', value: 'glasueberdachungen' },
        { icon: '🪟', title: 'Komplette Balkonverglasungen', value: 'balkonverglasungen' }
      ]
    },
    {
      id: 'workingArea',
      title: 'In welchem Gebiet können Sie Balkonbau-Projekte übernehmen?',
      subtitle: '📍 Definieren Sie Ihr Balkonbau-Arbeitsgebiet für optimale Lead-Verteilung',
      type: 'selection',
      options: [
        { icon: '🏘️', title: 'Lokal (bis 25 km Umkreis)', value: 'local' },
        { icon: '🏙️', title: 'Regional (bis 50 km Umkreis)', value: 'regional' },
        { icon: '🗺️', title: 'Landesweit', value: 'state' },
        { icon: '🇩🇪', title: 'Deutschlandweit', value: 'national' }
      ]
    },
    {
      id: 'qualifications',
      title: 'Welche Balkonbau-Qualifikationen bringen Sie mit?',
      subtitle: '🏆 Ihre Balkonbau-Zertifikate stärken das Vertrauen unserer Kunden',
      type: 'qualifications'
    },
    {
      id: 'references',
      title: 'Ihre Balkonbau-Referenzobjekte',
      subtitle: '⭐ Zeigen Sie uns Ihre erfolgreichen Balkonbau-Projekte',
      type: 'references'
    },
    {
      id: 'leadScoring',
      title: 'Ihr Lead Scoring Ergebnis',
      subtitle: '📊 Hier ist Ihre Bewertung und unsere Empfehlung für die Zusammenarbeit',
      type: 'lead_scoring'
    }
  ];

  // Memoized validation to prevent re-render loops
  const isStepValid = useMemo(() => {
    if (currentStep >= questions.length) {
      const { salutation, firstName, lastName, email } = formData.contact;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return salutation && firstName && lastName && emailRegex.test(email);
    }
    
    const currentQuestion = questions[currentStep];
    
    switch (currentQuestion?.type) {
      case 'selection':
        return formData[currentQuestion.id] && formData[currentQuestion.id] !== '';
      case 'multi_selection':
        if (currentQuestion.id === 'specialties') {
          return formData.specialties?.length > 0;
        }
        return false;
      case 'company_profile':
        // Grundlegende Validierung
        if (!formData.companyName || !formData.legalForm || !formData.city || !formData.zipCode || 
            !formData.contactPerson.firstName || !formData.contactPerson.lastName || 
            !formData.contactPerson.function || !formData.contactPerson.mobile) {
          return false;
        }
        const zipCodeRegex = /^\d{5}$/;
        const mobileRegex = /^\+49\s?1\d{8,10}$/;
        return zipCodeRegex.test(formData.zipCode) && mobileRegex.test(formData.contactPerson.mobile);
      case 'qualifications':
        return formData.insuranceStatus !== '';
      case 'references':
        const allReferencesComplete = formData.references.every(ref => 
          ref.description && ref.location && ref.year && ref.value
        );
        const lighthouseComplete = formData.lighthouseProject.description && 
                                  formData.lighthouseProject.location && 
                                  formData.lighthouseProject.year && 
                                  formData.lighthouseProject.value && 
                                  formData.lighthouseProject.special;
        return allReferencesComplete && lighthouseComplete;
      case 'lead_scoring':
        return true; // Lead Scoring ist immer gültig
      case 'contact_form':
        const { salutation, firstName, lastName, email } = formData.contact;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return salutation && firstName && lastName && emailRegex.test(email);
      default:
        return true;
    }
  }, [currentStep, formData, questions]);

  // Show reference warning when on references step and validation fails
  const shouldShowReferenceWarning = useMemo(() => {
    if (currentStep !== 6) return false; // Only on references step
    const allReferencesComplete = formData.references.every(ref => 
      ref.description && ref.location && ref.year && ref.value
    );
    const lighthouseComplete = formData.lighthouseProject.description && 
                              formData.lighthouseProject.location && 
                              formData.lighthouseProject.year && 
                              formData.lighthouseProject.value && 
                              formData.lighthouseProject.special;
    return !allReferencesComplete || !lighthouseComplete;
  }, [currentStep, formData.references, formData.lighthouseProject]);

  // LeadScore-Berechnung mit neuer Partner-Scoring-Logik
  const calculateLeadScore = () => {
    return calculatePartnerScore({
      partnerType: formData.partnerType,
      legalForm: formData.legalForm,
      foundedYear: formData.foundedYear,
      employeeCount: formData.employeeCount,
      experience: formData.experience,
      specialties: formData.specialties,
      workingArea: formData.workingArea,
      insuranceStatus: formData.insuranceStatus,
      documents: formData.documents,
      references: formData.references
    });
  };


  const handleAnswerSelect = (questionId, value) => {
    if (questionId === 'specialties') {
      const currentArray = formData[questionId] || [];
      const updatedArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      setFormData(prev => ({ ...prev, [questionId]: updatedArray }));
    } else {
      setFormData(prev => ({ ...prev, [questionId]: value }));
    }
    
    // Auto-advance for certain fields (except specialties which can have multiple selections)
    if (questionId !== 'specialties' && ['partnerType', 'experience', 'workingArea', 'insuranceStatus'].includes(questionId)) {
      setTimeout(() => nextStep(), 500);
    }
  };

  const handleCompanyChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({ 
      ...prev, 
      contact: { ...prev.contact, [field]: value } 
    }));
  };

  const handleDocumentChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [field]: value }
    }));
  };

  const handleReferenceChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.map((ref, i) => 
        i === index ? { ...ref, [field]: value } : ref
      )
    }));
  };

  const handleLighthouseChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      lighthouseProject: { ...prev.lighthouseProject, [field]: value }
    }));
  };

  const handleContactPersonChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contactPerson: { ...prev.contactPerson, [field]: value }
    }));
  };



  const nextStep = () => {
    if (currentStep < questions.length - 1 && isStepValid) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === questions.length - 1 && isStepValid) {
      submitForm();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    
    // LeadScore-Berechnung mit standardisiertem System
    const leadScore = calculateLeadScore();
    
    const submissionData = {
      contact: {
        firstName: formData.contact.firstName,
        lastName: formData.contact.lastName,
        email: formData.contact.email,
        phone: formData.contact.phone,
        mobile: formData.contact.mobile,
        position: formData.contact.position,
        privacy: formData.contact.privacy
      },
      funnel: {
        type: 'partner',
        name: 'Balkonbau Partner'
      },
      company: {
        name: formData.companyName,
        legalForm: formData.legalForm,
        foundedYear: formData.foundedYear,
        employeeCount: formData.employeeCount,
        city: formData.city,
        zipCode: formData.zipCode,
        address: formData.address,
        website: formData.website
      },
      partnerDetails: {
        partnerType: formData.partnerType,
        experience: formData.experience,
        specialties: formData.specialties,
        workingArea: formData.workingArea,
        insuranceStatus: formData.insuranceStatus,
        references: formData.references,
        lighthouseProject: formData.lighthouseProject,
        documents: formData.documents
      },
      timestamp: new Date().toISOString(),
      source: 'BALKONFUCHS Balkonbau Partner',
      funnelType: 'Balkonbau Partner',
      // LeadScoring-Daten
      _internalScoring: {
        leadScore: leadScore.finalScore,
        category: leadScore.category,
        priority: leadScore.priority,
        responseTime: leadScore.responseTime,
        qualified: leadScore.qualified,
        nachfrageErforderlich: leadScore.nachfrageErforderlich,
        baseScore: leadScore.baseScore,
        abzuege: leadScore.abzuege,
        completionBonus: leadScore.completionBonus
      }
    };

    try {
      const response = await fetch('/.netlify/functions/send-to-zoho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        console.error('Submission failed');
      }
      
      // Automatische E-Mail-Versendung des Lead Scoring Ergebnisses
      await sendLeadScoreEmail(leadScore, formData);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      // Immer zum Abschluss weiterleiten
      setCurrentStep(totalSteps);
    }
  };



  const sendLeadScoreEmail = async (leadScore, formData) => {
    const emailData = {
      to: formData.contact.email,
      subject: `Ihr Lead Scoring Ergebnis - BALKONFUCHS Partner Bewerbung`,
      template: 'lead-scoring-result',
      data: {
        firstName: formData.contact.firstName,
        lastName: formData.contact.lastName,
        companyName: formData.companyName,
        partnerType: formData.partnerType,
        leadScore: leadScore.finalScore,
        category: leadScore.category,
        priority: leadScore.priority,
        responseTime: leadScore.responseTime,
        baseScore: leadScore.baseScore,
        abzuege: leadScore.abzuege,
        completionBonus: leadScore.completionBonus,
        qualified: leadScore.qualified,
        nachfrageErforderlich: leadScore.nachfrageErforderlich,
        timestamp: new Date().toLocaleString('de-DE'),
        // Personalisierte SLA basierend auf Score
        sla: leadScore.finalScore >= 75 
          ? '24 Stunden'
          : leadScore.finalScore >= 50 
            ? '2-3 Werktage'
            : leadScore.finalScore >= 30
              ? '3-5 Werktage'
              : '5-7 Werktage',
        // Personalisierte Nachricht basierend auf Score
        personalMessage: leadScore.finalScore >= 75 
          ? 'Herzlichen Glückwunsch! Sie erfüllen alle Kriterien für eine Premium-Partnerschaft.'
          : leadScore.finalScore >= 50 
            ? 'Vielen Dank für Ihre Bewerbung! Wir prüfen Ihre Unterlagen individuell.'
            : leadScore.finalScore >= 30
              ? 'Wir benötigen noch einige zusätzliche Informationen für eine fundierte Entscheidung.'
              : 'Wir werden Ihre Bewerbung sorgfältig prüfen und uns mit einer detaillierten Rückmeldung melden.'
      }
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        console.log('Lead Scoring E-Mail erfolgreich versendet');
      } else {
        console.error('E-Mail Versendung fehlgeschlagen');
      }
    } catch (error) {
      console.error('Error sending lead score email:', error);
    }
  };

  const renderQuestion = () => {
    // Wenn wir über die Fragen hinaus sind, zeige Verabschiedungsseite
    if (currentStep >= questions.length) {
      return renderFarewellPage();
    }
    
    const question = questions[currentStep];
    
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">{question.title}</h2>
          <p className="text-lg text-orange-400 bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
            {question.subtitle}
          </p>
        </div>
        
        <div>
          {question.type === 'multi_selection' && renderMultiSelectionOptions(question)}
          {question.type === 'selection' && renderSelectionOptions(question)}
          {question.type === 'company_profile' && renderCompanyProfile()}
          {question.type === 'qualifications' && renderQualifications()}
          {question.type === 'references' && renderReferences()}
          {question.type === 'lead_scoring' && renderLeadScoring()}
          {question.type === 'contact_form' && renderContactForm()}
        </div>
      </div>
    );
  };


  const renderFarewellPage = () => {
    const leadScore = calculateLeadScore();
    const contactName = formData.contact.firstName || 'Lieber Bewerber';
    
    return (
      <div className="space-y-8">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="text-green-400">Vielen Dank, {contactName}!</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ihre Balkonbau Partner Bewerbung wurde erfolgreich übermittelt. 
            Wir haben alle Ihre Angaben erhalten und werden diese sorgfältig prüfen.
          </p>
          
          {/* Personalisierte SLA-Box basierend auf Score */}
          <div className={`max-w-2xl mx-auto p-6 rounded-2xl border-2 ${
            leadScore.finalScore >= 75 
              ? 'bg-green-500/10 border-green-500/30' 
              : leadScore.finalScore >= 50 
                ? 'bg-yellow-500/10 border-yellow-500/30'
                : leadScore.finalScore >= 30
                  ? 'bg-orange-500/10 border-orange-500/30'
                  : 'bg-gray-500/10 border-gray-500/30'
          }`}>
            <div className="flex items-center justify-center mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                leadScore.finalScore >= 75 
                  ? 'bg-green-500' 
                  : leadScore.finalScore >= 50 
                    ? 'bg-yellow-500'
                    : leadScore.finalScore >= 30
                      ? 'bg-orange-500'
                      : 'bg-gray-500'
              }`}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            
            <h3 className={`text-xl font-bold mb-3 ${
              leadScore.finalScore >= 75 
                ? 'text-green-400' 
                : leadScore.finalScore >= 50 
                  ? 'text-yellow-400'
                  : leadScore.finalScore >= 30
                    ? 'text-orange-400'
                    : 'text-gray-400'
            }`}>
              {leadScore.finalScore >= 75 
                ? '🚀 Premium Partner - Schnelle Bearbeitung'
                : leadScore.finalScore >= 50 
                  ? '⚡ Standard Partner - Individuelle Prüfung'
                  : leadScore.finalScore >= 30
                    ? '📋 Basic Partner - Detaillierte Prüfung'
                    : '📝 Nachfrage erforderlich'
              }
            </h3>
            
            <p className="text-gray-300 leading-relaxed">
              {leadScore.finalScore >= 75 
                ? `Herzlichen Glückwunsch! Wir melden uns innerhalb von 24 Stunden mit dem nächsten Schritt. 
                   Sie erhalten gleich eine detaillierte E-Mail mit Ihrem Ergebnis und den nächsten Schritten.`
                : leadScore.finalScore >= 50 
                  ? `Vielen Dank für Ihre Bewerbung! Wir prüfen Ihre Unterlagen individuell und melden uns 
                     innerhalb von 2-3 Werktagen mit einer Rückmeldung oder möglichen Rückfragen.`
                  : leadScore.finalScore >= 30
                    ? `Wir benötigen noch einige zusätzliche Informationen. Unser Team meldet sich 
                       innerhalb von 3-5 Werktagen mit spezifischen Rückfragen.`
                    : `Wir werden Ihre Bewerbung sorgfältig prüfen und uns innerhalb von 5-7 Werktagen 
                       mit einer detaillierten Rückmeldung melden.`
              }
            </p>
          </div>
        </div>
        
        {/* E-Mail Bestätigung */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-white mb-3">📧 E-Mail-Bestätigung</h4>
          <p className="text-gray-300 mb-4">
            Sie erhalten gleich eine detaillierte E-Mail mit Ihrem Lead Scoring Ergebnis an 
            <span className="text-blue-400 font-semibold"> {formData.contact.email}</span>
          </p>
          <p className="text-sm text-gray-400">
            💡 Bitte prüfen Sie auch Ihren Spam-Ordner, falls die E-Mail nicht ankommt.
          </p>
        </div>
        
        {/* Nächste Schritte */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            <span className="text-blue-400">📋</span> Was passiert als nächstes?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Prüfung</h4>
              <p className="text-gray-300 text-sm">
                Wir prüfen Ihre Unterlagen und Qualifikationen sorgfältig durch.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Kontakt</h4>
              <p className="text-gray-300 text-sm">
                Wir melden uns bei Ihnen zurück - je nach Score unterschiedlich schnell.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Entscheidung</h4>
              <p className="text-gray-300 text-sm">
                Wir besprechen mit Ihnen die nächsten Schritte für die Partnerschaft.
              </p>
            </div>
          </div>
        </div>
        
        {/* Intelligente Cross-Verlinkungen */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Was möchten Sie als nächstes tun?</h3>
          <p className="text-gray-400">Wir haben diese nächsten Schritte für Sie zusammengestellt:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Zum Hauptmenü */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">🏠 Zum Hauptmenü</h4>
              <p className="text-gray-400 mb-4">
                Entdecken Sie alle unsere Balkonbau-Tools und Services
              </p>
              <a href="/" className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all w-full text-center">
                Hauptmenü öffnen →
              </a>
            </div>
            
            {/* Balkon-Projekte ansehen */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">⭐ Balkon-Projekte ansehen</h4>
              <p className="text-gray-400 mb-4">
                Lassen Sie sich von erfolgreichen Balkonprojekten inspirieren
              </p>
              <a href="/empfehlungen" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all w-full text-center">
                Projekte ansehen →
              </a>
            </div>
            
            {/* Kontakt aufnehmen */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">📞 Kontakt aufnehmen</h4>
              <p className="text-gray-400 mb-4">
                Sprechen Sie direkt mit unserem Partner-Team
              </p>
              <a href="/kontakt" className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all w-full text-center">
                Kontakt aufnehmen →
              </a>
            </div>
          </div>
        </div>
        
        {/* Kontakt Info */}
        <div className="bg-gray-700/30 rounded-2xl p-6 text-center">
          <h4 className="text-lg font-semibold text-white mb-3">📞 Haben Sie Fragen?</h4>
          <p className="text-gray-300 mb-4">
            Unser Partner-Team steht Ihnen gerne zur Verfügung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:partner@balkonfuchs.de" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              partner@balkonfuchs.de
            </a>
            <a 
              href="tel:+493012345678" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              +49 30 123 456 78
            </a>
          </div>
        </div>
        
        {/* Zurück zur Startseite */}
        <div className="text-center">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Zurück zur Startseite
          </a>
        </div>
      </div>
    );
  };

  const renderSelectionOptions = (question) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {question.options.map(option => (
        <button
          key={option.value}
          onClick={() => handleAnswerSelect(question.id, option.value)}
          className={`p-4 border-2 rounded-xl text-left transition-all duration-300 ${
            formData[question.id] === option.value
              ? 'border-blue-500 bg-blue-500/20 shadow-md'
              : 'border-gray-600 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{option.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-white">{option.title}</h4>
            </div>
            {formData[question.id] === option.value && (
              <CheckCircle className="w-5 h-5 text-blue-500" />
            )}
          </div>
        </button>
      ))}
    </div>
  );

  const renderMultiSelectionOptions = (question) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {question.options.map(option => (
        <button
          key={option.value}
          onClick={() => handleAnswerSelect(question.id, option.value)}
          className={`p-4 border-2 rounded-xl text-left transition-all duration-300 ${
            formData[question.id]?.includes(option.value)
              ? 'border-orange-500 bg-orange-500/20 shadow-md'
              : 'border-gray-600 hover:border-teal-300'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{option.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-white">{option.title}</h4>
            </div>
            {formData[question.id]?.includes(option.value) && (
              <CheckCircle className="w-5 h-5 text-orange-500" />
            )}
          </div>
        </button>
      ))}
    </div>
  );

  const renderReferences = () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Drei Referenzobjekte *</h4>
        <p className="text-gray-200 mb-6">Beschreiben Sie drei Ihrer erfolgreichsten Projekte</p>
        
        {/* Referenz-Warnung */}
        {shouldShowReferenceWarning && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-red-400 text-xl">⚠️</span>
              <div>
                <h5 className="font-semibold text-red-300 mb-1">Wichtiger Hinweis!</h5>
                <p className="text-red-200 text-sm">
                  Unvollständige Referenzobjekte führen sehr wahrscheinlich zu einer Ablehnung Ihrer Bewerbung als Balkonbau Partner von BALKONFUCHS. 
                  Bitte füllen Sie alle Felder vollständig aus.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {formData.references.map((reference, index) => (
          <div key={index} className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 p-6 rounded-xl mb-4">
            <h5 className="font-semibold text-white mb-4">Referenzobjekt {index + 1}</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">Kurze Beschreibung des Objekts *</label>
                <input
                  type="text"
                  placeholder="z.B. Vorstellbalkon mit Glasgeländer und Überdachung"
                  value={reference.description}
                  onChange={(e) => handleReferenceChange(index, 'description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Ort *</label>
                <input
                  type="text"
                  placeholder="z.B. Berlin, München..."
                  value={reference.location}
                  onChange={(e) => handleReferenceChange(index, 'location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Baujahr *</label>
                <input
                  type="number"
                  placeholder="2023"
                  min="1990"
                  max={new Date().getFullYear()}
                  value={reference.year}
                  onChange={(e) => handleReferenceChange(index, 'year', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Auftragswert (ca.) *</label>
                <input
                  type="text"
                  placeholder="z.B. 45.000 € oder 250.000 €"
                  value={reference.value}
                  onChange={(e) => handleReferenceChange(index, 'value', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-orange-400 mb-4">🏆 Ihr Leuchtturmprojekt</h4>
        <p className="text-gray-300 mb-4">Hierauf bin ich besonders stolz!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-200 mb-2">Kurze Beschreibung des Objekts *</label>
            <input
              type="text"
              placeholder="z.B. Komplexe Balkonverglasung mit integrierter Beleuchtung"
              value={formData.lighthouseProject.description}
              onChange={(e) => handleLighthouseChange('description', e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Ort *</label>
            <input
              type="text"
              placeholder="z.B. Hamburg, Frankfurt..."
              value={formData.lighthouseProject.location}
              onChange={(e) => handleLighthouseChange('location', e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Baujahr *</label>
            <input
              type="number"
              placeholder="2024"
              min="1990"
              max={new Date().getFullYear()}
              value={formData.lighthouseProject.year}
              onChange={(e) => handleLighthouseChange('year', e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Projektwert (ca.) *</label>
            <input
              type="text"
              placeholder="z.B. 75.000 € oder 500.000 €"
              value={formData.lighthouseProject.value}
              onChange={(e) => handleLighthouseChange('value', e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-200 mb-2">Was macht dieses Projekt für Sie besonders? *</label>
            <textarea
              placeholder="Beschreiben Sie, warum Sie auf dieses Projekt besonders stolz sind..."
              value={formData.lighthouseProject.special}
              onChange={(e) => handleLighthouseChange('special', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-vertical"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderQualifications = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Versicherungsstatus *</h4>
        <div className="grid gap-3">
          {[
            { value: 'full', label: 'Vollständig versichert', desc: 'Betriebs-, Berufshaftpflicht & Co.' },
            { value: 'partial', label: 'Teilweise versichert', desc: 'Grundversicherung vorhanden' },
            { value: 'planning', label: 'In Planung', desc: 'Versicherung wird abgeschlossen' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => handleAnswerSelect('insuranceStatus', option.value)}
              className={`p-4 border-2 rounded-xl text-left transition-all duration-300 ${
                formData.insuranceStatus === option.value
                  ? 'border-orange-500 bg-orange-500/20'
                  : 'border-gray-600 hover:border-teal-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-semibold text-white">{option.label}</h5>
                  <p className="text-sm text-gray-200">{option.desc}</p>
                </div>
                {formData.insuranceStatus === option.value && (
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Verfügbare Dokumente & Qualifikationen</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'businessLicense', label: 'Gewerbeschein', icon: '📄' },
            { key: 'insurance', label: 'Versicherungsnachweis', icon: '🛡️' },
            { key: 'masterCertificate', label: 'Meisterbrief', icon: '🏆' },
            { key: 'diploma', label: 'Diplomzeugnis', icon: '🎓' },
            { key: 'instructorLicense', label: 'Ausbilderschein', icon: '👨‍🏫' },
            { key: 'references', label: 'Referenzen', icon: '⭐' },
            { key: 'portfolio', label: 'Arbeitsproben', icon: '📸' }
          ].map(doc => (
            <label key={doc.key} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.documents[doc.key] || false}
                onChange={(e) => handleDocumentChange(doc.key, e.target.checked)}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-lg">{doc.icon}</span>
              <span className="text-gray-300">{doc.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompanyProfile = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Firmenname *</label>
          <input
            type="text"
            placeholder="Max Mustermann GmbH"
            value={formData.companyName}
            onChange={(e) => handleCompanyChange('companyName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Rechtsform *</label>
          <select
            value={formData.legalForm}
            onChange={(e) => handleCompanyChange('legalForm', e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
          >
            <option value="">Rechtsform wählen</option>
            <option value="GmbH">GmbH</option>
            <option value="UG">UG (haftungsbeschränkt)</option>
            <option value="GbR">GbR</option>
            <option value="Einzelunternehmen">Einzelunternehmen</option>
            <option value="AG">AG</option>
            <option value="eK">e.K.</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Gründungsjahr</label>
          <input
            type="number"
            placeholder="2020"
            min="1900"
            max={new Date().getFullYear()}
            value={formData.foundedYear}
            onChange={(e) => handleCompanyChange('foundedYear', e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Mitarbeiterzahl</label>
          <select
            value={formData.employeeCount}
            onChange={(e) => handleCompanyChange('employeeCount', e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
          >
            <option value="">Mitarbeiter wählen</option>
            <option value="1">1 (Ich selbst)</option>
            <option value="2-5">2-5 Mitarbeiter</option>
            <option value="6-10">6-10 Mitarbeiter</option>
            <option value="11-20">11-20 Mitarbeiter</option>
            <option value="20+">Über 20 Mitarbeiter</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-200 mb-2">Geschäftsadresse *</label>
          <input
            type="text"
            placeholder="Musterstraße 123"
            value={formData.address}
            onChange={(e) => handleCompanyChange('address', e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">PLZ *</label>
          <input
            type="text"
            placeholder="12345"
            maxLength={5}
            value={formData.zipCode}
            onChange={(e) => handleCompanyChange('zipCode', e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
          />
          <p className="text-xs text-gray-400 mt-1">Bitte geben Sie eine 5-stellige Postleitzahl ein (z.B. 12345)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Stadt *</label>
          <input
            type="text"
            placeholder="Musterstadt"
            value={formData.city}
            onChange={(e) => handleCompanyChange('city', e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-200 mb-2">Website (optional)</label>
          <input
            type="url"
            placeholder="https://www.ihr-unternehmen.de"
            value={formData.website}
            onChange={(e) => handleCompanyChange('website', e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-semibold text-white mb-4">Ansprechpartner</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Vorname *</label>
            <input
              type="text"
              placeholder="Max"
              value={formData.contactPerson.firstName}
              onChange={(e) => handleContactPersonChange('firstName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Nachname *</label>
            <input
              type="text"
              placeholder="Mustermann"
              value={formData.contactPerson.lastName}
              onChange={(e) => handleContactPersonChange('lastName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Funktion im Unternehmen *</label>
            <select
              value={formData.contactPerson.function}
              onChange={(e) => handleContactPersonChange('function', e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
            >
              <option value="">Funktion wählen</option>
              <option value="Geschäftsführer">Geschäftsführer</option>
              <option value="Inhaber">Inhaber</option>
              <option value="Prokurist">Prokurist</option>
              <option value="Abteilungsleiter">Abteilungsleiter</option>
              <option value="Vertriebsleiter">Vertriebsleiter</option>
              <option value="Projektleiter">Projektleiter</option>
              <option value="Vertriebsmitarbeiter">Vertriebsmitarbeiter</option>
              <option value="Sonstige">Sonstige</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Handynummer *</label>
            <input
              type="tel"
              placeholder="+49 160 1234567"
              value={formData.contactPerson.mobile}
              onChange={(e) => handleContactPersonChange('mobile', e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
            />
            <p className="text-xs text-gray-400 mt-1">Bitte geben Sie eine deutsche Mobilfunknummer ein (z.B. +49 160 1234567)</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLeadScoring = () => {
    const leadScore = calculateLeadScore();
    
    return (
      <div className="space-y-8">
        {/* Lead Score Ergebnis */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6">
              <span className="text-3xl font-bold text-white">{leadScore.finalScore}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {leadScore.category}
            </h3>
            <p className="text-lg text-gray-300">
              {leadScore.priority} - Antwortzeit: {leadScore.responseTime}
            </p>
          </div>
          
          {/* Empfehlung */}
          <div className="bg-gray-700/50 rounded-2xl p-6 mb-6">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="text-blue-400 mr-2">📊</span>
              Unsere detaillierte Bewertung
            </h4>
            
            {leadScore.finalScore >= 75 ? (
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <h5 className="text-lg font-semibold text-green-400 mb-2 flex items-center">
                    <span className="mr-2">✅</span>
                    Premium Partner - Empfehlung für Zusammenarbeit
                  </h5>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Herzlichen Glückwunsch!</strong> Sie erfüllen alle unsere Kriterien für eine Premium-Partnerschaft. 
                    Ihre Erfahrung, Qualifikationen und Referenzen überzeugen uns vollständig. 
                    Wir freuen uns auf eine langfristige, erfolgreiche Zusammenarbeit und können Ihnen bereits jetzt 
                    eine schnelle Vertragsverhandlung mit exzellenten Konditionen anbieten.
                  </p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <h6 className="font-semibold text-blue-400 mb-2">🎯 Warum Sie sich qualifiziert haben:</h6>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Ausgezeichnete Erfahrung im Balkonbau</li>
                    <li>• Vollständige Qualifikationen und Zertifikate</li>
                    <li>• Überzeugende Referenzprojekte</li>
                    <li>• Solide Unternehmensstruktur</li>
                    <li>• Professionelle Arbeitsweise</li>
                  </ul>
                </div>
              </div>
            ) : leadScore.finalScore >= 50 ? (
              <div className="space-y-4">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                  <h5 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center">
                    <span className="mr-2">⚠️</span>
                    Standard Partner - Bedingte Empfehlung
                  </h5>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Vielen Dank für Ihre Bewerbung!</strong> Sie zeigen grundsätzlich das Potenzial für eine 
                    erfolgreiche Partnerschaft, aber es gibt noch einige Bereiche mit Verbesserungspotential. 
                    Wir werden Ihre Bewerbung individuell und sorgfältig prüfen. 
                    Bei einer positiven Entscheidung können wir Ihnen ein maßgeschneidertes Partnerprogramm anbieten.
                  </p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                  <h6 className="font-semibold text-orange-400 mb-2">🔍 Punkte zur Verbesserung:</h6>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Erweiterung der Referenzprojekte</li>
                    <li>• Zusätzliche Qualifikationen empfohlen</li>
                    <li>• Verstärkung der Unternehmensstruktur</li>
                    <li>• Spezialisierung auf bestimmte Balkonarten</li>
                  </ul>
                </div>
              </div>
            ) : leadScore.finalScore >= 30 ? (
              <div className="space-y-4">
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                  <h5 className="text-lg font-semibold text-orange-400 mb-2 flex items-center">
                    <span className="mr-2">🔄</span>
                    Basic Partner - Nachfrage erforderlich
                  </h5>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Vielen Dank für Ihr Interesse!</strong> Wir sehen Potenzial in Ihrer Bewerbung, 
                    benötigen aber weitere Informationen, um eine fundierte Entscheidung zu treffen. 
                    Einige wichtige Unterlagen oder Qualifikationen fehlen noch. 
                    Wir werden uns persönlich mit Ihnen in Verbindung setzen, um die fehlenden Details zu klären.
                  </p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <h6 className="font-semibold text-red-400 mb-2">📋 Benötigte Informationen:</h6>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Vollständige Referenzprojekte mit Fotos</li>
                    <li>• Nachweis aller Qualifikationen</li>
                    <li>• Detaillierte Unternehmensdaten</li>
                    <li>• Versicherungsnachweise</li>
                    <li>• Arbeitsgebiet-Definition</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <h5 className="text-lg font-semibold text-red-400 mb-2 flex items-center">
                    <span className="mr-2">❌</span>
                    Nicht qualifiziert - Aktuell nicht geeignet
                  </h5>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Vielen Dank für Ihre Bewerbung!</strong> Leider erfüllen Sie aktuell nicht die 
                    Mindestanforderungen für eine Partnerschaft mit BALKONFUCHS. Das bedeutet jedoch nicht, 
                    dass wir Sie nicht in Zukunft als Partner begrüßen würden. 
                    Wir empfehlen Ihnen, sich zunächst weiterzuentwickeln und sich später erneut zu bewerben.
                  </p>
                </div>
                <div className="bg-gray-500/10 border border-gray-500/30 rounded-xl p-4">
                  <h6 className="font-semibold text-gray-400 mb-2">💡 Entwicklungsempfehlungen:</h6>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Sammeln Sie mehr Erfahrung im Balkonbau</li>
                    <li>• Erwerben Sie relevante Qualifikationen</li>
                    <li>• Bauen Sie Referenzprojekte auf</li>
                    <li>• Stärken Sie Ihr Unternehmen strukturell</li>
                    <li>• Bewerben Sie sich in 6-12 Monaten erneut</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          {/* Score Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-700/30 rounded-xl p-4">
              <h5 className="font-semibold text-white mb-3">📈 Score Details</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Basis-Score:</span>
                  <span className="text-blue-400">{leadScore.baseScore} Punkte</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Abzüge:</span>
                  <span className="text-red-400">-{leadScore.abzuege} Punkte</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Vollständigkeits-Bonus:</span>
                  <span className="text-green-400">+{leadScore.completionBonus} Punkte</span>
                </div>
                <hr className="border-gray-600"/>
                <div className="flex justify-between font-semibold">
                  <span className="text-white">Final Score:</span>
                  <span className="text-blue-400">{leadScore.finalScore} Punkte</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700/30 rounded-xl p-4">
              <h5 className="font-semibold text-white mb-3">📋 Nächste Schritte</h5>
              <div className="space-y-2 text-sm text-gray-300">
                {leadScore.finalScore >= 75 ? (
                  <>
                    <div>• Schnelle Vertragsverhandlung</div>
                    <div>• Onboarding-Prozess starten</div>
                    <div>• Erste Leads innerhalb 2 Wochen</div>
                  </>
                ) : leadScore.finalScore >= 50 ? (
                  <>
                    <div>• Individuelle Prüfung</div>
                    <div>• Mögliche Nachfragen</div>
                    <div>• Entscheidung innerhalb 1 Woche</div>
                  </>
                ) : (
                  <>
                    <div>• Detaillierte Prüfung</div>
                    <div>• Mögliche Rückfragen</div>
                    <div>• Entscheidung innerhalb 2 Wochen</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* E-Mail CTA */}
        <div className="text-center">
          <button
            onClick={submitForm}
            disabled={isSubmitting}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Bewerbung wird übermittelt...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Bewerbungsunterlagen absenden
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  const renderContactForm = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Ihre Kontaktdaten</h2>
        <p className="text-lg text-orange-400 bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
          🤝 Abschließend benötigen wir Ihre Kontaktdaten für die weitere Bearbeitung
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={formData.contact.salutation}
            onChange={(e) => handleContactChange('salutation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
          >
            <option value="">Anrede wählen *</option>
            <option value="Herr">Herr</option>
            <option value="Frau">Frau</option>
            <option value="Divers">Divers</option>
          </select>
          <input
            type="text"
            placeholder="Vorname *"
            value={formData.contact.firstName}
            onChange={(e) => handleContactChange('firstName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Nachname *"
            value={formData.contact.lastName}
            onChange={(e) => handleContactChange('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
          />
        </div>

        <input
          type="text"
          placeholder="Position im Unternehmen"
          value={formData.contact.position}
          onChange={(e) => handleContactChange('position', e.target.value)}
          className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="E-Mail-Adresse *"
            value={formData.contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
          />
          <input
            type="tel"
            placeholder="Telefonnummer *"
            value={formData.contact.phone}
            onChange={(e) => handleContactChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
          />
        </div>

        <input
          type="tel"
          placeholder="Mobilnummer (optional)"
          value={formData.contact.mobile}
          onChange={(e) => handleContactChange('mobile', e.target.value)}
          className="w-full px-4 py-3 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
        />

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Bevorzugter Kontaktweg</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { value: 'email', label: 'E-Mail', icon: '📧' },
              { value: 'phone', label: 'Telefon', icon: '📞' },
              { value: 'both', label: 'Beides', icon: '🤝' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => handleContactChange('preferredContact', option.value)}
                className={`p-3 border-2 rounded-xl text-center transition-all duration-300 ${
                  formData.contact.preferredContact === option.value
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-teal-300'
                }`}
              >
                <div className="text-2xl mb-1">{option.icon}</div>
                <div className="text-sm font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.contact.privacy}
              onChange={(e) => handleContactChange('privacy', e.target.checked)}
              className="mt-1 w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-200">
              ✅ Ich stimme der Verarbeitung meiner Daten gemäß{' '}
              <a href="https://www.balkonfuchs.de/Fuchsbau/Impressum/datenschutz" className="text-orange-500 hover:underline">
                Datenschutzerklärung
              </a>{' '}
              zu *
            </span>
          </label>
        </div>
      </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-xl">
          <h3 className="font-semibold text-orange-400 mb-4">📋 Ihre Balkonbau Partner Bewerbung im Überblick:</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-200">
          <div>
            <div><strong>Lead-Paket:</strong> {getPartnerTypeLabel()}</div>
            <div><strong>Erfahrung:</strong> {getExperienceLabel()}</div>
            <div><strong>Firma:</strong> {formData.companyName}</div>
          </div>
          <div>
            <div><strong>Arbeitsgebiet:</strong> {getWorkingAreaLabel()}</div>
            <div><strong>Spezialisierungen:</strong> {formData.specialties?.length || 0} ausgewählt</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccessPage = () => {
    return (
      <div className="text-center space-y-8">
        <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
          <Handshake className="w-12 h-12 text-white" />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">
            🎉 Vielen Dank für Ihre Balkonbau Partner Bewerbung{formData.contact.firstName ? `, ${formData.contact.firstName}` : ''}!
          </h2>
          <p className="text-xl text-gray-300">
            Ihre Balkonbau Partnerschaftsanfrage wurde erfolgreich übermittelt und wird von unserem Team geprüft.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-orange-400 mb-4">📋 Ihre Balkonbau Partner Bewerbung:</h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
                         <div className="text-left space-y-2">
               <div><strong>Lead-Paket:</strong> {getPartnerTypeLabel()}</div>
               <div><strong>Firma:</strong> {formData.companyName}</div>
               <div><strong>Standort:</strong> {formData.city}</div>
               <div><strong>Erfahrung:</strong> {getExperienceLabel()}</div>
             </div>
            <div className="text-left space-y-2">
              <div><strong>Arbeitsgebiet:</strong> {getWorkingAreaLabel()}</div>
              <div><strong>Spezialisierungen:</strong> {formData.specialties?.length || 0} ausgewählt</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-xl">
          <h3 className="font-semibold text-green-400 mb-4">🚀 So geht es weiter:</h3>
          <div className="space-y-4 text-gray-200 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <div className="font-semibold">Bestätigung per E-Mail (sofort)</div>
                <div className="text-sm">Sie erhalten eine Bestätigung Ihrer Balkonbau Partner Bewerbung</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <div className="font-semibold">Prüfung durch unser Team (1-3 Werktage)</div>
                <div className="text-sm">Wir prüfen Ihre Balkonbau Qualifikationen und Erfahrungen</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <div className="font-semibold">Persönliches Gespräch (nach Terminabsprache)</div>
                <div className="text-sm">Video-Call oder Vor-Ort-Termin für Balkonbau Partner Details</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="/kontakt/" className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 font-semibold text-center">
            📞 Kontakt aufnehmen
          </a>
        </div>

        <div className="pt-8 border-t border-gray-700">
          <a href="/" className="text-gray-400 hover:text-orange-500 transition-colors">
            🏠 Zur Startseite
          </a>
        </div>
      </div>
    );
  };

  // Helper functions
  const getPartnerTypeLabel = () => {
    switch(formData.partnerType) {
      case 'starter': return 'Starter (8 Leads/Monat)';
      case 'professional': return 'Professional (17 Leads/Monat)';
      case 'enterprise': return 'Enterprise (35+ Leads/Monat)';
      default: return 'Nicht ausgewählt';
    }
  };

  const getExperienceLabel = () => {
    switch(formData.experience) {
      case 'beginner': return 'Einsteiger (0-2 Jahre)';
      case 'experienced': return 'Erfahren (3-5 Jahre)';
      case 'professional': return 'Profi (6-10 Jahre)';
      case 'expert': return 'Experte (10+ Jahre)';
      default: return 'Nicht ausgewählt';
    }
  };

  const getWorkingAreaLabel = () => {
    switch(formData.workingArea) {
      case 'local': return 'Lokal (25km)';
      case 'regional': return 'Regional (50km)';
      case 'state': return 'Landesweit';
      case 'national': return 'Deutschlandweit';
      default: return 'Nicht ausgewählt';
    }
  };

  if (currentStep === totalSteps) {
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderSuccessPage()}
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-900 funnel-partner">
      <Head>
        <title>Balkonbau Partner werden 2025 | 8-Schritt Bewerbung | Qualifizierte Leads | BALKONFUCHS</title>
        <meta name="description" content="✅ Balkonbau Partner werden ✅ 8-Schritt Bewerbungsprozess ✅ Qualifizierte Leads für Handwerker ✅ Starter/Professional/Enterprise Pakete ✅ 8-35+ Leads/Monat ✅ Jetzt bewerben!" />
        <meta name="keywords" content="balkonbau partner werden, balkonbau partner bewerbung, handwerker leads kaufen, balkon partner programm, aufträge balkonbau, balkonbau partner 2025" />
        <meta name="author" content="BALKONFUCHS" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="language" content="de" />
        <meta name="geo.region" content="DE" />
        <meta name="geo.placename" content="Deutschland" />
        <meta name="geo.position" content="51.1657;10.4515" />
        <meta name="ICBM" content="51.1657, 10.4515" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Balkonbau Partner werden 2025 - 8-Schritt Bewerbung" />
        <meta property="og:description" content="Steigern Sie Ihren Umsatz als verifizierter BALKONFUCHS-Partner! Wir liefern Ihnen monatlich qualifizierte, vorselektierte Kunden in Ihrer Region." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/partner" />
        <meta property="og:image" content="https://balkonfuchs.de/images/og-balkonbau-partner.jpg" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:site_name" content="BALKONFUCHS" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://balkonfuchs.de/partner" />
        <meta property="twitter:title" content="Balkonbau Partner werden - 8-Schritt Bewerbung" />
        <meta property="twitter:description" content="Steigern Sie Ihren Umsatz als verifizierter BALKONFUCHS-Partner! Wir liefern Ihnen monatlich qualifizierte, vorselektierte Kunden." />
        <meta property="twitter:image" content="https://balkonfuchs.de/images/twitter-balkonbau-partner.jpg" />
        
        {/* Extended SEO Meta Tags */}
        <meta name="theme-color" content="#f97316" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BALKONFUCHS Partner" />
        <meta name="application-name" content="BALKONFUCHS" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Alternate Languages */}
        <link rel="alternate" hrefLang="de" href="https://balkonfuchs.de/partner" />
        <link rel="alternate" hrefLang="de-DE" href="https://balkonfuchs.de/partner" />
        <link rel="alternate" hrefLang="x-default" href="https://balkonfuchs.de/partner" />
        
        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="https://balkonfuchs.de/sitemap.xml" />
        
        <link rel="canonical" href="https://balkonfuchs.de/partner" />
        
        {/* Structured Data JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Balkonbau Partner werden - BALKONFUCHS",
            "description": "Steigern Sie Ihren Umsatz als verifizierter BALKONFUCHS-Partner! Wir liefern Ihnen monatlich qualifizierte, vorselektierte Kunden in Ihrer Region.",
            "url": "https://balkonfuchs.de/partner",
            "mainEntity": {
              "@type": "Service",
              "name": "Balkonbau Partner Programm",
              "description": "Qualifizierte Balkonbau-Leads für Handwerker und Bauunternehmen",
              "provider": {
                "@type": "Organization",
                "name": "BALKONFUCHS GmbH",
                "url": "https://balkonfuchs.de"
              },
              "offers": {
                "@type": "Offer",
                "priceCurrency": "EUR",
                "price": "0",
                "description": "Kostenlose Partnerschaft für qualifizierte Handwerker"
              }
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Startseite",
                "item": "https://balkonfuchs.de"
              }, {
                "@type": "ListItem", 
                "position": 2,
                "name": "Balkonbau Partner werden",
                "item": "https://balkonfuchs.de/partner"
              }]
            }
          })
        }} />
        
        {/* FAQ Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Wie läuft der Bewerbungsprozess ab?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Der Bewerbungsprozess läuft in 8 Schritten ab: Partnerschaftsmodell wählen, Unternehmensprofil, Erfahrung, Spezialisierungen, Arbeitsgebiet, Qualifikationen und Referenzen, Lead Scoring, sowie Verabschiedung."
                }
              },
              {
                "@type": "Question", 
                "name": "Welche Lead-Pakete gibt es?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Es gibt drei Pakete: Starter (8 Leads/Monat), Professional (17 Leads/Monat) und Enterprise (35+ Leads/Monat). Alle Pakete sind bis Ende 2025 kostenlos."
                }
              },
              {
                "@type": "Question",
                "name": "Was kostet die Partnerschaft?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Alle Partnerschaften sind bis Ende 2025 kostenlos. Ab 2026 gelten die regulären Preise: Starter 649€/Monat, Professional 1.199€/Monat, Enterprise 2.199€/Monat."
                }
              }
            ]
          })
        }} />
      </Head>
      
      {/* Header */}
      <Header />


      {/* Breadcrumb Navigation */}
      <section className="bg-gray-800 border-b border-gray-700 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <a href="/" className="hover:text-orange-400 transition-colors">Startseite</a>
            <span>→</span>
            <span className="text-orange-400">Balkonbau Partner werden</span>
          </nav>
        </div>
      </section>

      {/* SEO Content Section */}
      {!formData.partnerType && (
        <section className="bg-gray-800 border-b border-gray-700 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-blue-400">Balkonbau Partner</span> werden - 8-Schritt Bewerbung
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
              Qualifizierte Balkonbau-Leads für Ihr Handwerksunternehmen
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
              Steigern Sie Ihren <span className="text-blue-400 font-semibold">Umsatz</span> als verifizierter <span className="text-blue-400 font-semibold">BALKONFUCHS-Partner</span>! Wir liefern Ihnen monatlich <span className="text-blue-400 font-semibold">qualifizierte, vorselektierte Balkonbau-Kunden</span> in Ihrer Region, die konkret einen <span className="text-blue-400 font-semibold">Balkonbau</span> möchten. Unsere <span className="text-blue-400 font-semibold">Balkonbau-Leads</span> sind bereits durch unsere Tools <span className="text-blue-400 font-semibold">vor-qualifiziert</span> und haben ein echtes <span className="text-blue-400 font-semibold">Kaufinteresse</span>. Wählen Sie zwischen verschiedenen <span className="text-blue-400 font-semibold">Balkonbau-Paket-Größen (8-35+ Leads/Monat)</span> und profitieren Sie von unserem <span className="text-blue-400 font-semibold">spezialisierten Balkonbau-Vermittlungssystem</span>. Zeigen Sie ihre herausragenden <span className="text-blue-400 font-semibold">Balkonbau-Projekte</span> und erhalten Sie <span className="text-blue-400 font-semibold">exklusive Zugang</span> zu besonderen Balkonbau-Projekten.
            </p>
          </div>
        </section>
      )}

      {/* Progress Bar */}
      {!formData.partnerType && (
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 py-4">
              <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500 rounded-full"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-300 min-w-max">
                Schritt {currentStep + 1} von {totalSteps}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Formular nur anzeigen wenn Subscription ausgewählt */}
          {formData.partnerType && (
            <>
              {/* Progress Bar für Formular */}
              <div className="mb-8">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 rounded-full"
                      style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-300 min-w-max">
                    Schritt {currentStep + 1} von {totalSteps}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 overflow-hidden">
                {renderQuestion()}
              </div>
            </>
          )}

          {/* Navigation */}
          {formData.partnerType && currentStep < questions.length && (
            <div className="bg-gray-700/50 px-8 py-6 border-t border-gray-600">
              <div className="flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Zurück</span>
                </button>

                <button
                  onClick={nextStep}
                  disabled={!isStepValid}
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Wird gesendet...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {currentStep === questions.length - 1 ? '🤝 Balkonbau Partner Bewerbung absenden' : 'Weiter'}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>


        {/* Subscription Cards - Neu aufgebaut wie Benefits-Cards */}
        {!formData.partnerType && (
          <div className="mt-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Welches Partnerschaftsmodell passt zu Ihnen?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              🤝 Wählen Sie das Lead-Paket für Ihre Kapazität
            </p>
            
            {/* Beruhigende Information */}
            <div className="mt-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-green-400 mb-2">
                      💡 Keine Verpflichtung - Nur eine Vorauswahl
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      <strong>Sie schließen hier noch keinen Vertrag ab.</strong> Diese Auswahl hilft uns, 
                      gemeinsam mit Ihnen die passende Partnerschaft zu finden. Im persönlichen Gespräch 
                      besprechen wir dann die individuellen Konditionen und schließen einen maßgeschneiderten 
                      Vertrag ab, der zu Ihrem Unternehmen passt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <button
              onClick={() => setFormData(prev => ({ ...prev, partnerType: 'starter' }))}
              className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 group aspect-square flex flex-col justify-center ${
                formData.partnerType === 'starter' 
                  ? 'border-orange-500/50 shadow-2xl shadow-orange-500/25 bg-gradient-to-br from-orange-500/10 to-red-500/10'
                  : 'hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10'
              }`}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Starter-Paket</h3>
                
                {/* Preis */}
                <div className="mb-4">
                  <div className="text-sm text-gray-400 line-through mb-2">
                    649€/M
                  </div>
                  <div className="text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-bold mb-3">
                    🎁 Gratis bis Ende 2025
                  </div>
                </div>
                
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  <span className="text-orange-400 font-semibold">8 qualifizierte Leads pro Monat</span>
                </p>
                
                {/* Features */}
                <div className="space-y-2">
                  <div className="text-sm text-gray-300 flex items-center justify-center">
                    <span className="text-green-400 mr-2">✓</span>
                    8 Leads/Monat
                  </div>
                  <div className="text-sm text-gray-300 flex items-center justify-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Perfekt für Einsteiger
                  </div>
                  <div className="text-sm text-gray-300 flex items-center justify-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Planbare Auslastung
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setFormData(prev => ({ ...prev, partnerType: 'professional' }))}
              className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 group aspect-square flex flex-col justify-center ${
                formData.partnerType === 'professional' 
                  ? 'border-blue-500/50 shadow-2xl shadow-blue-500/25 bg-gradient-to-br from-blue-500/10 to-cyan-500/10'
                  : 'hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10'
              }`}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Professional-Paket</h3>
                
                {/* Preis */}
                <div className="mb-4">
                  <div className="text-sm text-gray-400 line-through mb-2">
                    1.199€/M
                  </div>
                  <div className="text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-bold mb-3">
                    🎁 Gratis bis Ende 2025
                  </div>
                </div>
                
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  <span className="text-blue-400 font-semibold">17 qualifizierte Leads pro Monat</span>
                </p>
                
                {/* Features */}
                <div className="space-y-2">
                  <div className="text-sm text-gray-300 flex items-center justify-center">
                    <span className="text-green-400 mr-2">✓</span>
                    17 Leads/Monat
                  </div>
                  <div className="text-sm text-gray-300 flex items-center justify-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Ideale Grundauslastung
                  </div>
                  <div className="text-sm text-gray-300 flex items-center justify-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Bewährtes System
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setFormData(prev => ({ ...prev, partnerType: 'enterprise' }))}
              className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 group aspect-square flex flex-col justify-center ${
                formData.partnerType === 'enterprise' 
                  ? 'border-purple-500/50 shadow-2xl shadow-purple-500/25 bg-gradient-to-br from-purple-500/10 to-pink-500/10'
                  : 'hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10'
              }`}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Enterprise-Paket</h3>
                
                {/* Preis */}
                <div className="mb-4">
                  <div className="text-sm text-gray-400 line-through mb-2">
                    2.199€/M
                  </div>
                  <div className="text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-bold mb-3">
                    🎁 Gratis bis Ende 2025
                  </div>
                </div>
                
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  <span className="text-purple-400 font-semibold">35+ qualifizierte Leads pro Monat</span>
                </p>
                
                {/* Features */}
                <div className="space-y-2">
                  <div className="text-sm text-gray-300 flex items-center justify-center">
                    <span className="text-green-400 mr-2">✓</span>
                    35+ Leads/Monat
                  </div>
                  <div className="text-sm text-gray-300 flex items-center justify-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Maximale Flexibilität
                  </div>
                  <div className="text-sm text-gray-300 flex items-center justify-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Premium Support
                  </div>
                </div>
              </div>
            </button>
          </div>
          </div>
        )}

        {/* Benefits Cards - Modernisiert */}
        {!formData.partnerType && (
          <div className="mt-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Deine expliziten Vorteile als Partner
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Entdecken Sie, wie Sie als BALKONFUCHS-Partner Ihr Geschäft auf das nächste Level bringen
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 group aspect-square flex flex-col justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Balkonbau Umsatz steigern</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Durchschnittlich <span className="text-orange-400 font-semibold">30-50% Umsatzsteigerung</span> durch qualifizierte Balkonbau-Leads ohne Akquise-Aufwand.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 group aspect-square flex flex-col justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Planbare Balkonbau Aufträge</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Regelmäßige, <span className="text-green-400 font-semibold">qualifizierte Balkonbau-Anfragen</span> in Ihrem Arbeitsgebiet für bessere Auslastung.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group aspect-square flex flex-col justify-center md:col-span-2 lg:col-span-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Balkonbau Reputation aufbauen</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Stärken Sie Ihre <span className="text-purple-400 font-semibold">Balkonbau-Marke</span> durch Kundenbewertungen und Marketing-Support.
                </p>
              </div>
            </div>
          </div>
          </div>
        )}

        {/* Partner-spezifische Informationen - Modernisiert */}
        {!formData.partnerType && (
          <div className="mt-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Warum Partner mit uns arbeiten
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Entdecken Sie die Vorteile unserer Partnerschaft und wie wir Ihr Balkonbau-Geschäft unterstützen
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group aspect-square flex flex-col justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Qualifizierte Leads</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Nur kaufentschlossene Kunden mit Budget und Zeitrahmen. Unsere Leads sind bereits vorqualifiziert.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 group aspect-square flex flex-col justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Transparente Kosten</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Faire Lead-Preise ohne versteckte Gebühren. Sie zahlen nur für qualifizierte Leads.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group aspect-square flex flex-col justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Regionale Vermittlung</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Leads nur aus Ihrem definierten Arbeitsgebiet. Keine langen Anfahrtszeiten.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 group aspect-square flex flex-col justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Skalierbares Wachstum</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Von 8 auf 35+ Leads pro Monat. Starten Sie klein und skalieren Sie Ihr Geschäft.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group aspect-square flex flex-col justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Partner-Support</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Dedizierte Ansprechpartner und Schulungen. Wir unterstützen Sie mit Know-how.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 group aspect-square flex flex-col justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Bewertungs-System</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Aufbau Ihrer Online-Reputation. Sammeln Sie positive Bewertungen.
                </p>
              </div>
            </div>
          </div>
          
        </div>
        )}

      </main>

      {/* Footer */}
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
                <li><a href="balkon-kosten-rechner/" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Kalkulator</a></li>
                <li><a href="planer/" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Planer</a></li>
                <li><a href="express-angebot/" className="text-gray-400 hover:text-orange-400 transition-colors">Angebot</a></li>
                <li><a href="genehmigung/" className="text-gray-400 hover:text-orange-400 transition-colors">Genehmigungscheck</a></li>
                <li><a href="bauzeit-planung/" className="text-gray-400 hover:text-orange-400 transition-colors">Baustart Rechner</a></li>
                <li><a href="konfigurator/" className="text-gray-400 hover:text-orange-400 transition-colors">Konfigurator</a></li>
                <li><a href="erfahrungen/" className="text-gray-400 hover:text-orange-400 transition-colors">Erfahrungen</a></li>
                <li><a href="galerie/" className="text-gray-400 hover:text-orange-400 transition-colors">Galerie</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Wissen</h4>
              <ul className="space-y-2">
                <li><a href="news/" className="text-gray-400 hover:text-orange-400 transition-colors">News</a></li>
                <li><a href="foerderung/" className="text-gray-400 hover:text-orange-400 transition-colors">Förderung</a></li>
                <li><a href="baurecht-balkon/" className="text-gray-400 hover:text-orange-400 transition-colors">Baurecht & Genehmigungen</a></li>
                <li><a href="ratgeber/" className="text-gray-400 hover:text-orange-400 transition-colors">Ratgeber</a></li>
                <li><a href="lexikon/" className="text-gray-400 hover:text-orange-400 transition-colors">Lexikon</a></li>
                <li><a href="faq/" className="text-gray-400 hover:text-orange-400 transition-colors">FAQ</a></li>
                <li><a href="feedback/" className="text-gray-400 hover:text-orange-400 transition-colors">Feedback</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Unternehmen</h4>
              <ul className="space-y-2">
                <li><a href="about/" className="text-gray-400 hover:text-orange-400 transition-colors">Über uns</a></li>
                <li><a href="karriere/" className="text-gray-400 hover:text-orange-400 transition-colors">Karriere</a></li>
                <li><a href="partner-werden/" className="text-gray-400 hover:text-orange-400 transition-colors">Partnerbewerbung</a></li>
                <li><a href="/partner-info-berlin/" className="text-gray-400 hover:text-orange-400 transition-colors">Partner Vorabinfos</a></li>
                <li><a href="kontakt/" className="text-gray-400 hover:text-orange-400 transition-colors">Kontakt</a></li>
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
                  <a href="impressum/" className="hover:text-orange-400 transition-colors">Impressum</a>
                  <a href="datenschutz/" className="hover:text-orange-400 transition-colors">Datenschutz</a>
                  <a href="agb/" className="hover:text-orange-400 transition-colors">AGB</a>
                  <a href="disclaimer/" className="hover:text-orange-400 transition-colors">Disclaimer</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* ZOHO Sales IQ Widget */}
      <ZohoSalesIQ />
    </div>
  );
};

export default PartnerFunnel;
