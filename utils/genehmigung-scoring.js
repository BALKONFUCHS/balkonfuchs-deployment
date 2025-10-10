/**
 * Genehmigungs-Check-Scoring-Logik für Balkonbau-Genehmigungscheck
 * 
 * PHILOSOPHIE:
 * - Funnel für spezifische Genehmigungsprüfung
 * - Ziel: Schnelle Einschätzung der Genehmigungspflicht
 * - Score basiert auf Genehmigungswahrscheinlichkeit und Komplexität
 * - Hot Leads = Genehmigung wahrscheinlich, einfache Umsetzung
 * - Warm Leads = Genehmigung möglich, mittlere Komplexität
 * - Cold Leads = Genehmigung schwierig oder sehr komplex
 */

/**
 * Berechnet den Genehmigungs-Check-Score basierend auf den Antworten
 * @param {Object} answers - Antworten des Benutzers
 * @returns {Object} Score-Ergebnis mit Kategorisierung und Empfehlung
 */
function calculateGenehmigungScore(answers) {
    // Defensive Programmierung: Handle undefined/null values
    if (!answers || typeof answers !== 'object') {
        return getDefaultScore();
    }

    let totalScore = 0;
    const breakdown = {};

    // Frage 1: Bundesland (10-30 Punkte)
    const bundeslandScores = {
        'bayern': 30,              // Sehr balkonfreundlich
        'baden-wuerttemberg': 25,  // Balkonfreundlich
        'nordrhein-westfalen': 20, // Mittlere Genehmigungspraxis
        'hessen': 20,              // Mittlere Genehmigungspraxis
        'niedersachsen': 15,       // Restriktiver
        'sachsen': 15,             // Restriktiver
        'thueringen': 15,          // Restriktiver
        'brandenburg': 10,         // Sehr restriktiv
        'berlin': 10,              // Sehr restriktiv
        'hamburg': 10,             // Sehr restriktiv
        'bremen': 10,              // Sehr restriktiv
        'schleswig-holstein': 10,  // Sehr restriktiv
        'mecklenburg-vorpommern': 10, // Sehr restriktiv
        'sachsen-anhalt': 10,      // Sehr restriktiv
        'rheinland-pfalz': 15,     // Restriktiver
        'saarland': 15             // Restriktiver
    };
    
    const bundeslandScore = bundeslandScores[answers.bundesland] || 10;
    totalScore += bundeslandScore;
    breakdown.bundesland = bundeslandScore;

    // Frage 2: Projekttyp (15-35 Punkte)
    const projekttypScores = {
        'einfamilienhaus': 35,     // Einfachste Genehmigung
        'reihenhaus': 30,          // Einfache Genehmigung
        'doppelhaus': 25,          // Mittlere Genehmigung
        'mehrfamilienhaus': 20,    // Komplexere Genehmigung
        'eigentumswohnung': 15,    // Schwierige Genehmigung (WEG)
        'mietwohnung': 10          // Sehr schwierige Genehmigung
    };
    
    const projekttypScore = projekttypScores[answers.projekttyp] || 15;
    totalScore += projekttypScore;
    breakdown.projekttyp = projekttypScore;

    // Frage 3: Balkongröße (10-25 Punkte)
    const groesseScore = calculateGroesseScore(answers.groesse, answers.tiefe);
    totalScore += groesseScore;
    breakdown.groesse = groesseScore;

    // Frage 4: Grenzabstand (5-20 Punkte)
    const grenzabstandScores = {
        'ueber_5m': 20,            // Optimal
        '3_5m': 15,                // Gut
        'unter_3m': 5              // Problematisch
    };
    
    const grenzabstandScore = grenzabstandScores[answers.grenzabstand] || 5;
    totalScore += grenzabstandScore;
    breakdown.grenzabstand = grenzabstandScore;

    // Genehmigungsstatus-Bonus (0-10 Punkte)
    const genehmigungsstatus = answers.genehmigungsstatus || 'unbekannt';
    const statusBonus = getGenehmigungsstatusBonus(genehmigungsstatus);
    totalScore += statusBonus;
    breakdown.genehmigungsstatus = statusBonus;

    // KATEGORISIERUNG
    let category, action, priority, responseTime, estimatedValue;
    
    if (totalScore >= 80) {
        category = 'Hot Lead';
        action = 'Genehmigung wahrscheinlich - Sofortige Beratung';
        priority = 'high';
        responseTime = '24h';
        estimatedValue = 25000;
    } else if (totalScore >= 60) {
        category = 'Warm Lead';
        action = 'Genehmigung möglich - Detaillierte Prüfung';
        priority = 'medium';
        responseTime = '48h';
        estimatedValue = 20000;
    } else if (totalScore >= 40) {
        category = 'Cold Lead';
        action = 'Genehmigung schwierig - Alternative Lösungen';
        priority = 'low';
        responseTime = '72h';
        estimatedValue = 15000;
    } else {
        category = 'Cold Lead';
        action = 'Genehmigung sehr schwierig - Grundstücksanalyse';
        priority = 'low';
        responseTime = '72h';
        estimatedValue = 10000;
    }

    // Genehmigungswahrscheinlichkeit berechnen
    const genehmigungswahrscheinlichkeit = calculateGenehmigungswahrscheinlichkeit(totalScore);

    return {
        totalScore: totalScore,
        category: category,
        action: action,
        priority: priority,
        responseTime: responseTime,
        estimatedValue: estimatedValue,
        genehmigungswahrscheinlichkeit: genehmigungswahrscheinlichkeit,
        breakdown: breakdown,
        isComplete: isComplete(answers)
    };
}

/**
 * Berechnet Score basierend auf Balkongröße
 * @param {string} groesse - Balkonbreite
 * @param {string} tiefe - Balkontiefe
 * @returns {number} Score (10-25 Punkte)
 */
function calculateGroesseScore(groesse, tiefe) {
    const width = parseFloat(groesse) || 0;
    const depth = parseFloat(tiefe) || 0;
    const area = width * depth;
    
    if (area <= 6) return 25;      // Kleine Balkone = einfache Genehmigung
    if (area <= 12) return 20;     // Mittlere Balkone = normale Genehmigung
    if (area <= 20) return 15;     // Große Balkone = komplexere Genehmigung
    return 10;                     // Sehr große Balkone = schwierige Genehmigung
}

/**
 * Berechnet Bonus basierend auf Genehmigungsstatus
 * @param {string} status - Genehmigungsstatus
 * @returns {number} Bonus (0-10 Punkte)
 */
function getGenehmigungsstatusBonus(status) {
    const statusBonuses = {
        'genehmigungsfrei': 10,    // Beste Voraussetzungen
        'vereinfachtes_verfahren': 8, // Gute Voraussetzungen
        'bauantrag_erforderlich': 5,  // Normale Voraussetzungen
        'bauvoranfrage_empfohlen': 3, // Schwierige Voraussetzungen
        'genehmigung_unwahrscheinlich': 0, // Schlechte Voraussetzungen
        'unbekannt': 0             // Unbekannt
    };
    
    return statusBonuses[status] || 0;
}

/**
 * Berechnet die Genehmigungswahrscheinlichkeit in Prozent
 * @param {number} totalScore - Gesamtscore
 * @returns {number} Wahrscheinlichkeit in Prozent
 */
function calculateGenehmigungswahrscheinlichkeit(totalScore) {
    if (totalScore >= 80) return 85;
    if (totalScore >= 60) return 65;
    if (totalScore >= 40) return 35;
    return 15;
}

/**
 * Prüft, ob alle Fragen beantwortet wurden
 * @param {Object} answers - Antworten des Benutzers
 * @returns {boolean} True wenn alle Fragen beantwortet wurden
 */
function isComplete(answers) {
    if (!answers) return false;
    
    const requiredFields = ['bundesland', 'projekttyp', 'groesse', 'tiefe', 'grenzabstand'];
    
    // Prüfe alle Pflichtfelder
    for (const field of requiredFields) {
        if (!answers[field]) return false;
    }
    
    return true;
}

/**
 * Fallback-Score für unvollständige oder fehlerhafte Daten
 * @returns {Object} Default-Score-Objekt
 */
function getDefaultScore() {
    return {
        totalScore: 0,
        category: 'Cold Lead',
        action: 'Genehmigung sehr schwierig - Grundstücksanalyse',
        priority: 'low',
        responseTime: '72h',
        estimatedValue: 10000,
        genehmigungswahrscheinlichkeit: 15,
        breakdown: {
            bundesland: 0,
            projekttyp: 0,
            groesse: 0,
            grenzabstand: 0,
            genehmigungsstatus: 0
        },
        isComplete: false
    };
}

// ES6 Export für moderne Module
export { calculateGenehmigungScore };

// CommonJS Export für Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateGenehmigungScore };
}
