/**
 * Partner-Scoring-System: Hybrid-Ansatz
 * 
 * Prinzip: Final Score = Basis-Score × Qualitäts-Multiplikator
 * - Basis-Score: Positive Bewertung (0-100 Punkte)
 * - Qualitäts-Multiplikator: Negativ-Faktoren reduzieren Score (0.0 - 1.0)
 */

/**
 * Hauptfunktion: Partner-Score berechnen
 * @param {Object} answers - Antworten des Bewerbers
 * @returns {Object} Score-Ergebnis mit Kategorisierung
 */
function calculatePartnerScore(answers) {
    // Defensive Programmierung: Handle undefined/null values
    if (!answers) {
        return getDefaultScore('Fehler: Keine Antworten erhalten');
    }

    // 1. BASIS-SCORE BERECHNUNG (Positive Bewertung)
    const baseScore = calculateBaseScore(answers);
    
    // 2. QUALITÄTS-MULTIPLIKATOR BERECHNUNG (Negativ-Faktoren)
    const { qualityMultiplier, warnings } = calculateQualityMultiplier(answers);
    
    // 3. FINAL SCORE BERECHNUNG
    const finalScore = Math.round(baseScore * qualityMultiplier);
    
    // 4. KATEGORISIERUNG
    const { category, status, action } = categorizeScore(finalScore);
    
    return {
        baseScore,
        qualityMultiplier: Math.round(qualityMultiplier * 1000) / 1000, // 3 Dezimalstellen
        finalScore,
        category,
        status,
        action,
        warnings
    };
}

/**
 * 1. BASIS-SCORE BERECHNUNG (0-100 Punkte)
 */
function calculateBaseScore(answers) {
    let score = 0;
    
    // Frage 1: Firmierung (5-15 Punkte)
    const firmierungScores = {
        'gmbh': 15,
        'gbr': 12,
        'einzelunternehmen': 10,
        'ug': 5  // ⚠️ Negativ-Flag
    };
    score += firmierungScores[answers.firmierung] || 0;
    
    // Frage 2: Marktpräsenz (2-15 Punkte)
    const marktScores = {
        '10plus': 15,
        '5_10': 12,
        '3_5': 8,
        '2_3': 5,
        'unter2': 2  // ⚠️ Negativ-Flag
    };
    score += marktScores[answers.marktpraesenz] || 0;
    
    // Frage 3: Mitarbeiterzahl (3-15 Punkte)
    const mitarbeiterScores = {
        '20plus': 15,
        '10_20': 13,
        '5_10': 10,
        '3_5': 7,
        '2': 3  // ⚠️ Negativ-Flag
    };
    score += mitarbeiterScores[answers.mitarbeiterzahl] || 0;
    
    // Frage 4: Versicherungsschutz (0-20 Punkte)
    const versicherungScores = {
        'vollstaendig': 20,        // Vollständig versichert
        'teilweise': 10,           // Teilweise versichert ⚠️ Negativ-Flag
        'in_vorbereitung': 5       // Versicherung in Vorbereitung ⚠️ Negativ-Flag
    };
    score += versicherungScores[answers.versicherung] || 0;
    
    // Frage 5: Meisterbrief (0-15 Punkte)
    if (answers.meisterbrief && answers.meisterbrief.includes('meisterbrief')) {
        score += 15;
    } else if (answers.meisterbrief && answers.meisterbrief.length > 0) {
        score += 5; // Andere Qualifikationen
    }
    // ⚠️ Negativ-Flag wenn Meisterbrief fehlt
    
    // Frage 6: Leistungsumfang (0-10 Punkte)
    const leistungScores = {
        'planung': 3,
        'fertigung': 3,
        'montage': 2,
        'genehmigung': 2
    };
    if (answers.leistungen && Array.isArray(answers.leistungen)) {
        answers.leistungen.forEach(leistung => {
            score += leistungScores[leistung] || 0;
        });
    }
    
    // Frage 7: Einsatzgebiet (2-10 Punkte)
    const einsatzgebietScores = {
        'lokal': 10,           // 50km Radius
        'regional': 8,          // Bundesland
        'ueberregional': 5,     // Mehrere Bundesländer
        'deutschlandweit': 2    // ⚠️ Negativ-Flag bei kleiner Firma
    };
    score += einsatzgebietScores[answers.einsatzgebiet] || 0;
    
    // Referenzen: Gesamtsumme aller 3 Projekte (0-20 Punkte)
    const referenzGesamt = calculateReferenzGesamt(answers.referenzen);
    score += getReferenzScore(referenzGesamt);
    
    // Maximaler Basis-Score: 100 Punkte
    return Math.min(score, 100);
}

/**
 * Referenz-Gesamtsumme berechnen
 */
function calculateReferenzGesamt(referenzen) {
    if (!referenzen || !Array.isArray(referenzen)) {
        return 0;
    }
    
    return referenzen.reduce((sum, ref) => {
        const value = parseFloat(ref) || 0;
        return sum + value;
    }, 0);
}

/**
 * Referenz-Score basierend auf Gesamtsumme
 */
function getReferenzScore(referenzGesamt) {
    if (referenzGesamt >= 150000) return 20;
    if (referenzGesamt >= 100000) return 15;
    if (referenzGesamt >= 50000) return 10;
    return 0;  // ⚠️ Negativ-Flag
}

/**
 * 2. QUALITÄTS-MULTIPLIKATOR BERECHNUNG (Negativ-Faktoren)
 */
function calculateQualityMultiplier(answers) {
    let qualityMultiplier = 1.0;
    const warnings = [];
    
    // Multiplikator 1: UG-Firmierung (Schweregrad: LEICHT)
    if (answers.firmierung === 'ug') {
        qualityMultiplier *= 0.85;  // -15%
        warnings.push('UG-Firmierung (-15%)');
    }
    
    // Multiplikator 2: Versicherungsschutz unvollständig (Schweregrad: SCHWER)
    if (answers.versicherung === 'teilweise') {
        qualityMultiplier *= 0.6;  // -40%
        warnings.push('Versicherungsschutz nur teilweise (-40%)');
    } else if (answers.versicherung === 'in_vorbereitung') {
        qualityMultiplier *= 0.4;  // -60%
        warnings.push('Versicherung in Vorbereitung (-60%)');
    }
    
    // Multiplikator 3: Jung & Klein (KOMBINATION!) (Schweregrad: SCHWER)
    if (answers.marktpraesenz === 'unter2' && answers.mitarbeiterzahl === '2') {
        qualityMultiplier *= 0.5;  // -50%
        warnings.push('Jung am Markt + Kleine Mannschaft (-50%)');
    }
    
    // Multiplikator 4: Kein Meisterbrief (Schweregrad: MITTEL)
    if (!answers.meisterbrief || !answers.meisterbrief.includes('meisterbrief')) {
        qualityMultiplier *= 0.7;  // -30%
        warnings.push('Kein Meisterbrief angegeben (-30%)');
    }
    
    // Multiplikator 5: Überschätzung (KOMBINATION!) (Schweregrad: MITTEL)
    const kleineFirma = ['2', '3_5'].includes(answers.mitarbeiterzahl);
    const grosserRadius = answers.einsatzgebiet === 'deutschlandweit';
    
    if (kleineFirma && grosserRadius) {
        qualityMultiplier *= 0.7;  // -30%
        warnings.push('Unrealistische Reichweite für Teamgröße (-30%)');
    }
    
    // Multiplikator 6: Referenzen zu gering (Schweregrad: MITTEL)
    const referenzGesamt = calculateReferenzGesamt(answers.referenzen);
    if (referenzGesamt < 50000) {
        qualityMultiplier *= 0.7;  // -30%
        warnings.push('Referenz-Projektsumme unter 50.000€ (-30%)');
    }
    
    return { qualityMultiplier, warnings };
}

/**
 * 3. KATEGORISIERUNG BASIEREND AUF FINAL SCORE
 */
function categorizeScore(finalScore) {
    if (finalScore >= 80) {
        return {
            category: 'Premium Partner',
            status: 'approved',
            action: 'Sofortige Freigabe + Onboarding-Call vereinbaren'
        };
    } else if (finalScore >= 60) {
        return {
            category: 'Standard Partner',
            status: 'approved',
            action: 'Freigabe + Standard-Onboarding'
        };
    } else if (finalScore >= 40) {
        return {
            category: 'Review erforderlich',
            status: 'review',
            action: 'Manuelle Prüfung + Rückfragen an Bewerber'
        };
    } else if (finalScore >= 25) {
        return {
            category: 'Bedingte Zulassung',
            status: 'conditional',
            action: 'Probeauftrag + engmaschige Begleitung'
        };
    } else {
        return {
            category: 'Nicht qualifiziert',
            status: 'rejected',
            action: 'Ablehnung mit Hinweisen zur Verbesserung'
        };
    }
}

/**
 * Default-Score bei Fehlern
 */
function getDefaultScore(errorMessage) {
    return {
        baseScore: 0,
        qualityMultiplier: 0,
        finalScore: 0,
        category: 'Fehler',
        status: 'error',
        action: errorMessage,
        warnings: [errorMessage]
    };
}

/**
 * TESTFÄLLE - Für Entwicklung und Validierung
 */

// Test 1: Premium Partner (Score ~95)
const testPremiumPartner = {
    firmierung: 'gmbh',
    marktpraesenz: '10plus',
    mitarbeiterzahl: '20plus',
    versicherung: 'vollstaendig',
    meisterbrief: ['meisterbrief'],
    leistungen: ['planung', 'fertigung', 'montage', 'genehmigung'],
    einsatzgebiet: 'regional',
    referenzen: [50000, 50000, 50000]
};

// Test 2: Stark reduziert wegen Versicherung (Score ~40)
const testVersicherungProblem = {
    firmierung: 'gmbh',
    marktpraesenz: '5_10',
    mitarbeiterzahl: '10_20',
    versicherung: 'teilweise',  // -40% Multiplikator!
    meisterbrief: ['meisterbrief'],
    leistungen: ['fertigung', 'montage'],
    einsatzgebiet: 'regional',
    referenzen: [30000, 30000, 30000]
};

// Test 3: Nicht qualifiziert - Alle Negativ-Faktoren (Score ~2)
const testAlleNegativFaktoren = {
    firmierung: 'ug',
    marktpraesenz: 'unter2',
    mitarbeiterzahl: '2',
    versicherung: 'in_vorbereitung',  // -60% Multiplikator!
    meisterbrief: ['andere_quali'],   // Kein Meisterbrief
    leistungen: ['montage'],
    einsatzgebiet: 'deutschlandweit', // Überschätzung!
    referenzen: [10000, 10000, 10000] // Zu gering
};

// Export für Node.js/CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculatePartnerScore,
        testPremiumPartner,
        testVersicherungProblem,
        testAlleNegativFaktoren
    };
}

// Export für Browser/ES6
if (typeof window !== 'undefined') {
    window.calculatePartnerScore = calculatePartnerScore;
    window.partnerScoringTests = {
        testPremiumPartner,
        testVersicherungProblem,
        testAlleNegativFaktoren
    };
}

// ES6 Export für Next.js/TypeScript
export { calculatePartnerScore };
