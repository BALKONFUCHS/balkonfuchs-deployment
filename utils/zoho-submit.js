/**
 * ZOHO SUBMIT UTILITY
 * 
 * Hilfsfunktion für das Senden von Funnel-Daten an Zoho
 */

export const submitToZoho = async (funnelData, funnelType = 'gewerbe') => {
  try {
    console.log(`Sending ${funnelType} data to Zoho:`, funnelData);

    const response = await fetch('/.netlify/functions/send-to-zoho', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        funnelData: {
          ...funnelData,
          funnel: {
            type: funnelType,
            name: getFunnelName(funnelType)
          },
          timestamp: new Date().toISOString(),
          source: 'website'
        }
      }),
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
      newsletter: false,
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
      anzahlEinheiten: formData.anzahlEinheiten,
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

    // Lead-Scoring (vereinfacht)
    leadScore: {
      totalScore: calculateGewerbeScore(formData),
      category: 'warm', // Gewerbeprojekte sind meist warm
      priority: 'P2', // Gewerbeprojekte haben höhere Priorität
      urgency: 'medium',
      complexity: 'high', // Gewerbeprojekte sind komplex
      budget: 'high', // Gewerbeprojekte haben höheres Budget
      timeline: 'urgent',
      followUpHours: 12 // Schnellere Reaktion bei Gewerbe
    },

    // Geschätzter Wert
    estimatedPrice: estimateGewerbeValue(formData)
  };
};

/**
 * Berechnet einen einfachen Score für Gewerbeprojekte
 */
const calculateGewerbeScore = (formData) => {
  let score = 50; // Basis-Score

  // Projekttyp-Bonus
  if (formData.projekttyp === 'mehrfamilienhaus') score += 20;
  if (formData.projekttyp === 'bautraeger') score += 25;
  if (formData.projekttyp === 'investor') score += 30;

  // Budget-Bonus
  if (formData.budgetrahmen === '> 1 Mio. €') score += 25;
  if (formData.budgetrahmen === '500.000 - 1 Mio. €') score += 20;
  if (formData.budgetrahmen === '250.000 - 500.000 €') score += 15;

  // Vollständigkeit-Bonus
  if (formData.projektname && formData.projektort) score += 10;
  if (formData.projektleiter) score += 5;

  return Math.min(score, 100);
};

/**
 * Schätzt den Projektwert für Gewerbeprojekte
 */
const estimateGewerbeValue = (formData) => {
  const anzahlEinheiten = parseInt(formData.anzahlEinheiten) || 1;
  const balkonAnzahl = formData.balkontyp.length || 1;
  
  // Basis-Wert pro Balkon (Gewerbe-Preise)
  const basePricePerBalcony = 15000;
  
  // Multiplikator für Anzahl der Einheiten
  const unitMultiplier = Math.min(anzahlEinheiten, 10); // Max 10x für Schätzung
  
  // Multiplikator für Balkontyp
  const typeMultiplier = formData.balkontyp.includes('Hängebalkon') ? 1.5 : 1.0;
  
  return Math.round(basePricePerBalcony * balkonAnzahl * unitMultiplier * typeMultiplier);
};