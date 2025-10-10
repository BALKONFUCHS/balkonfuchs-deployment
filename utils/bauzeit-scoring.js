/**
 * Bauzeitplaner-Scoring-Logik für Balkonbau-Bauzeitplanung
 * 
 * PHILOSOPHIE:
 * - Funnel für Bauzeitplanung und Terminierung
 * - Ziel: Einschätzung der Dringlichkeit und Planungsbereitschaft
 * - Score basiert auf Zeitdruck und Projektfortschritt
 * - Hot Leads = Dringender Terminwunsch, Projekt bereits in Planung
 * - Warm Leads = Mittelfristiger Terminwunsch, Projekt in Vorbereitung
 * - Cold Leads = Langfristiger Terminwunsch, Projekt noch in Ideenphase
 */

/**
 * Berechnet den Bauzeitplaner-Score basierend auf den Antworten
 * @param {Object} answers - Antworten des Benutzers
 * @returns {Object} Score-Ergebnis mit Kategorisierung und Empfehlung
 */
function calculateBauzeitScore(answers) {
    // Defensive Programmierung: Handle undefined/null values
    if (!answers || typeof answers !== 'object') {
        return getDefaultScore();
    }

    let totalScore = 0;
    const breakdown = {};

    // Frage 1: Wunschtermin (20-50 Punkte)
    const wunschterminScore = calculateWunschterminScore(answers.targetMonth, answers.targetYear);
    totalScore += wunschterminScore;
    breakdown.wunschtermin = wunschterminScore;

    // Frage 2: Projektphase (10-40 Punkte)
    const projektphaseScores = {
        'idea': 10,                // Nur Idee - niedrigste Priorität
        'planning': 25,            // In Planung - mittlere Priorität
        'permit': 35,              // Genehmigung läuft - hohe Priorität
        'ready': 40                // Bereit für Umsetzung - höchste Priorität
    };
    
    const projektphaseScore = projektphaseScores[answers.projectPhase] || 10;
    totalScore += projektphaseScore;
    breakdown.projektphase = projektphaseScore;

    // Completion Bonus (5 Punkte)
    const completionBonus = isComplete(answers) ? 5 : 0;
    totalScore += completionBonus;
    breakdown.completionBonus = completionBonus;

    // KATEGORISIERUNG
    let category, action, priority, responseTime, estimatedValue;
    
    if (totalScore >= 70) {
        category = 'Hot Lead';
        action = 'Dringender Terminwunsch - Sofortige Terminvereinbarung';
        priority = 'high';
        responseTime = '24h';
        estimatedValue = 30000;
    } else if (totalScore >= 50) {
        category = 'Warm Lead';
        action = 'Mittelfristiger Terminwunsch - Terminplanung';
        priority = 'medium';
        responseTime = '48h';
        estimatedValue = 25000;
    } else if (totalScore >= 30) {
        category = 'Cold Lead';
        action = 'Langfristiger Terminwunsch - Informationsmaterial';
        priority = 'low';
        responseTime = '72h';
        estimatedValue = 20000;
    } else {
        category = 'Cold Lead';
        action = 'Frühe Ideenphase - Nurturing-Kampagne';
        priority = 'low';
        responseTime = '72h';
        estimatedValue = 15000;
    }

    // Geschätzte Bauzeit berechnen
    const geschaetzteBauzeit = calculateGeschaetzteBauzeit(answers);

    return {
        totalScore: totalScore,
        category: category,
        action: action,
        priority: priority,
        responseTime: responseTime,
        estimatedValue: estimatedValue,
        geschaetzteBauzeit: geschaetzteBauzeit,
        breakdown: breakdown,
        isComplete: isComplete(answers)
    };
}

/**
 * Berechnet Score basierend auf Wunschtermin
 * @param {string} targetMonth - Gewünschter Monat
 * @param {string} targetYear - Gewünschtes Jahr
 * @returns {number} Score (20-50 Punkte)
 */
function calculateWunschterminScore(targetMonth, targetYear) {
    if (!targetMonth || !targetYear) return 20; // Default für unvollständige Daten
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript Monate sind 0-basiert
    
    const targetYearNum = parseInt(targetYear);
    const targetMonthNum = parseInt(targetMonth);
    
    // Berechne Monate bis zum Wunschtermin
    const monthsUntilTarget = (targetYearNum - currentYear) * 12 + (targetMonthNum - currentMonth);
    
    if (monthsUntilTarget <= 3) {
        return 50;      // Sehr dringend (0-3 Monate)
    } else if (monthsUntilTarget <= 6) {
        return 40;      // Dringend (3-6 Monate)
    } else if (monthsUntilTarget <= 12) {
        return 30;      // Mittelfristig (6-12 Monate)
    } else {
        return 20;      // Langfristig (über 12 Monate)
    }
}

/**
 * Berechnet die geschätzte Bauzeit in Wochen
 * @param {Object} answers - Antworten des Benutzers
 * @returns {string} Geschätzte Bauzeit
 */
function calculateGeschaetzteBauzeit(answers) {
    const projektphase = answers.projectPhase || 'idea';
    
    const bauzeiten = {
        'idea': '12-16 Wochen',           // Von Idee bis Fertigstellung
        'planning': '8-12 Wochen',        // Von Planung bis Fertigstellung
        'permit': '4-8 Wochen',           // Von Genehmigung bis Fertigstellung
        'ready': '2-4 Wochen'             // Von Bereitschaft bis Fertigstellung
    };
    
    return bauzeiten[projektphase] || '12-16 Wochen';
}

/**
 * Prüft, ob alle Fragen beantwortet wurden
 * @param {Object} answers - Antworten des Benutzers
 * @returns {boolean} True wenn alle Fragen beantwortet wurden
 */
function isComplete(answers) {
    if (!answers) return false;
    
    const requiredFields = ['targetMonth', 'targetYear', 'projectPhase'];
    
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
        action: 'Frühe Ideenphase - Nurturing-Kampagne',
        priority: 'low',
        responseTime: '72h',
        estimatedValue: 15000,
        geschaetzteBauzeit: '12-16 Wochen',
        breakdown: {
            wunschtermin: 0,
            projektphase: 0,
            completionBonus: 0
        },
        isComplete: false
    };
}

// ES6 Export für moderne Module
export { calculateBauzeitScore };

// CommonJS Export für Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateBauzeitScore };
}
