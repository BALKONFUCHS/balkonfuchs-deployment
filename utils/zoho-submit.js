/**
 * ZOHO SUBMIT UTILITY
 * 
 * Hilfsfunktion für das Senden von Funnel-Daten an Zoho
 */

export const submitToZoho = async (funnelData, funnelType = 'gewerbe') => {
  try {
    console.log(`Sending ${funnelType} data to Zoho:`, funnelData);

    const { pdfAttachment, ...restData } = funnelData || {};

    const payload = {
      funnelData: {
        ...restData,
        funnel: {
          type: funnelType,
          name: getFunnelName(funnelType)
        },
        timestamp: new Date().toISOString(),
        source: 'website'
      },
      pdfAttachment
    };

    const response = await fetch('/.netlify/functions/submit-to-zoho', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `HTTP ${response.status}`);
    }

    console.log('Zoho submission successful:', result);
    return result;

  } catch (error) {
    console.error('Zoho submission failed:', error);
    throw error;
  }
};

const getFunnelName = (funnelType) => {
  const names = {
    'gewerbe': 'Gewerbeprojekte Funnel',
    'kalkulator': 'Balkon-Kalkulator',
    'planer': 'Balkon-Planer',
    'express-angebot': 'Express-Angebot',
    'genehmigung': 'Genehmigungscheck',
    'bauzeit-planung': 'Bauzeit-Planer',
    'partner-werden': 'Partner werden',
    'partner': 'Partner-Bewerbung'
  };
  
  return names[funnelType] || `${funnelType} Funnel`;
};

/**
 * Formatiert Gewerbe-Funnel-Daten für Zoho
 */
export const formatGewerbeData = (formData) => {
  const anzahlBalkone = formData.anzahlBalkone || formData.anzahlEinheiten || '';

  return {
    // Funnel-Metadaten
    funnelType: 'gewerbe',
    
    // Kontaktdaten
    contact: {
      salutation: formData.ansprechpartner ? 'herr' : 'herr', // Fallback
      firstName: formData.ansprechpartner?.split(' ')[0] || '',
      lastName: formData.ansprechpartner?.split(' ').slice(1).join(' ') || '',
      email: formData.email,
      phone: formData.telefon,
      zipCode: formData.plz,
      city: formData.ort,
      address: formData.strasse,
      newsletter: !!formData.balkonbrief,
      privacy: formData.datenschutz,
      agb: formData.balkonbrief,
      disclaimer: formData.haftungsausschluss
    },

    // Projekt-Details
    funnelData: {
      // Schritt 1: Projektart
      projekttyp: formData.projekttyp,
      
      // Schritt 2: Projektdetails
      projektname: formData.projektname,
      projektort: formData.projektort,
      projektadresse: formData.projektadresse,
      anzahlBalkone,
      anzahlEinheiten: anzahlBalkone, // Legacy alias für ältere Integrationen
      balkontyp: formData.balkontyp,
      
      // Schritt 3: Zeitrahmen & Budget
      zeitrahmen: formData.zeitrahmen,
      budgetrahmen: formData.budgetrahmen,
      budgetFreitext: formData.budgetFreitext,
      startMonat: formData.startMonat,
      startJahr: formData.startJahr,
      endMonat: formData.endMonat,
      endJahr: formData.endJahr,
      
      // Schritt 4: Unternehmensdaten
      firmenname: formData.firmenname,
      ansprechpartner: formData.ansprechpartner,
      position: formData.position,
      projektleiter: formData.projektleiter,
      
      // Schritt 5: Zusätzliche Informationen
      nachricht: formData.nachricht
    },

    // Unternehmensdaten
    company: {
      name: formData.firmenname,
      legalForm: 'GmbH', // Fallback
      employeeCount: '1-10', // Fallback
      website: '',
      address: formData.strasse,
      zipCode: formData.plz,
      city: formData.ort
    },

    // Erweiterte Unternehmensdaten
    extendedCompany: {
      ansprechpartner: formData.ansprechpartner,
      position: formData.position,
      projektleiter: formData.projektleiter
    },

    // Lead-Scoring (dynamisch basierend auf Eingaben)
    leadScore: (() => {
      const totalScore = calculateGewerbeScore(formData);
      
      // Kategorie basierend auf Score
      let category = 'cold';
      if (totalScore >= 70) category = 'hot';
      else if (totalScore >= 40) category = 'warm';
      else category = 'cold';
      
      // Priorität basierend auf Score
      let priority = 'P3';
      if (totalScore >= 70) priority = 'P1';
      else if (totalScore >= 40) priority = 'P2';
      else priority = 'P3';
      
      // Urgency basierend auf Zeitrahmen
      let urgency = 'low';
      if (formData.zeitrahmen === 'sofort') urgency = 'high';
      else if (formData.zeitrahmen === '3monate') urgency = 'high';
      else if (formData.zeitrahmen === '6monate') urgency = 'medium';
      else urgency = 'low';
      
      // Timeline basierend auf Zeitrahmen
      let timeline = 'flexible';
      if (formData.zeitrahmen === 'sofort') timeline = 'urgent';
      else if (formData.zeitrahmen === '3monate') timeline = 'urgent';
      else if (formData.zeitrahmen === '6monate') timeline = 'medium';
      else timeline = 'flexible';
      
      // Budget-Level basierend auf Budgetrahmen
      let budget = 'low';
      const budgetValue = formData.budgetrahmen || '';
      if (budgetValue.includes('> 1 Mio.') || budgetValue.includes('500.000 - 1 Mio.')) {
        budget = 'very-high';
      } else if (budgetValue.includes('300.000 - 500.000') || budgetValue.includes('200.000 - 300.000')) {
        budget = 'high';
      } else if (budgetValue.includes('150.000 - 200.000') || budgetValue.includes('100.000 - 150.000')) {
        budget = 'medium';
      } else if (budgetValue.includes('50.000 - 100.000') || budgetValue.includes('< 50.000')) {
        budget = 'low';
      } else if (budgetValue === 'Steht noch nicht fest') {
        budget = 'unknown';
      }
      
      // Complexity basierend auf Anzahl Einheiten und Balkontypen
      let complexity = 'low';
      const einheiten = formData.anzahlBalkone || formData.anzahlEinheiten || '';
      const balkontypCount = Array.isArray(formData.balkontyp) ? formData.balkontyp.length : 0;
      if (einheiten.includes('500+') || einheiten.includes('201-500')) {
        complexity = 'very-high';
      } else if (einheiten.includes('101-200') || einheiten.includes('51-100') || balkontypCount >= 3) {
        complexity = 'high';
      } else if (einheiten.includes('26-50') || balkontypCount === 2) {
        complexity = 'medium';
      } else {
        complexity = 'low';
      }
      
      // Follow-Up Hours basierend auf Score und Dringlichkeit
      let followUpHours = 48; // Standard
      if (totalScore >= 70 || urgency === 'high') followUpHours = 6;
      else if (totalScore >= 40 || urgency === 'medium') followUpHours = 12;
      else followUpHours = 24;
      
      return {
        totalScore,
        category,
        priority,
        urgency,
        complexity,
        budget,
        timeline,
        followUpHours
      };
    })(),

    // Geschätzter Wert
    estimatedPrice: estimateGewerbeValue(formData)
  };
};

/**
 * Berechnet einen dynamischen Score für Gewerbeprojekte basierend auf allen Eingaben
 */
const calculateGewerbeScore = (formData) => {
  let score = 0; // Start bei 0, nicht 50!

  // 1. Projekttyp-Bonus (0-30 Punkte)
  const projekttypScores = {
    'neubau': 25,           // Neubau = hohe Priorität
    'sanierung': 20,        // Sanierung = gute Priorität
    'wohnbaugesellschaft': 30, // Wohnbaugesellschaft = sehr hohe Priorität
    'bautraeger': 30        // Bauträger = sehr hohe Priorität
  };
  score += projekttypScores[formData.projekttyp] || 10;

  // 2. Anzahl Einheiten-Bonus (0-25 Punkte)
  const einheitenScores = {
    '1-10': 5,
    '11-25': 15,
    '26-50': 20,
    '51-100': 25,
    '101-200': 25,
    '201-500': 25,
    '500+': 25
  };
  const ausgewählteAnzahl = formData.anzahlBalkone || formData.anzahlEinheiten || '';
  score += einheitenScores[ausgewählteAnzahl] || 0;

  // 3. Budget-Bonus (0-30 Punkte)
  const budgetScores = {
    '< 50.000 €': 5,
    '50.000 - 100.000 €': 10,
    '100.000 - 150.000 €': 15,
    '150.000 - 200.000 €': 20,
    '200.000 - 300.000 €': 25,
    '300.000 - 500.000 €': 30,
    '500.000 - 1 Mio. €': 30,
    '> 1 Mio. €': 30,
    'Steht noch nicht fest': 10 // Auch bei unklarem Budget gibt es Punkte
  };
  score += budgetScores[formData.budgetrahmen] || 0;

  // 4. Zeitrahmen-Bonus (0-20 Punkte)
  const zeitrahmenScores = {
    'sofort': 20,           // Sehr dringend = hohe Priorität
    '3monate': 15,          // Schnell = gute Priorität
    '6monate': 10,          // Mittlere Priorität
    '12monate': 5,          // Niedrige Priorität
    'planung': 3,           // Sehr niedrige Priorität
    'unbekannt': 5          // Unklar = niedrige Priorität
  };
  score += zeitrahmenScores[formData.zeitrahmen] || 0;

  // 5. Vollständigkeit-Bonus (0-15 Punkte)
  if (formData.projektname && formData.projektname.trim()) score += 5;
  if (formData.projektort && formData.projektort.trim()) score += 5;
  if (formData.projektleiter && formData.projektleiter.trim()) score += 5;

  // 6. Balkontyp-Vielfalt-Bonus (0-10 Punkte)
  // Mehr verschiedene Balkontypen = höherer Score
  const balkontypCount = Array.isArray(formData.balkontyp) ? formData.balkontyp.length : 0;
  if (balkontypCount >= 3) score += 10;
  else if (balkontypCount === 2) score += 5;
  else if (balkontypCount === 1) score += 2;

  // Score zwischen 0 und 100 begrenzen
  return Math.max(0, Math.min(score, 100));
};

/**
 * Schätzt den Projektwert für Gewerbeprojekte
 */
const estimateGewerbeValue = (formData) => {
  const anzahlAuswahl = parseInt(formData.anzahlBalkone || formData.anzahlEinheiten) || 1;
  const balkonAnzahl = formData.balkontyp.length || 1;
  
  // Basis-Wert pro Balkon (Gewerbe-Preise)
  const basePricePerBalcony = 15000;
  
  // Multiplikator für Anzahl der Einheiten
  const unitMultiplier = Math.min(anzahlAuswahl, 10); // Max 10x für Schätzung
  
  // Multiplikator für Balkontyp
  const typeMultiplier = formData.balkontyp.includes('Hängebalkon') ? 1.5 : 1.0;
  
  return Math.round(basePricePerBalcony * balkonAnzahl * unitMultiplier * typeMultiplier);
};