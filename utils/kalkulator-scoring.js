/**
 * Kalkulator-Scoring-Logik für Balkonbau-Kalkulator
 * 
 * PHILOSOPHIE:
 * - Funnel für frühe Customer Journey Phase
 * - Ziel: E-Mail-Erfassung für Nurturing
 * - Alle Leads sind wertvoll (auch Ice Cold)
 * - Score dient nur zur Nurturing-Priorisierung
 * - Kein Negativ-Scoring, nur positive Punktevergabe
 */

/**
 * Berechnet den Kalkulator-Score basierend auf den Antworten
 * @param {Object} answers - Antworten des Benutzers
 * @returns {Object} Score-Ergebnis mit Kategorisierung und Nurturing-Empfehlung
 */
function calculateKalkulatorScore(answers) {
    // Defensive Programmierung: Handle undefined/null values
    if (!answers || typeof answers !== 'object') {
        return getDefaultScore();
    }

    // BASIS-SCORE BERECHNUNG (5 Fragen)
    let baseScore = 0;
    const breakdown = {};

    // Frage 1: Balkontyp (2-5 Punkte)
    const balkontypScores = {
        'haengebalkon': 5,      // Stützenfrei, technisch anspruchsvoll
        'anlehnbalkon': 4,      // 2 Stützen
        'vorstellbalkon': 3,    // 4+ Stützen
        'hochterrasse': 2       // Einfachste Variante
    };
    
    const balkontypScore = balkontypScores[answers.balkontyp] || 0;
    baseScore += balkontypScore;
    breakdown.balkontyp = balkontypScore;

    // Frage 2: Balkongröße (2-7 Punkte)
    const balkongroesseScores = {
        'sehr_gross': 7,        // Über 18m²
        'gross': 5,             // 12-18m² (ca. 3x6m)
        'mittel': 3,            // 6-12m² (ca. 3x4m)
        'klein': 2              // Bis 6m² (ca. 2x3m)
    };
    
    const balkongroesseScore = balkongroesseScores[answers.balkongroesse] || 0;
    baseScore += balkongroesseScore;
    breakdown.balkongroesse = balkongroesseScore;

    // Frage 3: Anzahl & Etagen (2-8 Punkte)
    const anzahlScores = {
        'mehrere_separate': 8,  // Mehrere separate Balkone
        '2_plus': 6,            // 2+ Balkone übereinander
        '1_og': 3,              // 1 Balkon, 1. Stock
        '1_eg': 2               // 1 Balkon, Erdgeschoss
    };
    
    const anzahlScore = anzahlScores[answers.anzahl_etagen] || 0;
    baseScore += anzahlScore;
    breakdown.anzahl_etagen = anzahlScore;

    // Frage 4: Zusatzleistungen (0-8 Punkte) - Mehrfachauswahl möglich!
    const zusatzleistungenScores = {
        'balkontuer': 2,        // Neue Balkontür
        'treppe': 2,            // Außentreppe/Zugang
        'genehmigung': 2,       // Genehmigungsplanung
        'komplettservice': 2    // Komplettservice
    };
    
    let zusatzleistungenScore = 0;
    if (Array.isArray(answers.zusatzleistungen)) {
        answers.zusatzleistungen.forEach(extra => {
            zusatzleistungenScore += zusatzleistungenScores[extra] || 0;
        });
    }
    baseScore += zusatzleistungenScore;
    breakdown.zusatzleistungen = zusatzleistungenScore;

    // Frage 5: Newsletter Opt-in (1-3 Punkte)
    const newsletterScores = {
        'ja': 3,                // Ja, Tipps erhalten
        'nein': 1               // Nein, nur Preisschätzung
    };
    
    const newsletterScore = newsletterScores[answers.newsletter] || 0;
    baseScore += newsletterScore;
    breakdown.newsletter = newsletterScore;

    // COMPLETION BONUS (5 Punkte)
    // Wird NUR vergeben, wenn alle 5 Fragen beantwortet wurden
    const completionBonus = isComplete(answers) ? 5 : 0;
    const finalScore = baseScore + completionBonus;
    breakdown.completionBonus = completionBonus;

    // LEAD-KATEGORISIERUNG
    let category, action, nurturingSequence, priority;
    
    if (finalScore >= 30 && finalScore <= 40) {
        category = 'Cold Lead';
        action = 'Newsletter + Informationsmaterial';
        nurturingSequence = 'standard-nurturing';
        priority = 'medium';
    } else if (finalScore >= 14 && finalScore <= 29) {
        category = 'Ice Cold Lead';
        action = 'Nurturing-Kampagne';
        nurturingSequence = 'long-term-nurturing';
        priority = 'low';
    } else {
        // Fallback für unerwartete Scores
        category = 'Ice Cold Lead';
        action = 'Nurturing-Kampagne';
        nurturingSequence = 'long-term-nurturing';
        priority = 'low';
    }

    // Geschätzter Auftragswert (optional)
    const estimatedValue = estimateProjectValue(answers);

    // Nurturing-Sequenz-Details
    const nurturingDetails = getNurturingSequence(finalScore, answers);

    return {
        baseScore: baseScore,
        completionBonus: completionBonus,
        finalScore: finalScore,
        category: category,
        action: action,
        nurturingSequence: nurturingSequence,
        priority: priority,
        estimatedValue: estimatedValue,
        breakdown: breakdown,
        nurturingDetails: nurturingDetails,
        isComplete: isComplete(answers)
    };
}

/**
 * Prüft, ob alle 5 Fragen beantwortet wurden
 * @param {Object} answers - Antworten des Benutzers
 * @returns {boolean} True wenn alle Fragen beantwortet wurden
 */
function isComplete(answers) {
    if (!answers) return false;
    
    const requiredFields = ['balkontyp', 'balkongroesse', 'anzahl_etagen', 'newsletter'];
    
    // Prüfe alle Pflichtfelder
    for (const field of requiredFields) {
        if (!answers[field]) return false;
    }
    
    // Zusatzleistungen ist optional (kann leeres Array sein)
    if (!Array.isArray(answers.zusatzleistungen)) return false;
    
    return true;
}

/**
 * Schätzt den ungefähren Auftragswert basierend auf den Antworten
 * @param {Object} answers - Antworten des Benutzers
 * @returns {number} Geschätzter Auftragswert in €
 */
function estimateProjectValue(answers) {
    if (!answers) return 12000; // Default-Wert
    
    let baseValue = 0;
    
    // Balkontyp Basis
    const typeValues = {
        'haengebalkon': 15000,
        'vorstellbalkon': 12000,
        'anlehnbalkon': 13000,
        'hochterrasse': 10000
    };
    baseValue = typeValues[answers.balkontyp] || 12000;
    
    // Größe Multiplikator
    const sizeMultipliers = {
        'sehr_gross': 1.8,
        'gross': 1.4,
        'mittel': 1.0,
        'klein': 0.7
    };
    baseValue *= sizeMultipliers[answers.balkongroesse] || 1.0;
    
    // Anzahl Multiplikator
    const anzahlMultipliers = {
        'mehrere_separate': 3.0,
        '2_plus': 2.0,
        '1_og': 1.0,
        '1_eg': 0.9
    };
    baseValue *= anzahlMultipliers[answers.anzahl_etagen] || 1.0;
    
    // Zusatzleistungen addieren
    const extraCosts = {
        'balkontuer': 2000,
        'treppe': 3000,
        'genehmigung': 1500,
        'komplettservice': 2500
    };
    
    if (Array.isArray(answers.zusatzleistungen)) {
        answers.zusatzleistungen.forEach(extra => {
            baseValue += extraCosts[extra] || 0;
        });
    }
    
    return Math.round(baseValue);
}

/**
 * Generiert detaillierte Nurturing-Sequenz-Empfehlung
 * @param {number} finalScore - Finaler Score
 * @param {Object} answers - Antworten des Benutzers
 * @returns {Object} Nurturing-Sequenz-Details
 */
function getNurturingSequence(finalScore, answers) {
    // Cold Lead (30-40): Intensiveres Nurturing
    if (finalScore >= 30) {
        return {
            sequence: 'standard-nurturing',
            emails: [
                { day: 0, template: 'welcome-kalkulator', subject: 'Willkommen bei BALKONFUCHS' },
                { day: 2, template: 'project-ideas', subject: 'Ideen für Ihr Balkonprojekt' },
                { day: 7, template: 'case-studies', subject: 'Erfolgreiche Balkonprojekte' },
                { day: 14, template: 'planning-guide', subject: 'Planungsleitfaden für Ihren Balkon' },
                { day: 30, template: 'special-offer', subject: 'Exklusives Angebot für Sie' }
            ],
            followUp: 'monthly-newsletter',
            description: 'Intensives Nurturing mit wöchentlichen E-Mails und monatlichem Newsletter'
        };
    }
    
    // Ice Cold Lead (14-29): Langfristiges Nurturing
    else {
        return {
            sequence: 'long-term-nurturing',
            emails: [
                { day: 0, template: 'welcome-kalkulator', subject: 'Willkommen bei BALKONFUCHS' },
                { day: 7, template: 'inspiration-ideas', subject: 'Inspiration für Ihren Balkon' },
                { day: 30, template: 'educational-content', subject: 'Wissenswertes zum Balkonbau' },
                { day: 60, template: 'success-stories', subject: 'Erfolgsgeschichten unserer Kunden' },
                { day: 90, template: 'check-in', subject: 'Wie läuft Ihr Balkonprojekt?' }
            ],
            followUp: 'quarterly-newsletter',
            description: 'Langfristiges Nurturing mit monatlichen E-Mails und vierteljährlichem Newsletter'
        };
    }
}

/**
 * Fallback-Score für unvollständige oder fehlerhafte Daten
 * @returns {Object} Default-Score-Objekt
 */
function getDefaultScore() {
    return {
        baseScore: 0,
        completionBonus: 0,
        finalScore: 0,
        category: 'Ice Cold Lead',
        action: 'Nurturing-Kampagne',
        nurturingSequence: 'long-term-nurturing',
        priority: 'low',
        estimatedValue: 12000,
        breakdown: {
            balkontyp: 0,
            balkongroesse: 0,
            anzahl_etagen: 0,
            zusatzleistungen: 0,
            newsletter: 0,
            completionBonus: 0
        },
        nurturingDetails: getNurturingSequence(0, {}),
        isComplete: false
    };
}

// ES6 Export für moderne Module
export { calculateKalkulatorScore };

// CommonJS Export für Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateKalkulatorScore };
}
