import React, { useState } from 'react';
import Head from 'next/head';
import { ArrowRight, ArrowLeft, Search, Home, MapPin, Ruler, Euro, CheckCircle, Star, Shield, Clock, Users, Phone, Mail, X, Play, ChevronDown, Menu, Building, TrendingUp, Award, Target, Zap, HeadphonesIcon, Rocket, FileText, Check, AlertTriangle, Calendar, User, CheckSquare, Calculator } from 'lucide-react';

import ZohoSalesIQ from '../components/ZohoSalesIQ.js';
import { LEAD_SCORING_FUNCTIONS } from '../utils/balkon-lead-scoring';
import { calculatePlanerScore } from '../utils/planer-scoring';
import { generatePDF, downloadPDF } from '../lib/pdf-generator';
const BalkonFuchsPlanerFunnel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // SEO-optimierte Meta-Tags und strukturierte Daten
  React.useEffect(() => {
    // Dynamische Meta-Tags für bessere SEO
    document.title = 'Balkon Planer - Detaillierte Projektplanung & Expertenberatung | BALKONFUCHS';
    
    // Meta-Description aktualisieren
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Planen Sie Ihr Balkon-Projekt Schritt für Schritt mit unserem intelligenten Planer. Erhalten Sie Expertenberatung und detaillierte Projektplanung für Ihren Balkonbau.');
    }
  }, []);
  const [formData, setFormData] = useState({
    projectStatus: '',
    timeframe: '',
    ownership: '',
    balconyType: '',
    wallMaterial: '',
    basement: '',
    floor: '',
    budget: '',
    size: { width: '', depth: '' },
    balconyCount: 1,
    offerPreferences: { count: '', region: '' },
    accessibility: '',
    balconyFloor: '',
    railing: '',
    surface: '',
    documents: [],
    additionalInfo: '',
    contact: {
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      zipCode: '',
      contactPreference: '',
      newsletter: false,
      privacy: false
    }
  });

  // Mapping-Funktion für Planer-Scoring
  const mapFormDataToPlanerScoring = () => {
    // Block 1: Projekt-Status
    const statusMap = {
      'idea': 'erste_ideen',              // 'Habe noch keine konkrete Idee'
      'feasibility': 'machbarkeit_pruefen', // 'Möchte Machbarkeit prüfen'
      'submitted': 'bauantrag_laeuft',     // 'Bauantrag ist eingereicht'
      'approved': 'genehmigung_da',        // 'Ich habe bereits eine Genehmigung'
      'seeking': 'suche_firma'            // 'Suche jetzt nach passender Firma'
    };

    const zeitrahmenMap = {
      'unclear': 'unklar',         // 'Noch unklar'
      '6months': '6_monate',       // 'In den nächsten 6 Monaten'
      '3months': '3_monate',       // 'In den nächsten 3 Monaten'
      'asap': 'asap'               // 'So schnell wie möglich'
    };

    const eigentumMap = {
      'tenant': 'miete',                  // 'Ich wohne dort zur Miete'
      'condo': 'eigentuemer_gemeinschaft', // 'Teil einer Eigentümergemeinschaft'
      'manager': 'verwalter',             // 'Wird von mir verwaltet'
      'owner': 'eigentum'                 // 'Ist mein Eigentum'
    };

    // Block 2: Technische Basis
    const balkontypMap = {
      'terrace': 'hochterrasse',  // 'Hochterrasse'
      'hanging': 'haengebalkon',   // 'Hängebalkon (stützenfrei)'
      'leaning': 'anlehnbalkon',  // 'Anlehnbalkon (2 Stützen)'
      'standing': 'vorstellbalkon' // 'Vorstellbalkon (4+ Stützen)'
    };

    const wandmaterialMap = {
      'unknown': 'unbekannt',      // 'Weiß ich nicht genau'
      'wood_frame': 'holzstaender', // 'Holzständerbauweise'
      'hlz': 'hlz',                // 'Hochloch-Ziegelsteine (HLZ)'
      'concrete': 'stahlbeton',    // 'Stahlbeton'
      'masonry': 'mauerwerk'       // 'Mauerwerk'
    };

    const unterkellertMap = {
      'unknown': 'unbekannt', // 'Weiß ich nicht'
      'no': 'nein',           // 'Nein, nicht unterkellert'
      'yes': 'ja'             // 'Ja, unterkellert'
    };

    const geschossMap = {
      'higher': 'hoeher',    // 'Höher als 2. OG'
      'second': '2_og',      // '2. Obergeschoss'
      'first': '1_og',       // '1. Obergeschoss'
      'ground': 'eg'         // 'Erdgeschoss'
    };

    // Block 3: Projektumfang
    const budgetMap = {
      '10k': 'bis_10k',      // 'Bis 10.000 €'
      'unclear': 'unklar',   // 'Noch unklar'
      '10_20k': '10_20k',    // '10.000 - 20.000 €'
      '20_30k': '20_30k',    // '20.000 - 30.000 €'
      '30k_plus': '30k_plus' // 'Über 30.000 €'
    };

    // Balkongröße berechnen
    const getBalkongroesseQm = () => {
      const width = parseFloat(formData.size.width) || 0;
      const depth = parseFloat(formData.size.depth) || 0;
      return width * depth;
    };

    const befahrbarkeitMap = {
      'impossible': 'nicht',        // 'Nicht erreichbar'
      'difficult': 'schwer',        // 'Schwer erreichbar'
      'limited': 'eingeschraenkt',  // 'Eingeschränkt erreichbar'
      'good': 'gut'                 // 'Gut erreichbar'
    };

    // Block 4: Service & Kontakt
    const unterlagenMap = {
      'grundriss': 'grundriss',
      'statik': 'statik',
      'genehmigung': 'genehmigung',
      'planung': 'planung',
      'keine': 'keine'
    };

    const mappedDocuments = formData.documents
      .map(doc => unterlagenMap[doc])
      .filter(Boolean);

    return {
      // Block 1: Projekt-Status
      status: statusMap[formData.projectStatus] || 'erste_ideen',
      zeitrahmen: zeitrahmenMap[formData.timeframe] || 'unklar',
      eigentum: eigentumMap[formData.ownership] || 'miete',
      
      // Block 2: Technische Basis
      balkontyp: balkontypMap[formData.balconyType] || 'hochterrasse',
      wandmaterial: wandmaterialMap[formData.wallMaterial] || 'unbekannt',
      unterkellert: unterkellertMap[formData.basement] || 'unbekannt',
      geschoss: geschossMap[formData.floor] || 'eg',
      
      // Block 3: Projektumfang
      budget: budgetMap[formData.budget] || 'unklar',
      balkongroesse_qm: getBalkongroesseQm(),
      befahrbarkeit: befahrbarkeitMap[formData.accessibility] || 'nicht',
      
      // Block 4: Service & Kontakt
      unterlagen: mappedDocuments,
      support: formData.contact.contactPreference === 'beratung' || formData.contact.contactPreference === 'telefon'
    };
  };

  // Progress Bar Steps - EXAKT aus der HTML-Datei übernommen
  const steps = [
    { title: 'Projektstatus', description: 'Aktueller Stand Ihres Projekts' },
    { title: 'Zeitrahmen', description: 'Wann soll es losgehen?' },
    { title: 'Eigentumsverhältnis', description: 'Wichtige rechtliche Grundlage' },
    { title: 'Balkontyp', description: 'Welchen Balkontyp möchten Sie?' },
    { title: 'Wandmaterial', description: 'Befestigungsmöglichkeiten' },
    { title: 'Unterkellerung', description: 'Statische Grundlage' },
    { title: 'Geschoss', description: 'Höhe und Zugänglichkeit' },
    { title: 'Budget', description: 'Kostenrahmen' },
    { title: 'Größe', description: 'Maße des Balkons' },
    { title: 'Zufahrt', description: 'Logistik zur Baustelle' },
    { title: 'Bodenbelag', description: 'Balkonboden wählen' },
    { title: 'Geländer', description: 'Art des Geländers' },
    { title: 'Oberfläche', description: 'Behandlung der Materialien' },
    { title: 'Unterlagen', description: 'Vorhandene Dokumente' },
    { title: 'Zusatzinfos', description: 'Weitere Details' },
    { title: 'Angebotspräferenzen', description: 'Anzahl und Region der Angebote' },
    { title: 'Kontakt', description: 'Ihre Kontaktdaten' }
  ];

  // Questions for each step - EXAKT aus der HTML-Datei übernommen
  const questions = [
    {
      id: 'projectStatus',
      title: 'Wie ist der aktuelle Status Ihres Projekts?',
              subtitle: '📋 Das hilft uns, Sie optimal auf Ihr Projekt vorzubereiten!',
      type: 'selection',
      options: [
        { 
          icon: '💡', 
          title: 'Habe noch keine konkrete Idee', 
          subtitle: 'Erste Orientierung gewünscht',
          value: 'idea'
        },
        { 
          icon: '🔍', 
          title: 'Möchte Machbarkeit prüfen', 
          subtitle: 'Technische Umsetzbarkeit klären',
          value: 'feasibility'
        },
        { 
          icon: '📄', 
          title: 'Bauantrag ist eingereicht', 
          subtitle: 'Warte auf Genehmigung',
          value: 'submitted'
        },
        { 
          icon: '✅', 
          title: 'Ich habe bereits eine Genehmigung', 
          subtitle: 'Kann sofort starten',
          value: 'approved'
        },
        { 
          icon: '🔍', 
          title: 'Suche jetzt nach passender Firma', 
          subtitle: 'Bereit für Angebote',
          value: 'seeking'
        }
      ]
    },
    {
      id: 'timeframe',
      title: 'Wann soll es losgehen?',
      subtitle: '⏰ Das beeinflusst unsere Planungsempfehlung!',
      type: 'selection',
      options: [
        { 
          icon: '⚡', 
          title: 'So schnell wie möglich', 
          subtitle: 'Hohe Priorität',
          value: 'asap'
        },
        { 
          icon: '📅', 
          title: 'In den nächsten 3 Monaten', 
          subtitle: 'Konkrete Zeitplanung',
          value: '3months'
        },
        { 
          icon: '📅', 
          title: 'In den nächsten 6 Monaten', 
          subtitle: 'Mittelfristige Planung',
          value: '6months'
        },
        { 
          icon: '❓', 
          title: 'Noch unklar', 
          subtitle: 'Flexible Zeitplanung',
          value: 'unclear'
        }
      ]
    },
    {
      id: 'ownership',
      title: 'Wie ist das Eigentumsverhältnis?',
      subtitle: '🏠 Das ist wichtig für Genehmigungen und Umsetzung!',
      type: 'selection',
      options: [
        { 
          icon: '🏠', 
          title: 'Ist mein Eigentum', 
          subtitle: 'Volle Entscheidungsfreiheit',
          value: 'owner'
        },
        { 
          icon: '🏢', 
          title: 'Teil einer Eigentümergemeinschaft', 
          subtitle: 'WEG-Beschluss erforderlich',
          value: 'condo'
        },
        { 
          icon: '🔑', 
          title: 'Wird von mir verwaltet', 
          subtitle: 'Als Verwalter berechtigt',
          value: 'manager'
        },
        { 
          icon: '🏠', 
          title: 'Ich wohne dort zur Miete', 
          subtitle: 'Vermieter-Genehmigung nötig',
          value: 'tenant'
        }
      ]
    },
    {
      id: 'balconyType',
      title: 'Welcher Balkontyp soll es werden?',
      subtitle: '🏗️ Verschiedene Typen haben unterschiedliche Anforderungen!',
      type: 'selection',
      options: [
        { 
          icon: '🪂', 
          title: 'Hängebalkon (stützenfrei)', 
          subtitle: 'An der Hauswand befestigt',
          value: 'hanging'
        },
        { 
          icon: '🏗️', 
          title: 'Vorstellbalkon (4+ Stützen)', 
          subtitle: 'Freistehend mit Fundamenten',
          value: 'standing'
        },
        { 
          icon: '🔗', 
          title: 'Anlehnbalkon (2 Stützen)', 
          subtitle: 'Teilweise gestützt',
          value: 'leaning'
        },
        { 
          icon: '🏞️', 
          title: 'Hochterrasse', 
          subtitle: 'Große Terrassenfläche',
          value: 'terrace'
        }
      ]
    },
    {
      id: 'wallMaterial',
      title: 'Aus welchem Material ist Ihre Außenwand?',
      subtitle: '🧱 Das bestimmt die Befestigungsmöglichkeiten!',
      type: 'selection',
      options: [
        { 
          icon: '🧱', 
          title: 'Mauerwerk', 
          subtitle: 'Ziegel, Klinker, Naturstein',
          value: 'masonry'
        },
        { 
          icon: '🏗️', 
          title: 'Stahlbeton', 
          subtitle: 'Betonwand, sehr stabil',
          value: 'concrete'
        },
        { 
          icon: '🏠', 
          title: 'Hochloch-Ziegelsteine (HLZ)', 
          subtitle: 'Moderne Ziegelbauweise',
          value: 'hlz'
        },
        { 
          icon: '🌳', 
          title: 'Holzständerbauweise', 
          subtitle: 'Holzrahmen mit Dämmung',
          value: 'wood_frame'
        },
        { 
          icon: '❓', 
          title: 'Weiß ich nicht genau', 
          subtitle: 'Vor-Ort-Prüfung erforderlich',
          value: 'unknown'
        }
      ]
    },
    {
      id: 'basement',
      title: 'Ist das Gebäude unterkellert?',
      subtitle: '🏠 Das beeinflusst die Statik bei stehenden Balkonen!',
      type: 'selection',
      options: [
        { 
          icon: '✅', 
          title: 'Ja, unterkellert', 
          subtitle: 'Stabile Basis vorhanden',
          value: 'yes'
        },
        { 
          icon: '❌', 
          title: 'Nein, nicht unterkellert', 
          subtitle: 'Bodenplatte/Streifenfundament',
          value: 'no'
        },
        { 
          icon: '❓', 
          title: 'Weiß ich nicht', 
          subtitle: 'Prüfung vor Ort nötig',
          value: 'unknown'
        }
      ]
    },
    {
      id: 'floor',
      title: 'In welchem Geschoss soll der Balkon entstehen?',
      subtitle: '📍 Die Höhe ist wichtig für Genehmigung und Kosten!',
      type: 'selection',
      options: [
        { 
          icon: '🏠', 
          title: 'Erdgeschoss', 
          subtitle: 'Einfache Zugänglichkeit',
          value: 'ground'
        },
        { 
          icon: '🏠', 
          title: '1. Obergeschoss', 
          subtitle: 'Standard-Balkonfläche',
          value: 'first'
        },
        { 
          icon: '🏠', 
          title: '2. Obergeschoss', 
          subtitle: 'Erhöhter Aufwand',
          value: 'second'
        },
        { 
          icon: '🏢', 
          title: 'Höher als 2. OG', 
          subtitle: 'Besondere Sicherheitsanforderungen',
          value: 'higher'
        }
      ]
    },
    {
      id: 'budget',
      title: 'Welches Budget haben Sie eingeplant?',
      subtitle: '💰 So kann ich Ihnen passende Lösungen vorschlagen!',
      type: 'selection',
      options: [
        { 
          icon: '💵', 
          title: 'Bis 10.000 €', 
          subtitle: 'Einfache Lösung',
          value: '10k'
        },
        { 
          icon: '💸', 
          title: '10.000 - 20.000 €', 
          subtitle: 'Solide Ausstattung',
          value: '10_20k'
        },
        { 
          icon: '💎', 
          title: '20.000 - 30.000 €', 
          subtitle: 'Hochwertige Lösung',
          value: '20_30k'
        },
        { 
          icon: '💍', 
          title: 'Über 30.000 €', 
          subtitle: 'Premium-Segment',
          value: '30k_plus'
        },
        { 
          icon: '❓', 
          title: 'Noch unklar', 
          subtitle: 'Beratung zu Optionen',
          value: 'unclear'
        }
      ]
    },
    {
      id: 'size',
      title: 'Wie groß soll Ihr Balkon werden?',
      subtitle: '📏 Genaue Maße helfen bei der Kostenplanung!',
      type: 'size_input'
    },
    {
      id: 'accessibility',
      title: 'Wie ist die Zufahrt zur Baustelle?',
      subtitle: '🚚 Das beeinflusst die Logistikkosten!',
      type: 'selection',
      options: [
        { 
          icon: '✅', 
          title: 'Gut erreichbar', 
          subtitle: 'LKW kann direkt anfahren',
          value: 'good'
        },
        { 
          icon: '⚠️', 
          title: 'Eingeschränkt erreichbar', 
          subtitle: 'Kleinere Zufahrt verfügbar',
          value: 'limited'
        },
        { 
          icon: '❌', 
          title: 'Schwer erreichbar', 
          subtitle: 'Längere Transportwege',
          value: 'difficult'
        },
        { 
          icon: '🚫', 
          title: 'Nicht erreichbar', 
          subtitle: 'Handtransport erforderlich',
          value: 'impossible'
        }
      ]
    },
    {
      id: 'balconyFloor',
      title: 'Welchen Balkonboden wünschen Sie sich?',
      subtitle: '🏗️ Der Bodenbelag beeinflusst Optik, Pflege und Langlebigkeit!',
      type: 'selection',
      options: [
        { 
          icon: '🔷', 
          title: 'Kunststoff (WPC)', 
          subtitle: 'Pflegeleicht, witterungsbeständig',
          value: 'plastic'
        },
        { 
          icon: '🌳', 
          title: 'Holz', 
          subtitle: 'Natürlich, warm, regelmäßige Pflege',
          value: 'wood'
        },
        { 
          icon: '⚙️', 
          title: 'Aluminiumdiele', 
          subtitle: 'Modern, langlebig, rutschfest',
          value: 'aluminum'
        },
        { 
          icon: '🪨', 
          title: 'Steinbelag', 
          subtitle: 'Robust, edel, verschiedene Optiken',
          value: 'stone'
        }
      ]
    },
    {
      id: 'railing',
      title: 'Welche Art von Geländer bevorzugen Sie?',
      subtitle: '🛡️ Das Geländer prägt maßgeblich die Optik Ihres Balkons!',
      type: 'selection',
      options: [
        { 
          icon: '📏', 
          title: 'Stabgeländer', 
          subtitle: 'Klassisch, zeitlos, gute Belüftung',
          value: 'bars'
        },
        { 
          icon: '🔲', 
          title: 'Geschlossene Füllung', 
          subtitle: 'Sichtschutz, Windschutz, modern',
          value: 'closed'
        },
        { 
          icon: '🪟', 
          title: 'Glasgeländer', 
          subtitle: 'Transparent, elegant, freie Sicht',
          value: 'glass'
        },
        { 
          icon: '💎', 
          title: 'Ganzglasgeländer', 
          subtitle: 'Rahmenlos, luxuriös, maximale Transparenz',
          value: 'full_glass'
        }
      ]
    },
    {
      id: 'surface',
      title: 'Welche Oberflächenbehandlung wünschen Sie?',
      subtitle: '✨ Die Oberflächenbehandlung bestimmt Langlebigkeit und Optik!',
      type: 'selection',
      options: [
        { 
          icon: '🔧', 
          title: 'Verzinkt', 
          subtitle: 'Kostengünstig, solider Korrosionsschutz',
          value: 'galvanized'
        },
        { 
          icon: '🎨', 
          title: 'Pulverbeschichtet', 
          subtitle: 'Farbwahl möglich, sehr langlebig',
          value: 'powder_coated'
        },
        { 
          icon: '💍', 
          title: 'Edelstahl', 
          subtitle: 'Premium-Material, wartungsfrei',
          value: 'stainless_steel'
        }
      ]
    },
    {
      id: 'documents',
      title: 'Welche Unterlagen können Sie bereitstellen?',
      subtitle: '📋 Vorhandene Unterlagen sparen Zeit und Kosten!',
      type: 'multiple',
      options: [
        { 
          icon: '🗺️', 
          title: 'Grundriss vom Bestand', 
          subtitle: 'Bestehende Baupläne',
          value: 'floorplan'
        },
        { 
          icon: '🏗️', 
          title: 'Statik vom Bestand', 
          subtitle: 'Statische Berechnung',
          value: 'structural'
        },
        { 
          icon: '✅', 
          title: 'Genehmigung vorhanden', 
          subtitle: 'Bauantrag bereits genehmigt',
          value: 'permit'
        },
        { 
          icon: '📐', 
          title: 'Planung der neuen Balkonanlage', 
          subtitle: 'Erste Entwürfe vorhanden',
          value: 'planning'
        },
        { 
          icon: '❌', 
          title: 'Keine Unterlagen vorhanden', 
          subtitle: 'Alles muss neu erstellt werden',
          value: 'none'
        }
      ]
    },
    {
      id: 'additionalInfo',
      title: 'Gibt es weitere Projektdetails?',
      subtitle: '📝 Zusätzliche Informationen helfen bei der optimalen Planung!',
      type: 'text_input',
      placeholder: 'Beschreiben Sie besondere Wünsche, Herausforderungen oder Details...'
    },
    {
      id: 'offerPreferences',
      title: 'Wie viele Angebote möchten Sie erhalten?',
      subtitle: '📋 Wählen Sie die Anzahl und den geografischen Bereich Ihrer Angebote!',
      type: 'offer_selection',
      conditional: true // Nur anzeigen wenn seeking oder approved
    }
  ];

  // Handle answer selection - EXAKT aus der HTML-Datei übernommen
  const handleAnswerSelect = (field, value) => {
    if (field === 'documents') {
      const newDocuments = formData.documents.includes(value) 
        ? formData.documents.filter(doc => doc !== value)
        : [...formData.documents, value];
      setFormData(prev => ({ ...prev, documents: newDocuments }));
    } else if (field === 'size') {
      setFormData(prev => ({ ...prev, size: { ...prev.size, ...value } }));
    } else if (field === 'offerPreferences') {
      setFormData(prev => ({ ...prev, offerPreferences: { ...prev.offerPreferences, ...value } }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Auto-advance for certain fields
    if (['projectStatus', 'timeframe', 'ownership', 'balconyType', 'wallMaterial', 'basement', 'floor', 'budget', 'accessibility', 'balconyFloor', 'railing', 'surface'].includes(field)) {
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
    if (currentStep >= questions.length) return true;
    
    const question = questions[currentStep];
    if (!question) return false;
    
    // Überspringe offerPreferences wenn nicht seeking/approved
    if (question.id === 'offerPreferences') {
      const wantsOffer = formData.projectStatus === 'seeking' || formData.projectStatus === 'approved';
      if (!wantsOffer) return true; // Kann fortfahren ohne diese Frage
    }
    
    switch (question.type) {
      case 'selection':
        return formData[question.id] !== '';
      case 'multiple':
        return true; // Multiple selection is optional
      case 'size_input':
        return formData.size.width && formData.size.depth;
      case 'text_input':
        return formData[question.id]?.length >= 10;
      case 'offer_selection':
        return formData.offerPreferences.count && formData.offerPreferences.region;
      default:
        return true;
    }
  };

  // Render current step - EXAKT aus der HTML-Datei übernommen
  const renderCurrentStep = () => {
    console.log('renderCurrentStep called with currentStep:', currentStep, 'questions.length:', questions.length);
    
    if (currentStep === questions.length) {
      console.log('Rendering contact form');
      return renderContactForm();
    } else if (currentStep > questions.length) {
      console.log('Rendering success page');
      return renderSuccessPage();
    }

    const question = questions[currentStep];
    
    // Safety check to prevent undefined errors
    if (!question) {
      console.error('Question not found for step:', currentStep);
      return <div className="text-center text-red-400">Fehler: Schritt nicht gefunden</div>;
    }

    // Conditional questions: Überspringe offerPreferences wenn nicht seeking/approved
    if (question.id === 'offerPreferences') {
      const wantsOffer = formData.projectStatus === 'seeking' || formData.projectStatus === 'approved';
      if (!wantsOffer) {
        // Überspringe diese Frage und gehe zum nächsten Schritt
        if (currentStep < questions.length - 1) {
          setTimeout(() => nextStep(), 100);
          return <div className="text-center"><p className="text-gray-400">Wird geladen...</p></div>;
        }
      }
    }

    console.log('Rendering question:', question.title);
    switch (question.type) {
      case 'selection':
        return renderOptionsStep(question);
      case 'multiple':
        return renderMultipleStep(question);
      case 'size_input':
        return renderSizeInputStep();
      case 'text_input':
        return renderTextInputStep(question);
      case 'offer_selection':
        return renderOfferSelectionStep(question);
      default:
        return null;
    }
  };

  // Render options step - EXAKT aus der HTML-Datei übernommen
  const renderOptionsStep = (question) => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">{question.title}</h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        {question.subtitle}
      </p>
      
      <div className="grid gap-4 max-w-2xl mx-auto">
        {question.options.map((option) => (
          <div
            key={option.value}
            className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
              formData[question.id] === option.value
                ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                : 'border-gray-700 bg-gray-800/50 hover:border-purple-500/50'
            }`}
            onClick={() => handleAnswerSelect(question.id, option.value)}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{option.icon}</div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-semibold text-white">{option.title}</h3>
                <p className="text-gray-400">{option.subtitle}</p>
              </div>
              {formData[question.id] === option.value && (
                <Check className="w-6 h-6 text-orange-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render multiple selection step
  const renderMultipleStep = (question) => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">{question.title}</h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        {question.subtitle}
      </p>
      
      <div className="grid gap-4 max-w-2xl mx-auto">
        {question.options.map((option) => (
          <div
            key={option.value}
            className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
              formData[question.id]?.includes(option.value)
                ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                : 'border-gray-700 bg-gray-800/50 hover:border-purple-500/50'
            }`}
            onClick={() => handleAnswerSelect(question.id, option.value)}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{option.icon}</div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-semibold text-white">{option.title}</h3>
                <p className="text-gray-400">{option.subtitle}</p>
              </div>
              {formData[question.id]?.includes(option.value) && (
                <Check className="w-6 h-6 text-orange-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render size input step
  const renderSizeInputStep = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Wie groß soll Ihr Balkon werden?</h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        📏 Genaue Maße helfen bei der Kostenplanung!
      </p>
      
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Anzahl der Balkone</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
            {[1, 2, 3, 4, 5, 'mehr'].map((count) => (
              <div
                key={count}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  formData.balconyCount === count || (count === 'mehr' && formData.balconyCount > 5)
                    ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                    : 'border-gray-700 bg-gray-800/50 hover:border-purple-500/50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, balconyCount: count === 'mehr' ? 6 : count }))}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {count === 'mehr' ? '5+' : count}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {count === 'mehr' ? 'mehr' : count === 1 ? 'Balkon' : 'Balkone'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Balkon-Größe</h3>
          <div className="grid grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Breite (m)</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white text-center text-lg font-semibold focus:border-orange-500 focus:outline-none"
                placeholder="3.0"
                step="0.1"
                min="1.0"
                max="10.0"
                value={formData.size.width}
                onChange={(e) => handleAnswerSelect('size', { width: e.target.value })}
              />
            </div>
            <div className="text-center text-2xl font-bold text-gray-400">×</div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tiefe (m)</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white text-center text-lg font-semibold focus:border-orange-500 focus:outline-none"
                placeholder="1.5"
                step="0.1"
                min="1.0"
                max="5.0"
                value={formData.size.depth}
                onChange={(e) => handleAnswerSelect('size', { depth: e.target.value })}
              />
            </div>
          </div>
          
          {formData.size.width && formData.size.depth && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-4">
              <p className="text-blue-400 font-semibold">
                Balkonfläche pro Balkon: {(parseFloat(formData.size.width) * parseFloat(formData.size.depth)).toFixed(1)} m²
                {formData.balconyCount > 1 && (
                  <span className="block mt-2">
                    Gesamtfläche: {((parseFloat(formData.size.width) || 0) * (parseFloat(formData.size.depth) || 0) * formData.balconyCount).toFixed(1)} m² ({formData.balconyCount} Balkone)
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Hängebalkon-Warnung */}
          {formData.size.width && formData.size.depth && 
           formData.balconyType === 'hanging' && 
           (parseFloat(formData.size.width) * parseFloat(formData.size.depth)) > 4.5 && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">⚠️</div>
                <div className="text-left">
                  <h4 className="font-semibold text-yellow-400 mb-2">Hinweis zu Hängebalkonen</h4>
                  <p className="text-yellow-300 text-sm">
                    Hängebalkone größer als 4,5m² (z.B. 3×1,5m oder 2,5×1,75m) sind bei Gebäuden im Bestand in der Regel die größte verfügbare Option. 
                    Größere Flächen erfordern eine Stützkonstruktion und sind oft nicht möglich.
                  </p>
                  <p className="text-yellow-200 text-sm mt-2 font-medium">
                    💡 Empfehlung: Wählen Sie "Anlehnbalkon" für größere Balkone mit teilweiser Stützkonstruktion.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render text input step
  const renderTextInputStep = (question) => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">{question.title}</h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        {question.subtitle}
      </p>
      
      <div className="max-w-2xl mx-auto">
        <textarea
          className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-vertical"
          placeholder={question.placeholder}
          rows={6}
          value={formData[question.id] || ''}
          onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
        />
        <p className="text-sm text-gray-500 mt-2">
          Mindestens 10 Zeichen erforderlich
        </p>
      </div>
    </div>
  );

  // Render offer preferences step
  const renderOfferSelectionStep = (question) => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">{question.title}</h2>
      <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
        {question.subtitle}
      </p>
      
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Anzahl Angebote */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Anzahl der Angebote</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['3', '4', '5', 'mehr'].map((count) => (
              <div
                key={count}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  formData.offerPreferences.count === count
                    ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                    : 'border-gray-700 bg-gray-800/50 hover:border-purple-500/50'
                }`}
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  offerPreferences: { ...prev.offerPreferences, count } 
                }))}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">
                    {count === 'mehr' ? '5+' : count}
                  </div>
                  <div className="text-sm text-gray-400">
                    {count === 'mehr' ? '5 oder mehr' : `${count} Angebote`}
                  </div>
                </div>
                {formData.offerPreferences.count === count && (
                  <Check className="w-5 h-5 text-orange-500 mx-auto mt-2" />
                )}
              </div>
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
              <div
                key={region.value}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  formData.offerPreferences.region === region.value
                    ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                    : 'border-gray-700 bg-gray-800/50 hover:border-purple-500/50'
                }`}
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  offerPreferences: { ...prev.offerPreferences, region: region.value } 
                }))}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">📍</div>
                  <div className="text-left flex-1">
                    <h4 className="text-xl font-semibold text-white">{region.title}</h4>
                    <p className="text-gray-400">{region.subtitle}</p>
                  </div>
                  {formData.offerPreferences.region === region.value && (
                    <Check className="w-6 h-6 text-orange-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );



  // Render contact form (wie beim Kalkulator)
  const renderContactForm = () => {
    const wantsOffer = formData.projectStatus === 'seeking' || formData.projectStatus === 'approved';
    const phoneRequired = wantsOffer && (formData.contact.contactPreference === 'phone' || formData.contact.contactPreference === 'both');
    
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Deine Kontaktdaten</h2>
        <p className="text-xl text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
          🎯 Fast geschafft! Wir erstellen dir einen detaillierten Projektplan.
        </p>
        
        <div className="max-w-md mx-auto space-y-4">
          <select
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:border-orange-500 focus:outline-none"
            value={formData.contact.salutation}
            onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, salutation: e.target.value } }))}
            required
          >
            <option value="">Anrede wählen *</option>
            <option value="Herr">Herr</option>
            <option value="Frau">Frau</option>
            <option value="Divers">Divers</option>
          </select>
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
              placeholder="Vorname *"
              value={formData.contact.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, firstName: e.target.value } }))}
              required
            />
            <input
              type="text"
              className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
              placeholder="Nachname *"
              value={formData.contact.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, lastName: e.target.value } }))}
              required
            />
          </div>
          
          <input
            type="email"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
            placeholder="E-Mail-Adresse *"
            value={formData.contact.email}
            onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }))}
            required
          />
          
          <input
            type="text"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
            placeholder="Postleitzahl *"
            maxLength={5}
            value={formData.contact.zipCode}
            onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, zipCode: e.target.value } }))}
            required
          />
          
          {/* Adressfelder nur anzeigen, wenn Angebot gewünscht */}
          {wantsOffer && (
            <>
              <input
                type="text"
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                placeholder="Straße & Hausnummer *"
                value={formData.contact.address || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, address: e.target.value } }))}
                required
              />
              <input
                type="text"
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                placeholder="Stadt *"
                value={formData.contact.city || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, city: e.target.value } }))}
                required
              />
            </>
          )}
          
          <input
            type="tel"
            className={`w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none ${
              phoneRequired ? 'border-orange-500 focus:border-orange-500' : 'border-gray-700 focus:border-orange-500'
            }`}
            placeholder={phoneRequired ? "Telefonnummer *" : "Telefonnummer (optional)"}
            value={formData.contact.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, phone: e.target.value } }))}
            required={phoneRequired}
          />
          
          {wantsOffer && (
            <select
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:border-orange-500 focus:outline-none"
              value={formData.contact.contactPreference || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, contactPreference: e.target.value } }))}
            >
              <option value="">Kontaktpräferenz wählen</option>
              <option value="email">E-Mail</option>
              <option value="phone">Telefon</option>
              <option value="both">Beides</option>
            </select>
          )}

          {/* Hinweistext wenn Telefon gewählt wurde */}
          {phoneRequired && !formData.contact.phone && (
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-left">
              <p className="text-sm text-orange-300">
                ⚠️ Bitte geben Sie Ihre Telefonnummer ein, da Sie die Kontaktaufnahme per Telefon gewählt haben.
              </p>
            </div>
          )}
          
          <div className="flex items-start gap-3 text-left">
            <input
              type="checkbox"
              className="mt-1 w-4 h-4 text-orange-500 bg-gray-800 border-gray-700 rounded focus:ring-orange-500 focus:ring-2"
              checked={formData.contact.newsletter}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, newsletter: e.target.checked } }))}
            />
            <label className="text-sm text-gray-300">
              📧 Ja, ich möchte den kostenlosen Balkonbrief mit Tipps und Inspirationen erhalten
            </label>
          </div>
          
          <div className="flex items-start gap-3 text-left">
            <input
              type="checkbox"
              className="mt-1 w-4 h-4 text-orange-500 bg-gray-800 border-gray-700 rounded focus:ring-orange-500 focus:ring-2"
              checked={formData.contact.privacy}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, privacy: e.target.checked } }))}
              required
            />
          <label className="text-sm text-gray-300">
            ✅ Ich stimme der Verarbeitung meiner Daten gemäß <a href="/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Datenschutzerklärung</a> und <a href="/disclaimer/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Haftungsausschluss</a> zu *
          </label>
          </div>
        </div>
      </div>
    );
  };

  // Render success page mit Zusammenfassung
  const renderSuccessPage = () => {
    const area = formData.size.width && formData.size.depth ? 
                 (parseFloat(formData.size.width) * parseFloat(formData.size.depth)).toFixed(1) : 'N/A';
    
    return (
      <div className="text-center">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-12 h-12 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          🎉 Vielen Dank{formData.contact.firstName ? `, ${formData.contact.firstName}` : ''}!
        </h2>
        
        <p className="text-xl text-gray-300 mb-8">
          Ihr Projektplan wird von unserem Experten-Team erstellt und Sie erhalten ihn innerhalb der nächsten 24 Stunden.
        </p>
        
        <div id="project-summary" className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4">📋 Ihr Projekt im Überblick</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
            <div className="space-y-2">
              <div><strong className="text-orange-400">Status:</strong> <span className="text-gray-300">{
                formData.projectStatus === 'approved' ? 'Genehmigung vorhanden' : 
                formData.projectStatus === 'seeking' ? 'Sucht Partner' : 
                formData.projectStatus === 'submitted' ? 'Bauantrag eingereicht' :
                formData.projectStatus === 'feasibility' ? 'Machbarkeit prüfen' : 'Erste Orientierung'
              }</span></div>
              <div><strong className="text-orange-400">Zeitrahmen:</strong> <span className="text-gray-300">{
                formData.timeframe === 'asap' ? 'So schnell wie möglich' : 
                formData.timeframe === '3months' ? '3 Monate' : 
                formData.timeframe === '6months' ? '6 Monate' : 'Flexibel'
              }</span></div>
              <div><strong className="text-orange-400">Eigentum:</strong> <span className="text-gray-300">{
                formData.ownership === 'owner' ? 'Eigentum' : 
                formData.ownership === 'condo' ? 'Eigentümergemeinschaft' : 
                formData.ownership === 'manager' ? 'Verwaltet' : 'Miete'
              }</span></div>
              <div><strong className="text-orange-400">Balkontyp:</strong> <span className="text-gray-300">{
                formData.balconyType === 'hanging' ? 'Hängebalkon' : 
                formData.balconyType === 'standing' ? 'Vorstellbalkon' : 
                formData.balconyType === 'leaning' ? 'Anlehnbalkon' : 'Hochterrasse'
              }</span></div>
              <div><strong className="text-orange-400">Wandmaterial:</strong> <span className="text-gray-300">{
                formData.wallMaterial === 'masonry' ? 'Mauerwerk' : 
                formData.wallMaterial === 'concrete' ? 'Stahlbeton' : 
                formData.wallMaterial === 'hlz' ? 'HLZ' : 
                formData.wallMaterial === 'wood_frame' ? 'Holzständer' : 'Unbekannt'
              }</span></div>
            </div>
            <div className="space-y-2">
              {area !== 'N/A' && <div><strong className="text-orange-400">Größe:</strong> <span className="text-gray-300">{formData.size.width}×{formData.size.depth}m ({area}m²)</span></div>}
              <div><strong className="text-orange-400">Budget:</strong> <span className="text-gray-300">{
                formData.budget === '30k_plus' ? 'Über 30.000€' : 
                formData.budget === '20_30k' ? '20.000€ - 30.000€' : 
                formData.budget === '10_20k' ? '10.000€ - 20.000€' : 
                formData.budget === '10k' ? 'Bis 10.000€' : 'Unklar'
              }</span></div>
              <div><strong className="text-orange-400">Bodenbelag:</strong> <span className="text-gray-300">{
                formData.balconyFloor === 'wood' ? 'Holz' : 
                formData.balconyFloor === 'plastic' ? 'Kunststoff (WPC)' : 
                formData.balconyFloor === 'aluminum' ? 'Aluminium' : 
                formData.balconyFloor === 'stone' ? 'Steinbelag' : 'Nicht gewählt'
              }</span></div>
              <div><strong className="text-orange-400">Geländer:</strong> <span className="text-gray-300">{
                formData.railing === 'full_glass' ? 'Ganzglas' : 
                formData.railing === 'glass' ? 'Glas' : 
                formData.railing === 'bars' ? 'Stab' : 
                formData.railing === 'closed' ? 'Geschlossen' : 'Nicht gewählt'
              }</span></div>
              <div><strong className="text-orange-400">Oberfläche:</strong> <span className="text-gray-300">{
                formData.surface === 'stainless_steel' ? 'Edelstahl' : 
                formData.balconyFloor === 'powder_coated' ? 'Pulverbeschichtet' : 
                formData.balconyFloor === 'galvanized' ? 'Verzinkt' : 'Nicht gewählt'
              }</span></div>
              {formData.additionalInfo && (
                <div><strong className="text-orange-400">Zusätzliche Infos:</strong> <span className="text-gray-300">{formData.additionalInfo}</span></div>
              )}
            </div>
          </div>
        </div>
        
        {/* PDF Download Button */}
        <div className="mb-8">
          <button
            onClick={async () => {
              try {
                const summaryElement = document.getElementById('project-summary');
                if (summaryElement) {
                  const pdfBlob = await generatePDF(summaryElement, `${formData.contact.firstName || 'project'}-summary`);
                  downloadPDF(pdfBlob, `balkonfuchs-projekt-summary-${formData.contact.firstName || 'project'}.pdf`);
                }
              } catch (error) {
                console.error('Fehler beim Generieren des PDFs:', error);
              }
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
          >
            <FileText className="w-5 h-5" />
            Projektübersicht als PDF herunterladen
          </button>
        </div>
        
        {/* Intelligente Cross-Verlinkungen */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Was möchten Sie als nächstes tun?</h3>
          <p className="text-gray-400">Wir haben diese nächsten Schritte für Sie zusammengestellt:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
            
            {/* Baugenehmigung prüfen */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">🏗️ Baugenehmigung prüfen</h4>
              <p className="text-gray-400 mb-4">
                Finden Sie heraus, ob Sie eine Genehmigung benötigen
              </p>
              <a href="/genehmigung" className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all w-full text-center">
                Jetzt prüfen →
              </a>
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
           <a href="/planer/" className="text-orange-500 font-medium transition-colors border-b-2 border-orange-500 pb-1 hover:text-orange-500 font-medium transition-colors">Planer</a>
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
               <a href="/kalkulator/" className="block text-gray-300 font-medium">Kalkulator</a>
               <a href="/planer/" className="block text-orange-500 font-medium border-l-4 border-orange-500 pl-3">Planer</a>
               <a href="/genehmigung/" className="block text-gray-300 font-medium">Genehmigungscheck</a>
               <a href="/erfahrungen/" className="block text-gray-300 font-medium">Erfahrungen</a>
               <a href="/kalkulator/" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm mt-3 block text-center">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <div>
            <div className="text-2xl font-bold text-orange-500 mb-4">🦊 BALKONFUCHS</div>
            <p className="text-gray-400 mb-4 leading-relaxed">Deutschlands führende Plattform für Balkon-Projekte. Über 850 zufriedene Kunden vertrauen uns.</p>
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
              <div className="flex items-center"><span className="text-orange-400 mr-2">🛡️</span><span>Geprüfte Partner</span></div>
              <div className="flex items-center"><span className="text-orange-400 mr-2">✅</span><span>DSGVO konform</span></div>
              <div className="flex items-center"><span className="text-orange-400 mr-2">⭐</span><span>4.8/5 Sterne</span></div>
                  <div className="flex space-x-4">
                    <a href="/impressum/" className="hover:text-orange-400 transition-colors">Impressum</a>
                    <a href="/datenschutz/" className="hover:text-orange-400 transition-colors">Datenschutz</a>
                    <a href="/agb/" className="hover:text-orange-400 transition-colors">AGB</a>
                    <a href="/disclaimer/" className="hover:text-orange-400 transition-colors">Disclaimer</a>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );


  // Check if form is complete
  const isFormComplete = () => {
    const wantsOffer = formData.projectStatus === 'seeking' || formData.projectStatus === 'approved';
    const phoneRequired = wantsOffer && (formData.contact.contactPreference === 'phone' || formData.contact.contactPreference === 'both');
    const addressRequired = wantsOffer; // Straße und Stadt bei Angebotsabsicht verpflichtend
    const phoneOk = phoneRequired ? !!formData.contact.phone : true;
    const addressOk = addressRequired ? (!!formData.contact.address && !!formData.contact.city && !!formData.contact.zipCode) : !!formData.contact.zipCode;
    return formData.contact.salutation &&
           formData.contact.firstName && 
           formData.contact.lastName && 
           formData.contact.email && 
           addressOk &&
           phoneOk &&
           formData.contact.privacy;
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log('handleSubmit called, isFormComplete:', isFormComplete());
    if (isFormComplete()) {
      try {
        // Calculate Planer-Score (neues System)
        const planerScoringData = mapFormDataToPlanerScoring();
        const planerScore = calculatePlanerScore(planerScoringData);

        // Calculate Legacy LeadScore (für Kompatibilität)
        const legacyLeadScore = LEAD_SCORING_FUNCTIONS.calculateScore('planer', {
          projektstatus: formData.projectStatus,
          erfahrung: formData.ownership === 'eigentuemer' ? 'keine' : 'wenig',
          zeitplan: formData.timeframe,
          budget: formData.budget
        });

        // Kombiniere beide Scoring-Systeme
        const leadScore = {
          ...legacyLeadScore,
          totalScore: planerScore.finalScore,
          category: planerScore.category.toLowerCase(),
          priority: planerScore.priority === 'high' ? 'P1' : 
                    planerScore.priority === 'medium' ? 'P2' : 'P3',
          planerScore: planerScore,
          block1Score: planerScore.block1Score,
          block2Score: planerScore.block2Score,
          block3Score: planerScore.block3Score,
          block4Score: planerScore.block4Score,
          completionBonus: planerScore.completionBonus,
          estimatedValue: planerScore.estimatedValue,
          responseTime: planerScore.responseTime,
          beratungsReadiness: planerScore.beratungsReadiness
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
            address: formData.contact.address,
            city: formData.contact.city,
            contactPreference: formData.contact.contactPreference,
            newsletter: formData.contact.newsletter,
            privacy: formData.contact.privacy
          },
          // Funnel-Informationen
          funnel: {
            type: 'planer',
            name: 'Balkonbau Planer'
          },
          // Funnel-spezifische Daten
          funnelData: {
            projectStatus: formData.projectStatus,
            timeframe: formData.timeframe,
            ownership: formData.ownership,
            balconyType: formData.balconyType,
            balconyCount: formData.balconyCount,
            wallMaterial: formData.wallMaterial,
            basement: formData.basement,
            floor: formData.floor,
            budget: formData.budget,
            size: formData.size,
            accessibility: formData.accessibility,
            balconyFloor: formData.balconyFloor,
            railing: formData.railing,
            surface: formData.surface,
            documents: formData.documents,
            additionalInfo: formData.additionalInfo,
            offerPreferences: formData.offerPreferences,
            zipCode: formData.contact.zipCode
          },
          // Metadaten
          timestamp: new Date().toISOString(),
          source: 'BalkonFuchs Planer',
          funnelType: 'Planer',
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
          // Planer-Scoring-Daten (neues System)
          _planerScoring: {
            block1Score: planerScore.block1Score,
            block2Score: planerScore.block2Score,
            block3Score: planerScore.block3Score,
            block4Score: planerScore.block4Score,
            baseScore: planerScore.baseScore,
            completionBonus: planerScore.completionBonus,
            finalScore: planerScore.finalScore,
            category: planerScore.category,
            action: planerScore.action,
            priority: planerScore.priority,
            responseTime: planerScore.responseTime,
            estimatedValue: planerScore.estimatedValue,
            beratungsReadiness: planerScore.beratungsReadiness,
            breakdown: planerScore.breakdown,
            isComplete: planerScore.isComplete,
            mappedData: planerScoringData // Für Debugging
          }
        };

        // Export to Zoho via API
        console.log('Exporting to Zoho:', exportData);
        
        try {
          const zohoResult = await fetch('/.netlify/functions/send-to-zoho', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exportData)
          });
          
          const zohoData = await zohoResult.json();
          
          if (zohoData.success) {
            console.log('Successfully exported to Zoho:', zohoData);
            // Store Zoho IDs for reference
            localStorage.setItem('zohoExport', JSON.stringify({
              deskTicketId: zohoData.deskTicket?.id,
              crmLeadId: zohoData.crmLead?.details?.id,
              timestamp: new Date().toISOString()
            }));
          } else {
            console.error('Zoho export failed:', zohoData.error);
          }
        } catch (error) {
          console.error('Error calling Zoho API:', error);
        }
        
        // Proceed to success page (Schritt 18)
        console.log('Setting currentStep to:', questions.length + 1);
        setCurrentStep(questions.length + 1);
        
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      console.log('Form not complete, missing:', {
        firstName: formData.contact.firstName,
        lastName: formData.contact.lastName,
        email: formData.contact.email,
        zipCode: formData.contact.zipCode,
        privacy: formData.contact.privacy
      });
    }
  };

  return (
    <>
      <Head>e i        <title>Balkon Planer Tool - Detaillierte Projektplanung für präzise Angebote | BALKONFUCHS</title>
        <meta name="description" content="Unser intelligenter Balkon-Planer führt Sie durch alle wichtigen Projektdetails für maßgeschneiderte Balkonlösungen. Geführte Abfrage zu allen Projektdetails für präzise Angebote." />
        <meta name="keywords" content="balkon planer detailliert, balkon projekt planen, balkonbau anforderungen, balkon angebot präzise, balkon planer tool, balkon projektplanung, balkon maßgeschneidert" />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Balkon Planer Tool - Detaillierte Projektplanung für präzise Angebote" />
        <meta property="og:description" content="Unser intelligenter Balkon-Planer führt Sie durch alle wichtigen Projektdetails für maßgeschneiderte Balkonlösungen." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/planer" />
        <link rel="canonical" href="https://balkonfuchs.de/planer" />
        <link rel="stylesheet" href="/styles/funnel-colors.css" />
        
        {/* Strukturierte Daten für SEO-KI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "BALKONFUCHS Balkon Planer",
              "description": "Intelligenter Planer für Balkon-Projekte mit Schritt-für-Schritt Anleitung",
              "url": "https://balkonfuchs.de/planer",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "featureList": [
                "Schritt-für-Schritt Projektplanung",
                "Expertenberatung",
                "Detaillierte Projektanalyse",
                "Zeitplan-Erstellung"
              ]
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
                  "name": "Wie funktioniert der Balkon Planer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Der Planer führt Sie durch 16 Schritte der Projektplanung: von der ersten Idee bis zur detaillierten Umsetzung. Sie erhalten Expertenberatung und einen strukturierten Projektplan."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Welche Informationen brauche ich für die Planung?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sie benötigen Grundinformationen zu Ihrem Projekt: Zeitrahmen, Budget, Balkontyp, Maße und Kontaktdaten. Der Planer führt Sie durch alle notwendigen Schritte."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Erhalte ich nach der Planung ein Angebot?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nach der Planung vermitteln wir Sie an passende Partner aus unserem Netzwerk, die Ihnen ein detailliertes Angebot erstellen."
                  }
                }
              ]
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-gray-900 funnel-planer">
        <Header />
      
      {/* SEO-optimierte Hero-Sektion im Funnel-Stil - Mobile Optimized */}
      <section id="funnel-start" className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl sm:rounded-2xl mx-2 sm:mx-4 lg:mx-8 mb-6 sm:mb-8">
        <div className="p-4 sm:p-6 lg:p-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            <span className="text-blue-400">Perfekte Balkon-Planung</span>
            <span className="text-white"> in 5 Minuten</span>
          </h1>
          <h2 className="text-lg sm:text-xl text-blue-400 mb-4 sm:mb-6">
            Detaillierte Projektplanung für präzise Angebote
          </h2>
          <h3 className="text-base sm:text-lg text-blue-400 mb-3 sm:mb-4 font-semibold">
            Balkon Planer Tool - Intelligente Projektplanung für maßgeschneiderte Balkonlösungen
          </h3>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto text-sm sm:text-base">
            Unser intelligenter <strong className="text-blue-400">Balkon-Planer</strong> führt Sie durch alle wichtigen Projektdetails. 
            Erhalten Sie <strong className="text-blue-400">maßgeschneiderte Lösungen</strong> von unseren Partnern.
          </p>
        </div>
      </section>

      {/* Progress Bar - Mobile Optimized */}
      <section className="bg-gray-800 border-b border-gray-700 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="h-3 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full progress-fill rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / (questions.length + 2)) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-300 whitespace-nowrap">
              {currentStep + 1}/{questions.length + 2}
            </div>
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs sm:text-sm text-gray-400">
              {currentStep < questions.length ? steps[currentStep]?.title : 'Kontaktdaten'}
            </span>
          </div>
        </div>
      </section>
      
      {/* Main Content - Mobile Optimized */}
      <main className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              {renderCurrentStep()}
            </div>
          </div>
          
          {/* Navigation - Mobile Optimized */}
          {currentStep < questions.length && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 sm:mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 sm:py-3 rounded-lg font-semibold transition-all text-base sm:text-sm ${
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
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 sm:py-3 rounded-lg font-semibold transition-all text-base sm:text-sm ${
                    canProceed()
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
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
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 sm:py-3 rounded-lg font-semibold transition-all text-base sm:text-sm ${
                    canProceed()
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Weiter zu Kontaktdaten
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : null}
            </div>
          )}

          {/* Submit Button für Kontaktformular - Mobile Optimized */}
          {currentStep === questions.length && (
            <div className="flex justify-center mt-6 sm:mt-8">
              <button
                onClick={handleSubmit}
                disabled={!isFormComplete()}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all text-base sm:text-sm ${
                  isFormComplete()
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Zusammenfassung ansehen
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
      
      <Footer />
      
        </div>
      </>
    );
  };

export default BalkonFuchsPlanerFunnel;
