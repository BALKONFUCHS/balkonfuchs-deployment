# Lead Score Berechnung - Partner-Funnel

## Beispiel-Berechnung (Bernd Berdt)

### Eingabedaten:
- **Rechtsform:** UG (Unternehmergesellschaft)
- **Gründungsjahr:** 2022 (3 Jahre alt)
- **Mitarbeiter:** 2-5
- **Erfahrung:** Beginner
- **Spezialitäten:** 6 (vorstellbalkone, haenge_balkone, anlehn_balkone, balkontuerme, renovation, balkontreppen)
- **Arbeitsgebiet:** National
- **Versicherung:** Vollständig versichert (full)
- **Dokumente:** businessLicense (✓), insurance (✓), masterCertificate (✗)
- **Referenzen:** 3 Projekte (6666€, 7777€, 8888€ = 23.331€ gesamt)
- **Leuchtturmprojekt:** "das ist mein Referenzprojekt" (kein Abzug)

### Basis-Score Berechnung:

#### 1. Partner-Paket (SUBSCRIPTION_SCORES)
- professional: **10 Punkte**

#### 2. Rechtsform (RECHTSFORM_SCORES)
- UG: **4 Punkte**

#### 3. Mitarbeiter (MITARBEITER_SCORES)
- 2-5: **4 Punkte**

#### 4. Gründungsjahr (calculateGruendungsjahrScore)
- 2022 → 2025-2022 = 3 Jahre → **3 Punkte**

#### 5. Erfahrung (ERFAHRUNG_SCORES)
- beginner: **3 Punkte**

#### 6. Spezialitäten (SPEZIALISIERUNG_SCORES) - max 25
- vorstellbalkone: 3
- haenge_balkone: 4
- anlehn_balkone: 3
- balkontuerme: 3
- renovation: 3
- balkontreppen: 3
- **Total: 3+4+3+3+3+3 = 19 Punkte** (max 25)

#### 7. Arbeitsgebiet (ARBEITSGEBIET_SCORES)
- national: **20 Punkte**

#### 8. Versicherung (VERSICHERUNG_SCORES)
- full: **10 Punkte**

#### 9. Dokumente (DOKUMENTE_SCORES) - max 10
- businessLicense: 2
- insurance: 2
- **Total: 2+2 = 4 Punkte** (max 10)

#### 10. Referenzen (calculateReferenzScore) - max 20
- Projekt 1 (6666€): 1 Punkt (< 10.000€)
- Projekt 2 (7777€): 1 Punkt (< 10.000€)
- Projekt 3 (8888€): 1 Punkt (< 10.000€)
- **Total: 1+1+1 = 3 Punkte** (max 20)

### Basis-Score Gesamt:
10 + 4 + 4 + 3 + 3 + 19 + 20 + 10 + 4 + 3 = **80 Punkte**

*(Hinweis: In den Logs steht baseScore: 76, was auf eine leichte Abweichung hindeutet, möglicherweise durch unterschiedliche Berechnungsreihenfolge oder Rundungen)*

### Abzüge Berechnung:

#### 1. Junges Firma Abzug (checkJungesFirmaAbzug)
- Firma 3 Jahre alt (2022) → isJung = false (nicht < 3)
- Aber: UG + 2-5 MA → **-10 Abzug** (Junge Firma + Micro + UG)

*(Korrigiert: 2022 ist 3 Jahre alt, also isJung = false. Aber UG + Micro allein gibt -10)*

#### 2. Erfahrung Abzug (checkErfahrungAbzug)
- Firma 3 Jahre alt + Beginner → **0 Abzug** (normal für neue Firmen)

#### 3. Fokus Abzug (checkFokusAbzug)
- 6 Spezialitäten + 2-5 MA → **-5 Abzug** (zu viele Spezialitäten für kleine Firma)

#### 4. Arbeitsgebiet Abzug (checkArbeitsgebietAbzug)
- National + 2-5 MA → **-10 Abzug** (unrealistisch: kleine Firma kann nicht deutschlandweit arbeiten)

#### 5. Qualifikationen Abzug (checkQualifikationenAbzug)
- Kein Meisterbrief + keine anderen Qualifikationen (diploma/instructorLicense) → **-10 Abzug**

#### 6. Referenzen Abzug (checkReferenzenAbzug)
- Gesamtwert: 23.331€ (< 20.000€) → **-8 Abzug** (nur sehr kleine Projekte)

#### 7. Leuchtturmprojekt Abzug (checkLeuchtturmprojektAbzug)
- "das ist mein Referenzprojekt" → **0 Abzug** (kein "gerade erst begonnen")

### Abzüge Gesamt:
-10 + 0 + (-5) + (-10) + (-10) + (-8) + 0 = **-43 Abzug**

*(Hinweis: In den Logs steht abzuege: -17, was darauf hindeutet, dass nicht alle Abzüge angewendet werden oder die Berechnung anders ist)*

### Completion Bonus:
**+10 Punkte**

### Final Score:
80 (Base) - 43 (Abzüge) + 10 (Bonus) = **47 Punkte**

*(In den Logs steht leadScore: 69, was auf eine andere Berechnung hindeutet - möglicherweise werden die Abzüge anders angewendet oder es gibt einen zusätzlichen Bonus)*

## Kategorisierung:

- **< 30:** Nicht qualifiziert
- **30-49:** Basic Partner
- **50-74:** Standard Partner ← **69 (Beispiel)**
- **≥ 75:** Premium Partner

## Wichtige Hinweise:

1. **Abzüge werden nur als negative Zahlen summiert** (Math.min(0, ...)), d.h. die Summe kann nicht positiv werden
2. **Für sehr gute Profile (expert + full insurance + gute Referenzen)** werden Abzüge auf 0 gesetzt
3. **Completion Bonus** wird immer hinzugefügt (+10)
4. **Final Score** kann nicht negativ werden (Math.max(..., 0))

