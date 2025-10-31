/**
 * Regionale Preisfaktoren für Balkonberechnung
 * Identisch zum Kalkulator
 */

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

/**
 * Berechnet den Preis für Planer-Funnel
 */
function calculatePlanerPrice(funnelData, contact) {
  if (!funnelData || !funnelData.size) return null;
  
  const width = parseFloat(funnelData.size.width || 0);
  const depth = parseFloat(funnelData.size.depth || 0);
  const balconyCount = parseInt(funnelData.balconyCount || 1);
  const areaPerBalcony = width * depth;
  const totalArea = areaPerBalcony * balconyCount;
  
  if (totalArea === 0) return null;
  
  // Basispreis pro m² (höher als Kalkulator, da Planer detaillierter)
  let basePricePerSqm = 1500;
  
  // Balkontyp-Multiplikator
  const typeMultipliers = {
    'standing': 1.4,      // Vorstellbalkon (4+ Stützen)
    'hanging': 1.3,       // Hängebalkon
    'leaning': 1.2,       // Anlehnbalkon (2 Stützen)
    'terrace': 1.0        // Hochterrasse
  };
  const typeMultiplier = typeMultipliers[funnelData.balconyType] || 1.0;
  
  // Basispreis berechnen
  let basePrice = totalArea * basePricePerSqm * typeMultiplier;
  
  // Budget-Validierung (falls gesetzt)
  if (funnelData.budget === '30k_plus') {
    basePrice = Math.max(basePrice, 30000);
  } else if (funnelData.budget === '20_30k') {
    basePrice = Math.min(Math.max(basePrice, 20000), 30000);
  } else if (funnelData.budget === '10_20k') {
    basePrice = Math.min(Math.max(basePrice, 10000), 20000);
  } else if (funnelData.budget === '10k' || funnelData.budget === 'bis_10k') {
    basePrice = Math.min(basePrice, 10000);
  }
  
  basePrice = Math.round(basePrice);
  
  // Regionalfaktor ermitteln
  const plz = contact?.zipCode || contact?.plz || funnelData?.zipCode || funnelData?.plz || '';
  let regionalAdjustment = null;
  
  if (plz) {
    const adjustment = getRegionalAdjustment(plz);
    regionalAdjustment = {
      factor: adjustment.factor,
      category: adjustment.category,
      region: adjustment.region,
      bundesland: adjustment.bundesland,
      savings: 0
    };
  } else {
    regionalAdjustment = {
      factor: 1.0,
      category: 'Standard',
      region: 'Nicht verfügbar',
      bundesland: 'Nicht verfügbar',
      savings: 0
    };
  }
  
  const finalPrice = Math.round(basePrice * regionalAdjustment.factor);
  regionalAdjustment.savings = finalPrice - basePrice;
  
  return {
    basePrice: basePrice,
    regionalFactor: regionalAdjustment.factor,
    regionalCategory: regionalAdjustment.category,
    regionalRegion: regionalAdjustment.region,
    regionalBundesland: regionalAdjustment.bundesland,
    finalPrice: finalPrice,
    savings: regionalAdjustment.savings
  };
}

module.exports = {
  getRegionalAdjustment,
  calculatePlanerPrice,
  regionalFactors,
  plzRegions,
  plzToBundesland
};
