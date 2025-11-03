export interface LeadScore {
  urgency: 'critical' | 'high' | 'medium' | 'low';
  complexity: 'simple' | 'moderate' | 'complex';
  budget: 'premium' | 'standard' | 'budget';
  timeline: 'immediate' | 'urgent' | 'flexible';
  totalScore: number; // 0-100
  category: 'hot' | 'warm' | 'cold';
  followUpHours: number; // Wann anrufen?
  priority: 'P1' | 'P2' | 'P3' | 'P4'; // CRM Priorität
}

export interface ScoringFactors {
  urgency: number;
  complexity: number;
  budget: number;
  timeline: number;
}

// Scoring-Konfiguration für alle Funnel
export const LEAD_SCORING_CONFIG = {
  // Gewichtung der Faktoren (0-1)
  weights: {
    urgency: 0.35,
    complexity: 0.25,
    budget: 0.25,
    timeline: 0.15
  },
  
  // Schwellenwerte für Kategorien
  thresholds: {
    hot: 80,
    warm: 60,
    cold: 40
  },
  
  // Follow-up Zeiten in Stunden
  followUpTimes: {
    critical: 2,
    high: 4,
    medium: 24,
    low: 48
  }
};

// Scoring-Funktionen für alle Funnel
export const LEAD_SCORING_FUNCTIONS = {
  // Hauptfunktion: Score für alle Funnel berechnen
  calculateScore: (funnelType: string, answers: any): LeadScore => {
    const factors = LEAD_SCORING_FUNCTIONS.calculateFactors(funnelType, answers);
    const totalScore = LEAD_SCORING_FUNCTIONS.calculateTotalScore(factors);
    const category = LEAD_SCORING_FUNCTIONS.getCategory(totalScore);
    const urgency = LEAD_SCORING_FUNCTIONS.getUrgencyLevel(factors.urgency);
    const complexity = LEAD_SCORING_FUNCTIONS.getComplexityLevel(factors.complexity);
    const budget = LEAD_SCORING_FUNCTIONS.getBudgetLevel(factors.budget);
    const timeline = LEAD_SCORING_FUNCTIONS.getTimelineLevel(factors.timeline);
    const followUpHours = LEAD_SCORING_CONFIG.followUpTimes[urgency];
    const priority = LEAD_SCORING_FUNCTIONS.getPriority(totalScore);

    return {
      urgency,
      complexity,
      budget,
      timeline,
      totalScore,
      category,
      followUpHours,
      priority
    };
  },

  // Faktoren für spezifische Funnel berechnen
  calculateFactors: (funnelType: string, answers: any): ScoringFactors => {
    switch (funnelType) {
      case 'calculator':
        return LEAD_SCORING_FUNCTIONS.calculateCalculatorFactors(answers);
      case 'planer':
        return LEAD_SCORING_FUNCTIONS.calculatePlanerFactors(answers);
      case 'genehmigung':
        return LEAD_SCORING_FUNCTIONS.calculateGenehmigungFactors(answers);
      case 'express-angebot':
        return LEAD_SCORING_FUNCTIONS.calculateExpressAngebotFactors(answers);
      case 'bauzeit-planung':
        return LEAD_SCORING_FUNCTIONS.calculateBauzeitPlanungFactors(answers);
      case 'empfehlungen':
        return LEAD_SCORING_FUNCTIONS.calculateEmpfehlungenFactors(answers);
      case 'erfahrungen':
        return LEAD_SCORING_FUNCTIONS.calculateErfahrungenFactors(answers);
      case 'partner':
        return LEAD_SCORING_FUNCTIONS.calculatePartnerFactors(answers);
      case 'partner-werden':
        return LEAD_SCORING_FUNCTIONS.calculatePartnerWerdenFactors(answers);
      default:
        return { urgency: 0, complexity: 0, budget: 0, timeline: 0 };
    }
  },

  // Kalkulator-Funnel Scoring
  calculateCalculatorFactors: (answers: any): ScoringFactors => {
    let urgency = 0;
    let complexity = 0;
    let budget = 0;
    let timeline = 0;

    // Balkontyp (Komplexität)
    if (answers.balkontyp === 'haengebalkon') complexity += 30;
    else if (answers.balkontyp === 'balkonturm') complexity += 25;
    else if (answers.balkontyp === 'anbau') complexity += 20;
    else complexity += 15;

    // Größe (Komplexität + Budget)
    if (answers.balkongroesse === 'gross') {
      complexity += 25;
      budget += 30;
    } else if (answers.balkongroesse === 'mittel') {
      complexity += 15;
      budget += 20;
    } else {
      complexity += 10;
      budget += 15;
    }

    // Extras (Komplexität + Budget)
    if (answers.extras?.includes('glas')) {
      complexity += 20;
      budget += 25;
    }
    if (answers.extras?.includes('dach')) {
      complexity += 15;
      budget += 20;
    }
    if (answers.extras?.includes('geländer')) {
      complexity += 10;
      budget += 15;
    }

    // Zeitplan (Dringlichkeit)
    if (answers.zeitplan === 'sofort') urgency += 40;
    else if (answers.zeitplan === 'diesen_fruehling') urgency += 30;
    else if (answers.zeitplan === 'diesen_sommer') urgency += 20;
    else urgency += 10;

    return { urgency, complexity, budget, timeline };
  },

  // Planer-Funnel Scoring
  calculatePlanerFactors: (answers: any): ScoringFactors => {
    let urgency = 0;
    let complexity = 0;
    let budget = 0;
    let timeline = 0;

    // Projektstatus (Dringlichkeit)
    if (answers.projektstatus === 'bereits_gestartet') urgency += 40;
    else if (answers.projektstatus === 'planung_laeuft') urgency += 30;
    else if (answers.projektstatus === 'ideenphase') urgency += 20;
    else urgency += 10;

    // Erfahrung (Komplexität)
    if (answers.erfahrung === 'keine') complexity += 30;
    else if (answers.erfahrung === 'wenig') complexity += 20;
    else complexity += 10;

    // Zeitplan (Dringlichkeit)
    if (answers.zeitplan === 'sofort') urgency += 30;
    else if (answers.zeitplan === 'diesen_fruehling') urgency += 25;
    else if (answers.zeitplan === 'diesen_sommer') urgency += 20;
    else urgency += 10;

    // Budget (Budget)
    if (answers.budget === 'hoch') budget += 30;
    else if (answers.budget === 'mittel') budget += 20;
    else budget += 15;

    return { urgency, complexity, budget, timeline };
  },

  // Genehmigungscheck-Funnel Scoring
  calculateGenehmigungFactors: (answers: any): ScoringFactors => {
    let urgency = 0;
    let complexity = 0;
    let budget = 0;
    let timeline = 0;

    // Bundesland (Komplexität)
    if (['bayern', 'baden-wuerttemberg', 'nordrhein-westfalen'].includes(answers.bundesland)) {
      complexity += 25;
    } else {
      complexity += 15;
    }

    // Projekttyp (Komplexität)
    if (answers.projekttyp === 'haengebalkon') complexity += 30;
    else if (answers.projekttyp === 'balkonturm') complexity += 25;
    else complexity += 20;

    // Grenzabstand (Komplexität)
    if (answers.grenzabstand === 'unter_3m') complexity += 25;
    else if (answers.grenzabstand === '3_5m') complexity += 20;
    else complexity += 15;

    // Genehmigungsstatus (Dringlichkeit)
    if (answers.genehmigungsstatus === 'genehmigungspflichtig') urgency += 35;
    else if (answers.genehmigungsstatus === 'verfahrensfrei') urgency += 20;
    else urgency += 10;

    return { urgency, complexity, budget, timeline };
  },

  // Express-Angebot-Funnel Scoring
  calculateExpressAngebotFactors: (answers: any): ScoringFactors => {
    let urgency = 0;
    let complexity = 0;
    let budget = 0;
    let timeline = 0;

    // Zeitplan (Dringlichkeit)
    if (answers.timeframe === 'urgent') urgency += 40;
    else if (answers.timeframe === 'asap') urgency += 30;
    else if (answers.timeframe === 'flexible') urgency += 20;
    else urgency += 10;

    // Budget (Budget)
    if (answers.budget === 'high') budget += 30;
    else if (answers.budget === 'medium') budget += 20;
    else budget += 15;

    // Genehmigungsstatus (Komplexität)
    if (answers.approvalStatus === 'pending') complexity += 25;
    else if (answers.approvalStatus === 'approved') complexity += 15;
    else complexity += 10;

    return { urgency, complexity, budget, timeline };
  },

  // Bauzeit-Planungs-Funnel Scoring
  calculateBauzeitPlanungFactors: (answers: any): ScoringFactors => {
    let urgency = 0;
    let complexity = 0;
    let budget = 0;
    let timeline = 0;

    // Zeitplan (Dringlichkeit)
    if (answers.zeitplan === 'sofort') urgency += 40;
    else if (answers.zeitplan === 'diesen_fruehling') urgency += 30;
    else if (answers.zeitplan === 'diesen_sommer') urgency += 25;
    else urgency += 15;

    // Projektstatus (Komplexität)
    if (answers.projektstatus === 'idea') complexity += 30;
    else if (answers.projektstatus === 'planning') complexity += 25;
    else if (answers.projektstatus === 'permit') complexity += 20;
    else complexity += 15;

    // Erfahrung (Komplexität)
    if (answers.erfahrung === 'keine') complexity += 20;
    else complexity += 10;

    return { urgency, complexity, budget, timeline };
  },

  // Empfehlungen-Funnel Scoring
  calculateEmpfehlungenFactors: (answers: any): ScoringFactors => {
    let urgency = 0;
    let complexity = 0;
    let budget = 0;
    let timeline = 0;

    // Zeitrahmen (Dringlichkeit)
    if (answers.zeitrahmen === 'immediate') urgency += 40;
    else if (answers.zeitrahmen === 'next_spring') urgency += 30;
    else if (answers.zeitrahmen === 'next_summer') urgency += 25;
    else urgency += 15;

    // Wohnsituation (Komplexität)
    if (answers.wohnsituation === 'condo_owner') complexity += 30;
    else if (answers.wohnsituation === 'manager') complexity += 25;
    else if (answers.wohnsituation === 'clarifying') complexity += 20;
    else complexity += 15;

    // Budget (Budget)
    if (answers.budget === '40k_plus') budget += 35;
    else if (answers.budget === '25_40k') budget += 30;
    else if (answers.budget === '15_25k') budget += 25;
    else if (answers.budget === '15k') budget += 20;
    else budget += 15;

    // Prioritäten (Komplexität)
    if (answers.prioritaeten >= 6) complexity += 25;
    else if (answers.prioritaeten >= 4) complexity += 20;
    else complexity += 15;

    // Bedenken (Dringlichkeit)
    if (answers.bedenken >= 6) urgency += 25;
    else if (answers.bedenken >= 4) urgency += 20;
    else urgency += 15;

    return { urgency, complexity, budget, timeline };
  },

  // Erfahrungen-Funnel Scoring
  calculateErfahrungenFactors: (answers: any): ScoringFactors => {
    let urgency = 0;
    let complexity = 0;
    let budget = 0;
    let timeline = 0;

    // Feedback-Typ (Dringlichkeit)
    if (answers.feedbackType === 'improvement') urgency += 35;
    else if (answers.feedbackType === 'question') urgency += 30;
    else if (answers.feedbackType === 'detailed') urgency += 20;
    else urgency += 15;

    // Bewertung (Komplexität)
    if (answers.overallRating <= 2) complexity += 30;
    else if (answers.overallRating <= 3) complexity += 25;
    else if (answers.overallRating <= 4) complexity += 20;
    else complexity += 15;

    // Projekttyp (Komplexität)
    if (answers.projectType === 'hanging') complexity += 25;
    else if (answers.projectType === 'standing') complexity += 20;
    else complexity += 15;

    // Veröffentlichung (Dringlichkeit)
    if (answers.publishPermission === 'named') urgency += 20;
    else if (answers.publishPermission === 'firstname') urgency += 15;
    else urgency += 10;

    // Erfahrungslänge (Komplexität)
    if (answers.experienceLength >= 100) complexity += 20;
    else if (answers.experienceLength >= 50) complexity += 15;
    else complexity += 10;

    return { urgency, complexity, budget, timeline };
  },

  // Partner-Funnel Scoring
  calculatePartnerFactors: (answers: any): ScoringFactors => {
    let urgency = 0;
    let complexity = 0;
    let budget = 0;
    let timeline = 0;

    // === POSITIVE FAKTOREN ===
    
    // Erfahrung (Komplexität)
    if (answers.experience === 'expert') complexity += 40;
    else if (answers.experience === 'professional') complexity += 30;
    else if (answers.experience === 'experienced') complexity += 20;
    else complexity += 10;

    // Spezialisierungen (Komplexität)
    if (answers.specialties?.length >= 5) complexity += 25;
    else if (answers.specialties?.length >= 3) complexity += 20;
    else if (answers.specialties?.length >= 1) complexity += 15;
    else complexity += 5;

    // Versicherungsstatus (Dringlichkeit)
    if (answers.insuranceStatus === 'full') urgency += 30;
    else if (answers.insuranceStatus === 'partial') urgency += 20;
    else urgency += 10;

    // Dokumente (Komplexität)
    const availableDocs = Object.values(answers.documents || {}).filter(Boolean).length;
    if (availableDocs >= 5) complexity += 25;
    else if (availableDocs >= 3) complexity += 20;
    else if (availableDocs >= 1) complexity += 15;
    else complexity += 5;

    // Referenzen (Komplexität)
    const validReferences = answers.references?.filter(ref => 
      ref.description?.trim() && ref.location?.trim() && ref.date?.trim()
    ).length || 0;
    if (validReferences >= 3) complexity += 20;
    else if (validReferences >= 1) complexity += 15;
    else complexity += 5;

    // Hero-Projekt (Komplexität)
    if (answers.heroProject?.description?.trim().length > 100) complexity += 15;
    else if (answers.heroProject?.description?.trim().length > 50) complexity += 10;
    else complexity += 5;

    // Arbeitsgebiet (Timeline)
    if (answers.workingArea === 'national') timeline += 25;
    else if (answers.workingArea === 'state') timeline += 20;
    else if (answers.workingArea === 'regional') timeline += 15;
    else timeline += 10;

    // Kapazität (Dringlichkeit)
    if (answers.capacity === 'immediate') urgency += 25;
    else if (answers.capacity === 'soon') urgency += 20;
    else if (answers.capacity === 'later') urgency += 15;
    else urgency += 10;

    // === NEGATIVE FAKTOREN (ABZÜGE) ===
    
    // Fehlende Unternehmensdaten (Seriosität)
    if (!answers.companyName || answers.companyName.trim().length < 3) {
      urgency -= 15; // Reduziert Seriosität
      complexity -= 10;
    }

    // Fehlende Kontaktdaten (Engagement)
    if (!answers.contact?.email || !answers.contact?.phone) {
      urgency -= 20; // Reduziert Engagement
    }

    // Fehlende Versicherung (Risiko)
    if (answers.insuranceStatus === 'none' || !answers.insuranceStatus) {
      urgency -= 25; // Hohes Risiko
      complexity -= 15;
    }

    // Fehlende Dokumente (Qualifikation)
    if (availableDocs === 0) {
      complexity -= 20; // Reduziert Qualifikation
      urgency -= 10;
    }

    // Fehlende Referenzen (Erfahrung)
    if (validReferences === 0) {
      complexity -= 15; // Reduziert Erfahrung
      urgency -= 10;
    }

    // Fehlende Spezialisierungen (Fokus)
    if (!answers.specialties || answers.specialties.length === 0) {
      complexity -= 10; // Reduziert Fokus
    }

    // Unvollständige Hero-Projekt-Beschreibung
    if (!answers.heroProject?.description || answers.heroProject.description.trim().length < 20) {
      complexity -= 10; // Reduziert Projektqualität
    }

    // Begrenztes Arbeitsgebiet (Skalierung)
    if (answers.workingArea === 'local' || !answers.workingArea) {
      timeline -= 10; // Reduziert Skalierungspotential
    }

    // === MINIMUM-WERTE SICHERSTELLEN ===
    urgency = Math.max(urgency, 0);
    complexity = Math.max(complexity, 0);
    budget = Math.max(budget, 0);
    timeline = Math.max(timeline, 0);

    return { urgency, complexity, budget, timeline };
  },

  // Partner-Werden-Funnel Scoring (Vorabinfos)
  calculatePartnerWerdenFactors: (answers: any): ScoringFactors => {
    let urgency = 0;
    let complexity = 0;
    let budget = 0;
    let timeline = 0;

    // Erfahrung (Komplexität + Dringlichkeit)
    if (answers.experience === 'expert') {
      complexity += 40;
      urgency += 30; // Experten sind oft schnell entscheidungsfähig
    } else if (answers.experience === 'professional') {
      complexity += 30;
      urgency += 25;
    } else if (answers.experience === 'experienced') {
      complexity += 20;
      urgency += 20;
    } else if (answers.experience === 'beginner') {
      complexity += 10;
      urgency += 15; // Einsteiger brauchen mehr Beratung
    }

    // Unternehmensname vorhanden (Seriosität)
    if (answers.companyName && answers.companyName.trim().length > 3) {
      urgency += 20; // Seriöse Anfrage
    }

    // Telefon angegeben (Engagement)
    if (answers.phone && answers.phone.trim().length > 5) {
      urgency += 15; // Höheres Engagement
    }

    // Stadt angegeben (Regionalität)
    if (answers.city && answers.city.trim().length > 2) {
      urgency += 10; // Regionale Zuordnung möglich
    }

    // Newsletter-Anmeldung (Interesse)
    if (answers.newsletter) {
      urgency += 10; // Zeigt Interesse an langfristiger Partnerschaft
    }

    return { urgency, complexity, budget, timeline };
  },

  // Gesamtscore berechnen
  calculateTotalScore: (factors: ScoringFactors): number => {
    const { weights } = LEAD_SCORING_CONFIG;
    return Math.round(
      factors.urgency * weights.urgency +
      factors.complexity * weights.complexity +
      factors.budget * weights.budget +
      factors.timeline * weights.timeline
    );
  },

  // Kategorie bestimmen
  getCategory: (totalScore: number): 'hot' | 'warm' | 'cold' => {
    const { thresholds } = LEAD_SCORING_CONFIG;
    if (totalScore >= thresholds.hot) return 'hot';
    if (totalScore >= thresholds.warm) return 'warm';
    return 'cold';
  },

  // Priorität für CRM
  getPriority: (totalScore: number): 'P1' | 'P2' | 'P3' | 'P4' => {
    if (totalScore >= 80) return 'P1';
    if (totalScore >= 60) return 'P2';
    if (totalScore >= 40) return 'P3';
    return 'P4';
  },

  // Urgency Level
  getUrgencyLevel: (urgencyScore: number): 'critical' | 'high' | 'medium' | 'low' => {
    if (urgencyScore >= 70) return 'critical';
    if (urgencyScore >= 50) return 'high';
    if (urgencyScore >= 30) return 'medium';
    return 'low';
  },

  // Complexity Level
  getComplexityLevel: (complexityScore: number): 'simple' | 'moderate' | 'complex' => {
    if (complexityScore >= 60) return 'complex';
    if (complexityScore >= 35) return 'moderate';
    return 'simple';
  },

  // Budget Level
  getBudgetLevel: (budgetScore: number): 'premium' | 'standard' | 'budget' => {
    if (budgetScore >= 50) return 'premium';
    if (budgetScore >= 30) return 'standard';
    return 'budget';
  },

  // Timeline Level
  getTimelineLevel: (timelineScore: number): 'immediate' | 'urgent' | 'flexible' => {
    if (timelineScore >= 60) return 'immediate';
    if (timelineScore >= 40) return 'urgent';
    return 'flexible';
  }
};

// ===== NEUE PARTNER LEAD SCORING LOGIK =====

export interface PartnerScoreResult {
  baseScore: number;
  abzuege: number;
  completionBonus: number;
  finalScore: number;
  category: 'Hot Partner' | 'Warm Partner' | 'Cold Partner' | 'Nicht qualifiziert';
  action: string;
  priority: 'high' | 'medium' | 'low' | 'none';
  priorityRank: 'P1' | 'P2' | 'P3' | 'P4';
  responseTime: string;
  qualified: boolean;
  nachfrageErforderlich: boolean;
  breakdown: {
    subscription: number;
    rechtsform: number;
    mitarbeiter: number;
    gruendungsjahr: number;
    erfahrung: number;
    spezialisierungen: number;
    arbeitsgebiet: number;
    versicherung: number;
    dokumente: number;
    referenzen: number;
    abzuege: {
      jungesFirma: number;
      erfahrung: number;
      fokus: number;
      arbeitsgebiet: number;
      qualifikationen: number;
      referenzen: number;
    };
    completionBonus: number;
  };
}

// Scoring-Tabellen für Partner-Bewerbung
const SUBSCRIPTION_SCORES = {
  'starter': 5,           // 8 Leads/Monat
  'professional': 10,     // 17 Leads/Monat (meist gewählt)
  'enterprise': 15        // 35 Leads/Monat
};

const RECHTSFORM_SCORES = {
  'gmbh': 8,
  'ug': 4,
  'einzelunternehmen': 3,
  'gbr': 5,
  'kg': 6,
  'ohg': 6
};

const MITARBEITER_SCORES = {
  '1': 2,
  '1-5': 2,                   // Alias
  '2-5': 4,
  '6-10': 6,
  '11-20': 7,
  '11-25': 7,                 // Alias (wird aus Partner-Funnel gesendet)
  '21+': 7,
  '26+': 8,                   // Größere Firmen bekommen mehr Punkte
  '51+': 10
};

const ERFAHRUNG_SCORES = {
  'einsteiger_0_2': 3,
  'beginner': 3,           // Alias für einsteiger_0_2
  'erfahren_3_5': 8,
  'experienced': 8,        // Alias für erfahren_3_5
  'profi_6_10': 12,
  'professional': 12,      // Alias für profi_6_10
  'experte_10plus': 15,
  'expert': 15            // Alias für experte_10plus
};

const SPEZIALISIERUNG_SCORES = {
  'vorstellbalkone': 3,
  'vorstellbalkon': 3,        // Singular
  'haengebalkone': 4,         // Anspruchsvoll
  'haenge_balkone': 4,        // Mit Unterstrich
  'haengebalkon': 4,          // Singular
  'balkontuerme': 3,
  'balkontuerme': 3,          // Mit Unterstrich
  'balkonturm': 3,            // Singular
  'anlehnbalkone': 3,
  'anlehn_balkone': 3,        // Mit Unterstrich
  'anlehnbalkon': 3,          // Singular
  'balkonsanierung': 3,
  'renovation': 3,            // Alias
  'balkontreppen': 3,
  'balkontreppen': 3,         // Mit Unterstrich
  'gelaender_absturzsicherung': 3,
  'railings': 3,              // Alias
  'rahmenlose_ganzglasgelaender': 4, // Hochwertig
  'glastilberdachungen': 3,
  'komplette_balkonverglasungen': 4   // Hochwertig
};

const ARBEITSGEBIET_SCORES = {
  'lokal_25km': 8,            // Lokal (bis 25 km)
  'local': 8,                  // Alias für lokal_25km
  'regional_50km': 12,        // Regional (bis 50 km)
  'regional': 12,              // Alias für regional_50km
  'landesweit': 16,           // Landesweit
  'state': 16,                 // Alias für landesweit
  'deutschlandweit': 20,      // Deutschlandweit
  'national': 20              // Alias für deutschlandweit
};

const VERSICHERUNG_SCORES = {
  'vollstaendig': 10,         // Betrieb, Berufshaftpflicht & Co
  'full': 10,                  // Alias für vollstaendig
  'teilweise': 5,             // Grundversicherung vorhanden
  'partial': 5,               // Alias für teilweise
  'in_planung': 2,           // Versicherung wird abgeschlossen
  'planned': 2,               // Alias für in_planung
  'none': 0                   // Keine Versicherung
};

const DOKUMENTE_SCORES = {
  'gewerbeschein': 2,
  'businessLicense': 2,      // Alias
  'meisterbrief': 4,          // Wichtig!
  'masterCertificate': 4,    // Alias
  'ausbilderschein': 2,
  'instructorLicense': 2,     // Alias
  'arbeitsproben': 2,
  'portfolio': 2,            // Alias
  'versicherungsnachweis': 2,
  'insurance': 2,            // Alias
  'diplomzeugnis': 2,
  'diploma': 2,              // Alias
  'referenzen': 2,
  'references': 2            // Alias
};

// Hilfsfunktionen für Scoring-Berechnung
function calculateGruendungsjahrScore(jahr: number): number {
  const alter = 2025 - jahr;
  if (alter >= 10) return 5;
  if (alter >= 5) return 4;
  if (alter >= 3) return 3;
  if (alter >= 1) return 2;
  return 1;
}

function calculateReferenzScore(auftragswert: number): number {
  if (auftragswert >= 100000) return 10;  // Großprojekt
  if (auftragswert >= 50000) return 7;    // Mittleres Projekt
  if (auftragswert >= 25000) return 5;    // Kleineres Projekt
  if (auftragswert >= 10000) return 3;    // Kleinstprojekt
  return 1;
}

// Minderqualifikations-Checks
function checkJungesFirmaAbzug(rechtsform: string, gruendungsjahr: number, mitarbeiter: string): number {
  if (!gruendungsjahr || gruendungsjahr <= 0) {
    return 0; // Kein Gründungsjahr = kein Abzug
  }
  
  const firmenalter = 2025 - gruendungsjahr;
  const isJung = (firmenalter <= 3); // Firma 3 Jahre oder jünger (inklusive 3 Jahre!)
  const isSehrJung = (firmenalter <= 2); // Firma 2 Jahre oder jünger (inklusive 2 Jahre!)
  const isMicro = (mitarbeiter === '1' || mitarbeiter === '2-5');
  const isUG = (rechtsform === 'ug');
  
  // Sehr junge Firma (<= 2 Jahre) + sehr klein + unsichere Rechtsform
  if (isSehrJung && isMicro && isUG) {
    return -20; // Sehr starker Abzug: Zu jung, zu klein, unsichere Rechtsform
  }
  // Sehr junge Firma (<= 2 Jahre) + sehr klein
  if (isSehrJung && isMicro) {
    return -15; // Starker Abzug: Zu jung + zu klein
  }
  // Junge Firma (<= 3 Jahre) + sehr klein + unsichere Rechtsform
  if (isJung && isMicro && isUG) {
    return -15; // Starker Abzug: Zu jung, zu klein, unsichere Rechtsform
  }
  // Junge Firma (<= 3 Jahre) + sehr klein
  if (isJung && isMicro) {
    return -10; // Mittlerer Abzug: Zu jung + zu klein
  }
  // Sehr junge Firma (<= 2 Jahre) alleine
  if (isSehrJung) {
    return -8; // Leichter Abzug: Sehr junges Unternehmen
  }
  return 0;
}

function checkErfahrungAbzug(erfahrung: string, gruendungsjahr: number): number {
  if (!gruendungsjahr || gruendungsjahr <= 0) {
    return 0; // Kein Gründungsjahr = kein Abzug
  }
  
  const firmenalter = 2025 - gruendungsjahr;
  
  // Firma < 3 Jahre, aber behauptet mehr Erfahrung - WENIGER kritisch
  // (Person kann Erfahrung aus vorheriger Firma haben)
  if (firmenalter < 3 && (erfahrung === 'erfahren_3_5' || erfahrung === 'experienced' || 
                          erfahrung === 'profi_6_10' || erfahrung === 'professional' || 
                          erfahrung === 'experte_10plus' || erfahrung === 'expert')) {
    return -5; // Leichte Inkonsistenz (weniger Abzug)
  }
  
  // Firma < 3 Jahre + Einsteiger - KEIN Abzug mehr (ist normal für neue Firmen!)
  if (firmenalter < 3 && (erfahrung === 'einsteiger_0_2' || erfahrung === 'beginner')) {
    return 0; // Kein Abzug - neue Firmen sind willkommen!
  }
  
  return 0;
}

function checkFokusAbzug(spezialisierungen: string[], mitarbeiter: string): number {
  const anzahlSpezialisierungen = spezialisierungen?.length || 0;
  
  // Große Unternehmen (21+ MA) können viele Bereiche abdecken - kein Abzug
  if (mitarbeiter === '21+' || mitarbeiter === '26+' || mitarbeiter === '51+') {
    return 0; // Große Firma kann alle Bereiche bedienen
  }
  
  // WENIGER STRENGE Abzüge - viele Spezialisierungen sind GUT!
  // Kleine Firma (1-5 MA) mit zu vielen Spezialisierungen
  if ((mitarbeiter === '1' || mitarbeiter === '1-5' || mitarbeiter === '2-5') && anzahlSpezialisierungen >= 7) {
    return -5; // Leichte Überschätzung (weniger Abzug)
  }
  if ((mitarbeiter === '1' || mitarbeiter === '1-5' || mitarbeiter === '2-5') && anzahlSpezialisierungen >= 5) {
    return -3; // Leichter Fokusverlust (weniger Abzug)
  }
  
  // Mittlere Firma (6-10 MA) mit zu vielen
  if (mitarbeiter === '6-10' && anzahlSpezialisierungen >= 8) {
    return -2; // Sehr leichter Abzug
  }
  
  // Mittelgroße Firma (11-20 MA) mit zu vielen - KEIN Abzug mehr!
  if (mitarbeiter === '11-20' || mitarbeiter === '11-25') {
    return 0; // Kann viele Bereiche abdecken - kein Abzug
  }
  
  return 0;
}

function checkArbeitsgebietAbzug(arbeitsgebiet: string, mitarbeiter: string): number {
  const istKlein = (mitarbeiter === '1' || mitarbeiter === '2-5');
  
  // Kleine Firma behauptet deutschlandweite Tätigkeit
  if (istKlein && (arbeitsgebiet === 'deutschlandweit' || arbeitsgebiet === 'national')) {
    return -15; // Unrealistisch: 1-5 MA können nicht deutschlandweit arbeiten
  }
  
  // Kleine Firma behauptet landesweite Tätigkeit
  if (istKlein && (arbeitsgebiet === 'landesweit' || arbeitsgebiet === 'state')) {
    return -10; // Überschätzung
  }
  
  // Mittlere Firma (6-10 MA) deutschlandweit
  if (mitarbeiter === '6-10' && (arbeitsgebiet === 'deutschlandweit' || arbeitsgebiet === 'national')) {
    return -5; // Fragwürdig
  }
  
  return 0;
}

function checkQualifikationenAbzug(versicherung: string, dokumente: string[]): number {
  let abzug = 0;
  
  // Versicherung ist WICHTIGER als Meisterbrief
  // Nicht vollständig versichert
  if (versicherung === 'in_planung' || versicherung === 'planned' || versicherung === 'none') {
    abzug -= 8; // Zu riskant
  } else if (versicherung === 'teilweise' || versicherung === 'partial') {
    abzug -= 4; // Lücken in der Absicherung
  }
  // Wenn vollständig versichert (full/vollstaendig), KEIN Abzug!
  
  // Kein Meisterbrief - STRENGER bewerten, besonders bei jungen Firmen
  if (!dokumente.includes('meisterbrief') && !dokumente.includes('masterCertificate')) {
    // Prüfe ob andere Qualifikationen vorhanden sind
    const hatAndereQualifikationen = dokumente.includes('diploma') || 
                                     dokumente.includes('instructorLicense') ||
                                     dokumente.length > 2; // Wenn viele andere Dokumente vorhanden
    
    if (!hatAndereQualifikationen) {
      abzug -= 10; // Stärkerer Abzug: Fehlende Kernqualifikation ohne Alternativen
    } else {
      abzug -= 6; // Mittlerer Abzug: Fehlende Kernqualifikation, aber andere Qualifikationen vorhanden
    }
  }
  
  return abzug;
}

function checkReferenzenAbzug(referenzen: any[]): number {
  if (!referenzen || referenzen.length === 0) {
    return -15; // Keine Referenzen = starker Abzug
  }
  
  // Referenzen können als String (z.B. "12.000") oder Zahl kommen
  const gesamtwert = referenzen.reduce((sum, ref) => {
    let value = 0;
    if (ref && typeof ref === 'object' && ref.value) {
      // String wie "12.000 " in Zahl konvertieren
      const valStr = String(ref.value).replace(/[^\d]/g, '');
      value = parseInt(valStr) || 0;
    }
    return sum + value;
  }, 0);
  
  // Nur wenn wirklich KEINE Referenzen vorhanden sind
  if (gesamtwert === 0) {
    return -10; // Keine Projekte = Abzug
  }
  
  // STRENGERE Bewertung: Kleine Referenzen (< 20.000€ gesamt) geben Abzug
  if (gesamtwert < 20000) {
    return -8; // Starker Abzug: Nur sehr kleine Projekte
  }
  // Mittlere Referenzen (20.000 - 50.000€)
  if (gesamtwert < 50000) {
    return -4; // Leichter Abzug: Kleine bis mittlere Projekte
  }
  // Gute Referenzen bekommen KEINEN Abzug
  if (gesamtwert >= 100000) {
    return 0; // Kein Abzug für große Projekte
  }
  
  return 0; // Kein Abzug für mittlere bis große Projekte
}

function checkLeuchtturmprojektAbzug(lighthouseProject: any): number {
  if (!lighthouseProject || !lighthouseProject.special) {
    return 0; // Kein Leuchtturmprojekt oder kein Kommentar = kein Abzug
  }
  
  const special = String(lighthouseProject.special).toLowerCase();
  
  // Wenn der Partner angibt, dass er gerade erst begonnen hat
  if (special.includes('gerade erst begonnen') || 
      special.includes('erst begonnen') ||
      special.includes('neu') ||
      special.includes('anfang') ||
      special.includes('start')) {
    return -8; // Starker Abzug: Partner ist noch sehr unerfahren
  }
  
  return 0; // Kein Abzug für erfahrene Partner
}

// Hauptfunktion für Partner-Scoring
export function calculatePartnerScore(answers: any): PartnerScoreResult {
  // Basis-Scores berechnen
  // Gründungsjahr als Zahl konvertieren (kann als String übergeben werden)
  const foundedYearNum = typeof answers.foundedYear === 'string' ? parseInt(answers.foundedYear) : answers.foundedYear;
  
  let baseScore = 0;
  baseScore += SUBSCRIPTION_SCORES[answers.partnerType] || 0;
  baseScore += RECHTSFORM_SCORES[answers.legalForm] || 0;
  baseScore += MITARBEITER_SCORES[answers.employeeCount] || 0;
  baseScore += calculateGruendungsjahrScore(foundedYearNum);
  baseScore += ERFAHRUNG_SCORES[answers.experience] || 0;
  
  // Spezialisierungen (max 25)
  let spezialisierungScore = 0;
  answers.specialties?.forEach((s: string) => {
    spezialisierungScore += SPEZIALISIERUNG_SCORES[s] || 0;
  });
  baseScore += Math.min(spezialisierungScore, 25);
  
  baseScore += ARBEITSGEBIET_SCORES[answers.workingArea] || 0;
  baseScore += VERSICHERUNG_SCORES[answers.insuranceStatus] || 0;
  
  // Dokumente
  let dokumenteScore = 0;
  const dokumenteArray = Object.keys(answers.documents || {}).filter(key => answers.documents[key]);
  dokumenteArray.forEach(d => {
    dokumenteScore += DOKUMENTE_SCORES[d] || 0;
  });
  baseScore += Math.min(dokumenteScore, 10);
  
  // Referenzen
  let referenzenScore = 0;
  answers.references?.forEach((ref: any) => {
    referenzenScore += calculateReferenzScore(ref.value || 0);
  });
  baseScore += Math.min(referenzenScore, 20);
  
  // ABZÜGE berechnen (nur bei tatsächlichen Problemen, nicht bei guten Profilen)
  let abzuege = 0;
  
  const jungesFirmaAbzug = checkJungesFirmaAbzug(answers.legalForm, foundedYearNum, answers.employeeCount);
  const erfahrungAbzug = checkErfahrungAbzug(answers.experience, foundedYearNum);
  const fokusAbzug = checkFokusAbzug(answers.specialties || [], answers.employeeCount);
  const arbeitsgebietAbzug = checkArbeitsgebietAbzug(answers.workingArea, answers.employeeCount);
  const qualifikationenAbzug = checkQualifikationenAbzug(answers.insuranceStatus, dokumenteArray);
  const referenzenAbzug = checkReferenzenAbzug(answers.references || []);
  const leuchtturmprojektAbzug = checkLeuchtturmprojektAbzug(answers.lighthouseProject);
  
  // ABZÜGE NUR anwenden wenn tatsächlich Probleme vorliegen
  // Für gute Profile (expert, viele Referenzen, vollständige Versicherung) KEINE Abzüge!
  // Math.min(0, ...) stellt sicher, dass die Summe nicht positiv wird
  abzuege = Math.min(0, jungesFirmaAbzug + erfahrungAbzug + fokusAbzug + arbeitsgebietAbzug + qualifikationenAbzug + referenzenAbzug + leuchtturmprojektAbzug);
  
  // DEBUG: Log alle Abzüge für Problem-Diagnose
  if (process.env.NODE_ENV !== 'production') {
    console.log('=== LEAD SCORE ABZÜGE DEBUG ===');
    console.log('Junges Firma Abzug:', jungesFirmaAbzug);
    console.log('Erfahrung Abzug:', erfahrungAbzug);
    console.log('Fokus Abzug:', fokusAbzug);
    console.log('Arbeitsgebiet Abzug:', arbeitsgebietAbzug);
    console.log('Qualifikationen Abzug:', qualifikationenAbzug);
    console.log('Referenzen Abzug:', referenzenAbzug);
    console.log('Leuchtturmprojekt Abzug:', leuchtturmprojektAbzug);
    console.log('Gesamt Abzüge:', abzuege);
    console.log('Base Score:', baseScore);
    console.log('Final Score:', baseScore + abzuege + 10);
  }
  
  // BONUS für gute Profile statt Abzug!
  // Expert + vollständige Versicherung + gute Referenzen = Bonus statt Abzug
  if (answers.experience === 'expert' || answers.experience === 'experte_10plus') {
    if (answers.insuranceStatus === 'full' || answers.insuranceStatus === 'vollstaendig') {
      if (referenzenScore > 0) {
        // Statt Abzug, kleine Bonuspunkte für sehr gute Profile
        abzuege = Math.max(abzuege, 0); // Keine Abzüge für sehr gute Profile
      }
    }
  }
  
  // Completion Bonus
  const completionBonus = 10;
  
  // Final Score
  const finalScore = Math.max(baseScore + abzuege + completionBonus, 0);
  
  // Kategorisierung
  let category: 'Hot Partner' | 'Warm Partner' | 'Cold Partner' | 'Nicht qualifiziert';
  let action: string;
  let priority: 'high' | 'medium' | 'low' | 'none';
  let priorityRank: 'P1' | 'P2' | 'P3' | 'P4';
  let responseTime: string;
  let qualified: boolean;
  let nachfrageErforderlich: boolean;
  
  if (finalScore >= 75) {
    category = 'Hot Partner';
    action = 'Bevorzugte Vermittlung + Top-Platzierung';
    priority = 'high';
    priorityRank = 'P1';
    responseTime = '24 Stunden';
    qualified = true;
    nachfrageErforderlich = false;
  } else if (finalScore >= 50) {
    category = 'Warm Partner';
    action = 'Reguläre Vermittlung';
    priority = 'medium';
    priorityRank = 'P2';
    responseTime = '48 Stunden';
    qualified = true;
    nachfrageErforderlich = false;
  } else if (finalScore >= 30) {
    category = 'Cold Partner';
    action = 'Aufbau-Phase + Training';
    priority = 'low';
    priorityRank = 'P3';
    responseTime = '7 Tage';
    qualified = true;
    nachfrageErforderlich = (abzuege < -10);
  } else {
    category = 'Nicht qualifiziert';
    action = 'Bewerbung ablehnen oder Nachfragen stellen';
    priority = 'none';
    priorityRank = 'P4';
    responseTime = '14 Tage';
    qualified = false;
    nachfrageErforderlich = true;
  }
  
  return {
    baseScore,
    abzuege,
    completionBonus,
    finalScore,
    category,
    action,
    priority,
    priorityRank,
    responseTime,
    qualified,
    nachfrageErforderlich,
    breakdown: {
      subscription: SUBSCRIPTION_SCORES[answers.partnerType] || 0,
      rechtsform: RECHTSFORM_SCORES[answers.legalForm] || 0,
      mitarbeiter: MITARBEITER_SCORES[answers.employeeCount] || 0,
      gruendungsjahr: calculateGruendungsjahrScore(foundedYearNum),
      erfahrung: ERFAHRUNG_SCORES[answers.experience] || 0,
      spezialisierungen: Math.min(spezialisierungScore, 25),
      arbeitsgebiet: ARBEITSGEBIET_SCORES[answers.workingArea] || 0,
      versicherung: VERSICHERUNG_SCORES[answers.insuranceStatus] || 0,
      dokumente: Math.min(dokumenteScore, 10),
      referenzen: Math.min(referenzenScore, 20),
        abzuege: {
        jungesFirma: jungesFirmaAbzug,
        erfahrung: erfahrungAbzug,
        fokus: fokusAbzug,
        arbeitsgebiet: arbeitsgebietAbzug,
        qualifikationen: qualifikationenAbzug,
        referenzen: referenzenAbzug,
        leuchtturmprojekt: leuchtturmprojektAbzug
      },
      completionBonus
    }
  };
}
