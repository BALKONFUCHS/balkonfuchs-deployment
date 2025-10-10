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
  category: 'Premium Partner' | 'Standard Partner' | 'Basic Partner' | 'Nicht qualifiziert';
  action: string;
  priority: 'high' | 'medium' | 'low' | 'none';
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
  '2-5': 4,
  '6-10': 6,
  '11-20': 7,
  '21+': 7
};

const ERFAHRUNG_SCORES = {
  'einsteiger_0_2': 3,
  'erfahren_3_5': 8,
  'profi_6_10': 12,
  'experte_10plus': 15
};

const SPEZIALISIERUNG_SCORES = {
  'vorstellbalkone': 3,
  'haengebalkone': 4,         // Anspruchsvoll
  'balkontuerme': 3,
  'anlehnbalkone': 3,
  'balkonsanierung': 3,
  'balkontreppen': 3,
  'gelaender_absturzsicherung': 3,
  'rahmenlose_ganzglasgelaender': 4, // Hochwertig
  'glastilberdachungen': 3,
  'komplette_balkonverglasungen': 4   // Hochwertig
};

const ARBEITSGEBIET_SCORES = {
  'lokal_25km': 8,            // Lokal (bis 25 km)
  'regional_50km': 12,        // Regional (bis 50 km)
  'landesweit': 16,           // Landesweit
  'deutschlandweit': 20       // Deutschlandweit
};

const VERSICHERUNG_SCORES = {
  'vollstaendig': 10,         // Betrieb, Berufshaftpflicht & Co
  'teilweise': 5,             // Grundversicherung vorhanden
  'in_planung': 2             // Versicherung wird abgeschlossen
};

const DOKUMENTE_SCORES = {
  'gewerbeschein': 2,
  'meisterbrief': 4,          // Wichtig!
  'ausbilderschein': 2,
  'arbeitsproben': 2,
  'versicherungsnachweis': 2,
  'diplomzeugnis': 2,
  'referenzen': 2
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
  const isJung = (gruendungsjahr >= 2024);
  const isMicro = (mitarbeiter === '1' || mitarbeiter === '2-5');
  const isUG = (rechtsform === 'ug');
  
  if (isJung && isMicro && isUG) {
    return -15; // Starker Abzug: Zu jung, zu klein, unsichere Rechtsform
  }
  if (isJung && isMicro) {
    return -10; // Mittlerer Abzug: Zu jung + zu klein
  }
  return 0;
}

function checkErfahrungAbzug(erfahrung: string, gruendungsjahr: number): number {
  const firmenalter = 2025 - gruendungsjahr;
  
  // Firma < 3 Jahre, aber behauptet mehr Erfahrung
  if (firmenalter < 3 && (erfahrung === 'erfahren_3_5' || erfahrung === 'profi_6_10' || erfahrung === 'experte_10plus')) {
    return -10; // Inkonsistenz: Firma zu jung für angegebene Erfahrung
  }
  
  // Firma < 3 Jahre + Einsteiger
  if (firmenalter < 3 && erfahrung === 'einsteiger_0_2') {
    return -5; // Sehr unerfahren
  }
  
  return 0;
}

function checkFokusAbzug(spezialisierungen: string[], mitarbeiter: string): number {
  const anzahlSpezialisierungen = spezialisierungen.length;
  
  // Große Unternehmen (21+ MA) können viele Bereiche abdecken - kein Abzug
  if (mitarbeiter === '21+') {
    return 0; // Große Firma kann alle Bereiche bedienen
  }
  
  // Kleine Firma (1-5 MA) mit zu vielen Spezialisierungen
  if ((mitarbeiter === '1' || mitarbeiter === '2-5') && anzahlSpezialisierungen >= 7) {
    return -15; // Unrealistisch: 1-5 MA können nicht 7+ Bereiche abdecken
  }
  if ((mitarbeiter === '1' || mitarbeiter === '2-5') && anzahlSpezialisierungen >= 5) {
    return -10; // Fehlender Fokus: Zu breit aufgestellt
  }
  
  // Mittlere Firma (6-10 MA) mit zu vielen
  if (mitarbeiter === '6-10' && anzahlSpezialisierungen >= 8) {
    return -5; // Eventuell überschätzt
  }
  
  // Mittelgroße Firma (11-20 MA) mit zu vielen
  if (mitarbeiter === '11-20' && anzahlSpezialisierungen >= 9) {
    return -3; // Leicht überschätzt
  }
  
  return 0;
}

function checkArbeitsgebietAbzug(arbeitsgebiet: string, mitarbeiter: string): number {
  const istKlein = (mitarbeiter === '1' || mitarbeiter === '2-5');
  
  // Kleine Firma behauptet deutschlandweite Tätigkeit
  if (istKlein && arbeitsgebiet === 'deutschlandweit') {
    return -15; // Unrealistisch: 1-5 MA können nicht deutschlandweit arbeiten
  }
  
  // Kleine Firma behauptet landesweite Tätigkeit
  if (istKlein && arbeitsgebiet === 'landesweit') {
    return -10; // Überschätzung
  }
  
  // Mittlere Firma (6-10 MA) deutschlandweit
  if (mitarbeiter === '6-10' && arbeitsgebiet === 'deutschlandweit') {
    return -5; // Fragwürdig
  }
  
  return 0;
}

function checkQualifikationenAbzug(versicherung: string, dokumente: string[]): number {
  let abzug = 0;
  
  // Kein Meisterbrief
  if (!dokumente.includes('meisterbrief')) {
    abzug -= 10; // Fehlende Kernqualifikation
  }
  
  // Nicht vollständig versichert
  if (versicherung === 'in_planung') {
    abzug -= 8; // Zu riskant
  } else if (versicherung === 'teilweise') {
    abzug -= 4; // Lücken in der Absicherung
  }
  
  return abzug;
}

function checkReferenzenAbzug(referenzen: any[]): number {
  const gesamtwert = referenzen.reduce((sum, ref) => sum + (ref.value || 0), 0);
  
  if (gesamtwert < 50000) {
    return -15; // Kritisch: Kaum nennenswerte Projekte
  }
  if (gesamtwert < 75000) {
    return -10; // Nur Kleinstprojekte
  }
  if (gesamtwert < 100000) {
    return -5; // Eher kleine Projekte
  }
  
  return 0;
}

// Hauptfunktion für Partner-Scoring
export function calculatePartnerScore(answers: any): PartnerScoreResult {
  // Basis-Scores berechnen
  let baseScore = 0;
  baseScore += SUBSCRIPTION_SCORES[answers.partnerType] || 0;
  baseScore += RECHTSFORM_SCORES[answers.legalForm] || 0;
  baseScore += MITARBEITER_SCORES[answers.employeeCount] || 0;
  baseScore += calculateGruendungsjahrScore(answers.foundedYear);
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
  
  // ABZÜGE berechnen
  let abzuege = 0;
  const jungesFirmaAbzug = checkJungesFirmaAbzug(answers.legalForm, answers.foundedYear, answers.employeeCount);
  const erfahrungAbzug = checkErfahrungAbzug(answers.experience, answers.foundedYear);
  const fokusAbzug = checkFokusAbzug(answers.specialties || [], answers.employeeCount);
  const arbeitsgebietAbzug = checkArbeitsgebietAbzug(answers.workingArea, answers.employeeCount);
  const qualifikationenAbzug = checkQualifikationenAbzug(answers.insuranceStatus, dokumenteArray);
  const referenzenAbzug = checkReferenzenAbzug(answers.references || []);
  
  abzuege = jungesFirmaAbzug + erfahrungAbzug + fokusAbzug + arbeitsgebietAbzug + qualifikationenAbzug + referenzenAbzug;
  
  // Completion Bonus
  const completionBonus = 10;
  
  // Final Score
  const finalScore = Math.max(baseScore + abzuege + completionBonus, 0);
  
  // Kategorisierung
  let category: 'Premium Partner' | 'Standard Partner' | 'Basic Partner' | 'Nicht qualifiziert';
  let action: string;
  let priority: 'high' | 'medium' | 'low' | 'none';
  let responseTime: string;
  let qualified: boolean;
  let nachfrageErforderlich: boolean;
  
  if (finalScore >= 75) {
    category = 'Premium Partner';
    action = 'Bevorzugte Vermittlung + Top-Platzierung';
    priority = 'high';
    responseTime = '24 Stunden';
    qualified = true;
    nachfrageErforderlich = false;
  } else if (finalScore >= 50) {
    category = 'Standard Partner';
    action = 'Reguläre Vermittlung';
    priority = 'medium';
    responseTime = '48 Stunden';
    qualified = true;
    nachfrageErforderlich = false;
  } else if (finalScore >= 30) {
    category = 'Basic Partner';
    action = 'Aufbau-Phase + Training';
    priority = 'low';
    responseTime = '7 Tage';
    qualified = true;
    nachfrageErforderlich = (abzuege < -10);
  } else {
    category = 'Nicht qualifiziert';
    action = 'Bewerbung ablehnen oder Nachfragen stellen';
    priority = 'none';
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
    responseTime,
    qualified,
    nachfrageErforderlich,
    breakdown: {
      subscription: SUBSCRIPTION_SCORES[answers.partnerType] || 0,
      rechtsform: RECHTSFORM_SCORES[answers.legalForm] || 0,
      mitarbeiter: MITARBEITER_SCORES[answers.employeeCount] || 0,
      gruendungsjahr: calculateGruendungsjahrScore(answers.foundedYear),
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
        referenzen: referenzenAbzug
      },
      completionBonus
    }
  };
}
