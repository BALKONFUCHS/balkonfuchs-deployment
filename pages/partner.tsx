import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { ArrowRight, ArrowLeft, Handshake, CheckCircle, Shield, Users, X, Building, Star, Phone, Menu } from 'lucide-react';
import { LEAD_SCORING_FUNCTIONS } from '../utils/balkon-lead-scoring';
import { calculatePartnerScore } from '../utils/partner-scoring';
import ZohoSalesIQ from '../components/ZohoSalesIQ.js';

const PartnerFunnel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const totalSteps = 7;

  const questions = [
    {
      id: 'partnerType',
      title: 'Welches Partnerschaftsmodell passt zu Ihnen?',
      subtitle: '🤝 Wählen Sie das Lead-Paket für Ihre Kapazität',
      type: 'selection',
      options: [
        { 
          icon: '🚀', 
          title: 'Starter-Paket', 
          subtitle: '8 qualifizierte Leads pro Monat',
          value: 'starter',
          benefits: ['8 Leads/Monat', 'Perfekt für Einsteiger', 'Planbare Auslastung'],
          normalPrice: '649€/M',
          badge: 'Gratis bis Ende 2025'
        },
        { 
          icon: '🔧', 
          title: 'Professional-Paket', 
          subtitle: '17 qualifizierte Leads pro Monat',
          value: 'professional',
          benefits: ['17 Leads/Monat', 'MEIST GEWÄHLT', 'Optimale Balance'],
          normalPrice: '1.199€/M',
          badge: 'Gratis bis Ende 2025'
        },
        { 
          icon: '🏆', 
          title: 'Enterprise-Paket', 
          subtitle: '35 qualifizierte Leads pro Monat',
          value: 'enterprise',
          benefits: ['35 Leads/Monat', 'Beste Skalierung', 'Maximale Auslastung'],
          normalPrice: '2.199€/M',
          badge: 'Gratis bis Ende 2025'
        }
      ]
    },
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
      id: 'contact',
      title: 'Ihre Kontaktdaten',
      subtitle: '🤝 Abschließend benötigen wir Ihre Kontaktdaten für die weitere Bearbeitung Ihrer Balkonbau Partner Bewerbung',
      type: 'contact_form'
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
        return formData[currentQuestion.id] !== '';
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
        const mobileRegex = /^\+49\s?1\d{8,9}$/;
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

  // Partner-Score-Berechnung mit Hybrid-Ansatz
  const calculateLeadScore = () => {
    // Neue Partner-Scoring-Funktion verwenden
    const partnerScore = calculatePartnerScore({
      firmierung: formData.legalForm,
      marktpraesenz: formData.experience,
      mitarbeiterzahl: formData.employeeCount,
      versicherung: formData.insuranceStatus,
      meisterbrief: formData.documents?.masterCertificate ? ['meisterbrief'] : ['andere_quali'],
      leistungen: formData.specialties || [],
      einsatzgebiet: formData.workingArea,
      referenzen: formData.references?.map(ref => parseFloat(ref.value) || 0) || []
    });

    // Legacy LeadScore für Kompatibilität
    const legacyScore = LEAD_SCORING_FUNCTIONS.calculateScore('partner', {
      experience: formData.experience,
      specialties: formData.specialties,
      insuranceStatus: formData.insuranceStatus,
      documents: formData.documents,
      references: formData.references,
      heroProject: formData.lighthouseProject,
      workingArea: formData.workingArea,
      capacity: formData.contact?.preferredContact || 'later'
    });

    // Kombiniere beide Scores
    return {
      ...legacyScore,
      // Überschreibe mit neuen Partner-Score-Daten
      totalScore: partnerScore.finalScore,
      category: partnerScore.category.toLowerCase(),
      priority: partnerScore.status === 'approved' ? 'P1' : 
                partnerScore.status === 'review' ? 'P2' : 
                partnerScore.status === 'conditional' ? 'P3' : 'P4',
      // Neue Partner-spezifische Daten
      partnerScore: partnerScore,
      baseScore: partnerScore.baseScore,
      qualityMultiplier: partnerScore.qualityMultiplier,
      warnings: partnerScore.warnings
    };
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
        leadScore: leadScore.totalScore,
        category: leadScore.category,
        priority: leadScore.priority,
        urgency: leadScore.urgency,
        complexity: leadScore.complexity,
        budget: leadScore.budget,
        timeline: leadScore.timeline,
        followUpHours: leadScore.followUpHours
      },
      // Partner-Scoring-Daten (Hybrid-Ansatz)
      _partnerScoring: {
        baseScore: leadScore.baseScore,
        qualityMultiplier: leadScore.qualityMultiplier,
        finalScore: leadScore.totalScore,
        category: leadScore.partnerScore?.category,
        status: leadScore.partnerScore?.status,
        action: leadScore.partnerScore?.action,
        warnings: leadScore.warnings
      }
    };

    try {
      const response = await fetch('/api/export-to-zoho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        setCurrentStep(totalSteps);
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };



  const renderQuestion = () => {
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
          {question.type === 'selection' && renderSelectionOptions(question)}
          {question.type === 'multi_selection' && renderMultiSelectionOptions(question)}
          {question.type === 'company_profile' && renderCompanyProfile()}
          {question.type === 'qualifications' && renderQualifications()}
          {question.type === 'references' && renderReferences()}
          {question.type === 'contact_form' && renderContactForm()}
        </div>
      </div>
    );
  };

  const renderSelectionOptions = (question) => (
    <div className="grid gap-4">
      {question.options.map(option => (
        <button
          key={option.value}
          onClick={() => handleAnswerSelect(question.id, option.value)}
          className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 hover:shadow-lg group ${
            formData[question.id] === option.value
              ? 'border-orange-500 bg-orange-500/20 shadow-lg'
              : 'border-gray-600 hover:border-teal-300'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{option.icon}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-xl font-semibold text-white">{option.title}</h3>
                {option.badge && (
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-red-400 line-through">
                      {option.normalPrice}
                    </span>
                    <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full font-bold animate-pulse">
                      🎁 {option.badge}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-gray-200 mt-1">{option.subtitle}</p>
              {option.benefits && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {option.benefits.map(benefit => (
                    <span key={benefit} className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded border border-green-500/30">
                      ✓ {benefit}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {formData[question.id] === option.value && (
              <CheckCircle className="w-6 h-6 text-orange-500" />
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
          <a href="partner-werden" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-center">
            🤝 Partner werden
          </a>
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
      case 'professional': return 'Professional (15 Leads/Monat)';
      case 'enterprise': return 'Enterprise (30 Leads/Monat)';
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
        <title>Balkonbau Partner werden 2026 | 7-Schritt Bewerbung | Qualifizierte Leads | BALKONFUCHS</title>
        <meta name="description" content="✅ Balkonbau Partner werden ✅ 7-Schritt Bewerbungsprozess ✅ Qualifizierte Leads für Handwerker ✅ Starter/Standard/Premium Pakete ✅ Jetzt bewerben!" />
        <meta name="keywords" content="balkonbau partner werden, balkonbau partner bewerbung, handwerker leads kaufen, balkon partner programm, aufträge balkonbau, balkonbau partner 2026" />
        <meta name="author" content="BALKONFUCHS" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="language" content="de" />
        <meta name="geo.region" content="DE" />
        <meta name="geo.placename" content="Deutschland" />
        <meta name="geo.position" content="51.1657;10.4515" />
        <meta name="ICBM" content="51.1657, 10.4515" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Balkonbau Partner werden 2026 - 7-Schritt Bewerbung" />
        <meta property="og:description" content="Steigern Sie Ihren Umsatz als verifizierter BALKONFUCHS-Partner! Wir liefern Ihnen monatlich qualifizierte, vorselektierte Kunden in Ihrer Region." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/partner" />
        <meta property="og:image" content="https://balkonfuchs.de/images/og-balkonbau-partner.jpg" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:site_name" content="BALKONFUCHS" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://balkonfuchs.de/partner" />
        <meta property="twitter:title" content="Balkonbau Partner werden - 7-Schritt Bewerbung" />
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
                  "text": "Der Bewerbungsprozess läuft in 7 Schritten ab: Partnerschaftsmodell wählen, Unternehmensprofil, Erfahrung, Spezialisierungen, Arbeitsgebiet, Qualifikationen und Referenzen, sowie Kontaktdaten."
                }
              },
              {
                "@type": "Question", 
                "name": "Welche Lead-Pakete gibt es?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Es gibt drei Pakete: Starter (8 Leads/Monat), Professional (15 Leads/Monat) und Enterprise (30 Leads/Monat). Alle Pakete sind bis Ende 2025 kostenlos."
                }
              },
              {
                "@type": "Question",
                "name": "Was kostet die Partnerschaft?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Alle Partnerschaften sind bis Ende 2025 kostenlos. Ab 2026 gelten die regulären Preise: Starter 599€/Monat, Professional 1.199€/Monat, Enterprise 2.199€/Monat."
                }
              }
            ]
          })
        }} />
      </Head>
      
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img 
                  src="/logos/balkonfuchs-logo.png" 
                  alt="BALKONFUCHS Logo" 
                  className="h-10 w-auto"
                />
              </a>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Startseite</a>
              <a href="/kalkulator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Kalkulator</a>
              <a href="/planer/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Planer</a>
              <a href="/express-angebot/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Express-Angebot</a>
              <a href="/genehmigung/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Genehmigungscheck</a>
              <a href="/bauzeit-planung/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Bauzeit-Planung</a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => document.getElementById('funnel-start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm"
              >
                🚀 Zum Start
              </button>
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
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-3 space-y-3">
            <a href="/" className="block text-gray-300 font-medium">Startseite</a>
            <a href="/kalkulator/" className="block text-gray-300 font-medium">Kalkulator</a>
            <a href="/planer/" className="block text-gray-300 font-medium">Planer</a>
            <a href="/express-angebot/" className="block text-gray-300 font-medium">Express-Angebot</a>
            <a href="/genehmigung/" className="block text-gray-300 font-medium">Genehmigungscheck</a>
            <a href="/bauzeit-planung/" className="block text-gray-300 font-medium">Bauzeit-Planung</a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById('funnel-start')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm mt-3"
            >
              🚀 Zum Start
            </button>
          </div>
        </div>
      )}

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
      <section className="bg-gray-800 border-b border-gray-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-indigo-400">Balkonbau Partner</span>
            <span className="text-white"> werden - 7-Schritt Bewerbung</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
            Qualifizierte Balkonbau-Leads für Ihr Handwerksunternehmen
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            Steigern Sie Ihren <span className="text-indigo-400 font-semibold">Umsatz</span> als verifizierter <span className="text-indigo-400 font-semibold">BALKONFUCHS-Partner</span>! Wir liefern Ihnen monatlich <span className="text-indigo-400 font-semibold">qualifizierte, vorselektierte Balkonbau-Kunden</span> in Ihrer Region, die konkret einen <span className="text-indigo-400 font-semibold">Balkonbau</span> möchten. Unsere <span className="text-indigo-400 font-semibold">Balkonbau-Leads</span> sind bereits durch unsere Tools <span className="text-indigo-400 font-semibold">vor-qualifiziert</span> und haben ein echtes <span className="text-indigo-400 font-semibold">Kaufinteresse</span>. Wählen Sie zwischen verschiedenen <span className="text-indigo-400 font-semibold">Balkonbau-Paket-Größen (8-30+ Leads/Monat)</span> und profitieren Sie von unserem <span className="text-indigo-400 font-semibold">spezialisierten Balkonbau-Vermittlungssystem</span>. Zeigen Sie ihre herausragenden <span className="text-indigo-400 font-semibold">Balkonbau-Projekte</span> und erhalten Sie <span className="text-indigo-400 font-semibold">exklusive Zugang</span> zu besonderen Balkonbau-Projekten.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-4">
            <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 rounded-full"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-300 min-w-max">
              Schritt {currentStep + 1} von {totalSteps}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 overflow-hidden">
            {renderQuestion()}
          </div>

          {/* Navigation */}
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
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
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
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Vertrauliche Bearbeitung</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-orange-500" />
              <span>200+ Balkonbau Partner deutschlandweit</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Keine Kosten für Balkonbau Partner</span>
            </div>
          </div>
        </div>

        {/* Benefits Cards */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            🎯 Deine expliziten Vorteile als Partner
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-teal-500/50 hover:scale-105 transition-all duration-300 group">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-3">
                <span className="text-orange-500 text-3xl">📈</span>
                <span>Balkonbau Umsatz steigern</span>
              </h3>
              <p className="text-gray-200 text-base leading-relaxed">
                Durchschnittlich <span className="text-orange-400 font-semibold">30-50% Umsatzsteigerung</span> durch qualifizierte Balkonbau-Leads ohne Akquise-Aufwand.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-green-500/50 hover:scale-105 transition-all duration-300 group">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-3">
                <span className="text-green-500 text-3xl">🎯</span>
                <span>Planbare Balkonbau Aufträge</span>
              </h3>
              <p className="text-gray-200 text-base leading-relaxed">
                Regelmäßige, <span className="text-green-400 font-semibold">qualifizierte Balkonbau-Anfragen</span> in Ihrem Arbeitsgebiet für bessere Auslastung.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-yellow-500/50 hover:scale-105 transition-all duration-300 group">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-3">
                <span className="text-yellow-500 text-3xl">🏆</span>
                <span>Balkonbau Reputation aufbauen</span>
              </h3>
              <p className="text-gray-200 text-base leading-relaxed">
                Stärken Sie Ihre <span className="text-yellow-400 font-semibold">Balkonbau-Marke</span> durch Kundenbewertungen und Marketing-Support.
              </p>
            </div>
          </div>
        </div>

        {/* Partner-spezifische Informationen */}
        <div className="mt-16">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-8">🤝 Warum Partner mit uns arbeiten</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-semibold text-white mb-2">Qualifizierte Leads</h3>
                <p className="text-gray-400 text-sm">Nur kaufentschlossene Kunden mit Budget und Zeitrahmen</p>
              </div>
              
              <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-lg font-semibold text-white mb-2">Transparente Kosten</h3>
                <p className="text-gray-400 text-sm">Faire Lead-Preise ohne versteckte Gebühren</p>
              </div>
              
              <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold text-white mb-2">Regionale Vermittlung</h3>
                <p className="text-gray-400 text-sm">Leads nur aus Ihrem definierten Arbeitsgebiet</p>
              </div>
              
              <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-lg font-semibold text-white mb-2">Skalierbares Wachstum</h3>
                <p className="text-gray-400 text-sm">Von 8 auf 30+ Leads pro Monat</p>
              </div>
              
              <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-lg font-semibold text-white mb-2">Partner-Support</h3>
                <p className="text-gray-400 text-sm">Dedizierte Ansprechpartner und Schulungen</p>
              </div>
              
              <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-lg font-semibold text-white mb-2">Bewertungs-System</h3>
                <p className="text-gray-400 text-sm">Aufbau Ihrer Online-Reputation</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <a href="partner-info" className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500/10 border border-orange-500/20 rounded-lg text-orange-400 hover:bg-orange-500/20 transition-all hover:scale-105">
                🚀 Jetzt Partner werden
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4 text-orange-500">🦊 BALKONFUCHS</div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Eine innovative Plattform für Balkonbau-Projekte. Über 850 zufriedene Balkonbau-Kunden vertrauen uns.
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
                <li><a href="/kalkulator/" className="text-gray-300 hover:text-orange-400 transition-colors">Balkon-Kalkulator</a></li>
                <li><a href="/planer/" className="text-gray-300 hover:text-orange-400 transition-colors">Balkon-Planer</a></li>
                <li><a href="/express-angebot/" className="text-gray-300 hover:text-orange-400 transition-colors">Express-Angebot</a></li>
                <li><a href="/genehmigung/" className="text-gray-300 hover:text-orange-400 transition-colors">Genehmigungscheck</a></li>
                <li><a href="/bauzeit-planung/" className="text-gray-300 hover:text-orange-400 transition-colors">Baustart Rechner</a></li>
                <li><a href="/erfahrungen/" className="text-gray-300 hover:text-orange-400 transition-colors">Erfahrungen</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Wissen</h4>
              <ul className="space-y-2">
                <li><a href="/ratgeber/" className="text-gray-300 hover:text-orange-400 transition-colors">Ratgeber</a></li>
                <li><a href="/lexikon/" className="text-gray-300 hover:text-orange-400 transition-colors">Lexikon</a></li>
                <li><a href="/foerderung/" className="text-gray-300 hover:text-orange-400 transition-colors">Förderung</a></li>
                <li><a href="/baurecht-balkon/" className="text-gray-300 hover:text-orange-400 transition-colors">Baurecht & Genehmigungen</a></li>
                <li><a href="/feedback/" className="text-gray-300 hover:text-orange-400 transition-colors">Feedback geben</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Unternehmen</h4>
              <ul className="space-y-2">
                <li><a href="ueber-uns" className="text-gray-300 hover:text-orange-400 transition-colors">Über uns</a></li>
                <li><a href="karriere" className="text-gray-300 hover:text-orange-400 transition-colors">Karriere</a></li>
                <li><a href="partner-werden" className="text-orange-400 hover:text-orange-300 transition-colors">Partnerbewerbung</a></li>
                <li><a href="partner-info" className="text-gray-300 hover:text-orange-400 transition-colors">Partner Vorabinfos</a></li>
                <li><a href="/kontakt/" className="text-gray-300 hover:text-orange-400 transition-colors">Kontakt</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-300 text-sm">
                © 2025 BALKONFUCHS GmbH. Alle Rechte vorbehalten.
              </p>
              <div className="flex space-x-6 text-sm text-gray-300">
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
                  <a href="/faq" className="hover:text-orange-400 transition-colors">FAQ</a>
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
