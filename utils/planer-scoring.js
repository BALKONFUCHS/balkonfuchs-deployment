/**
 * Planer-Scoring-Logik für Balkonbau-Planer
 * 
 * PHILOSOPHIE:
 * - Funnel für mittlere Customer Journey Phase
 * - Ziel: Qualifizierung für Beratungstermine
 * - Besucher haben bereits Engagement gezeigt (12 Fragen!)
 * - Score bestimmt Reaktionsgeschwindigkeit des Vertriebs
 * - Hot Leads (150+) = binnen 24h kontaktieren
 * - Warm Leads (80-149) = binnen 48h
 * - Cold Leads (50-79) = Nurturing mit Info-Material
 */

/**
 * Berechnet den Planer-Score basierend auf den Antworten
 * @param {Object} answers - Antworten des Benutzers
 * @returns {Object} Score-Ergebnis mit Kategorisierung und Beratungs-Empfehlung
 */
function calculatePlanerScore(answers) {
    // Defensive Programmierung: Handle undefined/null values
    if (!answers || typeof answers !== 'object') {
        return getDefaultScore();
    }

    // BLOCK 1: PROJEKT-STATUS (3 Fragen, max. 170 Punkte)
    let block1Score = 0;
    const block1Breakdown = {};

    // Frage 1.1: Aktueller Status (20-90 Punkte)
    const statusScores = {
        'suche_firma': 90,              // Suche nach Umsetzungsfirma
        'genehmigung_da': 80,           // Genehmigung bereits vorhanden
        'bauantrag_laeuft': 60,         // Bauantrag läuft
        'machbarkeit_pruefen': 30,      // Machbarkeit wird geprüft
        'erste_ideen': 20               // Erst am Anfang
    };
    
    const statusScore = statusScores[answers.status] || 0;
    block1Score += statusScore;
    block1Breakdown.status = statusScore;

    // Frage 1.2: Zeitrahmen (10-40 Punkte)
    const zeitrahmenScores = {
        'asap': 40,                     // So schnell wie möglich
        '3_monate': 35,                 // Innerhalb 3 Monate
        '6_monate': 25,                 // Innerhalb 6 Monate
        'unklar': 10                    // Noch unklar
    };
    
    const zeitrahmenScore = zeitrahmenScores[answers.zeitrahmen] || 0;
    block1Score += zeitrahmenScore;
    block1Breakdown.zeitrahmen = zeitrahmenScore;

    // Frage 1.3: Eigentumsverhältnisse (5-40 Punkte)
    const eigentumsScores = {
        'eigentum': 40,                 // Volles Eigentum
        'verwalter': 35,                // Verwaltetes Eigentum
        'eigentuemer_gemeinschaft': 30, // Eigentümergemeinschaft
        'miete': 5                      // Mietverhältnis
    };
    
    const eigentumScore = eigentumsScores[answers.eigentum] || 0;
    block1Score += eigentumScore;
    block1Breakdown.eigentum = eigentumScore;

    // BLOCK 2: TECHNISCHE BASIS (4 Fragen, max. 80 Punkte)
    let block2Score = 0;
    const block2Breakdown = {};

    // Frage 2.1: Balkontyp (12-20 Punkte)
    const balkontypScores = {
        'vorstellbalkon': 20,           // Technisch aufwendig
        'anlehnbalkon': 18,             // Mittlere Komplexität
        'haengebalkon': 15,             // Stützenfrei, komplex
        'hochterrasse': 12              // Am einfachsten
    };
    
    const balkontypScore = balkontypScores[answers.balkontyp] || 0;
    block2Score += balkontypScore;
    block2Breakdown.balkontyp = balkontypScore;

    // Frage 2.2: Außenwand-Material (5-25 Punkte)
    const wandmaterialScores = {
        'mauerwerk': 25,                // Optimal für Verankerung
        'stahlbeton': 25,               // Optimal für Verankerung
        'hlz': 20,                      // Hohlblockstein - gut möglich
        'holzstaender': 10,             // Herausfordernd
        'unbekannt': 5                  // Muss geprüft werden
    };
    
    const wandmaterialScore = wandmaterialScores[answers.wandmaterial] || 0;
    block2Score += wandmaterialScore;
    block2Breakdown.wandmaterial = wandmaterialScore;

    // Frage 2.3: Gebäude unterkellert? (5-15 Punkte)
    const unterkellerungScores = {
        'ja': 15,                       // Wichtig für Statik
        'nein': 10,                     // Ebenfalls möglich
        'unbekannt': 5                  // Muss geprüft werden
    };
    
    const unterkellertScore = unterkellerungScores[answers.unterkellert] || 0;
    block2Score += unterkellertScore;
    block2Breakdown.unterkellert = unterkellertScore;

    // Frage 2.4: Geschoss/Höhe (5-20 Punkte)
    const geschossScores = {
        'eg': 20,                       // Erdgeschoss - einfachster Zugang
        '1_og': 15,                     // 1. Obergeschoss
        '2_og': 10,                     // 2. Obergeschoss
        'hoeher': 5                     // Höher als 2. OG
    };
    
    const geschossScore = geschossScores[answers.geschoss] || 0;
    block2Score += geschossScore;
    block2Breakdown.geschoss = geschossScore;

    // BLOCK 3: PROJEKTUMFANG (3 Fragen, max. 100 Punkte)
    let block3Score = 0;
    const block3Breakdown = {};

    // Frage 3.1: Budget eingeplant (10-40 Punkte)
    const budgetScores = {
        '30k_plus': 40,                 // Über 30.000€
        '20_30k': 35,                   // 20.000-30.000€
        '10_20k': 25,                   // 10.000-20.000€
        'unklar': 15,                   // Noch unklar
        'bis_10k': 10                   // Unter 10.000€ (oft unrealistisch)
    };
    
    const budgetScore = budgetScores[answers.budget] || 0;
    block3Score += budgetScore;
    block3Breakdown.budget = budgetScore;

    // Frage 3.2: Balkongröße in m² (10-40 Punkte) - Dynamische Berechnung
    const balkongroesseScore = calculateBalkongroesseScore(answers.balkongroesse_qm);
    block3Score += balkongroesseScore;
    block3Breakdown.balkongroesse = balkongroesseScore;

    // Frage 3.3: Befahrbarkeit Baustelle (5-20 Punkte)
    const befahrbarkeitScores = {
        'gut': 20,                      // Gut befahrbar
        'eingeschraenkt': 15,           // Eingeschränkt befahrbar
        'schwer': 10,                   // Schwer befahrbar
        'nicht': 5                      // Nicht befahrbar
    };
    
    const befahrbarkeitScore = befahrbarkeitScores[answers.befahrbarkeit] || 0;
    block3Score += befahrbarkeitScore;
    block3Breakdown.befahrbarkeit = befahrbarkeitScore;

    // BLOCK 4: SERVICE & KONTAKT (2 Fragen, max. 95 Punkte)
    let block4Score = 0;
    const block4Breakdown = {};

    // Frage 4.1: Benötigte Unterlagen (-5 bis +70 Punkte) - Mehrfachauswahl
    const unterlagenScores = {
        'planung': 25,                  // Planung vorhanden/gewünscht
        'genehmigung': 20,              // Genehmigung vorhanden/gewünscht
        'statik': 15,                   // Statik vorhanden/gewünscht
        'grundriss': 10,                // Grundriss vorhanden
        'keine': -5                     // Keine Unterlagen (Negativ!)
    };
    
    let unterlagenScore = 0;
    if (Array.isArray(answers.unterlagen)) {
        answers.unterlagen.forEach(unterlage => {
            unterlagenScore += unterlagenScores[unterlage] || 0;
        });
    }
    block4Score += unterlagenScore;
    block4Breakdown.unterlagen = unterlagenScore;

    // Frage 4.2: Support & Beratung gewünscht (25 Punkte)
    const supportScore = answers.support === true ? 25 : 0;
    block4Score += supportScore;
    block4Breakdown.support = supportScore;

    // COMPLETION BONUS (8 Punkte)
    // Wird NUR vergeben, wenn alle 12 Fragen beantwortet wurden
    const completionBonus = isComplete(answers) ? 8 : 0;
    
    // Gesamt-Score berechnen
    const baseScore = block1Score + block2Score + block3Score + block4Score;
    const rawScore = baseScore + completionBonus;
    
    // Score auf 0-100 Skala normalisieren (maximaler theoretischer Score: ~450)
    // Berechne Max-Score basierend auf allen möglichen Punkten
    const maxPossibleScore = 170 + 100 + 100 + 95 + 8; // Summe aller max Punkte
    const normalizedScore = Math.round((rawScore / maxPossibleScore) * 100);
    const finalScore = Math.min(normalizedScore, 100); // Cap bei 100

    // KATEGORISIERUNG (auf Basis von 0-100 Skala)
    let category, action, priority, responseTime;
    
    if (finalScore >= 70) {
        category = 'Hot Lead';
        action = 'Beratungstermin binnen 24h + Prioritäts-Betreuung';
        priority = 'high';
        responseTime = '24h';
    } else if (finalScore >= 40) {
        category = 'Warm Lead';
        action = 'Rückruf binnen 48h + Planungsunterlagen';
        priority = 'medium';
        responseTime = '48h';
    } else if (finalScore >= 20) {
        category = 'Cold Lead';
        action = 'Newsletter + Informationsmaterial';
        priority = 'low';
        responseTime = '72h';
    } else {
        // Fallback für unerwartete Scores
        category = 'Cold Lead';
        action = 'Newsletter + Informationsmaterial';
        priority = 'low';
        responseTime = '72h';
    }

    // Geschätzter Auftragswert (optional)
    const estimatedValue = estimatePlanerProjectValue(answers);

    // Beratungs-Readiness (optional)
    const beratungsReadiness = getBeratungsReadiness(answers);

    // Detail-Breakdown zusammenstellen
    const breakdown = {
        ...block1Breakdown,
        ...block2Breakdown,
        ...block3Breakdown,
        ...block4Breakdown,
        completionBonus: completionBonus
    };

    return {
        block1Score: block1Score,
        block2Score: block2Score,
        block3Score: block3Score,
        block4Score: block4Score,
        baseScore: baseScore,
        completionBonus: completionBonus,
        finalScore: finalScore,
        category: category,
        action: action,
        priority: priority,
        responseTime: responseTime,
        estimatedValue: estimatedValue,
        beratungsReadiness: beratungsReadiness,
        breakdown: breakdown,
        isComplete: isComplete(answers)
    };
}

/**
 * Berechnet Balkongröße-Score basierend auf Quadratmetern
 * @param {number} sqm - Quadratmeter
 * @returns {number} Score (10-40 Punkte)
 */
function calculateBalkongroesseScore(sqm) {
    if (!sqm || typeof sqm !== 'number') return 0;
    
    if (sqm >= 25) return 40;       // Über 25m²
    if (sqm >= 15) return 30;       // 15-25m²
    if (sqm >= 8) return 20;        // 8-15m²
    return 10;                      // Unter 8m²
}

/**
 * Prüft, ob alle 12 Fragen beantwortet wurden
 * @param {Object} answers - Antworten des Benutzers
 * @returns {boolean} True wenn alle Fragen beantwortet wurden
 */
function isComplete(answers) {
    if (!answers) return false;
    
    const requiredFields = [
        'status', 'zeitrahmen', 'eigentum',           // Block 1
        'balkontyp', 'wandmaterial', 'unterkellert', 'geschoss', // Block 2
        'budget', 'balkongroesse_qm', 'befahrbarkeit', // Block 3
        'support' // Block 4 (unterlagen ist optional, kann leeres Array sein)
    ];
    
    // Prüfe alle Pflichtfelder
    for (const field of requiredFields) {
        if (answers[field] === undefined || answers[field] === null || answers[field] === '') {
            return false;
        }
    }
    
    // Unterlagen ist optional (kann leeres Array sein)
    if (!Array.isArray(answers.unterlagen)) return false;
    
    return true;
}

/**
 * Schätzt den ungefähren Auftragswert basierend auf den Antworten
 * @param {Object} answers - Antworten des Benutzers
 * @returns {number} Geschätzter Auftragswert in €
 */
function estimatePlanerProjectValue(answers) {
    if (!answers) return 20000; // Default-Wert höher als Kalkulator
    
    let baseValue = 15000;  // Basis höher als Kalkulator
    
    // Status-Basis
    if (answers.status === 'suche_firma') baseValue = 25000;
    else if (answers.status === 'genehmigung_da') baseValue = 22000;
    else if (answers.status === 'bauantrag_laeuft') baseValue = 20000;
    
    // Balkontyp
    const typeMultipliers = {
        'vorstellbalkon': 1.3,
        'anlehnbalkon': 1.2,
        'haengebalkon': 1.4,
        'hochterrasse': 1.0
    };
    baseValue *= typeMultipliers[answers.balkontyp] || 1.0;
    
    // Größe direkt verwenden
    if (answers.balkongroesse_qm && typeof answers.balkongroesse_qm === 'number') {
        baseValue += answers.balkongroesse_qm * 800;  // 800€ pro m²
    }
    
    // Budget-Validierung
    if (answers.budget === '30k_plus') return Math.max(baseValue, 30000);
    if (answers.budget === '20_30k') return Math.min(Math.max(baseValue, 20000), 30000);
    if (answers.budget === '10_20k') return Math.min(Math.max(baseValue, 10000), 20000);
    if (answers.budget === 'bis_10k') return Math.min(baseValue, 10000);
    
    return Math.round(baseValue);
}

/**
 * Ermittelt die Beratungs-Readiness
 * @param {Object} answers - Antworten des Benutzers
 * @returns {string} Beratungs-Readiness-Level
 */
function getBeratungsReadiness(answers) {
    if (!answers) return 'vorbereitung_noetig';
    
    let readiness = 0;
    
    // Sehr bereit (3 Punkte je):
    if (answers.status === 'suche_firma') readiness += 3;
    if (answers.zeitrahmen === 'asap') readiness += 3;
    if (Array.isArray(answers.unterlagen) && answers.unterlagen.length >= 3) readiness += 3;
    if (answers.support === true) readiness += 3;
    
    // Mittel bereit (2 Punkte je):
    if (answers.budget && answers.budget !== 'unklar') readiness += 2;
    if (answers.wandmaterial && answers.wandmaterial !== 'unbekannt') readiness += 2;
    
    if (readiness >= 10) return 'sehr_bereit';
    if (readiness >= 6) return 'bereit';
    return 'vorbereitung_noetig';
}

/**
 * Fallback-Score für unvollständige oder fehlerhafte Daten
 * @returns {Object} Default-Score-Objekt
 */
function getDefaultScore() {
    return {
        block1Score: 0,
        block2Score: 0,
        block3Score: 0,
        block4Score: 0,
        baseScore: 0,
        completionBonus: 0,
        finalScore: 0,
        category: 'Cold Lead',
        action: 'Newsletter + Informationsmaterial',
        priority: 'low',
        responseTime: '72h',
        estimatedValue: 20000,
        beratungsReadiness: 'vorbereitung_noetig',
        breakdown: {
            status: 0, zeitrahmen: 0, eigentum: 0,
            balkontyp: 0, wandmaterial: 0, unterkellert: 0, geschoss: 0,
            budget: 0, balkongroesse: 0, befahrbarkeit: 0,
            unterlagen: 0, support: 0, completionBonus: 0
        },
        isComplete: false
    };
}

// ES6 Export für moderne Module
export { calculatePlanerScore };

// CommonJS Export für Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculatePlanerScore };
}
