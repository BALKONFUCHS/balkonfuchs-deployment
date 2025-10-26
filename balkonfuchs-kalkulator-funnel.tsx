import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { ArrowRight, ArrowLeft, Search, Home, MapPin, Ruler, Euro, CheckCircle, Star, Shield, Clock, Users, Phone, Mail, X, Play, ChevronDown, Menu, Building, TrendingUp, Award, Target, Zap, HeadphonesIcon, Rocket, FileText, Check, AlertTriangle, Calendar, User, CheckSquare, Calculator } from 'lucide-react';
import { LEAD_SCORING_FUNCTIONS } from './utils/balkon-lead-scoring';
import { calculateKalkulatorScore } from './utils/kalkulator-scoring';
import ZohoSalesIQ from './components/ZohoSalesIQ.js';
import Header from './components/Header';
import Footer from './components/Footer';



// Regionale Preisfaktoren importieren
const regionalFactors = {
    // METROPOLEN (>500.000 EW) - Überschreibt alle anderen Faktoren
    metropolen: {
        'münchen': { factor: 1.40, category: 'Metropole', bundesland: 'bayern' },
        'hamburg-stadt': { factor: 1.30, category: 'Metropole', bundesland: 'hamburg' },
        'stuttgart': { factor: 1.30, category: 'Metropole', bundesland: 'baden-württemberg' },
        'frankfurt': { factor: 1.30, category: 'Metropole', bundesland: 'hessen' },
        'düsseldorf': { factor: 1.18, category: 'Metropole', bundesland: 'nordrhein-westfalen' },
        'köln': { factor: 1.12, category: 'Metropole', bundesland: 'nordrhein-westfalen' },
        'berlin-stadt': { factor: 1.12, category: 'Metropole', bundesland: 'berlin' },
        'hannover': { factor: 1.05, category: 'Metropole', bundesland: 'niedersachsen' },
        'bremen-stadt': { factor: 0.95, category: 'Metropole', bundesland: 'bremen' },
        'leipzig': { factor: 0.88, category: 'Metropole Ost', bundesland: 'sachsen' },
        'dresden': { factor: 0.88, category: 'Metropole Ost', bundesland: 'sachsen' }
    },

    // STRUKTURSTARKE REGIONEN (innerhalb Bundesländer)
    strukturstark: {
        // Baden-Württemberg
        'karlsruhe': { factor: 1.25, category: 'Strukturstark', bundesland: 'baden-württemberg' },
        'freiburg': { factor: 1.25, category: 'Strukturstark', bundesland: 'baden-württemberg' },
        'heidelberg': { factor: 1.25, category: 'Strukturstark', bundesland: 'baden-württemberg' },
        'mannheim': { factor: 1.20, category: 'Strukturstark', bundesland: 'baden-württemberg' },
        'ulm': { factor: 1.20, category: 'Strukturstark', bundesland: 'baden-württemberg' },
        
        // Bayern
        'nürnberg': { factor: 1.35, category: 'Strukturstark', bundesland: 'bayern' },
        'augsburg': { factor: 1.30, category: 'Strukturstark', bundesland: 'bayern' },
        'würzburg': { factor: 1.25, category: 'Strukturstark', bundesland: 'bayern' },
        'regensburg': { factor: 1.25, category: 'Strukturstark', bundesland: 'bayern' },
        'ingolstadt': { factor: 1.30, category: 'Strukturstark', bundesland: 'bayern' },
        
        // Hessen
        'wiesbaden': { factor: 1.25, category: 'Strukturstark', bundesland: 'hessen' },
        'darmstadt': { factor: 1.25, category: 'Strukturstark', bundesland: 'hessen' },
        'offenbach': { factor: 1.20, category: 'Strukturstark', bundesland: 'hessen' },
        
        // NRW
        'bonn': { factor: 1.20, category: 'Strukturstark', bundesland: 'nordrhein-westfalen' },
        'münster': { factor: 1.12, category: 'Strukturstark', bundesland: 'nordrhein-westfalen' },
        'essen': { factor: 1.12, category: 'Strukturstark', bundesland: 'nordrhein-westfalen' },
        
        // Niedersachsen
        'wolfsburg': { factor: 1.05, category: 'Strukturstark', bundesland: 'niedersachsen' },
        'braunschweig': { factor: 1.03, category: 'Strukturstark', bundesland: 'niedersachsen' },
        'göttingen': { factor: 1.03, category: 'Strukturstark', bundesland: 'niedersachsen' }
    },

    // STRUKTURSCHWACHE REGIONEN
    strukturschwach: {
        // Ostdeutschland
        'chemnitz': { factor: 0.85, category: 'Strukturschwach', bundesland: 'sachsen' },
        'zwickau': { factor: 0.82, category: 'Strukturschwach', bundesland: 'sachsen' },
        'plauen': { factor: 0.82, category: 'Strukturschwach', bundesland: 'sachsen' },
        'cottbus': { factor: 0.80, category: 'Strukturschwach', bundesland: 'brandenburg' },
        'brandenburg-stadt': { factor: 0.78, category: 'Strukturschwach', bundesland: 'brandenburg' },
        'magdeburg': { factor: 0.80, category: 'Strukturschwach', bundesland: 'sachsen-anhalt' },
        'halle': { factor: 0.80, category: 'Strukturschwach', bundesland: 'sachsen-anhalt' },
        'erfurt': { factor: 0.82, category: 'Strukturschwach', bundesland: 'thüringen' },
        'jena': { factor: 0.85, category: 'Strukturschwach', bundesland: 'thüringen' },
        'rostock': { factor: 0.85, category: 'Strukturschwach', bundesland: 'mecklenburg-vorpommern' },
        'schwerin': { factor: 0.82, category: 'Strukturschwach', bundesland: 'mecklenburg-vorpommern' },
        
        // Westdeutschland strukturschwach
        'gelsenkirchen': { factor: 0.95, category: 'Strukturschwach', bundesland: 'nordrhein-westfalen' },
        'salzgitter': { factor: 0.97, category: 'Strukturschwach', bundesland: 'niedersachsen' },
        'wilhelmshaven': { factor: 0.95, category: 'Strukturschwach', bundesland: 'niedersachsen' }
    },

    // BUNDESLÄNDER-BASISFAKTOREN (wenn keine spezifischere Zuordnung)
    bundesländer: {
        'bayern': 1.30,
        'baden-württemberg': 1.25,
        'hamburg': 1.25,
        'hessen': 1.15,
        'nordrhein-westfalen': 1.08,
        'berlin': 1.12,
        'schleswig-holstein': 1.03,
        'niedersachsen': 1.00,
        'rheinland-pfalz': 0.97,
        'saarland': 0.95,
        'brandenburg': 0.80,
        'sachsen': 0.85,
        'sachsen-anhalt': 0.80,
        'thüringen': 0.82,
        'mecklenburg-vorpommern': 0.85,
        'bremen': 0.92
    }
};

// PLZ-basierte Zuordnung zu Regionen
const plzRegions = {
    // Metropolen
    '80000-85999': 'münchen',
    '20000-21999': 'hamburg-stadt',
    '10000-14999': 'berlin-stadt',
    '60000-60999': 'frankfurt',
    '70000-70999': 'stuttgart',
    '50000-51999': 'köln',
    '40000-40999': 'düsseldorf',
    '30000-30999': 'hannover',
    '28000-28999': 'bremen-stadt',
    '04000-04999': 'leipzig',
    '01000-01999': 'dresden',

    // Strukturstarke Regionen
    '76000-76999': 'karlsruhe',
    '79000-79999': 'freiburg',
    '69000-69999': 'heidelberg',
    '68000-68999': 'mannheim',
    '89000-89999': 'ulm',
    '90000-90999': 'nürnberg',
    '86000-86999': 'augsburg',
    '97000-97999': 'würzburg',
    '93000-93999': 'regensburg',
    '85000-85999': 'ingolstadt',
    '65000-65999': 'wiesbaden',
    '64000-64999': 'darmstadt',
    '63000-63999': 'offenbach',
    '53000-53999': 'bonn',
    '48000-48999': 'münster',
    '45000-45999': 'essen',
    '38000-38999': 'wolfsburg',
    '38100-38299': 'braunschweig',
    '37000-37999': 'göttingen',

    // Strukturschwache Regionen
    '09000-09999': 'chemnitz',
    '08000-08999': 'zwickau',
    '08500-08599': 'plauen',
    '03000-03999': 'cottbus',
    '14700-14799': 'brandenburg-stadt',
    '39000-39999': 'magdeburg',
    '06000-06999': 'halle',
    '99000-99999': 'erfurt',
    '07700-07999': 'jena',
    '18000-18999': 'rostock',
    '19000-19999': 'schwerin',
    '45800-45899': 'gelsenkirchen',
    '38200-38299': 'salzgitter',
    '26380-26389': 'wilhelmshaven'
};

// Bundesland basierend auf PLZ ermitteln
const plzToBundesland = {
    '01000-02999': 'sachsen',
    '03000-03999': 'brandenburg',
    '04000-04999': 'sachsen',
    '06000-06999': 'sachsen-anhalt',
    '07000-09999': 'thüringen',
    '10000-14999': 'berlin',
    '15000-16999': 'brandenburg',
    '17000-19999': 'mecklenburg-vorpommern',
    '20000-21999': 'hamburg',
    '22000-27999': 'schleswig-holstein',
    '28000-28999': 'bremen',
    '29000-31999': 'niedersachsen',
    '32000-33999': 'nordrhein-westfalen',
    '34000-36999': 'hessen',
    '37000-38999': 'niedersachsen',
    '39000-39999': 'sachsen-anhalt',
    '40000-48999': 'nordrhein-westfalen',
    '49000-49999': 'niedersachsen',
    '50000-53999': 'nordrhein-westfalen',
    '54000-56999': 'rheinland-pfalz',
    '57000-57999': 'nordrhein-westfalen',
    '58000-59999': 'nordrhein-westfalen',
    '60000-63999': 'hessen',
    '64000-65999': 'hessen',
    '66000-66999': 'saarland',
    '67000-67999': 'rheinland-pfalz',
    '68000-69999': 'baden-württemberg',
    '70000-76999': 'baden-württemberg',
    '77000-79999': 'baden-württemberg',
    '80000-87999': 'bayern',
    '88000-89999': 'baden-württemberg',
    '90000-96999': 'bayern',
    '97000-97999': 'bayern',
    '98000-99999': 'thüringen'
};

function getRegionFromPLZ(plz) {
    const plzNum = parseInt(plz);
    
    // Prüfe alle PLZ-Bereiche
    for (let range in plzRegions) {
        const [start, end] = range.split('-').map(p => parseInt(p));
        if (plzNum >= start && plzNum <= end) {
            return plzRegions[range];
        }
    }
    
    return null;
}

function getBundeslandFromPLZ(plz) {
    const plzNum = parseInt(plz);
    
    for (let range in plzToBundesland) {
        const [start, end] = range.split('-').map(p => parseInt(p));
        if (plzNum >= start && plzNum <= end) {
            return plzToBundesland[range];
        }
    }
    
    return 'niedersachsen'; // Fallback
}

function getRegionalAdjustment(plz) {
    const region = getRegionFromPLZ(plz);
    
    // 1. Priorität: Spezifische Metropole
    if (region && regionalFactors.metropolen[region]) {
        return {
            factor: regionalFactors.metropolen[region].factor,
            category: regionalFactors.metropolen[region].category,
            region: region,
            bundesland: regionalFactors.metropolen[region].bundesland
        };
    }
    
    // 2. Priorität: Strukturstarke Region
    if (region && regionalFactors.strukturstark[region]) {
        return {
            factor: regionalFactors.strukturstark[region].factor,
            category: regionalFactors.strukturstark[region].category,
            region: region,
            bundesland: regionalFactors.strukturstark[region].bundesland
        };
    }
    
    // 3. Priorität: Strukturschwache Region
    if (region && regionalFactors.strukturschwach[region]) {
        return {
            factor: regionalFactors.strukturschwach[region].factor,
            category: regionalFactors.strukturschwach[region].category,
            region: region,
            bundesland: regionalFactors.strukturschwach[region].bundesland
        };
    }
    
    // 4. Fallback: Bundesland-Basisfaktor
    const bundesland = getBundeslandFromPLZ(plz);
    return {
        factor: regionalFactors.bundesländer[bundesland] || 1.00,
        category: 'Bundesland',
        region: bundesland,
        bundesland: bundesland
    };
}

function adjustPrice(basePrice, plz) {
    const adjustment = getRegionalAdjustment(plz);
    const adjustedPrice = Math.round(basePrice * adjustment.factor);
    
    return {
        basePrice: basePrice,
        adjustedPrice: adjustedPrice,
        factor: adjustment.factor,
        category: adjustment.category,
        region: adjustment.region,
        bundesland: adjustment.bundesland,
        savings: adjustedPrice - basePrice
    };
}

const BalkonFuchsKalkulatorFunnel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Funktion zur Überprüfung der Formularvollständigkeit
  const isFormComplete = () => {
    return formData.contact.firstName !== '' && 
           formData.contact.lastName !== '' && 
           formData.contact.email !== '' &&
           formData.contact.plz !== '' &&
           formData.contact.plz.length === 5 &&
           formData.datenschutzConsent === true;
  };
  
  const [formData, setFormData] = useState({
    balconyType: '',
    balconyCount: 1,
    balconyWidth: '',
    balconyDepth: '',
    extras: [],
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      plz: '', // Neue Postleitzahl
      city: '' // Neue Stadt
    },
    // Checkbox-Zustände
    datenschutzConsent: false,
    newsletterConsent: false
  });

  // Mapping-Funktion für Kalkulator-Scoring
  const mapFormDataToKalkulatorScoring = () => {
    // Balkontyp-Mapping
    const balkontypMap = {
      'haengebalkon': 'haengebalkon',
      'anlehnbalkon': 'anlehnbalkon', 
      'vorstellbalkon': 'vorstellbalkon',
      'hochterrasse': 'hochterrasse'
    };

    // Balkongröße-Mapping basierend auf Fläche
    const getBalkongroesse = () => {
      const width = parseFloat(formData.balconyWidth) || 0;
      const depth = parseFloat(formData.balconyDepth) || 0;
      const area = width * depth;
      
      if (area > 18) return 'sehr_gross';
      if (area >= 12) return 'gross';
      if (area >= 6) return 'mittel';
      return 'klein';
    };

    // Anzahl & Etagen-Mapping
    const getAnzahlEtagen = () => {
      const count = formData.balconyCount || 1;
      if (count > 2) return 'mehrere_separate';
      if (count >= 2) return '2_plus';
      return '1_eg'; // Standardmäßig Erdgeschoss
    };

    // Zusatzleistungen-Mapping
    const zusatzleistungenMap = {
      'balkontuer': 'balkontuer',
      'treppe': 'treppe',
      'genehmigung': 'genehmigung',
      'komplettservice': 'komplettservice'
    };

    const mappedExtras = formData.extras
      .map(extra => zusatzleistungenMap[extra])
      .filter(Boolean);

    return {
      balkontyp: balkontypMap[formData.balconyType] || 'hochterrasse',
      balkongroesse: getBalkongroesse(),
      anzahl_etagen: getAnzahlEtagen(),
      zusatzleistungen: mappedExtras,
      newsletter: 'ja' // Standardmäßig ja, da sie den Kalkulator nutzen
    };
  };

  const steps = [
    'Balkontyp',
    'Anzahl & Größe',
    'Zusatzausstattung',
    'Postleitzahl', // Neuer Schritt
    'Kontaktdaten',
    'Vielen Dank!'
  ];

  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 0: return formData.balconyType !== '';
      case 1: return formData.balconyCount > 0 && formData.balconyWidth !== '' && formData.balconyDepth !== '';
      case 2: return formData.extras.length > 0;
      case 3: return formData.contact.plz !== '' && formData.contact.plz.length === 5; // Neue Validierung
      case 4: return formData.contact.firstName !== '' && formData.contact.lastName !== '' && formData.contact.email !== '';
      case 5: return true; // Dankeschön-Seite ist immer gültig
      default: return false;
    }
  }, [currentStep, formData]);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1 && isStepValid) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsLoading(false);
      }, 300);
    }
  }, [currentStep, steps.length, isStepValid]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  // Auto-advance für alle Schritte außer Zusatzausstattung und Postleitzahl
  useEffect(() => {
    if (currentStep < 2 && isStepValid) {
      const timer = setTimeout(() => {
        nextStep();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isStepValid, nextStep]);

  // Questions for each step
  const questions = [
    {
      type: 'balcony_type',
      title: 'Welchen Balkontyp möchten Sie?',
      subtitle: '🏗️ Wählen Sie den passenden Balkontyp für Ihr Gebäude',
      options: [
        { id: 'hanging', title: 'Hängebalkon', subtitle: 'Wird an der Fassade aufgehängt', icon: '🏗️', price: 0 },
        { id: 'standing', title: 'Vorstellbalkon', subtitle: 'Steht auf eigenen Stützen', icon: '🏢', price: 0 },
        { id: 'leaning', title: 'Anlehnbalkon', subtitle: 'Lehnt an der Fassade an', icon: '🏠', price: 0 },
        { id: 'terrace', title: 'Hochterrasse', subtitle: 'Auf dem Dach oder Balkon', icon: '🏡', price: 0 }
      ]
    },
    {
      type: 'size_input',
      title: 'Geben Sie die Maße ein',
      subtitle: '📏 Wählen Sie die gewünschte Größe für Ihren Balkon'
    },
    {
      type: 'extras',
      title: 'Welche Zusatzausstattung wünschst du?',
      subtitle: '✨ Diese Details machen deinen Balkon besonders!',
      options: [
        { id: 'standard_gelaender', title: 'Standard-Geländer (Stahl)', subtitle: 'Pulverbeschichtet, langlebig', icon: '🛡️', price: 400 },
        { id: 'premium_gelaender', title: 'Premium-Geländer (Edelstahl/Glas)', subtitle: 'Hochwertige Optik (+1.000-2.000€)', icon: '✨', price: 1500 },
        { id: 'ueberdachung', title: 'Überdachung', subtitle: 'Schutz vor Witterung (+2.000-4.000€)', icon: '🏠', price: 3000 },
        { id: 'seitenschutz', title: 'Seitenschutz/Windschutz', subtitle: 'Zusätzliche Privatsphäre (+500-1.200€)', icon: '🚪', price: 800 },

        { id: 'bodenbelag', title: 'Premium-Bodenbelag', subtitle: 'Hochwertiger Belag (+800-2.000€)', icon: '🏗️', price: 1200 }
      ]
    }
  ];

  const handleAnswerSelect = (field, value) => {
    if (field === 'extras') {
      setFormData(prev => ({
        ...prev,
        extras: prev.extras.includes(value) 
          ? prev.extras.filter(item => item !== value)
          : [...prev.extras, value]
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  // Render functions for each step type
  const renderOptionsStep = (question) => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">{question.title}</h2>
        <p className="text-lg text-orange-400 bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
          {question.subtitle}
        </p>
      </div>

      <div className="grid gap-4">
        {question.options.map((option) => (
          <button
            key={option.id}
            className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
              formData[question.type === 'balcony_type' ? 'balconyType' : 
              question.type === 'floors' ? 'floor' : 
              question.type === 'wall_material' ? 'wallMaterial' : 
              question.type === 'railing_type' ? 'railingType' : 'extras'] === option.id
                ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                : 'border-gray-700 bg-gray-800/50 hover:border-green-500/50'
            }`}
            onClick={() => handleAnswerSelect(
              question.type === 'balcony_type' ? 'balconyType' : 
              question.type === 'floors' ? 'floor' : 
              question.type === 'wall_material' ? 'wallMaterial' : 
              question.type === 'railing_type' ? 'railingType' : 'extras', 
              option.id
            )}
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{option.icon}</div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-semibold text-white">{option.title}</h3>
                <p className="text-gray-400 mt-1">{option.subtitle}</p>
              </div>
              {formData[
                question.type === 'balcony_type' ? 'balconyType' : 
                question.type === 'floors' ? 'floor' : 
                question.type === 'wall_material' ? 'wallMaterial' : 
                question.type === 'railing_type' ? 'railingType' : 'extras'
              ] === option.id && (
                <Check className="w-6 h-6 text-orange-500" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderSizeInput = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Geben Sie die Maße ein</h2>
        <p className="text-lg text-orange-400 bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
          📏 Wählen Sie die gewünschte Größe für Ihren Balkon
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Anzahl der Balkone:
          </label>
          <select
            value={formData.balconyCount}
            onChange={(e) => handleInputChange('balconyCount', parseInt(e.target.value))}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value={1}>1 Balkon</option>
            <option value={2}>2 Balkone</option>
            <option value={3}>3 Balkone</option>
            <option value={4}>4 Balkone</option>
            <option value={5}>5+ Balkone</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Breite (in Metern):
          </label>
          <input
            type="number"
            step="0.1"
            min="1"
            max="10"
            value={formData.balconyWidth}
            onChange={(e) => handleInputChange('balconyWidth', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="z.B. 3.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Tiefe (in Metern):
          </label>
          <input
            type="number"
            step="0.1"
            min="0.8"
            max="3"
            value={formData.balconyDepth}
            onChange={(e) => handleInputChange('balconyDepth', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="z.B. 1.2"
          />
        </div>
      </div>
    </div>
  );

  const renderPostalCodeStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Ihre Postleitzahl</h2>
        <p className="text-lg text-orange-400 bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
          📍 Für regionale Preisanpassung und Partnervermittlung
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Postleitzahl:
          </label>
          <input
            type="text"
            maxLength={5}
            value={formData.contact.plz}
            onChange={(e) => handleContactChange('plz', e.target.value.replace(/\D/g, ''))}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-2xl font-mono"
            placeholder="12345"
          />
          <p className="text-sm text-gray-400 mt-2 text-center">
            Die PLZ wird für regionale Preisanpassung verwendet
          </p>
        </div>

        {formData.contact.plz && formData.contact.plz.length === 5 && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="text-center">
              <div className="text-blue-400 font-semibold mb-2">
                Regionale Zuordnung
              </div>
              {(() => {
                const adjustment = getRegionalAdjustment(formData.contact.plz.toString());
                return (
                  <div className="text-sm text-blue-300 space-y-1">
                    <div>Kategorie: {adjustment.category}</div>
                    <div>Region: {adjustment.region}</div>
                    <div>Bundesland: {adjustment.bundesland}</div>
                    <div className="text-blue-400 font-medium">
                      Preisfaktor: {adjustment.factor.toFixed(2)}x
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );


  const renderExtrasStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Welche Zusatzausstattung wünschst du?</h2>
        <p className="text-lg text-orange-400 bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
          ✨ Diese Details machen deinen Balkon besonders!
        </p>
      </div>

      <div className="grid gap-4">
        {questions[2].options.map((option) => (
          <button
            key={option.id}
            className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
              formData.extras.includes(option.id)
                ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                : 'border-gray-700 bg-gray-800/50 hover:border-green-500/50'
            }`}
            onClick={() => handleAnswerSelect('extras', option.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{option.icon}</div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-semibold text-white">{option.title}</h3>
                <p className="text-gray-400 mt-1">{option.subtitle}</p>
                <div className="text-orange-400 font-semibold mt-2">
                  +{option.price}€
                </div>
              </div>
              {formData.extras.includes(option.id) && (
                <Check className="w-6 h-6 text-orange-500" />
              )}
            </div>
          </button>
        ))}
      </div>

      {formData.extras.length > 0 && (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
          <div className="text-center">
            <div className="text-orange-400 font-semibold mb-2">
              Ausgewählte Zusatzleistungen
            </div>
            <div className="text-sm text-orange-300">
              Gesamtpreis Zusatzleistungen: {formData.extras.reduce((sum, extraId) => {
                const extra = questions[2].options.find(opt => opt.id === extraId);
                return sum + (extra ? extra.price : 0);
              }, 0)}€
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderThankYouStep = () => {
    return (
      <div className="space-y-6 text-center">
        <div className="space-y-4">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-white">Vielen Dank für Ihre Anfrage!</h2>
          <p className="text-lg text-orange-400 bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
            ✅ Ihr Balkon-Projekt wurde erfolgreich eingereicht
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-white mb-4">Was passiert als nächstes?</h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
              <span>Wir prüfen Ihre Anfrage und finden passende Partner</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
              <span>Innerhalb von 24-72 Stunden erhalten Sie eine Rückmeldung von uns</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
              <span>Wir vermitteln Ihnen passende Partner für Ihr Projekt</span>
            </div>
          </div>
        </div>

        {/* Intelligente Cross-Verlinkungen */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Was möchten Sie als nächstes tun?</h3>
          <p className="text-gray-400">Wir haben diese nächsten Schritte für Sie zusammengestellt:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Baugenehmigung prüfen */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">🏗️ Baugenehmigung prüfen</h4>
              <p className="text-gray-400 mb-4">
                Finden Sie heraus, ob Sie eine Genehmigung für Ihren Balkon benötigen
              </p>
              <a href="/genehmigung" className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all w-full text-center">
                Jetzt prüfen →
              </a>
            </div>
            
            {/* Express-Angebot anfordern */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">📋 Express-Angebot anfordern</h4>
              <p className="text-gray-400 mb-4">
                Erhalten Sie Ihr individuelles Angebot in nur 24 Stunden
              </p>
              <a href="/express-angebot" className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all w-full text-center">
                Angebot anfordern →
              </a>
            </div>
            
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
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-300">
            Haben Sie Fragen? Kontaktieren Sie uns gerne unter{' '}
            <a href="mailto:info@balkonfuchs.de" className="text-orange-400 hover:text-orange-300 underline">
              info@balkonfuchs.de
            </a>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Zurück zur Startseite
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderContactForm = () => {
    // Berechnung mit regionalen Faktoren
    const basePrice = calculateBasePrice();
    const regionalAdjustment = formData.contact.plz ? adjustPrice(basePrice, formData.contact.plz.toString()) : null;
    const finalPrice = regionalAdjustment ? regionalAdjustment.adjustedPrice : basePrice;

    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">Kontaktdaten & Preisberechnung</h2>
          <p className="text-lg text-orange-400 bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
            💰 Hier sehen Sie Ihre personalisierte Preisberechnung
          </p>
        </div>


        {/* Preisberechnung */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Ihre Preisberechnung</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Balkontyp:</span>
              <span className="text-white">{formData.balconyType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Anzahl:</span>
              <span className="text-white">{formData.balconyCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Maße:</span>
              <span className="text-white">{formData.balconyWidth}m × {formData.balconyDepth}m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Zusatzleistungen:</span>
              <span className="text-white">{formData.extras.map(id => questions[2].options.find(opt => opt.id === id)?.title).join(', ')}</span>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-4 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Basispreis:</span>
                <span className="text-white">{basePrice.toLocaleString()}€</span>
              </div>
              
              {regionalAdjustment && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Regionale Anpassung:</span>
                    <span className="text-white">{regionalAdjustment.category} ({regionalAdjustment.factor.toFixed(2)}x)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Region:</span>
                    <span className="text-white">{regionalAdjustment.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bundesland:</span>
                    <span className="text-white">{regionalAdjustment.bundesland}</span>
                  </div>
                </>
              )}

              <div className="flex justify-between text-lg font-semibold">
                <span className="text-orange-400">Gesamtpreis:</span>
                <span className="text-orange-400">{finalPrice.toLocaleString()}€</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kontaktformular */}
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Vorname *</label>
              <input
                type="text"
                value={formData.contact.firstName}
                onChange={(e) => handleContactChange('firstName', e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nachname *</label>
              <input
                type="text"
                value={formData.contact.lastName}
                onChange={(e) => handleContactChange('lastName', e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">E-Mail *</label>
            <input
              type="email"
              value={formData.contact.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Telefon</label>
            <input
              type="tel"
              value={formData.contact.phone}
              onChange={(e) => handleContactChange('phone', e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Datenschutz und Newsletter */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="datenschutz"
                checked={formData.datenschutzConsent}
                onChange={(e) => handleCheckboxChange('datenschutzConsent', e.target.checked)}
                className="w-6 h-6 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
                required
              />
              <label htmlFor="datenschutz" className="text-sm text-gray-300">
                Ich habe die <a href="/datenschutz" className="text-orange-400 hover:text-orange-300 underline">Datenschutzerklärung</a> und die Informationen zum <a href="/disclaimer" className="text-orange-400 hover:text-orange-300 underline">Haftungsausschluss</a> gelesen und zur Kenntnis genommen. *
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="newsletter"
                checked={formData.newsletterConsent}
                onChange={(e) => handleCheckboxChange('newsletterConsent', e.target.checked)}
                className="w-6 h-6 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-300">
                Ich möchte den kostenlosen <span className="text-orange-400 font-medium">Balkonbrief</span> erhalten und über aktuelle Angebote und Tipps informiert werden.
              </label>
            </div>
          </div>

          <div className="text-center">
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
              disabled={!isFormComplete() || isSubmitting}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg ${
                isFormComplete() && !isSubmitting
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
                  Wird gesendet...
                </>
              ) : (
                'Kostenloses Angebot anfordern'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const calculateBasePrice = () => {
    let basePrice = 0;
    
    
    // Basispreis pro m²
    const area = formData.balconyCount * parseFloat(formData.balconyWidth || '0') * parseFloat(formData.balconyDepth || '0');
    basePrice += area * 1500; // 1500€ pro m²
    
    // Zusatzleistungen
    formData.extras.forEach(extraId => {
      const extra = questions[2].options.find(opt => opt.id === extraId);
      if (extra) {
        basePrice += extra.price;
      }
    });
    
    return Math.round(basePrice);
  };

  const handleSubmit = async () => {
    if (!isFormComplete()) {
      setSubmitError('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Show loading state
      setIsLoading(true);
      
      // Calculate Kalkulator-Score (neues System)
      const kalkulatorScoringData = mapFormDataToKalkulatorScoring();
      const kalkulatorScore = calculateKalkulatorScore(kalkulatorScoringData);

      // Calculate Legacy LeadScore (für Kompatibilität)
      const legacyLeadScore = LEAD_SCORING_FUNCTIONS.calculateScore('calculator', {
        balkontyp: formData.balconyType,
        balkongroesse: `${formData.balconyWidth}x${formData.balconyDepth}`,
        extras: formData.extras,
        zeitplan: 'not-specified'
      });

      // Kombiniere beide Scoring-Systeme
      const leadScore = {
        ...legacyLeadScore,
        totalScore: kalkulatorScore.finalScore,
        category: kalkulatorScore.category.toLowerCase(),
        priority: kalkulatorScore.priority === 'medium' ? 'P2' : 'P3',
        kalkulatorScore: kalkulatorScore,
        baseScore: kalkulatorScore.baseScore,
        completionBonus: kalkulatorScore.completionBonus,
        estimatedValue: kalkulatorScore.estimatedValue,
        nurturingSequence: kalkulatorScore.nurturingSequence
      };

      // Berechnung der Preise für die Übertragung
      const basePrice = calculateBasePrice();
      const regionalAdjustment = formData.contact.plz ? adjustPrice(basePrice, formData.contact.plz.toString()) : null;
      const finalPrice = regionalAdjustment ? regionalAdjustment.adjustedPrice : basePrice;

      // Prepare data for Zoho export
      const exportData = {
        // Kontaktdaten
        contact: {
          firstName: formData.contact.firstName,
          lastName: formData.contact.lastName,
          email: formData.contact.email,
          phone: formData.contact.phone,
          plz: formData.contact.plz,
          city: formData.contact.city
        },
        // Funnel-Informationen
        funnel: {
          type: 'kalkulator',
          name: 'Balkonbau Kalkulator'
        },
        // Funnel-spezifische Daten
        funnelData: {
          balconyType: formData.balconyType,
          balconyCount: formData.balconyCount,
          balconyWidth: formData.balconyWidth,
          balconyDepth: formData.balconyDepth,
          extras: formData.extras,
          plz: formData.contact.plz,
          city: formData.contact.city,
          // Checkbox-Zustände
          datenschutzConsent: formData.datenschutzConsent,
          newsletterConsent: formData.newsletterConsent
        },
        // Metadaten
        timestamp: new Date().toISOString(),
        source: 'BALKONFUCHS Kalkulator',
        funnelType: 'Kalkulator',
        calculation: basePrice,
        // Vollständige Preisberechnung
        priceCalculation: {
          basePrice: basePrice,
          regionalFactor: regionalAdjustment ? regionalAdjustment.factor : 1.0,
          regionalCategory: regionalAdjustment ? regionalAdjustment.category : 'Standard',
          regionalRegion: regionalAdjustment ? regionalAdjustment.region : 'Nicht verfügbar',
          regionalBundesland: regionalAdjustment ? regionalAdjustment.bundesland : 'Nicht verfügbar',
          finalPrice: finalPrice,
          savings: regionalAdjustment ? regionalAdjustment.savings : 0
        },
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
        // Kalkulator-Scoring-Daten (neues System)
        _kalkulatorScoring: {
          baseScore: kalkulatorScore.baseScore,
          completionBonus: kalkulatorScore.completionBonus,
          finalScore: kalkulatorScore.finalScore,
          category: kalkulatorScore.category,
          action: kalkulatorScore.action,
          nurturingSequence: kalkulatorScore.nurturingSequence,
          priority: kalkulatorScore.priority,
          estimatedValue: kalkulatorScore.estimatedValue,
          breakdown: kalkulatorScore.breakdown,
          nurturingDetails: kalkulatorScore.nurturingDetails,
          isComplete: kalkulatorScore.isComplete,
          mappedData: kalkulatorScoringData // Für Debugging
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
            kalkulatorScoring: exportData._kalkulatorScoring,
            zohoResults: zohoResults,
            funnelType: 'kalkulator'
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

      // 3. Success - proceed to thank you page
      setCurrentStep(5);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Es gab ein Problem beim Senden. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  const renderCurrentStep = () => {
    if (currentStep === 0) {
      return renderOptionsStep(questions[0]);
    } else if (currentStep === 1) {
      return renderSizeInput();
    } else if (currentStep === 2) {
      return renderExtrasStep();
    } else if (currentStep === 3) {
      return renderPostalCodeStep();
    } else if (currentStep === 4) {
      return renderContactForm();
    } else if (currentStep === 5) {
      return renderThankYouStep();
    }
    return null;
  };


  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-950 border-t border-gray-800 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold mb-4 text-orange-500">🦊 BALKONFUCHS</div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Deutschlands führende Plattform für Balkon-Projekte. Über 850 zufriedene Kunden vertrauen uns.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:office@balkonfuchs.de" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
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
              <li><a href="/ueber-uns/" className="text-gray-400 hover:text-orange-400 transition-colors">Über uns</a></li>
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


  return (
    <div className="min-h-screen bg-gray-900 funnel-kalkulator">
      <Head>
        {/* Primary Meta Tags */}
        <title>Balkon Kalkulator - Kostenlos & sofort | BalkonFuchs</title>
        <meta name="title" content="Balkon Kalkulator - Kostenlos & sofort | BalkonFuchs" />
        <meta name="description" content="Balkon Kalkulator: Berechnen Sie kostenlos und sofort die Kosten für Ihren Balkon. Vorstellbalkon, Anlehnbalkon oder Hängebalkon - in 2 Minuten zur ersten Kostenschätzung. Regional angepasste Preise für ganz Deutschland." />
        <meta name="keywords" content="Balkon kalkulator, Balkon preise, Balkon kosten, Balkon kalkulation, Vorstellbalkon preis, Anlehnbalkon kosten, Hängebalkon preise, Balkonbau kalkulator, Balkon preisrechner" />
        <meta name="author" content="BalkonFuchs GmbH" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="de" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://balkonfuchs.de/kalkulator" />
        <link rel="stylesheet" href="/styles/funnel-colors.css" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/kalkulator" />
        <meta property="og:title" content="Balkon Kalkulator - Kostenlos & sofort | BalkonFuchs" />
        <meta property="og:description" content="Balkon Kalkulator: Berechnen Sie kostenlos und sofort die Kosten für Ihren Balkon. In 2 Minuten zur ersten Kostenschätzung." />
        <meta property="og:image" content="https://balkonfuchs.de/images/balkonfuchs-logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="BalkonFuchs Kalkulator - Balkon Kosten berechnen" />
        <meta property="og:site_name" content="BalkonFuchs" />
        <meta property="og:locale" content="de_DE" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://balkonfuchs.de/kalkulator" />
        <meta property="twitter:title" content="Balkon Kalkulator - Kostenlos & sofort" />
        <meta property="twitter:description" content="Balkon Kalkulator: Berechnen Sie kostenlos und sofort die Kosten für Ihren Balkon. In 2 Minuten zur ersten Kostenschätzung." />
        <meta property="twitter:image" content="https://balkonfuchs.de/images/balkonfuchs-logo.png" />
        <meta property="twitter:image:alt" content="BalkonFuchs Kalkulator - Balkon Kosten berechnen" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#f97316" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="apple-mobile-web-app-title" content="BalkonFuchs Kalkulator" />
        <meta name="application-name" content="BalkonFuchs Kalkulator" />
        
        {/* Calculator Tool Schema.org Markup */}
        <script type="application/ld+json">
        {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "BalkonFuchs Kalkulator",
            "description": "Kostenloser Online-Kalkulator für Balkon-Projekte mit regional angepassten Preisen",
            "url": "https://balkonfuchs.de/kalkulator",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
                "description": "Kostenloser Balkon-Kalkulator"
            },
            "featureList": [
                "Sofortige Kostenberechnung",
                "Regionale Preisanpassung",
                "Verschiedene Balkontypen",
                "Zusatzleistungen kalkulieren",
                "Kostenlose Beratung"
            ],
            "screenshot": "https://balkonfuchs.de/images/kalkulator-screenshot.png",
            "softwareVersion": "2.0",
            "author": {
                "@type": "Organization",
                "name": "BalkonFuchs GmbH"
            }
        })}
        </script>
        
        {/* Service Schema.org Markup */}
        <script type="application/ld+json">
        {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Balkon Kostenberechnung",
            "description": "Professionelle Kostenberechnung für Balkon-Projekte mit regional angepassten Preisen",
            "provider": {
                "@type": "Organization",
                "name": "BalkonFuchs GmbH"
            },
            "serviceType": "Balkon-Kalkulation",
            "areaServed": {
                "@type": "Country",
                "name": "Deutschland"
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Balkon-Kalkulationsservices",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Vorstellbalkon Kalkulation",
                            "description": "Kostenberechnung für Vorstellbalkone"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Anlehnbalkon Kalkulation",
                            "description": "Kostenberechnung für Anlehnbalkone"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Hängebalkon Kalkulation",
                            "description": "Kostenberechnung für Hängebalkone"
                        }
                    }
                ]
            }
        })}
        </script>
      </Head>
      
      <Header />
      
      {/* SEO Content Section */}
      <section id="funnel-start" className="bg-gray-800 border-b border-gray-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-orange-400">Balkon-Kosten berechnen</span>
            <span className="text-white"> in 3 Minuten</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
            Sofortige Kostenschätzung für Ihren Balkonanbau 2026
          </h2>
          <h3 className="text-lg text-orange-400 mb-4 font-semibold">
            Balkon Kosten Rechner 2026 - Präzise Kalkulation für alle Balkontypen und Materialien
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            <span className="text-orange-400 font-semibold">Was kostet ein Balkon?</span> Unser intelligenter <span className="text-orange-400 font-semibold">Balkon-Kalkulator</span> analysiert über 
            <span className="text-orange-400 font-semibold"> 40 Kostenfaktoren</span> und erstellt Ihnen eine <span className="text-orange-400 font-semibold">präzise Kostenschätzung</span>. 
            Perfekt für die erste <span className="text-orange-400 font-semibold">Budgetplanung</span>!
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
              {isLoading ? 'Bitte warten Sie einen Moment' : steps[currentStep]}
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
          {currentStep < steps.length - 1 && currentStep !== 5 && (
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
                disabled={!isStepValid || isLoading}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  isStepValid && !isLoading
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
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
      
      {/* ZOHO Sales IQ Widget */}
      <ZohoSalesIQ />
    </div>
  );
};

export default BalkonFuchsKalkulatorFunnel; 
